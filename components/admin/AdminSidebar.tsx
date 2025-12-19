'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, Package, GraduationCap, Calendar, ShoppingCart, Users, FileText, Settings } from 'lucide-react';

interface AdminSidebarProps {
  userName: string;
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

export default function AdminSidebar({ userName }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-graphite-900 flex flex-col border-r border-cream-200/10 min-h-screen">
      <div className="p-6 border-b border-cream-200/10">
        <h2 className="text-2xl font-serif font-bold text-gold-400 mb-1">
          Panel Admina
        </h2>
        <p className="text-sm text-cream-300/70">
          Witaj, <span className="font-semibold text-gold-400">{userName}</span>
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
  );
}
