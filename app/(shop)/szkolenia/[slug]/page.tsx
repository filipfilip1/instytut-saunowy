import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/mongodb';
import Training from '@/lib/models/Training';
import { ITraining } from '@/types';
import TrainingBookingForm from '@/components/trainings/TrainingBookingForm';
import FadeIn from '@/components/animations/FadeIn';
import { Calendar, Clock, MapPin, Users, Check } from 'lucide-react';

// Dynamic params - render on-demand
export const dynamicParams = true;
// Revalidate every 30 minutes
export const revalidate = 1800;

// Generate static params - empty array for on-demand rendering
export async function generateStaticParams() {
  return [];
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getTraining(slug: string): Promise<ITraining | null> {
  try {
    await dbConnect();
    const training = await Training.findOne({ slug, status: 'published' });
    if (!training) return null;
    return JSON.parse(JSON.stringify(training));
  } catch (error) {
    console.error('Error fetching training:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const training = await getTraining(slug);
  if (!training) return { title: 'Szkolenie nie znalezione' };

  return {
    title: `${training.name} - Instytut Saunowy`,
    description: training.shortDescription || training.description.substring(0, 160),
  };
}

export default async function TrainingDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const training = await getTraining(slug);

  if (!training) {
    notFound();
  }

  const trainingDate = new Date(training.date);
  const availableSpots = training.maxParticipants - training.currentParticipants;

  return (
    <div className="min-h-screen bg-[#F0ECE2]">
      {/* Breadcrumbs */}
      <div className="bg-[#F0ECE2] border-b border-[#2C2622]/10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-stone-500">
            <Link href="/" className="hover:text-[#C47F52] transition-colors">Strona główna</Link>
            <span>/</span>
            <Link href="/szkolenia" className="hover:text-[#C47F52] transition-colors">Szkolenia</Link>
            <span>/</span>
            <span className="text-[#2C2622]">{training.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content - Sticky Split Layout */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Left Column: Editorial Content (3/5 = 60%) */}
          <div className="lg:col-span-3 space-y-10">

            {/* Hero Image */}
            <FadeIn>
              <div className="w-full aspect-video rounded-sm overflow-hidden bg-stone-200">
                {training.featuredImage?.url ? (
                  <Image
                    src={training.featuredImage.url}
                    alt={training.name}
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-8xl opacity-20">🎓</span>
                  </div>
                )}
              </div>
            </FadeIn>

            {/* Title & Meta Info */}
            <FadeIn delay={0.1}>
              <div>
                <h1 className="font-fraunces text-4xl md:text-5xl text-[#2C2622] mb-6 leading-tight">
                  {training.name}
                </h1>

                {/* Meta Data Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-5 h-5 text-[#C47F52] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <div className="text-xs text-stone-500 uppercase tracking-wider">Data</div>
                      <div className="text-sm font-medium text-[#2C2622]">
                        {trainingDate.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-[#C47F52] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <div className="text-xs text-stone-500 uppercase tracking-wider">Czas trwania</div>
                      <div className="text-sm font-medium text-[#2C2622]">{training.duration} godzin</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-[#C47F52] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <div className="text-xs text-stone-500 uppercase tracking-wider">Lokalizacja</div>
                      <div className="text-sm font-medium text-[#2C2622]">{training.location.city}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Users className="w-5 h-5 text-[#C47F52] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <div className="text-xs text-stone-500 uppercase tracking-wider">Miejsca</div>
                      <div className="text-sm font-medium text-[#2C2622]">
                        {availableSpots === 0 ? 'Brak' : availableSpots < 5 ? `Zostało ${availableSpots}!` : `${availableSpots} wolnych`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-8 prose prose-stone max-w-none">
                  <div
                    className="text-stone-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: training.description }}
                  />
                </div>
              </div>
            </FadeIn>

            {/* What You Learn - No Box, 2-Column Grid */}
            {training.whatYouLearn && training.whatYouLearn.length > 0 && (
              <FadeIn delay={0.2}>
                <div>
                  <h2 className="font-fraunces text-3xl text-[#2C2622] mb-6">
                    Czego się nauczysz?
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {training.whatYouLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#C47F52] flex-shrink-0 mt-1" strokeWidth={2} />
                        <span className="text-lg text-[#2C2622]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Requirements - No Blue Background */}
            {training.requirements && training.requirements.length > 0 && (
              <FadeIn delay={0.25}>
                <div>
                  <h2 className="font-fraunces text-3xl text-[#2C2622] mb-6">
                    Wymagania
                  </h2>
                  <ul className="space-y-3">
                    {training.requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C47F52] flex-shrink-0 mt-2.5" />
                        <span className="text-stone-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            )}

            {/* Instructor - Rectangular Portrait */}
            <FadeIn delay={0.3}>
              <div>
                <h2 className="font-fraunces text-3xl text-[#2C2622] mb-6">
                  Instruktor
                </h2>
                <div className="flex items-start gap-6">
                  {training.instructor.photo?.url ? (
                    <div className="w-32 h-40 rounded-sm overflow-hidden bg-stone-200 flex-shrink-0">
                      <Image
                        src={training.instructor.photo.url}
                        alt={training.instructor.name}
                        width={128}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-40 rounded-sm bg-gradient-to-br from-[#C47F52] to-[#2C2622] flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
                      {training.instructor.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex-grow">
                    <h3 className="font-fraunces text-2xl text-[#2C2622] mb-2">
                      {training.instructor.name}
                    </h3>
                    {training.instructor.bio && (
                      <p className="text-stone-600 leading-relaxed">{training.instructor.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Sticky Booking Panel (2/5 = 40%) */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
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
