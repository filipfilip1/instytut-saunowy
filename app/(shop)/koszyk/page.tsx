'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCart } from '@/contexts/CartContext';
import { IProduct, IProductVariant, IVariantOption } from '@/types';
import ProductImageFallback from '@/components/ui/ProductImageFallback';
import { formatPriceExact } from '@/lib/utils/currency';
import { User, UserCheck, ShoppingCart, X, Check, ShieldCheck, RefreshCcw } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { items, updateQuantity, removeFromCart, getTotal } = useCart();

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

    return displays.join(", ");
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Koszyk</h1>

          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <ShoppingCart className="w-24 h-24 text-gray-400 mx-auto mb-4" strokeWidth={1.5} />

            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Twój koszyk jest pusty
            </h2>
            <p className="text-gray-600 mb-6">
              Dodaj produkty do koszyka, aby móc złożyć zamówienie.
            </p>

            <Link
              href="/sklep"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Przejdź do sklepu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Auth status indicator */}
        <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
          {session ? (
            <>
              <UserCheck className="w-4 h-4 text-green-600" />
              <span>Zalogowany jako <span className="font-medium">{session.user?.email}</span></span>
            </>
          ) : (
            <>
              <User className="w-4 h-4 text-gray-500" />
              <span>Kupujesz jako gość</span>
            </>
          )}
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Koszyk</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product list */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {items.map((item) => (
                <div key={item.id} className="p-6 border-b last:border-b-0">
                  <div className="flex gap-4">
                    {/* Product photo */}
                    <div className="flex-shrink-0">
                      {item.product.images[0]?.url ? (
                        <img
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      ) : (
                        <ProductImageFallback
                          productName={item.product.name}
                          className="w-24 h-24 rounded-lg"
                          iconSize={32}
                        />
                      )}
                    </div>

                    {/* Product information */}
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900">
                        <Link
                          href={`/produkt/${item.product.slug}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {getVariantDisplay(item.product, item.selectedVariants)}
                      </p>
                      <p className="text-lg font-medium text-gray-900 mt-2">
                        {formatPriceExact(item.pricePerItem)}
                      </p>
                    </div>

                    {/* Quantity and removal controls */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        aria-label="Usuń z koszyka"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <div className="flex items-center gap-2 mt-4">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          aria-label="Zmniejsz ilość"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const newQuantity = parseInt(e.target.value) || 0;
                            updateQuantity(item.id, newQuantity);
                          }}
                          className="w-16 text-center border border-gray-300 rounded-lg px-2 py-1"
                          min="0"
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          aria-label="Zwiększ ilość"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-lg font-semibold text-gray-900 mt-2">
                        {formatPriceExact(item.pricePerItem * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Podsumowanie zamówienia
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Produkty ({items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span>{formatPriceExact(getTotal())}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Dostawa</span>
                  <span>Do ustalenia</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-xl font-semibold text-gray-900">
                    <span>Suma</span>
                    <span>{formatPriceExact(getTotal())}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Przejdź do płatności
              </button>

              {!session && (
                <p className="text-center text-sm text-gray-600 mt-3">
                  Masz już konto?{' '}
                  <Link
                    href="/auth/signin?callbackUrl=/koszyk"
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Zaloguj się, aby kupić szybciej
                  </Link>
                </p>
              )}

              <Link
                href="/sklep"
                className="block text-center text-blue-600 hover:text-blue-700 font-medium mt-4 transition-colors"
              >
                Kontynuuj zakupy
              </Link>

              <div className="mt-6 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Darmowa dostawa od 200 zł</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                  <span>Bezpieczne płatności</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCcw className="w-5 h-5 text-green-500" />
                  <span>30 dni na zwrot</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}