'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { IProduct } from '@/types';
import { getCartRecommendations } from '@/lib/client/recommendations';
import { formatPriceRounded } from '@/lib/utils/currency';

interface CartRecommendationsProps {
  /**
   * Products currently in the cart
   */
  cartProducts: IProduct[];

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

export default function CartRecommendations({
  cartProducts,
  allProducts,
  title = "Może Cię również zainteresować",
  maxItems = 6,
  className = ""
}: CartRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<IProduct[]>([]);

  useEffect(() => {
    const recommended = getCartRecommendations(cartProducts, allProducts, maxItems);
    setRecommendations(recommended);
  }, [cartProducts, allProducts, maxItems]);

  // Don't render if no recommendations
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <section className={`py-8 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-graphite-900 mb-2">{title}</h2>
        <p className="text-sm text-graphite-600">
          Produkty, które świetnie komponują się z Twoimi wyborami
        </p>
      </div>

      {/* Grid layout for cart recommendations */}
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

                {/* Cross-sell badge */}
                <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>Pasuje</span>
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
        ))}
      </div>
    </section>
  );
}
