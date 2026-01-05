import type { Metadata } from 'next';
import { Manrope, Fraunces } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';
import { QuickViewProvider } from '@/contexts/QuickViewContext';
import AuthProvider from '@/components/providers/AuthProvider';
import ToastProvider from '@/components/providers/ToastProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import QuickViewModal from '@/components/products/QuickViewModal';
import CookieBanner from '@/components/cookie/CookieBanner';

// Warm Premium Design System - Typography
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-manrope',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Instytut Saunowy - Odzież do saunowania',
  description: 'Wysokiej jakości odzież i akcesoria do sauny. Kilty, poncha, ręczniki.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={`${manrope.variable} ${fraunces.variable} font-sans`}>
        <AuthProvider>
          <CartProvider>
            <QuickViewProvider>
              <ToastProvider>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-grow">
                    {children}
                  </main>
                  <Footer />
                </div>
              </ToastProvider>
              <QuickViewModal />
              <CookieBanner />
            </QuickViewProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}