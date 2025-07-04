/**
 * Courses listing page
 * Shows all available courses
 */

import { Metadata } from "next";
import { getAllCourses } from "@/lib/content";
import { CoursesGrid } from "@/components/course/courses-grid";
import { AuthGuard } from "@/components/auth";

export const metadata: Metadata = {
   title: "Courses - Learn To Code",
   description:
      "Browse our comprehensive programming courses and start your coding journey today.",
   keywords:
      "programming courses, coding tutorials, web development, javascript, python, react",
};

export default async function CoursesPage() {
   const courses = await getAllCourses();

   return (
      <AuthGuard>
         <div className='min-h-screen bg-background'>
            <div className='container mx-auto px-4 py-8'>
               <div className='mb-8'>
                  <h1 className='text-4xl font-bold mb-4'>All Courses</h1>
                  <p className='text-lg text-muted-foreground'>
                     Master programming with our comprehensive course
                     collection. From beginner to advanced levels.
                  </p>
               </div>

               <CoursesGrid courses={courses} />
            </div>
         </div>
      </AuthGuard>
   );
}
