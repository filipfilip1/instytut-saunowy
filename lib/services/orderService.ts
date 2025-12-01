import dbConnect from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import { ORDER_STATUSES, OrderStatus, PaymentStatus } from '@/lib/constants/orderStatuses';

// Types for service responses
export interface OrderStats {
  statusCounts: Record<OrderStatus, number>;
  totalRevenue: number;
}

export interface OrdersListResponse {
  orders: any[]; // Populated orders with userId
  pagination: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
  stats: OrderStats;
}

export interface OrderQueryOptions {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  search?: string;
  sortBy?: string;
  limit?: number;
  page?: number;
}

/**
 * Get order statistics (status counts and revenue)
 */
export async function getOrderStats(): Promise<OrderStats> {
  await dbConnect();

  const statusAggregation = await Order.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);

  const statusCounts: Record<OrderStatus, number> = ORDER_STATUSES.reduce(
    (acc, status) => ({ ...acc, [status]: 0 }),
    {} as Record<OrderStatus, number>
  );

  statusAggregation.forEach((stat) => {
    if (stat._id in statusCounts) {
      statusCounts[stat._id as OrderStatus] = stat.count;
    }
  });

  const revenueAggregation = await Order.aggregate([
    { $match: { paymentStatus: 'paid' } },
    { $group: { _id: null, total: { $sum: '$total' } } },
  ]);

  const totalRevenue = revenueAggregation[0]?.total || 0;

  return {
    statusCounts,
    totalRevenue,
  };
}

/**
 * Get list of orders with stats and pagination
 * @param options - Query options (status, paymentStatus, search, sortBy, limit, page)
 */
export async function getOrdersWithStats(
  options?: OrderQueryOptions
): Promise<OrdersListResponse> {
  await dbConnect();

  const {
    status,
    paymentStatus,
    search,
    sortBy = '-createdAt',
    limit = 50,
    page = 1,
  } = options || {};

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
    ].filter((condition) => condition._id !== null);
  }

  const skip = (page - 1) * limit;

  const orders = await Order.find(query)
    .populate('userId', 'name email')
    .sort(sortBy)
    .limit(limit)
    .skip(skip)
    .lean();

  const total = await Order.countDocuments(query);

  const stats = await getOrderStats();

  return {
    orders,
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
    },
    stats,
  };
}
