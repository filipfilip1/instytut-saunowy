import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import { IOrder } from '@/types';

// GET /api/user/orders/[id] - Get single order details
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { status: 'error', message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const { id } = await params;
    const order = await Order.findById(id).lean() as IOrder | null;

    if (!order) {
      return NextResponse.json(
        { status: 'error', message: 'Order not found' },
        { status: 404 }
      );
    }

    // Verify order belongs to user
    const belongsToUser =
      order.userId?.toString() === session.user.id ||
      order.guestEmail === session.user.email;

    if (!belongsToUser) {
      return NextResponse.json(
        { status: 'error', message: 'Forbidden' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      status: 'success',
      data: order,
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { status: 'error', message: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}
