import { formatPriceExact } from "@/lib/utils/currency";
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import { IOrder } from '@/types';
import OrderStatusBadge from '@/components/admin/OrderStatusBadge';
import OrderActionsClient from './OrderActionsClient';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getOrder(id: string) {
  await dbConnect();

  const order = await Order.findById(id)
    .populate('userId', 'name email image')
    .lean();

  if (!order) {
    return null;
  }

  return JSON.parse(JSON.stringify(order));
}

export default async function OrderDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const order: (IOrder & { userId?: { _id: string; name: string; email: string; image?: string } }) | null = await getOrder(id);

  if (!order) {
    notFound();
  }


  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const customer = order.userId
    ? {
      name: order.userId.name || order.shippingAddress.name,
      email: order.userId.email,
      image: order.userId.image,
      type: 'registered' as const,
    }
    : {
      name: order.shippingAddress.name,
      email: order.guestEmail || order.shippingAddress.email,
      image: null,
      type: 'guest' as const,
    };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/orders"
          className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 inline-flex items-center gap-1"
        >
          ← Powrót do listy zamówień
        </Link>

        <div className="flex justify-between items-start mt-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Zamówienie #{order._id.slice(-8).toUpperCase()}
            </h1>
            <p className="text-gray-600 mt-1">
              Złożone {formatDate(order.createdAt)}
            </p>
          </div>

          <OrderStatusBadge
            status={order.status}
            paymentStatus={order.paymentStatus}
            size="lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Products */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Produkty ({order.items.length})
              </h2>
            </div>

            <div className="divide-y divide-gray-200">
              {order.items.map((item, index) => (
                <div key={index} className="px-6 py-4 flex gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-900">{item.productName}</h3>

                    {/* Variants */}
                    {item.variantSelections && Object.keys(item.variantSelections).length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-2">
                        {Object.entries(item.variantSelections).map(([key, value]) => (
                          <span
                            key={key}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                          >
                            {value}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-sm text-gray-500 mt-1">
                      {formatPriceExact(item.pricePerItem)} × {item.quantity}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatPriceExact(item.pricePerItem * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-700">Suma:</span>
                <span className="text-2xl font-bold text-gray-900">
                  {formatPriceExact(order.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Adres dostawy
              </h2>
            </div>

            <div className="px-6 py-4">
              <div className="space-y-2">
                <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                <p className="text-gray-600">{order.shippingAddress.street}</p>
                <p className="text-gray-600">
                  {order.shippingAddress.zipCode} {order.shippingAddress.city}
                </p>
                <p className="text-gray-600">{order.shippingAddress.country}</p>

                <div className="pt-3 mt-3 border-t border-gray-200 space-y-1">
                  <p className="text-sm text-gray-600">
                    📧 {order.shippingAddress.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    📱 {order.shippingAddress.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tracking */}
          {order.trackingNumber && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📦</span>
                <div>
                  <p className="font-medium text-gray-900">Numer przesyłki</p>
                  <p className="text-lg font-mono text-blue-600 mt-1">
                    {order.trackingNumber}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Customer info */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Klient</h2>
            </div>

            <div className="px-6 py-4">
              <div className="flex items-center gap-3 mb-4">
                {customer.image ? (
                  <Image
                    src={customer.image}
                    alt={customer.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xl">
                      {customer.type === 'registered' ? '👤' : '🔓'}
                    </span>
                  </div>
                )}

                <div>
                  <p className="font-medium text-gray-900">{customer.name}</p>
                  <p className="text-sm text-gray-500">{customer.email}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <span className={`
                  inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                  ${customer.type === 'registered'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                  }
                `}>
                  {customer.type === 'registered' ? '✓ Zarejestrowany' : 'Gość'}
                </span>
              </div>
            </div>
          </div>

          {/* Order info */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">
                Informacje o zamówieniu
              </h2>
            </div>

            <div className="px-6 py-4 space-y-3">
              <div>
                <p className="text-sm text-gray-500">Metoda płatności</p>
                <p className="font-medium text-gray-900">{order.paymentMethod}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Data złożenia</p>
                <p className="font-medium text-gray-900">{formatDate(order.createdAt)}</p>
              </div>

              {order.updatedAt !== order.createdAt && (
                <div>
                  <p className="text-sm text-gray-500">Ostatnia aktualizacja</p>
                  <p className="font-medium text-gray-900">{formatDate(order.updatedAt)}</p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <OrderActionsClient order={order} />
        </div>
      </div>
    </div>
  );
}