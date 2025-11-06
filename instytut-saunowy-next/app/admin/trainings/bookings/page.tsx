import React from 'react';
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import TrainingBooking from '@/lib/models/TrainingBooking';
import Training from '@/lib/models/Training';
import { ITrainingBooking } from '@/types';

async function getAllBookings(): Promise<any[]> {
  try {
    await dbConnect();
    const bookings = await TrainingBooking.find({})
      .populate('trainingId')
      .sort({ createdAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(bookings));
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
}

export default async function AdminBookingsPage() {
  const bookings = await getAllBookings();

  const statusColors = {
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    pending_approval: 'bg-yellow-100 text-yellow-800',
  };

  const paymentStatusColors = {
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800',
    refunded: 'bg-gray-100 text-gray-800',
  };

  const statusLabels = {
    confirmed: 'Potwierdzona',
    cancelled: 'Anulowana',
    pending_approval: 'Oczekuje',
  };

  const paymentLabels = {
    paid: 'Opłacona',
    pending: 'Oczekuje',
    failed: 'Błąd',
    refunded: 'Zwrócona',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rezerwacje szkoleń</h1>
          <p className="text-gray-600 mt-1">Przeglądaj i zarządzaj rezerwacjami</p>
        </div>
        <Link
          href="/admin/trainings"
          className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Powrót do szkoleń
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-1">Wszystkie</div>
          <div className="text-3xl font-bold text-gray-900">{bookings.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-1">Potwierdzone</div>
          <div className="text-3xl font-bold text-green-600">
            {bookings.filter(b => b.status === 'confirmed').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-1">Anulowane</div>
          <div className="text-3xl font-bold text-red-600">
            {bookings.filter(b => b.status === 'cancelled').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-1">Przychód</div>
          <div className="text-3xl font-bold text-blue-600">
            {bookings.filter(b => b.paymentStatus === 'paid').reduce((sum, b) => sum + b.depositAmount, 0).toLocaleString('pl-PL')} zł
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-white rounded-lg shadow">
        {bookings.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-lg">Brak rezerwacji</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uczestnik
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Szkolenie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data rezerwacji
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kwota
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Płatność
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bookings.map((booking: any) => {
                  const bookingDate = new Date(booking.createdAt);

                  return (
                    <tr key={booking._id}>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.participantInfo.name}
                        </div>
                        <div className="text-sm text-gray-500">{booking.participantInfo.email}</div>
                        <div className="text-sm text-gray-500">{booking.participantInfo.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        {booking.trainingId ? (
                          <>
                            <div className="text-sm font-medium text-gray-900">
                              {booking.trainingId.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(booking.trainingId.date).toLocaleDateString('pl-PL')}
                            </div>
                          </>
                        ) : (
                          <span className="text-sm text-gray-500">Usunięte</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {bookingDate.toLocaleDateString('pl-PL')}
                        </div>
                        <div className="text-sm text-gray-500">
                          {bookingDate.toLocaleTimeString('pl-PL')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.depositAmount.toLocaleString('pl-PL')} zł
                        </div>
                        {booking.depositAmount < booking.amount && (
                          <div className="text-xs text-gray-500">
                            z {booking.amount.toLocaleString('pl-PL')} zł
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${paymentStatusColors[booking.paymentStatus]}`}>
                          {paymentLabels[booking.paymentStatus]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[booking.status]}`}>
                          {statusLabels[booking.status]}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
