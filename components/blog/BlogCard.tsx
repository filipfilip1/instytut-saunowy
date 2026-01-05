'use client';

import Link from 'next/link';
import Image from 'next/image';
import { IBlogPost } from '@/types';
import { CATEGORY_LABELS } from '@/lib/constants/blog';
import { Clock } from 'lucide-react';

interface BlogCardProps {
  post: IBlogPost;
}

/**
 * BlogCard Component - "Ghost Card" Design
 * Editorial-style card with no shadows or backgrounds
 * Content floats on the page background
 * Part of the Fire & Earth Ritual Design System
 */

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/akademia/${post.slug}`} className="block group w-full min-w-0">
      <article className="w-full min-w-0">
        {/* Image */}
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-sm mb-4">
          {post.featuredImage?.url ? (
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt || post.title}
              fill
              className="object-cover max-w-full group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-[#2C2622]/10 flex items-center justify-center">
              <svg className="w-16 h-16 text-[#2C2622]/20" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
          <Clock className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.5} />
          <span className="truncate">{post.readTime} min czytania</span>
          <span className="flex-shrink-0">•</span>
          <span className="truncate">{CATEGORY_LABELS[post.category]}</span>
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl md:text-2xl font-bold text-[#2C2622] leading-tight mb-3 line-clamp-2 group-hover:text-[#C47F52] transition-colors break-words">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-stone-500 line-clamp-2 font-light leading-relaxed break-words">
          {post.excerpt}
        </p>
      </article>
    </Link>
  );
}
