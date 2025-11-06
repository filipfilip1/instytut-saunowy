'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { IProduct } from '@/types';
import { useCart } from '@/contexts/CartContext';
import VariantSelector from '@/components/products/VariantSelector';
import { formatPriceRounded } from '@/lib/utils/currency';

interface QuickViewModalProps {
  product: IProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
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
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

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
      onClose();
    }, 1500);
  };

  const isAddToCartDisabled = () => {
    return !product.variants.every(variant => selectedVariants[variant.id]) || quantity < 1;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                {/* Left: Images */}
                <div>
                  {/* Main Image */}
                  <div className="mb-4">
                    <img
                      src={product.images[selectedImage]?.url || 'https://via.placeholder.com/400'}
                      alt={product.name}
                      className="w-full h-96 object-cover rounded-lg"
                    />
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
                            ${selectedImage === index ? 'border-blue-600' : 'border-gray-200'}
                          `}
                        >
                          <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full h-20 object-cover hover:opacity-75 transition-opacity"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: Product Info */}
                <div>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 uppercase mb-2">{product.category}</p>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatPriceRounded(calculatePrice())}
                    </p>
                  </div>

                  <p className="text-gray-600 mb-6 line-clamp-3">{product.description}</p>

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
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ilość
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-20 text-center border border-gray-300 rounded-lg px-3 py-2"
                        min="1"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <button
                      onClick={handleAddToCart}
                      disabled={isAddToCartDisabled() || showSuccess}
                      className={`
                        w-full py-3 px-6 rounded-lg font-semibold transition-all
                        ${isAddToCartDisabled() || showSuccess
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                        }
                      `}
                    >
                      {showSuccess ? '✓ Dodano do koszyka' : 'Dodaj do koszyka'}
                    </button>

                    <Link
                      href={`/produkt/${product.slug}`}
                      onClick={onClose}
                      className="block w-full py-3 px-6 rounded-lg font-semibold text-center border-2 border-gray-300 hover:border-gray-400 transition-colors"
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
