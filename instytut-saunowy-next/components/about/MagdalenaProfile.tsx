'use client';

import FadeIn from '@/components/animations/FadeIn';
import ScaleIn from '@/components/animations/ScaleIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';

export default function MagdalenaProfile() {
  const achievements = [
    {
      icon: '🎪',
      title: 'Organizacja Wydarzeń',
      description: '30+ udanych eventów saunowych i wellness w całej Polsce',
    },
    {
      icon: '💆‍♀️',
      title: 'Wellness Expert',
      description: 'Certyfikaty z masażu, aromaterapii i holistycznej terapii relaksacyjnej',
    },
    {
      icon: '📊',
      title: 'Rozwój Biznesu',
      description: 'Konsultacje dla 20+ ośrodków SPA w zakresie wellness i customer experience',
    },
    {
      icon: '🌸',
      title: 'Community Building',
      description: 'Zbudowanie społeczności 5000+ entuzjastów saunowania i wellness',
    },
  ];

  const expertiseAreas = [
    'Event Management',
    'Wellness Consulting',
    'Customer Experience',
    'Aromatherapy',
    'Holistic Wellness',
    'Social Media Strategy',
  ];

  const galleryPlaceholders = [
    'Organizacja wydarzenia',
    'Warsztaty wellness',
    'Sesja aromaterapii',
    'Z uczestniczkami kursu',
    'Przygotowanie eventu',
    'Team building w saunie',
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Magdalena
          </h2>
          <p className="text-2xl text-wood-600 font-semibold mb-4">
            Wellness Expert & Event Manager
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Specjalistka wellness i organizatorka wydarzeń. Tworzy unikalne doświadczenia,
            które łączą relaks, edukację i budowanie społeczności.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Bio & Achievements */}
          <FadeIn direction="right" delay={0.3}>
            <div className="space-y-8">
              {/* Bio */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">O Mnie</h3>
                <div className="prose prose-lg text-gray-600 space-y-4">
                  <p>
                    Moja fascynacja wellness zaczęła się od osobistego poszukiwania
                    równowagi między intensywnym trybem życia a potrzebą regeneracji.
                    Sauna stała się dla mnie miejscem nie tylko relaksu, ale także
                    głębokiej transformacji.
                  </p>
                  <p>
                    Jako absolwentka psychologii i certyfikowana specjalistka wellness,
                    połączyłam wiedzę naukową z praktyką holistycznego podejścia do
                    zdrowia. W Instytucie Saunowym odpowiadam za całą stronę organizacyjną
                    - od planowania wydarzeń, przez customer experience, po budowanie
                    społeczności wokół marki.
                  </p>
                  <p>
                    Najbardziej spełnia mnie tworzenie przestrzeni, w której ludzie
                    mogą się spotkać, zrelaksować i naładować pozytywną energią.
                    Każde wydarzenie, które organizuję, to dla mnie okazja do dzielenia
                    się pasją do wellness i integracji społeczności.
                  </p>
                </div>
              </div>

              {/* Achievements Grid */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Osiągnięcia</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="text-4xl mb-3">{achievement.icon}</div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {achievement.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {achievement.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expertise Areas */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Specjalizacje</h3>
                <div className="flex flex-wrap gap-3">
                  {expertiseAreas.map((area, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md"
                    >
                      ✓ {area}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: Photo & Quote */}
          <ScaleIn delay={0.6}>
            <div className="space-y-8">
              {/* Main photo placeholder */}
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-pink-400 to-rose-600">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <svg className="w-32 h-32 mx-auto mb-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-white/60 text-sm">Magdalena - Photo Placeholder</p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="bg-gradient-to-br from-pink-50 to-rose-100 rounded-2xl p-8 border-l-4 border-rose-500">
                <svg className="w-10 h-10 text-rose-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-lg text-gray-700 italic mb-4 leading-relaxed">
                  Wellness to nie luksus, to podstawowa potrzeba. Moja misja to
                  sprawiać, by każdy mógł doświadczyć mocy regeneracji i odnaleźć
                  swój wewnętrzny spokój. W saunie, w życiu, we wszystkim co robimy.
                </p>
                <p className="text-rose-700 font-semibold">— Magdalena</p>
              </div>

              {/* Contact/Social highlight */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md">
                <h4 className="font-semibold text-gray-900 mb-4">Współpraca & Kontakt</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Organizujesz event wellness? Szukasz konsultacji dla swojego SPA?
                  Chętnie pomogę!
                </p>
                <div className="flex gap-3">
                  <a
                    href="mailto:magdalena@instytut-saunowy.pl"
                    className="flex-1 text-center bg-gradient-to-r from-pink-500 to-rose-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow"
                  >
                    Email
                  </a>
                  <a
                    href="https://www.instagram.com/instytut_saunowy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center border-2 border-pink-500 text-pink-600 px-4 py-2 rounded-lg font-medium hover:bg-pink-50 transition-colors"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>
          </ScaleIn>
        </div>

        {/* Gallery Section */}
        <FadeIn delay={0.9}>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Galeria
            </h3>
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryPlaceholders.map((caption, index) => (
                <StaggerItem key={index}>
                  <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-pink-300 to-rose-500 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                    <div className="w-full h-full flex items-center justify-center relative">
                      <svg className="w-16 h-16 text-white/30 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm p-3">
                        <p className="text-white text-xs font-medium text-center">
                          {caption}
                        </p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
