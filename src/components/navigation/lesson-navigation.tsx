/**
 * Lesson navigation component
 * Provides previous/next navigation between lessons
 */

"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/stores";
import type { Lesson, Course, CourseId, LessonId } from "@/types/course";

// Type casting utilities for branded types
const toCourseId = (id: string): CourseId => id as CourseId;
const toLessonId = (id: string): LessonId => id as LessonId;

interface LessonNavigationProps {
   readonly course: Course;
   readonly currentLesson: Lesson;
   readonly className?: string;
}

interface NavigationButtonProps {
   readonly lesson: Lesson | null;
   readonly direction: "prev" | "next";
   readonly isCompleted?: boolean;
}

const NavigationButton = ({
   lesson,
   direction,
   isCompleted,
}: NavigationButtonProps) => {
   if (!lesson) {
      return (
         <div className='flex-1'>
            {/* Empty placeholder to maintain layout */}
         </div>
      );
   }

   const isPrev = direction === "prev";
   const Icon = isPrev ? ChevronLeft : ChevronRight;

   return (
      <div className={cn("flex-1", !isPrev && "flex justify-end")}>
         <Link href={`/lessons/${lesson.slug}`}>
            <Button
               variant='outline'
               className={cn(
                  "h-auto p-2 flex items-center gap-3 max-w-xs",
                  isPrev ? "flex-row" : "flex-row-reverse"
               )}
            >
               <Icon className='w-4 h-4 flex-shrink-0' />
               <div
                  className={cn(
                     "flex-1 min-w-0",
                     isPrev ? "text-left" : "text-right"
                  )}
               >
                  <div className='text-xs text-muted-foreground mb-1'>
                     {isPrev ? "Previous" : "Next"}
                  </div>
                  <div className='font-medium text-sm truncate'>
                     {lesson.title}
                  </div>
               </div>
               {isCompleted && (
                  <CheckCircle className='w-4 h-4 text-green-600 flex-shrink-0' />
               )}
            </Button>
         </Link>
      </div>
   );
};

export function LessonNavigation({
   course,
   currentLesson,
   className,
}: LessonNavigationProps) {
   const { isLessonCompleted } = useProgressStore();

   // Find current lesson index across all modules
   const allLessons = course.modules.flatMap((module) => module.lessons);
   const currentIndex = allLessons.findIndex(
      (lesson) => lesson.id === currentLesson.id
   );

   const prevLesson =
      currentIndex > 0 ? allLessons[currentIndex - 1] || null : null;
   const nextLesson =
      currentIndex < allLessons.length - 1
         ? allLessons[currentIndex + 1] || null
         : null;

   // Type cast for the branded IDs
   return (
      <nav
         className={cn(
            "flex items-center justify-between gap-4 p-3 border-t border-border",
            className
         )}
         aria-label='Lesson navigation'
      >
         <NavigationButton
            lesson={prevLesson}
            direction='prev'
            isCompleted={
               prevLesson
                  ? isLessonCompleted(
                       toCourseId(course.id),
                       toLessonId(prevLesson.id)
                    )
                  : false
            }
         />

         <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <span>{currentIndex + 1}</span>
            <span>of</span>
            <span>{allLessons.length}</span>
         </div>

         <NavigationButton
            lesson={nextLesson}
            direction='next'
            isCompleted={
               nextLesson
                  ? isLessonCompleted(
                       toCourseId(course.id),
                       toLessonId(nextLesson.id)
                    )
                  : false
            }
         />
      </nav>
   );
}

/**
 * Compact lesson navigation for use in headers or sidebars
 */
interface CompactLessonNavigationProps {
   readonly course: Course;
   readonly currentLesson: Lesson;
   readonly className?: string;
}

export function CompactLessonNavigation({
   course,
   currentLesson,
   className,
}: CompactLessonNavigationProps) {
   const allLessons = course.modules.flatMap((module) => module.lessons);
   const currentIndex = allLessons.findIndex(
      (lesson) => lesson.id === currentLesson.id
   );

   const prevLesson =
      currentIndex > 0 ? allLessons[currentIndex - 1] || null : null;
   const nextLesson =
      currentIndex < allLessons.length - 1
         ? allLessons[currentIndex + 1] || null
         : null;

   return (
      <div className={cn("flex items-center gap-2", className)}>
         {prevLesson ? (
            <Link href={`/lessons/${prevLesson.slug}`}>
               <Button variant='ghost' size='sm'>
                  <ChevronLeft className='w-4 h-4' />
                  <span className='sr-only'>Previous lesson</span>
               </Button>
            </Link>
         ) : (
            <Button variant='ghost' size='sm' disabled>
               <ChevronLeft className='w-4 h-4' />
               <span className='sr-only'>No previous lesson</span>
            </Button>
         )}

         <span className='text-sm text-muted-foreground px-2'>
            {currentIndex + 1} / {allLessons.length}
         </span>

         {nextLesson ? (
            <Link href={`/lessons/${nextLesson.slug}`}>
               <Button variant='ghost' size='sm'>
                  <ChevronRight className='w-4 h-4' />
                  <span className='sr-only'>Next lesson</span>
               </Button>
            </Link>
         ) : (
            <Button variant='ghost' size='sm' disabled>
               <ChevronRight className='w-4 h-4' />
               <span className='sr-only'>No next lesson</span>
            </Button>
         )}
      </div>
   );
}
