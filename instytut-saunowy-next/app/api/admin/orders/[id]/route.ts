import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import { isValidOrderStatus, isValidPaymentStatus } from '@/lib/constants/orderStatuses';

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === 'admin';
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }) {

  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();

    const { id } = await params;

    const order = await Order.findById(id)
      .populate('userId', 'name email image')
      .lean();

    if (!order) {
      return NextResponse.json(
        { error: 'Order not Found' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error fetching order: ', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

export async function Patch(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdmin)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    // Allowed fields for manual admin updates:
    // - paymentStatus: Manual confirmation for bank transfers or cash on delivery
    //   NOTE: For automated payment gateways (Stripe/PayU), this should ideally be
    //   updated via webhooks only. Consider adding audit logging for manual changes.
    //   TODO: Implement AuditLog for paymentStatus changes or restrict to webhook-only
    const allowedFields = ['status', 'paymentStatus', 'trackingNumber'];
    const updates: any = {};

    allowedFields.forEach(field => {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    });

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to updates' },
        { status: 400 }
      );
    }

    // Status validation
    if (updates.status && !isValidOrderStatus(updates.status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    if (updates.paymentStatus && !isValidPaymentStatus(updates.paymentStatus)) {
      return NextResponse.json(
        { error: 'Invalid payment status value' },
        { status: 400 }
      );
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate('userId', 'name email image');

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 'success',
      data: order,
      message: 'Order updated successfully',
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}
