import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dbConnect from '@/lib/mongodb';
import Training from '@/lib/models/Training';
import BlogPost from '@/lib/models/BlogPost';
import { ITraining, IBlogPost } from '@/types';
import FadeIn from '@/components/animations/FadeIn';
import ScaleIn from '@/components/animations/ScaleIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import AnimatedNumber from '@/components/animations/AnimatedNumber';
import HoverCard from '@/components/animations/HoverCard';
import ExperienceBlock from '@/components/home/StatsBar';
import PillarCard from '@/components/home/PillarCard';
import FeaturedTrainingCard from '@/components/home/FeaturedTrainingCard';
import BlogCard from '@/components/blog/BlogCard';
import { ArrowRight, Camera } from 'lucide-react';

// Fetch upcoming featured training
async function getFeaturedTraining(): Promise<ITraining | null> {
  try {
    await dbConnect();
    const training = await Training.findOne({
      status: 'published',
      date: { $gte: new Date() },
    })
      .sort({ date: 1 })
      .lean();

    return training ? JSON.parse(JSON.stringify(training)) : null;
  } catch (error) {
    console.error('Error fetching featured training:', error);
    return null;
  }
}

// Fetch recent blog posts
async function getRecentBlogPosts(): Promise<IBlogPost[]> {
  try {
    await dbConnect();
    const posts = await BlogPost.find({ isPublished: true })
      .sort({ publishedAt: -1 })
      .limit(3)
      .select('-content')
      .lean();

    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function Home() {
  const featuredTraining = await getFeaturedTraining();
  const recentBlogPosts = await getRecentBlogPosts();

  return (
    <div className="min-h-screen">
      {/* ========================================
          SECTION 1: VIDEO HERO with 3 CTAs
      ======================================== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-forest-900">
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

        {/* 3. OVERLAY */}
        <div className="absolute inset-0 bg-forest-900/30 mix-blend-multiply z-[2]" />
        <div className="absolute inset-0 bg-black/20 z-[2]" />

        {/* 4. CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              Odkryj Moc<br />Skandynawskiej Sauny
            </h1>
            <p className="text-xl md:text-2xl text-cream-100 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] mb-10">
              Premium produkty, profesjonalne szkolenia i społeczność pasjonatów wellness
            </p>

            {/* 2 CTAs - Focus on Primary Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sklep"
                className="btn-gold px-10 py-4 text-lg shadow-gold-lg group"
              >
                Odkryj Kolekcję
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/szkolenia"
                className="btn-outline-gold px-10 py-4 text-lg bg-white/10 backdrop-blur-sm hover:bg-gold-400 group"
              >
                Akademia Saunamistrzów
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ========================================
          SECTION 2: THREE PILLARS - MAGAZINE LAYOUT
      ======================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="section-header">Trzy Filary Instytut Saunowy</h2>
              <p className="text-graphite-600 text-lg max-w-2xl mx-auto">
                Odkryj nasze obszary działalności - od produktów premium po edukację i społeczność
              </p>
            </div>
          </FadeIn>

          {/* Magazine Layout: 3 Equal Columns */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {/* SKLEP */}
            <StaggerItem>
              <ScaleIn delay={0.1}>
                <Link href="/sklep" className="group block">
                  {/* Clean Image - Portrait Format (4:5 ratio) */}
                  <div className="relative h-[28rem] rounded-lg overflow-hidden mb-6 bg-cream-100">
                    <Image
                      src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600"
                      alt="Sklep - Premium produkty saunowe"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Content on White Background */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-gold-600 tracking-wider uppercase">
                      01. SKLEP
                    </p>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-graphite-900 group-hover:text-gold-600 transition-colors">
                      Niezbędnik Saunamistrza
                    </h3>
                    <p className="text-graphite-600 leading-relaxed">
                      Odkryj kolekcję premium produktów - kilty, poncha i akcesoria najwyższej jakości.
                    </p>
                    <div className="inline-flex items-center gap-2 text-gold-600 font-semibold group-hover:gap-3 transition-all pt-2">
                      Odkryj więcej
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </ScaleIn>
            </StaggerItem>

            {/* EDUKACJA */}
            <StaggerItem>
              <ScaleIn delay={0.2}>
                <Link href="/szkolenia" className="group block">
                  {/* Clean Image - Portrait Format (4:5 ratio) */}
                  <div className="relative h-[28rem] rounded-lg overflow-hidden mb-6 bg-cream-100">
                    <Image
                      src="https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=600"
                      alt="Edukacja - Szkolenia dla Saunamistrzów"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Content on White Background */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-forest-600 tracking-wider uppercase">
                      02. EDUKACJA
                    </p>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-graphite-900 group-hover:text-forest-600 transition-colors">
                      Akademia Saunamistrzów
                    </h3>
                    <p className="text-graphite-600 leading-relaxed">
                      Profesjonalne szkolenia - od podstaw po poziom master. Certyfikowane kursy prowadzone przez ekspertów.
                    </p>
                    <div className="inline-flex items-center gap-2 text-forest-600 font-semibold group-hover:gap-3 transition-all pt-2">
                      Odkryj więcej
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </ScaleIn>
            </StaggerItem>

            {/* WIEDZA & COMMUNITY */}
            <StaggerItem>
              <ScaleIn delay={0.3}>
                <Link href="/akademia" className="group block">
                  {/* Clean Image - Portrait Format (4:5 ratio) */}
                  <div className="relative h-[28rem] rounded-lg overflow-hidden mb-6 bg-cream-100">
                    <Image
                      src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600"
                      alt="Wiedza - Blog i społeczność"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Content on White Background */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-warmwood-600 tracking-wider uppercase">
                      03. WIEDZA
                    </p>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-graphite-900 group-hover:text-warmwood-600 transition-colors">
                      Społeczność & Wiedza
                    </h3>
                    <p className="text-graphite-600 leading-relaxed">
                      Blog, poradniki, zawody MoA. Dołącz do społeczności pasjonatów saunowania.
                    </p>
                    <div className="inline-flex items-center gap-2 text-warmwood-600 font-semibold group-hover:gap-3 transition-all pt-2">
                      Odkryj więcej
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </ScaleIn>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ========================================
          SECTION 3: FEATURED TRAINING SPOTLIGHT
      ======================================== */}
      {featuredTraining && <FeaturedTrainingCard training={featuredTraining} />}

      {/* ========================================
          SECTION 4: EXPERIENCE BLOCK
      ======================================== */}
      <ExperienceBlock />

      {/* ========================================
          SECTION 5: PRODUCT CATEGORIES (Condensed)
      ======================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="section-header">Kategorie Produktów</h2>
              <p className="text-graphite-600 text-lg">Odkryj produkty stworzone z myślą o Twoim komforcie</p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kilty */}
            <StaggerItem>
              <ScaleIn delay={0.1}>
                <Link href="/sklep/kilty" className="group">
                  <HoverCard className="overflow-hidden h-full">
                    <div className="aspect-w-16 aspect-h-9 bg-cream-100 overflow-hidden relative h-64">
                      <Image
                        src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600"
                        alt="Kilty"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6 bg-white">
                      <h3 className="text-2xl font-serif font-semibold mb-3 text-graphite-900 group-hover:text-gold-600 transition-colors">
                        Kilty
                      </h3>
                      <p className="text-graphite-600 leading-relaxed mb-4">
                        Tradycyjne kilty do sauny w różnych wzorach i kolorach.
                        Dla kobiet i mężczyzn.
                      </p>
                      <span className="inline-flex items-center gap-2 text-gold-600 font-semibold group-hover:gap-3 transition-all">
                        Zobacz więcej
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </HoverCard>
                </Link>
              </ScaleIn>
            </StaggerItem>

            {/* Poncha */}
            <StaggerItem>
              <ScaleIn delay={0.2}>
                <Link href="/sklep/poncha" className="group">
                  <HoverCard className="overflow-hidden h-full">
                    <div className="aspect-w-16 aspect-h-9 bg-cream-100 overflow-hidden relative h-64">
                      <Image
                        src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600"
                        alt="Poncha"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6 bg-white">
                      <h3 className="text-2xl font-serif font-semibold mb-3 text-graphite-900 group-hover:text-gold-600 transition-colors">
                        Poncha
                      </h3>
                      <p className="text-graphite-600 leading-relaxed mb-4">
                        Wygodne poncha idealne po wyjściu z sauny.
                        Bambusowe i bawełniane.
                      </p>
                      <span className="inline-flex items-center gap-2 text-gold-600 font-semibold group-hover:gap-3 transition-all">
                        Zobacz więcej
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </HoverCard>
                </Link>
              </ScaleIn>
            </StaggerItem>

            {/* Accessories */}
            <StaggerItem>
              <ScaleIn delay={0.3}>
                <Link href="/sklep/akcesoria" className="group">
                  <HoverCard className="overflow-hidden h-full">
                    <div className="aspect-w-16 aspect-h-9 bg-cream-100 overflow-hidden relative h-64">
                      <Image
                        src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600"
                        alt="Akcesoria"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-6 bg-white">
                      <h3 className="text-2xl font-serif font-semibold mb-3 text-graphite-900 group-hover:text-gold-600 transition-colors">
                        Akcesoria
                      </h3>
                      <p className="text-graphite-600 leading-relaxed mb-4">
                        Ręczniki, olejki eteryczne i wszystko czego potrzebujesz do sauny.
                      </p>
                      <span className="inline-flex items-center gap-2 text-gold-600 font-semibold group-hover:gap-3 transition-all">
                        Zobacz więcej
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </HoverCard>
                </Link>
              </ScaleIn>
            </StaggerItem>
          </StaggerContainer>

          {/* CTA to full shop */}
          <FadeIn delay={0.4}>
            <div className="text-center mt-12">
              <Link
                href="/sklep"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold-600 text-white font-bold rounded-xl hover:bg-gold-700 transition-colors shadow-lg hover:shadow-xl text-lg group"
              >
                Zobacz wszystkie produkty
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ========================================
          SECTION 6: BLOG + COMMUNITY HYBRID
      ======================================== */}
      <section className="py-20 bg-gradient-to-br from-cream-50 via-white to-cream-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Blog Part */}
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="section-header">Akademia Saunowania</h2>
              <p className="text-graphite-600 text-lg max-w-2xl mx-auto">
                Odkryj wiedzę, trendy i inspiracje ze świata sauny i wellness
              </p>
            </div>
          </FadeIn>

          {recentBlogPosts.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {recentBlogPosts.map((post, index) => (
                <StaggerItem key={post._id.toString()}>
                  <ScaleIn delay={index * 0.1}>
                    <BlogCard post={post} />
                  </ScaleIn>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-12">
              <p className="text-graphite-500 mb-6">Wkrótce pojawią się nowe artykuły...</p>
            </div>
          )}

          <FadeIn delay={0.3}>
            <div className="text-center mb-20">
              <Link
                href="/akademia"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-forest-600 text-forest-700 font-bold rounded-xl hover:bg-forest-600 hover:text-white transition-colors text-lg group"
              >
                Czytaj wszystkie artykuły
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>

          {/* Community Part - Masters of Aufguss */}
          <FadeIn delay={0.4}>
            <div className="bg-gradient-to-br from-gold-50 to-warmwood-50 rounded-3xl p-8 md:p-12 border-2 border-gold-200">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Community Image Placeholder */}
                <div className="relative h-80 rounded-2xl overflow-hidden shadow-xl">
                  <div className="w-full h-full bg-gradient-to-br from-gold-400 via-warmwood-500 to-forest-500 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-8xl mb-4">🏆</div>
                      <Camera className="w-16 h-16 text-white/30 mx-auto" />
                      <p className="mt-4 text-lg font-semibold">Zdjęcia z zawodów MoA</p>
                    </div>
                  </div>
                </div>

                {/* Community Content */}
                <div>
                  <div className="inline-block px-4 py-2 bg-gold-600 text-white font-bold rounded-full text-sm mb-4">
                    🏆 SPOŁECZNOŚĆ
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-graphite-900 mb-4">
                    Masters of Aufguss
                  </h3>
                  <p className="text-graphite-600 text-lg leading-relaxed mb-6">
                    Dołącz do najbardziej prestiżowych zawodów Saunamistrzów w Polsce.
                    Pokaż swoje umiejętności, poznaj innych pasjonatów i rywalizuj o tytuł
                    najlepszego Saunamistrza.
                  </p>

                  {/* MoA Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-white rounded-xl border border-gold-200">
                      <div className="text-2xl font-bold text-gold-600 mb-1">3</div>
                      <div className="text-xs text-graphite-600">Edycje</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-gold-200">
                      <div className="text-2xl font-bold text-gold-600 mb-1">24+</div>
                      <div className="text-xs text-graphite-600">Zawodników</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-xl border border-gold-200">
                      <div className="text-2xl font-bold text-gold-600 mb-1">155</div>
                      <div className="text-xs text-graphite-600">Max punktów</div>
                    </div>
                  </div>

                  <Link
                    href="/zawody-moa"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gold-600 text-white font-bold rounded-xl hover:bg-gold-700 transition-colors shadow-lg group"
                  >
                    Poznaj zawody MoA
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ========================================
          SECTION 7: NEWSLETTER CTA (Enhanced)
      ======================================== */}
      <section className="py-20 bg-gradient-to-br from-forest-700 to-forest-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScaleIn>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Dołącz do świata saunowania
            </h2>
            <p className="text-xl text-cream-200 mb-4 leading-relaxed">
              Zapisz się do newslettera i bądź na bieżąco z:
            </p>
            <ul className="text-lg text-cream-200 mb-10 max-w-xl mx-auto space-y-2">
              <li>✓ Nowymi produktami i promocjami</li>
              <li>✓ Nadchodzącymi szkoleniami</li>
              <li>✓ Artykułami i poradnikami</li>
              <li>✓ Zawodami Masters of Aufguss</li>
            </ul>
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Twój email"
                  className="flex-1 px-5 py-4 rounded-2xl border-2 border-gold-400/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-cream-300 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-all"
                />
                <button
                  type="submit"
                  className="btn-gold px-8 py-4 whitespace-nowrap shadow-gold-lg"
                >
                  Zapisz się
                </button>
              </div>
            </form>
            <p className="mt-6 text-sm text-cream-300">
              Twoje dane są bezpieczne. Możesz wypisać się w każdej chwili.
            </p>
          </ScaleIn>
        </div>
      </section>
    </div>
  );
}
