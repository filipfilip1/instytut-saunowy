'use client';

import { useRequireAuth } from '@/hooks/useRequireAuth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';


interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { session, status } = useRequireAuth('admin');
  const pathname = usePathname();

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-forest-200 border-t-forest-600 mx-auto"></div>
          <p className="mt-6 text-graphite-700 font-medium text-lg">Ładowanie panelu...</p>
        </div>
      </div>
    );
  }

  if (!session || session.user.role !== 'admin') {
    return null;
  }

  const menuItems = [
    { href: '/admin', label: '📊 Dashboard', icon: '📊' },
    { href: '/admin/products', label: '📦 Produkty', icon: '📦' },
    { href: '/admin/orders', label: '🛒 Zamówienia', icon: '🛒' },
    { href: '/admin/customers', label: '👥 Klienci', icon: '👥' },
    { href: '/admin/content', label: '📝 Treści', icon: '📝' },
    { href: '/admin/settings', label: '⚙️ Ustawienia', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-cream-200">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 bg-gradient-to-b from-graphite-900 via-graphite-900 to-forest-900 shadow-2xl min-h-screen">
          <div className="p-8 border-b border-cream-700/20">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🏛️</span>
              <h2 className="text-2xl font-serif font-bold text-cream-100">Panel Admina</h2>
            </div>
            <p className="text-sm text-cream-300 pl-11">
              Witaj, <span className="font-semibold text-gold-400">{session.user.name}</span>
            </p>
          </div>

          <nav className="mt-8 px-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/admin' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center px-5 py-3.5 mb-2 rounded-2xl text-cream-200 hover:bg-forest-700/50 transition-all font-medium
                    ${isActive ? 'bg-forest-600 shadow-lg text-white border-l-4 border-gold-400' : ''}
                  `}
                >
                  <span className="mr-4 text-2xl">{item.icon}</span>
                  <span>{item.label.split(' ')[1]}</span>
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-0 w-72 p-6 border-t border-cream-700/20">
            <Link
              href="/"
              className="flex items-center text-cream-300 hover:text-gold-400 transition-colors group"
            >
              <svg className="w-5 h-5 mr-3 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">Wróć do sklepu</span>
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-10">
          {children}
        </main>
      </div>
    </div>
  );
}