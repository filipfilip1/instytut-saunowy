import React from 'react';
import Link from 'next/link';
import { IBlogPost } from '@/types';
import { CATEGORY_LABELS } from '@/lib/models/BlogPost';
import FadeIn from '@/components/animations/FadeIn';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';
import HoverCard from '@/components/animations/HoverCard';

interface LatestBlogPostsSectionProps {
  posts: IBlogPost[];
}

export default function LatestBlogPostsSection({ posts }: LatestBlogPostsSectionProps) {
  if (posts.length === 0) {
    return null;
  }

  const categoryColors: Record<string, string> = {
    poradniki: 'bg-blue-500',
    trendy: 'bg-purple-500',
    diy: 'bg-green-500',
    szkolenia: 'bg-amber-500',
    zdrowie: 'bg-pink-500',
    przepisy: 'bg-red-500',
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Z naszej Akademii
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Najnowsze artykuły, porady i inspiracje ze świata saunowania
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {posts.map((post, index) => {
            const categoryColor = categoryColors[post.category] || 'bg-gray-500';

            return (
              <StaggerItem key={post._id}>
                <HoverCard>
                  <Link href={`/akademia/${post.slug}`} className="block h-full">
                    <article className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-wood-400 transition-colors h-full flex flex-col">
                      {/* Featured Image */}
                      <div className="relative aspect-video bg-gray-200 overflow-hidden">
                        {post.featuredImage?.url ? (
                          <img
                            src={post.featuredImage.url}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}

                        {/* Category Badge */}
                        <div className={`absolute top-4 left-4 ${categoryColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                          {CATEGORY_LABELS[post.category]}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-wood-600 transition-colors">
                          {post.title}
                        </h3>

                        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                          {post.excerpt}
                        </p>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{post.readTime} min</span>
                          </div>

                          {post.viewCount > 0 && (
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              <span>{post.viewCount}</span>
                            </div>
                          )}
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-3 mt-4">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-wood-500 to-wood-700 flex items-center justify-center text-white text-sm font-bold">
                            {post.author.name.charAt(0)}
                          </div>
                          <div className="text-sm">
                            <div className="font-semibold text-gray-900">{post.author.name}</div>
                            <div className="text-gray-500">{post.author.role}</div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </HoverCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* CTA to see all posts */}
        <FadeIn delay={0.4} className="text-center">
          <Link
            href="/akademia"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-wood-600 to-wood-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-wood-700 hover:to-wood-800 transition-all shadow-lg hover:shadow-xl"
          >
            Zobacz wszystkie artykuły
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
