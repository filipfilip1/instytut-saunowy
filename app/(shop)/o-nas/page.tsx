import { Metadata } from 'next';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import ScaleIn from '@/components/animations/ScaleIn';
import AnimatedNumber from '@/components/animations/AnimatedNumber';
import FounderCard from '@/components/about/FounderCard';
import CommunityPhotoCard from '@/components/about/CommunityPhotoCard';
import InstagramPhoto from '@/components/about/InstagramPhoto';
import { COMMUNITY_PHOTOS } from '@/lib/constants/communityPhotos';
import { INSTAGRAM_FEED } from '@/lib/constants/socialFeed';
import { founderAvatar } from '@/lib/utils/cloudinary';
import { ChevronDown, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'O nas - Instytut Saunowy',
  description:
    'Poznaj naszą historię, misję i założycieli. Instytut Saunowy to pasja, tradycja i autentyczna fińska kultura saunowa.',
};

// Founders Data
const FOUNDERS = [
  {
    name: 'Magdalena Kupińska',
    role: 'Mentorka Saunowa',
    bio: 'Z pierwszej podróży do Finlandii przywiozłam nie tylko wspomnienia, ale misję - pokazać Polakom, że sauna to więcej niż gorące pomieszczenie. To rytuał, który łączy tradycję, mindfulness i wspólnotę.',
    philosophy: 'Sauna to nie miejsce - to stan umysłu',
    imageUrl: founderAvatar('https://res.cloudinary.com/dh87opqta/image/upload/v1765819550/558943616_1434623841997641_5168742723712960409_n_k1jbya.jpg'),
    favoriteProducts: [
      { name: 'Tekstylia saunowe', url: '/sklep?category=tekstylia' },
      { name: 'Ceramika tradycyjna', url: '/sklep?category=ceramika' },
    ],
  },
  {
    name: 'Mateusz Kupiński',
    role: 'Saunamistrz',
    bio: 'Jako saunamistrz wiem, że prawdziwa ceremonia wymaga cierpliwości, wiedzy i szacunku dla tradycji. Przez 15 lat studiowałem fińskie techniki, by przekazywać je dalej w autentycznej formie.',
    philosophy: 'Prawdziwa sauna wymaga cierpliwości',
    imageUrl: founderAvatar('https://res.cloudinary.com/dh87opqta/image/upload/v1765819550/565783976_1451181063675252_3998556668514412011_n_kjtpjr.jpg'),
    favoriteProducts: [
      { name: 'Akcesoria drewniane', url: '/sklep?category=drewno' },
      { name: 'Zioła i aromaty', url: '/sklep?category=aromaty' },
    ],
  },
];

// Stats Data
const STATS = [
  { value: 150, suffix: '+', label: 'Przeszkolonych uczestników' },
  { value: 50, suffix: '+', label: 'Przeprowadzonych sesji' },
  { value: 10, suffix: '+', label: 'Lat doświadczenia' },

];

// Certification placeholder data
const CERTIFICATIONS = [
  { name: 'Finnish Sauna Society', color: 'nordic' },
  { name: 'Polska Izba Wellness', color: 'forest' },
  { name: 'European Sauna Alliance', color: 'gold' },
];

