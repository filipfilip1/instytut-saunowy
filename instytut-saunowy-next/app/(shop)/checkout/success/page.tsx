'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/useToast';
import Link from 'next/link';
import { formatPriceExact } from '@/lib/utils/currency';

interface OrderDetails {
  _id: string;
  orderNumber: string;
  items: Array<{
    productName: string;
    quantity: number;
    pricePerItem: number;
    variantSelections: Record<string, string>;
  }>;
  shippingAddress: {
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
  total: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  trackingNumber?: string;
  createdAt: Date;
  guestEmail?: string;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds
const CART_CLEAR_WINDOW = 5 * 60 * 1000; // 5 minutes - only clear cart for fresh orders

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [retryDisplay, setRetryDisplay] = useState(0);

  // Use refs to prevent infinite re-renders in useEffect
  const retryCountRef = useRef(0);
  const hasVerifiedRef = useRef(false);

  useEffect(() => {
    if (!sessionId || hasVerifiedRef.current) return;

    const verifyPayment = async () => {
      try {
        // Check sessionStorage if we already processed this session
        const storageKey = `order_${sessionId}`;
        const cachedData = sessionStorage.getItem(storageKey);

        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          setOrder(parsed.order);
          setLoading(false);
          hasVerifiedRef.current = true;
          return;
        }

        // Call verify-payment endpoint
        const response = await fetch(
          `/api/checkout/verify-payment?session_id=${sessionId}`
        );

        if (response.status === 202) {
          // Order still processing (webhook delay)
          setIsProcessing(true);

          if (retryCountRef.current < MAX_RETRIES) {
            // Wait and retry
            retryCountRef.current += 1;
            setRetryDisplay(retryCountRef.current);
            setTimeout(() => {
              verifyPayment();
            }, RETRY_DELAY);
            return;
          } else {
            // Max retries reached
            setError(
              'Zamówienie jest wciąż przetwarzane. Sprawdź swoją skrzynkę email za kilka minut.'
            );
            setLoading(false);
            hasVerifiedRef.current = true;
            return;
          }
        }

        if (!response.ok) {
          const errorData = await response.json();

          if (response.status === 402) {
            setError('Płatność nie została zakończona. Spróbuj ponownie.');
          } else if (response.status === 404) {
            setError('Sesja płatności wygasła lub nie istnieje.');
          } else {
            setError(errorData.error || 'Wystąpił błąd podczas weryfikacji płatności.');
          }

          setLoading(false);
          hasVerifiedRef.current = true;
          return;
        }

        const data = await response.json();

        if (data.success && data.order) {
          setOrder(data.order);
          setIsProcessing(false);
          hasVerifiedRef.current = true;

          // Save to sessionStorage
          sessionStorage.setItem(
            storageKey,
            JSON.stringify({ order: data.order, timestamp: Date.now() })
          );

          // Clear cart only for fresh orders (prevent clearing cart when user revisits old order link)
          // Scenario: User bookmarks success page, returns after days with new items in cart
          // Without this check: old order would clear the new cart
          const clearedKey = `cart_cleared_${sessionId}`;
          const orderAge = Date.now() - new Date(data.order.createdAt).getTime();

          if (!sessionStorage.getItem(clearedKey) && orderAge < CART_CLEAR_WINDOW) {
            clearCart();
            sessionStorage.setItem(clearedKey, 'true');
            toast.success('Zamówienie utworzone!');
          }
        }
      } catch (err) {
        console.error('Payment verification error:', err);
        setError('Nie udało się zweryfikować płatności. Sprawdź połączenie internetowe.');
        hasVerifiedRef.current = true;
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  // No session_id in URL
  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <span className="text-6xl mb-4 block">❌</span>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Błąd</h1>
          <p className="text-gray-600 mb-6">
            Brak informacji o sesji płatności
          </p>
          <Link
            href="/sklep"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Wróć do sklepu
          </Link>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {isProcessing ? 'Przetwarzamy zamówienie...' : 'Weryfikujemy płatność...'}
          </h2>
          <p className="text-gray-600">
            {isProcessing
              ? 'Twoje zamówienie jest w trakcie przetwarzania. To zajmie tylko chwilę.'
              : 'Prosimy o cierpliwość, to zajmie tylko moment.'}
          </p>
          {isProcessing && retryDisplay > 0 && (
            <p className="text-sm text-gray-500 mt-4">
              Próba {retryDisplay} z {MAX_RETRIES}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <span className="text-6xl mb-4 block">⚠️</span>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Wystąpił problem
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex flex-col gap-3">
            <Link
              href="/koszyk"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Wróć do koszyka
            </Link>
            <a
              href="mailto:kontakt@instytut-saunowy.pl"
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Skontaktuj się z nami
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Success state (order details)
  if (!order) {
    return null; // Should not happen
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dziękujemy za zamówienie!
          </h1>
          <p className="text-gray-600 mb-6">
            Twoje zamówienie zostało pomyślnie złożone i opłacone.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
            <p className="text-sm text-gray-600">Numer zamówienia</p>
            <p className="text-2xl font-bold text-blue-600">#{order.orderNumber}</p>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Szczegóły zamówienia
          </h2>

          {/* Items */}
          <div className="space-y-4 mb-6">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-start pb-4 border-b border-gray-200 last:border-0"
              >
                <div className="flex-grow">
                  <p className="font-medium text-gray-900">{item.productName}</p>
                  <p className="text-sm text-gray-600">
                    Ilość: {item.quantity} × {formatPriceExact(item.pricePerItem)}
                  </p>
                  {Object.keys(item.variantSelections).length > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      Warianty: {Object.values(item.variantSelections).join(', ')}
                    </p>
                  )}
                </div>
                <p className="font-semibold text-gray-900 ml-4">
                  {formatPriceExact(item.pricePerItem * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-4 border-t-2 border-gray-300">
            <span className="text-xl font-bold text-gray-900">Suma</span>
            <span className="text-2xl font-bold text-gray-900">
              {formatPriceExact(order.total)}
            </span>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Adres dostawy
          </h2>
          <div className="text-gray-700">
            <p className="font-medium">{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.zipCode} {order.shippingAddress.city}
            </p>
            <p>{order.shippingAddress.country}</p>
            <p className="mt-2">
              <span className="text-gray-600">Email:</span> {order.shippingAddress.email}
            </p>
            <p>
              <span className="text-gray-600">Telefon:</span> {order.shippingAddress.phone}
            </p>
          </div>
        </div>

        {/* Info boxes */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📧</span>
              <div>
                <p className="font-medium text-gray-900 text-sm">Email potwierdzający</p>
                <p className="text-sm text-gray-600 mt-1">
                  Szczegóły zamówienia zostały wysłane na {order.shippingAddress.email}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">📦</span>
              <div>
                <p className="font-medium text-gray-900 text-sm">Czas realizacji</p>
                <p className="text-sm text-gray-600 mt-1">
                  Zamówienie zostanie wysłane w ciągu 24-48 godzin
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/sklep"
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
          >
            Kontynuuj zakupy
          </Link>
          <Link
            href="/"
            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors text-center"
          >
            Wróć do strony głównej
          </Link>
        </div>

        {/* Support */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Masz pytania? Skontaktuj się z nami:{' '}
            <a
              href="mailto:kontakt@instytut-saunowy.pl"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              kontakt@instytut-saunowy.pl
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
