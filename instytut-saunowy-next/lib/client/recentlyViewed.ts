/**
 * Recently Viewed Products - Client-side utility
 * Manages localStorage for tracking product views
 */

import { IProduct } from '@/types';

const STORAGE_KEY = 'recentlyViewedProducts';
const MAX_ITEMS = 8; // Store up to 8 recently viewed items

export interface RecentlyViewedProduct {
  _id: string;
  slug: string;
  name: string;
  basePrice: number;
  images: Array<{ url: string; alt?: string }>;
  category: string;
  isActive: boolean;
}

/**
 * Get recently viewed products from localStorage
 */
export function getRecentlyViewed(): RecentlyViewedProduct[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error reading recently viewed products:', error);
    return [];
  }
}

/**
 * Add a product to recently viewed list
 * @param product - Product to add
 */
export function addToRecentlyViewed(product: IProduct | RecentlyViewedProduct): void {
  if (typeof window === 'undefined') return;

  try {
    const current = getRecentlyViewed();

    // Create minimal product object to save space in localStorage
    const productToStore: RecentlyViewedProduct = {
      _id: product._id,
      slug: product.slug,
      name: product.name,
      basePrice: product.basePrice,
      images: product.images.slice(0, 1), // Only store first image
      category: product.category,
      isActive: product.isActive,
    };

    // Remove if already exists (to move to front)
    const filtered = current.filter(p => p._id !== product._id);

    // Add to front and limit to MAX_ITEMS
    const updated = [productToStore, ...filtered].slice(0, MAX_ITEMS);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving recently viewed product:', error);
  }
}

/**
 * Clear all recently viewed products
 */
export function clearRecentlyViewed(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing recently viewed products:', error);
  }
}

/**
 * Get recently viewed products excluding a specific product ID
 * Useful for showing recommendations on product detail pages
 */
export function getRecentlyViewedExcluding(excludeId: string): RecentlyViewedProduct[] {
  const all = getRecentlyViewed();
  return all.filter(p => p._id !== excludeId);
}
