'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ChevronDown } from 'lucide-react';
import { IProduct, IProductVariant } from '@/types';
import { getCartRecommendations } from '@/lib/client/recommendations';
import { formatPriceExact } from '@/lib/utils/currency';
import { useCart } from '@/contexts/CartContext';

interface CartRecommendationsProps {
  cartProducts: IProduct[];
  allProducts: IProduct[];
  title?: string;
  maxItems?: number;
  className?: string;
}

export default function CartRecommendations({
  cartProducts,
  allProducts,
  title = "Dopełnij swój Rytuał",
  maxItems = 6,
  className = ""
}: CartRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<IProduct[]>([]);
  const { addToCart } = useCart();
  const [addingProductId, setAddingProductId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Quick Select Modal state
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState<IProduct | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  useEffect(() => {
    const recommended = getCartRecommendations(cartProducts, allProducts, maxItems);
    setRecommendations(recommended);
  }, [cartProducts, allProducts, maxItems]);

  // Check scroll position for arrow visibility
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, [recommendations]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 260;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Check if product has selectable variants
  const hasVariants = (product: IProduct): boolean => {
    return product.variants && product.variants.length > 0 &&
           product.variants.some(v => v.options && v.options.length > 1);
  };

  // Handle button click - open modal for variable products, add directly for simple
  const handleProductAction = (product: IProduct) => {
    if (hasVariants(product)) {
      // Open modal for variant selection
      setActiveQuickViewProduct(product);
      // Pre-select first option for each variant
      const defaults: Record<string, string> = {};
      product.variants.forEach(variant => {
        if (variant.options.length > 0) {
          defaults[variant.id] = variant.options[0].id;
        }
      });
      setSelectedVariants(defaults);
    } else {
      // Add directly for simple products
      handleQuickAdd(product);
    }
  };

  // Direct add (for simple products)
  const handleQuickAdd = async (product: IProduct) => {
    setAddingProductId(product._id);

    const defaultVariants: Record<string, string> = {};
    product.variants.forEach(variant => {
      if (variant.options.length > 0) {
        defaultVariants[variant.id] = variant.options[0].id;
      }
    });

    addToCart(product, defaultVariants, 1);

    setTimeout(() => {
      setAddingProductId(null);
    }, 800);
  };

  // Add from modal with selected variants
  const handleAddFromModal = () => {
    if (!activeQuickViewProduct) return;

    setAddingProductId(activeQuickViewProduct._id);
    addToCart(activeQuickViewProduct, selectedVariants, 1);

    setTimeout(() => {
      setAddingProductId(null);
      setActiveQuickViewProduct(null);
      setSelectedVariants({});
    }, 600);
  };

  // Close modal
  const closeModal = () => {
    setActiveQuickViewProduct(null);
    setSelectedVariants({});
  };

  // Select variant option
  const selectVariantOption = (variantId: string, optionId: string) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantId]: optionId
    }));
  };

  // Check if all required variants are selected
  const allVariantsSelected = (): boolean => {
    if (!activeQuickViewProduct) return false;
    return activeQuickViewProduct.variants.every(
      variant => selectedVariants[variant.id]
    );
  };

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <>
      <section className={`py-4 ${className}`}>
        {/* Header - De-emphasized */}
        <div className="mb-3">
          <h2 className="font-fraunces text-lg text-stone-600">
            {title}
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative group/carousel">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className={`
              hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10
              w-10 h-10 items-center justify-center
              bg-[#F0ECE2] border border-[#2C2622]/10 rounded-full shadow-lg
              text-[#2C2622] hover:text-[#C47F52] hover:border-[#C47F52]/30
              transition-all duration-200
              -translate-x-1/2
              ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
            aria-label="Przewiń w lewo"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {/* Scroll Container - Stage padding on mobile */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 md:gap-4 pb-2 pl-2 pr-4 -mr-4 md:pl-1 md:pr-1 md:mx-0 scrollbar-hide"
          >
            {recommendations.map((product) => {
              const isVariable = hasVariants(product);
              const isAdding = addingProductId === product._id;

              return (
                <div
                  key={product._id}
                  className="flex-shrink-0 w-[130px] md:w-[160px] snap-start group flex flex-col"
                >
                  {/* Product Image - Thumbnail sized */}
                  <Link href={`/produkt/${product.slug}`}>
                    <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-stone-200 mb-1.5">
                      {product.images[0]?.url ? (
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 130px, 160px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-400">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}

                      {/* "POLECANE" label - Smaller on mobile */}
                      <div className="absolute top-1.5 left-1.5">
                        <span className="inline-block bg-[#F0ECE2]/90 backdrop-blur-sm text-[#C47F52] text-[8px] md:text-[9px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded-sm">
                          Polecane
                        </span>
                      </div>
                    </div>
                  </Link>

                  {/* Product Info - Compact */}
                  <div className="flex flex-col flex-grow">
                    <Link href={`/produkt/${product.slug}`}>
                      <h3 className="text-xs font-medium text-[#2C2622] truncate w-full group-hover:text-[#C47F52] transition-colors leading-tight">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Price & Button Row */}
                    <div className="flex items-center justify-between gap-1.5 mt-1">
                      <span className="text-[11px] text-stone-500">
                        {formatPriceExact(product.basePrice)}
                      </span>

                      {/* Action Button - Smaller */}
                      <button
                        onClick={() => handleProductAction(product)}
                        disabled={isAdding}
                        className={`
                          inline-flex items-center gap-0.5
                          border rounded-full px-2 py-0.5 text-[9px] uppercase tracking-wide font-medium
                          transition-all duration-200
                          ${isAdding
                            ? 'bg-[#C47F52] border-[#C47F52] text-white'
                            : 'border-[#2C2622]/20 text-[#2C2622] hover:bg-[#2C2622] hover:border-[#2C2622] hover:text-white'
                          }
                        `}
                      >
                        {isAdding ? (
                          'Dodano'
                        ) : isVariable ? (
                          <>
                            <span>Wybierz</span>
                            <ChevronDown className="w-2.5 h-2.5" strokeWidth={2} />
                          </>
                        ) : (
                          'Dodaj'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className={`
              hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10
              w-10 h-10 items-center justify-center
              bg-[#F0ECE2] border border-[#2C2622]/10 rounded-full shadow-lg
              text-[#2C2622] hover:text-[#C47F52] hover:border-[#C47F52]/30
              transition-all duration-200
              translate-x-1/2
              ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
            aria-label="Przewiń w prawo"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

      </section>

      {/* Quick Select Modal */}
      {activeQuickViewProduct && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#2C2622]/40 backdrop-blur-sm" />

          {/* Modal Card */}
          <div
            className="relative bg-[#F0ECE2] border border-[#2C2622]/10 w-full max-w-md rounded-t-xl md:rounded-lg p-6 shadow-2xl animate-modal-slide-up md:animate-modal-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-stone-400 hover:text-[#2C2622] transition-colors"
              aria-label="Zamknij"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>

            {/* Header */}
            <div className="mb-6 pr-8">
              <p className="text-[10px] uppercase tracking-widest text-[#C47F52] mb-1">
                Szybki wybór
              </p>
              <h3 className="font-fraunces text-xl text-[#2C2622]">
                {activeQuickViewProduct.name}
              </h3>
              <p className="text-sm text-stone-500 mt-1">
                {formatPriceExact(activeQuickViewProduct.basePrice)}
              </p>
            </div>

            {/* Variant Selectors */}
            <div className="space-y-5 mb-6">
              {activeQuickViewProduct.variants.map((variant: IProductVariant) => (
                <div key={variant.id}>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-2">
                    {variant.name}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map((option) => {
                      const isSelected = selectedVariants[variant.id] === option.id;
                      return (
                        <button
                          key={option.id}
                          onClick={() => selectVariantOption(variant.id, option.id)}
                          className={`
                            px-4 py-2 text-sm rounded-sm border transition-all duration-150
                            ${isSelected
                              ? 'bg-[#2C2622] text-white border-[#2C2622]'
                              : 'bg-transparent text-[#2C2622] border-[#2C2622]/20 hover:border-[#C47F52]'
                            }
                          `}
                        >
                          {option.value}
                          {option.priceModifier !== undefined && option.priceModifier !== null && option.priceModifier !== 0 && (
                            <span className="ml-1 text-xs opacity-70">
                              {option.priceModifier > 0 ? '+' : ''}{option.priceModifier} zł
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddFromModal}
              disabled={!allVariantsSelected() || addingProductId === activeQuickViewProduct._id}
              className={`
                w-full py-3.5 rounded-lg font-medium uppercase tracking-widest text-xs
                transition-all duration-200
                ${allVariantsSelected()
                  ? 'bg-[#C47F52] text-white hover:brightness-110'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }
                ${addingProductId === activeQuickViewProduct._id ? 'bg-[#2C2622] text-white' : ''}
              `}
            >
              {addingProductId === activeQuickViewProduct._id
                ? 'Dodano do koszyka'
                : 'Dodaj do koszyka'
              }
            </button>

            {/* View Full Product Link */}
            <Link
              href={`/produkt/${activeQuickViewProduct.slug}`}
              className="block text-center text-xs text-stone-500 hover:text-[#2C2622] mt-3 underline underline-offset-2"
              onClick={closeModal}
            >
              Zobacz pełne szczegóły
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
