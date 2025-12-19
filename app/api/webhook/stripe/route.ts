import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import dbConnect from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import Product from '@/lib/models/Product';
import Training from '@/lib/models/Training';
import TrainingBooking from '@/lib/models/TrainingBooking';
import Stripe from 'stripe';
import { IProductVariant, IVariantOption } from '@/types';
import { createInvoice } from '@/lib/services/invoiceService';
import { sendOrderConfirmationEmail } from '@/lib/services/emailService';

// Disable Next.js body parser for Stripe webhooks
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  // Validate webhook secret exists
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('⚠️ STRIPE_WEBHOOK_SECRET is not configured!');
    return NextResponse.json(
      { error: 'Webhook not configured' },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signature (CRITICAL FOR SECURITY!)
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('⚠️ Webhook signature verification failed:', errorMessage);
    return NextResponse.json(
      { error: `Webhook signature verification failed: ${errorMessage}` },
      { status: 400 }
    );
  }

  // Handle different event types
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
        break;

      case 'payment_intent.succeeded':
        console.log('💰 Payment succeeded:', event.data.object.id);
        break;

      case 'payment_intent.payment_failed':
        console.log('❌ Payment failed:', event.data.object.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Webhook handler failed:', errorMessage);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('✅ Checkout session completed:', session.id);

  await dbConnect();

  // Check if this is a training booking
  if (session.metadata?.type === 'training_booking') {
    await handleTrainingBookingCompleted(session);
    return;
  }

  // Parse metadata from session (for product orders)
  const shippingAddress = JSON.parse(session.metadata?.shippingAddress || '{}');
  const items = JSON.parse(session.metadata?.items || '[]');

  if (!shippingAddress || !items || items.length === 0) {
    console.error('❌ Missing metadata in session');
    return;
  }

  // Fetch line items to get variantDisplayNames from metadata
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    expand: ['data.price.product'],
  });

  // Enrich items with variantDisplayNames from line item metadata
  const enrichedItems = items.map((item: Record<string, unknown>, index: number) => {
    const lineItem = lineItems.data[index];
    const productData = lineItem?.price?.product as Stripe.Product | undefined;
    const variantDisplayNames = productData?.metadata?.variantDisplayNames || '';

    return {
      ...item,
      variantDisplayNames,
    };
  });

  console.log('📋 Enriched items with display names');

  // Idempotency check: prevent duplicate orders using session ID
  const existingOrder = await Order.findOne({
    stripeSessionId: session.id,
  });

  if (existingOrder) {
    console.log('⚠️ Order already exists for session:', session.id);
    return;
  }

  // Check if transactions are enabled (requires MongoDB replica set)
  const useTransactions = process.env.MONGODB_USE_TRANSACTIONS === 'true';
  const mongoSession = useTransactions ? await Order.startSession() : null;

  try {
    if (mongoSession) {
      mongoSession.startTransaction();
      console.log('🔄 Using MongoDB transactions');
    } else {
      console.log('⚠️ Running without transactions (standalone MongoDB)');
    }

    // 1. Update stock levels for all products
    for (const item of enrichedItems) {
      const product = mongoSession
        ? await Product.findById(item.productId).session(mongoSession)
        : await Product.findById(item.productId);

      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }

      // Reduce stock for each variant option
      for (const [variantId, optionId] of Object.entries(item.variantSelections)) {
        const variant = product.variants.find((v: IProductVariant) => v.id === variantId);
        if (!variant) {
          console.warn(`Variant ${variantId} not found in product ${product.name}`);
          continue;
        }

        const option = variant.options.find((o: IVariantOption) => o.id === optionId);
        if (!option) {
          console.warn(`Option ${optionId} not found in variant ${variant.name}`);
          continue;
        }

        // Check stock availability
        if (option.stock < item.quantity) {
          throw new Error(
            `Insufficient stock for ${product.name}. Available: ${option.stock}, requested: ${item.quantity}`
          );
        }

        // Reduce stock
        option.stock -= item.quantity;
      }

      if (mongoSession) {
        await product.save({ session: mongoSession });
      } else {
        await product.save();
      }
      console.log(`📦 Stock updated for product: ${product.name}`);
    }

    // 2. Create order in database
    const orderData = {
      items: enrichedItems,
      shippingAddress,
      total: (session.amount_total || 0) / 100, // Convert from cents to PLN
      status: 'pending',
      paymentMethod: 'Stripe',
      paymentStatus: 'paid',
      guestEmail: session.customer_email || shippingAddress.email,
      stripeSessionId: session.id, // Store session ID for idempotency
    };

    const order = mongoSession
      ? await Order.create([orderData], { session: mongoSession })
      : await Order.create([orderData]);

    console.log('✅ Order created:', order[0]._id);

    // 3. Commit transaction (if using transactions)
    if (mongoSession) {
      await mongoSession.commitTransaction();
      console.log('✅ Transaction committed successfully');
    }

    // 4. Create invoice (OPTIONAL - only if configured)
    // NOTE: Currently using Pro Forma invoices for safe testing
    // Pro Forma = informational document, NOT accounting document
    // - Does NOT go to tax office/KSeF/JPK
    // - Fake company data is safe to use
    // Before production: change 'proforma' → 'vat' in lib/services/invoiceService.ts (line 43)
    let invoicePdfUrl: string | undefined;
    if (process.env.FAKTUROWNIA_API_TOKEN) {
      try {
        const invoiceResult = await createInvoice(order[0]);
        if (invoiceResult.success && invoiceResult.invoicePdfUrl) {
          invoicePdfUrl = invoiceResult.invoicePdfUrl;
          console.log('✅ Invoice created:', invoiceResult.invoiceNumber);
        } else {
          console.warn('⚠️ Invoice creation failed:', invoiceResult.error);
        }
      } catch (invoiceError) {
        // Don't fail order if invoice fails
        console.warn('⚠️ Invoice creation error (non-critical):', invoiceError);
      }
    } else {
      console.log('ℹ️  Fakturownia not configured - skipping invoice creation');
    }

    // 5. Send order confirmation email (OPTIONAL - only if configured)
    if (process.env.RESEND_API_KEY) {
      try {
        const emailResult = await sendOrderConfirmationEmail({
          order: order[0],
          invoicePdfUrl,
        });
        if (emailResult.success) {
          console.log('✅ Order confirmation email sent');
        } else {
          console.warn('⚠️ Email sending failed:', emailResult.error);
        }
      } catch (emailError) {
        // Don't fail order if email fails
        console.warn('⚠️ Email sending error (non-critical):', emailError);
      }
    } else {
      console.log('ℹ️  Resend not configured - skipping email notification');
    }
  } catch (error) {
    // Rollback transaction if anything fails
    if (mongoSession) {
      await mongoSession.abortTransaction();
      console.log('🔄 Transaction rolled back');
    }
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Operation failed:', errorMessage);
    throw error;
  } finally {
    if (mongoSession) {
      mongoSession.endSession();
    }
  }
}

