import React from 'react';
import FadeIn from '@/components/animations/FadeIn';
import TimelineSection from '@/components/about/TimelineSection';
import MateuszProfile from '@/components/about/MateuszProfile';
import MagdalenaProfile from '@/components/about/MagdalenaProfile';
import OurProjectsSection from '@/components/about/OurProjectsSection';

export const metadata = {
  title: 'O nas - Instytut Saunowy',
  description: 'Poznaj historię Instytutu Saunowego, zespół pasjonatów i nasze realizacje. Mateusz i Magdalena dzielą się swoją miłością do saunowania od ponad 10 lat.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-wood-800 via-wood-700 to-wood-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnptMCA2MGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6TTYgMTRjMy4zMSAwIDYtMi42OSA2LTZzLTIuNjktNi02LTYtNiAyLjY5LTYgNiAyLjY5IDYgNiA2em0wIDYwYzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <FadeIn className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              O Instytucie<br />
              <span className="text-wood-200">Saunowym</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-wood-100 max-w-3xl mx-auto leading-relaxed">
              Poznaj ludzi, historię i pasję, która stoi za najbardziej
              kompleksowym centrum saunowym w Polsce.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mt-12 text-wood-100">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">10+</div>
                <div className="text-sm md:text-base">Lat doświadczenia</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">500+</div>
                <div className="text-sm md:text-base">Zadowolonych klientów</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">50+</div>
                <div className="text-sm md:text-base">Przeprowadzonych szkoleń</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">30+</div>
                <div className="text-sm md:text-base">Zorganizowanych eventów</div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="rgb(249, 250, 251)"/>
          </svg>
        </div>
      </section>

      {/* Timeline Section */}
      <TimelineSection />

      {/* Team Section Divider */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nasz Zespół
            </h2>
            <p className="text-xl text-gray-600">
              Poznaj ludzi, którzy każdego dnia tworzą Instytut Saunowy
              i dzielą się pasją do wellness.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Mateusz Profile */}
      <MateuszProfile />

      {/* Magdalena Profile */}
      <MagdalenaProfile />

      {/* Our Projects Section */}
      <OurProjectsSection />

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Dołącz do nas
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Czy jesteś entuzjastą saunowania, właścicielem SPA, czy po prostu
              szukasz relaksu - mamy coś dla Ciebie.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/akademia"
                className="bg-wood-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-wood-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Poznaj nasze szkolenia
              </a>
              <a
                href="/sklep"
                className="border-2 border-wood-600 text-wood-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-wood-50 transition-colors"
              >
                Zobacz produkty
              </a>
              <a
                href="/kontakt"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors"
              >
                Skontaktuj się
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
