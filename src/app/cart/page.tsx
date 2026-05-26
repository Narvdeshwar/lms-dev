"use client";

import React from "react";
import Link from "next/link";
import { Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartProvider";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, removeFromCart, total } = useCart();

  return (
    <div className="flex min-h-[80vh] flex-col p-4 md:p-8 container mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tight text-white">Your Cart</h1>
        <p className="mt-2 text-muted-foreground">Review your courses before proceeding to checkout.</p>
      </div>

      {items.length === 0 ? (
        <GlassPanel className="flex flex-col items-center justify-center p-16 text-center">
          <div className="mb-4 rounded-full bg-primary/20 p-4">
            <Trash2 className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-white">Your cart is empty</h2>
          <p className="mb-6 text-muted-foreground">Looks like you haven't added any courses yet.</p>
          <Link href="/courses">
            <Button size="lg">Browse Catalog</Button>
          </Link>
        </GlassPanel>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <GlassPanel key={item.id} className="flex flex-col sm:flex-row items-center gap-6 p-4">
                <div className="h-24 w-full sm:w-32 shrink-0 rounded-xl bg-gradient-to-tr from-primary/20 to-purple-500/20 overflow-hidden relative">
                  {item.image && (
                    <img src={item.image} alt={item.title} className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-50" />
                  )}
                </div>
                <div className="flex flex-1 flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4">
                  <div>
                    <h3 className="font-bold text-white text-lg line-clamp-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.author}</p>
                  </div>
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="text-xl font-black text-primary">${item.price}</span>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </GlassPanel>
            ))}
          </div>

          <div className="lg:col-span-1">
            <GlassPanel className="sticky top-24 p-6">
              <h2 className="mb-6 text-xl font-bold text-white border-b border-white/10 pb-4">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({items.length} items)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-white text-xl pt-4 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
              <Link href="/checkout">
                <Button className="w-full h-12 text-lg">
                  Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </GlassPanel>
          </div>
        </div>
      )}
    </div>
  );
}
