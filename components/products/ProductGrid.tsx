'use client';

import React from 'react';
import ProductCard from './ProductCard';
import StaggerContainer, { StaggerItem } from '@/components/animations/StaggerContainer';
import HoverCard from '@/components/animations/HoverCard';
import { IProduct } from '@/types';

interface ProductGridProps {
  products: IProduct[];
  className?: string;
}

export default function ProductGrid({ products, className = '' }: ProductGridProps) {
  return (
    <StaggerContainer className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {products.map((product) => (
        <StaggerItem key={product._id}>
          <HoverCard>
            <ProductCard product={product} />
          </HoverCard>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
