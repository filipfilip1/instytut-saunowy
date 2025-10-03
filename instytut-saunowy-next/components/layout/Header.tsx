'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import LoginButton from '@/components/auth/LoginButton';

const Header = () => {
  const pathname = usePathname();
  const { getItemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-wood-700 hover:text-wood-600 transition-colors"
            >
              Instytut Saunowy
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-medium transition-colors ${isActive('/') ? 'text-wood-600' : 'text-gray-700 hover:text-wood-600'
                }`}
            >
              Strona główna
            </Link>
            <Link
              href="/sklep"
              className={`font-medium transition-colors ${isActive('/sklep') ? 'text-wood-600' : 'text-gray-700 hover:text-wood-600'
                }`}
            >
              Sklep
            </Link>
            <Link
              href="/o-nas"
              className={`font-medium transition-colors ${isActive('/o-nas') ? 'text-wood-600' : 'text-gray-700 hover:text-wood-600'
                }`}
            >
              O nas
            </Link>
            <Link
              href="/kontakt"
              className={`font-medium transition-colors ${isActive('/kontakt') ? 'text-wood-600' : 'text-gray-700 hover:text-wood-600'
                }`}
            >
              Kontakt
            </Link>
          </div>

          {/* Cart, Login & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Login Button */}
            <LoginButton />

            {/* Cart */}
            <Link
              href="/koszyk"
              className="relative p-2 text-gray-700 hover:text-wood-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-wood-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Strona główna
              </Link>
              <Link
                href="/sklep"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-wood-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sklep
              </Link>
              <Link
                href="/o-nas"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-wood-600 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                O nas
              </Link>
              <Link
                href="/kontakt"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-wood-600 hover:bg-gray-50"
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