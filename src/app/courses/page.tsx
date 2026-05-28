"use client";
import { useState } from "react";
import { Navbar } from "@/components/ui/navbar";
import { CartSidebar } from "@/components/lms/cart-sidebar";
import { CourseList } from "@/components/lms/course-list";
import { MOCK_COURSES } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Extract unique categories
  const categories = Array.from(new Set(MOCK_COURSES.map(c => c.category)));

  // Filter courses based on search and category
  const allCourses = [...MOCK_COURSES, ...MOCK_COURSES.map(c => ({...c, id: c.id + '_dup'}))];
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? course.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <CartSidebar />

      <main className="flex-1 container mx-auto px-4 sm:px-8 py-4 sm:py-8">
        <div className="sticky top-16 z-40 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-background/95 backdrop-blur py-6 -mx-4 px-4 sm:-mx-8 sm:px-8 border-b border-border/50 shadow-sm">
          <div>
            <h1 className="text-4xl font-black text-foreground">Course Catalog</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Browse our entire collection of premium courses.
            </p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-10 w-full bg-foreground/5 border-border/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary h-12 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="sticky top-52">
              <h3 className="font-semibold text-xl mb-4 text-foreground">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                    selectedCategory === null
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                  }`}
                >
                  All Courses
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Course List */}
          <div className="flex-1">
            {filteredCourses.length > 0 ? (
              <CourseList courses={filteredCourses} />
            ) : (
              <div className="py-20 text-center border border-border/50 rounded-xl bg-foreground/5">
                <h3 className="text-xl font-semibold text-foreground mb-2">No courses found</h3>
                <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}
                  className="mt-6 text-primary hover:underline font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
