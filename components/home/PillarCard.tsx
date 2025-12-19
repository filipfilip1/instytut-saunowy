'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import HoverCard from '@/components/animations/HoverCard';

export interface PillarCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  ctaText: string;
  imageUrl?: string;
  gradient: string; // Tailwind gradient classes
  size?: 'large' | 'medium'; // For bento grid sizing
  accentColor?: string; // e.g., 'gold', 'forest', 'warmwood'
}

/**
 * PillarCard Component
 * Used in Section 2: Three Pillars Bento Grid
 * Displays business pillars (Sklep, Edukacja, Wiedza/Community)
 */
const PillarCard: React.FC<PillarCardProps> = ({
  title,
  description,
  icon,
  href,
  ctaText,
  imageUrl,
  gradient,
  size = 'medium',
  accentColor = 'gold',
}) => {
  // Size-specific styles
  const sizeClasses = {
    large: 'md:row-span-2 md:col-span-2',
    medium: 'md:row-span-1 md:col-span-1',
  };

  const heightClasses = {
    large: 'min-h-[500px]',
    medium: 'min-h-[240px]',
  };

  const iconSizeClasses = {
    large: 'text-7xl md:text-8xl',
    medium: 'text-6xl',
  };

  const titleSizeClasses = {
    large: 'text-4xl md:text-5xl',
    medium: 'text-3xl',
  };

  return (
    <HoverCard className={`${sizeClasses[size]} ${heightClasses[size]}`}>
      <Link
        href={href}
        className="block h-full group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500"
      >
        {/* Background gradient or image */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
          {imageUrl && (
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          )}
        </div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent"></div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-8 md:p-10 text-white">
          {/* Icon + Title */}
          <div>
            <div className={`${iconSizeClasses[size]} mb-4 group-hover:scale-110 transition-transform duration-500`}>
              {icon}
            </div>
            <h3 className={`${titleSizeClasses[size]} font-serif font-bold mb-4 drop-shadow-lg`}>
              {title}
            </h3>
            <p className={`${size === 'large' ? 'text-lg md:text-xl' : 'text-base md:text-lg'} leading-relaxed drop-shadow-md max-w-xl`}>
              {description}
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-6">
            <span className={`inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm border-2 border-white/50 rounded-xl font-semibold text-white hover:bg-white hover:text-${accentColor}-700 transition-all duration-300 group-hover:gap-4 shadow-lg`}>
              {ctaText}
              <ArrowRight className="w-5 h-5" />
            </span>
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:translate-x-12 group-hover:-translate-y-12 transition-transform duration-500`}></div>
      </Link>
    </HoverCard>
  );
};

export default PillarCard;
