import { NextRequest, NextResponse } from 'next/server';
import { stripe, formatAmountForStripe } from '@/lib/stripe';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { createCheckoutSessionSchema } from '@/lib/schemas/checkout';
import { IProduct, IProductVariant, IVariantOption } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request with Zod schema
    const validationResult = createCheckoutSessionSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid request data',
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const { items, shippingAddress } = validationResult.data;

    await dbConnect();

    // Fetch all products at once (performance optimization)
    const productIds = items.map((item) => item.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    const productMap = new Map<string, IProduct>(
      products.map((p) => [String(p._id), p.toObject() as IProduct])
    );

    // Validate inventory and prepare Stripe line items
    const validationErrors: string[] = [];
    const lineItems = [];

    for (const item of items) {
      const product = productMap.get(item.productId);

      // Product existence check
      if (!product) {
        validationErrors.push(`Produkt ${item.productName} nie został znaleziony`);
        continue;
      }

      // Product availability check
      if (!product.isActive) {
        validationErrors.push(`Produkt ${item.productName} jest niedostępny`);
        continue;
      }

      // Calculate item price with variant modifiers
      let itemPrice = product.basePrice;
      let hasErrors = false;

      // Validate variants and calculate price
      for (const [variantId, optionId] of Object.entries(item.variantSelections)) {
        const variant = product.variants.find((v: IProductVariant) => v.id === variantId);

        if (!variant) {
          validationErrors.push(`Wariant produktu ${item.productName} nie istnieje`);
          hasErrors = true;
          continue;
        }

        const option = variant.options.find((o: IVariantOption) => o.id === optionId);

        if (!option) {
          validationErrors.push(`Opcja wariantu produktu ${item.productName} nie istnieje`);
          hasErrors = true;
          continue;
        }

        // Stock availability check
        if (option.stock < item.quantity) {
          validationErrors.push(
            `Niewystarczająca ilość produktu ${item.productName}. Dostępne: ${option.stock}, zamówione: ${item.quantity}`
          );
          hasErrors = true;
        }

        // Add price modifier
        if (option.priceModifier) {
          itemPrice += option.priceModifier;
        }
      }

      // Skip creating line item if there were validation errors
      if (hasErrors) {
        continue;
      }

      // Prepare line item for Stripe
      lineItems.push({
        price_data: {
          currency: 'pln',
          product_data: {
            name: item.productName,
            metadata: {
              productId: item.productId,
              variantSelections: JSON.stringify(item.variantSelections),
            },
          },
          unit_amount: formatAmountForStripe(itemPrice),
        },
        quantity: item.quantity,
      });
    }

    // Return validation errors if any
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: 'Błędy walidacji', details: validationErrors },
        { status: 400 }
      );
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Only 'card' is guaranteed in test mode
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/koszyk`,
      customer_email: shippingAddress.email,

      // Store order data in metadata for webhook processing
      metadata: {
        shippingAddress: JSON.stringify(shippingAddress),
        items: JSON.stringify(items),
      },

      // Optional: Enable shipping options
      // shipping_options: [
      //   {
      //     shipping_rate_data: {
      //       type: 'fixed_amount',
      //       fixed_amount: { amount: 0, currency: 'pln' },
      //       display_name: 'Darmowa dostawa',
      //     },
      //   },
      // ],
    });

    // Return session URL
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Create session error:', error);
    return NextResponse.json(
      { error: 'Nie udało się utworzyć sesji płatności' },
      { status: 500 }
    );
  }
}