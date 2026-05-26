import React from "react";
import { Navbar } from "@/components/ui/navbar";
import { CartSidebar } from "@/components/lms/cart-sidebar";
import { CourseList } from "@/components/lms/course-list";
import { MOCK_COURSES } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-primary/30">
      <Navbar />
      <CartSidebar />
      
      <main className="flex-1">
        <section className="relative overflow-hidden py-20 sm:py-32">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20" />
          <div className="container relative mx-auto px-4 sm:px-8 text-center">
            <h1 className="text-5xl font-black tracking-tight text-white md:text-7xl lg:text-8xl">
              Learn <span className="text-primary">Without</span> Limits
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Level up your skills with our premium courses designed by industry experts.
              Start building the future today with LMS.ai.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link href="/courses">
                <Button size="lg" className="rounded-full px-8 text-lg">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-8 py-20">
          <CourseList
            courses={MOCK_COURSES}
            title="Featured Courses"
            description="Our most popular courses hand-picked for you."
          />
        </section>
      </main>
    </div>
  );
}
