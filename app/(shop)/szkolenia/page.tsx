import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/mongodb';
import Training from '@/lib/models/Training';
import { ITraining } from '@/types';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import HoverCard from '@/components/animations/HoverCard';

// Revalidate every hour (ISR)
export const revalidate = 3600;

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

  // Skandynawskie kolory dla kategorii
  const categoryColors: Record<string, string> = {
    podstawowy: 'from-forest-500 to-forest-600',
    zaawansowany: 'from-nordic-500 to-nordic-600',
    master: 'from-gold-500 to-gold-600',
    indywidualny: 'from-warmwood-500 to-warmwood-600',
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-forest-800 via-forest-700 to-nordic-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
              Szkolenia<br />
              <span className="text-gold-200">Aufguss</span>
            </h1>
            <p className="text-xl text-cream-200 max-w-3xl mx-auto">
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
              <p className="text-xl text-graphite-600">
                Obecnie brak dostępnych szkoleń. Wkrótce pojawią się nowe terminy!
              </p>
              <Link
                href="/kontakt"
                className="inline-block mt-6 btn-gold px-8 py-3"
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
                        <article className="bg-white rounded-3xl border-2 border-cream-400 overflow-hidden hover:border-gold-400 hover:shadow-gold-lg transition-all h-full flex flex-col">
                          {/* Image */}
                          <div className="relative aspect-video bg-gradient-to-br from-cream-200 to-cream-300">
                            {training.featuredImage?.url ? (
                              <Image
                                src={training.featuredImage.url}
                                alt={training.name}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-6xl">🎓</span>
                              </div>
                            )}

                            {/* Category Badge */}
                            <div className={`absolute top-4 left-4 bg-gradient-to-r ${categoryColors[training.category]} text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg`}>
                              {categoryLabels[training.category]}
                            </div>

                            {/* Availability Badge */}
                            {showAvailability && (
                              <div className="absolute top-4 right-4 bg-gradient-to-r from-warmwood-500 to-warmwood-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg">
                                {availableSpots === 1 ? 'Ostatnie miejsce!' : `${availableSpots} miejsc`}
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-6 flex-grow flex flex-col">
                            <h3 className="font-serif text-xl font-bold text-graphite-900 mb-3">
                              {training.name}
                            </h3>

                            {training.shortDescription && (
                              <p className="text-graphite-600 mb-4 line-clamp-2">
                                {training.shortDescription}
                              </p>
                            )}

                            <div className="mt-auto space-y-2">
                              {/* Date */}
                              <div className="flex items-center gap-2 text-graphite-700">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span>{trainingDate.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                              </div>

                              {/* Location */}
                              <div className="flex items-center gap-2 text-graphite-700">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>{training.location.city}</span>
                              </div>

                              {/* Duration */}
                              <div className="flex items-center gap-2 text-graphite-700">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{training.duration}h</span>
                              </div>

                              {/* Price */}
                              <div className="flex items-center justify-between pt-4 border-t border-cream-300 mt-4">
                                <span className="text-2xl font-bold text-gold-600">
                                  {training.price.toLocaleString('pl-PL')} zł
                                </span>
                                <span className="bg-gold-100 text-gold-800 px-3 py-1 rounded-full text-sm font-semibold">
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
      <section className="py-20 bg-gradient-to-br from-forest-700 to-nordic-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              Masz pytania?
            </h2>
            <p className="text-xl text-cream-100 mb-8 max-w-2xl mx-auto">
              Skontaktuj się z nami, aby dowiedzieć się więcej o naszych szkoleniach
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-gold-400 text-graphite-900 px-8 py-4 rounded-3xl font-semibold text-lg hover:bg-gold-500 transition-colors shadow-gold-lg"
            >
              Skontaktuj się
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
