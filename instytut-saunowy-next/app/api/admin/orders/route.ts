
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { orderQuerySchema } from '@/lib/schemas/orders';
import { getOrdersWithStats } from '@/lib/services/orderService';

async function isAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user?.role === 'admin';
}

export async function GET(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
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
          details: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const { status, paymentStatus, search, sortBy, limit, page } = validationResult.data;

    const result = await getOrdersWithStats({
      status,
      paymentStatus,
      search,
      sortBy,
      limit,
      page,
    });

    return NextResponse.json({
      status: 'success',
      data: result.orders,
      pagination: result.pagination,
      stats: result.stats,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}