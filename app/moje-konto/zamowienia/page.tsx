'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { IOrder } from '@/types';
import { formatPriceExact } from '@/lib/utils/currency';
import { ArrowRight, Package, Filter } from 'lucide-react';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';
import { ORDER_STATUSES } from '@/lib/constants/orderStatuses';

interface OrderStats {
  statusCounts?: Record<string, number>;
}

export default function UserOrdersPage() {
  const { status } = useSession();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [stats, setStats] = useState<OrderStats>({});

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedStatus) params.append('status', selectedStatus);

      const response = await fetch(`/api/user/orders?${params.toString()}`);
      const data = await response.json();

      if (data.status === 'success') {
        setOrders(data.data);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedStatus]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchOrders();
    }
  }, [status, fetchOrders]);

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold text-graphite-900 mb-2">
            Moje Zamówienia
          </h1>
          <p className="text-graphite-600">
            Historia twoich zakupów i aktualny status zamówień
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-md border-2 border-cream-200 p-6">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-graphite-600" />
          <span className="font-semibold text-graphite-900">Filtruj po statusie:</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedStatus('')}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                selectedStatus === ''
                  ? 'bg-gold-400 text-graphite-900'
                  : 'bg-cream-100 text-graphite-600 hover:bg-cream-200'
              }`}
            >
              Wszystkie {stats.statusCounts ? `(${Object.values(stats.statusCounts).reduce((a: number, b: number) => a + b, 0)})` : ''}
            </button>
            {ORDER_STATUSES.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedStatus === status
                    ? 'bg-gold-400 text-graphite-900'
                    : 'bg-cream-100 text-graphite-600 hover:bg-cream-200'
                }`}
              >
                {status === 'pending' && 'Oczekujące'}
                {status === 'processing' && 'W realizacji'}
                {status === 'shipped' && 'Wysłane'}
                {status === 'delivered' && 'Dostarczone'}
                {status === 'cancelled' && 'Anulowane'}
                {stats.statusCounts?.[status] ? ` (${stats.statusCounts[status]})` : ''}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-2xl shadow-md border-2 border-cream-200 overflow-hidden">
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-cream-50 border-b border-cream-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-graphite-700 uppercase tracking-wider">
                    Numer zamówienia
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-graphite-700 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-graphite-700 uppercase tracking-wider">
                    Produkty
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-graphite-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-graphite-700 uppercase tracking-wider">
                    Płatność
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-graphite-700 uppercase tracking-wider">
                    Kwota
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-graphite-700 uppercase tracking-wider">
                    Akcje
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200">
                {orders.map((order) => (
                  <tr key={order._id.toString()} className="hover:bg-cream-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono font-semibold text-graphite-900">
                        #{order._id.toString().slice(-8).toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-graphite-600">
                        {new Date(order.createdAt).toLocaleDateString('pl-PL', {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-graphite-600">
                        {order.items.length} {order.items.length === 1 ? 'produkt' : 'produkty'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap" colSpan={2}>
                      <OrderStatusBadge status={order.status} paymentStatus={order.paymentStatus} size="sm" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-graphite-900">
                        {formatPriceExact(order.total)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link
                        href={`/moje-konto/zamowienia/${order._id}`}
                        className="text-gold-600 hover:text-gold-700 font-semibold text-sm flex items-center gap-1 group"
                      >
                        Szczegóły
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <Package className="w-20 h-20 text-graphite-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-graphite-900 mb-2">
              {selectedStatus ? 'Brak zamówień z tym statusem' : 'Nie masz jeszcze żadnych zamówień'}
            </h3>
            <p className="text-graphite-500 mb-6">
              {selectedStatus
                ? 'Spróbuj wybrać inny filtr'
                : 'Odkryj naszą kolekcję produktów premium'}
            </p>
            {!selectedStatus && (
              <Link href="/sklep" className="btn-gold inline-flex items-center gap-2">
                Przejdź do sklepu
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
