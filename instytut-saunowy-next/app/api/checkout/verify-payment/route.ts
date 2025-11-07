import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import dbConnect from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import Stripe from 'stripe';
import { IOrder } from '@/types';

/**
 * Verify Stripe payment and retrieve order details.
 *
 * Public endpoint (no auth) - guest customers need access to order confirmation.
 * Uses stripeSessionId for accurate order matching.
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session_id parameter' },
        { status: 400 }
      );
    }

    // Stripe session IDs start with 'cs_'
    if (!sessionId.startsWith('cs_')) {
      return NextResponse.json(
        { error: 'Invalid session_id format' },
        { status: 400 }
      );
    }

    let session: Stripe.Checkout.Session;
    try {
      session = await stripe.checkout.sessions.retrieve(sessionId);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Failed to retrieve Stripe session:', errorMessage);
      return NextResponse.json(
        { error: 'Invalid or expired session' },
        { status: 404 }
      );
    }

    if (session.payment_status !== 'paid') {
      return NextResponse.json(
        {
          error: 'Payment not completed',
          paymentStatus: session.payment_status,
        },
        { status: 402 } // 402 Payment Required
      );
    }

    await dbConnect();

    const order = await Order.findOne({
      stripeSessionId: sessionId,
    }).lean() as IOrder | null;

    if (!order) {
      // Payment succeeded but order not yet created - webhook may still be processing
      // (eventual consistency)
      return NextResponse.json(
        {
          error: 'Order not found',
          message:
            'Your payment was successful but the order is still being processed. Please wait a moment and refresh the page.',
          paymentStatus: 'paid',
        },
        { status: 202 } // 202 Accepted (processing)
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        _id: order._id.toString(),
        orderNumber: order._id.toString().slice(-8).toUpperCase(), // Last 8 chars as order number
        items: order.items,
        shippingAddress: order.shippingAddress,
        total: order.total,
        status: order.status,
        paymentStatus: order.paymentStatus,
        paymentMethod: order.paymentMethod,
        trackingNumber: order.trackingNumber,
        createdAt: order.createdAt,
        guestEmail: order.guestEmail,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Verify payment error:', errorMessage);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
