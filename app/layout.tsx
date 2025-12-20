import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';
import { QuickViewProvider } from '@/contexts/QuickViewContext';
import AuthProvider from '@/components/providers/AuthProvider';
import ToastProvider from '@/components/providers/ToastProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import QuickViewModal from '@/components/products/QuickViewModal';
import CookieBanner from '@/components/cookie/CookieBanner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
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
      <body className={`${inter.variable} ${cormorant.variable} font-sans`}>
        <AuthProvider>
          <CartProvider>
            <QuickViewProvider>
              <ToastProvider>
                <div className="min-h-screen flex flex-col bg-cream-200">
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