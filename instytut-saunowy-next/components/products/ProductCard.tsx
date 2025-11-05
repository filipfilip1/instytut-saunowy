'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IProduct } from '@/types';
import { useCart } from '@/contexts/CartContext';
import Toast from '@/components/ui/Toast';
import { formatPriceRounded } from '@/lib/utils/currency';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);


  const getCategoryLabel = (category: string): string => {
    const labels: Record<string, string> = {
      'kilty': 'Kilty',
      'poncha': 'Poncha',
      'spodnie': 'Spodnie',
      'bluzy': 'Bluzy',
      'akcesoria': 'Akcesoria',
      'zestawy': 'Zestawy'
    };
    return labels[category] || category;
  };

  const getPriceRange = () => {
    let minPrice = product.basePrice;
    let maxPrice = product.basePrice;

    product.variants.forEach(variant => {
      variant.options.forEach(option => {
        const price = product.basePrice + (option.priceModifier || 0);
        minPrice = Math.min(minPrice, price);
        maxPrice = Math.max(maxPrice, price);
      });
    });

    if (minPrice === maxPrice) {
      return formatPriceRounded(minPrice);
    }

    return `${formatPriceRounded(minPrice)} - ${formatPriceRounded(maxPrice)}`;
  };

  const isInStock = product.variants.some(variant =>
    variant.options.some(option => option.stock > 0)
  );

  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();

    if (product.variants.length > 0) {
      router.push(`/produkt/${product.slug}`);
      return;
    }

    addToCart(product, {}, 1);
    setShowToast(true);
  };

  return (
    <>
      <Link
        href={`/produkt/${product.slug}`}
        className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden block"
      >
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
          <img
            src={primaryImage?.url || `https://via.placeholder.com/400x500?text=${encodeURIComponent(product.name)}`}
            alt={primaryImage?.alt || product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Availability Badge */}
          <div className="absolute top-3 right-3">
            <span className={`
              px-3 py-1 text-xs font-semibold rounded-full
              ${isInStock
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
              }
            `}>
              {isInStock ? 'Dostępny' : 'Niedostępny'}
            </span>
          </div>

          {/* Number of variants */}
          {product.variants.length > 0 && (
            <div className="absolute bottom-3 left-3 flex gap-1">
              {product.variants.map(variant => (
                <span
                  key={variant.id}
                  className="bg-white/90 backdrop-blur-sm px-2 py-1 text-xs rounded-md"
                >
                  {variant.options.length} {variant.name.toLowerCase()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
            {getCategoryLabel(product.category)}
          </span>

          {/* Name */}
          <h3 className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((feature, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  {feature}
                </span>
              ))}
              {product.features.length > 2 && (
                <span className="text-xs text-gray-500">
                  +{product.features.length - 2} więcej
                </span>
              )}
            </div>
          )}

          {/* Footer with price */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
              {getPriceRange()}
            </span>
            <button
              onClick={handleQuickAdd}
              className={`
                px-4 py-2 text-sm font-medium rounded-lg transition-all
                ${isInStock
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }
              `}
              disabled={!isInStock}
            >
              {isInStock
                ? (product.variants.length > 0 ? 'Wybierz opcje' : 'Do koszyka')
                : 'Niedostępny'
              }
            </button>
          </div>
        </div>
      </Link>

      {/* Toast notification */}
      {showToast && (
        <Toast
          message="Produkt został dodany do koszyka"
          type="success"
          onClose={() => setShowToast(false)}
          action={{
            label: 'Zobacz koszyk',
            onClick: () => router.push('/koszyk')
          }}
        />
      )}
    </>
  );
};

export default ProductCard;