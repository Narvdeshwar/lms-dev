"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "./button";
import { useCart } from "@/context/CartProvider";

export function Navbar() {
  const { items, setIsCartOpen } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-2xl font-bold tracking-tight text-transparent"
          >
            LMS.ai
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/courses"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary hidden sm:block"
          >
            Catalog
          </Link>
          
          <Link href="/login" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Log in
          </Link>
          
          <Link href="/register" className="hidden sm:block">
            <Button size="sm" variant="outline" className="h-8">Sign up</Button>
          </Link>

          <div className="h-5 w-px bg-white/10 mx-1 hidden sm:block" />

          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-lg">
                  {items.length}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
