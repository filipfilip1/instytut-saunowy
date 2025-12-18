'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ITrainingBooking } from '@/types';
import { formatPriceExact } from '@/lib/utils/currency';
import { Calendar, Filter, MapPin, Clock } from 'lucide-react';
import BookingStatusBadge from '@/components/admin/BookingStatusBadge';
import { BOOKING_STATUSES } from '@/lib/constants/bookingStatuses';

export default function UserBookingsPage() {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState<(ITrainingBooking & { trainingId: any })[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    if (status === 'authenticated') {
      fetchBookings();
    }
  }, [status, selectedStatus]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedStatus) params.append('status', selectedStatus);

      const response = await fetch(`/api/user/bookings?${params.toString()}`);
      const data = await response.json();

      if (data.status === 'success') {
        setBookings(data.data);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-forest-600"></div>
      </div>
    );
  }

  const upcomingBookings = bookings.filter(
    (b) =>
      b.bookingStatus === 'confirmed' &&
      b.trainingId?.date &&
      new Date(b.trainingId.date) > new Date()
  );

  const pastBookings = bookings.filter(
    (b) =>
      b.bookingStatus === 'confirmed' &&
      b.trainingId?.date &&
      new Date(b.trainingId.date) <= new Date()
  );

  const cancelledBookings = bookings.filter((b) => b.bookingStatus === 'cancelled');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-serif font-bold text-graphite-900 mb-2">
          Moje Rezerwacje
        </h1>
        <p className="text-graphite-600">
          Przegląd twoich rezerwacji szkoleń i nadchodzących wydarzeń
        </p>
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
                  ? 'bg-forest-400 text-white'
                  : 'bg-cream-100 text-graphite-600 hover:bg-cream-200'
              }`}
            >
              Wszystkie {stats.statusCounts ? `(${Object.values(stats.statusCounts).reduce((a: any, b: any) => a + b, 0)})` : ''}
            </button>
            {BOOKING_STATUSES.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  selectedStatus === status
                    ? 'bg-forest-400 text-white'
                    : 'bg-cream-100 text-graphite-600 hover:bg-cream-200'
                }`}
              >
                {status === 'confirmed' && 'Potwierdzone'}
                {status === 'cancelled' && 'Anulowane'}
                {status === 'pending_approval' && 'Oczekujące'}
                {stats.statusCounts?.[status] ? ` (${stats.statusCounts[status]})` : ''}
              </button>
            ))}
          </div>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md border-2 border-cream-200 p-12 text-center">
          <Calendar className="w-20 h-20 text-graphite-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-graphite-900 mb-2">
            {selectedStatus ? 'Brak rezerwacji z tym statusem' : 'Nie masz jeszcze żadnych rezerwacji'}
          </h3>
          <p className="text-graphite-500 mb-6">
            {selectedStatus
              ? 'Spróbuj wybrać inny filtr'
              : 'Odkryj nasze szkolenia i zapisz się na szkolenie'}
          </p>
          {!selectedStatus && (
            <Link href="/szkolenia" className="btn-forest inline-flex items-center gap-2">
              Przejdź do szkoleń
            </Link>
          )}
        </div>
      ) : (
        <>
          {/* Upcoming Bookings */}
          {upcomingBookings.length > 0 && !selectedStatus && (
            <div className="bg-white rounded-2xl shadow-md border-2 border-forest-200 overflow-hidden">
              <div className="px-6 py-4 bg-forest-50 border-b border-forest-200">
                <h2 className="text-xl font-serif font-bold text-graphite-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-forest-600" />
                  Nadchodzące szkolenia ({upcomingBookings.length})
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {upcomingBookings.map((booking) => (
                  <div
                    key={booking._id.toString()}
                    className="bg-cream-50 rounded-xl p-6 border-2 border-forest-200 hover:border-forest-400 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-serif font-bold text-graphite-900 mb-2">
                          {booking.trainingId?.name || 'Szkolenie'}
                        </h3>
                        <div className="space-y-2 text-sm text-graphite-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {booking.trainingId?.date
                                ? new Date(booking.trainingId.date).toLocaleDateString('pl-PL', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  })
                                : 'Data do ustalenia'}
                            </span>
                          </div>
                          {booking.trainingId?.duration && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{booking.trainingId.duration}h</span>
                            </div>
                          )}
                          {booking.trainingId?.location?.venue && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>
                                {booking.trainingId.location.venue}, {booking.trainingId.location.city}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <BookingStatusBadge
                        bookingStatus={booking.bookingStatus}
                        paymentStatus={booking.paymentStatus}
                        size="md"
                      />
                    </div>
                    <div className="pt-4 border-t border-cream-200 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-graphite-600">Kwota:</p>
                        <p className="text-lg font-bold text-graphite-900">
                          {formatPriceExact(booking.paymentAmount)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-graphite-600">Numer rezerwacji:</p>
                        <p className="text-sm font-mono font-semibold text-graphite-900">
                          #{booking._id.toString().slice(-8).toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Past Bookings */}
          {pastBookings.length > 0 && !selectedStatus && (
            <div className="bg-white rounded-2xl shadow-md border-2 border-cream-200 overflow-hidden">
              <div className="px-6 py-4 bg-cream-50 border-b border-cream-200">
                <h2 className="text-xl font-serif font-bold text-graphite-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-graphite-600" />
                  Ukończone szkolenia ({pastBookings.length})
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {pastBookings.map((booking) => (
                  <div
                    key={booking._id.toString()}
                    className="bg-cream-50 rounded-xl p-6 border border-cream-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-graphite-900 mb-2">
                          {booking.trainingId?.name || 'Szkolenie'}
                        </h3>
                        <div className="space-y-1 text-sm text-graphite-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {booking.trainingId?.date
                                ? new Date(booking.trainingId.date).toLocaleDateString('pl-PL', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                  })
                                : 'Data do ustalenia'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <BookingStatusBadge
                        bookingStatus={booking.bookingStatus}
                        paymentStatus={booking.paymentStatus}
                        size="sm"
                      />
                    </div>
                    <div className="pt-4 border-t border-cream-200 text-sm text-graphite-600">
                      Rezerwacja: #{booking._id.toString().slice(-8).toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cancelled Bookings */}
          {cancelledBookings.length > 0 && (selectedStatus === 'cancelled' || !selectedStatus) && (
            <div className="bg-white rounded-2xl shadow-md border-2 border-cream-200 overflow-hidden">
              <div className="px-6 py-4 bg-cream-50 border-b border-cream-200">
                <h2 className="text-xl font-serif font-bold text-graphite-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-graphite-600" />
                  Anulowane rezerwacje ({cancelledBookings.length})
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {cancelledBookings.map((booking) => (
                  <div
                    key={booking._id.toString()}
                    className="bg-cream-50 rounded-xl p-6 border border-warmwood-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-graphite-900 mb-2">
                          {booking.trainingId?.name || 'Szkolenie'}
                        </h3>
                        <div className="text-sm text-graphite-600">
                          Anulowano{' '}
                          {booking.cancelledAt
                            ? new Date(booking.cancelledAt).toLocaleDateString('pl-PL')
                            : ''}
                        </div>
                        {booking.cancellationReason && (
                          <p className="text-sm text-graphite-600 mt-2">
                            Powód: {booking.cancellationReason}
                          </p>
                        )}
                      </div>
                      <BookingStatusBadge
                        bookingStatus={booking.bookingStatus}
                        paymentStatus={booking.paymentStatus}
                        size="sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Bookings Table (when filtered) */}
          {selectedStatus && (
            <div className="bg-white rounded-2xl shadow-md border-2 border-cream-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-cream-50 border-b border-cream-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-graphite-700 uppercase tracking-wider">
                        Szkolenie
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-graphite-700 uppercase tracking-wider">
                        Data
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-graphite-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-graphite-700 uppercase tracking-wider">
                        Kwota
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-graphite-700 uppercase tracking-wider">
                        Rezerwacja
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-200">
                    {bookings.map((booking) => (
                      <tr key={booking._id.toString()} className="hover:bg-cream-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="font-semibold text-graphite-900">
                            {booking.trainingId?.name || 'Szkolenie'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-graphite-600">
                            {booking.trainingId?.date
                              ? new Date(booking.trainingId.date).toLocaleDateString('pl-PL')
                              : 'Data do ustalenia'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <BookingStatusBadge
                            bookingStatus={booking.bookingStatus}
                            paymentStatus={booking.paymentStatus}
                            size="sm"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-graphite-900">
                            {formatPriceExact(booking.paymentAmount)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-mono text-graphite-600">
                            #{booking._id.toString().slice(-8).toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Help Section */}
      <div className="bg-gradient-to-br from-forest-700 to-forest-900 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-serif font-bold mb-4">Pytania o szkolenie?</h2>
        <p className="text-cream-200 mb-6">
          Skontaktuj się z nami jeśli masz pytania dotyczące swojej rezerwacji
        </p>
        <Link href="/kontakt" className="btn-gold inline-flex items-center gap-2">
          Skontaktuj się z nami
        </Link>
      </div>
    </div>
  );
}
