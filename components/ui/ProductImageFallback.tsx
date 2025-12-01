import { ShoppingBag } from 'lucide-react';

interface ProductImageFallbackProps {
  productName: string;
  className?: string;
  iconSize?: number;
}

/**
 * Fallback component for missing product images
 * Shows a gray background with shopping bag icon
 */
export default function ProductImageFallback({
  productName,
  className = '',
  iconSize = 48
}: ProductImageFallbackProps) {
  return (
    <div
      className={`bg-cream-100 flex items-center justify-center ${className}`}
      title={productName}
    >
      <ShoppingBag
        className="text-graphite-300"
        size={iconSize}
        strokeWidth={1.5}
      />
    </div>
  );
}
