"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Footer } from "./footer";

export function ConditionalFooter() {
  const pathname = usePathname();
  
  // Exact paths to hide the footer
  const hiddenPaths = ["/login", "/register"];
  
  // Dynamic paths to hide the footer
  const isCourseConsumptionPage = pathname.startsWith("/courses/") && pathname !== "/courses";

  if (hiddenPaths.includes(pathname) || isCourseConsumptionPage) {
    return null;
  }

  return <Footer />;
}
