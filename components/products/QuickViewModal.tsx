'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';
import { IProduct } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useQuickView } from '@/contexts/QuickViewContext';
import VariantSelector from '@/components/products/VariantSelector';
import AnimatedNumber from '@/components/animations/AnimatedNumber';
import ProductImageFallback from '@/components/ui/ProductImageFallback';
import { formatPriceRounded } from '@/lib/utils/currency';

export default function QuickViewModal() {
  const { product, isOpen, closeQuickView } = useQuickView();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setQuantity(1);
      setShowSuccess(false);

      // Set default variants
      const defaultVariants: Record<string, string> = {};
      product.variants.forEach(variant => {
        const firstAvailable = variant.options.find(opt => opt.stock > 0);
        if (firstAvailable) {
          defaultVariants[variant.id] = firstAvailable.id;
        }
      });
      setSelectedVariants(defaultVariants);
    }
  }, [product]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeQuickView();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeQuickView]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!product) return null;

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
    return totalPrice;
  };

  const handleAddToCart = () => {
    addToCart(product, selectedVariants, quantity);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      closeQuickView();
    }, 1500);
  };

  const isAddToCartDisabled = () => {
    return !product.variants.every(variant => selectedVariants[variant.id]) || quantity < 1;
  };

  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop - blocks all pointer events */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuickView}
            className="fixed inset-0 bg-graphite-900/90 backdrop-blur-md z-[9998] cursor-pointer"
            style={{ pointerEvents: 'auto' }}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl pointer-events-auto max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeQuickView}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-cream-200 transition-colors text-graphite-700 hover:text-gold-600"
                aria-label="Zamknij"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 p-6 md:p-8">
                {/* Left: Images */}
                <div>
                  {/* Main Image */}
                  <div className="mb-4 bg-cream-100 rounded-xl overflow-hidden">
                    {primaryImage?.url ? (
                      <img
                        src={product.images[selectedImage]?.url || primaryImage.url}
                        alt={product.name}
                        className="w-full aspect-square object-cover"
                      />
                    ) : (
                      <div className="w-full aspect-square flex items-center justify-center">
                        <ProductImageFallback
                          productName={product.name}
                          className="w-full h-full"
                          iconSize={64}
                        />
                      </div>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {product.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {product.images.map((image, index) => (
                        <button
                          key={image.id}
                          onClick={() => setSelectedImage(index)}
                          className={`
                            rounded-lg overflow-hidden border-2 transition-all
                            ${selectedImage === index
                              ? 'border-gold-400 ring-2 ring-gold-200'
                              : 'border-cream-300 hover:border-gold-300'
                            }
                          `}
                        >
                          <img
                            src={image.url}
                            alt={image.alt || `${product.name} - ${index + 1}`}
                            className="w-full h-20 object-cover hover:opacity-75 transition-opacity"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Product Info */}
                <div className="flex flex-col">
                  <div className="mb-6">
                    <span className="inline-block badge-nordic text-sm uppercase tracking-wider mb-3">
                      {product.category}
                    </span>
                    <h2 className="text-3xl lg:text-4xl font-serif font-bold text-graphite-900 mb-4">
                      {product.name}
                    </h2>
                    <p className="text-3xl lg:text-4xl font-sans font-bold text-gold-600 tabular-nums">
                      {formatPriceRounded(calculatePrice())}
                    </p>
                  </div>

                  <p className="text-base text-graphite-600 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-graphite-900 mb-3 uppercase tracking-wide">
                        Cechy produktu
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {product.features.slice(0, 6).map((feature, index) => (
                          <span
                            key={index}
                            className="text-sm bg-cream-200 text-graphite-700 px-3 py-2 rounded-lg"
                          >
                            {feature}
                          </span>
                        ))}
                        {product.features.length > 6 && (
                          <span className="text-sm text-graphite-500 px-3 py-2">
                            +{product.features.length - 6} więcej
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Variants */}
                  {product.variants.length > 0 && (
                    <div className="mb-6">
                      <VariantSelector
                        variants={product.variants}
                        onChange={setSelectedVariants}
                        basePrice={product.basePrice}
                      />
                    </div>
                  )}

                  {/* Quantity */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-graphite-900 mb-2 uppercase tracking-wide">
                      Ilość
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-12 rounded-xl border-2 border-cream-300 flex items-center justify-center hover:bg-gold-50 hover:border-gold-300 transition-all text-graphite-700 font-bold text-xl"
                        aria-label="Zmniejsz ilość"
                      >
                        −
                      </button>
                      <div className="w-24 text-center border-2 border-cream-300 rounded-xl px-4 py-3 text-xl font-bold text-graphite-900 tabular-nums">
                        <AnimatedNumber value={quantity} />
                      </div>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-12 rounded-xl border-2 border-cream-300 flex items-center justify-center hover:bg-gold-50 hover:border-gold-300 transition-all text-graphite-700 font-bold text-xl"
                        aria-label="Zwiększ ilość"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-4 mt-auto pt-6">
                    <button
                      onClick={handleAddToCart}
                      disabled={isAddToCartDisabled() || showSuccess}
                      className={`
                        w-full py-4 px-8 rounded-2xl font-bold transition-all shadow-md text-lg
                        ${isAddToCartDisabled() || showSuccess
                          ? 'bg-graphite-200 text-graphite-500 cursor-not-allowed shadow-none'
                          : 'btn-gold'
                        }
                      `}
                    >
                      {showSuccess ? '✓ Dodano do koszyka' : 'Dodaj do koszyka'}
                    </button>

                    <Link
                      href={`/produkt/${product.slug}`}
                      onClick={closeQuickView}
                      className="block w-full py-4 px-8 rounded-2xl font-bold text-center border-2 border-cream-300 hover:border-gold-300 hover:bg-gold-50 transition-all text-graphite-800 text-lg"
                    >
                      Zobacz pełne szczegóły
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
