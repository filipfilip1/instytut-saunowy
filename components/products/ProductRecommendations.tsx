'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { IProduct, ProductCategory } from '@/types';
import { getProductRecommendations } from '@/lib/client/recommendations';
import { formatPriceRounded } from '@/lib/utils/currency';
import { CATEGORY_CONFIG } from '@/lib/constants/categories';
import HoverCard from '@/components/animations/HoverCard';
import FadeIn from '@/components/animations/FadeIn';

interface ProductRecommendationsProps {
  /**
   * Base product to generate recommendations from
   */
  baseProduct: IProduct;

  /**
   * All available products
   */
  allProducts: IProduct[];

  /**
   * Custom title for the section
   */
  title?: string;

  /**
   * Maximum number of recommendations to display
   */
  maxItems?: number;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export default function ProductRecommendations({
  baseProduct,
  allProducts,
  title = "Może Ci się spodobać",
  maxItems = 6,
  className = ""
}: ProductRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<IProduct[]>([]);

  useEffect(() => {
    const recommended = getProductRecommendations(baseProduct, allProducts, maxItems);
    setRecommendations(recommended);
  }, [baseProduct, allProducts, maxItems]);

  // Don't render if no recommendations
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section className={`border-t border-[#2C2622]/10 ${className}`}>
      {/* Header - Minimalist */}
      <div className="mb-4 md:mb-8 px-4 md:px-0">
        <h2 className="text-xl md:text-3xl font-serif text-[#2C2622] text-center">
          {title}
        </h2>
      </div>

      {/* Product Grid - Mobile: horizontal scroll, Desktop: grid */}
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-4 scrollbar-hide md:px-0 md:grid md:grid-cols-3 lg:grid-cols-6 md:gap-4 md:overflow-visible">
        {recommendations.map((product, index) => {
          const categoryConfig = CATEGORY_CONFIG[product.category as ProductCategory];
          const categoryLabel = categoryConfig?.label || product.category;
          const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];

          return (
            <FadeIn key={product._id} delay={index * 0.05} className="flex-shrink-0 w-40 snap-start md:w-auto md:snap-align-none">
              <HoverCard>
                <Link
                  href={`/produkt/${product.slug}`}
                  className="block group"
                >
                  {/* Product Image - 3:4 aspect with warm filter */}
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-stone/10 mb-2">
                    {primaryImage?.url ? (
                      <Image
                        src={primaryImage.url}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 sepia-[.15] contrast-[1.05]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#2C2622]/30">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}

                    {/* Minimalist Badge - Hidden on mobile */}
                    <div className="hidden md:block absolute top-2 right-2 px-2 py-1 bg-[#2C2622]/80 border border-[#C47F52]/60 rounded-sm backdrop-blur-sm">
                      <span className="uppercase tracking-widest text-[10px] font-bold text-[#C47F52]">
                        Polecane
                      </span>
                    </div>
                  </div>

                  {/* Product Info - Clean */}
                  <div className="space-y-0.5 md:space-y-1">
                    {/* Category - Hidden on mobile */}
                    <p className="hidden md:block text-[10px] text-stone-500 uppercase tracking-widest truncate">
                      {categoryLabel}
                    </p>

                    {/* Name */}
                    <h3 className="text-xs md:text-sm font-serif text-[#2C2622] group-hover:text-[#C47F52] transition-colors line-clamp-2 min-h-[2rem] md:min-h-[2.5rem]">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <p className="text-xs md:text-sm text-[#C47F52] font-medium tabular-nums">
                      {formatPriceRounded(product.basePrice)}
                    </p>
                  </div>
                </Link>
              </HoverCard>
            </FadeIn>
          );
        })}
      </div>

      {/* Custom scrollbar hide styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
