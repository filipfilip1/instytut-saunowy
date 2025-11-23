'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function LoginButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />;
  }

  if (session) {
    return (
      <div className="relative group">
        <button className="flex items-center space-x-2 min-w-[44px] min-h-[44px]">
          <img
            src={session.user.image || '/default-avatar.png'}
            alt={session.user.name || 'User'}
            className="w-8 h-8 rounded-full"
          />
          <span className="hidden md:block text-sm">{session.user.name}</span>
        </button>

        {/* Dropdown menu - responsive width and tap targets */}
        <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-48 max-w-[200px] bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
          {session.user.role === 'admin' && (
            <Link
              href="/admin"
              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 min-h-[44px] flex items-center"
            >
              🔧 Panel admina
            </Link>
          )}
          <Link
            href="/moje-konto"
            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 min-h-[44px] flex items-center"
          >
            👤 Moje konto
          </Link>
          <Link
            href="/zamowienia"
            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 min-h-[44px] flex items-center"
          >
            📦 Moje zamówienia
          </Link>
          <hr className="my-1" />
          <button
            onClick={() => signOut()}
            className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 min-h-[44px] flex items-center"
          >
            🚪 Wyloguj
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('google')}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 min-h-[44px] rounded-lg text-sm font-medium transition-colors"
    >
      Zaloguj się
    </button>
  );
}
