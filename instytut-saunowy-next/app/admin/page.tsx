import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { IOrder } from '@/types';
import Order from '@/lib/models/Order';
import User from '@/lib/models/User';
import Link from 'next/link';
import SalesChart from '@/components/admin/SalesChart';

async function getDashboardStats() {
  await dbConnect();

  const [productsCount, ordersCount, customersCount] = await Promise.all([
    Product.countDocuments({ isActive: true }),
    Order.countDocuments(),
    User.countDocuments({ role: 'customer' }),
  ]);

  // Revenue from paid orders only
  const revenue = await Order.aggregate([
    { $match: { paymentStatus: 'paid' } },
    { $group: { _id: null, total: { $sum: '$total' } } },
  ]);

  const recentOrders = await Order.find()
    .sort('-createdAt')
    .limit(5)
    .lean();

  // Top products by quantity sold
  const topProducts = await Order.aggregate([
    { $unwind: '$items' },
    {
      $group: {
        _id: '$items.productId',
        productName: { $first: '$items.productName' },
        totalSold: { $sum: '$items.quantity' },
        revenue: { $sum: { $multiply: ['$items.quantity', '$items.pricePerItem'] } },
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: 5 },
  ]);

  // Chart data: last 30 days with daily aggregation
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const dailyStats = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: thirtyDaysAgo },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
        },
        revenue: { $sum: '$total' },
        orders: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Fill missing dates with zeros for continuous chart
  const chartData = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];

    const dayData = dailyStats.find(d => d._id === dateString);

    chartData.push({
      date: date.toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' }),
      revenue: dayData ? dayData.revenue : 0,
      orders: dayData ? dayData.orders : 0,
    });
  }

  // Period-over-period comparison for trend calculation
  const sixtyDaysAgo = new Date();
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

  const currentPeriodRevenue = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: thirtyDaysAgo },
        paymentStatus: 'paid',
      },
    },
    { $group: { _id: null, total: { $sum: '$total' } } },
  ]);

  const previousPeriodRevenue = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo },
        paymentStatus: 'paid',
      },
    },
    { $group: { _id: null, total: { $sum: '$total' } } },
  ]);

  const currentRevenue = currentPeriodRevenue[0]?.total || 0;
  const previousRevenue = previousPeriodRevenue[0]?.total || 0;
  const revenueChange = previousRevenue > 0
    ? ((currentRevenue - previousRevenue) / previousRevenue) * 100
    : 0;

  return {
    productsCount,
    ordersCount,
    customersCount,
    revenue: revenue[0]?.total || 0,
    recentOrders: JSON.parse(JSON.stringify(recentOrders)),
    topProducts,
    chartData,
    revenueChange: Math.round(revenueChange * 10) / 10,
  };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Przegląd najważniejszych statystyk sklepu
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Produkty</p>
              <p className="text-2xl font-bold text-gray-800">{stats.productsCount}</p>
            </div>
            <div className="text-3xl">📦</div>
          </div>
          <Link href="/admin/products" className="text-blue-600 text-sm mt-2 inline-block hover:underline">
            Zarządzaj →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Zamówienia</p>
              <p className="text-2xl font-bold text-gray-800">{stats.ordersCount}</p>
            </div>
            <div className="text-3xl">🛒</div>
          </div>
          <Link href="/admin/orders" className="text-blue-600 text-sm mt-2 inline-block hover:underline">
            Zobacz wszystkie →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Klienci</p>
              <p className="text-2xl font-bold text-gray-800">{stats.customersCount}</p>
            </div>
            <div className="text-3xl">👥</div>
          </div>
          <Link href="/admin/customers" className="text-blue-600 text-sm mt-2 inline-block hover:underline">
            Przeglądaj →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Przychód</p>
              <p className="text-2xl font-bold text-gray-800">{formatPrice(stats.revenue)}</p>
            </div>
            <div className="text-3xl">💰</div>
          </div>
          <p className={`text-sm mt-2 font-medium ${stats.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {stats.revenueChange >= 0 ? '↗' : '↘'} {Math.abs(stats.revenueChange)}% vs poprzednie 30 dni
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Sprzedaż (ostatnie 30 dni)
          </h2>
          <SalesChart data={stats.chartData} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Top 5 Produktów
          </h2>
          <div className="space-y-4">
            {stats.topProducts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Brak danych</p>
            ) : (
              stats.topProducts.map((product: any, index: number) => (
                <div key={product._id} className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <span className="text-lg font-bold text-gray-400">
                      {index + 1}.
                    </span>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {product.productName}
                      </p>
                      <p className="text-xs text-gray-500">
                        Sprzedano: {product.totalSold} szt.
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {formatPrice(product.revenue)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Ostatnie zamówienia</h2>
            <Link href="/admin/orders" className="text-blue-600 text-sm hover:underline">
              Zobacz wszystkie →
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Nr zamówienia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Klient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Wartość
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Brak zamówień
                  </td>
                </tr>
              ) : (
                stats.recentOrders.map((order: IOrder) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.shippingAddress?.email || order.guestEmail || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('pl-PL')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`
                        px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : ''}
                        ${order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${order.status === 'pending' ? 'bg-gray-100 text-gray-800' : ''}
                        ${order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : ''}
                        ${order.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/admin/orders/${order._id}`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Zobacz
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}