async function handleTrainingBookingCompleted(session: Stripe.Checkout.Session) {
  console.log('✅ Training booking session completed:', session.id);

  try {
    // Parse participant info from metadata
    const participantInfo = JSON.parse(session.metadata?.participantInfo || '{}');
    const trainingId = session.metadata?.trainingId;
    const userId = session.metadata?.userId || undefined;
    const guestEmail = session.metadata?.guestEmail || undefined;
    const fullAmount = parseFloat(session.metadata?.fullAmount || '0');
    const depositAmount = parseFloat(session.metadata?.depositAmount || '0');

    if (!participantInfo || !trainingId) {
      console.error('❌ Missing training booking metadata');
      return;
    }

    // Idempotency check: prevent duplicate bookings
    const existingBooking = await TrainingBooking.findOne({
      stripeSessionId: session.id,
    });

    if (existingBooking) {
      console.log('⚠️ Booking already exists for session:', session.id);
      return;
    }

    // Check if transactions are enabled
    const useTransactions = process.env.MONGODB_USE_TRANSACTIONS === 'true';
    const mongoSession = useTransactions ? await TrainingBooking.startSession() : null;

    try {
      if (mongoSession) {
        mongoSession.startTransaction();
        console.log('🔄 Using MongoDB transactions');
      }

      // 1. Find training and increment participants
      const training = mongoSession
        ? await Training.findById(trainingId).session(mongoSession)
        : await Training.findById(trainingId);

      if (!training) {
        throw new Error(`Training ${trainingId} not found`);
      }

      // Increment participants count
      await training.incrementParticipants(1);
      console.log(`📚 Training participants updated: ${training.name} (${training.currentParticipants}/${training.maxParticipants})`);

      // 2. Create booking record
      const bookingData = {
        trainingId,
        userId,
        guestEmail,
        participantInfo,
        stripeSessionId: session.id,
        paymentAmount: depositAmount,
        paymentType: depositAmount === fullAmount ? 'full' : 'deposit',
        paymentStatus: 'paid',
        bookingStatus: 'confirmed',
      };

      const booking = mongoSession
        ? await TrainingBooking.create([bookingData], { session: mongoSession })
        : await TrainingBooking.create([bookingData]);

      console.log('✅ Training booking created:', booking[0]._id);

      // 3. Commit transaction
      if (mongoSession) {
        await mongoSession.commitTransaction();
        console.log('✅ Training booking transaction committed');
      }

      // TODO: Send training booking confirmation email
      // if (process.env.RESEND_API_KEY) {
      //   await sendTrainingBookingEmail({
      //     booking: booking[0],
      //     training,
      //   });
      // }
    } catch (error) {
      if (mongoSession) {
        await mongoSession.abortTransaction();
        console.log('🔄 Training booking transaction rolled back');
      }
      throw error;
    } finally {
      if (mongoSession) {
        mongoSession.endSession();
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Training booking failed:', errorMessage);
    throw error;
  }
}