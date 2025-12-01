'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IProduct } from '@/types';
import { getProductRecommendations } from '@/lib/client/recommendations';
import { formatPriceRounded } from '@/lib/utils/currency';

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
  title = "Polecane produkty",
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
    <section className={`py-8 ${className}`}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-graphite-900">{title}</h2>
        <div className="flex items-center gap-2 text-sm text-graphite-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <span>Wybrane dla Ciebie</span>
        </div>
      </div>

      {/* Grid layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {recommendations.map((product) => (
          <Link
            key={product._id}
            href={`/produkt/${product.slug}`}
            className="group"
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

                {/* Recommendation Badge */}
                <div className="absolute top-2 right-2 bg-forest-600 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                  Polecane
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

                {/* View count as social proof */}
                {product.viewCount && product.viewCount > 10 && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-graphite-600">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{product.viewCount} wyświetleń</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
