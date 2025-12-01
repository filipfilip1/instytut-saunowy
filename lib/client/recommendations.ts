/**
 * Product Recommendations Algorithm
 * Smart recommendations based on category, price, and complementary products
 */

import { IProduct } from '@/types';
import { COMPLEMENTARY_CATEGORIES } from '@/constants/recommendations';

interface RecommendationScore {
  product: IProduct;
  score: number;
}

/**
 * Calculate recommendation score for a product
 */
function calculateScore(
  baseProduct: IProduct,
  candidate: IProduct,
  options: {
    categoryWeight?: number;
    priceWeight?: number;
    popularityWeight?: number;
    complementaryWeight?: number;
  } = {}
): number {
  const {
    categoryWeight = 3,
    priceWeight = 1,
    popularityWeight = 0.5,
    complementaryWeight = 2,
  } = options;

  let score = 0;

  // 1. Same category (high priority)
  if (baseProduct.category === candidate.category) {
    score += categoryWeight;
  }

  // 2. Complementary category (medium priority)
  const complementary = COMPLEMENTARY_CATEGORIES[baseProduct.category] || [];
  if (complementary.includes(candidate.category)) {
    score += complementaryWeight;
  }

  // 3. Price similarity (similar budget, avoid suggesting too expensive/cheap)
  const priceDiff = Math.abs(baseProduct.basePrice - candidate.basePrice);
  const avgPrice = (baseProduct.basePrice + candidate.basePrice) / 2;
  const priceRatio = priceDiff / avgPrice;

  // Inverse relationship: closer prices = higher score
  const priceScore = Math.max(0, 1 - priceRatio) * priceWeight;
  score += priceScore;

  // 4. Popularity (view count)
  const viewScore = Math.log10((candidate.viewCount || 0) + 1) * popularityWeight;
  score += viewScore;

  return score;
}

/**
 * Get product recommendations based on a given product
 * @param baseProduct - Product to base recommendations on
 * @param allProducts - All available products
 * @param limit - Maximum number of recommendations (default: 6)
 * @returns Array of recommended products
 */
export function getProductRecommendations(
  baseProduct: IProduct,
  allProducts: IProduct[],
  limit: number = 6
): IProduct[] {
  // Filter out:
  // - The base product itself
  // - Inactive products
  const candidates = allProducts.filter(
    (p) => p._id !== baseProduct._id && p.isActive
  );

  // Calculate scores for all candidates
  const scored: RecommendationScore[] = candidates.map((product) => ({
    product,
    score: calculateScore(baseProduct, product),
  }));

  // Sort by score (descending) and take top N
  const recommendations = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.product);

  return recommendations;
}

/**
 * Get cart-based recommendations (cross-sell/upsell)
 * Recommends products that complement items in the cart
 * @param cartProducts - Products currently in the cart
 * @param allProducts - All available products
 * @param limit - Maximum number of recommendations (default: 6)
 */
export function getCartRecommendations(
  cartProducts: IProduct[],
  allProducts: IProduct[],
  limit: number = 6
): IProduct[] {
  if (cartProducts.length === 0) {
    // No cart items, return popular products
    return getPopularProducts(allProducts, limit);
  }

  // Get cart product IDs to exclude
  const cartProductIds = new Set(cartProducts.map((p) => p._id));

  // Filter out cart products and inactive products
  const candidates = allProducts.filter(
    (p) => !cartProductIds.has(p._id) && p.isActive
  );

  // Calculate aggregate score for each candidate based on ALL cart products
  const scored: RecommendationScore[] = candidates.map((candidate) => {
    // Calculate average score across all cart products
    const totalScore = cartProducts.reduce((sum, cartProduct) => {
      return sum + calculateScore(cartProduct, candidate);
    }, 0);

    const avgScore = totalScore / cartProducts.length;

    return {
      product: candidate,
      score: avgScore,
    };
  });

  // Sort by score and return top N
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.product);
}

/**
 * Get popular products (fallback when no context is available)
 */
export function getPopularProducts(
  allProducts: IProduct[],
  limit: number = 6
): IProduct[] {
  return allProducts
    .filter((p) => p.isActive)
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, limit);
}

/**
 * Get recommendations based on category
 * @param category - Product category
 * @param allProducts - All available products
 * @param limit - Maximum number of recommendations
 * @param excludeProductId - Optional product ID to exclude
 */
export function getCategoryRecommendations(
  category: string,
  allProducts: IProduct[],
  limit: number = 6,
  excludeProductId?: string
): IProduct[] {
  const filtered = allProducts.filter(
    (p) =>
      p.category === category &&
      p.isActive &&
      p._id !== excludeProductId
  );

  // Sort by popularity
  return filtered
    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
    .slice(0, limit);
}
