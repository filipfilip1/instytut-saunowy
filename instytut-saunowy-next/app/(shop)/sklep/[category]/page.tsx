import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/products/ProductCard';
import { IProduct, ProductCategory } from '@/types';
import { fetchAllProductsGrouped } from '@/lib/utils/productQueries';

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

interface PageProps {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const validCategories = ['kilty', 'poncha', 'spodnie', 'bluzy', 'akcesoria', 'zestawy'];

  if (!validCategories.includes(params.category)) {
    notFound();
  }

  const selectedCategory = params.category as ProductCategory;

  // Optimized: single query instead of two separate queries
  const { all: allProducts, byCategory } = await fetchAllProductsGrouped();
  const categoryProducts = byCategory[selectedCategory] || [];

  const categoryCounts = allProducts.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<ProductCategory, number>);

  return (
    <div className="min-h-screen bg-cream-200">
      {/* Hero section */}
      <div className="bg-gradient-to-br from-forest-600 via-nordic-600 to-nordic-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-4 px-5 py-2 bg-gold-400/20 backdrop-blur-sm rounded-full border border-gold-400/40">
            <span className="text-gold-200 font-medium">
              {categoryIcons[selectedCategory]} {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Odzież do Saunowania
          </h1>
          <p className="text-xl text-cream-200 max-w-2xl mx-auto leading-relaxed">
            {categoryDescriptions[selectedCategory]}
          </p>
        </div>
      </div>

      {/* Category filters */}
      <div className="sticky top-20 bg-white/95 backdrop-blur-sm shadow-md z-10 border-b-2 border-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/sklep"
              className="px-5 py-2.5 rounded-2xl font-medium transition-all bg-cream-200 hover:bg-gold-100 text-graphite-700 hover:text-graphite-900 flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              {categoryIcons.all}
              <span>Wszystkie ({allProducts.length})</span>
            </Link>

            {validCategories.map(category => (
              <Link
                key={category}
                href={`/sklep/${category}`}
                className={`
                  px-5 py-2.5 rounded-2xl font-medium transition-all flex items-center gap-2
                  ${selectedCategory === category
                    ? 'bg-gold-400 text-graphite-900 shadow-gold hover:shadow-gold-lg font-semibold'
                    : 'bg-cream-200 hover:bg-gold-100 text-graphite-700 hover:text-graphite-900 shadow-sm hover:shadow-md'
                  }
                `}
              >
                <span>{categoryIcons[category as ProductCategory]}</span>
                <span className="capitalize">{category}</span>
                {categoryCounts[category as ProductCategory] > 0 && (
                  <span className={`text-sm px-2 py-0.5 rounded-full ${
                    selectedCategory === category
                      ? 'bg-gold-600 text-white'
                      : 'bg-gold-200 text-gold-800'
                  }`}>
                    {categoryCounts[category as ProductCategory] || 0}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {categoryProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">{categoryIcons[selectedCategory]}</div>
            <h3 className="text-2xl font-serif font-semibold text-graphite-900 mb-2">
              Brak produktów
            </h3>
            <p className="text-graphite-600 mb-6">
              W tej kategorii nie ma jeszcze żadnych produktów.
            </p>
            <Link href="/sklep" className="btn-gold">
              Zobacz wszystkie produkty
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


export async function generateStaticParams() {
  return [
    { category: 'kilty' },
    { category: 'poncha' },
    { category: 'spodnie' },
    { category: 'bluzy' },
    { category: 'akcesoria' },
    { category: 'zestawy' },
  ];
}