import React from 'react';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import { ProductCategory } from '@/types';
import { fetchProducts } from '@/lib/utils/productQueries';
import { ShoppingBag, Flag, Shirt, FootprintsIcon, Sparkles, Package, Store } from 'lucide-react';

const categoryIcons: Record<ProductCategory | 'all', React.ComponentType<{ className?: string }>> = {
  'all': ShoppingBag,
  'kilty': Flag,
  'poncha': Shirt,
  'spodnie': FootprintsIcon,
  'bluzy': Shirt,
  'akcesoria': Sparkles,
  'zestawy': Package
};

export default async function ProductListPage() {
  const products = await fetchProducts({ limit: 20 });

  const productCountByCategory = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<ProductCategory, number>);

  return (
    <div className="min-h-screen bg-cream-200">
      {/* Hero section */}
      <div className="bg-gradient-to-br from-forest-600 via-nordic-600 to-nordic-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-4 px-5 py-2 bg-gold-400/20 backdrop-blur-sm rounded-full border border-gold-400/40">
            <span className="text-gold-200 font-medium">Premium Kolekcja</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Odzież do Saunowania
          </h1>
          <p className="text-xl text-cream-200 max-w-2xl mx-auto leading-relaxed">
            Odkryj naszą kolekcję wysokiej jakości odzieży zaprojektowanej specjalnie
            z myślą o komforcie podczas saunowania
          </p>
        </div>
      </div>

      {/* Category filters */}
      <div className="sticky top-20 bg-white/95 backdrop-blur-sm shadow-md z-10 border-b-2 border-cream-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/sklep"
              className="px-5 py-2.5 rounded-2xl font-semibold transition-all bg-gold-400 text-graphite-900 shadow-gold hover:shadow-gold-lg flex items-center gap-2"
            >
              {React.createElement(categoryIcons.all, { className: 'w-4 h-4' })}
              <span>Wszystkie ({products.length})</span>
            </Link>

            {(Object.keys(categoryIcons).filter(cat => cat !== 'all') as ProductCategory[]).map(category => (
              <Link
                key={category}
                href={`/sklep/${category}`}
                className="px-5 py-2.5 rounded-2xl font-medium transition-all bg-cream-200 hover:bg-gold-100 text-graphite-700 hover:text-graphite-900 flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                {React.createElement(categoryIcons[category], { className: 'w-4 h-4' })}
                <span className="capitalize">{category}</span>
                {productCountByCategory[category] > 0 && (
                  <span className="text-sm bg-gold-200 text-gold-800 px-2 py-0.5 rounded-full">
                    {productCountByCategory[category] || 0}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="flex justify-center mb-4">
              <Store className="w-16 h-16 text-graphite-400" />
            </div>
            <h3 className="text-2xl font-serif font-semibold text-graphite-900 mb-2">
              Brak produktów
            </h3>
            <p className="text-graphite-600">
              Wkrótce pojawią się nowe produkty w naszej kolekcji.
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