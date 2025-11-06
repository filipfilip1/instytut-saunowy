'use client';

import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';
import HoverCard from '@/components/animations/HoverCard';

export default function ThreePillarsSection() {
  const pillars = [
    {
      title: 'Szkolenia',
      subtitle: 'Akademia Aufguss',
      description: 'Profesjonalne szkolenia z ceremonii Aufguss, technik pracy z ręcznikiem i tworzenia unikalnych seansów saunowych.',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      href: '/akademia',
      features: ['Kursy Aufguss', 'Certyfikaty', 'Praktyka', 'Mentoring'],
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Sklep',
      subtitle: 'Odzież & Akcesoria',
      description: 'Wysokiej jakości kilty, poncha, kimona i akcesoria do sauny. Produkty łączące tradycję z nowoczesnym designem.',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      href: '/sklep',
      features: ['Kilty', 'Poncha & Kimona', 'Akcesoria', 'Zestawy'],
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Zawody MoA',
      subtitle: 'Masters of Aufguss',
      description: 'Organizacja i udział w prestiżowych zawodach Masters of Aufguss. Najlepsi mistrzowie ceremonii w jednym miejscu.',
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      href: '/zawody-moa',
      features: ['Zawody', 'Relacje', 'Galeria', 'Regulaminy'],
      color: 'from-amber-500 to-amber-600',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Trzy Filary Instytutu
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kompleksowe podejście do saunowania - edukacja, produkty i rywalizacja
            na najwyższym poziomie.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <FadeIn key={pillar.title} delay={index * 0.2}>
              <HoverCard>
                <Link href={pillar.href} className="block h-full">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow h-full flex flex-col">
                    {/* Gradient header */}
                    <div className={`bg-gradient-to-br ${pillar.color} p-8 text-white`}>
                      <div className="mb-4 opacity-90">
                        {pillar.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{pillar.title}</h3>
                      <p className="text-white/90 font-medium">{pillar.subtitle}</p>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex-grow flex flex-col">
                      <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
                        {pillar.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {pillar.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="inline-flex items-center gap-2 text-wood-600 font-semibold group">
                        Dowiedz się więcej
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </HoverCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
