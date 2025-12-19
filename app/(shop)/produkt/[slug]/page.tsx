import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import ProductDetailClient from './ProductDetailClient';
import { IProduct } from '@/types';

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav className="text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Strona główna
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link href="/sklep" className="text-gray-500 hover:text-gray-700">
                Sklep
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li>
              <Link
                href={`/sklep/${product.category}`}
                className="text-gray-500 hover:text-gray-700 capitalize"
              >
                {product.category}
              </Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>
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