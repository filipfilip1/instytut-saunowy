'use client';

import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import ScaleIn from '@/components/animations/ScaleIn';

export default function AboutMiniSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pasja, która nas łączy
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Za Instytutem Saunowym stoi para pasjonatów, którzy od lat dzielą się
            swoją miłością do saunowania i tradycji Aufguss.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Mateusz */}
          <ScaleIn delay={0.2}>
            <div className="group bg-gradient-to-br from-wood-50 to-wood-100 rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="flex flex-col items-center text-center">
                {/* Photo placeholder */}
                <div className="w-40 h-40 rounded-full bg-wood-300 mb-6 overflow-hidden border-4 border-white shadow-lg">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-wood-400 to-wood-600">
                    <svg className="w-20 h-20 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">Mateusz</h3>
                <p className="text-wood-600 font-medium mb-4">Master Aufguss & Trener</p>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  Wielokrotny uczestnik i zwycięzca zawodów Masters of Aufguss.
                  Ekspert w sztuce ceremonii saunowych i twórca unikalnych seansów Aufguss.
                </p>

                <div className="flex gap-2 text-sm text-gray-500">
                  <span className="bg-wood-200 px-3 py-1 rounded-full">Aufguss Master</span>
                  <span className="bg-wood-200 px-3 py-1 rounded-full">Trener</span>
                </div>
              </div>
            </div>
          </ScaleIn>

          {/* Magdalena */}
          <ScaleIn delay={0.4}>
            <div className="group bg-gradient-to-br from-wood-50 to-wood-100 rounded-2xl p-8 hover:shadow-xl transition-shadow">
              <div className="flex flex-col items-center text-center">
                {/* Photo placeholder */}
                <div className="w-40 h-40 rounded-full bg-wood-300 mb-6 overflow-hidden border-4 border-white shadow-lg">
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-wood-400 to-wood-600">
                    <svg className="w-20 h-20 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">Magdalena</h3>
                <p className="text-wood-600 font-medium mb-4">Specjalistka Wellness & Organizatorka</p>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  Pasjonatka wellness i zdrowego stylu życia. Odpowiedzialna za organizację
                  wydarzeń, warsztatów i tworzenie wyjątkowych doświadczeń saunowych.
                </p>

                <div className="flex gap-2 text-sm text-gray-500">
                  <span className="bg-wood-200 px-3 py-1 rounded-full">Wellness</span>
                  <span className="bg-wood-200 px-3 py-1 rounded-full">Eventy</span>
                </div>
              </div>
            </div>
          </ScaleIn>
        </div>

        {/* CTA */}
        <FadeIn delay={0.6} className="text-center mt-12">
          <Link
            href="/o-nas"
            className="inline-flex items-center gap-2 text-wood-600 font-semibold hover:text-wood-700 transition-colors group"
          >
            Poznaj naszą historię
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
