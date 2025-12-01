import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import Order from '@/lib/models/Order';
import { IOrder } from '@/types';

// Lean document type (plain JS object without Mongoose methods)
type LeanUser = {
  _id: { toString(): string };
  email: string;
  name?: string;
  image?: string;
  role: 'customer' | 'admin';
  createdAt: Date;
  updatedAt: Date;
};

// Types for service responses
export interface CustomerStats {
  orderCount: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate: Date | null;
}

export interface CustomerWithStats {
  _id: string;
  name?: string;
  email: string;
  image?: string;
  role: string;
  createdAt: Date;
  stats: CustomerStats;
}

export interface CustomerListResponse {
  customers: CustomerWithStats[];
  stats: {
    totalCustomers: number;
    customersWithOrders?: number;
    customersWithoutOrders?: number;
    totalRevenue?: number;
    totalAdmins?: number;
    totalUsers?: number;
  };
  pagination?: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

export interface OrdersByStatus {
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
  cancelled: number;
}

export interface TopProduct {
  name: string;
  count: number;
  total: number;
}

export interface MonthlyActivity {
  month: string;
  orders: number;
  revenue: number;
}

export interface CustomerDetailsResponse {
  user: any;
  orders: IOrder[];
  stats: {
    totalOrders: number;
    totalSpent: number;
    averageOrderValue: number;
    ordersByStatus: OrdersByStatus;
    paidOrders?: number;
    pendingPayments?: number;
    firstOrderDate?: Date | null;
    lastOrderDate?: Date | null;
  };
  topProducts: TopProduct[];
  monthlyActivity?: MonthlyActivity[];
}

/**
 * Get list of customers with their stats
 * @param options - Query options (search, sortBy, limit, page, roleFilter)
 */
export async function getCustomersWithStats(options?: {
  search?: string;
  sortBy?: string;
  limit?: number;
  page?: number;
  roleFilter?: 'customer' | 'admin' | null;
}): Promise<CustomerListResponse> {
  await dbConnect();

  const {
    search,
    sortBy = '-createdAt',
    limit = 50,
    page = 1,
    roleFilter = null,
  } = options || {};

  // Build query
  const query: any = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  if (roleFilter) {
    query.role = roleFilter;
  }

  const skip = (page - 1) * limit;

  // Fetch users
  const users = (await User.find(query)
    .sort(sortBy)
    .limit(limit)
    .skip(skip)
    .lean()) as unknown as LeanUser[];

  const total = await User.countDocuments(query);

  // Calculate stats for each user
  const usersWithStats: CustomerWithStats[] = await Promise.all(
    users.map(async (user) => {
      const userOrders = await Order.find({ userId: user._id });

      const orderCount = userOrders.length;
      const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);
      const lastOrderDate =
        userOrders.length > 0
          ? userOrders.sort((a, b) => {
              const dateA = new Date(a.createdAt).getTime();
              const dateB = new Date(b.createdAt).getTime();
              return dateB - dateA;
            })[0].createdAt
          : null;

      return {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        createdAt: user.createdAt,
        stats: {
          orderCount,
          totalSpent,
          averageOrderValue: orderCount > 0 ? totalSpent / orderCount : 0,
          lastOrderDate,
        },
      };
    })
  );

  // General statistics
  const totalCustomers = await User.countDocuments({ role: 'customer' });
  const totalAdmins = await User.countDocuments({ role: 'admin' });

  // Calculate additional stats if roleFilter is 'customer'
  let customersWithOrders: number | undefined;
  let customersWithoutOrders: number | undefined;
  let totalRevenue: number | undefined;

  if (roleFilter === 'customer') {
    customersWithOrders = usersWithStats.filter((u) => u.stats.orderCount > 0).length;
    customersWithoutOrders = usersWithStats.length - customersWithOrders;
    totalRevenue = usersWithStats.reduce((sum, u) => sum + u.stats.totalSpent, 0);
  }

  return {
    customers: usersWithStats,
    stats: {
      totalCustomers,
      totalAdmins,
      totalUsers: totalCustomers + totalAdmins,
      ...(roleFilter === 'customer' && {
        customersWithOrders,
        customersWithoutOrders,
        totalRevenue,
      }),
    },
    pagination: {
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
    },
  };
}

/**
 * Get detailed information about a specific customer
 * @param id - Customer ID
 * @param includeAdvancedStats - Include monthly activity, payment stats, etc.
 */
export async function getCustomerDetails(
  id: string,
  includeAdvancedStats: boolean = false
): Promise<CustomerDetailsResponse | null> {
  await dbConnect();

  // Fetch user
  const user = (await User.findById(id).lean()) as unknown as LeanUser | null;

  if (!user) {
    return null;
  }

  // Fetch all orders
  const ordersRaw = await Order.find({ userId: id })
    .sort('-createdAt')
    .lean();

  // Convert ObjectIds to strings for proper serialization
  const orders: IOrder[] = ordersRaw.map((order: any) => ({
    ...order,
    _id: order._id.toString(),
    userId: order.userId?.toString(),
  }));

  // Basic stats
  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;

  // Order status statistics
  const ordersByStatus: OrdersByStatus = {
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
  };

  // Top 5 products purchased
  const productPurchases: Record<string, TopProduct> = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!productPurchases[item.productId]) {
        productPurchases[item.productId] = {
          name: item.productName,
          count: 0,
          total: 0,
        };
      }
      productPurchases[item.productId].count += item.quantity;
      productPurchases[item.productId].total += item.pricePerItem * item.quantity;
    });
  });

  const topProducts = Object.values(productPurchases)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Base response
  const response: CustomerDetailsResponse = {
    user,
    orders,
    stats: {
      totalOrders,
      totalSpent,
      averageOrderValue,
      ordersByStatus,
    },
    topProducts,
  };

  // Advanced stats (only for API endpoint, not for page)
  if (includeAdvancedStats) {
    // Payment statistics
    const paidOrders = orders.filter((o) => o.paymentStatus === 'paid').length;
    const pendingPayments = orders.filter((o) => o.paymentStatus === 'pending').length;

    // First and last purchase
    const firstOrder = orders.length > 0 ? orders[orders.length - 1] : null;
    const lastOrder = orders.length > 0 ? orders[0] : null;

    // Activity over time (last 12 months)
    const monthlyActivity = Array.from({ length: 12 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return (
          orderDate.getMonth() === date.getMonth() &&
          orderDate.getFullYear() === date.getFullYear()
        );
      });

      return {
        month: date.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' }),
        orders: monthOrders.length,
        revenue: monthOrders.reduce((sum, o) => sum + o.total, 0),
      };
    }).reverse();

    response.stats.paidOrders = paidOrders;
    response.stats.pendingPayments = pendingPayments;
    response.stats.firstOrderDate = firstOrder?.createdAt || null;
    response.stats.lastOrderDate = lastOrder?.createdAt || null;
    response.monthlyActivity = monthlyActivity;
  }

  return response;
}
