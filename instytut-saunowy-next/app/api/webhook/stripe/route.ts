import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import dbConnect from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import Product from '@/lib/models/Product';
import Stripe from 'stripe';
import { IProductVariant, IVariantOption } from '@/types';

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

  // Parse metadata from session
  const shippingAddress = JSON.parse(session.metadata?.shippingAddress || '{}');
  const items = JSON.parse(session.metadata?.items || '[]');

  if (!shippingAddress || !items || items.length === 0) {
    console.error('❌ Missing metadata in session');
    return;
  }

  // Idempotency check: prevent duplicate orders using session ID
  const existingOrder = await Order.findOne({
    stripeSessionId: session.id,
  });

  if (existingOrder) {
    console.log('⚠️ Order already exists for session:', session.id);
    return;
  }

  // Start MongoDB transaction for atomic operations
  const mongoSession = await Order.startSession();
  mongoSession.startTransaction();

  try {
    // 1. Update stock levels for all products
    for (const item of items) {
      const product = await Product.findById(item.productId).session(mongoSession);

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

      await product.save({ session: mongoSession });
      console.log(`📦 Stock updated for product: ${product.name}`);
    }

    // 2. Create order in database
    const order = await Order.create(
      [
        {
          items,
          shippingAddress,
          total: (session.amount_total || 0) / 100, // Convert from cents to PLN
          status: 'pending',
          paymentMethod: 'Stripe',
          paymentStatus: 'paid',
          guestEmail: session.customer_email || shippingAddress.email,
          stripeSessionId: session.id, // Store session ID for idempotency
        },
      ],
      { session: mongoSession }
    );

    console.log('✅ Order created:', order[0]._id);

    // 3. Commit transaction
    await mongoSession.commitTransaction();
    console.log('✅ Transaction committed successfully');

    // TODO: Send order confirmation email
    // await sendOrderConfirmationEmail(order[0]);
  } catch (error) {
    // Rollback transaction if anything fails
    await mongoSession.abortTransaction();
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Transaction aborted:', errorMessage);
    throw error;
  } finally {
    mongoSession.endSession();
  }
}