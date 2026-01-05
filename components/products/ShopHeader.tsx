import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ProductCategory } from '@/types';
import { CATEGORY_CONFIG, ALL_CATEGORY_CONFIG } from '@/lib/constants/categories';

interface ShopHeaderProps {
  category?: ProductCategory | null;
}

export default function ShopHeader({ category = null }: ShopHeaderProps) {
  // Determine title and subtitle based on category
  const isMainShop = category === null;
  const config = category ? CATEGORY_CONFIG[category] : null;

  const title = isMainShop ? 'Odzież do Saunowania' : config?.label || 'Sklep';
  const subtitle = isMainShop
    ? 'Naturalne materiały, rzemieślnicza jakość. Poczuj różnicę.'
    : config?.description || '';

  return (
    <div className="bg-wood py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center gap-2 text-sm mb-6">
          <Link href="/" className="text-oat/60 hover:text-oat transition-colors">
            Strona główna
          </Link>
          <ChevronRight className="w-4 h-4 text-oat/40" />
          <Link href="/sklep" className="text-oat/60 hover:text-oat transition-colors">
            Sklep
          </Link>
          {category && (
            <>
              <ChevronRight className="w-4 h-4 text-oat/40" />
              <span className="text-oat/90">{config?.label}</span>
            </>
          )}
        </nav>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-serif italic font-bold text-copper mb-4">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-oat/80 max-w-2xl mx-auto font-light">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
