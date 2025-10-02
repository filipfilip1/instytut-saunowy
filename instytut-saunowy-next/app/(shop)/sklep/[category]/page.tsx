import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import ProductCard from '@/components/products/ProductCard';
import { IProduct, ProductCategory } from '@/types';

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

async function getProducts(category?: string): Promise<IProduct[]> {
  await dbConnect();

  const query: any = { isActive: true };
  if (category) {
    query.category = category;
  }

  const products = await Product.find(query)
    .sort('-createdAt')
    .limit(20)
    .lean();

  return JSON.parse(JSON.stringify(products));
}

export default async function CategoryPage({ params }: PageProps) {
  const validCategories = ['kilty', 'poncha', 'spodnie', 'bluzy', 'akcesoria', 'zestawy'];

  if (!validCategories.includes(params.category)) {
    notFound();
  }

  const selectedCategory = params.category as ProductCategory;
  const allProducts = await getProducts();
  const categoryProducts = await getProducts(selectedCategory);

  const categoryCounts = allProducts.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<ProductCategory, number>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-wood-600 to-wood-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            Odzież do Saunowania
          </h1>
          <p className="text-xl text-center text-wood-100 max-w-2xl mx-auto">
            Odkryj naszą kolekcję wysokiej jakości odzieży zaprojektowanej specjalnie
            z myślą o komforcie podczas saunowania
          </p>
        </div>
      </div>

      {/* Category filters */}
      <div className="sticky top-0 bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/sklep"
              className="px-4 py-2 rounded-full font-medium transition-all bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center gap-2"
            >
              {categoryIcons.all}
              <span>Wszystkie ({allProducts.length})</span>
            </Link>

            {validCategories.map(category => (
              <Link
                key={category}
                href={`/sklep/${category}`}
                className={`
                  px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2
                  ${selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }
                `}
              >
                <span>{categoryIcons[category as ProductCategory]}</span>
                <span className="capitalize">{category}</span>
                {categoryCounts[category as ProductCategory] > 0 && (
                  <span className="text-sm">({categoryCounts[category as ProductCategory] || 0})</span>
                )}
              </Link>
            ))}
          </div>

          {/* Category description */}
          <p className="text-center text-gray-600 mt-4 text-sm">
            {categoryDescriptions[selectedCategory]}
          </p>
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categoryProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              Brak produktów w tej kategorii.
            </p>
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