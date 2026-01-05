'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { IProduct, IProductVariant, IVariantOption } from '@/types';
import ProductImageFallback from '@/components/ui/ProductImageFallback';
import { formatPriceExact } from '@/lib/utils/currency';
import {
  ShoppingBag,
  Minus,
  Plus,
  Lock,
  Truck,
  RotateCcw,
  ChevronUp,
  ArrowRight
} from 'lucide-react';
import CartRecommendationsWrapper from './CartRecommendationsWrapper';
import RecentlyViewed from '@/components/products/RecentlyViewed';

export default function CartPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, updateQuantity, removeFromCart, getTotal } = useCart();
  const [mobileDetailsOpen, setMobileDetailsOpen] = useState(false);

  const getVariantDisplay = (product: IProduct, selectedVariants: Record<string, string>) => {
    const displays: string[] = [];

    product.variants.forEach((variant: IProductVariant) => {
      const selectedOptionId = selectedVariants[variant.id];
      if (selectedOptionId) {
        const option = variant.options.find((opt: IVariantOption) => opt.id === selectedOptionId);
        if (option) {
          displays.push(`${variant.name}: ${option.value}`);
        }
      }
    });

    return displays.join(" · ");
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = getTotal();
  const freeShippingThreshold = 200;
  const remainingForFreeShipping = freeShippingThreshold - subtotal;

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F0ECE2]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="max-w-md mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#2C2622]/5 mb-6">
              <ShoppingBag className="w-10 h-10 text-[#2C2622]/40" strokeWidth={1.5} />
            </div>

            <h1 className="font-fraunces text-2xl md:text-3xl text-[#2C2622] mb-3">
              Twój koszyk jest pusty
            </h1>
            <p className="text-stone-500 text-sm mb-8 leading-relaxed">
              Odkryj naszą kolekcję produktów saunowych i rozpocznij swój rytuał odnowy.
            </p>

            <Link
              href="/sklep"
              className="inline-flex items-center gap-2 bg-[#C47F52] text-white px-6 py-3 rounded-lg font-medium uppercase tracking-widest text-xs hover:brightness-110 transition-all"
            >
              <span>Przejdź do sklepu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#F0ECE2] pb-32 lg:pb-24">

        {/* ========================================
            SECTION A: The Transaction (Split Grid)
            ======================================== */}
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 md:py-12">

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-fraunces text-2xl md:text-3xl text-[#2C2622] mb-1">
              Twój Koszyk
            </h1>
            <p className="text-stone-500 text-sm">
              {totalItems} {totalItems === 1 ? 'produkt' : totalItems < 5 ? 'produkty' : 'produktów'}
            </p>
          </div>

          {/* 12-Column Grid: Products + Summary ONLY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

            {/* Left Column: Products (8 cols) */}
            <div className="lg:col-span-8">

              {/* Free shipping progress */}
              {remainingForFreeShipping > 0 && (
                <div className="mb-6 pb-6 border-b border-[#2C2622]/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Truck className="w-4 h-4 text-stone-400" strokeWidth={1.5} />
                    <p className="text-sm text-stone-600">
                      Do darmowej dostawy brakuje <span className="font-medium text-[#2C2622]">{formatPriceExact(remainingForFreeShipping)}</span>
                    </p>
                  </div>
                  <div className="h-1 bg-[#2C2622]/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C47F52] rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Free shipping achieved */}
              {remainingForFreeShipping <= 0 && (
                <div className="mb-6 pb-6 border-b border-[#2C2622]/10">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#C47F52]" strokeWidth={1.5} />
                    <p className="text-sm text-[#2C2622]">
                      Darmowa dostawa
                    </p>
                  </div>
                </div>
              )}

              {/* Product List */}
              <div>
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`py-6 ${index !== items.length - 1 ? 'border-b border-[#2C2622]/10' : ''}`}
                  >
                    {/* Mobile Layout */}
                    <div className="flex gap-4 md:hidden">
                      <Link
                        href={`/produkt/${item.product.slug}`}
                        className="flex-shrink-0 group"
                      >
                        <div className="relative w-20 aspect-[3/4] rounded-sm overflow-hidden bg-stone-200">
                          {item.product.images[0]?.url ? (
                            <Image
                              src={item.product.images[0].url}
                              alt={item.product.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <ProductImageFallback
                              productName={item.product.name}
                              className="w-full h-full"
                              iconSize={24}
                            />
                          )}
                        </div>
                      </Link>

                      <div className="flex-grow min-w-0">
                        <Link href={`/produkt/${item.product.slug}`}>
                          <h3 className="font-fraunces text-base text-[#2C2622] hover:text-[#C47F52] transition-colors line-clamp-2">
                            {item.product.name}
                          </h3>
                        </Link>

                        {getVariantDisplay(item.product, item.selectedVariants) && (
                          <p className="text-xs text-stone-500 mt-0.5">
                            {getVariantDisplay(item.product, item.selectedVariants)}
                          </p>
                        )}

                        <p className="font-fraunces text-lg text-[#2C2622] mt-2">
                          {formatPriceExact(item.pricePerItem * item.quantity)}
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity with border */}
                          <div className="inline-flex items-center gap-3 border border-[#2C2622]/10 rounded-full px-3 py-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-stone-400 hover:text-[#2C2622] transition-colors"
                              aria-label="Zmniejsz ilość"
                            >
                              <Minus className="w-3.5 h-3.5" strokeWidth={1.5} />
                            </button>
                            <span className="text-[#2C2622] font-medium tabular-nums text-sm min-w-[1rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-stone-400 hover:text-[#2C2622] transition-colors"
                              aria-label="Zwiększ ilość"
                            >
                              <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-stone-700 hover:text-red-900 underline decoration-stone-400 transition-colors"
                          >
                            Usuń
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout - 4 Column */}
                    <div className="hidden md:grid md:grid-cols-[auto_1fr_auto_auto] md:gap-6 md:items-center">
                      {/* Col 1: Image */}
                      <Link
                        href={`/produkt/${item.product.slug}`}
                        className="flex-shrink-0 group"
                      >
                        <div className="relative w-24 aspect-[3/4] rounded-sm overflow-hidden bg-stone-200">
                          {item.product.images[0]?.url ? (
                            <Image
                              src={item.product.images[0].url}
                              alt={item.product.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <ProductImageFallback
                              productName={item.product.name}
                              className="w-full h-full"
                              iconSize={24}
                            />
                          )}
                        </div>
                      </Link>

                      {/* Col 2: Title & Variant */}
                      <div className="min-w-0">
                        <Link href={`/produkt/${item.product.slug}`}>
                          <h3 className="font-fraunces text-lg text-[#2C2622] hover:text-[#C47F52] transition-colors line-clamp-2">
                            {item.product.name}
                          </h3>
                        </Link>

                        {getVariantDisplay(item.product, item.selectedVariants) && (
                          <p className="text-xs text-stone-500 mt-1">
                            {getVariantDisplay(item.product, item.selectedVariants)}
                          </p>
                        )}

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-stone-700 hover:text-red-900 underline decoration-stone-400 transition-colors mt-2"
                        >
                          Usuń
                        </button>
                      </div>

                      {/* Col 3: Quantity Selector with border */}
                      <div className="inline-flex items-center gap-3 border border-[#2C2622]/10 rounded-full px-4 py-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-stone-400 hover:text-[#2C2622] transition-colors"
                          aria-label="Zmniejsz ilość"
                        >
                          <Minus className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                        <span className="text-[#2C2622] font-medium tabular-nums min-w-[1.5rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-stone-400 hover:text-[#2C2622] transition-colors"
                          aria-label="Zwiększ ilość"
                        >
                          <Plus className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>

                      {/* Col 4: Price */}
                      <div className="text-right min-w-[100px]">
                        <span className="font-fraunces text-xl text-[#2C2622]">
                          {formatPriceExact(item.pricePerItem * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Link */}
              <div className="mt-6 pt-6 border-t border-[#2C2622]/10">
                <Link
                  href="/sklep"
                  className="inline-flex items-center gap-2 text-stone-500 hover:text-[#2C2622] transition-colors text-sm"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  <span>Kontynuuj zakupy</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Summary Panel (4 cols) */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="sticky top-32">
                <div className="bg-[#F0ECE2] border border-[#2C2622]/20 rounded-lg p-6 shadow-lg shadow-[#2C2622]/5">
                  <h2 className="font-fraunces text-xl text-[#2C2622] mb-5">
                    Podsumowanie
                  </h2>

                  {/* Summary Rows */}
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">Suma częściowa</span>
                      <span className="text-[#2C2622]">{formatPriceExact(subtotal)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-stone-500">Dostawa</span>
                      <span className="text-[#2C2622]">
                        {subtotal >= freeShippingThreshold ? (
                          <span className="text-[#C47F52] font-medium">Gratis</span>
                        ) : (
                          'Obliczona przy kasie'
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-[#2C2622]/20 my-5" />

                  {/* Total - Large & Bold */}
                  <div className="flex justify-between items-baseline">
                    <span className="font-fraunces text-lg text-[#2C2622]">Razem</span>
                    <span className="font-fraunces text-4xl text-[#2C2622]">
                      {formatPriceExact(subtotal)}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckout}
                    className="w-full mt-6 bg-[#C47F52] text-white py-3.5 rounded-lg font-medium uppercase tracking-widest text-xs hover:brightness-110 transition-all"
                  >
                    Przejdź do płatności
                  </button>

                  {/* Login Prompt */}
                  {!session && (
                    <p className="text-center text-xs text-stone-500 mt-3">
                      Masz konto?{' '}
                      <Link
                        href="/auth/signin?callbackUrl=/koszyk"
                        className="text-[#2C2622] hover:text-[#C47F52] transition-colors underline underline-offset-2"
                      >
                        Zaloguj się
                      </Link>
                    </p>
                  )}

                  {/* Trust Badges */}
                  <div className="mt-6 pt-5 border-t border-[#2C2622]/10">
                    <div className="flex items-center justify-center gap-5 text-stone-500">
                      <div className="flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" strokeWidth={1.5} />
                        <span className="text-[10px]">Bezpieczne płatności</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5" strokeWidth={1.5} />
                        <span className="text-[10px]">Szybka wysyłka</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mt-2 text-stone-500">
                      <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span className="text-[10px]">30 dni na zwrot</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END of Transaction Grid */}
        </div>

        {/* ========================================
            SECTION B: Cross-sell (Subtle Footer Extension)
            ======================================== */}
        <div className="w-full max-w-[1400px] mx-auto mt-10 px-4 md:px-8">
          <CartRecommendationsWrapper />
        </div>

        {/* ========================================
            SECTION C: Recently Viewed (Subtle Footer Extension)
            ======================================== */}
        <div className="w-full max-w-[1400px] mx-auto mt-8 px-4 md:px-8">
          <RecentlyViewed title="Ostatnio oglądane" maxItems={6} />
        </div>

      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-50">
        {/* Backdrop */}
        {mobileDetailsOpen && (
          <div
            className="fixed inset-0 bg-[#2C2622]/20 -z-10"
            onClick={() => setMobileDetailsOpen(false)}
          />
        )}

        {/* Details Panel */}
        <div
          className={`
            absolute bottom-full left-0 w-full
            bg-[#F0ECE2] border-t border-[#2C2622]/10
            shadow-xl shadow-[#2C2622]/10
            transition-all duration-300 ease-out
            ${mobileDetailsOpen
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0 pointer-events-none'
            }
          `}
        >
          <div className="p-4 pb-5">
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Suma częściowa</span>
                <span className="text-[#2C2622]">{formatPriceExact(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-500">Dostawa</span>
                <span className="text-[#2C2622]">
                  {subtotal >= freeShippingThreshold ? (
                    <span className="text-[#C47F52] font-medium">Gratis</span>
                  ) : (
                    'Obliczona przy kasie'
                  )}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-5 mt-4 pt-4 border-t border-[#2C2622]/10 text-stone-500">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span className="text-[10px]">Bezpieczne</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span className="text-[10px]">Szybka wysyłka</span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span className="text-[10px]">30 dni zwrot</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dark Bar */}
        <div className="bg-[#2C2622] flex justify-between items-center p-4">
          <button
            onClick={() => setMobileDetailsOpen(!mobileDetailsOpen)}
            className="flex items-center gap-2 text-left"
          >
            <div>
              <p className="text-[10px] text-stone-400 uppercase tracking-wide">Razem</p>
              <p className="font-fraunces text-xl text-white">{formatPriceExact(subtotal)}</p>
            </div>
            <ChevronUp
              className={`w-4 h-4 text-stone-400 transition-transform duration-300 ${mobileDetailsOpen ? 'rotate-180' : ''}`}
              strokeWidth={1.5}
            />
          </button>

          <button
            onClick={handleCheckout}
            className="flex-shrink-0 bg-[#C47F52] text-white px-6 py-3 rounded-sm font-bold uppercase tracking-wider text-xs hover:brightness-110 transition-all"
          >
            Do kasy
          </button>
        </div>
      </div>
    </>
  );
}
