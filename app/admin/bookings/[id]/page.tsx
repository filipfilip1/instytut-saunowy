import { formatPriceExact } from '@/lib/utils/currency';
import dbConnect from '@/lib/mongodb';
import TrainingBooking from '@/lib/models/TrainingBooking';
import { ITrainingBooking } from '@/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import BookingStatusBadge from '@/components/admin/BookingStatusBadge';
import BookingActionsClient from '../BookingActionsClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

type PopulatedTraining = {
  _id: string;
  name: string;
  date: Date;
  location: { venue: string; city: string };
  slug: string;
  price: number;
};

type PopulatedBooking = Omit<ITrainingBooking, 'trainingId'> & {
  trainingId: PopulatedTraining;
};

async function getBooking(id: string): Promise<PopulatedBooking | null> {
  await dbConnect();
  const booking = await TrainingBooking.findById(id)
    .populate('trainingId', 'name date location slug price duration')
    .lean();
  return booking ? JSON.parse(JSON.stringify(booking)) : null;
}

export default async function BookingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const booking = await getBooking(id);

  if (!booking) {
    notFound();
  }

  const training = booking.trainingId;
  const trainingDate = training?.date ? new Date(training.date) : null;
  const bookingDate = new Date(booking.createdAt);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-graphite-900">
            Rezerwacja #{booking._id.slice(-8)}
          </h1>
          <p className="text-graphite-600 mt-1">{booking.participantInfo.name}</p>
        </div>
        <Link
          href="/admin/bookings"
          className="px-4 py-2 bg-graphite-200 text-graphite-800 rounded-xl hover:bg-graphite-300 transition-colors font-semibold"
        >
          ← Powrót
        </Link>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200">
          <h3 className="text-sm font-semibold text-graphite-600 uppercase tracking-wide mb-3">
            Status rezerwacji
          </h3>
          <BookingStatusBadge
            bookingStatus={booking.bookingStatus}
            paymentStatus={booking.paymentStatus}
            size="md"
          />
          <div className="mt-4 text-sm text-graphite-600">
            <div className="flex justify-between mb-2">
              <span>Typ płatności:</span>
              <span className="font-medium">
                {booking.paymentType === 'deposit' ? 'Zaliczka' : 'Pełna płatność'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Data rezerwacji:</span>
              <span className="font-medium">
                {bookingDate.toLocaleDateString('pl-PL', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gold-50 to-white rounded-2xl shadow-lg p-6 border-2 border-gold-200">
          <h3 className="text-sm font-semibold text-gold-700 uppercase tracking-wide mb-3">
            Płatność
          </h3>
          <div className="text-3xl font-serif font-bold text-gold-800">
            {formatPriceExact(booking.paymentAmount)}
          </div>
          <div className="mt-2 text-sm text-gold-700">
            Stripe Session ID:
            <br />
            <code className="text-xs bg-gold-100 px-2 py-1 rounded mt-1 block break-all">
              {booking.stripeSessionId}
            </code>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200">
          <h3 className="text-sm font-semibold text-graphite-600 uppercase tracking-wide mb-3">
            Szkolenie
          </h3>
          <Link
            href={`/admin/trainings/${training?._id}`}
            className="text-lg font-semibold text-nordic-600 hover:text-nordic-800 transition-colors"
          >
            {training?.name || 'Nieznane szkolenie'}
          </Link>
          {trainingDate && (
            <div className="mt-2 text-sm text-graphite-600">
              <div>
                📅{' '}
                {trainingDate.toLocaleDateString('pl-PL', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
              <div className="mt-1">
                🕐{' '}
                {trainingDate.toLocaleTimeString('pl-PL', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
              <div className="mt-1">📍 {training?.location?.city || '—'}</div>
            </div>
          )}
        </div>
      </div>

      {/* Participant Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200 mb-8">
        <h3 className="text-lg font-serif font-semibold text-graphite-900 mb-4">
          Dane uczestnika
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <div className="text-sm text-graphite-600 mb-1">Imię i nazwisko</div>
              <div className="text-lg font-semibold text-graphite-900">
                {booking.participantInfo.name}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm text-graphite-600 mb-1">Email</div>
              <div className="text-lg font-medium text-graphite-900">
                <a
                  href={`mailto:${booking.participantInfo.email}`}
                  className="text-nordic-600 hover:text-nordic-800"
                >
                  {booking.participantInfo.email}
                </a>
              </div>
            </div>

            <div>
              <div className="text-sm text-graphite-600 mb-1">Telefon</div>
              <div className="text-lg font-medium text-graphite-900">
                <a
                  href={`tel:${booking.participantInfo.phone}`}
                  className="text-nordic-600 hover:text-nordic-800"
                >
                  {booking.participantInfo.phone}
                </a>
              </div>
            </div>
          </div>

          <div>
            {booking.participantInfo.experience && (
              <div className="mb-4">
                <div className="text-sm text-graphite-600 mb-1">Doświadczenie</div>
                <div className="text-graphite-900">{booking.participantInfo.experience}</div>
              </div>
            )}

            {booking.participantInfo.specialRequirements && (
              <div>
                <div className="text-sm text-graphite-600 mb-1">Specjalne wymagania</div>
                <div className="text-graphite-900">
                  {booking.participantInfo.specialRequirements}
                </div>
              </div>
            )}

            {!booking.participantInfo.experience && !booking.participantInfo.specialRequirements && (
              <div className="text-graphite-500 italic">Brak dodatkowych informacji</div>
            )}
          </div>
        </div>
      </div>

      {/* Admin Notes */}
      {booking.adminNotes && (
        <div className="bg-gold-50 rounded-2xl shadow-lg p-6 border-2 border-gold-200 mb-8">
          <h3 className="text-lg font-serif font-semibold text-gold-900 mb-4">Notatki admina</h3>
          <div className="text-graphite-700 whitespace-pre-wrap">{booking.adminNotes}</div>
        </div>
      )}

      {/* Cancellation Info */}
      {booking.bookingStatus === 'cancelled' && (
        <div className="bg-warmwood-50 rounded-2xl shadow-lg p-6 border-2 border-warmwood-200 mb-8">
          <h3 className="text-lg font-serif font-semibold text-warmwood-900 mb-4">
            Informacje o anulowaniu
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {booking.cancelledAt && (
              <div>
                <div className="text-sm text-warmwood-700 mb-1">Data anulowania</div>
                <div className="text-warmwood-900 font-medium">
                  {new Date(booking.cancelledAt).toLocaleDateString('pl-PL', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            )}
            {booking.cancellationReason && (
              <div>
                <div className="text-sm text-warmwood-700 mb-1">Powód anulowania</div>
                <div className="text-warmwood-900">{booking.cancellationReason}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200">
        <h3 className="text-lg font-serif font-semibold text-graphite-900 mb-4">Akcje</h3>
        <BookingActionsClient booking={{ ...booking, trainingId: training._id }} />
      </div>
    </div>
  );
}
