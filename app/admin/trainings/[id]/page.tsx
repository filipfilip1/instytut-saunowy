import { formatPriceExact } from '@/lib/utils/currency';
import dbConnect from '@/lib/mongodb';
import Training from '@/lib/models/Training';
import { ITraining } from '@/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import TrainingStatusBadge from '@/components/admin/TrainingStatusBadge';
import { getTrainingBookingsCount } from '@/lib/services/trainingService';
import {
  TRAINING_CATEGORY_CONFIG,
  TRAINING_LEVEL_CONFIG,
} from '@/lib/constants/trainingStatuses';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getTraining(id: string): Promise<ITraining | null> {
  await dbConnect();
  const training = await Training.findById(id).lean();
  return training ? JSON.parse(JSON.stringify(training)) : null;
}

export default async function TrainingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const training = await getTraining(id);

  if (!training) {
    notFound();
  }

  const bookingsCount = await getTrainingBookingsCount(id);
  const date = new Date(training.date);
  const occupancy = training.maxParticipants
    ? Math.round((training.currentParticipants / training.maxParticipants) * 100)
    : 0;

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-graphite-900">{training.name}</h1>
          <p className="text-graphite-600 mt-1">{training.slug}</p>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/admin/trainings/${training._id}/edit`}
            className="btn-gold"
          >
            ✏️ Edytuj
          </Link>
          <Link href="/admin/trainings" className="px-4 py-2 bg-graphite-200 text-graphite-800 rounded-xl hover:bg-graphite-300 transition-colors font-semibold">
            ← Powrót
          </Link>
        </div>
      </div>

      {/* Main Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Status Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200">
          <h3 className="text-sm font-semibold text-graphite-600 uppercase tracking-wide mb-3">
            Status
          </h3>
          <TrainingStatusBadge status={training.status} size="md" />
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-graphite-600">Kategoria</span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium ${
                  TRAINING_CATEGORY_CONFIG[training.category].color
                }`}
              >
                {TRAINING_CATEGORY_CONFIG[training.category].label}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-graphite-600">Poziom</span>
              <span className="font-medium">
                {TRAINING_LEVEL_CONFIG[training.level].icon}{' '}
                {TRAINING_LEVEL_CONFIG[training.level].label}
              </span>
            </div>
          </div>
        </div>

        {/* Schedule Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200">
          <h3 className="text-sm font-semibold text-graphite-600 uppercase tracking-wide mb-3">
            Termin
          </h3>
          <div className="space-y-2">
            <div>
              <div className="text-2xl font-serif font-bold text-graphite-900">
                {date.toLocaleDateString('pl-PL', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
              <div className="text-sm text-graphite-600">
                Godzina:{' '}
                {date.toLocaleTimeString('pl-PL', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
            <div className="pt-2 border-t border-cream-300">
              <div className="text-sm text-graphite-600">Czas trwania</div>
              <div className="text-lg font-semibold text-graphite-900">{training.duration} godzin</div>
            </div>
          </div>
        </div>

        {/* Price Card */}
        <div className="bg-gradient-to-br from-gold-50 to-white rounded-2xl shadow-lg p-6 border-2 border-gold-200">
          <h3 className="text-sm font-semibold text-gold-700 uppercase tracking-wide mb-3">
            Cena
          </h3>
          <div className="text-3xl font-serif font-bold text-gold-800">
            {formatPriceExact(training.price)}
          </div>
          {training.depositPercentage < 100 && (
            <div className="mt-2 text-sm text-gold-700">
              Zaliczka: {training.depositPercentage}% (
              {formatPriceExact((training.price * training.depositPercentage) / 100)})
            </div>
          )}
        </div>
      </div>

      {/* Participants & Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200">
          <h3 className="text-lg font-serif font-semibold text-graphite-900 mb-4">
            Uczestnicy
          </h3>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-3xl font-serif font-bold text-graphite-900">
                {training.currentParticipants} / {training.maxParticipants}
              </div>
              <div className="text-sm text-graphite-600">Zapełnienie: {occupancy}%</div>
            </div>
            <div className="text-4xl">
              {occupancy >= 100 ? '🔴' : occupancy >= 80 ? '🟡' : '🟢'}
            </div>
          </div>
          <div className="w-full bg-cream-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${
                occupancy >= 100
                  ? 'bg-warmwood-500'
                  : occupancy >= 80
                  ? 'bg-gold-500'
                  : 'bg-forest-500'
              }`}
              style={{ width: `${Math.min(occupancy, 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200">
          <h3 className="text-lg font-serif font-semibold text-graphite-900 mb-4">
            Rezerwacje
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-forest-50 rounded-xl border border-forest-200">
              <div className="text-2xl font-bold text-forest-800">{bookingsCount.confirmed}</div>
              <div className="text-xs text-forest-600">Potwierdzone</div>
            </div>
            <div className="text-center p-3 bg-gold-50 rounded-xl border border-gold-200">
              <div className="text-2xl font-bold text-gold-800">{bookingsCount.pending}</div>
              <div className="text-xs text-gold-600">Oczekujące</div>
            </div>
            <div className="text-center p-3 bg-warmwood-50 rounded-xl border border-warmwood-200">
              <div className="text-2xl font-bold text-warmwood-800">
                {bookingsCount.cancelled}
              </div>
              <div className="text-xs text-warmwood-600">Anulowane</div>
            </div>
          </div>
          <Link
            href={`/admin/bookings?trainingId=${training._id}`}
            className="mt-4 block text-center px-4 py-2 bg-nordic-100 text-nordic-800 rounded-xl hover:bg-nordic-200 transition-colors font-semibold text-sm"
          >
            Zobacz wszystkie rezerwacje →
          </Link>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200 mb-8">
        <h3 className="text-lg font-serif font-semibold text-graphite-900 mb-4">Lokalizacja</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-sm text-graphite-600">Miejsce</div>
            <div className="text-lg font-semibold text-graphite-900">{training.location.venue}</div>
          </div>
          <div>
            <div className="text-sm text-graphite-600">Adres</div>
            <div className="text-lg font-semibold text-graphite-900">{training.location.address}</div>
          </div>
          <div>
            <div className="text-sm text-graphite-600">Miasto</div>
            <div className="text-lg font-semibold text-graphite-900">{training.location.city}</div>
          </div>
        </div>
        {training.location.mapUrl && (
          <a
            href={training.location.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-nordic-600 hover:text-nordic-800 text-sm font-medium"
          >
            📍 Otwórz w mapach →
          </a>
        )}
      </div>

      {/* Description */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200 mb-8">
        <h3 className="text-lg font-serif font-semibold text-graphite-900 mb-4">Opis</h3>
        {training.shortDescription && (
          <p className="text-graphite-700 font-medium mb-4 pb-4 border-b border-cream-300">
            {training.shortDescription}
          </p>
        )}
        <div className="prose prose-graphite max-w-none">
          <p className="text-graphite-600 whitespace-pre-wrap">{training.description}</p>
        </div>
      </div>

      {/* What You Learn */}
      {training.whatYouLearn && training.whatYouLearn.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200 mb-8">
          <h3 className="text-lg font-serif font-semibold text-graphite-900 mb-4">
            Czego się nauczysz
          </h3>
          <ul className="space-y-2">
            {training.whatYouLearn.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-gold-500 mr-3 mt-1">✓</span>
                <span className="text-graphite-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Instructor */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200 mb-8">
        <h3 className="text-lg font-serif font-semibold text-graphite-900 mb-4">Instruktor</h3>
        <div className="flex items-start gap-4">
          {training.instructor.avatar && (
            <img
              src={training.instructor.avatar}
              alt={training.instructor.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-gold-300"
            />
          )}
          <div>
            <div className="text-xl font-semibold text-graphite-900">
              {training.instructor.name}
            </div>
            {training.instructor.bio && (
              <p className="text-graphite-600 mt-2">{training.instructor.bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200">
        <h3 className="text-lg font-serif font-semibold text-graphite-900 mb-4">Zdjęcia</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-2">
            <img
              src={training.featuredImage.url}
              alt={training.featuredImage.alt}
              className="w-full h-64 object-cover rounded-xl border-2 border-gold-300"
            />
            <p className="text-xs text-center text-graphite-500 mt-1">Zdjęcie główne</p>
          </div>
          {training.images?.map((img, index) => (
            <div key={index}>
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-32 object-cover rounded-xl border-2 border-cream-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
