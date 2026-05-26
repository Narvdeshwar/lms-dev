"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Footer } from "./footer";

export function ConditionalFooter() {
  const pathname = usePathname();
  const hiddenPaths = ["/login", "/register"];

  if (hiddenPaths.includes(pathname)) {
    return null;
  }

  return <Footer />;
}
