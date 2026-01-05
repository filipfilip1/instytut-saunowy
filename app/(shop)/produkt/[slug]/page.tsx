import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import ProductDetailClient from './ProductDetailClient';
import { IProduct, ProductCategory } from '@/types';
import { CATEGORY_CONFIG } from '@/lib/constants/categories';

// Dynamic params - render on-demand
export const dynamicParams = true;
// Revalidate every 30 minutes
export const revalidate = 1800;

// Generate static params for most popular products (optional - can return empty array)
export async function generateStaticParams() {
  // Return empty array to render all pages on-demand
  // In production, you could pre-render top products
  return [];
}

interface PageProps {
  params: {
    slug: string;
  };
}

async function getProduct(slug: string): Promise<IProduct | null> {
  await dbConnect();

  const product = await Product.findBySlug(slug);

  if (!product) {
    return null;
  }

  // Increment views using model method
  await product.incrementViews();

  return JSON.parse(JSON.stringify(product));
}

async function getAllProducts(): Promise<IProduct[]> {
  await dbConnect();

  const products = await Product.find({ isActive: true })
    .select('_id slug name basePrice images category isActive viewCount')
    .lean();

  return JSON.parse(JSON.stringify(products));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // Fetch all products for recommendations
  const allProducts = await getAllProducts();

  // Get category label
  const categoryConfig = CATEGORY_CONFIG[product.category as ProductCategory];
  const categoryLabel = categoryConfig?.label || product.category;

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs - Minimalist Premium style */}
      <div className="bg-oat">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 mb-4 md:mt-4 md:mb-8">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest">
            <Link href="/" className="text-wood/50 hover:text-copper transition-colors">
              Strona główna
            </Link>
            <span className="text-wood/30">/</span>
            <Link href="/sklep" className="text-wood/50 hover:text-copper transition-colors">
              Sklep
            </Link>
            <span className="text-wood/30">/</span>
            <Link
              href={`/sklep/${product.category}`}
              className="text-wood/50 hover:text-copper transition-colors"
            >
              {categoryLabel}
            </Link>
            <span className="text-wood/30">/</span>
            <span className="text-copper font-bold truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <ProductDetailClient product={product} allProducts={allProducts} />
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: 'Produkt nie znaleziony',
    };
  }

  return {
    title: product.seo?.metaTitle || `${product.name} - Instytut Saunowy`,
    description: product.seo?.metaDescription || product.description,
    keywords: product.seo?.keywords?.join(', '),
  };
}
