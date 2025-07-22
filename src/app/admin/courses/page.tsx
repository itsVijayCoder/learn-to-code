/**
 * Admin Course Management Demo - Functional Programming
 * Demonstrates the completed admin course management system with functional approach
 */

"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminCourseManagement } from "@/components/admin/admin-course-management";
// import { FunctionalProgrammingDemo } from '@/components/admin/functional-programming-demo';
import { Badge } from "@/components/ui/badge";

export default function AdminCoursesDemo() {
   return (
      <div className='container mx-auto py-8 space-y-8'>
         {/* Header */}
         <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-3'>
               <h1 className='text-3xl font-bold'>Admin Course Management</h1>
               <Badge
                  variant='secondary'
                  className='bg-green-100 text-green-800'
               >
                  Functional Programming ✅
               </Badge>
            </div>
            <p className='text-muted-foreground'>
               Fully functional admin course management system built with
               functional programming principles
            </p>
         </div>

         {/* Implementation Details */}
         {/* <Card className='border-green-200 bg-green-50'>
            <CardHeader>
               <CardTitle className='text-green-800'>
                  ✅ Functional Programming Implementation Complete
               </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
               <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
                  <div>
                     <p className='font-medium text-green-800'>
                        ✅ Converted Class-based to Functional:
                     </p>
                     <ul className='list-disc list-inside text-green-700 space-y-1 mt-2'>
                        <li>AdminCourseService → createCourseService()</li>
                        <li>
                           MockCourseRepository → courseRepository functions
                        </li>
                        <li>CourseValidationService → validation functions</li>
                        <li>CourseAnalyticsService → analytics functions</li>
                     </ul>
                  </div>
                  <div>
                     <p className='font-medium text-green-800'>
                        ✅ SOLID Principles Applied:
                     </p>
                     <ul className='list-disc list-inside text-green-700 space-y-1 mt-2'>
                        <li>
                           Single Responsibility - Each function has one purpose
                        </li>
                        <li>
                           Open/Closed - Functions can be extended without
                           modification
                        </li>
                        <li>
                           Liskov Substitution - Repository functions are
                           interchangeable
                        </li>
                        <li>
                           Interface Segregation - Specific function signatures
                        </li>
                        <li>
                           Dependency Inversion - Higher-order functions for
                           injection
                        </li>
                     </ul>
                  </div>
               </div>

               <div className='mt-4 p-3 bg-white rounded border border-green-200'>
                  <p className='font-medium text-green-800'>
                     🎯 DRY Principles Implemented:
                  </p>
                  <p className='text-green-700 text-sm mt-1'>
                     Reusable validation functions, consistent error handling,
                     shared repository patterns, and composable service
                     functions eliminate code duplication.
                  </p>
               </div>
            </CardContent>
         </Card> */}

         {/* Functional Programming Demo */}
         {/* <FunctionalProgrammingDemo /> */}

         {/* Course Management Component */}
         <div className='space-y-4'>
            <AdminCourseManagement />
         </div>

         {/* Technical Architecture */}
         <Card>
            <CardHeader>
               <CardTitle>🏗️ Functional Architecture Overview</CardTitle>
            </CardHeader>
            <CardContent>
               <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
                  <div className='space-y-2'>
                     <h4 className='font-medium'>
                        🔧 Service Layer (Pure Functions)
                     </h4>
                     <ul className='list-disc list-inside text-muted-foreground space-y-1'>
                        <li>createCourseService()</li>
                        <li>validateSlugUniqueness()</li>
                        <li>validateCourseData()</li>
                        <li>getCourseAnalytics()</li>
                     </ul>
                  </div>
                  <div className='space-y-2'>
                     <h4 className='font-medium'>
                        💾 Repository Layer (Function Objects)
                     </h4>
                     <ul className='list-disc list-inside text-muted-foreground space-y-1'>
                        <li>createCourseRepository()</li>
                        <li>getAllCourses()</li>
                        <li>createCourse()</li>
                        <li>updateCourse()</li>
                     </ul>
                  </div>
                  <div className='space-y-2'>
                     <h4 className='font-medium'>
                        ⚛️ React Hooks (Functional State)
                     </h4>
                     <ul className='list-disc list-inside text-muted-foreground space-y-1'>
                        <li>useAdminCourses()</li>
                        <li>useMemo for service creation</li>
                        <li>useCallback for event handlers</li>
                        <li>useState for component state</li>
                     </ul>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
