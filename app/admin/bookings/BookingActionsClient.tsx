'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ITrainingBooking } from '@/types';
import { useToast } from '@/hooks/useToast';
import { BookingPaymentStatus } from '@/lib/constants/bookingStatuses';

interface BookingActionsClientProps {
  booking: ITrainingBooking;
}

export default function BookingActionsClient({ booking }: BookingActionsClientProps) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  // Cancel Modal State
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [shouldRefund, setShouldRefund] = useState(true);

  // Notes Modal State
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState(booking.adminNotes || '');

  // Payment Override Modal State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<BookingPaymentStatus>(
    booking.paymentStatus
  );
  const [paymentNote, setPaymentNote] = useState('');

  const handleCancelBooking = async () => {
    if (!cancelReason.trim()) {
      toast.error('Podaj powód anulowania');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/admin/bookings/${booking._id}/cancel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason: cancelReason,
          refund: shouldRefund,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Błąd podczas anulowania rezerwacji');
      }

      toast.success('Rezerwacja została anulowana');
      setShowCancelModal(false);
      router.refresh();
    } catch (error: unknown) {
      console.error('Error cancelling booking:', error);
      toast.error(error instanceof Error ? error.message : 'Wystąpił błąd podczas anulowania');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNotes = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/bookings/${booking._id}/notes`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminNotes }),
      });

      if (!response.ok) {
        throw new Error('Błąd podczas aktualizacji notatek');
      }

      toast.success('Notatki zostały zaktualizowane');
      setShowNotesModal(false);
      router.refresh();
    } catch (error: unknown) {
      console.error('Error updating notes:', error);
      toast.error(error instanceof Error ? error.message : 'Wystąpił błąd podczas aktualizacji notatek');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePaymentStatus = async () => {
    if (!paymentNote.trim()) {
      toast.error('Podaj powód zmiany statusu płatności');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/admin/bookings/${booking._id}/payment`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentStatus,
          adminNote: paymentNote,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Błąd podczas zmiany statusu płatności');
      }

      toast.success('Status płatności został zmieniony');
      setShowPaymentModal(false);
      router.refresh();
    } catch (error: unknown) {
      console.error('Error updating payment status:', error);
      toast.error(error instanceof Error ? error.message : 'Wystąpił błąd podczas zmiany statusu');
    } finally {
      setLoading(false);
    }
  };

  const canCancel = booking.bookingStatus !== 'cancelled';

  return (
    <div className="flex gap-3 flex-wrap">
      {canCancel && (
        <button
          onClick={() => setShowCancelModal(true)}
          className="px-4 py-2 bg-warmwood-100 text-warmwood-800 rounded-xl hover:bg-warmwood-200 transition-colors font-semibold"
        >
          ✕ Anuluj rezerwację
        </button>
      )}

      <button
        onClick={() => setShowNotesModal(true)}
        className="px-4 py-2 bg-gold-100 text-gold-800 rounded-xl hover:bg-gold-200 transition-colors font-semibold"
      >
        📝 Notatki admina
      </button>

      <button
        onClick={() => setShowPaymentModal(true)}
        className="px-4 py-2 bg-nordic-100 text-nordic-800 rounded-xl hover:bg-nordic-200 transition-colors font-semibold"
      >
        💳 Zmień status płatności
      </button>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-serif font-bold text-graphite-900 mb-4">
              Anuluj rezerwację
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-graphite-700 mb-2">
                Powód anulowania
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400"
                placeholder="Podaj powód anulowania rezerwacji..."
              />
            </div>

            <div className="mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={shouldRefund}
                  onChange={(e) => setShouldRefund(e.target.checked)}
                  className="w-4 h-4 text-gold-600 border-cream-300 rounded focus:ring-gold-500"
                />
                <span className="text-sm text-graphite-700">
                  Zwróć pieniądze (Stripe refund)
                </span>
              </label>
              <p className="text-xs text-graphite-500 ml-6 mt-1">
                {shouldRefund
                  ? '⚠️ DEV MODE: Refund będzie tylko symulowany (TODO: PRODUCTION)'
                  : 'Rezerwacja zostanie anulowana bez zwrotu pieniędzy'}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-graphite-200 text-graphite-800 rounded-xl hover:bg-graphite-300 transition-colors font-semibold"
              >
                Anuluj
              </button>
              <button
                onClick={handleCancelBooking}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-warmwood-500 text-white rounded-xl hover:bg-warmwood-600 transition-colors font-semibold"
              >
                {loading ? 'Anulowanie...' : 'Potwierdź anulowanie'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notes Modal */}
      {showNotesModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-serif font-bold text-graphite-900 mb-4">
              Notatki admina
            </h3>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-graphite-700 mb-2">
                Notatki
              </label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400"
                placeholder="Dodaj notatki dotyczące tej rezerwacji..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowNotesModal(false)}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-graphite-200 text-graphite-800 rounded-xl hover:bg-graphite-300 transition-colors font-semibold"
              >
                Anuluj
              </button>
              <button
                onClick={handleUpdateNotes}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-gold-500 text-white rounded-xl hover:bg-gold-600 transition-colors font-semibold"
              >
                {loading ? 'Zapisywanie...' : 'Zapisz notatki'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Status Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-serif font-bold text-graphite-900 mb-4">
              Zmień status płatności
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-graphite-700 mb-2">
                Nowy status płatności
              </label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value as BookingPaymentStatus)}
                className="w-full px-4 py-2 border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400"
              >
                <option value="pending">Oczekuje</option>
                <option value="paid">Opłacone</option>
                <option value="failed">Błąd płatności</option>
                <option value="refunded">Zwrócone</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-graphite-700 mb-2">
                Powód zmiany statusu
              </label>
              <textarea
                value={paymentNote}
                onChange={(e) => setPaymentNote(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border-2 border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400"
                placeholder="np. Płatność ręczna, korekta błędu..."
              />
              <p className="text-xs text-warmwood-600 mt-2">
                ⚠️ Uwaga: To jest manualna zmiana statusu. Używaj tylko w sytuacjach wyjątkowych.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-graphite-200 text-graphite-800 rounded-xl hover:bg-graphite-300 transition-colors font-semibold"
              >
                Anuluj
              </button>
              <button
                onClick={handleUpdatePaymentStatus}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-nordic-500 text-white rounded-xl hover:bg-nordic-600 transition-colors font-semibold"
              >
                {loading ? 'Zmiana...' : 'Zmień status'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
