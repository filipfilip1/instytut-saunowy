'use client';

import FadeIn from '@/components/animations/FadeIn';
import ScaleIn from '@/components/animations/ScaleIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';

export default function MateuszProfile() {
  const achievements = [
    {
      icon: '🏆',
      title: 'Zwycięstwa w MoA',
      description: '5+ nagród na międzynarodowych zawodach Masters of Aufguss',
    },
    {
      icon: '🎓',
      title: 'Certyfikowany Trener',
      description: 'Międzynarodowe certyfikaty z Aufguss, wellness i technik relaksacyjnych',
    },
    {
      icon: '👥',
      title: '200+ Przeszkolonych',
      description: 'Ponad 200 absolwentów kursów Aufguss w całej Polsce',
    },
    {
      icon: '🌍',
      title: 'Doświadczenie Międzynarodowe',
      description: 'Współpraca z ośrodkami SPA w Polsce, Niemczech i Austrii',
    },
  ];

  const certifications = [
    'Certified Aufguss Master',
    'Sauna Specialist',
    'Wellness & SPA Consultant',
    'Aromatherapy Expert',
    'Master of Ceremonies',
  ];

  const galleryPlaceholders = [
    'Podczas ceremonii Aufguss',
    'Zawody MoA',
    'Szkolenie grupowe',
    'Sesja w saunie',
    'Praca z ręcznikiem',
    'Z uczestnikami kursu',
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mateusz
          </h2>
          <p className="text-2xl text-wood-600 font-semibold mb-4">
            Master Aufguss & Założyciel Instytutu
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pasjonat saunowania z ponad 10-letnim doświadczeniem. Twórca unikalnych
            ceremonii Aufguss i mentor setek entuzjastów wellness.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Photo & Quote */}
          <ScaleIn>
            <div className="space-y-8">
              {/* Main photo placeholder */}
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-wood-400 to-wood-600">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center p-8">
                    <svg className="w-32 h-32 mx-auto mb-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <p className="text-white/60 text-sm">Mateusz - Photo Placeholder</p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="bg-gradient-to-br from-wood-50 to-wood-100 rounded-2xl p-8 border-l-4 border-wood-600">
                <svg className="w-10 h-10 text-wood-400 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-lg text-gray-700 italic mb-4 leading-relaxed">
                  Aufguss to nie tylko technika - to sztuka tworzenia wyjątkowych chwil.
                  Każda ceremonia jest unikalna, każdy seans opowiada inną historię.
                  Moją misją jest dzielenie się tą magią z innymi.
                </p>
                <p className="text-wood-700 font-semibold">— Mateusz</p>
              </div>
            </div>
          </ScaleIn>

          {/* Right: Bio & Achievements */}
          <FadeIn direction="left" delay={0.3}>
            <div className="space-y-8">
              {/* Bio */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">O Mnie</h3>
                <div className="prose prose-lg text-gray-600 space-y-4">
                  <p>
                    Moja przygoda z saunowaniem zaczęła się ponad dekadę temu podczas
                    przypadkowej wizyty w saunie fińskiej. Już wtedy wiedziałem, że
                    to więcej niż relaks - to filozofia, która łączy ciało, umysł i duszę.
                  </p>
                  <p>
                    Po latach praktyki i nauki u najlepszych mistrzów Aufguss w Europie,
                    postanowiłem dzielić się swoją wiedzą z innymi. Założenie Instytutu
                    Saunowego było naturalnym krokiem - miejsca, gdzie tradycja spotyka
                    się z innowacją, a profesjonalizm idzie w parze z pasją.
                  </p>
                  <p>
                    Dziś moje największe osiągnięcie to nie trofea z zawodów, ale uśmiechy
                    uczestników moich sesji i sukces absolwentów moich kursów. Każdy dzień
                    przynosi nowe wyzwania i możliwości - i właśnie to kocham w tej pracy.
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

              {/* Certifications */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Certyfikaty</h3>
                <div className="flex flex-wrap gap-3">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-wood-600 to-wood-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md"
                    >
                      ✓ {cert}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Gallery Section */}
        <FadeIn delay={0.6}>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Galeria
            </h3>
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryPlaceholders.map((caption, index) => (
                <StaggerItem key={index}>
                  <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-wood-300 to-wood-500 shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
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
