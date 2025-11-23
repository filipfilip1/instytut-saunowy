import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import { IProduct, ProductCategory } from '@/types';
import { fetchProducts } from '@/lib/utils/productQueries';

const categoryIcons: Record<ProductCategory | 'all', string> = {
  'all': '🛍️',
  'kilty': '🏴',
  'poncha': '🧥',
  'spodnie': '👖',
  'bluzy': '👕',
  'akcesoria': '🎁',
  'zestawy': '📦'
};

const categoryDescriptions: Record<ProductCategory, string> = {
  'kilty': 'Tradycyjne kilty do sauny w różnych wzorach i kolorach',
  'poncha': 'Wygodne poncha idealne po wyjściu z sauny',
  'spodnie': 'Przewiewne spodnie do relaksu w saunie',
  'bluzy': 'Komfortowe bluzy na chłodniejsze dni',
  'akcesoria': 'Niezbędne dodatki do saunowania',
  'zestawy': 'Kompletne zestawy dla prawdziwych miłośników sauny'
};

export default async function ProductListPage() {
  const products = await fetchProducts({ limit: 20 });

  const productCountByCategory = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<ProductCategory, number>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section - responsive text sizing */}
      <div className="bg-gradient-to-r from-wood-600 to-wood-800 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4">
            Odzież do Saunowania
          </h1>
          <p className="text-lg sm:text-xl text-center text-wood-100 max-w-2xl mx-auto">
            Odkryj naszą kolekcję wysokiej jakości odzieży zaprojektowanej specjalnie
            z myślą o komforcie podczas saunowania
          </p>
        </div>
      </div>

      {/* Category filters - horizontally scrollable on mobile */}
      <div className="sticky top-0 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap sm:justify-center -mx-4 px-4 sm:mx-0 sm:px-0">
            <Link
              href="/sklep"
              className="px-3 sm:px-4 py-2 min-h-[44px] rounded-full font-medium transition-all bg-blue-600 text-white flex items-center gap-2 whitespace-nowrap flex-shrink-0 text-sm sm:text-base"
            >
              {categoryIcons.all}
              <span>Wszystkie ({products.length})</span>
            </Link>

            {(Object.keys(categoryIcons).filter(cat => cat !== 'all') as ProductCategory[]).map(category => (
              <Link
                key={category}
                href={`/sklep/${category}`}
                className="px-3 sm:px-4 py-2 min-h-[44px] rounded-full font-medium transition-all bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center gap-2 whitespace-nowrap flex-shrink-0 text-sm sm:text-base"
              >
                <span>{categoryIcons[category]}</span>
                <span className="capitalize">{category}</span>
                {productCountByCategory[category] > 0 && (
                  <span className="text-sm">({productCountByCategory[category] || 0})</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              Brak produktów w sklepie.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}