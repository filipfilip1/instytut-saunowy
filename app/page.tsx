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
import HoverCard from '@/components/animations/HoverCard';
import ExperienceBlock from '@/components/home/StatsBar';
import FeaturedTrainingCard from '@/components/home/FeaturedTrainingCard';
import BlogCard from '@/components/blog/BlogCard';
import { ArrowRight } from 'lucide-react';

// Revalidate every hour (ISR - Incremental Static Regeneration)
export const revalidate = 3600;

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
                className="bg-copper hover:bg-copper-800 text-white px-10 py-4 text-lg rounded-2xl shadow-lg transition-all font-medium group"
              >
                Odkryj Kolekcję
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/szkolenia"
                className="border-2 border-oat text-oat px-10 py-4 text-lg rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-copper hover:border-copper transition-all font-medium group"
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
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto md:px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-8 md:mb-16 px-4 md:px-0">
              <h2 className="section-header text-wood">Trzy Filary Instytut Saunowy</h2>
              <p className="text-wood/70 text-lg max-w-2xl mx-auto">
                Odkryj nasze obszary działalności - od produktów premium po edukację i społeczność
              </p>
            </div>
          </FadeIn>

          {/* Magazine Layout: Mobile horizontal scroll, Desktop 3 cols */}
          <StaggerContainer className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 px-4 scrollbar-hide md:px-0 md:grid md:grid-cols-3 md:gap-10 md:overflow-visible">
            {/* SKLEP */}
            <StaggerItem className="flex-shrink-0 w-[85vw] snap-center md:w-auto md:snap-align-none">
              <ScaleIn delay={0.1}>
                <Link href="/sklep" className="group block">
                  {/* Clean Image - Landscape on mobile (4:3), Portrait on desktop (3:4) */}
                  <div className="relative aspect-[4/3] md:aspect-[3/4] rounded-lg overflow-hidden mb-6">
                    <Image
                      src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600"
                      alt="Sklep - Premium produkty saunowe"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Content directly on oat background */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-copper tracking-wider uppercase">
                      01. SKLEP
                    </p>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-wood group-hover:text-copper transition-colors">
                      Niezbędnik Saunamistrza
                    </h3>
                    <p className="text-wood/70 leading-relaxed font-light">
                      Odkryj kolekcję premium produktów - kilty, poncha i akcesoria najwyższej jakości.
                    </p>
                    <div className="inline-flex items-center gap-2 text-copper font-semibold group-hover:gap-3 transition-all pt-2">
                      Odkryj więcej
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </ScaleIn>
            </StaggerItem>

            {/* EDUKACJA */}
            <StaggerItem className="flex-shrink-0 w-[85vw] snap-center md:w-auto md:snap-align-none">
              <ScaleIn delay={0.2}>
                <Link href="/szkolenia" className="group block">
                  {/* Clean Image - Landscape on mobile (4:3), Portrait on desktop (3:4) */}
                  <div className="relative aspect-[4/3] md:aspect-[3/4] rounded-lg overflow-hidden mb-6">
                    <Image
                      src="https://images.unsplash.com/photo-1524863479829-916d8e77f114?w=600"
                      alt="Edukacja - Szkolenia dla Saunamistrzów"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Content directly on oat background */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-copper tracking-wider uppercase">
                      02. EDUKACJA
                    </p>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-wood group-hover:text-copper transition-colors">
                      Akademia Saunamistrzów
                    </h3>
                    <p className="text-wood/70 leading-relaxed font-light">
                      Profesjonalne szkolenia - od podstaw po poziom master. Certyfikowane kursy prowadzone przez ekspertów.
                    </p>
                    <div className="inline-flex items-center gap-2 text-copper font-semibold group-hover:gap-3 transition-all pt-2">
                      Odkryj więcej
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </ScaleIn>
            </StaggerItem>

            {/* WIEDZA & COMMUNITY */}
            <StaggerItem className="flex-shrink-0 w-[85vw] snap-center md:w-auto md:snap-align-none">
              <ScaleIn delay={0.3}>
                <Link href="/akademia" className="group block">
                  {/* Clean Image - Landscape on mobile (4:3), Portrait on desktop (3:4) */}
                  <div className="relative aspect-[4/3] md:aspect-[3/4] rounded-lg overflow-hidden mb-6">
                    <Image
                      src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600"
                      alt="Wiedza - Blog i społeczność"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Content directly on oat background */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-copper tracking-wider uppercase">
                      03. WIEDZA
                    </p>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-wood group-hover:text-copper transition-colors">
                      Społeczność & Wiedza
                    </h3>
                    <p className="text-wood/70 leading-relaxed font-light">
                      Blog, poradniki, zawody MoA. Dołącz do społeczności pasjonatów saunowania.
                    </p>
                    <div className="inline-flex items-center gap-2 text-copper font-semibold group-hover:gap-3 transition-all pt-2">
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
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto md:px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-8 md:mb-16 px-4 md:px-0">
              <h2 className="section-header text-wood">Kategorie Produktów</h2>
              <p className="text-wood/70 text-lg">Odkryj produkty stworzone z myślą o Twoim komforcie</p>
            </div>
          </FadeIn>

          <StaggerContainer className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 px-4 scrollbar-hide md:px-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible">
            {/* Kilty */}
            <StaggerItem className="flex-shrink-0 min-w-[280px] snap-center md:min-w-0 md:snap-align-none">
              <ScaleIn delay={0.1}>
                <Link href="/sklep/kilty" className="group block">
                  <div className="relative aspect-video rounded-md overflow-hidden mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=600"
                      alt="Kilty"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="text-2xl font-serif font-semibold mb-2 text-wood group-hover:text-copper transition-colors">
                    Kilty
                  </h3>
                  <p className="text-wood/70 leading-relaxed mb-2 font-light">
                    Tradycyjne kilty do sauny w różnych wzorach i kolorach.
                  </p>
                  <span className="inline-flex items-center gap-2 text-copper font-medium group-hover:gap-3 transition-all">
                    Zobacz więcej
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </ScaleIn>
            </StaggerItem>

            {/* Poncha */}
            <StaggerItem className="flex-shrink-0 min-w-[280px] snap-center md:min-w-0 md:snap-align-none">
              <ScaleIn delay={0.2}>
                <Link href="/sklep/poncha" className="group block">
                  <div className="relative aspect-video rounded-md overflow-hidden mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600"
                      alt="Poncha"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="text-2xl font-serif font-semibold mb-2 text-wood group-hover:text-copper transition-colors">
                    Poncha
                  </h3>
                  <p className="text-wood/70 leading-relaxed mb-2 font-light">
                    Wygodne poncha idealne po wyjściu z sauny.
                  </p>
                  <span className="inline-flex items-center gap-2 text-copper font-medium group-hover:gap-3 transition-all">
                    Zobacz więcej
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </ScaleIn>
            </StaggerItem>

            {/* Accessories */}
            <StaggerItem className="flex-shrink-0 min-w-[280px] snap-center md:min-w-0 md:snap-align-none">
              <ScaleIn delay={0.3}>
                <Link href="/sklep/akcesoria" className="group block">
                  <div className="relative aspect-video rounded-md overflow-hidden mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600"
                      alt="Akcesoria"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <h3 className="text-2xl font-serif font-semibold mb-2 text-wood group-hover:text-copper transition-colors">
                    Akcesoria
                  </h3>
                  <p className="text-wood/70 leading-relaxed mb-2 font-light">
                    Ręczniki, olejki eteryczne i wszystko czego potrzebujesz do sauny.
                  </p>
                  <span className="inline-flex items-center gap-2 text-copper font-medium group-hover:gap-3 transition-all">
                    Zobacz więcej
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </ScaleIn>
            </StaggerItem>
          </StaggerContainer>

          {/* CTA to full shop */}
          <FadeIn delay={0.4}>
            <div className="text-center mt-12">
              <Link
                href="/sklep"
                className="inline-flex items-center gap-2 px-8 py-4 bg-copper text-white font-bold rounded-2xl hover:bg-copper-800 transition-colors shadow-lg hover:shadow-xl text-lg group"
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
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto md:px-4 sm:px-6 lg:px-8">
          {/* Blog Part */}
          <FadeIn>
            <div className="text-center mb-8 md:mb-16 px-4 md:px-0">
              <h2 className="section-header text-wood">Akademia Saunowania</h2>
              <p className="text-wood/70 text-lg max-w-2xl mx-auto">
                Odkryj wiedzę, trendy i inspiracje ze świata sauny i wellness
              </p>
            </div>
          </FadeIn>

          {recentBlogPosts.length > 0 ? (
            <StaggerContainer className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 px-4 mb-8 md:mb-16 scrollbar-hide md:px-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible">
              {recentBlogPosts.map((post, index) => (
                <StaggerItem key={post._id.toString()} className="flex-shrink-0 w-[85vw] snap-center md:w-auto md:snap-align-none">
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
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-copper text-copper font-bold rounded-2xl hover:bg-copper hover:text-white transition-colors text-lg group"
              >
                Czytaj wszystkie artykuły
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ========================================
          SECTION 6.5: MASTERS OF AUFGUSS - Premium Dark Bento Card
      ======================================== */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.4}>
            {/* Bento Card with Photo Background */}
            <div className="relative rounded-3xl overflow-hidden h-auto md:h-[600px]">
              {/* Background Image */}
              <div className="relative h-48 md:h-auto md:absolute md:inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1200"
                  alt="Masters of Aufguss - Zawody Saunamistrzów"
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>

              {/* Sage Overlay for readability */}
              <div className="absolute inset-0 bg-sage/90 mix-blend-multiply" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 md:p-12 lg:p-16">
                <div className="max-w-3xl">
                  {/* Badge */}
                  <div className="inline-block px-3 py-1 bg-transparent border border-oat/40 rounded-sm mb-6">
                    <span className="uppercase tracking-widest text-[10px] font-bold text-oat">Społeczność</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 md:mb-6">
                    Masters of Aufguss
                  </h3>

                  {/* Description */}
                  <p className="text-oat/90 text-base md:text-lg lg:text-xl leading-relaxed mb-6 md:mb-8 font-light">
                    Dołącz do najbardziej prestiżowych zawodów Saunamistrzów w Polsce.
                    Pokaż swoje umiejętności, poznaj innych pasjonatów i rywalizuj o tytuł
                    najlepszego Saunamistrza.
                  </p>

                  {/* Stats - Simple text with dividers - 2 cols on mobile */}
                  <div className="grid grid-cols-2 gap-4 mb-6 md:flex md:items-center md:gap-6 md:mb-8 text-oat/90">
                    <div>
                      <span className="text-2xl md:text-3xl font-serif font-bold text-copper">3</span>
                      <span className="ml-2 text-xs md:text-sm uppercase tracking-wider">Edycje</span>
                    </div>
                    <div className="hidden md:block w-px h-8 bg-oat/30" />
                    <div>
                      <span className="text-2xl md:text-3xl font-serif font-bold text-copper">24+</span>
                      <span className="ml-2 text-xs md:text-sm uppercase tracking-wider">Zawodników</span>
                    </div>
                    <div className="hidden md:block w-px h-8 bg-oat/30" />
                    <div className="col-span-2 md:col-span-1">
                      <span className="text-2xl md:text-3xl font-serif font-bold text-copper">155</span>
                      <span className="ml-2 text-xs md:text-sm uppercase tracking-wider">Max punktów</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href="/zawody-moa"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-copper text-white font-bold rounded-2xl hover:bg-copper-800 transition-colors shadow-lg group"
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
          SECTION 7: PRE-FOOTER CTA (Homepage Only)
      ======================================== */}
      <section className="py-12 md:py-20 bg-wood">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-oat mb-6">
              Twój rytuał zaczyna się tutaj
            </h2>
            <p className="text-lg md:text-xl text-oat/80 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Najlepsze produkty i mistrzowska wiedza w jednym miejscu. Sprawdź, jak możemy odmienić Twoje saunowanie.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Primary CTA - Copper */}
              <Link
                href="/sklep"
                className="px-8 py-4 bg-copper text-white font-semibold text-lg rounded-2xl hover:bg-copper-800 transition-all shadow-lg hover:shadow-xl inline-flex items-center justify-center gap-2 group"
              >
                Odkryj Produkty
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Secondary CTA - Outline */}
              <Link
                href="/kontakt"
                className="px-8 py-4 bg-transparent border-2 border-copper text-copper font-semibold text-lg rounded-2xl hover:bg-copper hover:text-white transition-all inline-flex items-center justify-center gap-2 group"
              >
                Zapytaj Eksperta
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
