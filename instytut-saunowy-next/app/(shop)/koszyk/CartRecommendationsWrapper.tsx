'use client';

import { useState, useEffect } from 'react';
import { IProduct } from '@/types';
import { useCart } from '@/contexts/CartContext';
import CartRecommendations from '@/components/products/CartRecommendations';

export default function CartRecommendationsWrapper() {
  const { items } = useCart();
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all products for recommendations
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products?limit=100');
        const data = await response.json();

        if (data.status === 'success') {
          setAllProducts(data.data);
        }
      } catch (error) {
        console.error('Error fetching products for recommendations:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading || items.length === 0 || allProducts.length === 0) {
    return null;
  }

  // Extract products from cart items
  const cartProducts = items.map(item => item.product);

  return (
    <CartRecommendations
      cartProducts={cartProducts}
      allProducts={allProducts}
      maxItems={6}
    />
  );
}
