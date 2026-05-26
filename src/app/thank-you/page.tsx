"use client";

import React from "react";
import { Navbar } from "@/components/ui/navbar";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PartyPopper, PlayCircle } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-8 flex items-center justify-center py-20">
        <GlassPanel className="max-w-2xl w-full text-center py-16 px-8 flex flex-col items-center">
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(139,92,246,0.3)]">
            <PartyPopper className="w-12 h-12 text-primary" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4 tracking-tight">
            Thank You for Your Order!
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-lg">
            Your payment was successful and your new courses are now available in your dashboard.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/my-courses">
              <Button size="lg" className="w-full sm:w-auto h-14 text-lg px-8 shadow-[0_0_30px_rgba(139,92,246,0.2)] hover:shadow-[0_0_50px_rgba(139,92,246,0.4)]">
                <PlayCircle className="mr-2 h-5 w-5" /> Start Learning Now
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 text-lg px-8 border-border/50">
                Browse More Courses
              </Button>
            </Link>
          </div>
        </GlassPanel>
      </main>
    </div>
  );
}
