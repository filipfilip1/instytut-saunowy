import { formatPriceExact } from "@/lib/utils/currency";
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { IOrder } from '@/types';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';
import { getCustomerDetails } from '@/lib/services/customerService';
import Avatar from '@/components/ui/Avatar';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CustomerDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getCustomerDetails(id, false);

  if (!result) {
    notFound();
  }

  const { user, orders, stats, topProducts } = result;


  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/customers"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 inline-flex items-center gap-1"
        >
          ← Powrót do listy klientów
        </Link>

        <div className="flex items-start gap-4 mt-4">
          <Avatar src={user.image} name={user.name || user.email} size="xl" />

          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-gray-800">
              {user.name || 'Klient bez nazwy'}
            </h1>
            <p className="text-gray-600 mt-1">{user.email}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className={`
                inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}
              `}>
                {user.role === 'admin' ? '👑 Administrator' : '👤 Klient'}
              </span>
              <span className="text-sm text-gray-500">
                Zarejestrowany: {formatDate(user.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Zamówienia</p>
              <p className="text-3xl font-bold text-gray-800">{stats.totalOrders}</p>
            </div>
            <div className="text-3xl">📦</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Wydano łącznie</p>
              <p className="text-2xl font-bold text-gray-800">{formatPriceExact(stats.totalSpent)}</p>
            </div>
            <div className="text-3xl">💰</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Średnia wartość</p>
              <p className="text-2xl font-bold text-gray-800">{formatPriceExact(stats.averageOrderValue)}</p>
            </div>
            <div className="text-3xl">📊</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Dostarczone</p>
              <p className="text-3xl font-bold text-green-600">{stats.ordersByStatus.delivered}</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Historia zamówień ({orders.length})
              </h2>
            </div>

            {orders.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <span className="text-4xl mb-3 block">📦</span>
                <p className="text-gray-500">Klient nie złożył jeszcze żadnego zamówienia</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {orders.map((order: IOrder) => (
                  <div key={order._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <Link
                            href={`/admin/orders/${order._id}`}
                            className="font-medium text-blue-600 hover:text-blue-800"
                          >
                            #{order._id.slice(-8).toUpperCase()}
                          </Link>
                          <OrderStatusBadge
                            status={order.status}
                            paymentStatus={order.paymentStatus}
                            size="sm"
                          />
                        </div>

                        <p className="text-sm text-gray-600 mb-2">
                          {order.items.length} {order.items.length === 1 ? 'produkt' : 'produkty'}
                          {' • '}
                          {formatDate(order.createdAt)}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {order.items.slice(0, 3).map((item, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                            >
                              {item.productName}
                            </span>
                          ))}
                          {order.items.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{order.items.length - 3} więcej
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right ml-4">
                        <p className="text-lg font-semibold text-gray-900">
                          {formatPriceExact(order.total)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Top products */}
          {topProducts.length > 0 && (
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">
                  Najczęściej kupowane
                </h2>
              </div>

              <div className="px-6 py-4 space-y-3">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <span className="text-lg font-bold text-gray-400">
                        {index + 1}.
                      </span>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {product.count} szt.
                        </p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {formatPriceExact(product.total)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Status statistics */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Statusy zamówień
              </h2>
            </div>

            <div className="px-6 py-4 space-y-2">
              {Object.entries(stats.ordersByStatus).map(([status, count]) => {
                if (count === 0) return null;

                const statusConfig = {
                  pending: { label: 'Oczekujące', color: 'bg-gray-500' },
                  processing: { label: 'W realizacji', color: 'bg-blue-500' },
                  shipped: { label: 'Wysłane', color: 'bg-purple-500' },
                  delivered: { label: 'Dostarczone', color: 'bg-green-500' },
                  cancelled: { label: 'Anulowane', color: 'bg-red-500' },
                };

                const config = statusConfig[status as keyof typeof statusConfig];

                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${config.color}`}></div>
                      <span className="text-sm text-gray-700">{config.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}