'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { IProduct, IProductVariant, IVariantOption } from '@/types';
import { formatPriceRounded } from '@/lib/utils/currency';
import RecentlyViewed from '@/components/products/RecentlyViewed';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, getTotal, clearCart } = useCart();

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
            <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>

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
                      <img
                        src={item.product.images[0]?.url || 'https://via.placeholder.com/100'}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
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
                        {formatPriceRounded(item.pricePerItem)}
                      </p>
                    </div>

                    {/* Quantity and removal controls */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                        aria-label="Usuń z koszyka"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
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
                        {formatPriceRounded(item.pricePerItem * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear cart button */}
              <div className="p-6 bg-gray-50">
                <button
                  onClick={() => {
                    if (window.confirm('Czy na pewno chcesz wyczyścić koszyk?')) {
                      clearCart();
                    }
                  }}
                  className="text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Wyczyść koszyk
                </button>
              </div>
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
                  <span>{formatPriceRounded(getTotal())}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Dostawa</span>
                  <span>Do ustalenia</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-xl font-semibold text-gray-900">
                    <span>Suma</span>
                    <span>{formatPriceRounded(getTotal())}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Przejdź do płatności
              </button>

              <Link
                href="/sklep"
                className="block text-center text-blue-600 hover:text-blue-700 font-medium mt-4 transition-colors"
              >
                Kontynuuj zakupy
              </Link>

              <div className="mt-6 space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Darmowa dostawa od 200 zł</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Bezpieczne płatności</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>30 dni na zwrot</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recently Viewed Products */}
        <div className="mt-12">
          <RecentlyViewed title="Może Cię zainteresować" maxItems={6} />
        </div>
      </div>
    </div>
  );
}