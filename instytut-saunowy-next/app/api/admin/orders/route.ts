
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import { orderQuerySchema } from '@/lib/validation/orders';
import { ORDER_STATUSES, OrderStatus } from '@/lib/constants/orderStatuses';

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === 'admin';
}

export async function GET(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const validationResult = orderQuerySchema.safeParse({
      status: searchParams.get('status'),
      paymentStatus: searchParams.get('paymentStatus'),
      search: searchParams.get('search'),
      sortBy: searchParams.get('sortBy'),
      limit: searchParams.get('limit'),
      page: searchParams.get('page'),
    });

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid query parameters',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const { status, paymentStatus, search, sortBy, limit, page } = validationResult.data;

    const query: any = {};

    if (status) {
      query.status = status;
    }

    if (paymentStatus) {
      query.paymentStatus = paymentStatus;
    }

    if (search) {
      query.$or = [
        { 'shippingAddress.email': { $regex: search, $options: 'i' } },
        { guestEmail: { $regex: search, $options: 'i' } },
        { _id: search.match(/^[0-9a-fA-F]{24}$/) ? search : null },
      ].filter(condition => condition._id !== null);
    }

    const skip = (page - 1) * limit;

    const orders = await Order.find(query)
      .populate('userId', 'name email')
      .sort(sortBy)
      .limit(limit)
      .skip(skip)
      .lean();

    const total = await Order.countDocuments(query);

    // General statistics
    const stats = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    // Initialize status counts from constants
    const statusCounts: Record<OrderStatus, number> = ORDER_STATUSES.reduce(
      (acc, status) => ({ ...acc, [status]: 0 }),
      {} as Record<OrderStatus, number>
    );

    // Populate counts from aggregation results
    stats.forEach(stat => {
      if (stat._id in statusCounts) {
        statusCounts[stat._id as OrderStatus] = stat.count;
      }
    });

    // Revenue (paid only)
    const revenue = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);

    return NextResponse.json({
      status: 'success',
      data: orders,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
      stats: {
        statusCounts,
        totalRevenue: revenue[0]?.total || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}