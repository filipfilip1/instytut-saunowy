import { formatPriceExact } from "@/lib/utils/currency";
import { IOrder } from '@/types';
import Link from 'next/link';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';
import { getOrdersWithStats } from '@/lib/services/orderService';

async function getOrders() {
  const result = await getOrdersWithStats({
    sortBy: '-createdAt',
    limit: 50,
    page: 1,
  });

  return {
    orders: JSON.parse(JSON.stringify(result.orders)),
    stats: result.stats.statusCounts,
    revenue: result.stats.totalRevenue,
  };
}

export default async function AdminOrdersPage() {
  const { orders, stats, revenue } = await getOrders();


  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleString('pl-PL', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCustomerInfo = (order: IOrder & { userId?: { _id: string; name: string; email: string; image?: string } }) => {
    if (order.userId) {
      return {
        name: order.userId.name || order.shippingAddress.name,
        email: order.userId.email,
        type: 'Konto' as const,
      };
    }
    return {
      name: order.shippingAddress.name,
      email: order.guestEmail || order.shippingAddress.email,
      type: 'Gość' as const,
    };
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Zamówienia</h1>
          <p className="text-gray-600 mt-1">
            Zarządzaj wszystkimi zamówieniami w sklepie
          </p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Oczekujące</p>
              <p className="text-2xl font-bold text-gray-800">{stats.pending}</p>
            </div>
            <div className="text-3xl">⏳</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">W realizacji</p>
              <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
            </div>
            <div className="text-3xl">🔄</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Wysłane</p>
              <p className="text-2xl font-bold text-purple-600">{stats.shipped}</p>
            </div>
            <div className="text-3xl">📦</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Dostarczone</p>
              <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Przychód</p>
              <p className="text-xl font-bold text-gray-800">{formatPriceExact(revenue)}</p>
            </div>
            <div className="text-3xl">💰</div>
          </div>
        </div>
      </div>

      {/* Orders table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nr zamówienia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Klient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Wartość
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-4xl">📦</span>
                      <p className="text-lg font-medium">Brak zamówień</p>
                      <p className="text-sm">
                        Zamówienia pojawią się tutaj gdy klienci zaczną kupować produkty
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                orders.map((order: IOrder & { userId?: { _id: string; name: string; email: string; image?: string } }) => {
                  const customer = getCustomerInfo(order);

                  return (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">
                            #{order._id.slice(-8).toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500">
                            {order.items.length} {order.items.length === 1 ? 'produkt' : 'produkty'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">
                            {customer.name}
                          </span>
                          <span className="text-sm text-gray-500">{customer.email}</span>
                          <span className="text-xs text-gray-400 mt-0.5">
                            {customer.type === 'Konto' ? '👤 Konto' : '🔓 Gość'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <OrderStatusBadge
                          status={order.status}
                          paymentStatus={order.paymentStatus}
                          size="sm"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900">
                          {formatPriceExact(order.total)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link
                          href={`/admin/orders/${order._id}`}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          Szczegóły →
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {orders.length > 0 && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Wyświetlono {orders.length} najnowszych zamówień
            </p>
          </div>
        )}
      </div>
    </div>
  );
}