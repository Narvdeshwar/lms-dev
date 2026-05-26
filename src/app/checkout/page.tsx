"use client";

import React from "react";
import { Navbar } from "@/components/ui/navbar";
import { useCart } from "@/context/CartProvider";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, total, setIsCartOpen, completePurchase } = useCart();
  const router = useRouter();

  // Ensure cart sidebar is closed when on checkout page
  React.useEffect(() => {
    setIsCartOpen(false);
  }, [setIsCartOpen]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-8 py-12 max-w-4xl">
        <h1 className="text-4xl font-black text-foreground mb-8">Secure Checkout</h1>
        
        {items.length === 0 ? (
          <GlassPanel className="text-center py-20">
            <h2 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h2>
            <Link href="/courses">
              <Button>Browse Courses</Button>
            </Link>
          </GlassPanel>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 flex flex-col gap-4">
              <GlassPanel>
                <h2 className="text-xl font-bold mb-4 border-b border-border/50 pb-4">Order Summary</h2>
                {items.map(item => (
                  <div key={item.id} className="flex justify-between py-3 border-b border-border/30 last:border-0">
                    <span className="text-foreground">{item.title}</span>
                    <span className="font-bold">${item.price}</span>
                  </div>
                ))}
              </GlassPanel>
            </div>
            
            <div>
              <GlassPanel className="sticky top-24">
                <h2 className="text-xl font-bold mb-4 border-b border-border/50 pb-4">Payment</h2>
                <div className="flex justify-between mb-6 text-xl">
                  <span className="text-muted-foreground">Total:</span>
                  <span className="font-black text-primary">${total.toFixed(2)}</span>
                </div>
                <Button 
                  className="w-full text-lg h-12" 
                  onClick={() => {
                    completePurchase();
                    router.push("/thank-you");
                  }}
                >
                  <CheckCircle className="mr-2 h-5 w-5" /> Complete Purchase
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Secured by 256-bit encryption
                </p>
              </GlassPanel>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
