'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

/**
 * TODO: CRITICAL PRE-PRODUCTION ISSUES TO FIX
 *
 * 1. SECURITY: Payment verification is missing!
 *    - Currently trusts session_id parameter blindly without verifying payment succeeded
 *    - Anyone can access /checkout/success?session_id=fake_id and see success message
 *    - Must call /api/checkout/verify-payment endpoint to verify payment status
 *
 * 2. CRITICAL: Cart clearing runs on every page refresh
 *    - clearCart() executes every time user refreshes the page
 *    - Should use sessionStorage to track if cart was already cleared for this session_id
 *    - Example: sessionStorage.getItem('cleared_' + sessionId)
 *
 * 3. UX: No loading state while verifying payment
 *    - Should show loading spinner while calling verify-payment endpoint
 *    - Current implementation shows success immediately
 *
 * 4. UX: No actual order details displayed
 *    - Should fetch order data from verify-payment endpoint
 *    - Display: order items, quantities, total, order number, tracking info
 *    - Currently only shows generic success message
 *
 * 5. UX: Technical session_id exposed to user (lines 99-106)
 *    - Should display user-friendly order number instead
 *    - Session IDs are internal Stripe identifiers
 *
 * 6. ERROR HANDLING: No error handling for failed/expired payments
 *    - What if payment failed after redirect?
 *    - What if session expired?
 *    - What if order not found in database?
 *    - Need error states with appropriate messages
 *
 * 7. MISLEADING: Says "email confirmation sent" but emails not implemented
 *    - Line 70 claims confirmation was sent
 *    - Webhook has TODO for email implementation
 *    - Either implement emails or change message
 *

 */

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();

  useEffect(() => {
    // TODO: Add sessionStorage check to prevent clearing cart on refresh
    // TODO: Only clear cart AFTER successfully verifying payment
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <span className="text-6xl mb-4 block">❌</span>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Błąd
          </h1>
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        {/* Success Icon */}
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

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dziękujemy za zamówienie!
        </h1>

        {/* Description */}
        {/* TODO: Remove claim about email confirmation until emails are actually implemented */}
        <p className="text-gray-600 mb-8">
          Twoje zamówienie zostało pomyślnie złożone. Potwierdzenie zostało wysłane na Twój adres email.
        </p>

        {/* Info boxes */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📧</span>
            <div>
              <p className="font-medium text-gray-900 text-sm">Sprawdź swoją skrzynkę email</p>
              <p className="text-sm text-gray-600 mt-1">
                Wysłaliśmy Ci potwierdzenie zamówienia z wszystkimi szczegółami.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8 text-left">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📦</span>
            <div>
              <p className="font-medium text-gray-900 text-sm">Czas realizacji</p>
              <p className="text-sm text-gray-600 mt-1">
                Zamówienie zostanie wysłane w ciągu 24-48 godzin.
              </p>
            </div>
          </div>
        </div>

        {/* TODO: Replace with user-friendly order number instead of technical Stripe session_id */}
        <div className="mb-6">
          <p className="text-xs text-gray-500">
            ID sesji płatności
          </p>
          <p className="text-xs text-gray-400 font-mono mt-1 break-all">
            {sessionId}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/sklep"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Kontynuuj zakupy
          </Link>

          <Link
            href="/"
            className="text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Wróć do strony głównej
          </Link>
        </div>

        {/* Support info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Pytania? Skontaktuj się z nami:
          </p>
          <a
            href="mailto:kontakt@instytut-saunowy.pl"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            kontakt@instytut-saunowy.pl
          </a>
        </div>
      </div>
    </div>
  );
}