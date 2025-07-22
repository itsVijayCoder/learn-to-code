/**
 * Functional Programming Demo - Course Operations
 * Shows how our functional architecture works without classes
 */

"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAdminCourses } from "@/hooks/use-admin-courses";
import type { AdminCourse } from "@/lib/admin/course-service";

export function FunctionalProgrammingDemo() {
   const { courses, loading } = useAdminCourses();
   const [demoResult, setDemoResult] = useState<string>("");

   // Demonstrate pure function composition
   const demonstrateFunctionalComposition = () => {
      // Example of function composition without classes
      const processNewCourse = (courseData: Partial<AdminCourse>) => {
         // Pure function pipeline
         const validateData = (data: Partial<AdminCourse>) => {
            if (!data.title || !data.slug)
               throw new Error("Title and slug required");
            return data;
         };

         const enrichData = (data: Partial<AdminCourse>) => ({
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
            published: false,
            enrollmentCount: 0,
         });

         const formatResult = (data: AdminCourse) =>
            `Created: ${data.title} (${data.slug})`;

         try {
            // Function composition pipeline
            const validated = validateData(courseData);
            const enriched = enrichData(validated);
            return formatResult(enriched as AdminCourse);
         } catch (error) {
            return `Error: ${error instanceof Error ? error.message : "Unknown error"}`;
         }
      };

      const result = processNewCourse({
         title: "Functional Programming Basics",
         slug: "fp-basics",
         description: "Learn functional programming",
      });

      setDemoResult(result);
   };

   // Demonstrate higher-order function
   const demonstrateHigherOrderFunction = () => {
      // Higher-order function that returns a function
      const createValidator = (minLength: number) => (value: string) =>
         value.length >= minLength;

      const titleValidator = createValidator(5);
      const slugValidator = createValidator(3);

      const testTitle = "React";
      const testSlug = "react-basics";

      const result = `
      Title "${testTitle}" valid: ${titleValidator(testTitle)}
      Slug "${testSlug}" valid: ${slugValidator(testSlug)}
    `;

      setDemoResult(result);
   };

   // Demonstrate immutable data transformation
   const demonstrateImmutability = () => {
      const originalCourse: AdminCourse = {
         id: "1",
         title: "Original Course",
         slug: "original",
         description: "Original description",
         category: "Programming",
         difficulty: "beginner",
         duration: 10,
         published: false,
         createdAt: new Date(),
         updatedAt: new Date(),
         tags: ["react", "javascript"],
         author: "John Doe",
         prerequisites: [],
         learningObjectives: ["Learn React basics"],
      };

      // Immutable update - creates new object
      const updatedCourse = {
         ...originalCourse,
         title: "Updated Course",
         duration: 15,
         updatedAt: new Date(),
      };

      const result = `
      Original title: ${originalCourse.title} (duration: ${originalCourse.duration}h)
      Updated title: ${updatedCourse.title} (duration: ${updatedCourse.duration}h)
      Original unchanged: ${originalCourse.title === "Original Course"}
    `;

      setDemoResult(result);
   };

   return (
      <Card className='border-blue-200 bg-blue-50'>
         <CardHeader>
            <CardTitle className='text-blue-800 flex items-center gap-2'>
               🧪 Functional Programming Demonstrations
               <Badge variant='outline' className='text-blue-600'>
                  No Classes Used
               </Badge>
            </CardTitle>
         </CardHeader>
         <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
               <Button
                  onClick={demonstrateFunctionalComposition}
                  variant='outline'
                  className='border-blue-300 text-blue-700 hover:bg-blue-100'
               >
                  Function Composition
               </Button>
               <Button
                  onClick={demonstrateHigherOrderFunction}
                  variant='outline'
                  className='border-blue-300 text-blue-700 hover:bg-blue-100'
               >
                  Higher-Order Functions
               </Button>
               <Button
                  onClick={demonstrateImmutability}
                  variant='outline'
                  className='border-blue-300 text-blue-700 hover:bg-blue-100'
               >
                  Immutable Updates
               </Button>
            </div>

            {demoResult && (
               <div className='mt-4 p-3 bg-white rounded border border-blue-200'>
                  <h4 className='font-medium text-blue-800 mb-2'>
                     Demo Result:
                  </h4>
                  <pre className='text-sm text-blue-700 whitespace-pre-line'>
                     {demoResult}
                  </pre>
               </div>
            )}

            <div className='mt-4 p-3 bg-green-50 rounded border border-green-200'>
               <h4 className='font-medium text-green-800 mb-2'>
                  ✅ Current Functional Statistics:
               </h4>
               <div className='grid grid-cols-2 md:grid-cols-4 gap-3 text-sm'>
                  <div>
                     <span className='text-green-600'>Total Courses:</span>
                     <p className='font-medium'>{courses.length}</p>
                  </div>
                  <div>
                     <span className='text-green-600'>Published:</span>
                     <p className='font-medium'>
                        {courses.filter((c) => c.published).length}
                     </p>
                  </div>
                  <div>
                     <span className='text-green-600'>Categories:</span>
                     <p className='font-medium'>
                        {new Set(courses.map((c) => c.category)).size}
                     </p>
                  </div>
                  <div>
                     <span className='text-green-600'>Loading:</span>
                     <p className='font-medium'>{loading ? "Yes" : "No"}</p>
                  </div>
               </div>
            </div>
         </CardContent>
      </Card>
   );
}
