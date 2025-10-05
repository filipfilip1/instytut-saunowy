import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { IOrder } from '@/types';
import Order from '@/lib/models/Order';
import User from '@/lib/models/User';
import Link from 'next/link';


async function getStats() {
  await dbConnect();

  const [productsCount, ordersCount, customersCount, revenue] = await Promise.all([
    Product.countDocuments({ isActive: true }),
    Order.countDocuments(),
    User.countDocuments({ role: 'customer' }),
    Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ])
  ]);

  const recentOrders = await Order.find()
    .sort('-createdAt')
    .limit(5)
    .lean();

  return {
    productsCount,
    ordersCount,
    customersCount,
    revenue: revenue[0]?.total || 0,
    recentOrders: JSON.parse(JSON.stringify(recentOrders))
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
    }).format(price);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Produkty</p>
              <p className="text-2xl font-bold text-gray-800">{stats.productsCount}</p>
            </div>
            <div className="text-3xl">📦</div>
          </div>
          <Link href="/admin/products" className="text-blue-600 text-sm mt-2 inline-block">
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
          <Link href="/admin/orders" className="text-blue-600 text-sm mt-2 inline-block">
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
          <Link href="/admin/customers" className="text-blue-600 text-sm mt-2 inline-block">
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
          <p className="text-green-600 text-sm mt-2">+12% vs poprzedni miesiąc</p>
        </div>
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Ostatnie zamówienia</h2>
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
              {stats.recentOrders.map((order: IOrder) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}