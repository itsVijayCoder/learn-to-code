/**
 * Course meta component
 * Displays course metadata like duration, lessons count, etc.
 */

import { Clock, BookOpen, Users } from "lucide-react";
import type { Difficulty } from "@/types/course";

interface CourseMetaProps {
   readonly duration: string;
   readonly difficulty?: Difficulty;
   readonly lessonsCount?: number;
   readonly studentsCount?: number;
   readonly className?: string;
}

export function CourseMeta({
   duration,
   lessonsCount,
   studentsCount,
   className,
}: CourseMetaProps) {
   return (
      <div
         className={`flex items-center gap-4 text-sm text-muted-foreground ${className || ""}`}
      >
         <div className='flex items-center gap-1'>
            <Clock className='w-4 h-4' />
            <span>{duration}</span>
         </div>

         {lessonsCount && (
            <div className='flex items-center gap-1'>
               <BookOpen className='w-4 h-4' />
               <span>
                  {lessonsCount} lesson{lessonsCount !== 1 ? "s" : ""}
               </span>
            </div>
         )}

         {studentsCount && (
            <div className='flex items-center gap-1'>
               <Users className='w-4 h-4' />
               <span>
                  {studentsCount.toLocaleString()} student
                  {studentsCount !== 1 ? "s" : ""}
               </span>
            </div>
         )}
      </div>
   );
}
