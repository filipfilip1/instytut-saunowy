import React from 'react';
import Image from 'next/image';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import { IBlogPost } from '@/types';
import FadeIn from '@/components/animations/FadeIn';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import BlogCard from '@/components/blog/BlogCard';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { CATEGORY_LABELS } from '@/lib/constants/blog';

// Revalidate every hour (ISR)
export const revalidate = 3600;

export const metadata = {
  title: 'Akademia Saunowania - Instytut Saunowy',
  description: 'Wiedza. Rytuał. Wspólnota. Poznaj świat saunowania - poradniki, trendy, DIY, szkolenia i przepisy Aufguss.',
};

async function getBlogPosts(): Promise<IBlogPost[]> {
  try {
    await dbConnect();

    const posts = await BlogPost.find({ isPublished: true })
      .sort({ publishedAt: -1 })
      .limit(12)
      .select('-content')
      .lean();

    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

async function getFeaturedPost(): Promise<IBlogPost | null> {
  try {
    await dbConnect();

    const post = await BlogPost.findOne({ isPublished: true })
      .sort({ viewCount: -1 })
      .lean();

    return post ? JSON.parse(JSON.stringify(post)) : null;
  } catch (error) {
    console.error('Error fetching featured post:', error);
    return null;
  }
}

export default async function AkademiaPage() {
  const posts = await getBlogPosts();
  const featuredPost = await getFeaturedPost();
  const categories = Object.entries(CATEGORY_LABELS);

  return (
    // MAIN WRAPPER - "Safety Straitjacket" to prevent ANY horizontal overflow
    <div className="w-full max-w-[100vw] min-h-screen bg-[#F0ECE2] overflow-x-hidden relative">
      {/* 1. Editorial Masthead Header */}
      <header className="w-full relative bg-[#2C2622] text-[#F0ECE2] overflow-hidden">
        {/* Noise texture overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] opacity-40"></div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24 lg:py-32">
          <FadeIn className="text-center">
            {/* Main Title */}
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight tracking-tight">
              Akademia<br />Saunowania
            </h1>

            {/* Subtitle */}
            <div className="text-[#C47F52] uppercase tracking-widest text-xs md:text-sm lg:text-base font-sans mb-6 md:mb-8">
              Wiedza. Rytuał. Wspólnota.
            </div>

            {/* Description */}
            <p className="text-[#F0ECE2]/80 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-light px-2">
              Odkryj wiedzę, trendy i inspiracje ze świata sauny i wellness.
              Od podstawowych poradników po zaawansowane techniki Aufguss.
            </p>
          </FadeIn>
        </div>
      </header>

      {/* 2. Sticky Category Navigation - THE USUAL SUSPECT */}
      <div className="sticky top-0 z-40 w-full max-w-[100vw] bg-[#F0ECE2] border-b border-[#2C2622]/10 overflow-hidden">
        <nav className="w-full flex items-center md:justify-center gap-6 md:gap-8 py-4 md:py-6 px-4 sm:px-6 lg:px-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <button className="font-serif text-[#2C2622] text-sm md:text-base whitespace-nowrap relative pb-1 flex-shrink-0">
            Wszystkie
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#2C2622]"></span>
          </button>
          {categories.map(([key, label]) => (
            <button
              key={key}
              className="text-stone-500 text-sm md:text-base whitespace-nowrap hover:text-[#2C2622] transition-colors flex-shrink-0"
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="w-full max-w-[100vw]">
        {/* 3. Featured Article - The Cover Story */}
        {featuredPost && (
          <section className="w-full py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-7xl mx-auto">
              <FadeIn>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-12 items-center">
                  {/* Image - 60% width on desktop */}
                  <div className="lg:col-span-3 relative w-full aspect-[4/3] lg:aspect-[16/10] rounded-sm overflow-hidden">
                    {featuredPost.featuredImage?.url ? (
                      <Image
                        src={featuredPost.featuredImage.url}
                        alt={featuredPost.title}
                        fill
                        className="object-cover max-w-full"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-[#2C2622]/10 flex items-center justify-center">
                        <div className="w-16 md:w-24 h-16 md:h-24 text-[#2C2622]/20">
                          <svg fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content - 40% width on desktop */}
                  <div className="lg:col-span-2 space-y-4 md:space-y-6 min-w-0">
                    {/* Tag */}
                    <div className="text-[#C47F52] uppercase tracking-widest text-xs font-sans">
                      Temat Miesiąca
                    </div>

                    {/* Title */}
                    <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-bold text-[#2C2622] leading-tight break-words">
                      {featuredPost.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-stone-600 text-base md:text-lg leading-relaxed font-light">
                      {featuredPost.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-stone-500">
                      <Clock className="w-3.5 md:w-4 h-3.5 md:h-4 flex-shrink-0" strokeWidth={1.5} />
                      <span>{featuredPost.readTime} min czytania</span>
                      <span>•</span>
                      <span>{CATEGORY_LABELS[featuredPost.category]}</span>
                    </div>

                    {/* Read more link */}
                    <Link
                      href={`/akademia/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 text-[#2C2622] hover:text-[#C47F52] transition-colors group text-sm md:text-base"
                    >
                      <span className="font-medium">Czytaj dalej</span>
                      <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" strokeWidth={1.5} />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        )}

        {/* 4. Article Grid - The Magazine Layout */}
        <section className="w-full py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-7xl mx-auto">
            {posts.length > 0 ? (
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16">
                {posts.map((post) => (
                  <StaggerItem key={post._id}>
                    <BlogCard post={post} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <div className="text-center py-12 md:py-24">
                <h3 className="font-serif text-xl md:text-2xl font-bold text-[#2C2622] mb-2">
                  Wkrótce pojawią się artykuły
                </h3>
                <p className="text-stone-600 font-light text-sm md:text-base">
                  Pracujemy nad wartościowymi treściami dla Ciebie.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* 5. Training CTA Section - The Dark Invitation */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-[#2C2622] relative overflow-hidden">
        {/* Noise texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] opacity-50"></div>

        <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            {/* Eyebrow */}
            <div className="text-[#C47F52] uppercase tracking-widest text-xs md:text-sm font-sans mb-4 md:mb-6">
              Rozwój Zawodowy
            </div>

            {/* Main Headline */}
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#F0ECE2] mb-4 md:mb-6 leading-tight">
              Dołącz do naszych szkoleń
            </h2>

            {/* Description */}
            <p className="text-stone-400 text-base md:text-lg lg:text-xl mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed font-light px-2">
              Chcesz nauczyć się Aufguss od profesjonalistów? Sprawdź naszą ofertę
              certyfikowanych kursów i dołącz do elity saunamistrzów.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-center gap-4 md:gap-6 px-2">
              {/* Primary Button */}
              <Link
                href="/szkolenia"
                className="w-full md:w-auto bg-[#C47F52] text-white px-6 md:px-8 py-3 rounded-md font-semibold hover:brightness-110 transition-all text-center"
              >
                Zapisz się na szkolenie
              </Link>

              {/* Secondary Button */}
              <Link
                href="/szkolenia"
                className="w-full md:w-auto border border-[#F0ECE2]/30 text-[#F0ECE2] px-6 md:px-8 py-3 rounded-md font-semibold hover:border-[#C47F52] hover:text-[#C47F52] transition-all text-center"
              >
                Zobacz program kursów
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
