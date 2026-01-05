'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import LoginButton from '@/components/auth/LoginButton';
import AnimatedNumber from '@/components/animations/AnimatedNumber';
import { BRAND } from '@/constants/brand';
import { IProduct } from '@/types';

const Header = () => {
  const pathname = usePathname();
  const { getItemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
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

  // Scroll detection for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  // Navigation items for reuse
  const navItems = [
    { href: '/', label: 'Strona główna' },
    { href: '/sklep', label: 'Sklep' },
    { href: '/szkolenia', label: 'Szkolenia' },
    { href: '/akademia', label: 'Akademia' },
    { href: '/zawody-moa', label: 'Zawody MoA' },
    { href: '/o-nas', label: 'O nas' },
    { href: '/kontakt', label: 'Kontakt' },
  ];

  return (
    <>
      {/* Main Header - Slim & Elegant */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
          scrolled
            ? 'bg-wood/95 backdrop-blur-md shadow-2xl'
            : 'bg-wood shadow-none'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center group shrink-0">
              <Image
                src={BRAND.logo.url.header}
                alt={BRAND.logo.alt}
                width={BRAND.logo.dimensions.header.width}
                height={BRAND.logo.dimensions.header.height}
                priority
                className="h-7 w-auto md:h-8 transition-opacity group-hover:opacity-80"
              />
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`uppercase text-[11px] tracking-[0.2em] font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-copper'
                      : 'text-oat/90 hover:text-copper'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-1 md:space-x-2">
              {/* Search Icon - Desktop */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="hidden lg:flex p-2 text-oat/80 hover:text-copper rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px]" />
              </button>

              {/* User Account - Desktop */}
              <div className="hidden md:block">
                <LoginButton />
              </div>

              {/* Cart */}
              <Link
                href="/koszyk"
                className="relative p-2 text-oat/80 hover:text-copper rounded-lg transition-colors"
              >
                <ShoppingCart className="w-[18px] h-[18px]" />
                {getItemCount() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-copper text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-semibold tabular-nums">
                    <AnimatedNumber value={getItemCount()} />
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2 text-oat hover:text-copper rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Otwórz menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop Search Dropdown */}
        {searchOpen && (
          <div className="hidden lg:block absolute top-full left-0 right-0 bg-wood border-t border-wood-700">
            <div className="max-w-2xl mx-auto px-4 py-4">
              <div className="relative">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-copper" />
                <input
                  type="text"
                  placeholder="Czego szukasz?"
                  className="w-full bg-transparent border-b border-oat/20 py-3 pl-8 pr-4 text-oat placeholder-oat/40 focus:outline-none focus:border-copper transition-colors"
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed header */}
      <div className="h-16" aria-hidden="true" />

      {/* Mobile Menu - Luxury Fullscreen Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-wood overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-wood via-wood to-wood-900 opacity-100" />

          {/* Content container */}
          <div className="relative h-full flex flex-col">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-5">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="transition-opacity hover:opacity-80"
              >
                <Image
                  src={BRAND.logo.url.header}
                  alt={BRAND.logo.alt}
                  width={BRAND.logo.dimensions.header.width}
                  height={BRAND.logo.dimensions.header.height}
                  className="h-7 w-auto"
                />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 -mr-2 text-oat/60 hover:text-oat transition-colors"
                aria-label="Zamknij menu"
              >
                <X className="w-7 h-7" strokeWidth={1.5} />
              </button>
            </div>

            {/* Ghost Search Input */}
            <div className="px-6 pt-4 pb-8">
              <div className="relative">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-copper" />
                <input
                  type="text"
                  value={mobileSearchQuery}
                  onChange={(e) => setMobileSearchQuery(e.target.value)}
                  placeholder="Szukaj..."
                  className="w-full bg-transparent border-b border-oat/20 py-3 pl-8 pr-4 text-lg text-oat placeholder-oat/40 focus:outline-none focus:border-copper transition-colors"
                />
              </div>
            </div>

            {/* Navigation Links - Large Serif Style */}
            <nav className="flex-1 px-6 overflow-y-auto">
              <ul className="space-y-1">
                {navItems.map((item, index) => (
                  <li
                    key={item.href}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-4 font-serif text-3xl transition-colors ${
                        isActive(item.href)
                          ? 'text-copper'
                          : 'text-oat/90 hover:text-copper'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer Section */}
            <div className="px-6 py-8 border-t border-oat/10">
              <div className="flex items-center justify-between">
                <Link
                  href="/moje-konto"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-widest text-copper hover:text-copper-400 transition-colors"
                >
                  Moje konto
                </Link>
                <Link
                  href="/koszyk"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm uppercase tracking-widest text-oat/60 hover:text-oat transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Koszyk</span>
                  {getItemCount() > 0 && (
                    <span className="bg-copper text-white text-xs px-2 py-0.5 rounded-full">
                      {getItemCount()}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
