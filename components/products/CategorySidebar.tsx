'use client';

import React from 'react';
import Link from 'next/link';
import { ProductCategory } from '@/types';
import { PRODUCT_CATEGORIES, CATEGORY_CONFIG } from '@/lib/constants/categories';

interface CategorySidebarProps {
  currentCategory: ProductCategory | null;
  productCounts: Partial<Record<ProductCategory, number>>;
}

export default function CategorySidebar({
  currentCategory,
  productCounts,
}: CategorySidebarProps) {
  return (
    <aside className="hidden lg:block">
      <nav className="sticky top-24 space-y-1">
        {/* All Products */}
        <Link
          href="/sklep"
          className={`
            block py-3 text-sm uppercase tracking-widest font-bold transition-colors
            ${
              currentCategory === null
                ? 'text-copper border-l-2 border-copper pl-4'
                : 'text-wood/60 hover:text-wood pl-4'
            }
          `}
        >
          Wszystkie
        </Link>

        {/* Category List */}
        {PRODUCT_CATEGORIES.map((categoryKey) => {
          const count = productCounts[categoryKey] || 0;
          const isActive = currentCategory === categoryKey;
          const config = CATEGORY_CONFIG[categoryKey];

          if (count === 0) return null;

          return (
            <Link
              key={categoryKey}
              href={`/sklep/${categoryKey}`}
              className={`
                block py-3 text-sm uppercase tracking-widest font-bold transition-colors
                ${
                  isActive
                    ? 'text-copper border-l-2 border-copper pl-4'
                    : 'text-wood/60 hover:text-wood pl-4'
                }
              `}
            >
              {config.label}
              <span className="ml-2 text-xs font-normal tabular-nums">
                ({count})
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
