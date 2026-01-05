'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Eye } from 'lucide-react';
import { IProduct } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useQuickView } from '@/contexts/QuickViewContext';
import Toast from '@/components/ui/Toast';
import ProductImageFallback from '@/components/ui/ProductImageFallback';
import AnimatedNumber from '@/components/animations/AnimatedNumber';
import { formatPriceExact } from '@/lib/utils/currency';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { addToCart } = useCart();
  const { openQuickView } = useQuickView();
  const [showToast, setShowToast] = useState(false);

  const isAdmin = session?.user?.role === 'admin';


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
      return formatPriceExact(minPrice);
    }

    return `${formatPriceExact(minPrice)} - ${formatPriceExact(maxPrice)}`;
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
      <Link href={`/produkt/${product.slug}`} className="group block">
        {/* Image - Portrait 3:4 */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-stone/10 mb-4">
          {primaryImage?.url ? (
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt || product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <ProductImageFallback
              productName={product.name}
              className="w-full h-full"
              iconSize={64}
            />
          )}

          {/* Quick View Button - subtle, on hover - Desktop only */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openQuickView(product);
            }}
            className="hidden md:flex absolute top-4 right-4 w-10 h-10 rounded-full bg-wood/90 backdrop-blur-sm shadow-lg items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-copper text-oat"
            aria-label="Szybki podgląd"
          >
            <Eye className="w-5 h-5" />
          </button>

          {/* Color swatches on image (if variants exist) */}
          {product.variants.length > 0 && product.variants[0].name.toLowerCase() === 'kolor' && (
            <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {product.variants[0].options.slice(0, 4).map((option, idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 rounded-full bg-white border-2 border-wood/20 shadow-sm"
                  title={option.value}
                />
              ))}
            </div>
          )}
        </div>

        {/* Metadata - directly on background */}
        <div className="space-y-1 sm:space-y-2">
          {/* Name */}
          <h3 className="text-sm md:text-lg font-serif text-wood group-hover:text-copper transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <p className="text-sm md:text-base text-copper font-medium tabular-nums">
            {getPriceRange()}
          </p>

          {/* Stock status (if out of stock) */}
          {!isInStock && (
            <p className="text-xs text-wood/50 uppercase tracking-wider">
              Niedostępny
            </p>
          )}
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