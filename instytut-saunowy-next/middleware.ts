import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    // Sprawdź rolę dla panelu admina
    if (req.nextUrl.pathname.startsWith('/admin')) {
      const token = req.nextauth.token;

      if (token?.role !== 'admin') {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);


export const config = {
  matcher: [
    '/admin/:path*',
    '/moje-konto/:path*',
    '/zamowienia/:path*',
  ],
};
