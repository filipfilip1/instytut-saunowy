'use client';

import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/useToast';
import Link from 'next/link';
import { formatPriceExact } from '@/lib/utils/currency';
import { Check } from 'lucide-react';
import { BRAND } from '@/constants/brand';

interface OrderDetails {
  _id: string;
  orderNumber: string;
  items: Array<{
    productName: string;
    quantity: number;
    pricePerItem: number;
    variantSelections: Record<string, string>;
    variantDisplayNames?: string;
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
  const { data: session } = useSession();
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
              href={`mailto:${BRAND.contact.email}`}
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
            <Check className="w-12 h-12 text-green-500" strokeWidth={2} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dziękujemy za zamówienie!
          </h1>
          <p className="text-gray-600 mb-4">
            Twoje zamówienie zostało pomyślnie złożone i opłacone.
          </p>
          <p className="text-lg text-gray-700">
            Numer zamówienia: <span className="font-bold text-gray-900">#{order.orderNumber}</span>
          </p>
        </div>

        {/* Order Details + Shipping Address - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-lg p-8">
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
                    {item.variantDisplayNames && (
                      <p className="text-xs text-gray-500 mt-1">
                        {item.variantDisplayNames}
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
              <span className="text-3xl font-extrabold text-gray-900">
                {formatPriceExact(order.total)}
              </span>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Adres dostawy
            </h2>
            <div className="text-gray-700 capitalize">
              <p className="font-medium">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.zipCode} {order.shippingAddress.city}
              </p>
              <p>{order.shippingAddress.country}</p>
              <div className="mt-3 pt-3 border-t border-gray-200 normal-case text-sm flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <span>📧</span>
                  <span>{order.shippingAddress.email}</span>
                </span>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1.5">
                  <span>📱</span>
                  <span>{order.shippingAddress.phone}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Info section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-xl">📧</span>
              <p>
                <span className="font-medium text-gray-900">Email potwierdzający</span> wysłany na {order.shippingAddress.email}
              </p>
            </div>
            <span className="hidden sm:inline text-gray-300">|</span>
            <div className="flex items-center gap-2">
              <span className="text-xl">📦</span>
              <p>
                <span className="font-medium text-gray-900">Wysyłka:</span> 24-48 godzin
              </p>
            </div>
          </div>
        </div>

        {/* Google OAuth CTA (for guests) / Order confirmation (for logged-in) */}
        {!session ? (
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-8 mb-6 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📦</span>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Zapisz to zamówienie na koncie
            </h3>
            <p className="text-sm text-gray-600 mb-6 max-w-md mx-auto">
              Miej dostęp do historii zakupów i statusu paczki bez konieczności pamiętania kolejnego hasła.
            </p>

            {/* Google OAuth Button */}
            <button
              onClick={() => signIn('google', { callbackUrl: window.location.href })}
              className="inline-flex items-center gap-3 bg-white border border-gray-300 px-6 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-sm"
            >
              {/* Google "G" Logo SVG */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
                  fill="#4285F4"
                />
                <path
                  d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z"
                  fill="#34A853"
                />
                <path
                  d="M3.964 10.712c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.96H.957C.347 6.175 0 7.55 0 9.002c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                  fill="#FBBC05"
                />
                <path
                  d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.428 0 9.002 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z"
                  fill="#EA4335"
                />
              </svg>
              Kontynuuj za pomocą Google
            </button>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 mb-6 text-center">
            <p className="text-gray-600 mb-3">
              To zamówienie zostało zapisane na Twoim koncie
            </p>
            <Link href="/panel" className="text-blue-600 hover:underline font-medium">
              Zobacz wszystkie zamówienia →
            </Link>
          </div>
        )}

        {/* Actions */}
        <div className="text-center">
          <Link
            href="/sklep"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Kontynuuj zakupy
          </Link>
        </div>

        {/* Support */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Masz pytania? Skontaktuj się z nami:{' '}
            <a
              href={`mailto:${BRAND.contact.email}`}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              {BRAND.contact.email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
