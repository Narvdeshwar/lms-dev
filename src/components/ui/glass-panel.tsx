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
        "glass rounded-2xl p-6",
        hoverEffect && "glass-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
