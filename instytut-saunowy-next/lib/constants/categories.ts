/**
 * Product Category Constants
 * Single source of truth for all category-related enums and configurations
 */

import { ShoppingBag, Scroll, Shirt, Scissors, Sparkles, Package, Store } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ProductCategory } from '@/types';

/**
 * Configuration for a single product category
 */
export interface CategoryConfig {
  icon: LucideIcon;
  label: string;
  description: string;
}

/**
 * Array of all valid product categories
 */
export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'kilty',
  'poncha',
  'spodnie',
  'bluzy',
  'akcesoria',
  'zestawy'
];

/**
 * Complete category configuration with icons, labels, and descriptions
 */
export const CATEGORY_CONFIG: Record<ProductCategory, CategoryConfig> = {
  kilty: {
    icon: Scroll,
    label: 'Kilty',
    description: 'Tradycyjne kilty do sauny w różnych wzorach i kolorach',
  },
  poncha: {
    icon: Shirt,
    label: 'Poncha',
    description: 'Wygodne poncha idealne po wyjściu z sauny',
  },
  spodnie: {
    icon: Scissors,
    label: 'Spodnie',
    description: 'Przewiewne spodnie do relaksu w saunie',
  },
  bluzy: {
    icon: Shirt,
    label: 'Bluzy',
    description: 'Komfortowe bluzy na chłodniejsze dni',
  },
  akcesoria: {
    icon: Sparkles,
    label: 'Akcesoria',
    description: 'Niezbędne dodatki do saunowania',
  },
  zestawy: {
    icon: Package,
    label: 'Zestawy',
    description: 'Kompletne zestawy dla prawdziwych miłośników sauny',
  },
};

/**
 * Special category for "All Products"
 */
export const ALL_CATEGORY_CONFIG = {
  icon: ShoppingBag,
  label: 'Wszystkie',
  description: 'Wszystkie produkty',
};

/**
 * Icon for empty state
 */
export const EMPTY_STATE_ICON = Store;

// Helper Functions

/**
 * Check if a string is a valid product category
 */
export function isValidCategory(category: string): category is ProductCategory {
  return PRODUCT_CATEGORIES.includes(category as ProductCategory);
}

/**
 * Get category configuration
 */
export function getCategoryConfig(category: ProductCategory): CategoryConfig {
  return CATEGORY_CONFIG[category];
}

/**
 * Get all categories with their configurations
 */
export function getAllCategories(): Array<{ key: ProductCategory; config: CategoryConfig }> {
  return PRODUCT_CATEGORIES.map(key => ({
    key,
    config: CATEGORY_CONFIG[key],
  }));
}
