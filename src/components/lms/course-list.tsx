"use client";

import React from "react";
import { CourseCard } from "./course-card";
import { Course } from "@/context/CartProvider";

interface CourseListProps {
  courses: Course[];
  title?: string;
  description?: string;
}

export function CourseList({ courses, title, description }: CourseListProps) {
  if (!courses?.length) {
    return null;
  }

  return (
    <div className="w-full">
      {(title || description) && (
        <div className="mb-8 flex flex-col gap-2">
          {title && (
            <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="max-w-2xl text-lg text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
