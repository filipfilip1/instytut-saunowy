'use client';

import Link from 'next/link';
import { IProduct } from '@/types';
import { formatPriceRounded } from '@/lib/utils/currency';
import FadeIn from '@/components/animations/FadeIn';
import HoverCard from '@/components/animations/HoverCard';
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer';

interface BestsellersSectionProps {
  products: IProduct[];
}

export default function BestsellersSection({ products }: BestsellersSectionProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nasze Bestsellery
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Najpopularniejsze produkty wybierane przez miłośników saunowania.
            Wysokiej jakości materiały i unikalne wzory.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.slice(0, 6).map((product) => (
            <StaggerItem key={product._id}>
              <HoverCard>
                <Link href={`/produkt/${product.slug}`} className="block h-full">
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
                    {/* Product Image */}
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                      {product.images[0]?.url ? (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
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

                      {/* Bestseller Badge */}
                      <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Bestseller
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6 flex-grow flex flex-col">
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                        {product.category}
                      </p>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 flex-grow">
                        {product.name}
                      </h3>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between mt-auto">
                        <div className="text-2xl font-bold text-wood-700">
                          {formatPriceRounded(product.basePrice)}
                        </div>

                        <div className="inline-flex items-center gap-1 text-sm text-wood-600 font-medium">
                          Zobacz
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>

                      {/* View count as social proof */}
                      {product.viewCount && product.viewCount > 10 && (
                        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>{product.viewCount} wyświetleń</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA to Shop */}
        <FadeIn delay={0.6} className="text-center mt-12">
          <Link
            href="/sklep"
            className="inline-flex items-center gap-2 bg-wood-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-wood-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Zobacz wszystkie produkty
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
