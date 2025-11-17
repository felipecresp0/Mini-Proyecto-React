
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Course } from '../types';
import { api } from '../services/apiMock';
import { useAuth } from './AuthContext';

interface CartContextType {
  cart: Course[];
  loading: boolean;
  addToCart: (courseId: string) => Promise<void>;
  removeFromCart: (courseId: string) => Promise<void>;
  isInCart: (courseId: string) => boolean;
  checkout: () => Promise<{ success: boolean; orderTotal: number }>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchCart = useCallback(async () => {
    if (user) {
      setLoading(true);
      const cartItems = await api.getCart();
      setCart(cartItems);
      setLoading(false);
    } else {
      setCart([]);
    }
  }, [user]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (courseId: string) => {
    await api.addToCart(courseId);
    fetchCart();
  };

  const removeFromCart = async (courseId: string) => {
    await api.removeFromCart(courseId);
    fetchCart();
  };

  const checkout = async () => {
    const result = await api.checkout();
    fetchCart();
    return result;
  };

  const isInCart = (courseId: string) => cart.some(item => item.id === courseId);

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, removeFromCart, isInCart, checkout }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
