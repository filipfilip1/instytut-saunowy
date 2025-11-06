import React from 'react';
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Training from '@/lib/models/Training';
import { ITraining } from '@/types';

async function getAllTrainings(): Promise<ITraining[]> {
  try {
    await dbConnect();
    const trainings = await Training.find({}).sort({ date: -1 }).lean();
    return JSON.parse(JSON.stringify(trainings));
  } catch (error) {
    console.error('Error fetching trainings:', error);
    return [];
  }
}

export default async function AdminTrainingsPage() {
  const trainings = await getAllTrainings();

  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    published: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
  };

  const statusLabels = {
    draft: 'Szkic',
    published: 'Opublikowane',
    cancelled: 'Anulowane',
    completed: 'Zakończone',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Szkolenia</h1>
          <p className="text-gray-600 mt-1">Zarządzaj szkoleniami Aufguss</p>
        </div>
        <Link
          href="/admin/trainings/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Dodaj szkolenie
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-1">Wszystkie</div>
          <div className="text-3xl font-bold text-gray-900">{trainings.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-1">Opublikowane</div>
          <div className="text-3xl font-bold text-green-600">
            {trainings.filter(t => t.status === 'published').length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-1">Nadchodzące</div>
          <div className="text-3xl font-bold text-blue-600">
            {trainings.filter(t => t.status === 'published' && new Date(t.date) > new Date()).length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-1">Szkice</div>
          <div className="text-3xl font-bold text-gray-600">
            {trainings.filter(t => t.status === 'draft').length}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex gap-4">
          <Link
            href="/admin/trainings/bookings"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Zobacz wszystkie rezerwacje
          </Link>
        </div>
      </div>

      {/* Trainings List */}
      <div className="bg-white rounded-lg shadow">
        {trainings.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <div className="text-6xl mb-4">🎓</div>
            <p className="text-lg">Brak szkoleń</p>
            <Link
              href="/admin/trainings/new"
              className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Dodaj pierwsze szkolenie →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nazwa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lokalizacja
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uczestnicy
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cena
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Akcje
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {trainings.map((training) => {
                  const trainingDate = new Date(training.date);
                  const isPast = trainingDate < new Date();

                  return (
                    <tr key={training._id} className={isPast ? 'bg-gray-50' : ''}>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{training.name}</div>
                        <div className="text-sm text-gray-500">{training.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {trainingDate.toLocaleDateString('pl-PL')}
                        </div>
                        <div className="text-sm text-gray-500">{training.duration}h</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{training.location.city}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{training.location.venue}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {training.currentParticipants} / {training.maxParticipants}
                        </div>
                        {training.currentParticipants >= training.maxParticipants && (
                          <span className="text-xs text-red-600 font-medium">Pełne</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {training.price.toLocaleString('pl-PL')} zł
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[training.status]}`}>
                          {statusLabels[training.status]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <Link
                          href={`/szkolenia/${training.slug}`}
                          className="text-blue-600 hover:text-blue-900"
                          target="_blank"
                        >
                          Podgląd
                        </Link>
                        <Link
                          href={`/admin/trainings/${training._id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edytuj
                        </Link>
                        <Link
                          href={`/admin/trainings/${training._id}/bookings`}
                          className="text-green-600 hover:text-green-900"
                        >
                          Rezerwacje ({training.currentParticipants})
                        </Link>
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
