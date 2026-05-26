"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Course {
  id: string;
  title: string;
  price: number;
  image: string;
  author: string;
  category?: string;
}

interface CartContextType {
  items: Course[];
  purchasedCourses: Course[];
  addToCart: (course: Course) => void;
  removeFromCart: (id: string) => void;
  completePurchase: () => void;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Course[]>([]);
  const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (course: Course) => {
    setItems((prev) => {
      if (prev.find((item) => item.id === course.id)) return prev;
      // also prevent adding if already purchased
      if (purchasedCourses.find((item) => item.id === course.id)) return prev;
      return [...prev, course];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const completePurchase = () => {
    setPurchasedCourses((prev) => {
      const newPurchases = items.filter(
        (item) => !prev.find((p) => p.id === item.id)
      );
      return [...prev, ...newPurchases];
    });
    setItems([]); // Clear the cart
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider
      value={{ items, purchasedCourses, addToCart, removeFromCart, completePurchase, total, isCartOpen, setIsCartOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
