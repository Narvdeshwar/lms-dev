import React from "react";
import { Navbar } from "@/components/ui/navbar";
import { CartSidebar } from "@/components/lms/cart-sidebar";
import { CourseList } from "@/components/lms/course-list";
import { MOCK_COURSES } from "@/lib/data";

export default function CoursesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <CartSidebar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-white">Course Catalog</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Browse our entire collection of premium courses.
          </p>
        </div>

        {/* More courses can be mocked here, but using MOCK_COURSES for simplicity */}
        <CourseList courses={[...MOCK_COURSES, ...MOCK_COURSES.map(c => ({...c, id: c.id + '_dup'}))]} />
      </main>
    </div>
  );
}
