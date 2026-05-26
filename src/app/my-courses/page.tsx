"use client";

import React from "react";
import { Navbar } from "@/components/ui/navbar";
import { useCart } from "@/context/CartProvider";
import { GlassPanel } from "@/components/ui/glass-panel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlayCircle, BookOpen, Clock } from "lucide-react";
import Image from "next/image";

export default function MyCoursesPage() {
  const { purchasedCourses } = useCart();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-foreground mb-4">My Dashboard</h1>
          <p className="text-lg text-muted-foreground">Pick up right where you left off.</p>
        </div>
        
        {purchasedCourses.length === 0 ? (
          <GlassPanel className="text-center py-20 flex flex-col items-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
              <BookOpen className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">You don't own any courses yet</h2>
            <p className="text-muted-foreground mb-8">
              Explore our catalog of premium courses and start learning today.
            </p>
            <Link href="/courses">
              <Button size="lg" className="px-8 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                Browse Course Catalog
              </Button>
            </Link>
          </GlassPanel>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {purchasedCourses.map((course) => (
              <GlassPanel key={course.id} hoverEffect className="flex flex-col gap-4 overflow-hidden p-0 border border-border/30">
                <div className="relative aspect-video w-full overflow-hidden bg-muted/30 group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-purple-500/10 dark:to-transparent mix-blend-multiply dark:mix-blend-normal transition-opacity group-hover:opacity-75" />
                  {course.image && (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-50 transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  {/* Progress bar overlay */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-background/50">
                    <div className="h-full bg-primary" style={{ width: `${Math.floor(Math.random() * 80) + 10}%` }}></div>
                  </div>
                </div>
                
                <div className="flex flex-col flex-1 p-5 pt-2 gap-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-primary">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-3 w-3" />
                      <span>{course.category || "AI Engineering"}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground font-normal">
                      <Clock className="h-3 w-3" />
                      <span>2h 45m left</span>
                    </div>
                  </div>
                  
                  <h3 className="line-clamp-2 text-lg font-bold leading-tight tracking-tight text-foreground">
                    {course.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4">{course.author}</p>
                  
                  <div className="mt-auto pt-2">
                    <Link href={`/courses/${course.id}`}>
                      <Button className="w-full justify-center gap-2 group-hover:bg-primary/90 transition-all shadow-sm group-hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                        <PlayCircle className="h-4 w-4" /> Continue Learning
                      </Button>
                    </Link>
                  </div>
                </div>
              </GlassPanel>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
