'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { IProduct } from '@/types';
import { useCart } from '@/contexts/CartContext';
import VariantSelector from '@/components/products/VariantSelector';
import Toast from '@/components/ui/Toast';
import ProductImageFallback from '@/components/ui/ProductImageFallback';
import { formatPriceExact } from '@/lib/utils/currency';
import { addToRecentlyViewed } from '@/lib/client/recentlyViewed';
import RecentlyViewed from '@/components/products/RecentlyViewed';
import ProductRecommendations from '@/components/products/ProductRecommendations';
import { ChevronDown, Truck, RefreshCw, Shield } from 'lucide-react';

interface ProductDetailClientProps {
  product: IProduct;
  allProducts: IProduct[];
}

export default function ProductDetailClient({ product, allProducts }: ProductDetailClientProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [shakeSelectors, setShakeSelectors] = useState(false);
  const [showMissingOptionsToast, setShowMissingOptionsToast] = useState(false);

  const isAdmin = session?.user?.role === 'admin';

  // Track product view in recently viewed
  useEffect(() => {
    addToRecentlyViewed(product);
  }, [product]);

  const calculatePrice = () => {
    let totalPrice = product.basePrice;

    product.variants.forEach(variant => {
      const selectedOptionId = selectedVariants[variant.id];
      if (selectedOptionId) {
        const option = variant.options.find(opt => opt.id === selectedOptionId);
        if (option?.priceModifier) {
          totalPrice += option.priceModifier;
        }
      }
    });

    return totalPrice * quantity;
  };

  const handleAddToCart = () => {
    // Check if all variants are selected
    const allVariantsSelected = product.variants.every(variant =>
      selectedVariants[variant.id]
    );

    if (!allVariantsSelected || quantity < 1) {
      // Trigger shake animation on selectors
      setShakeSelectors(true);
      setShowMissingOptionsToast(true);

      // Reset shake after animation
      setTimeout(() => setShakeSelectors(false), 500);

      // Hide toast after 3 seconds
      setTimeout(() => setShowMissingOptionsToast(false), 3000);

      return;
    }

    // Proceed with adding to cart
    addToCart(product, selectedVariants, quantity);
    setShowAddedMessage(true);
  };

  return (
    <>
      {/* Main Content - Atelier Layout */}
      <div className="w-full max-w-[100vw] bg-[#F0ECE2] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            {/* Left Column - Vertical Stack Gallery */}
            <div className="space-y-4">
              {product.images.slice(0, 3).map((image, index) => (
                <div
                  key={image.id}
                  className="relative w-full aspect-[4/3] overflow-hidden rounded-sm bg-[#2C2622]/10"
                >
                  {image.url ? (
                    <Image
                      src={image.url}
                      alt={image.alt || `${product.name} - ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  ) : (
                    <ProductImageFallback
                      productName={product.name}
                      className="w-full h-full"
                      iconSize={96}
                    />
                  )}
                </div>
              ))}
            </div>

          {/* Right Column - Product Info (Sticky) */}
          <div className="lg:sticky lg:top-24 lg:h-fit space-y-6">
            {/* Title - Fraunces Serif */}
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#2C2622] leading-tight">
              {product.name}
            </h1>

            {/* Price - Manrope Sans, Copper */}
            <div className="flex items-baseline gap-3">
              <span className="text-2xl md:text-3xl font-bold text-[#C47F52] tabular-nums">
                {formatPriceExact(calculatePrice() / quantity)}
              </span>
              {product.priceRange && product.priceRange.min !== product.priceRange.max && (
                <span className="text-sm text-stone-500">
                  {formatPriceExact(product.priceRange.min)} - {formatPriceExact(product.priceRange.max)}
                </span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-sm md:text-base text-stone-600 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Variant Selector */}
            {product.variants.length > 0 && (
              <div className={`transition-transform ${shakeSelectors ? 'animate-shake' : ''}`}>
                <VariantSelector
                  variants={product.variants}
                  onChange={setSelectedVariants}
                  basePrice={product.basePrice}
                />
              </div>
            )}

            {/* Quantity & CTA - The Buy Box */}
            {!isAdmin && (
              <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                {/* Quantity - Minimalist with Rounded Buttons */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center border border-[#2C2622]/20 rounded-full hover:border-[#C47F52] transition-colors text-[#2C2622] text-lg"
                    aria-label="Zmniejsz ilość"
                  >
                    −
                  </button>
                  <span className="font-serif text-xl text-[#2C2622] tabular-nums min-w-[2rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center border border-[#2C2622]/20 rounded-full hover:border-[#C47F52] transition-colors text-[#2C2622] text-lg"
                    aria-label="Zwiększ ilość"
                  >
                    +
                  </button>
                </div>

                {/* CTA Button - ALWAYS ACTIVE, ALWAYS COPPER */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#C47F52] text-white py-3 md:py-3.5 px-6 rounded-md font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all"
                >
                  Dodaj do koszyka
                </button>
              </div>
            )}

            {/* Success notification */}
            {showAddedMessage && (
              <div className="p-4 bg-[#C47F52]/10 border border-[#C47F52]/30 text-[#2C2622] rounded-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium">✓ Produkt został dodany do koszyka</span>
                  <Link
                    href="/koszyk"
                    className="text-[#C47F52] underline font-bold hover:text-[#2C2622] transition-colors"
                  >
                    Zobacz koszyk
                  </Link>
                </div>
              </div>
            )}

            {/* Missing Options Toast */}
            {showMissingOptionsToast && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-sm text-sm">
                Wybierz wszystkie opcje produktu przed dodaniem do koszyka
              </div>
            )}

            {/* Trust Badges - Simple horizontal row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-2">
              <span className="flex items-center gap-1.5">
                <span className="text-[#C47F52]">✓</span> Szybka wysyłka
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#C47F52]">✓</span> 30 dni na zwrot
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#C47F52]">✓</span> 2 lata gwarancji
              </span>
            </div>

            {/* Accordions - Features, Delivery, Returns */}
            <div className="space-y-0 pt-6 border-t border-[#2C2622]/10">
              {/* Features Accordion */}
              {product.features && product.features.length > 0 && (
                <div className="border-b border-[#2C2622]/10">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'features' ? null : 'features')}
                    className="w-full flex items-center justify-between py-4 text-left"
                  >
                    <span className="text-sm font-bold text-[#2C2622] uppercase tracking-wide">
                      Cechy produktu
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#2C2622] transition-transform ${
                        openAccordion === 'features' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openAccordion === 'features' && (
                    <div className="pb-4">
                      <ul className="space-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-stone-600 text-sm">
                            <span className="text-[#C47F52] mt-0.5">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Delivery Accordion */}
              <div className="border-b border-[#2C2622]/10">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'delivery' ? null : 'delivery')}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span className="text-sm font-bold text-[#2C2622] uppercase tracking-wide">
                    Dostawa
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#2C2622] transition-transform ${
                      openAccordion === 'delivery' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'delivery' && (
                  <div className="pb-4 space-y-2 text-sm text-stone-600">
                    <p>• Darmowa dostawa od 200 zł</p>
                    <p>• Wysyłka w ciągu 24h (dni robocze)</p>
                    <p>• Kurier DPD lub InPost Paczkomaty</p>
                  </div>
                )}
              </div>

              {/* Returns Accordion */}
              <div className="border-b border-[#2C2622]/10">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'returns' ? null : 'returns')}
                  className="w-full flex items-center justify-between py-4 text-left"
                >
                  <span className="text-sm font-bold text-[#2C2622] uppercase tracking-wide">
                    Zwroty
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#2C2622] transition-transform ${
                      openAccordion === 'returns' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'returns' && (
                  <div className="pb-4 space-y-2 text-sm text-stone-600">
                    <p>• 30 dni na zwrot towaru</p>
                    <p>• Bezpłatny zwrot w Polsce</p>
                    <p>• Pełen zwrot kosztów zakupu</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      {/* Product Recommendations */}
      <div className="max-w-7xl mx-auto md:px-6 lg:px-8 py-6 md:py-12">
        <ProductRecommendations
          baseProduct={product}
          allProducts={allProducts}
          title="Może Ci się spodobać"
          maxItems={6}
        />
      </div>

      {/* Recently Viewed Products */}
      <div className="max-w-7xl mx-auto md:px-6 lg:px-8 py-6 md:py-12">
        <RecentlyViewed excludeProductId={product._id} maxItems={6} />
      </div>

      {/* Toast notification */}
      {showAddedMessage && (
        <Toast
          message="Produkt został dodany do koszyka"
          type="success"
          onClose={() => setShowAddedMessage(false)}
          action={{
            label: 'Zobacz koszyk',
            onClick: () => router.push('/koszyk')
          }}
        />
      )}
    </>
  );
}
