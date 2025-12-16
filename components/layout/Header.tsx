'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import LoginButton from '@/components/auth/LoginButton';
import SmartSearch from '@/components/search/SmartSearch';
import AnimatedNumber from '@/components/animations/AnimatedNumber';
import { BRAND } from '@/constants/brand';
import { IProduct } from '@/types';

const Header = () => {
  const pathname = usePathname();
  const { getItemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);

  // Fetch products for search
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products?limit=100');
        const data = await response.json();
        if (data.status === 'success') {
          setProducts(data.data);
        }
      } catch (error) {
        console.error('Error fetching products for search:', error);
      }
    }
    fetchProducts();
  }, []);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-3 group"
            >
              <Image
                src={BRAND.logo.url.header}
                alt={BRAND.logo.alt}
                width={BRAND.logo.dimensions.header.width}
                height={BRAND.logo.dimensions.header.height}
                priority
                className="h-10 w-auto md:h-12"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium transition-colors text-base ${
                isActive('/')
                  ? 'text-gold-600 font-semibold'
                  : 'text-graphite-700 hover:text-gold-500'
              }`}
            >
              Strona główna
            </Link>
            <Link
              href="/sklep"
              className={`font-medium transition-colors text-base ${
                isActive('/sklep')
                  ? 'text-gold-600 font-semibold'
                  : 'text-graphite-700 hover:text-gold-500'
              }`}
            >
              Sklep
            </Link>
            <Link
              href="/szkolenia"
              className={`font-medium transition-colors text-base ${
                isActive('/szkolenia')
                  ? 'text-gold-600 font-semibold'
                  : 'text-graphite-700 hover:text-gold-500'
              }`}
            >
              Szkolenia
            </Link>
            <Link
              href="/zawody-moa"
              className={`font-medium transition-colors text-base ${
                isActive('/zawody-moa')
                  ? 'text-gold-600 font-semibold'
                  : 'text-graphite-700 hover:text-gold-500'
              }`}
            >
              Zawody MoA
            </Link>
            <Link
              href="/o-nas"
              className={`font-medium transition-colors text-base ${
                isActive('/o-nas')
                  ? 'text-gold-600 font-semibold'
                  : 'text-graphite-700 hover:text-gold-500'
              }`}
            >
              O nas
            </Link>
            <Link
              href="/kontakt"
              className={`font-medium transition-colors text-base ${
                isActive('/kontakt')
                  ? 'text-gold-600 font-semibold'
                  : 'text-graphite-700 hover:text-gold-500'
              }`}
            >
              Kontakt
            </Link>
          </div>

          {/* Search - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <SmartSearch products={products} placeholder="Szukaj produktów..." />
          </div>

          {/* Cart, Login & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Login Button */}
            <LoginButton />

            {/* Cart */}
            <Link
              href="/koszyk"
              className="relative p-2.5 text-graphite-700 hover:text-gold-600 hover:bg-gold-50 rounded-xl transition-all"
            >
              <ShoppingCart className="w-6 h-6" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-forest-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold tabular-nums">
                  <AnimatedNumber value={getItemCount()} />
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-graphite-700 hover:text-gold-600 hover:bg-gold-50 rounded-xl transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-cream-300 bg-cream-50">
            {/* Mobile Search */}
            <div className="px-4 py-3">
              <SmartSearch products={products} placeholder="Szukaj produktów..." />
            </div>

            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-4 py-3 rounded-xl text-base font-medium text-graphite-700 hover:text-gold-600 hover:bg-gold-50 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Strona główna
              </Link>
              <Link
                href="/sklep"
                className="block px-4 py-3 rounded-xl text-base font-medium text-graphite-700 hover:text-gold-600 hover:bg-gold-50 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sklep
              </Link>
              <Link
                href="/szkolenia"
                className="block px-4 py-3 rounded-xl text-base font-medium text-graphite-700 hover:text-gold-600 hover:bg-gold-50 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Szkolenia
              </Link>
              <Link
                href="/zawody-moa"
                className="block px-4 py-3 rounded-xl text-base font-medium text-graphite-700 hover:text-gold-600 hover:bg-gold-50 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Zawody MoA
              </Link>
              <Link
                href="/o-nas"
                className="block px-4 py-3 rounded-xl text-base font-medium text-graphite-700 hover:text-gold-600 hover:bg-gold-50 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                O nas
              </Link>
              <Link
                href="/kontakt"
                className="block px-4 py-3 rounded-xl text-base font-medium text-graphite-700 hover:text-gold-600 hover:bg-gold-50 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kontakt
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;