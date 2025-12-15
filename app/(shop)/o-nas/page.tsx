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
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=600&fit=crop',
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
  { value: 15, suffix: '+', label: 'Lat doświadczenia' },
  { value: 98, suffix: '%', label: 'Zadowolonych klientów' },
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
      {/* Section 1: Hero - Atmosfera */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-forest-800 via-forest-600 to-nordic-700 animate-gradient-shift">
        {/* SVG Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] animate-pulse" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn delay={0.3} direction="up" duration={0.8}>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              Gdzie rytuał staje się sztuką
            </h1>
            <p className="text-xl md:text-2xl text-cream-100 max-w-3xl mx-auto leading-relaxed">
              Autentyczna fińska kultura saunowa. Tradycja przekazywana z pasją.
            </p>
          </FadeIn>

          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-cream-200" />
          </div>
        </div>
      </section>

      {/* Section 2: Nasza Historia - Emocje */}
      <section className="py-24 bg-gradient-to-b from-white via-cream-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Text Side - 60% */}
            <div className="lg:col-span-3">
              <FadeIn direction="right">
                <div className="space-y-6">
                  <p className="text-gold-600 uppercase tracking-wider text-sm font-semibold">
                    Nasza Podróż
                  </p>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-graphite-900 leading-tight">
                    Jak pasja do fińskiej sauny zamieniła się w misję
                  </h2>

                  <div className="space-y-4 text-lg text-graphite-700 leading-relaxed">
                    <p>
                      Wszystko zaczęło się podczas podróży do Finlandii, gdzie odkryliśmy, że sauna
                      to nie tylko miejsce - to cała filozofia życia. Wróciliśmy z głębokim
                      przekonaniem, że Polska zasługuje na autentyczną kulturę saunową.
                    </p>
                    <p>
                      Założyliśmy Instytut Saunowy nie jako biznes, ale jako misję edukacyjną.
                      Chcieliśmy pokazać, że prawdziwy rytuał saunowy to sztuka wymagająca wiedzy,
                      doświadczenia i szacunku dla tradycji.
                    </p>
                    <p>
                      Dziś jesteśmy dumni, że nasza społeczność liczy setki osób, które odkryły moc
                      autentycznej sauny. Każde szkolenie, każda ceremonia to kolejny krok w
                      budowaniu polskiej kultury saunowej.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Image Side - 40% */}
            <div className="lg:col-span-2">
              <FadeIn direction="left" delay={0.2}>
                <div className="relative h-[500px] -ml-8 lg:-ml-12">
                  <div className="relative h-full rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=1000&fit=crop"
                      alt="Fińska sauna - atmosfera"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Poznaj Nas - Founders */}
      <section className="py-24 bg-cream-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-graphite-900 mb-4">
                Poznaj Nas
              </h2>
              <p className="text-xl text-graphite-600">
                Nie jesteśmy pracownikami korporacji. Jesteśmy mentorami i pasjonatami.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer staggerDelay={0.2} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {FOUNDERS.map((founder, index) => (
              <StaggerItem key={index} className={index === 1 ? 'lg:mt-12' : ''}>
                <FounderCard {...founder} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Section 4: W Sercu Społeczności - Bento Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-graphite-900 mb-4">
                Żywa Społeczność
              </h2>
              <p className="text-xl text-graphite-600">
                Autentyczne chwile z naszych wydarzeń i szkoleń
              </p>
            </div>
          </FadeIn>

          <StaggerContainer
            staggerDelay={0.1}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[250px] gap-4"
          >
            {COMMUNITY_PHOTOS.map((photo, index) => (
              <StaggerItem key={index}>
                <ScaleIn delay={index * 0.1}>
                  <CommunityPhotoCard {...photo} />
                </ScaleIn>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Section 5: Liczby i Zaufanie - Stats Strip */}
      <section className="py-12 bg-gradient-to-r from-gold-50 via-cream-50 to-gold-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {STATS.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-serif font-bold text-gold-800 mb-2 tabular-nums">
                    <AnimatedNumber value={stat.value} />
                    {stat.suffix}
                  </div>
                  <div className="text-sm md:text-base text-graphite-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap items-center justify-center gap-8">
              {CERTIFICATIONS.map((cert, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-cream-50 hover:bg-cream-100 transition-colors group"
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-${cert.color}-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}
                  >
                    <Award className={`w-8 h-8 text-${cert.color}-700`} />
                  </div>
                  <div className="text-xs font-semibold text-graphite-700 text-center max-w-[120px]">
                    {cert.name}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 6: Instytut w Obiektywie - Instagram */}
      <section className="py-24 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2}>
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-serif font-bold text-graphite-900 mb-2">
                  Śledź nasze codzienne rytuały
                </h2>
                <p className="text-lg text-graphite-600">
                  Zajrzyj za kulisy Instytutu Saunowego
                </p>
              </div>
              <a
                href="https://www.instagram.com/instytut_saunowy/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 text-nordic-600 hover:text-nordic-800 font-semibold transition-colors"
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
                className="inline-flex items-center gap-2 text-nordic-600 hover:text-nordic-800 font-semibold transition-colors"
              >
                Zobacz więcej na Instagramie →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Section 7: CTA - Zaproszenie */}
      <section className="py-20 bg-gradient-to-br from-forest-600 via-nordic-600 to-forest-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="up" delay={0.4}>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Stań się częścią ceremonii
            </h2>
            <p className="text-xl text-cream-100 mb-10 max-w-2xl mx-auto">
              Nie sprzedajemy szkoleń. Zapraszamy do tradycji.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/szkolenia"
                className="px-8 py-4 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 text-lg"
              >
                Poznaj nasze szkolenia
              </Link>
              <Link
                href="/kontakt"
                className="px-8 py-4 bg-white/10 backdrop-blur hover:bg-white/20 border-2 border-white/30 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 text-lg"
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
