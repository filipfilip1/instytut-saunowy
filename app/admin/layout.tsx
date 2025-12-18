'use client';

import { useRequireAuth } from '@/hooks/useRequireAuth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { Home, LayoutDashboard, Package, GraduationCap, Calendar, ShoppingCart, Users, FileText, Settings } from 'lucide-react';


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
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Produkty', icon: Package },
    { href: '/admin/trainings', label: 'Szkolenia', icon: GraduationCap },
    { href: '/admin/bookings', label: 'Rezerwacje', icon: Calendar },
    { href: '/admin/orders', label: 'Zamówienia', icon: ShoppingCart },
    { href: '/admin/customers', label: 'Klienci', icon: Users },
    { href: '/admin/content', label: 'Treści', icon: FileText },
    { href: '/admin/settings', label: 'Ustawienia', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-cream-50 flex">
      <div className="flex w-full">
        {/* Sidebar */}
        <aside className="w-64 bg-graphite-900 flex flex-col border-r border-cream-200/10 min-h-screen">
          <div className="p-6 border-b border-cream-200/10">
            <h2 className="text-2xl font-serif font-bold text-gold-400 mb-1">
              Panel Admina
            </h2>
            <p className="text-sm text-cream-300/70">
              Witaj, <span className="font-semibold text-gold-400">{session.user.name}</span>
            </p>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/admin' && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 transition-colors duration-200 group relative ${
                    isActive ? 'text-gold-400' : 'text-cream-200 hover:text-gold-400'
                  }`}
                >
                  {/* Active indicator - gold line on left */}
                  <span className={`absolute left-0 top-0 bottom-0 w-0.5 bg-gold-400 transition-opacity ${
                    isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}></span>
                  <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                  <span className="font-light tracking-wide">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-cream-200/10">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-cream-300/70 hover:text-gold-400 transition-colors duration-200"
            >
              <Home className="w-5 h-5" strokeWidth={1.5} />
              <span className="font-light">Wróć do sklepu</span>
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-cream-50">
          <div className="max-w-6xl mx-auto p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}