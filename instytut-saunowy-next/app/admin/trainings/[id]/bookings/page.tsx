import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Training from '@/lib/models/Training';
import TrainingBooking from '@/lib/models/TrainingBooking';
import { ITraining } from '@/types';

interface PageProps {
  params: {
    id: string;
  };
}

async function getTrainingWithBookings(id: string) {
  try {
    await dbConnect();

    const training = await Training.findById(id).lean();
    if (!training) return null;

    const bookings = await TrainingBooking.find({ trainingId: id })
      .sort({ createdAt: -1 })
      .lean();

    return {
      training: JSON.parse(JSON.stringify(training)),
      bookings: JSON.parse(JSON.stringify(bookings)),
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export default async function TrainingBookingsPage({ params }: PageProps) {
  const data = await getTrainingWithBookings(params.id);

  if (!data) {
    notFound();
  }

  const { training, bookings } = data;

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

  const confirmedBookings = bookings.filter((b: any) => b.status === 'confirmed' && b.paymentStatus === 'paid');
  const totalRevenue = confirmedBookings.reduce((sum: number, b: any) => sum + b.depositAmount, 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rezerwacje szkolenia</h1>
          <p className="text-gray-600 mt-1">{training.name}</p>
          <p className="text-sm text-gray-500">
            {new Date(training.date).toLocaleDateString('pl-PL')} • {training.location.city}
          </p>
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

      {/* Training Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-1">Wszystkie rezerwacje</div>
          <div className="text-3xl font-bold text-gray-900">{bookings.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-1">Potwierdzone</div>
          <div className="text-3xl font-bold text-green-600">{confirmedBookings.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-1">Wolne miejsca</div>
          <div className="text-3xl font-bold text-blue-600">
            {training.maxParticipants - training.currentParticipants}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-1">Przychód</div>
          <div className="text-3xl font-bold text-green-600">
            {totalRevenue.toLocaleString('pl-PL')} zł
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-white rounded-lg shadow">
        {bookings.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-lg">Brak rezerwacji na to szkolenie</p>
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
                    Kontakt
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Doświadczenie
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
                    <tr key={booking._id} className={booking.status === 'cancelled' ? 'bg-gray-50' : ''}>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.participantInfo.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{booking.participantInfo.email}</div>
                        <div className="text-sm text-gray-500">{booking.participantInfo.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-700 max-w-xs truncate">
                          {booking.participantInfo.experience || '-'}
                        </div>
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
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${paymentStatusColors[booking.paymentStatus as keyof typeof paymentStatusColors]}`}>
                          {paymentLabels[booking.paymentStatus as keyof typeof paymentLabels]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[booking.status as keyof typeof statusColors]}`}>
                          {statusLabels[booking.status as keyof typeof statusLabels]}
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

      {/* Export Options (Future feature) */}
      <div className="mt-6 flex justify-end">
        <button
          disabled
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 opacity-50 cursor-not-allowed"
        >
          Eksportuj do CSV (TODO)
        </button>
      </div>
    </div>
  );
}
