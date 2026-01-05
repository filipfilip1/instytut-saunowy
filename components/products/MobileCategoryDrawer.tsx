'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { ProductCategory } from '@/types';
import { PRODUCT_CATEGORIES, CATEGORY_CONFIG } from '@/lib/constants/categories';

interface MobileCategoryDrawerProps {
  currentCategory: ProductCategory | null;
  productCounts: Partial<Record<ProductCategory, number>>;
}

export default function MobileCategoryDrawer({
  currentCategory,
  productCounts,
}: MobileCategoryDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsOpen(true)}
          className="w-full py-3 px-4 border-2 border-wood text-wood font-bold uppercase tracking-widest text-sm rounded-md hover:bg-wood hover:text-oat transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Kategorie
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-wood/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed bottom-0 left-0 right-0 bg-oat rounded-t-2xl shadow-2xl z-50 lg:hidden
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-wood/10">
          <h2 className="text-xl font-serif font-bold text-wood">Kategorie</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-full bg-wood/10 hover:bg-wood/20 flex items-center justify-center transition-colors"
            aria-label="Zamknij"
          >
            <X className="w-5 h-5 text-wood" />
          </button>
        </div>

        {/* Category List */}
        <nav className="px-6 py-4 max-h-[60vh] overflow-y-auto">
          <div className="space-y-1">
            {/* All Products */}
            <Link
              href="/sklep"
              onClick={() => setIsOpen(false)}
              className={`
                block py-4 text-sm uppercase tracking-widest font-bold transition-colors border-l-4
                ${
                  currentCategory === null
                    ? 'text-copper border-copper pl-4 bg-copper/5'
                    : 'text-wood/60 border-transparent pl-4 hover:text-wood hover:border-wood/20'
                }
              `}
            >
              Wszystkie
            </Link>

            {/* Category Links */}
            {PRODUCT_CATEGORIES.map((categoryKey) => {
              const count = productCounts[categoryKey] || 0;
              const isActive = currentCategory === categoryKey;
              const config = CATEGORY_CONFIG[categoryKey];

              if (count === 0) return null;

              return (
                <Link
                  key={categoryKey}
                  href={`/sklep/${categoryKey}`}
                  onClick={() => setIsOpen(false)}
                  className={`
                    block py-4 text-sm uppercase tracking-widest font-bold transition-colors border-l-4
                    ${
                      isActive
                        ? 'text-copper border-copper pl-4 bg-copper/5'
                        : 'text-wood/60 border-transparent pl-4 hover:text-wood hover:border-wood/20'
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
          </div>
        </nav>
      </div>
    </>
  );
}
