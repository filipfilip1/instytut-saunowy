'use client';

import FadeIn from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';

export default function SocialProofSection() {
  const testimonials = [
    {
      name: 'Anna Kowalska',
      role: 'Właścicielka SPA',
      avatar: 'AK',
      rating: 5,
      text: 'Szkolenie z Aufguss było niesamowite! Mateusz przekazał nie tylko wiedzę techniczną, ale przede wszystkim pasję. Nasi goście zachwycają się seansami.',
    },
    {
      name: 'Piotr Nowak',
      role: 'Instruktor Wellness',
      avatar: 'PN',
      rating: 5,
      text: 'Kilty z Instytutu Saunowego to najlepsza jakość na rynku. Materiał jest miękki, przewiewny i wytrzymały. Po roku intensywnego użytkowania wyglądają jak nowe!',
    },
    {
      name: 'Magdalena W.',
      role: 'Pasjonatka saunowania',
      avatar: 'MW',
      rating: 5,
      text: 'Zawody MoA to niezapomniane przeżycie! Profesjonalna organizacja, niesamowita atmosfera i najlepsi mistrzowie ceremonii. Nie mogę się doczekać kolejnej edycji.',
    },
    {
      name: 'Tomasz Zieliński',
      role: 'Właściciel hotelu',
      avatar: 'TZ',
      rating: 5,
      text: 'Kompleksowe podejście do saunowania - od szkoleń pracowników, przez wyposażenie, po organizację eventów. Instytut Saunowy to nasz partner od lat.',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium mb-4">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            500+ zadowolonych klientów
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Co mówią o nas klienci
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ich opinie są dla nas najważniejsze. Dołącz do grona zadowolonych
            miłośników saunowania.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={index}>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 h-full">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-wood-500 to-wood-700 flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>

                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Trust badges */}
        <FadeIn delay={0.6} className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-wood-700 mb-2">500+</div>
              <div className="text-sm text-gray-600">Zadowolonych klientów</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-wood-700 mb-2">4.9/5</div>
              <div className="text-sm text-gray-600">Średnia ocena</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-wood-700 mb-2">50+</div>
              <div className="text-sm text-gray-600">Przeprowadzonych szkoleń</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-wood-700 mb-2">10+</div>
              <div className="text-sm text-gray-600">Lat doświadczenia</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