export default function ONasPage() {
  return (
    <div className="min-h-screen">
      {/* Section 1: Hero - The Manifesto */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#2C2622]">

        {/* 1. BLURRED BACKGROUND VIDEO (fills entire screen) */}
        <video
          muted={true}
          autoPlay={true}
          loop={true}
          playsInline={true}
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-2xl opacity-60 z-0"
          poster="https://res.cloudinary.com/dh87opqta/image/upload/v1765820951/8285942-uhd_2160_4096_25fps_g9boyk.jpg"
        >
          <source
            src="https://res.cloudinary.com/dh87opqta/video/upload/v1765820951/8285942-uhd_2160_4096_25fps_g9boyk.mp4"
            type="video/mp4"
          />
        </video>

        {/* 2. SHARP CENTER VIDEO (portrait, shows full context) */}
        <video
          muted={true}
          autoPlay={true}
          loop={true}
          playsInline={true}
          className="absolute inset-0 w-full h-full object-contain z-[1] shadow-[0_0_80px_rgba(0,0,0,0.7)]"
          poster="https://res.cloudinary.com/dh87opqta/image/upload/v1765820951/8285942-uhd_2160_4096_25fps_g9boyk.jpg"
        >
          <source
            src="https://res.cloudinary.com/dh87opqta/video/upload/v1765820951/8285942-uhd_2160_4096_25fps_g9boyk.mp4"
            type="video/mp4"
          />
        </video>

        {/* 3. OVERLAY  */}
        <div className="absolute inset-0 bg-[#2C2622]/30 mix-blend-multiply z-[2]" />
        <div className="absolute inset-0 bg-black/20 z-[2]" />


        {/* 3. CONTENT  */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn delay={0.3} direction="up" duration={0.8}>
            <p className="text-sm md:text-base text-[#C47F52] uppercase tracking-[0.3em] mb-8 font-sans">
              Autentyczna kultura saunowa. Tradycja przekazywana z pasją.
            </p>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#F0ECE2] mb-16 md:mb-24 lg:mb-32 leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              Gdzie rytuał staje się sztuką
            </h1>
          </FadeIn>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 md:bottom-12 lg:bottom-16 left-1/2 -translate-x-1/2 animate-bounce z-20">
            <ChevronDown className="w-7 h-7 md:w-8 md:h-8 text-[#F0ECE2] drop-shadow-md" />
          </div>
        </div>
      </section>

      {/* Section 2: Nasza Podróż - The Story */}
      <section className="py-24 bg-[#F0ECE2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            {/* Image Side - 40% */}
            <div className="lg:col-span-2">
              <FadeIn direction="right" delay={0.2}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-lg">
                  <Image
                    src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=1000&fit=crop"
                    alt="Fińska sauna - atmosfera"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover sepia-[0.15]"
                  />
                </div>
              </FadeIn>
            </div>

            {/* Text Side - 60% */}
            <div className="lg:col-span-3">
              <FadeIn direction="left">
                <div className="space-y-8">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2622] leading-tight">
                    Jak pasja zmieniła się w misję
                  </h2>

                  <div className="space-y-6 text-lg text-stone-700 leading-[1.8]">
                    <p>
                      <span className="float-left text-6xl font-serif pr-3 leading-[0.85] text-[#C47F52]">W</span>
                      szystko zaczęło się podczas podróży do Finlandii, gdzie odkryliśmy, że sauna
                      to nie tylko miejsce - to cała filozofia życia. Wróciliśmy z głębokim
                      przekonaniem, że Polska zasługuje na autentyczną kulturę saunową.
                    </p>
                    <p>
                      Założyliśmy Instytut Saunowy nie jako biznes, ale jako misję edukacyjną.
                      Chcieliśmy pokazać, że prawdziwy rytuał saunowy to sztuka wymagająca wiedzy,
                      doświadczenia i szacunku dla tradycji.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Poznaj Mentorów - The Founders */}
      <section className="py-24 bg-[#F0ECE2]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2622]">
                Poznaj Mentorów
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer staggerDelay={0.2} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {FOUNDERS.map((founder, index) => (
              <StaggerItem key={index}>
                <FounderCard {...founder} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Section 4: Żywa Społeczność - Gallery */}
      <section className="py-24 bg-[#F0ECE2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2C2622]">
                Żywa Społeczność
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer
            staggerDelay={0.1}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-4 mb-12"
          >
            {COMMUNITY_PHOTOS.map((photo, index) => (
              <StaggerItem key={index} className="h-full">
                <ScaleIn delay={index * 0.1} className="h-full">
                  <CommunityPhotoCard {...photo} />
                </ScaleIn>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <p className="text-center text-xl font-serif text-stone-600 italic max-w-2xl mx-auto">
              Tworzymy historię z każdym machnięciem ręcznika.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Section 5: Trust & Stats - Minimalist */}
      <section className="py-16 bg-[#2C2622]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-16">
              {STATS.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-serif font-bold text-[#C47F52] mb-3 tabular-nums">
                    <AnimatedNumber value={stat.value} />
                    {stat.suffix}
                  </div>
                  <div className="text-sm md:text-base text-white uppercase tracking-wider font-sans">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications - Monochrome */}
            <div className="flex flex-wrap items-center justify-center gap-12 pt-8 border-t border-white/10">
              {CERTIFICATIONS.map((cert, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center group"
                >
                  <div className="w-12 h-12 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Award className="w-10 h-10 text-white/50 group-hover:text-white/70 transition-colors" />
                  </div>
                  <div className="text-xs font-medium text-white/60 text-center max-w-[140px] uppercase tracking-wide">
                    {cert.name}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 6: Instytut w Obiektywie - Instagram */}
      <section className="py-24 bg-[#F0ECE2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2}>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-serif font-bold text-[#2C2622] mb-2">
                  Śledź nasze codzienne rytuały
                </h2>
                <p className="text-lg text-stone-600">
                  Zajrzyj za kulisy Instytutu Saunowego
                </p>
              </div>
              <a
                href="https://www.instagram.com/instytut_saunowy/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 text-[#C47F52] hover:text-[#2C2622] font-semibold transition-colors"
              >
                Zobacz więcej →
              </a>
            </div>

            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
              <div className="flex gap-4 snap-x snap-mandatory pb-4">
                {INSTAGRAM_FEED.map((post, index) => (
                  <InstagramPhoto key={index} {...post} />
                ))}
              </div>
            </div>

            <div className="text-center mt-8 md:hidden">
              <a
                href="https://www.instagram.com/instytut_saunowy/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#C47F52] hover:text-[#2C2622] font-semibold transition-colors"
              >
                Zobacz więcej na Instagramie →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 7: CTA - Zaproszenie */}
      <section className="py-20 bg-[#2C2622] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="up" delay={0.4}>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-[#F0ECE2]">
              Stań się częścią ceremonii
            </h2>
            <p className="text-xl text-[#F0ECE2]/80 mb-10 max-w-2xl mx-auto">
              Nie sprzedajemy szkoleń. Zapraszamy do tradycji.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/szkolenia"
                className="px-8 py-4 bg-[#C47F52] hover:bg-[#B36F42] text-white font-bold rounded-sm transition-all shadow-lg hover:shadow-xl hover:scale-105 text-lg"
              >
                Poznaj nasze szkolenia
              </Link>
              <Link
                href="/kontakt"
                className="px-8 py-4 bg-transparent hover:bg-white/10 border-2 border-[#F0ECE2]/30 hover:border-[#F0ECE2]/50 text-[#F0ECE2] font-bold rounded-sm transition-all text-lg"
              >
                Porozmawiajmy
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
