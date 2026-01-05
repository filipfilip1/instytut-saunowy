import React from 'react';
import ProductGrid from '@/components/products/ProductGrid';
import RecentlyViewed from '@/components/products/RecentlyViewed';
import CategorySidebar from '@/components/products/CategorySidebar';
import ShopHeader from '@/components/products/ShopHeader';
import MobileCategoryDrawer from '@/components/products/MobileCategoryDrawer';
import { ProductCategory } from '@/types';
import { fetchProducts } from '@/lib/utils/productQueries';
import { EMPTY_STATE_ICON } from '@/lib/constants/categories';

// Revalidate every hour (ISR)
export const revalidate = 3600;

export default async function ProductListPage() {
  const products = await fetchProducts({ limit: 20 });

  const productCountByCategory = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<ProductCategory, number>);

  return (
    <div className="min-h-screen">
      {/* Editorial Header */}
      <ShopHeader />

      {/* Main Content - 2 Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
          {/* Left Sidebar - Categories */}
          <CategorySidebar
            currentCategory={null}
            productCounts={productCountByCategory}
          />

          {/* Right Column - Products */}
          <div>
            {/* Mobile Category Drawer */}
            <MobileCategoryDrawer
              currentCategory={null}
              productCounts={productCountByCategory}
            />

            {products.length === 0 ? (
              <div className="text-center py-20">
                <div className="flex justify-center mb-4">
                  <EMPTY_STATE_ICON className="w-16 h-16 text-wood/40" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-wood mb-2">
                  Brak produktów
                </h3>
                <p className="text-wood/60 font-light">
                  Wkrótce pojawią się nowe produkty w naszej kolekcji.
                </p>
              </div>
            ) : (
              <ProductGrid products={products} />
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