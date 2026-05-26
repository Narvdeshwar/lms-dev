"use client";

import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-12 sm:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4 md:col-span-2">
            <Link
              href="/"
              className="bg-gradient-to-r from-primary to-accent bg-clip-text text-2xl font-bold tracking-tight text-transparent w-fit"
            >
              LMS.ai
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Empowering the next generation of builders with autonomous intelligence and premium educational content.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Platform</h3>
            <Link href="/courses" className="text-sm text-muted-foreground hover:text-primary transition-colors">Courses</Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex gap-4">
              <Link href="https://twitter.com" target="_blank" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Twitter
              </Link>
              <Link href="https://github.com" target="_blank" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                GitHub
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 flex flex-col items-center justify-between border-t border-border/50 pt-8 sm:flex-row gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} LMS.ai. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
