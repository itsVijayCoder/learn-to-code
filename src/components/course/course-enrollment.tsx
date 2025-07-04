/**
 * Course enrollment button component
 * Handles course enrollment, favorites, and enrollment status display
 */

"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
   BookmarkPlus,
   BookmarkMinus,
   UserPlus,
   CheckCircle2,
   Play,
   Heart,
   HeartOff,
} from "lucide-react";
import { useEnrollmentStore } from "@/stores";
import { useAuthStore } from "@/stores";
import type { Course, UserId, CourseId } from "@/types";

interface CourseEnrollmentButtonProps {
   readonly course: Course;
   readonly variant?: "default" | "compact" | "detailed";
   readonly className?: string;
}

// Type casting utilities
const toUserId = (id: string): UserId => id as UserId;
const toCourseId = (id: string): CourseId => id as CourseId;

export function CourseEnrollmentButton({
   course,
   variant = "default",
   className,
}: CourseEnrollmentButtonProps) {
   const { user } = useAuthStore();
   const {
      enrollInCourse,
      addToFavorites,
      removeFromFavorites,
      isEnrolled,
      isFavorited,
      getEnrollmentStatus,
      isLoading,
   } = useEnrollmentStore();

   // Always define these, but only use them if user exists
   const userId = user ? toUserId(user.id) : ("" as UserId);
   const courseId = toCourseId(course.id);
   const enrolled = user ? isEnrolled(userId, courseId) : false;
   const favorited = user ? isFavorited(userId, courseId) : false;
   const enrollmentStatus = user ? getEnrollmentStatus(userId, courseId) : null;

   const handleEnroll = React.useCallback(async () => {
      if (user && !enrolled) {
         await enrollInCourse(userId, courseId);
      }
   }, [user, enrolled, enrollInCourse, userId, courseId]);

   const handleToggleFavorite = React.useCallback(() => {
      if (!user) return;

      if (favorited) {
         removeFromFavorites(userId, courseId);
      } else {
         addToFavorites(userId, courseId);
      }
   }, [user, favorited, addToFavorites, removeFromFavorites, userId, courseId]);

   if (!user) {
      return (
         <Button className={className} asChild>
            <a href='/auth/login'>
               <UserPlus className='w-4 h-4 mr-2' />
               Sign in to Enroll
            </a>
         </Button>
      );
   }

   if (variant === "compact") {
      return (
         <div className='flex items-center gap-2'>
            {enrolled ? (
               <Badge
                  variant={
                     enrollmentStatus === "completed" ? "default" : "secondary"
                  }
               >
                  {enrollmentStatus === "completed" ? (
                     <>
                        <CheckCircle2 className='w-3 h-3 mr-1' />
                        Completed
                     </>
                  ) : (
                     <>
                        <Play className='w-3 h-3 mr-1' />
                        Enrolled
                     </>
                  )}
               </Badge>
            ) : (
               <Button size='sm' onClick={handleEnroll} disabled={isLoading}>
                  <UserPlus className='w-3 h-3 mr-1' />
                  Enroll
               </Button>
            )}

            <Button
               variant='ghost'
               size='sm'
               onClick={handleToggleFavorite}
               className='p-1'
            >
               {favorited ? (
                  <Heart className='w-4 h-4 text-red-500 fill-current' />
               ) : (
                  <HeartOff className='w-4 h-4' />
               )}
            </Button>
         </div>
      );
   }

   if (variant === "detailed") {
      return (
         <div className='space-y-3'>
            {enrolled ? (
               <div className='space-y-2'>
                  <Badge
                     variant={
                        enrollmentStatus === "completed"
                           ? "default"
                           : "secondary"
                     }
                     className='w-full justify-center py-2'
                  >
                     {enrollmentStatus === "completed" ? (
                        <>
                           <CheckCircle2 className='w-4 h-4 mr-2' />
                           Course Completed
                        </>
                     ) : (
                        <>
                           <Play className='w-4 h-4 mr-2' />
                           Continue Learning
                        </>
                     )}
                  </Badge>

                  <Button variant='outline' className='w-full' asChild>
                     <a href={`/courses/${course.slug}`}>View Course</a>
                  </Button>
               </div>
            ) : (
               <Button
                  className='w-full'
                  onClick={handleEnroll}
                  disabled={isLoading}
               >
                  <UserPlus className='w-4 h-4 mr-2' />
                  {course.price && course.price > 0
                     ? `Enroll - $${course.price}`
                     : "Enroll for Free"}
               </Button>
            )}

            <div className='flex gap-2'>
               <Button
                  variant='outline'
                  className='flex-1'
                  onClick={handleToggleFavorite}
               >
                  {favorited ? (
                     <>
                        <BookmarkMinus className='w-4 h-4 mr-2' />
                        Remove from Favorites
                     </>
                  ) : (
                     <>
                        <BookmarkPlus className='w-4 h-4 mr-2' />
                        Add to Favorites
                     </>
                  )}
               </Button>
            </div>
         </div>
      );
   }

   // Default variant
   return (
      <div className={`flex items-center gap-2 ${className || ""}`}>
         {enrolled ? (
            <Button asChild>
               <a href={`/courses/${course.slug}`}>
                  <Play className='w-4 h-4 mr-2' />
                  Continue Course
               </a>
            </Button>
         ) : (
            <Button onClick={handleEnroll} disabled={isLoading}>
               <UserPlus className='w-4 h-4 mr-2' />
               Enroll Course
            </Button>
         )}

         <Button variant='outline' onClick={handleToggleFavorite}>
            {favorited ? (
               <BookmarkMinus className='w-4 h-4' />
            ) : (
               <BookmarkPlus className='w-4 h-4' />
            )}
         </Button>
      </div>
   );
}
