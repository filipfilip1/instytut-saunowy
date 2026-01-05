import React from 'react';
import { notFound } from 'next/navigation';
import ProductGrid from '@/components/products/ProductGrid';
import CategorySidebar from '@/components/products/CategorySidebar';
import ShopHeader from '@/components/products/ShopHeader';
import MobileCategoryDrawer from '@/components/products/MobileCategoryDrawer';
import RecentlyViewed from '@/components/products/RecentlyViewed';
import { ProductCategory } from '@/types';
import { fetchAllProductsGrouped } from '@/lib/utils/productQueries';
import {
  CATEGORY_CONFIG,
  isValidCategory,
  getAllCategories,
  EMPTY_STATE_ICON
} from '@/lib/constants/categories';

// Revalidate every 30 minutes
export const revalidate = 1800;

// Generate static params for all categories
export async function generateStaticParams() {
  return getAllCategories().map(({ key }) => ({
    category: key,
  }));
}

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  if (!isValidCategory(category)) {
    notFound();
  }

  const selectedCategory = category as ProductCategory;
  const selectedConfig = CATEGORY_CONFIG[selectedCategory];

  // Optimized: single query instead of two separate queries
  const { all: allProducts, byCategory } = await fetchAllProductsGrouped();
  const categoryProducts = byCategory[selectedCategory] || [];

  const categoryCounts = allProducts.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<ProductCategory, number>);

  return (
    <div className="min-h-screen">
      {/* Editorial Header */}
      <ShopHeader category={selectedCategory} />

      {/* Main Content - 2 Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
          {/* Left Sidebar - Categories */}
          <CategorySidebar
            currentCategory={selectedCategory}
            productCounts={categoryCounts}
          />

          {/* Right Column - Products */}
          <div>
            {/* Mobile Category Drawer */}
            <MobileCategoryDrawer
              currentCategory={selectedCategory}
              productCounts={categoryCounts}
            />

            {categoryProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="flex justify-center mb-4">
                  <EMPTY_STATE_ICON className="w-16 h-16 text-wood/40" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-wood mb-2">
                  Brak produktów
                </h3>
                <p className="text-wood/60 font-light">
                  W tej kategorii nie ma jeszcze żadnych produktów.
                </p>
              </div>
            ) : (
              <ProductGrid products={categoryProducts} />
            )}
          </div>
        </div>
      </div>

      {/* Recently Viewed Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <RecentlyViewed maxItems={6} />
      </div>
    </div>
  );
}
