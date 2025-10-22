import Link from 'next/link';
import { getCustomersWithStats, CustomerWithStats } from '@/lib/services/customerService';

async function getCustomers() {
  const result = await getCustomersWithStats({
    roleFilter: 'customer',
    sortBy: '-createdAt',
    limit: 50,
    page: 1,
  });

  return {
    customers: JSON.parse(JSON.stringify(result.customers)),
    stats: {
      totalCustomers: result.stats.totalCustomers,
      customersWithOrders: result.stats.customersWithOrders || 0,
      customersWithoutOrders: result.stats.customersWithoutOrders || 0,
      totalRevenue: result.stats.totalRevenue || 0,
    },
  };
}

export default async function AdminCustomersPage() {
  const { customers, stats } = await getCustomers();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const formatDate = (date: string | Date | null) => {
    if (!date) return 'Nigdy';
    return new Date(date).toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTimeAgo = (date: string | Date | null) => {
    if (!date) return null;
    const now = new Date();
    const past = new Date(date);
    const diffInDays = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Dzisiaj';
    if (diffInDays === 1) return 'Wczoraj';
    if (diffInDays < 7) return `${diffInDays} dni temu`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} tyg. temu`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} mies. temu`;
    return `${Math.floor(diffInDays / 365)} lat temu`;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Klienci</h1>
          <p className="text-gray-600 mt-1">
            Zarządzaj bazą klientów i ich zamówieniami
          </p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Wszyscy klienci</p>
              <p className="text-2xl font-bold text-gray-800">{stats.totalCustomers}</p>
            </div>
            <div className="text-3xl">👥</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Z zamówieniami</p>
              <p className="text-2xl font-bold text-green-600">{stats.customersWithOrders}</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Bez zamówień</p>
              <p className="text-2xl font-bold text-gray-400">{stats.customersWithoutOrders}</p>
            </div>
            <div className="text-3xl">⏸️</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Łączny przychód</p>
              <p className="text-xl font-bold text-gray-800">{formatPrice(stats.totalRevenue)}</p>
            </div>
            <div className="text-3xl">💰</div>
          </div>
        </div>
      </div>

      {/* Customers table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Klient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data rejestracji
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Zamówienia
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Wydano łącznie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ostatnie zamówienie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-4xl">👥</span>
                      <p className="text-lg font-medium">Brak klientów</p>
                      <p className="text-sm">Klienci pojawią się tutaj po rejestracji</p>
                    </div>
                  </td>
                </tr>
              ) : (
                customers.map((customer: CustomerWithStats) => (
                  <tr key={customer._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {customer.image ? (
                          <img
                            src={customer.image}
                            alt={customer.name || customer.email}
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-lg">👤</span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">
                            {customer.name || 'Bez nazwy'}
                          </p>
                          <p className="text-sm text-gray-500">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-900">
                          {formatDate(customer.createdAt)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {getTimeAgo(customer.createdAt)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-gray-900">
                          {customer.stats.orderCount}
                        </span>
                        {customer.stats.orderCount > 0 && (
                          <span className="text-xs text-gray-500">zamówień</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-gray-900">
                          {formatPrice(customer.stats.totalSpent)}
                        </span>
                        {customer.stats.orderCount > 0 && (
                          <span className="text-xs text-gray-500">
                            śr. {formatPrice(customer.stats.averageOrderValue)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-900">
                          {formatDate(customer.stats.lastOrderDate)}
                        </span>
                        {customer.stats.lastOrderDate && (
                          <span className="text-xs text-gray-500">
                            {getTimeAgo(customer.stats.lastOrderDate)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/admin/customers/${customer._id}`}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        Szczegóły →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {customers.length > 0 && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Wyświetlono {customers.length} klientów
            </p>
          </div>
        )}
      </div>
    </div>
  );
}