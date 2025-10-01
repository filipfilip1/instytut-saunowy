// Product Types
export interface IVariantOption {
  id: string;
  value: string;
  priceModifier?: number;
  stock: number;
  image?: string;
}

export interface IProductVariant {
  id: string;
  name: string;
  options: IVariantOption[];
}

export interface IProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  variantId?: string;
}

export interface IProductSEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

export interface IProductStats {
  views: number;
  purchases: number;
}

export type ProductCategory = 'kilty' | 'poncha' | 'spodnie' | 'bluzy' | 'akcesoria' | 'zestawy';

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  description: string;
  basePrice: number;
  images: IProductImage[];
  variants: IProductVariant[];
  features: string[];
  isActive: boolean;
  seo: IProductSEO;
  stats: IProductStats;
  createdAt: Date;
  updatedAt: Date;

  // Virtual fields
  isAvailable?: boolean;
  totalStock?: number;
  priceRange?: {
    min: number;
    max: number;
  };
}

// Cart types
export interface CartItem {
  id: string;
  product: IProduct;
  selectedVariants: Record<string, string>;
  quantity: number;
  pricePerItem: number;
}

// API Response Types
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  errors?: string[];
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  results: number;
  total: number;
  page: number;
  pages: number;
}

export interface ProductQuery {
  category?: string;
  sort?: string;
  limit?: number;
  page?: number;
  search?: string;
}