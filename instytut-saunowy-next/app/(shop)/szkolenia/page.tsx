import React from 'react';
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Training from '@/lib/models/Training';
import { ITraining } from '@/types';
import FadeIn from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import HoverCard from '@/components/animations/HoverCard';

export const metadata = {
  title: 'Szkolenia Aufguss - Instytut Saunowy',
  description: 'Profesjonalne szkolenia z ceremonii saunowych Aufguss. Kursy podstawowe, zaawansowane i master class. Zapisz się już dziś!',
};

async function getUpcomingTrainings(): Promise<ITraining[]> {
  try {
    await dbConnect();

    const trainings = await Training.find({
      status: 'published',
      date: { $gte: new Date() },
    })
      .sort({ date: 1 })
      .limit(20)
      .lean();

    return JSON.parse(JSON.stringify(trainings));
  } catch (error) {
    console.error('Error fetching trainings:', error);
    return [];
  }
}

export default async function SzkoleniaPage() {
  const trainings = await getUpcomingTrainings();

  const categoryLabels: Record<string, string> = {
    podstawowy: 'Podstawowy',
    zaawansowany: 'Zaawansowany',
    master: 'Master Class',
    indywidualny: 'Indywidualny',
  };

  const categoryColors: Record<string, string> = {
    podstawowy: 'from-green-500 to-green-600',
    zaawansowany: 'from-blue-500 to-blue-600',
    master: 'from-purple-500 to-purple-600',
    indywidualny: 'from-amber-500 to-amber-600',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-wood-800 via-wood-700 to-wood-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Szkolenia<br />
              <span className="text-wood-200">Aufguss</span>
            </h1>
            <p className="text-xl text-wood-100 max-w-3xl mx-auto">
              Profesjonalne kursy ceremonii saunowych prowadzone przez certyfikowanych mistrzów
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Trainings Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {trainings.length === 0 ? (
            <FadeIn className="text-center py-12">
              <p className="text-xl text-gray-600">
                Obecnie brak dostępnych szkoleń. Wkrótce pojawią się nowe terminy!
              </p>
              <Link
                href="/kontakt"
                className="inline-block mt-6 bg-wood-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-wood-700 transition"
              >
                Skontaktuj się z nami
              </Link>
            </FadeIn>
          ) : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainings.map((training) => {
                const trainingDate = new Date(training.date);
                const availableSpots = training.maxParticipants - training.currentParticipants;
                const showAvailability = availableSpots < 5 || (training.currentParticipants / training.maxParticipants) > 0.5;

                return (
                  <StaggerItem key={training._id}>
                    <HoverCard>
                      <Link href={`/szkolenia/${training.slug}`} className="block h-full">
                        <article className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-wood-400 transition-colors h-full flex flex-col">
                          {/* Image */}
                          <div className="relative aspect-video bg-gradient-to-br from-gray-200 to-gray-300">
                            {training.featuredImage?.url ? (
                              <img
                                src={training.featuredImage.url}
                                alt={training.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-6xl">🎓</span>
                              </div>
                            )}

                            {/* Category Badge */}
                            <div className={`absolute top-4 left-4 bg-gradient-to-r ${categoryColors[training.category]} text-white text-sm font-semibold px-3 py-1 rounded-full`}>
                              {categoryLabels[training.category]}
                            </div>

                            {/* Availability Badge */}
                            {showAvailability && (
                              <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                                {availableSpots === 1 ? 'Ostatnie miejsce!' : `${availableSpots} miejsc`}
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-6 flex-grow flex flex-col">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                              {training.name}
                            </h3>

                            {training.shortDescription && (
                              <p className="text-gray-600 mb-4 line-clamp-2">
                                {training.shortDescription}
                              </p>
                            )}

                            <div className="mt-auto space-y-2">
                              {/* Date */}
                              <div className="flex items-center gap-2 text-gray-700">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{trainingDate.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                              </div>

                              {/* Location */}
                              <div className="flex items-center gap-2 text-gray-700">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{training.location.city}</span>
                              </div>

                              {/* Duration */}
                              <div className="flex items-center gap-2 text-gray-700">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{training.duration}h</span>
                              </div>

                              {/* Price */}
                              <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-4">
                                <span className="text-2xl font-bold text-wood-600">
                                  {training.price.toLocaleString('pl-PL')} zł
                                </span>
                                <span className="bg-wood-100 text-wood-800 px-3 py-1 rounded-full text-sm font-semibold">
                                  Zapisz się →
                                </span>
                              </div>
                            </div>
                          </div>
                        </article>
                      </Link>
                    </HoverCard>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-wood-700 to-wood-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Masz pytania?
            </h2>
            <p className="text-xl text-wood-100 mb-8 max-w-2xl mx-auto">
              Skontaktuj się z nami, aby dowiedzieć się więcej o naszych szkoleniach
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-white text-wood-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-wood-50 transition-colors shadow-lg"
            >
              Skontaktuj się
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
