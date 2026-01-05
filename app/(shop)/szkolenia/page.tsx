import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/mongodb';
import Training from '@/lib/models/Training';
import { ITraining } from '@/types';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';

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

  return (
    // MAIN WRAPPER - Safety Straitjacket
    <div className="w-full max-w-[100vw] min-h-screen bg-[#F0ECE2] overflow-x-hidden relative">
      {/* 1. Header Section - "The Master's Hall" */}
      <header className="w-full relative bg-[#2C2622] text-[#F0ECE2] overflow-hidden">
        {/* Noise texture overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] opacity-40"></div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:py-24 lg:py-32">
          <FadeIn className="text-center">
            {/* Main Title */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight tracking-tight">
              Szkolenia Aufguss
            </h1>

            {/* Subtitle */}
            <p className="text-[#F0ECE2]/80 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-8">
              Profesjonalne kursy ceremonii saunowych prowadzone przez certyfikowanych mistrzów
            </p>

            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-4">
              <span className="w-12 h-px bg-[#C47F52]/50"></span>
              <span className="text-[#C47F52] text-lg">◆</span>
              <span className="w-12 h-px bg-[#C47F52]/50"></span>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* 2. Course Grid - "De-boxed Layout" */}
      <main className="w-full max-w-[100vw]">
        <section className="w-full py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-7xl mx-auto">
            {trainings.length === 0 ? (
              <FadeIn className="text-center py-12 md:py-24">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-[#2C2622] mb-4">
                  Wkrótce pojawią się nowe szkolenia
                </h3>
                <p className="text-stone-600 font-light mb-8 max-w-md mx-auto">
                  Obecnie przygotowujemy kalendarz szkoleń. Skontaktuj się z nami, aby dowiedzieć się więcej.
                </p>
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 text-[#2C2622] hover:text-[#C47F52] transition-colors group"
                >
                  <span className="font-medium">Skontaktuj się</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                </Link>
              </FadeIn>
            ) : (
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-0 md:gap-y-16">
                {trainings.map((training, index) => {
                  const trainingDate = new Date(training.date);
                  const availableSpots = training.maxParticipants - training.currentParticipants;
                  const showAvailability = availableSpots <= 5;
                  const isLastItem = index === trainings.length - 1;

                  return (
                    <StaggerItem key={training._id}>
                      <Link href={`/szkolenia/${training.slug}`} className="block group w-full min-w-0">
                        {/* Article with hairline divider on mobile */}
                        <article className={`w-full min-w-0 pb-8 md:pb-0 ${!isLastItem ? 'mb-8 md:mb-0 border-b md:border-b-0 border-[#2C2622]/10' : ''}`}>
                          {/* Image */}
                          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm mb-4">
                            {training.featuredImage?.url ? (
                              <Image
                                src={training.featuredImage.url}
                                alt={training.name}
                                fill
                                className="object-cover max-w-full group-hover:scale-105 transition-transform duration-700 ease-out"
                              />
                            ) : (
                              <div className="w-full h-full bg-[#2C2622]/10 flex items-center justify-center">
                                <svg className="w-16 h-16 text-[#2C2622]/20" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                                </svg>
                              </div>
                            )}
                          </div>

                          {/* Meta Tags - Text Only */}
                          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-[#C47F52] uppercase mb-3">
                            <span>{categoryLabels[training.category]}</span>
                            {showAvailability && (
                              <>
                                <span className="text-[#2C2622]/30">•</span>
                                <span>{availableSpots === 1 ? 'Ostatnie miejsce' : `${availableSpots} miejsc`}</span>
                              </>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="font-serif text-xl md:text-2xl font-bold text-[#2C2622] leading-tight mb-3 group-hover:text-[#C47F52] transition-colors break-words">
                            {training.name}
                          </h3>

                          {/* Short Description */}
                          {training.shortDescription && (
                            <p className="text-stone-600 line-clamp-2 font-light leading-relaxed mb-4 break-words">
                              {training.shortDescription}
                            </p>
                          )}

                          {/* Details with Icons - Darkened for better contrast */}
                          <div className="space-y-2.5 mb-6">
                            {/* Date */}
                            <div className="flex items-center gap-2.5 text-sm text-[#2C2622]/70">
                              <Calendar className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                              <span>{trainingDate.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-2.5 text-sm text-[#2C2622]/70">
                              <MapPin className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                              <span>{training.location.city}</span>
                            </div>

                            {/* Duration */}
                            <div className="flex items-center gap-2.5 text-sm text-[#2C2622]/70">
                              <Clock className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                              <span>{training.duration} godzin</span>
                            </div>
                          </div>

                          {/* Price & Action - Enhanced CTA area */}
                          <div className="flex items-center justify-between pt-4 border-t border-[#2C2622]/10">
                            <span className="font-serif text-xl md:text-2xl font-bold text-[#2C2622]">
                              {training.price.toLocaleString('pl-PL')} zł
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2C2622] group-hover:text-[#C47F52] transition-colors py-2 -my-2 pl-4 -ml-4">
                              Zapisz się
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                            </span>
                          </div>
                        </article>
                      </Link>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            )}
          </div>
        </section>
      </main>

      {/* 3. CTA Section - "Masz Pytania?" */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-[#2C2622] relative overflow-hidden">
        {/* Noise texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] opacity-50"></div>

        <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            {/* Eyebrow */}
            <div className="text-[#C47F52] uppercase tracking-widest text-xs md:text-sm font-sans mb-4 md:mb-6">
              Potrzebujesz pomocy?
            </div>

            {/* Main Headline */}
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#F0ECE2] mb-4 md:mb-6 leading-tight">
              Masz pytania?
            </h2>

            {/* Description */}
            <p className="text-stone-400 text-base md:text-lg lg:text-xl mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-light px-2">
              Skontaktuj się z nami, aby dowiedzieć się więcej o naszych szkoleniach i wybrać odpowiedni kurs dla siebie.
            </p>

            {/* Action Button */}
            <Link
              href="/kontakt"
              className="inline-block bg-[#C47F52] text-white px-8 py-3 rounded-md font-semibold hover:brightness-110 transition-all"
            >
              Skontaktuj się
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
