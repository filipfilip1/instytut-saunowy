import { formatPriceExact } from '@/lib/utils/currency';
import { getBookingsWithStats } from '@/lib/services/bookingService';
import Link from 'next/link';
import BookingStatusBadge from '@/components/admin/BookingStatusBadge';

export default async function AdminBookingsPage() {
  const { bookings, stats } = await getBookingsWithStats({
    sortBy: '-createdAt',
  });

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-graphite-900">Rezerwacje</h1>
          <p className="text-graphite-600 mt-1">Zarządzaj rezerwacjami szkoleń</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-forest-50 to-white rounded-2xl shadow-lg p-6 border-2 border-forest-200">
          <div className="text-sm font-medium text-forest-700 uppercase tracking-wide mb-1">
            Potwierdzone
          </div>
          <div className="text-3xl font-serif font-bold text-forest-800">
            {stats.statusCounts.confirmed}
          </div>
          <div className="text-xs text-forest-600 mt-1">Aktywne rezerwacje</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200">
          <div className="text-sm font-medium text-gold-700 uppercase tracking-wide mb-1">
            Oczekujące
          </div>
          <div className="text-3xl font-serif font-bold text-gold-800">
            {stats.statusCounts.pending_approval}
          </div>
          <div className="text-xs text-gold-600 mt-1">Do zatwierdzenia</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200">
          <div className="text-sm font-medium text-warmwood-700 uppercase tracking-wide mb-1">
            Anulowane
          </div>
          <div className="text-3xl font-serif font-bold text-warmwood-800">
            {stats.statusCounts.cancelled}
          </div>
          <div className="text-xs text-warmwood-600 mt-1">Zwroty i anulacje</div>
        </div>

        <div className="bg-gradient-to-br from-gold-50 to-white rounded-2xl shadow-lg p-6 border-2 border-gold-200">
          <div className="text-sm font-medium text-gold-700 uppercase tracking-wide mb-1">
            Przychód
          </div>
          <div className="text-2xl font-serif font-bold text-gold-800">
            {formatPriceExact(stats.totalRevenue)}
          </div>
          <div className="text-xs text-gold-600 mt-1">Opłacone rezerwacje</div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-cream-300">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-graphite-50 to-cream-100 border-b-2 border-cream-300">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-graphite-700 uppercase tracking-wider">
                Uczestnik
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-graphite-700 uppercase tracking-wider">
                Szkolenie
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-graphite-700 uppercase tracking-wider">
                Data szkolenia
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-graphite-700 uppercase tracking-wider">
                Kwota
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-graphite-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-graphite-700 uppercase tracking-wider">
                Akcje
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-cream-200">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-graphite-500">
                  <div className="text-4xl mb-4">📋</div>
                  <p className="text-lg font-medium">Brak rezerwacji</p>
                  <p className="text-sm mt-2">Rezerwacje pojawią się tutaj automatycznie</p>
                </td>
              </tr>
            ) : (
              bookings.map((booking: any) => {
                const trainingDate = booking.trainingId?.date
                  ? new Date(booking.trainingId.date)
                  : null;

                return (
                  <tr key={booking._id} className="hover:bg-cream-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-semibold text-graphite-900">
                          {booking.participantInfo.name}
                        </div>
                        <div className="text-xs text-graphite-500">
                          {booking.participantInfo.email}
                        </div>
                        <div className="text-xs text-graphite-500">
                          {booking.participantInfo.phone}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-graphite-900">
                          {booking.trainingId?.name || 'Nieznane szkolenie'}
                        </div>
                        <div className="text-xs text-graphite-500">
                          {booking.trainingId?.location?.city || '—'}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-graphite-700">
                      {trainingDate ? (
                        <div>
                          <div className="font-medium">
                            {trainingDate.toLocaleDateString('pl-PL', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                          <div className="text-xs text-graphite-500">
                            {trainingDate.toLocaleTimeString('pl-PL', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </div>
                        </div>
                      ) : (
                        '—'
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-graphite-900">
                        {formatPriceExact(booking.paymentAmount)}
                      </div>
                      <div className="text-xs text-graphite-500">
                        {booking.paymentType === 'deposit' ? 'Zaliczka' : 'Pełna płatność'}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <BookingStatusBadge
                        bookingStatus={booking.bookingStatus}
                        paymentStatus={booking.paymentStatus}
                        size="sm"
                      />
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        href={`/admin/bookings/${booking._id}`}
                        className="text-nordic-600 hover:text-nordic-800 transition-colors"
                      >
                        Szczegóły
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
