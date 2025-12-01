'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getRecentlyViewed, getRecentlyViewedExcluding, RecentlyViewedProduct } from '@/lib/client/recentlyViewed';
import { formatPriceRounded } from '@/lib/utils/currency';

interface RecentlyViewedProps {
  /**
   * Exclude a specific product ID (useful on product detail pages)
   */
  excludeProductId?: string;

  /**
   * Custom title for the section
   */
  title?: string;

  /**
   * Maximum number of items to display
   */
  maxItems?: number;

  /**
   * Additional CSS classes
   */
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

    // Get recently viewed products
    const recentProducts = excludeProductId
      ? getRecentlyViewedExcluding(excludeProductId)
      : getRecentlyViewed();

    // Filter out inactive products and limit to maxItems
    const activeProducts = recentProducts
      .filter(p => p.isActive)
      .slice(0, maxItems);

    setProducts(activeProducts);
  }, [excludeProductId, maxItems]);

  // Don't render on server (avoid hydration mismatch)
  if (!isClient || products.length === 0) {
    return null;
  }

  return (
    <section className={`py-8 ${className}`}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-graphite-900">{title}</h2>
        <div className="flex items-center gap-2 text-sm text-graphite-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Przeglądane przez Ciebie</span>
        </div>
      </div>

      {/* Horizontal scrollable grid */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {products.map((product) => (
            <div key={product._id} className="flex-shrink-0 w-48 snap-start">
              <Link
                href={`/produkt/${product.slug}`}
                className="block group"
              >
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all hover:shadow-lg hover:border-gray-300">
                  {/* Product Image */}
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    {product.images[0]?.url ? (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}

                    {/* Recently Viewed Badge */}
                    <div className="absolute top-2 right-2 bg-nordic-600 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                      Oglądane
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-3">
                    <p className="text-xs text-graphite-600 uppercase mb-1 truncate">
                      {product.category}
                    </p>
                    <h3 className="font-medium text-graphite-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold text-graphite-900">
                        {formatPriceRounded(product.basePrice)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Scroll hint for mobile */}
        {products.length > 2 && (
          <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-cream-50 to-transparent pointer-events-none md:hidden" />
        )}
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
