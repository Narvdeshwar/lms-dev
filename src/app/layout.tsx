import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { CartProvider } from "@/context/CartProvider";

const ibmPlexSans = IBM_Plex_Sans({subsets:['latin'],variable:'--font-sans', weight: ['400', '500', '600', '700']});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { ConditionalFooter } from "@/components/ui/conditional-footer";

export const metadata: Metadata = {
  title: "LMS Platform",
  description: "Modern LMS platform with jspark.ai theme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full dark", "antialiased", geistSans.variable, geistMono.variable, "font-sans", ibmPlexSans.variable)}
    >
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <div className="flex-1 flex flex-col min-h-screen">
            {children}
            <ConditionalFooter />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
