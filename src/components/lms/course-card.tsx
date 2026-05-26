"use client";

import React from "react";
import Image from "next/image";
import { Course, useCart } from "@/context/CartProvider";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/ui/glass-panel";
import { BookOpen } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { addToCart, items } = useCart();
  const inCart = items.some((item) => item.id === course.id);

  return (
    <GlassPanel hoverEffect className="flex flex-col gap-4 overflow-hidden p-0 border border-white/5">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {/* Placeholder gradient since we don't have images configured */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20" />
        {course.image && (
          <img
            src={course.image}
            alt={course.title}
            className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-50"
          />
        )}
      </div>
      
      <div className="flex flex-col flex-1 p-5 pt-2 gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-primary">
          <BookOpen className="h-3 w-3" />
          <span>{course.category || "AI Engineering"}</span>
        </div>
        
        <h3 className="line-clamp-2 text-lg font-bold leading-tight tracking-tight text-foreground">
          {course.title}
        </h3>
        
        <p className="text-sm text-muted-foreground">{course.author}</p>
        
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xl font-black text-white">${course.price}</span>
          <Button
            size="sm"
            variant={inCart ? "secondary" : "primary"}
            onClick={() => addToCart(course)}
            disabled={inCart}
            className="rounded-full px-5 shadow-[0_0_15px_rgba(100,100,255,0.2)]"
          >
            {inCart ? "In Cart" : "Enroll Now"}
          </Button>
        </div>
      </div>
    </GlassPanel>
  );
}
