'use client';

import RecentlyViewed from '@/components/products/RecentlyViewed';

export default function HomeClient() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RecentlyViewed title="Ostatnio oglądane produkty" maxItems={6} />
      </div>
    </section>
  );
}
