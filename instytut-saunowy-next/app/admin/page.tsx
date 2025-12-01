import { formatPriceRounded } from "@/lib/utils/currency";
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { IOrder } from '@/types';
import Order from '@/lib/models/Order';
import User from '@/lib/models/User';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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


  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-serif font-bold text-graphite-900">Dashboard</h1>
        <p className="text-graphite-600 mt-2 text-lg">
          Przegląd najważniejszych statystyk sklepu
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200 hover:border-forest-300 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-graphite-600 uppercase tracking-wide">Produkty</p>
              <p className="text-3xl font-serif font-bold text-graphite-900 mt-1">{stats.productsCount}</p>
            </div>
            <div className="text-4xl bg-forest-100 p-3 rounded-2xl">📦</div>
          </div>
          <Link href="/admin/products" className="text-forest-600 text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
            Zarządzaj
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200 hover:border-nordic-300 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-graphite-600 uppercase tracking-wide">Zamówienia</p>
              <p className="text-3xl font-serif font-bold text-graphite-900 mt-1">{stats.ordersCount}</p>
            </div>
            <div className="text-4xl bg-nordic-100 p-3 rounded-2xl">🛒</div>
          </div>
          <Link href="/admin/orders" className="text-nordic-600 text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
            Zobacz wszystkie
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200 hover:border-warmwood-300 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-graphite-600 uppercase tracking-wide">Klienci</p>
              <p className="text-3xl font-serif font-bold text-graphite-900 mt-1">{stats.customersCount}</p>
            </div>
            <div className="text-4xl bg-warmwood-100 p-3 rounded-2xl">👥</div>
          </div>
          <Link href="/admin/customers" className="text-warmwood-600 text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
            Przeglądaj
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-gradient-to-br from-forest-600 to-forest-700 rounded-2xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-cream-200 uppercase tracking-wide">Przychód</p>
              <p className="text-3xl font-serif font-bold mt-1">{formatPriceRounded(stats.revenue)}</p>
            </div>
            <div className="text-4xl bg-white/20 p-3 rounded-2xl backdrop-blur-sm">💰</div>
          </div>
          <p className={`text-sm font-semibold inline-flex items-center gap-1 ${stats.revenueChange >= 0 ? 'text-gold-300' : 'text-warmwood-300'}`}>
            <span className="text-lg">{stats.revenueChange >= 0 ? '↗' : '↘'}</span>
            {Math.abs(stats.revenueChange)}% vs poprzednie 30 dni
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 border border-cream-300">
          <h2 className="text-2xl font-serif font-semibold text-graphite-900 mb-6">
            Sprzedaż (ostatnie 30 dni)
          </h2>
          <SalesChart data={stats.chartData} />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-cream-300">
          <h2 className="text-2xl font-serif font-semibold text-graphite-900 mb-6">
            Top 5 Produktów
          </h2>
          <div className="space-y-4">
            {stats.topProducts.length === 0 ? (
              <p className="text-graphite-500 text-center py-12">Brak danych</p>
            ) : (
              stats.topProducts.map((product: any, index: number) => (
                <div key={product._id} className="flex items-start justify-between p-3 rounded-xl hover:bg-cream-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <span className={`text-xl font-serif font-bold ${
                      index === 0 ? 'text-gold-500' : index === 1 ? 'text-gold-400' : index === 2 ? 'text-gold-300' : 'text-graphite-400'
                    }`}>
                      {index + 1}.
                    </span>
                    <div>
                      <p className="font-semibold text-graphite-900 text-sm">
                        {product.productName}
                      </p>
                      <p className="text-xs text-graphite-500 mt-1">
                        Sprzedano: {product.totalSold} szt.
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-forest-700">
                    {formatPriceRounded(product.revenue)}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-cream-300">
        <div className="p-6 border-b-2 border-cream-300 bg-gradient-to-r from-cream-50 to-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-semibold text-graphite-900">Ostatnie zamówienia</h2>
            <Link href="/admin/orders" className="text-forest-600 text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all">
              Zobacz wszystkie
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-graphite-50 to-cream-100 border-b-2 border-cream-300">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-graphite-700 uppercase tracking-wider">
                  Nr zamówienia
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-graphite-700 uppercase tracking-wider">
                  Klient
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-graphite-700 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-graphite-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-graphite-700 uppercase tracking-wider">
                  Wartość
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-graphite-700 uppercase tracking-wider">
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-cream-200">
              {stats.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-graphite-500">
                    Brak zamówień
                  </td>
                </tr>
              ) : (
                stats.recentOrders.map((order: IOrder) => (
                  <tr key={order._id} className="hover:bg-cream-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-graphite-900">
                      #{order._id.slice(-6).toUpperCase()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-graphite-600">
                      {order.shippingAddress?.email || order.guestEmail || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-graphite-600">
                      {new Date(order.createdAt).toLocaleDateString('pl-PL')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`
                        px-3 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-xl border
                        ${order.status === 'delivered' ? 'bg-forest-100 text-forest-800 border-forest-200' : ''}
                        ${order.status === 'processing' ? 'bg-gold-100 text-gold-800 border-gold-200' : ''}
                        ${order.status === 'pending' ? 'bg-cream-200 text-graphite-700 border-cream-300' : ''}
                        ${order.status === 'shipped' ? 'bg-nordic-100 text-nordic-800 border-nordic-200' : ''}
                        ${order.status === 'cancelled' ? 'bg-warmwood-100 text-warmwood-800 border-warmwood-200' : ''}
                      `}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-graphite-900">
                      {formatPriceRounded(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                      <Link
                        href={`/admin/orders/${order._id}`}
                        className="text-forest-600 hover:text-forest-800 transition-colors"
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