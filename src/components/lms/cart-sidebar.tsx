"use client";

import React, { useEffect } from "react";
import { X, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, total } = useCart();

  // Prevent scroll when open
  useEffect(() => {
    if (isCartOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed inset-y-0 right-0 z-[101] flex w-full max-w-sm flex-col bg-card shadow-2xl transition-transform duration-300 ease-in-out border-l border-white/10">
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">Your Cart</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center bg-background/50 p-3 rounded-xl border border-white/5">
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-white line-clamp-1">{item.title}</p>
                    <p className="text-primary font-bold mt-1">${item.price}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="border-t border-white/10 p-5 bg-background/30">
          <div className="flex justify-between mb-4">
            <span className="font-medium text-muted-foreground">Total</span>
            <span className="font-bold text-xl text-white">${total.toFixed(2)}</span>
          </div>
          <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
            <Button className="w-full text-lg h-12" disabled={items.length === 0}>
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
