import React from "react";
import { cn } from "@/lib/utils";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export function GlassPanel({
  children,
  className,
  hoverEffect = false,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 bg-card/60 backdrop-blur-xl border border-border/50 shadow-sm",
        hoverEffect && "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-card/80 hover:border-primary/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
