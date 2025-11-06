import React from 'react';
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import BlogPost from '@/lib/models/BlogPost';
import { IProduct, IBlogPost } from '@/types';
import HeroSection from '@/components/homepage/HeroSection';
import AboutMiniSection from '@/components/homepage/AboutMiniSection';
import ThreePillarsSection from '@/components/homepage/ThreePillarsSection';
import BestsellersSection from '@/components/homepage/BestsellersSection';
import LatestBlogPostsSection from '@/components/homepage/LatestBlogPostsSection';
import SocialProofSection from '@/components/homepage/SocialProofSection';
import HomeClient from './HomeClient';

async function getBestsellingProducts(): Promise<IProduct[]> {
  try {
    await dbConnect();

    // Get products sorted by view count (most popular)
    const products = await Product.find({ isActive: true })
      .sort({ viewCount: -1 })
      .limit(6)
      .select('_id slug name basePrice images category description viewCount')
      .lean();

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error('Error fetching bestselling products:', error);
    return [];
  }
}

async function getLatestBlogPosts(): Promise<IBlogPost[]> {
  try {
    await dbConnect();

    // Get latest 3 published blog posts
    const posts = await BlogPost.find({ isPublished: true })
      .sort({ publishedAt: -1 })
      .limit(3)
      .select('-content')
      .lean();

    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error('Error fetching latest blog posts:', error);
    return [];
  }
}

export default async function Home() {
  const bestsellingProducts = await getBestsellingProducts();
  const latestBlogPosts = await getLatestBlogPosts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* About Mini Section - Mateusz & Magdalena */}
      <AboutMiniSection />

      {/* Three Pillars - Szkolenia | Sklep | MoA */}
      <ThreePillarsSection />

      {/* Bestsellers */}
      {bestsellingProducts.length > 0 && (
        <BestsellersSection products={bestsellingProducts} />
      )}

      {/* Recently Viewed Products (from HomeClient) */}
      <HomeClient />

      {/* Latest Blog Posts */}
      {latestBlogPosts.length > 0 && (
        <LatestBlogPostsSection posts={latestBlogPosts} />
      )}

      {/* Social Proof - Reviews */}
      <SocialProofSection />

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-wood-700 to-wood-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Dołącz do społeczności saunowej
          </h2>
          <p className="text-xl text-wood-100 mb-8 max-w-2xl mx-auto">
            Zapisz się do newslettera i otrzymaj <strong>10% rabatu</strong> na pierwsze zakupy.
            Bądź na bieżąco z nowościami, szkoleniami i zawodami.
          </p>

          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Twój email"
              required
              className="flex-1 px-6 py-4 rounded-lg border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-white text-wood-800 px-8 py-4 rounded-lg font-semibold hover:bg-wood-50 transition-colors shadow-lg hover:shadow-xl"
            >
              Zapisz się
            </button>
          </form>

          <p className="text-sm text-wood-200 mt-6">
            Dołącz do <strong>500+ subskrybentów</strong>. Możesz zrezygnować w każdej chwili.
          </p>
        </div>
      </section>
    </div>
  );
}
