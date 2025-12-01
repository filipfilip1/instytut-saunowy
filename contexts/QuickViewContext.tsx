'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { IProduct } from '@/types';

interface QuickViewContextType {
  product: IProduct | null;
  isOpen: boolean;
  openQuickView: (product: IProduct) => void;
  closeQuickView: () => void;
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(undefined);

export function QuickViewProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openQuickView = (product: IProduct) => {
    setProduct(product);
    setIsOpen(true);
  };

  const closeQuickView = () => {
    setIsOpen(false);
    // Delay reset product to allow exit animation
    setTimeout(() => setProduct(null), 300);
  };

  return (
    <QuickViewContext.Provider value={{ product, isOpen, openQuickView, closeQuickView }}>
      {children}
    </QuickViewContext.Provider>
  );
}

export function useQuickView() {
  const context = useContext(QuickViewContext);
  if (!context) {
    throw new Error('useQuickView must be used within QuickViewProvider');
  }
  return context;
}
