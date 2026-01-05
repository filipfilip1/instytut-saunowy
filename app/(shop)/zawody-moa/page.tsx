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
import { Camera, Trophy, Users, Award, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Zawody Masters of Aufguss - Instytut Saunowy',
  description:
    'Odkryj magię zawodów Masters of Aufguss. Relacje z poprzednich edycji, galerie zdjęć i informacje o nadchodzących wydarzeniach. Międzynarodowa rywalizacja mistrzów ceremonii saunowych.',
};

export default function ZawodyMoaPage() {
  return (
    // MAIN WRAPPER - Safety Straitjacket
    <div className="w-full max-w-[100vw] min-h-screen bg-[#F0ECE2] overflow-x-hidden relative">
      {/* 1. Hero Section - "The Arena" */}
      <header className="w-full relative bg-[#2C2622] text-[#F0ECE2] overflow-hidden">
        {/* Noise texture overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] opacity-40"></div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-20 md:py-32 lg:py-40">
          <FadeIn className="text-center">
            {/* Subtitle/Eyebrow */}
            <div className="text-[#C47F52] uppercase tracking-widest text-xs md:text-sm font-sans mb-8">
              Sztuka, pasja i profesjonalizm na najwyższym poziomie
            </div>

            {/* Main Title */}
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12 leading-tight tracking-tight">
              Mistrzowie Sauny:<br />
              Pasja, Edukacja, Współzawodnictwo!
            </h1>

            {/* Description */}
            <p className="text-[#F0ECE2]/80 text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed font-light mb-12 px-2">
              Prestiżowe międzynarodowe zawody mistrzów ceremonii saunowych. Odkryj magię rywalizacji i sztuki Aufguss.
            </p>

            {/* CTAs */}
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-stretch md:items-center px-2">
              <Link
                href="/kontakt"
                className="bg-[#C47F52] text-white px-8 py-3 rounded-md font-semibold hover:brightness-110 transition-all text-center"
              >
                Weź udział w następnej edycji
              </Link>
              <a
                href="#past-editions"
                className="border border-[#F0ECE2]/30 text-[#F0ECE2] px-8 py-3 rounded-md font-semibold hover:border-[#C47F52] hover:text-[#C47F52] transition-all text-center"
              >
                Zobacz poprzednie edycje
              </a>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* 2. "Poznaj Formułę" - De-boxed Layout */}
      <main className="w-full max-w-[100vw]">
        <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F0ECE2]">
          <div className="w-full max-w-7xl mx-auto">
            <FadeIn className="text-center mb-16 md:mb-24">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#2C2622] mb-4">
                Poznaj formułę zawodów MoA
              </h2>
              <p className="text-base md:text-lg text-stone-600 max-w-3xl mx-auto font-light">
                Trzy rundy, trzy style, jedno mistrzostwo. Każdy seans to unikalne wyzwanie dla
                Saunamistrza.
              </p>
            </FadeIn>

            <div className="space-y-24 md:space-y-32">
              {MOA_CEREMONY_TYPES.map((ceremony, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Image */}
                    <div className={`relative w-full aspect-[4/3] rounded-sm overflow-hidden ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      {ceremony.imageUrl ? (
                        <Image
                          src={ceremony.imageUrl}
                          alt={ceremony.title}
                          fill
                          className="object-cover max-w-full"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#2C2622]/10 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-6xl md:text-8xl mb-4 opacity-30">{ceremony.icon}</div>
                            <Camera className="w-12 h-12 md:w-16 md:h-16 text-[#2C2622]/20 mx-auto" strokeWidth={1} />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                      {/* Max Points Label */}
                      <div className="text-[#C47F52] uppercase tracking-widest text-xs md:text-sm font-bold mb-4">
                        MAX: {ceremony.maxPoints} PKT
                      </div>

                      <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-[#2C2622] mb-4 md:mb-6">
                        {ceremony.title}
                      </h3>

                      <p className="text-base md:text-lg text-stone-600 leading-relaxed mb-6 md:mb-8 font-light">
                        {ceremony.description}
                      </p>

                      {/* Criteria - Specs List */}
                      <div className="space-y-0">
                        <h4 className="text-sm font-semibold text-[#2C2622] mb-4 uppercase tracking-wide">
                          Kryteria oceny:
                        </h4>
                        {ceremony.criteria.map((criterion, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between py-3 border-b border-[#2C2622]/10 text-sm"
                          >
                            <span className="text-stone-600">{criterion.name}</span>
                            <span className="font-semibold text-[#2C2622] ml-4">{criterion.points} pkt</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 3. "Poprzednie Edycje" - The History (Dark Mode) */}
        <section id="past-editions" className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#2C2622] relative overflow-hidden">
          {/* Noise texture */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] opacity-50"></div>

          <div className="relative w-full max-w-7xl mx-auto">
            <FadeIn className="text-center mb-16 md:mb-24">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#F0ECE2] mb-4">
                Poprzednie Edycje
              </h2>
              <p className="text-base md:text-lg text-stone-400 max-w-3xl mx-auto font-light">
                Relacje z najważniejszych wydarzeń w świecie ceremonii saunowych.
              </p>
            </FadeIn>

            <div className="space-y-20 md:space-y-32">
              {MOA_PAST_EDITIONS.map((edition, editionIndex) => (
                <FadeIn key={edition.year} delay={editionIndex * 0.15}>
                  <article className="w-full pb-12 border-b border-[#F0ECE2]/10 last:border-b-0">
                    {/* Edition Meta */}
                    <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-[#C47F52]">
                      <span className="font-semibold">{edition.year}</span>
                      <span className="text-[#F0ECE2]/30">•</span>
                      <span>{edition.location}</span>
                      <span className="text-[#F0ECE2]/30">•</span>
                      <span>{edition.participants} uczestników</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-[#F0ECE2] mb-4">
                      {edition.title}
                    </h3>

                    {/* Winner */}
                    <div className="flex items-center gap-3 mb-6 text-lg md:text-xl">
                      <Trophy className="w-6 h-6 text-[#C47F52]" strokeWidth={1.5} />
                      <span className="text-[#C47F52] font-semibold">
                        Zwycięzca: {edition.winner.name} - {edition.winner.affiliation}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-base md:text-lg text-stone-400 mb-8 leading-relaxed font-light max-w-4xl">
                      {edition.description}
                    </p>

                    {/* Highlights - Simple Text List */}
                    <div className="mb-10">
                      <h4 className="text-sm font-semibold text-[#F0ECE2] mb-4 uppercase tracking-wide">
                        Najważniejsze momenty
                      </h4>
                      <p className="text-sm md:text-base text-stone-400 leading-relaxed">
                        {edition.highlights.map((highlight, index) => (
                          <span key={index}>
                            ✔ {highlight}
                            {index < edition.highlights.length - 1 && ' • '}
                          </span>
                        ))}
                      </p>
                    </div>

                    {/* Gallery */}
                    <div>
                      <h4 className="text-sm font-semibold text-[#F0ECE2] mb-4 uppercase tracking-wide">
                        Galeria
                      </h4>
                      {/* Mobile: Horizontal Scroll Snap */}
                      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4 md:hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        {[...Array(4)].map((_, imgIndex) => (
                          <div
                            key={imgIndex}
                            className="relative w-[85vw] aspect-[4/3] rounded-sm overflow-hidden bg-[#F0ECE2]/10 flex-shrink-0 snap-center group cursor-pointer"
                          >
                            <div className="w-full h-full flex items-center justify-center">
                              <Camera className="w-12 h-12 text-[#F0ECE2]/20 group-hover:scale-110 transition-transform" strokeWidth={1} />
                            </div>
                            <div className="absolute inset-0 bg-[#2C2622]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-[#F0ECE2] font-medium text-sm">
                                Zobacz zdjęcie
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Desktop: 4-column Grid */}
                      <div className="hidden md:grid grid-cols-4 gap-4">
                        {[...Array(4)].map((_, imgIndex) => (
                          <div
                            key={imgIndex}
                            className="relative aspect-square rounded-sm overflow-hidden bg-[#F0ECE2]/10 group cursor-pointer hover:scale-105 transition-transform"
                          >
                            <div className="w-full h-full flex items-center justify-center">
                              <Camera className="w-12 h-12 text-[#F0ECE2]/20 group-hover:scale-110 transition-transform" strokeWidth={1} />
                            </div>
                            <div className="absolute inset-0 bg-[#2C2622]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-[#F0ECE2] font-medium text-sm">
                                Zobacz zdjęcie
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 4. "Czym są zawody?" - Values */}
        <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F0ECE2]">
          <div className="w-full max-w-7xl mx-auto">
            <FadeIn className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#2C2622] mb-4">
                Czym są zawody Masters of Aufguss?
              </h2>
              <p className="text-base md:text-lg text-stone-600 max-w-3xl mx-auto font-light">
                MoA to międzynarodowa platforma dla mistrzów ceremonii saunowych, gdzie sztuka
                Aufguss spotyka się z profesjonalną rywalizacją.
              </p>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-8 lg:gap-12">
              {MOA_FEATURES.map((feature, index) => {
                // Map icon names to Lucide icons
                const IconComponent =
                  index === 0 ? Trophy :
                  index === 1 ? Users :
                  index === 2 ? Award :
                  Target;

                return (
                  <StaggerItem key={index}>
                    <div className="text-center">
                      <div className="mb-4 md:mb-6">
                        <IconComponent className="w-10 h-10 md:w-14 md:h-14 text-[#C47F52] mx-auto" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-serif text-base md:text-xl lg:text-2xl font-bold text-[#2C2622] mb-2 md:mb-3">{feature.title}</h3>
                      <p className="text-xs md:text-base text-stone-600 leading-relaxed font-light">{feature.description}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* 5. Aktualności */}
        <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F0ECE2] border-t border-[#2C2622]/10">
          <div className="w-full max-w-7xl mx-auto">
            <FadeIn className="text-center mb-12 md:mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2C2622] mb-4">
                Aktualności
              </h2>
              <p className="text-base md:text-lg text-stone-600 font-light">Najnowsze wiadomości ze świata MoA</p>
            </FadeIn>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {MOA_NEWS.slice(0, 3).map((news, index) => (
                <StaggerItem key={news.id}>
                  <article className="w-full min-w-0 border-l-2 border-[#C47F52] pl-4">
                    <div className="text-xs font-bold tracking-widest text-[#C47F52] uppercase mb-2">
                      {news.date.toLocaleDateString('pl-PL', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <h3 className="font-serif text-xl text-[#2C2622] mb-3 leading-tight">{news.title}</h3>
                    <p className="text-sm text-stone-600 leading-relaxed">{news.excerpt}</p>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </main>

      {/* 6. CTA Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-[#2C2622] relative overflow-hidden">
        {/* Noise texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] opacity-50"></div>

        <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            {/* Eyebrow */}
            <div className="text-[#C47F52] uppercase tracking-widest text-xs md:text-sm font-sans mb-4 md:mb-6">
              Dołącz do elity
            </div>

            {/* Main Headline */}
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#F0ECE2] mb-4 md:mb-6 leading-tight">
              Chcesz wziąć udział w następnej edycji?
            </h2>

            {/* Description */}
            <p className="text-stone-400 text-base md:text-lg lg:text-xl mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-light px-2">
              Dołącz do elity mistrzów Aufguss i pokaż swoje umiejętności na międzynarodowej
              arenie!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4 md:gap-6 px-2 mb-6">
              <Link
                href="/kontakt"
                className="w-full md:w-auto bg-[#C47F52] text-white px-8 py-3 rounded-md font-semibold hover:brightness-110 transition-all text-center"
              >
                Zapytaj o udział w zawodach
              </Link>
              <Link
                href="/szkolenia"
                className="w-full md:w-auto border border-[#F0ECE2]/30 text-[#F0ECE2] px-8 py-3 rounded-md font-semibold hover:border-[#C47F52] hover:text-[#C47F52] transition-all text-center"
              >
                Przygotuj się - zobacz szkolenia
              </Link>
            </div>

            {/* Regulamin Link */}
            <p className="text-stone-400/80 text-sm">
              Przed zgłoszeniem zapoznaj się z{' '}
              <Link
                href="/zawody-moa/regulamin"
                className="text-[#C47F52] hover:text-[#C47F52]/80 transition-colors font-medium underline"
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
