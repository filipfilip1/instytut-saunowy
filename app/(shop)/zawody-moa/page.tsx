import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';
import ScaleIn from '@/components/animations/ScaleIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import {
  MOA_CEREMONY_TYPES,
  MOA_FEATURES,
  MOA_PAST_EDITIONS,
  MOA_NEWS,
} from '@/lib/constants/moaCompetitions';
import { Camera } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Zawody Masters of Aufguss - Instytut Saunowy',
  description:
    'Odkryj magię zawodów Masters of Aufguss. Relacje z poprzednich edycji, galerie zdjęć i informacje o nadchodzących wydarzeniach. Międzynarodowa rywalizacja mistrzów ceremonii saunowych.',
};

export default function ZawodyMoaPage() {
  return (
    <div className="min-h-screen">
      {/* Section 1: Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gold-600 via-warmwood-600 to-gold-700">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMTRjMy4zMSAwIDYtMi42OSA2LTZzLTIuNjktNi02LTYtNiAyLjY5LTYgNiAyLjY5IDYgNiA2eiIvPjwvZz48L2c+PC9zdmc+')]"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <FadeIn delay={0.2} direction="up">

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
              Mistrzowie Sauny:
              <br />
              <span className="text-cream-100">Pasja, Edukacja, Współzawodnictwo!</span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-cream-50 max-w-3xl mx-auto leading-relaxed mb-10 drop-shadow-md">
              Prestiżowe międzynarodowe zawody mistrzów ceremonii saunowych. Sztuka, pasja i
              profesjonalizm na najwyższym poziomie.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="px-8 py-4 bg-white text-gold-700 font-bold rounded-xl hover:bg-cream-50 transition-colors shadow-xl hover:shadow-2xl hover:scale-105 text-lg"
              >
                Weź udział w następnej edycji
              </Link>
              <a
                href="#past-editions"
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-gold-700 transition-colors text-lg"
              >
                Zobacz poprzednie edycje
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Section 2: Poznaj Formułę Zawodów - NOWA SEKCJA z PDF */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-graphite-900 mb-4">
              Poznaj formułę zawodów MoA
            </h2>
            <p className="text-xl text-graphite-600 max-w-3xl mx-auto">
              Trzy rundy, trzy style, jedno mistrzostwo. Każdy seans to unikalne wyzwanie dla
              Saunamistrza.
            </p>
          </FadeIn>

          <StaggerContainer className="space-y-16">
            {MOA_CEREMONY_TYPES.map((ceremony, index) => (
              <StaggerItem key={index}>
                <ScaleIn delay={index * 0.15}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Image */}
                    <div
                      className={`relative h-96 rounded-3xl overflow-hidden shadow-2xl ${index % 2 === 1 ? 'lg:order-2' : ''
                        }`}
                    >
                      {ceremony.imageUrl ? (
                        <Image
                          src={ceremony.imageUrl}
                          alt={ceremony.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gold-400 via-warmwood-400 to-gold-500 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-8xl mb-4">{ceremony.icon}</div>
                            <Camera className="w-16 h-16 text-white/30 mx-auto" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                      <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <span className="text-2xl">{ceremony.icon}</span>
                        <span>Maksymalnie {ceremony.maxPoints} punktów</span>
                      </div>

                      <h3 className="text-3xl md:text-4xl font-serif font-bold text-graphite-900 mb-4">
                        {ceremony.title}
                      </h3>

                      <p className="text-lg text-graphite-700 leading-relaxed mb-6">
                        {ceremony.description}
                      </p>

                      {/* Criteria */}
                      <div className="bg-cream-50 rounded-2xl p-6 border-2 border-cream-300">
                        <h4 className="font-bold text-graphite-900 mb-4 flex items-center gap-2">
                          <span className="text-gold-600">📊</span>
                          Kryteria oceny:
                        </h4>
                        <div className="space-y-2">
                          {ceremony.criteria.map((criterion, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="text-graphite-700">{criterion.name}</span>
                              <span className="font-bold text-gold-700">{criterion.points} pkt</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScaleIn>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Section 3: What is MoA */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-graphite-900 mb-4">
              Czym są zawody Masters of Aufguss?
            </h2>
            <p className="text-xl text-graphite-600 max-w-3xl mx-auto">
              MoA to międzynarodowa platforma dla mistrzów ceremonii saunowych, gdzie sztuka
              Aufguss spotyka się z profesjonalną rywalizacją.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MOA_FEATURES.map((feature, index) => (
              <StaggerItem key={index}>
                <ScaleIn delay={index * 0.1}>
                  <div className="bg-white border-2 border-cream-300 rounded-2xl p-8 hover:shadow-xl transition-shadow h-full hover:border-gold-300">
                    <div className="text-6xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-graphite-900 mb-3">{feature.title}</h3>
                    <p className="text-graphite-600 leading-relaxed">{feature.description}</p>
                  </div>
                </ScaleIn>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Section 4: Past Editions */}
      <section id="past-editions" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-graphite-900 mb-4">
              Poprzednie Edycje
            </h2>
            <p className="text-xl text-graphite-600 max-w-3xl mx-auto">
              Relacje z najważniejszych wydarzeń w świecie ceremonii saunowych.
            </p>
          </FadeIn>

          <div className="space-y-16">
            {MOA_PAST_EDITIONS.map((edition, editionIndex) => (
              <FadeIn key={edition.year} delay={editionIndex * 0.2}>
                <div className="bg-cream-50 rounded-3xl overflow-hidden shadow-2xl border-2 border-cream-300">
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${edition.color} px-8 py-12 text-white`}>
                    <div className="max-w-4xl mx-auto">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium border border-white/30">
                          {edition.year}
                        </span>
                        <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium border border-white/30">
                          📍 {edition.location}
                        </span>
                        <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium border border-white/30">
                          👥 {edition.participants} uczestników
                        </span>
                      </div>
                      <h3 className="text-4xl md:text-5xl font-serif font-bold mb-3 drop-shadow-md">
                        {edition.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xl">
                        <span>🏆</span>
                        <span className="font-semibold">
                          Zwycięzca: {edition.winner.name} - {edition.winner.affiliation}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 md:p-12">
                    <div className="max-w-4xl mx-auto">
                      {/* Description */}
                      <p className="text-lg text-graphite-700 mb-8 leading-relaxed">
                        {edition.description}
                      </p>

                      {/* Highlights */}
                      <div className="mb-12">
                        <h4 className="text-2xl font-serif font-bold text-graphite-900 mb-6 flex items-center gap-3">
                          <span
                            className={`bg-gradient-to-r ${edition.color} w-2 h-8 rounded-full`}
                          ></span>
                          Najważniejsze momenty
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {edition.highlights.map((highlight, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-4 bg-white border-2 border-cream-300 rounded-xl hover:shadow-md transition-shadow"
                            >
                              <svg
                                className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-graphite-800 font-medium">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Gallery */}
                      <div>
                        <h4 className="text-2xl font-serif font-bold text-graphite-900 mb-6">
                          Galeria
                        </h4>
                        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[...Array(8)].map((_, imgIndex) => (
                            <StaggerItem key={imgIndex}>
                              <div
                                className={`aspect-square rounded-xl overflow-hidden bg-gradient-to-br ${edition.color} shadow-lg hover:shadow-xl transition-all cursor-pointer group hover:scale-105`}
                              >
                                <div className="w-full h-full flex items-center justify-center relative">
                                  <Camera className="w-12 h-12 text-white/30 group-hover:scale-110 transition-transform" />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white font-medium text-sm">
                                      Zobacz zdjęcie
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </StaggerItem>
                          ))}
                        </StaggerContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Aktualności (Optional - Future CMS) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-graphite-900 mb-4">
              Aktualności
            </h2>
            <p className="text-xl text-graphite-600">Najnowsze wiadomości ze świata MoA</p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOA_NEWS.slice(0, 3).map((news, index) => (
              <StaggerItem key={news.id}>
                <ScaleIn delay={index * 0.1}>
                  <div className="bg-cream-50 border-2 border-cream-300 rounded-2xl p-6 hover:shadow-lg transition-shadow h-full hover:border-gold-300">
                    <div className="text-sm text-gold-700 font-semibold mb-2">
                      {news.date.toLocaleDateString('pl-PL', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <h3 className="text-xl font-bold text-graphite-900 mb-3">{news.title}</h3>
                    <p className="text-graphite-600 leading-relaxed">{news.excerpt}</p>
                  </div>
                </ScaleIn>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Section 7: CTA */}
      <section className="py-20 bg-gradient-to-br from-warmwood-600 to-gold-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 drop-shadow-md">
              Chcesz wziąć udział w następnej edycji?
            </h2>
            <p className="text-xl text-cream-50 mb-8 max-w-2xl mx-auto leading-relaxed">
              Dołącz do elity mistrzów Aufguss i pokaż swoje umiejętności na międzynarodowej
              arenie!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="px-8 py-4 bg-white text-gold-700 font-bold rounded-xl hover:bg-cream-50 transition-colors shadow-xl hover:shadow-2xl hover:scale-105 text-lg"
              >
                Zapytaj o udział w zawodach
              </Link>
              <Link
                href="/szkolenia"
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-gold-700 transition-colors text-lg"
              >
                Przygotuj się - zobacz szkolenia
              </Link>
            </div>

            {/* Link do regulaminu */}
            <p className="mt-6 text-cream-100/80 text-sm">
              Przed zgłoszeniem zapoznaj się z{' '}
              <Link
                href="/zawody-moa/regulamin"
                className="underline hover:text-white transition-colors font-medium"
              >
                regulaminem zawodów
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
