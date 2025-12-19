import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { IProduct, ProductCategory } from '@/types';

/**
 * Check if a product has any variant options in stock
 * Mirrors the isAvailable virtual from Product model
 */
function isProductAvailable(product: IProduct): boolean {
  if (!product.isActive) return false;
  return product.variants.some(variant =>
    variant.options.some(option => option.stock > 0)
  );
}

/**
 * Shared helper for fetching products with common filters
 * Used by server components in shop pages
 */
export async function fetchProducts(options?: {
  category?: ProductCategory;
  limit?: number;
  isActive?: boolean;
}): Promise<IProduct[]> {
  await dbConnect();

  const { category, limit = 20, isActive = true } = options || {};

  const query: Record<string, unknown> = {};

  if (isActive !== undefined) {
    query.isActive = isActive;
  }

  if (category) {
    query.category = category;
  }

  const products = await Product.find(query)
    .sort('-createdAt')
    .limit(limit)
    .lean();

  const parsedProducts: IProduct[] = JSON.parse(JSON.stringify(products));

  // Filter out products with no stock available
  return parsedProducts.filter(isProductAvailable);
}

/**
 * Fetch products grouped by category
 */
export async function fetchAllProductsGrouped(): Promise<{
  all: IProduct[];
  byCategory: Record<ProductCategory, IProduct[]>;
}> {
  const allProducts = await fetchProducts({ limit: 100 });

  const byCategory = allProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<ProductCategory, IProduct[]>);

  return {
    all: allProducts,
    byCategory,
  };
}
