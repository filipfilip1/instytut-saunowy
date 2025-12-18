'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { IOrder } from '@/types';
import { formatPriceExact } from '@/lib/utils/currency';
import { ArrowLeft, Package, MapPin, CreditCard, Truck } from 'lucide-react';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: session, status } = useSession();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      fetchOrder();
    }
  }, [status, id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/user/orders/${id}`);
      const data = await response.json();

      if (data.status === 'success') {
        setOrder(data.data);
      } else {
        setError(data.message || 'Nie znaleziono zamówienia');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      setError('Wystąpił błąd podczas pobierania zamówienia');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-600"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="space-y-6">
        <Link
          href="/moje-konto/zamowienia"
          className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Powrót do zamówień
        </Link>
        <div className="bg-white rounded-2xl shadow-md border-2 border-warmwood-200 p-12 text-center">
          <Package className="w-20 h-20 text-graphite-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-graphite-900 mb-2">
            {error || 'Nie znaleziono zamówienia'}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/moje-konto/zamowienia"
        className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-semibold transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Powrót do zamówień
      </Link>

      {/* Header */}
      <div className="bg-white rounded-2xl shadow-md border-2 border-cream-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-graphite-900 mb-2">
              Zamówienie #{order._id.toString().slice(-8).toUpperCase()}
            </h1>
            <p className="text-graphite-600">
              Złożone{' '}
              {new Date(order.createdAt).toLocaleDateString('pl-PL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          <div className="text-right">
            <OrderStatusBadge status={order.status} paymentStatus={order.paymentStatus} size="lg" />
          </div>
        </div>

        {/* Tracking Info */}
        {order.trackingNumber && (
          <div className="mt-4 p-4 bg-nordic-50 rounded-xl border border-nordic-200">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-nordic-600" />
              <div>
                <p className="text-sm font-semibold text-graphite-900 mb-1">
                  Numer przesyłki
                </p>
                <a
                  href={`https://inpost.pl/sledzenie-przesylek?number=${order.trackingNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nordic-600 hover:text-nordic-700 font-mono font-semibold"
                >
                  {order.trackingNumber}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-md border-2 border-cream-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-cream-200">
              <h2 className="text-xl font-serif font-bold text-graphite-900 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Produkty
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 pb-4 border-b border-cream-200 last:border-0"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-graphite-900 mb-1">
                      {item.productName}
                    </h3>
                    {item.variantDisplayNames && (
                      <p className="text-sm text-graphite-600 mb-2">
                        {item.variantDisplayNames}
                      </p>
                    )}
                    <p className="text-sm text-graphite-600">
                      Ilość: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-graphite-900">
                      {formatPriceExact(item.pricePerItem * item.quantity)}
                    </p>
                    <p className="text-sm text-graphite-600">
                      {formatPriceExact(item.pricePerItem)} / szt.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-cream-200 p-6">
            <h2 className="text-xl font-serif font-bold text-graphite-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Podsumowanie
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-graphite-600">
                <span>Produkty:</span>
                <span className="font-semibold">{formatPriceExact(order.total)}</span>
              </div>
              <div className="flex justify-between text-graphite-600">
                <span>Dostawa:</span>
                <span className="font-semibold">Wliczona</span>
              </div>
              <div className="pt-3 border-t border-cream-200">
                <div className="flex justify-between">
                  <span className="font-bold text-graphite-900">Razem:</span>
                  <span className="font-bold text-graphite-900 text-xl">
                    {formatPriceExact(order.total)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-cream-200 p-6">
            <h2 className="text-xl font-serif font-bold text-graphite-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Adres dostawy
            </h2>
            <div className="space-y-1 text-graphite-700">
              <p className="font-semibold">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.zipCode} {order.shippingAddress.city}
              </p>
              <p>{order.shippingAddress.country}</p>
              <p className="pt-3 border-t border-cream-200 mt-3">
                <span className="text-graphite-600">Tel:</span> {order.shippingAddress.phone}
              </p>
              <p>
                <span className="text-graphite-600">Email:</span> {order.shippingAddress.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-br from-forest-700 to-forest-900 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-serif font-bold mb-4">Potrzebujesz pomocy?</h2>
        <p className="text-cream-200 mb-6">
          Jeśli masz pytania dotyczące tego zamówienia, skontaktuj się z nami
        </p>
        <Link href="/kontakt" className="btn-gold inline-flex items-center gap-2">
          Skontaktuj się z nami
        </Link>
      </div>
    </div>
  );
}
