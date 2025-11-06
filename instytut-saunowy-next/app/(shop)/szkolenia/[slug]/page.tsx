import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Training from '@/lib/models/Training';
import { ITraining } from '@/types';
import TrainingBookingForm from '@/components/trainings/TrainingBookingForm';
import FadeIn from '@/components/animations/FadeIn';

interface PageProps {
  params: {
    slug: string;
  };
}

async function getTraining(slug: string): Promise<ITraining | null> {
  try {
    await dbConnect();
    const training = await Training.findBySlug(slug);
    if (!training) return null;
    return JSON.parse(JSON.stringify(training));
  } catch (error) {
    console.error('Error fetching training:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const training = await getTraining(params.slug);
  if (!training) return { title: 'Szkolenie nie znalezione' };

  return {
    title: `${training.name} - Instytut Saunowy`,
    description: training.shortDescription || training.description.substring(0, 160),
  };
}

export default async function TrainingDetailPage({ params }: PageProps) {
  const training = await getTraining(params.slug);

  if (!training) {
    notFound();
  }

  const trainingDate = new Date(training.date);
  const availableSpots = training.maxParticipants - training.currentParticipants;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-wood-600">Strona główna</Link>
            <span>/</span>
            <Link href="/szkolenia" className="hover:text-wood-600">Szkolenia</Link>
            <span>/</span>
            <span className="text-gray-900">{training.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <FadeIn>
              <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                {training.featuredImage?.url ? (
                  <img
                    src={training.featuredImage.url}
                    alt={training.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-8xl">🎓</span>
                  </div>
                )}
              </div>
            </FadeIn>

            {/* Title & Basic Info */}
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{training.name}</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <div className="text-sm text-gray-500">Data</div>
                      <div className="font-semibold">{trainingDate.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="text-sm text-gray-500">Czas trwania</div>
                      <div className="font-semibold">{training.duration} godzin</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <div className="text-sm text-gray-500">Lokalizacja</div>
                      <div className="font-semibold">{training.location.city}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div>
                      <div className="text-sm text-gray-500">Miejsca</div>
                      <div className="font-semibold">
                        {availableSpots === 0 ? 'Brak' : availableSpots < 5 ? `Zostało ${availableSpots}!` : `${availableSpots} wolnych`}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: training.description }} />
                </div>
              </div>
            </FadeIn>

            {/* What You Learn */}
            {training.whatYouLearn && training.whatYouLearn.length > 0 && (
              <FadeIn delay={0.2}>
                <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Czego się nauczysz?</h2>
                  <ul className="space-y-3">
                    {training.whatYouLearn.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            )}

            {/* Instructor */}
            <FadeIn delay={0.3}>
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Instruktor</h2>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-wood-500 to-wood-700 flex items-center justify-center text-white text-2xl font-bold">
                    {training.instructor.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">{training.instructor.name}</div>
                    {training.instructor.bio && (
                      <p className="text-gray-600 mt-1">{training.instructor.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <FadeIn delay={0.4}>
                <TrainingBookingForm training={training} />
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
