import React from 'react';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import ScaleIn from '@/components/animations/ScaleIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';

export const metadata = {
  title: 'Zawody Masters of Aufguss - Instytut Saunowy',
  description: 'Odkryj magię zawodów Masters of Aufguss. Relacje z poprzednich edycji, galerie zdjęć i informacje o nadchodzących wydarzeniach.',
};

export default function ZawodyMoaPage() {
  // Past competition editions
  const pastEditions = [
    {
      year: '2024',
      location: 'Warszawa, Polska',
      title: 'MoA Poland Championships 2024',
      winner: 'Mateusz - Instytut Saunowy',
      participants: 24,
      description: 'Niezapomniana edycja pełna emocji, kreatywności i mistrzowskich ceremonii Aufguss.',
      highlights: [
        'Rekordowa liczba uczestników',
        'Międzynarodowe jury',
        'Innowacyjne ceremonie',
        'Warsztaty dla publiczności',
      ],
      color: 'from-amber-500 to-orange-600',
      images: 8,
    },
    {
      year: '2023',
      location: 'Kraków, Polska',
      title: 'MoA Poland Championships 2023',
      winner: 'Anna Nowak - SPA Natura',
      participants: 18,
      description: 'Pierwsza polska edycja zawodów Masters of Aufguss, która ustanowiła nowe standardy.',
      highlights: [
        'Premiera w Polsce',
        'Profesjonalne jury',
        'Ceremonie tematyczne',
        'Networking mistrzów',
      ],
      color: 'from-blue-500 to-cyan-600',
      images: 6,
    },
    {
      year: '2022',
      location: 'Berlin, Niemcy',
      title: 'European MoA Finals 2022',
      winner: 'Mateusz - Instytut Saunowy',
      participants: 32,
      description: 'Międzynarodowa rywalizacja najlepszych mistrzów Aufguss z całej Europy.',
      highlights: [
        '12 krajów uczestniczących',
        'Spektakularne ceremonie',
        'Media coverage',
        'Nagrody główne',
      ],
      color: 'from-purple-500 to-pink-600',
      images: 10,
    },
  ];

  // What is MoA
  const moaFeatures = [
    {
      icon: '🎭',
      title: 'Sztuka Ceremonii',
      description: 'Połączenie techniki, muzyki, aromatów i choreografii w jedną harmonijną całość.',
    },
    {
      icon: '🏆',
      title: 'Rywalizacja',
      description: 'Najlepsi mistrzowie Aufguss z całego świata prezentują swoje unikalne ceremonie.',
    },
    {
      icon: '🎓',
      title: 'Edukacja',
      description: 'Warsztaty, prezentacje i wymiana wiedzy między uczestnikami i publicznością.',
    },
    {
      icon: '🌍',
      title: 'Społeczność',
      description: 'Budowanie globalnej społeczności pasjonatów saunowania i kultury wellness.',
    },
  ];

  // Competition criteria
  const criteria = [
    { name: 'Technika użycia ręcznika', weight: '25%' },
    { name: 'Dobór i użycie aromatów', weight: '20%' },
    { name: 'Choreografia i ruch', weight: '20%' },
    { name: 'Interakcja z publicznością', weight: '15%' },
    { name: 'Muzyka i synchronizacja', weight: '10%' },
    { name: 'Kreatywność i innowacja', weight: '10%' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnptMCA2MGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6TTYgMTRjMy4zMSAwIDYtMi42OSA2LTZzLTIuNjktNi02LTYtNiAyLjY5LTYgNiAyLjY5IDYgNiA2em0wIDYwYzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <FadeIn className="text-center">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-semibold mb-6">
              🏆 Masters of Aufguss
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Zawody<br />
              <span className="text-amber-200">Masters of Aufguss</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Prestiżowe międzynarodowe zawody mistrzów ceremonii saunowych.
              Sztuka, pasja i profesjonalizm na najwyższym poziomie.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mt-12">
              <Link
                href="/kontakt"
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-50 transition-colors shadow-lg hover:shadow-xl"
              >
                Weź udział w następnej edycji
              </Link>
              <a
                href="#past-editions"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-600 transition-colors"
              >
                Zobacz poprzednie edycje
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* What is MoA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Czym są zawody Masters of Aufguss?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              MoA to międzynarodowa platforma dla mistrzów ceremonii saunowych,
              gdzie sztuka Aufguss spotyka się z profesjonalną rywalizacją.
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {moaFeatures.map((feature, index) => (
              <StaggerItem key={index}>
                <ScaleIn delay={index * 0.1}>
                  <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-shadow h-full">
                    <div className="text-6xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </ScaleIn>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Competition Criteria */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Kryteria Oceny
            </h2>
            <p className="text-xl text-gray-600">
              Jury profesjonalnych mistrzów Aufguss ocenia uczestników według następujących kryteriów:
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6">
                <h3 className="text-2xl font-bold text-white text-center">
                  System Punktacji
                </h3>
              </div>
              <div className="p-8">
                <div className="space-y-4">
                  {criteria.map((criterion, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                          {index + 1}
                        </div>
                        <span className="font-semibold text-gray-900">{criterion.name}</span>
                      </div>
                      <span className="text-xl font-bold text-orange-600">{criterion.weight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Past Editions */}
      <section id="past-editions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Poprzednie Edycje
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Relacje z najważniejszych wydarzeń w świecie ceremonii saunowych.
            </p>
          </FadeIn>

          <div className="space-y-16">
            {pastEditions.map((edition, editionIndex) => (
              <FadeIn key={edition.year} delay={editionIndex * 0.2}>
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-200">
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${edition.color} px-8 py-12 text-white`}>
                    <div className="max-w-4xl mx-auto">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium">
                          {edition.year}
                        </span>
                        <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium">
                          📍 {edition.location}
                        </span>
                        <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium">
                          👥 {edition.participants} uczestników
                        </span>
                      </div>
                      <h3 className="text-4xl md:text-5xl font-bold mb-3">
                        {edition.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xl">
                        <span>🏆</span>
                        <span className="font-semibold">Zwycięzca: {edition.winner}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 md:p-12">
                    <div className="max-w-4xl mx-auto">
                      {/* Description */}
                      <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                        {edition.description}
                      </p>

                      {/* Highlights */}
                      <div className="mb-12">
                        <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                          <span className={`bg-gradient-to-r ${edition.color} w-2 h-8 rounded-full`}></span>
                          Najważniejsze momenty
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {edition.highlights.map((highlight, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 p-4 bg-white border-2 border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                            >
                              <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span className="text-gray-800 font-medium">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Gallery */}
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-6">Galeria</h4>
                        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[...Array(edition.images)].map((_, imgIndex) => (
                            <StaggerItem key={imgIndex}>
                              <div className={`aspect-square rounded-xl overflow-hidden bg-gradient-to-br ${edition.color} shadow-lg hover:shadow-xl transition-all cursor-pointer group hover:scale-105`}>
                                <div className="w-full h-full flex items-center justify-center relative">
                                  <svg className="w-12 h-12 text-white/30 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white font-medium text-sm">Zobacz zdjęcie</span>
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

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Głosy Uczestników
            </h2>
            <p className="text-xl text-gray-600">
              Co mówią mistrzowie Aufguss o zawodach MoA?
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Mateusz',
                role: 'Zwycięzca MoA 2024',
                quote: 'Zawody MoA to nie tylko rywalizacja, ale przede wszystkim wymiana doświadczeń z najlepszymi mistrzami z całego świata. To inspirująca podróż, która podnosi nasze umiejętności na wyższy poziom.',
                image: '🏆',
              },
              {
                name: 'Anna Kowalska',
                role: 'Uczestniczka MoA 2023',
                quote: 'Atmosfera zawodów jest niesamowita! Czułam wsparcie zarówno ze strony jury, jak i innych uczestników. To doświadczenie zmieniło moje podejście do ceremonii Aufguss.',
                image: '🌟',
              },
              {
                name: 'Jan Nowak',
                role: 'Finalista MoA 2024',
                quote: 'Profesjonalna organizacja, międzynarodowe jury i najwyższy poziom ceremonii. MoA to punkt odniesienia dla każdego, kto chce rozwijać się w sztuce Aufguss.',
                image: '🎭',
              },
            ].map((testimonial, index) => (
              <StaggerItem key={index}>
                <ScaleIn delay={index * 0.1}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full border-2 border-gray-200">
                    <div className="text-6xl mb-4">{testimonial.image}</div>
                    <p className="text-gray-700 italic mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="border-t-2 border-gray-200 pt-4">
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </ScaleIn>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-600 to-orange-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Chcesz wziąć udział w następnej edycji?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Dołącz do elity mistrzów Aufguss i pokaż swoje umiejętności
              na międzynarodowej arenie!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-50 transition-colors shadow-lg hover:shadow-xl"
              >
                Zapytaj o udział w zawodach
              </Link>
              <Link
                href="/akademia"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-orange-600 transition-colors"
              >
                Przygotuj się - zobacz kursy
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
