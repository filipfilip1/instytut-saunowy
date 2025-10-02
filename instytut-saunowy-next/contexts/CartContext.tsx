'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { IProduct, CartItem } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: IProduct, selectedVariants: Record<string, string>, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotal: () => number;
  isInCart: (productId: string, selectedVariants: Record<string, string>) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}

interface CartProviderProps {
  children: ReactNode;
}

// Helper function to generate cart item ID
const generateCartItemId = (productId: string, selectedVariants: Record<string, string>): string => {
  const variantString = Object.entries(selectedVariants)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}:${value}`)
    .join('|');
  return `${productId}_${variantString}`;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const calculateItemPrice = (product: IProduct, selectedVariants: Record<string, string>): number => {
    let price = product.basePrice;

    product.variants.forEach(variant => {
      const selectedOptionId = selectedVariants[variant.id];
      if (selectedOptionId) {
        const option = variant.options.find(opt => opt.id === selectedOptionId);
        if (option?.priceModifier) {
          price += option.priceModifier;
        }
      }
    });

    return price;
  };

  const addToCart = (product: IProduct, selectedVariants: Record<string, string>, quantity: number) => {
    const itemId = generateCartItemId(product._id, selectedVariants);
    const pricePerItem = calculateItemPrice(product, selectedVariants);

    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === itemId);

      if (existingItem) {
        return prevItems.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: itemId,
          product,
          selectedVariants,
          quantity,
          pricePerItem
        };
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemCount = (): number => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotal = (): number => {
    return items.reduce((total, item) => total + (item.pricePerItem * item.quantity), 0);
  };

  const isInCart = (productId: string, selectedVariants: Record<string, string>): boolean => {
    const itemId = generateCartItemId(productId, selectedVariants);
    return items.some(item => item.id === itemId);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getItemCount,
      getTotal,
      isInCart
    }}>
      {children}
    </CartContext.Provider>
  );
};