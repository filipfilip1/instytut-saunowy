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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ładowanie panelu...</p>
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
    { href: '/admin/trainings', label: '🎓 Szkolenia', icon: '🎓' },
    { href: '/admin/orders', label: '🛒 Zamówienia', icon: '🛒' },
    { href: '/admin/customers', label: '👥 Klienci', icon: '👥' },
    { href: '/admin/content', label: '📝 Treści', icon: '📝' },
    { href: '/admin/settings', label: '⚙️ Ustawienia', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-screen">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800">Panel Admina</h2>
            <p className="text-sm text-gray-600 mt-1">
              Witaj, {session.user.name}
            </p>
          </div>

          <nav className="mt-6">
            {menuItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/admin' && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors
                    ${isActive ? 'bg-blue-50 border-r-4 border-blue-600 text-blue-600' : ''}
                  `}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label.split(' ')[1]}</span>
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-0 w-64 p-6">
            <Link
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Wróć do sklepu
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}