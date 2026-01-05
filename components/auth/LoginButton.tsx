'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Settings, LayoutDashboard, Package, Calendar, LogOut } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';

export default function LoginButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />;
  }

  if (session) {
    return (
      <div className="relative group">
        <button className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <Avatar src={session.user.image} name={session.user.name} size="sm" />
          <span className="hidden md:block text-sm font-light text-oat">{session.user.name}</span>
        </button>

        {/* Dropdown menu - Premium Style */}
        <div className="absolute right-0 mt-2 w-56 bg-white border border-cream-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
          {session.user.role === 'admin' ? (
            <>
              <Link
                href="/admin"
                className="flex items-center gap-3 px-4 py-3 text-sm text-graphite-700 hover:bg-cream-50 transition-colors border-b border-cream-200"
              >
                <Settings className="w-4 h-4 text-gold-600" strokeWidth={1.5} />
                <span className="font-light">Panel admina</span>
              </Link>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-graphite-700 hover:bg-cream-50 transition-colors"
              >
                <LogOut className="w-4 h-4 text-graphite-500" strokeWidth={1.5} />
                <span className="font-light">Wyloguj</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/moje-konto"
                className="flex items-center gap-3 px-4 py-3 text-sm text-graphite-700 hover:bg-cream-50 transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-gold-600" strokeWidth={1.5} />
                <span className="font-light">Moje konto</span>
              </Link>
              <Link
                href="/moje-konto/zamowienia"
                className="flex items-center gap-3 px-4 py-3 text-sm text-graphite-700 hover:bg-cream-50 transition-colors"
              >
                <Package className="w-4 h-4 text-gold-600" strokeWidth={1.5} />
                <span className="font-light">Historia zakupów</span>
              </Link>
              <Link
                href="/moje-konto/rezerwacje"
                className="flex items-center gap-3 px-4 py-3 text-sm text-graphite-700 hover:bg-cream-50 transition-colors"
              >
                <Calendar className="w-4 h-4 text-gold-600" strokeWidth={1.5} />
                <span className="font-light">Moje szkolenia</span>
              </Link>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-graphite-700 hover:bg-cream-50 transition-colors border-t border-cream-200"
              >
                <LogOut className="w-4 h-4 text-graphite-500" strokeWidth={1.5} />
                <span className="font-light">Wyloguj</span>
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className="bg-copper hover:bg-copper-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md hover:shadow-lg"
    >
      Zaloguj się
    </button>
  );
}
