'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IOrder } from '@/types';
import { useToast } from '@/hooks/useToast';

interface OrderActionsClientProps {
  order: IOrder;
}

export default function OrderActionsClient({ order }: OrderActionsClientProps) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(order.paymentStatus);
  const [trackingNumber, setTrackingNumber] = useState(order.trackingNumber || '');

  const handleUpdateStatus = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/orders/${order._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: selectedStatus,
          paymentStatus: selectedPaymentStatus,
        }),
      });

      if (!response.ok) {
        throw new Error('Nie udało się zaktualizować statusu');
      }

      setShowStatusModal(false);
      router.refresh();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Wystąpił błąd podczas aktualizacji statusu');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTracking = async () => {
    if (loading || !trackingNumber.trim()) return;
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/orders/${order._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackingNumber: trackingNumber.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Nie udało się zaktualizować numeru przesyłki');
      }

      setShowTrackingModal(false);
      router.refresh();
    } catch (error) {
      console.error('Error updating tracking:', error);
      toast.error('Wystąpił błąd podczas aktualizacji numeru przesyłki');
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: 'pending', label: 'Oczekujące', icon: '⏳' },
    { value: 'processing', label: 'W realizacji', icon: '🔄' },
    { value: 'shipped', label: 'Wysłane', icon: '📦' },
    { value: 'delivered', label: 'Dostarczone', icon: '✅' },
    { value: 'cancelled', label: 'Anulowane', icon: '❌' },
  ];

  const paymentStatusOptions = [
    { value: 'pending', label: 'Oczekuje płatności', icon: '💳' },
    { value: 'paid', label: 'Opłacone', icon: '✓' },
    { value: 'failed', label: 'Płatność nieudana', icon: '✗' },
  ];

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Akcje</h2>
        </div>

        <div className="px-6 py-4 space-y-3">
          <button
            onClick={() => setShowStatusModal(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Zmień status
          </button>

          <button
            onClick={() => setShowTrackingModal(true)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            {order.trackingNumber ? 'Edytuj numer przesyłki' : 'Dodaj numer przesyłki'}
          </button>
        </div>
      </div>

      {/* Status Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Zmień status zamówienia
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status zamówienia
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.icon} {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status płatności
                </label>
                <select
                  value={selectedPaymentStatus}
                  onChange={(e) => setSelectedPaymentStatus(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {paymentStatusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.icon} {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowStatusModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Anuluj
              </button>
              <button
                onClick={handleUpdateStatus}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Zapisywanie...' : 'Zapisz'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tracking Modal */}
      {showTrackingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {order.trackingNumber ? 'Edytuj' : 'Dodaj'} numer przesyłki
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numer śledzenia przesyłki
                </label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="np. DPD123456789012"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Status zostanie automatycznie zmieniony na "Wysłane"
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowTrackingModal(false);
                  setTrackingNumber(order.trackingNumber || '');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Anuluj
              </button>
              <button
                onClick={handleUpdateTracking}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                disabled={loading || !trackingNumber.trim()}
              >
                {loading ? 'Zapisywanie...' : 'Zapisz'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}