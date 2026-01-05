'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getRecentlyViewed, getRecentlyViewedExcluding, RecentlyViewedProduct } from '@/lib/client/recentlyViewed';
import { formatPriceExact } from '@/lib/utils/currency';
import { CATEGORY_CONFIG } from '@/lib/constants/categories';
import { ProductCategory } from '@/types';

interface RecentlyViewedProps {
  excludeProductId?: string;
  title?: string;
  maxItems?: number;
  className?: string;
}

export default function RecentlyViewed({
  excludeProductId,
  title = "Ostatnio oglądane",
  maxItems = 6,
  className = ""
}: RecentlyViewedProps) {
  const [products, setProducts] = useState<RecentlyViewedProduct[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const recentProducts = excludeProductId
      ? getRecentlyViewedExcluding(excludeProductId)
      : getRecentlyViewed();

    const activeProducts = recentProducts
      .filter(p => p.isActive)
      .slice(0, maxItems);

    setProducts(activeProducts);
  }, [excludeProductId, maxItems]);

  if (!isClient || products.length === 0) {
    return null;
  }

  return (
    <section className={`py-4 border-t border-[#2C2622]/10 ${className}`}>
      {/* Header - De-emphasized */}
      <div className="mb-3">
        <h2 className="font-fraunces text-lg text-stone-600">
          {title}
        </h2>
      </div>

      {/* Mobile: Horizontal Scroll with stage padding | Desktop: 6-Column Grid for small stamps */}
      <div className="
        flex overflow-x-auto gap-4 pl-2 pr-4 -mr-4 snap-x snap-mandatory scrollbar-hide
        md:grid md:grid-cols-4 lg:grid-cols-6 md:gap-4 md:px-0 md:mx-0 md:overflow-visible
      ">
        {products.map((product) => {
          const categoryConfig = CATEGORY_CONFIG[product.category as ProductCategory];
          const categoryLabel = categoryConfig?.label || product.category;

          return (
            <div
              key={product._id}
              className="flex-shrink-0 w-[110px] snap-start md:w-full md:max-w-[140px] group"
            >
              <Link
                href={`/produkt/${product.slug}`}
                className="block"
              >
                {/* Product Image - Thumbnail stamp */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-stone-200 mb-1.5">
                  {product.images[0]?.url ? (
                    <Image
                      src={product.images[0].url}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 110px, (max-width: 1024px) 160px, 140px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Product Info - Minimal */}
                <div className="space-y-0.5">
                  <h3 className="text-xs text-[#2C2622] group-hover:text-[#C47F52] transition-colors line-clamp-1 leading-tight">
                    {product.name}
                  </h3>

                  <p className="text-[11px] text-stone-500">
                    {formatPriceExact(product.basePrice)}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
