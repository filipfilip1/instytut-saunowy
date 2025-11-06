import { OrderStatus, PaymentStatus } from '@/lib/constants/orderStatuses';

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
  cloudinaryPublicId?: string;
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

// Order Types
export interface IOrderItem {
  productId: string;
  productName: string;
  variantSelections: Record<string, string>;
  quantity: number;
  pricePerItem: number;
}

export interface IShippingAddress {
  name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
}

export interface IOrder {
  _id: string;
  userId?: string;
  guestEmail?: string;
  items: IOrderItem[];
  shippingAddress: IShippingAddress;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  trackingNumber?: string;
  stripeSessionId?: string;
  createdAt: Date;
  updatedAt: Date;
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

// Blog Post Types
export interface IBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  featuredImage: {
    url: string;
    alt?: string;
  };
  category: 'poradniki' | 'trendy' | 'diy' | 'szkolenia' | 'zdrowie' | 'przepisy';
  tags: string[];
  readTime: number;
  publishedAt: Date;
  isPublished: boolean;
  viewCount: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
  formattedDate?: string;
}

// Training Types
export interface ITraining {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;

  // Schedule
  date: Date;
  duration: number;

  // Location
  location: {
    venue: string;
    address: string;
    city: string;
    mapUrl?: string;
  };

  // Pricing
  price: number;
  depositPercentage: number;

  // Capacity
  maxParticipants: number;
  currentParticipants: number;

  // Classification
  category: 'podstawowy' | 'zaawansowany' | 'master' | 'indywidualny';
  level: 'beginner' | 'intermediate' | 'advanced';

  // Details
  requirements?: string[];
  whatYouLearn: string[];
  agenda?: {
    time: string;
    title: string;
    description: string;
  }[];

  // Instructor
  instructor: {
    name: string;
    bio?: string;
    avatar?: string;
  };

  // Media
  images: {
    url: string;
    alt?: string;
  }[];
  featuredImage?: {
    url: string;
    alt?: string;
  };

  // Status
  status: 'draft' | 'published' | 'cancelled' | 'completed';

  // SEO
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };

  createdAt: Date;
  updatedAt: Date;

  // Virtual properties
  availableSpots?: number;
  isFull?: boolean;
  isAlmostFull?: boolean;
  shouldShowAvailability?: boolean;
  depositAmount?: number;
}

// Training Booking Types
export interface ITrainingBooking {
  _id: string;
  trainingId: string;
  userId?: string;
  guestEmail?: string;

  participantInfo: {
    name: string;
    email: string;
    phone: string;
    experience?: string;
    specialRequirements?: string;
  };

  stripeSessionId: string;
  amount: number;
  depositAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';

  status: 'confirmed' | 'cancelled' | 'pending_approval';

  cancelledAt?: Date;
  cancellationReason?: string;
  adminNotes?: string;

  createdAt: Date;
  updatedAt: Date;
}
