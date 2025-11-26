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
      <div className="group card-nordic overflow-hidden">
        <Link href={`/produkt/${product.slug}`} className="block">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden bg-cream-100">
            <img
              src={primaryImage?.url || `https://via.placeholder.com/400x500?text=${encodeURIComponent(product.name)}`}
              alt={primaryImage?.alt || product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Number of variants */}
            {product.variants.length > 0 && (
              <div className="absolute bottom-4 left-4 flex gap-2">
                {product.variants.map(variant => (
                  <span
                    key={variant.id}
                    className="bg-white/95 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-graphite-800 rounded-xl shadow-md"
                  >
                    {variant.options.length} {variant.name.toLowerCase()}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Category */}
            <span className="badge-nordic text-xs uppercase tracking-wider">
              {getCategoryLabel(product.category)}
            </span>

            {/* Name */}
            <h3 className="mt-2 text-xl font-serif font-semibold text-graphite-900 group-hover:text-gold-600 transition-colors leading-tight">
              {product.name}
            </h3>

            {/* Description */}
            <p className="mt-2 text-sm text-graphite-600 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {product.features.slice(0, 2).map((feature, index) => (
                  <span
                    key={index}
                    className="text-xs bg-cream-200 text-graphite-700 px-2.5 py-1 rounded-lg"
                  >
                    {feature}
                  </span>
                ))}
                {product.features.length > 2 && (
                  <span className="text-xs text-graphite-500 px-2 py-1">
                    +{product.features.length - 2} więcej
                  </span>
                )}
              </div>
            )}
          </div>
        </Link>

        {/* Footer with price - outside Link for button interaction */}
        <div className="px-5 pb-5">
          <div className="flex items-center justify-between gap-3">
            <span className="text-2xl font-serif font-bold text-graphite-900">
              {getPriceRange()}
            </span>
            <button
              onClick={handleQuickAdd}
              className={`
                px-5 py-2.5 text-sm font-semibold rounded-2xl transition-all shadow-md
                ${isInStock
                  ? 'btn-gold'
                  : 'bg-graphite-200 text-graphite-500 cursor-not-allowed shadow-none'
                }
              `}
              disabled={!isInStock}
            >
              {isInStock
                ? (product.variants.length > 0 ? 'Wybierz' : 'Do koszyka')
                : 'Niedostępny'
              }
            </button>
          </div>
        </div>
      </div>

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