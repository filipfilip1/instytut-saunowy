import { formatPriceExact } from '@/lib/utils/currency';
import { getTrainingsWithStats } from '@/lib/services/trainingService';
import Link from 'next/link';
import TrainingStatusBadge from '@/components/admin/TrainingStatusBadge';
import { TRAINING_CATEGORY_CONFIG } from '@/lib/constants/trainingStatuses';

export default async function AdminTrainingsPage() {
  const { trainings, stats } = await getTrainingsWithStats({
    sortBy: '-date',
  });

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-graphite-900">Szkolenia</h1>
          <p className="text-graphite-600 mt-1">Zarządzaj szkoleniami Aufguss</p>
        </div>
        <Link href="/admin/trainings/new" className="btn-forest">
          + Dodaj szkolenie
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-gradient-to-br from-gold-50 to-white rounded-2xl shadow-lg p-6 border-2 border-gold-200">
          <div className="text-sm font-medium text-gold-700 uppercase tracking-wide mb-1">
            Nadchodzące
          </div>
          <div className="text-3xl font-serif font-bold text-gold-800">
            {stats.upcomingCount}
          </div>
          <div className="text-xs text-gold-600 mt-1">Opublikowane i przyszłe</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200">
          <div className="text-sm font-medium text-graphite-600 uppercase tracking-wide mb-1">
            Szkice
          </div>
          <div className="text-3xl font-serif font-bold text-graphite-800">
            {stats.statusCounts.draft}
          </div>
          <div className="text-xs text-graphite-500 mt-1">Do opublikowania</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200">
          <div className="text-sm font-medium text-forest-700 uppercase tracking-wide mb-1">
            Opublikowane
          </div>
          <div className="text-3xl font-serif font-bold text-forest-800">
            {stats.statusCounts.published}
          </div>
          <div className="text-xs text-forest-600 mt-1">Aktywne szkolenia</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-cream-200">
          <div className="text-sm font-medium text-nordic-700 uppercase tracking-wide mb-1">
            Zakończone
          </div>
          <div className="text-3xl font-serif font-bold text-nordic-800">
            {stats.statusCounts.completed}
          </div>
          <div className="text-xs text-nordic-600 mt-1">Archiwalne</div>
        </div>

        <div className="bg-gradient-to-br from-forest-50 to-white rounded-2xl shadow-lg p-6 border-2 border-forest-200">
          <div className="text-sm font-medium text-forest-700 uppercase tracking-wide mb-1">
            Średnie zapełnienie
          </div>
          <div className="text-3xl font-serif font-bold text-forest-800">
            {stats.averageOccupancy}%
          </div>
          <div className="text-xs text-forest-600 mt-1">Wszystkie szkolenia</div>
        </div>
      </div>

      {/* Trainings Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-cream-300">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-graphite-50 to-cream-100 border-b-2 border-cream-300">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-graphite-700 uppercase tracking-wider">
                Szkolenie
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-graphite-700 uppercase tracking-wider">
                Data
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-graphite-700 uppercase tracking-wider">
                Lokalizacja
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-graphite-700 uppercase tracking-wider">
                Uczestnicy
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-graphite-700 uppercase tracking-wider">
                Cena
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
            {trainings.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-graphite-500">
                  <div className="text-4xl mb-4">📚</div>
                  <p className="text-lg font-medium">Brak szkoleń</p>
                  <p className="text-sm mt-2">Dodaj pierwsze szkolenie, aby zacząć</p>
                </td>
              </tr>
            ) : (
              trainings.map((training) => {
                const date = new Date(training.date);
                const occupancy = training.maxParticipants
                  ? Math.round((training.currentParticipants / training.maxParticipants) * 100)
                  : 0;

                return (
                  <tr key={training._id} className="hover:bg-cream-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 flex-shrink-0">
                          <img
                            className="h-12 w-12 rounded-xl object-cover border-2 border-cream-200"
                            src={training.featuredImage?.url || '/placeholder.png'}
                            alt={training.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-graphite-900">
                            {training.name}
                          </div>
                          <div className="text-xs text-graphite-500">{training.slug}</div>
                          <span
                            className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${
                              TRAINING_CATEGORY_CONFIG[training.category].color
                            }`}
                          >
                            {TRAINING_CATEGORY_CONFIG[training.category].label}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-graphite-900">
                      <div className="font-semibold">
                        {date.toLocaleDateString('pl-PL', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="text-xs text-graphite-500">
                        {date.toLocaleTimeString('pl-PL', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        • {training.duration}h
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-graphite-600">
                      <div className="font-medium">{training.location.city}</div>
                      <div className="text-xs text-graphite-500">{training.location.venue}</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-graphite-900">
                        {training.currentParticipants} / {training.maxParticipants}
                      </div>
                      <div className="w-full bg-cream-200 rounded-full h-2 mt-1">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            occupancy >= 100
                              ? 'bg-warmwood-500'
                              : occupancy >= 80
                              ? 'bg-gold-500'
                              : 'bg-forest-500'
                          }`}
                          style={{ width: `${Math.min(occupancy, 100)}%` }}
                        />
                      </div>
                      <div className="text-xs text-graphite-500 mt-0.5">{occupancy}%</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-graphite-900">
                      {formatPriceExact(training.price)}
                      {training.depositPercentage < 100 && (
                        <div className="text-xs text-graphite-500 font-normal">
                          Zaliczka: {training.depositPercentage}%
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <TrainingStatusBadge status={training.status} size="sm" />
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                      <Link
                        href={`/admin/trainings/${training._id}`}
                        className="text-nordic-600 hover:text-nordic-800 transition-colors"
                      >
                        Zobacz
                      </Link>
                      <Link
                        href={`/admin/trainings/${training._id}/edit`}
                        className="text-gold-600 hover:text-gold-800 transition-colors"
                      >
                        Edytuj
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
