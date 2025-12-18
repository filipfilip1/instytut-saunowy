import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Home, LayoutDashboard, Package, Calendar, User } from 'lucide-react';

export const metadata = {
  title: 'Moje Konto - Instytut Saunowy',
  description: 'Panel użytkownika - zamówienia, rezerwacje, profil',
};

interface MenuItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const menuItems: MenuItem[] = [
  { href: '/moje-konto', label: 'Pulpit', icon: LayoutDashboard },
  { href: '/moje-konto/zamowienia', label: 'Historia zakupów', icon: Package },
  { href: '/moje-konto/rezerwacje', label: 'Moje szkolenia', icon: Calendar },
  { href: '/moje-konto/profil', label: 'Ustawienia konta', icon: User },
];

export default async function UserPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Redirect if not authenticated
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/moje-konto');
  }

  return (
    <div className="min-h-screen bg-cream-50 flex">
      {/* Sidebar - Premium Style */}
      <aside className="w-64 bg-graphite-900 flex flex-col border-r border-cream-200/10">
        {/* Header */}
        <div className="p-6 border-b border-cream-200/10">
          <h2 className="text-2xl font-serif font-bold text-gold-400 mb-1">
            Moje Konto
          </h2>
          <p className="text-sm text-cream-300/70 truncate">{session.user?.email}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-cream-200 hover:text-gold-400 transition-colors duration-200 group relative"
              >
                {/* Active indicator - gold line on left */}
                <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold-400 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                <span className="font-light tracking-wide">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Back to shop */}
        <div className="p-4 border-t border-cream-200/10">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-cream-300/70 hover:text-gold-400 transition-colors duration-200"
          >
            <Home className="w-5 h-5" strokeWidth={1.5} />
            <span className="font-light">Powrót do sklepu</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-cream-50">
        <div className="max-w-6xl mx-auto p-8">{children}</div>
      </main>
    </div>
  );
}
