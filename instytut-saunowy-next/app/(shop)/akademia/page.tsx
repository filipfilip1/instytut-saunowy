import React from 'react';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import { IBlogPost } from '@/types';
import FadeIn from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import BlogCard from '@/components/blog/BlogCard';
import Link from 'next/link';

export const metadata = {
  title: 'Akademia & Blog - Instytut Saunowy',
  description: 'Poznaj świat saunowania - poradniki, trendy, DIY, szkolenia i przepisy Aufguss. Edukacja i inspiracja dla miłośników wellness.',
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-wood-800 via-wood-700 to-wood-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnptMCA2MGMzLjMxIDAgNi0yLjY5IDYtNnMtMi42OS02LTYtNi02IDIuNjktNiA2IDIuNjkgNiA2IDZ6TTYgMTRjMy4zMSAwIDYtMi42OSA2LTZzLTIuNjktNi02LTYtNiAyLjY5LTYgNiAyLjY5IDYgNiA2em0wIDYwYzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <FadeIn className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Akademia<br />
              <span className="text-wood-200">Saunowania</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-wood-100 max-w-3xl mx-auto leading-relaxed">
              Odkryj wiedzę, trendy i inspiracje ze świata sauny i wellness.
              Od podstawowych poradników po zaawansowane techniki Aufguss.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mt-12 text-wood-100">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{posts.length}+</div>
                <div className="text-sm md:text-base">Artykułów</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">6</div>
                <div className="text-sm md:text-base">Kategorii</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">50+</div>
                <div className="text-sm md:text-base">Szkoleń</div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="rgb(249, 250, 251)"/>
          </svg>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="bg-gradient-to-r from-wood-600 to-wood-800 rounded-3xl overflow-hidden shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image */}
                  <div className="relative h-64 lg:h-auto bg-gray-900">
                    {featuredPost.featuredImage?.url ? (
                      <img
                        src={featuredPost.featuredImage.url}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover opacity-90"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-24 h-24 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-4 py-2 rounded-full">
                      ⭐ Najpopularniejsze
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-12 text-white flex flex-col justify-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {featuredPost.title}
                    </h2>
                    <p className="text-wood-100 mb-6 text-lg">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-wood-200 mb-6">
                      <span>{featuredPost.readTime} min czytania</span>
                      <span>•</span>
                      <span>{featuredPost.viewCount} wyświetleń</span>
                    </div>
                    <Link
                      href={`/akademia/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 bg-white text-wood-800 px-6 py-3 rounded-lg font-semibold hover:bg-wood-50 transition-colors w-fit"
                    >
                      Przeczytaj artykuł
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Poradniki</h3>
                <p className="text-gray-600">
                  Praktyczne porady dla początkujących i zaawansowanych
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
                <div className="text-5xl mb-4">🎓</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Szkolenia</h3>
                <p className="text-gray-600">
                  Profesjonalne kursy Aufguss i certyfikacje
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                <div className="text-5xl mb-4">🌿</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Przepisy</h3>
                <p className="text-gray-600">
                  Unikalne receptury i techniki ceremonii Aufguss
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Najnowsze Artykuły
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Odkryj naszą bazę wiedzy o saunowaniu, wellness i zdrowym stylu życia.
            </p>
          </FadeIn>

          {posts.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <StaggerItem key={post._id}>
                  <BlogCard post={post} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Wkrótce pojawią się artykuły
              </h3>
              <p className="text-gray-600">
                Pracujemy nad wartościowymi treściami dla Ciebie!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-wood-700 to-wood-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Dołącz do naszych szkoleń
            </h2>
            <p className="text-xl text-wood-100 mb-8 max-w-2xl mx-auto">
              Chcesz nauczyć się Aufguss od profesjonalistów? Sprawdź naszą ofertę
              szkoleń i certyfikacji.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="bg-white text-wood-800 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-wood-50 transition-colors shadow-lg hover:shadow-xl"
              >
                Zapytaj o szkolenia
              </Link>
              <Link
                href="/sklep"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-wood-800 transition-colors"
              >
                Zobacz produkty
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
