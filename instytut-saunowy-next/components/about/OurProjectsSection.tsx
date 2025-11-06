'use client';

import FadeIn from '@/components/animations/FadeIn';
import ScaleIn from '@/components/animations/ScaleIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';

export default function OurProjectsSection() {
  const projects = [
    {
      name: 'Urle',
      location: 'Polska',
      type: 'Kompleksowy projekt wellness',
      year: '2023',
      description: 'Współpraca przy tworzeniu kompleksowego centrum wellness z naciskiem na autentyczne doświadczenia saunowe.',
      scope: [
        'Projektowanie stref saunowych',
        'Szkolenie personelu z Aufguss',
        'Wdrożenie ceremonii saunowych',
        'Konsultacje wellness experience',
        'Dostawa odzieży i akcesoriów',
      ],
      results: [
        '95% pozytywnych opinii gości',
        '3x wzrost rezerwacji saun',
        'Certyfikat najlepszego SPA w regionie',
      ],
      color: 'from-blue-500 to-cyan-600',
      images: 6,
    },
    {
      name: 'Sauna Natura',
      location: 'Polska',
      type: 'Premium sauna experience',
      year: '2024',
      description: 'Przekształcenie tradycyjnej sauny w premium centrum z autorskimi ceremoniami Aufguss i holistycznym podejściem do wellness.',
      scope: [
        'Opracowanie koncepcji ceremonii',
        'Szkolenie mistrzów Aufguss',
        'Wdrożenie aromaterapii',
        'Branding doświadczenia saunowego',
        'Mentoring i follow-up',
      ],
      results: [
        'Wzrost frekwencji o 150%',
        'Pozyskanie stałych klientów premium',
        'Rozpoznawalność w social media',
      ],
      color: 'from-green-500 to-emerald-600',
      images: 6,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nasze Realizacje
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Współpracujemy z najlepszymi ośrodkami wellness w Polsce,
            tworząc unikalne doświadczenia saunowe od A do Z.
          </p>
        </FadeIn>

        <div className="space-y-20">
          {projects.map((project, projectIndex) => (
            <FadeIn key={project.name} delay={projectIndex * 0.2}>
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                {/* Header with gradient */}
                <div className={`bg-gradient-to-r ${project.color} px-8 py-12 text-white`}>
                  <div className="max-w-4xl mx-auto">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium">
                        {project.year}
                      </span>
                      <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-medium">
                        {project.location}
                      </span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold mb-3">
                      {project.name}
                    </h3>
                    <p className="text-xl text-white/90 font-medium">
                      {project.type}
                    </p>
                  </div>
                </div>

                <div className="p-8 md:p-12">
                  <div className="max-w-4xl mx-auto">
                    {/* Description */}
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Scope & Results Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                      {/* Scope */}
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                          <span className={`bg-gradient-to-r ${project.color} w-2 h-8 rounded-full`}></span>
                          Zakres współpracy
                        </h4>
                        <ul className="space-y-3">
                          {project.scope.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Results */}
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                          <span className={`bg-gradient-to-r ${project.color} w-2 h-8 rounded-full`}></span>
                          Rezultaty
                        </h4>
                        <div className="space-y-4">
                          {project.results.map((result, index) => (
                            <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                              <div className="flex items-center gap-3">
                                <div className={`bg-gradient-to-r ${project.color} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
                                  {index + 1}
                                </div>
                                <p className="text-gray-800 font-medium">{result}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Gallery */}
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-6">Galeria projektu</h4>
                      <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[...Array(project.images)].map((_, imgIndex) => (
                          <StaggerItem key={imgIndex}>
                            <div className={`aspect-video rounded-xl overflow-hidden bg-gradient-to-br ${project.color} shadow-lg hover:shadow-xl transition-shadow cursor-pointer group`}>
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

        {/* CTA */}
        <FadeIn delay={0.8} className="mt-16 text-center">
          <div className="bg-gradient-to-br from-wood-700 to-wood-900 rounded-3xl p-12 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Chcesz stworzyć wyjątkowe doświadczenie saunowe?
            </h3>
            <p className="text-xl text-wood-100 mb-8 max-w-2xl mx-auto">
              Pomożemy Ci w każdym aspekcie - od koncepcji, przez szkolenia,
              po wdrożenie i mentoring.
            </p>
            <a
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-white text-wood-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-wood-50 transition-colors shadow-lg hover:shadow-xl"
            >
              Skontaktuj się z nami
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
