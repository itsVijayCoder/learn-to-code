/**
 * Admin Courses Hook - Functional Programming
 * Manages course CRUD operations and state
 */

"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
   createCourseService,
   type AdminCourse,
   type CourseFormData,
} from "@/lib/admin/course-service";
import { courseRepository } from "@/lib/admin/course-repository";

export const useAdminCourses = () => {
   const [courses, setCourses] = useState<AdminCourse[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   // Create service instance - useMemo to prevent recreation on every render
   const courseService = useMemo(
      () => createCourseService(courseRepository),
      []
   );

   // Load all courses
   const loadCourses = useCallback(async () => {
      try {
         setLoading(true);
         setError(null);
         const allCourses = await courseService.getAllCourses();
         setCourses(allCourses);
      } catch (err) {
         setError(
            err instanceof Error ? err.message : "Failed to load courses"
         );
      } finally {
         setLoading(false);
      }
   }, [courseService]);

   // Create a new course
   const createCourse = useCallback(
      async (data: CourseFormData): Promise<AdminCourse> => {
         try {
            setError(null);
            const newCourse = await courseService.createCourse(data);
            setCourses((prev) => [...prev, newCourse]);
            return newCourse;
         } catch (err) {
            const errorMessage =
               err instanceof Error ? err.message : "Failed to create course";
            setError(errorMessage);
            throw new Error(errorMessage);
         }
      },
      [courseService]
   );

   // Update an existing course
   const updateCourse = useCallback(
      async (
         id: string,
         data: Partial<CourseFormData>
      ): Promise<AdminCourse> => {
         try {
            setError(null);
            const updatedCourse = await courseService.updateCourse(id, data);
            setCourses((prev) =>
               prev.map((course) => (course.id === id ? updatedCourse : course))
            );
            return updatedCourse;
         } catch (err) {
            const errorMessage =
               err instanceof Error ? err.message : "Failed to update course";
            setError(errorMessage);
            throw new Error(errorMessage);
         }
      },
      [courseService]
   );

   // Delete a course
   const deleteCourse = useCallback(
      async (id: string): Promise<void> => {
         try {
            setError(null);
            await courseService.deleteCourse(id);
            setCourses((prev) => prev.filter((course) => course.id !== id));
         } catch (err) {
            const errorMessage =
               err instanceof Error ? err.message : "Failed to delete course";
            setError(errorMessage);
            throw new Error(errorMessage);
         }
      },
      [courseService]
   );

   // Get course analytics
   const getCourseAnalyticsData = useCallback(async () => {
      try {
         setError(null);
         return await courseService.getCourseAnalytics();
      } catch (err) {
         const errorMessage =
            err instanceof Error ? err.message : "Failed to load analytics";
         setError(errorMessage);
         throw err;
      }
   }, [courseService]);

   // Load courses on mount
   useEffect(() => {
      loadCourses();
   }, [loadCourses]);

   return {
      courses,
      loading,
      error,
      loadCourses,
      createCourse,
      updateCourse,
      deleteCourse,
      getCourseAnalytics: getCourseAnalyticsData,
   };
};
