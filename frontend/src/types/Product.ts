export interface ProductVariant {
  id: string;
  name: string;
  options: VariantOption[];
}

export interface VariantOption {
  id: string,
  value: string, // e.g. "M", "L" or "Red", "Blue"
  priceModifier?: number // Additional price for variant
  stock: number;
  image?: string;
}

export interface ProductVariant {
  id: string;
  name: string; // e.g. "Size", "Color", "Pattern"
  options: VariantOption[];
}

export interface VariantOption {
  id: string;
  value: string; // np. "M", "L", "XL" lub "Czerwony", "Niebieski"
  priceModifier?: number; // dodatkowa cena za wariant
  stock: number;
  image?: string; // opcjonalne zdjęcie dla wariantu (np. inny kolor)
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  description: string;
  basePrice: number; // cena podstawowa
  priceRange?: {
    min: number;
    max: number;
  };
  images: ProductImage[];
  variants: ProductVariant[];
  features: string[]; // np. ["100% bawełna", "Pranie w 40°C"]
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  variantId?: string; // if the photo relates to a specific variant
}

export type ProductCategory =
  | 'kilty'
  | 'poncha'
  | 'spodnie'
  | 'bluzy'
  | 'akcesoria'
  | 'zestawy';

// Type for items in shopping cart
export interface CartItem {
  id: string;
  product: Product;
  selectedVariants: {
    [variantId: string]: string; // e.g. { 'var-size': 'size-l', 'var-color': 'color-red' }
  };
  quantity: number;
  pricePerItem: number; // price per unit, including variants
}

export interface ApiResponse<T> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  results?: number;
}

// Helper for generating IDs for cart items
export const generateCartItemId = (productId: string, selectedVariants: Record<string, string>): string => {
  const variantString = Object.entries(selectedVariants)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}:${value}`)
    .join('|');
  return `${productId}_${variantString}`;
};

