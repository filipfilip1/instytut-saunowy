'use client';

import Link from 'next/link';
import { IBlogPost } from '@/types';
import { CATEGORY_LABELS } from '@/lib/models/BlogPost';
import HoverCard from '@/components/animations/HoverCard';

interface BlogCardProps {
  post: IBlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const categoryColors: Record<string, string> = {
    poradniki: 'bg-blue-500',
    trendy: 'bg-purple-500',
    diy: 'bg-green-500',
    szkolenia: 'bg-amber-500',
    zdrowie: 'bg-pink-500',
    przepisy: 'bg-red-500',
  };

  const categoryColor = categoryColors[post.category] || 'bg-gray-500';

  return (
    <HoverCard>
      <Link href={`/akademia/${post.slug}`} className="block h-full">
        <article className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
          {/* Featured Image */}
          <div className="relative aspect-video bg-gray-100 overflow-hidden">
            {post.featuredImage?.url ? (
              <img
                src={post.featuredImage.url}
                alt={post.featuredImage.alt || post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}

            {/* Category Badge */}
            <div className={`absolute top-3 left-3 ${categoryColor} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg`}>
              {CATEGORY_LABELS[post.category]}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-grow flex flex-col">
            {/* Meta info */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={post.publishedAt.toString()}>
                  {new Date(post.publishedAt).toLocaleDateString('pl-PL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{post.readTime} min czytania</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 flex-grow">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-gray-600 mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            {/* Author & CTA */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              <div className="flex items-center gap-3">
                {/* Author Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-wood-500 to-wood-700 flex items-center justify-center text-white font-semibold text-sm">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {post.author.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {post.author.role}
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-1 text-sm text-wood-600 font-medium">
                Czytaj
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* View count (if > 10) */}
            {post.viewCount > 10 && (
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{post.viewCount} wyświetleń</span>
              </div>
            )}
          </div>
        </article>
      </Link>
    </HoverCard>
  );
}
