'use client';

import FadeIn from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';

export default function TimelineSection() {
  const timelineEvents = [
    {
      year: '2014',
      title: 'Narodziny pasji',
      description: 'Pierwsza wizyta w saunie i odkrycie magii ceremonii Aufguss. To był moment, który zmienił wszystko.',
      icon: '🌱',
      color: 'from-green-500 to-green-600',
    },
    {
      year: '2016',
      title: 'Pierwsze szkolenia',
      description: 'Rozpoczęcie profesjonalnej ścieżki nauczania. Pierwsze certyfikaty, pierwsi uczniowie, pierwsze sukcesy.',
      icon: '🎓',
      color: 'from-blue-500 to-blue-600',
    },
    {
      year: '2018',
      title: 'Masters of Aufguss',
      description: 'Udział w pierwszych zawodach międzynarodowych. Uznanie w branży i budowanie marki osobistej.',
      icon: '🏆',
      color: 'from-amber-500 to-amber-600',
    },
    {
      year: '2020',
      title: 'Powstanie Instytutu',
      description: 'Oficjalne założenie Instytutu Saunowego. Integracja szkoleń, produktów i organizacji wydarzeń pod jedną marką.',
      icon: '🏢',
      color: 'from-purple-500 to-purple-600',
    },
    {
      year: '2022',
      title: 'Rozwój oferty',
      description: 'Uruchomienie sklepu z odzieżą saunową. Własna linia produktów łącząca tradycję z nowoczesnym designem.',
      icon: '🛍️',
      color: 'from-pink-500 to-pink-600',
    },
    {
      year: '2024',
      title: 'Organizacja MoA',
      description: 'Pierwsza edycja zawodów Masters of Aufguss w Polsce. Uznanie międzynarodowe i rozwój społeczności.',
      icon: '🎪',
      color: 'from-red-500 to-red-600',
    },
    {
      year: '2025',
      title: 'Dzisiaj',
      description: 'Kompleksowe centrum saunowe - szkolenia, produkty, wydarzenia. 500+ zadowolonych klientów i rosnąca społeczność.',
      icon: '✨',
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nasza Historia
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Od pasji do profesji - poznaj drogę, która doprowadziła nas do stworzenia
            Instytutu Saunowego.
          </p>
        </FadeIn>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-wood-300 via-wood-400 to-wood-500"></div>

          <StaggerContainer className="space-y-12">
            {timelineEvents.map((event, index) => (
              <StaggerItem key={event.year}>
                <div className={`flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}>
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                      <div className={`inline-flex items-center gap-2 text-2xl font-bold mb-2 ${
                        index % 2 === 0 ? 'md:justify-end md:flex-row-reverse' : ''
                      }`}>
                        <span className={`bg-gradient-to-r ${event.color} bg-clip-text text-transparent`}>
                          {event.year}
                        </span>
                        <span className="text-3xl">{event.icon}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:flex flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-white to-gray-100 border-4 border-wood-500 shadow-lg items-center justify-center z-10">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${event.color} flex items-center justify-center text-white text-2xl`}>
                      {event.icon}
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden md:block"></div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Bottom CTA */}
        <FadeIn delay={0.8} className="text-center mt-16 pt-16 border-t border-gray-200">
          <p className="text-2xl font-semibold text-gray-900 mb-4">
            A to dopiero początek...
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Każdego dnia pracujemy nad rozwojem społeczności saunowej w Polsce.
            Dołącz do nas i twórz historię razem z nami!
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
