'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Users, Award, ArrowRight } from 'lucide-react';
import { ITraining } from '@/types';
import ScaleIn from '@/components/animations/ScaleIn';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';

interface FeaturedTrainingCardProps {
  training: ITraining;
}

/**
 * FeaturedTrainingCard Component
 * Section 3 of homepage: Featured Training Spotlight
 * Showcases the most important upcoming training with rich details
 */
const FeaturedTrainingCard: React.FC<FeaturedTrainingCardProps> = ({ training }) => {
  // Format date to Polish locale
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pl-PL', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date(date));
  };

  // Calculate availability status
  const availableSpots = training.maxParticipants - training.currentParticipants;
  const isAlmostFull = availableSpots <= 3 && availableSpots > 0;
  const isFull = availableSpots === 0;

  // Level badges
  const levelLabels = {
    beginner: { text: 'Początkujący', color: 'forest' },
    intermediate: { text: 'Średnio zaawansowany', color: 'gold' },
    advanced: { text: 'Zaawansowany', color: 'warmwood' },
  };

  const levelBadge = levelLabels[training.level];

  return (
    <section className="py-20 bg-gradient-to-br from-forest-50 to-cream-100 relative overflow-hidden">
      {/* Background decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-forest-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <FadeIn>
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-gold-100 text-gold-800 font-bold rounded-full text-sm mb-4">
              🎓 POLECANE SZKOLENIE
            </div>
            <h2 className="section-header">Zacznij swoją przygodę jako Saunamistrz</h2>
            <p className="text-graphite-600 text-lg max-w-2xl mx-auto">
              Profesjonalne szkolenia prowadzone przez doświadczonych instruktorów
            </p>
          </div>
        </FadeIn>

        {/* Featured Training Card */}
        <ScaleIn delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-cream-300">
            {/* Image Section */}
            <div className="relative h-64 lg:h-auto">
              {training.featuredImage?.url ? (
                <Image
                  src={training.featuredImage.url}
                  alt={training.featuredImage.alt || training.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-forest-400 via-gold-400 to-warmwood-400 flex items-center justify-center">
                  <Award className="w-32 h-32 text-white/30" />
                </div>
              )}

              {/* Availability Badge */}
              {isAlmostFull && (
                <div className="absolute top-4 right-4 px-4 py-2 bg-warmwood-600 text-white font-bold rounded-xl shadow-lg">
                  ⚠️ Zostało {availableSpots} {availableSpots === 1 ? 'miejsce' : 'miejsca'}!
                </div>
              )}

              {isFull && (
                <div className="absolute top-4 right-4 px-4 py-2 bg-graphite-700 text-white font-bold rounded-xl shadow-lg">
                  😔 Wyprzedane
                </div>
              )}

              {/* Level Badge */}
              <div className={`absolute bottom-4 left-4 px-4 py-2 bg-${levelBadge.color}-600 text-white font-semibold rounded-xl shadow-lg`}>
                📊 {levelBadge.text}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-10 flex flex-col justify-between">
              <div>
                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-graphite-900 mb-4">
                  {training.name}
                </h3>

                {/* Short Description */}
                <p className="text-graphite-600 text-lg leading-relaxed mb-6">
                  {training.shortDescription || training.description.substring(0, 150) + '...'}
                </p>

                {/* Training Details Grid */}
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <StaggerItem>
                    <div className="flex items-start gap-3 p-4 bg-cream-50 rounded-xl border border-cream-300">
                      <Calendar className="w-5 h-5 text-gold-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-graphite-500 font-semibold uppercase mb-1">
                          Data
                        </p>
                        <p className="text-graphite-900 font-medium">
                          {formatDate(training.date)}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="flex items-start gap-3 p-4 bg-cream-50 rounded-xl border border-cream-300">
                      <Clock className="w-5 h-5 text-gold-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-graphite-500 font-semibold uppercase mb-1">
                          Czas trwania
                        </p>
                        <p className="text-graphite-900 font-medium">
                          {training.duration} {training.duration === 1 ? 'dzień' : 'dni'}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="flex items-start gap-3 p-4 bg-cream-50 rounded-xl border border-cream-300">
                      <MapPin className="w-5 h-5 text-gold-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-graphite-500 font-semibold uppercase mb-1">
                          Lokalizacja
                        </p>
                        <p className="text-graphite-900 font-medium">
                          {training.location.city}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="flex items-start gap-3 p-4 bg-cream-50 rounded-xl border border-cream-300">
                      <Users className="w-5 h-5 text-gold-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-graphite-500 font-semibold uppercase mb-1">
                          Dostępność
                        </p>
                        <p className="text-graphite-900 font-medium">
                          {availableSpots > 0 ? (
                            <span>{availableSpots} / {training.maxParticipants} miejsc</span>
                          ) : (
                            <span className="text-warmwood-600">Brak miejsc</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                </StaggerContainer>

                {/* Key Learning Points */}
                {training.whatYouLearn && training.whatYouLearn.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-graphite-700 uppercase mb-3">
                      ✨ Czego się nauczysz:
                    </h4>
                    <ul className="space-y-2">
                      {training.whatYouLearn.slice(0, 3).map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-graphite-600">
                          <span className="text-gold-600 mt-1">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Price & CTA */}
              <div className="pt-6 border-t-2 border-cream-300">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-graphite-500 mb-1">Cena szkolenia</p>
                    <p className="text-3xl font-serif font-bold text-graphite-900">
                      {training.price.toLocaleString('pl-PL')} zł
                    </p>
                    {training.depositPercentage > 0 && (
                      <p className="text-sm text-graphite-500">
                        Zadatek: {training.depositPercentage}% ({(training.price * training.depositPercentage / 100).toFixed(0)} zł)
                      </p>
                    )}
                  </div>
                </div>

                <Link
                  href={`/szkolenia/${training.slug}`}
                  className={`btn-gold w-full flex items-center justify-center gap-2 group ${
                    isFull ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isFull ? (
                    <>Zobacz szczegóły</>
                  ) : (
                    <>
                      Zapisz się na szkolenie
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Link>

                <Link
                  href="/szkolenia"
                  className="mt-3 text-center block text-gold-600 hover:text-gold-700 font-medium transition-colors"
                >
                  Zobacz wszystkie szkolenia →
                </Link>
              </div>
            </div>
          </div>
        </ScaleIn>
      </div>
    </section>
  );
};

export default FeaturedTrainingCard;
