/**
 * Course sidebar navigation component
 * Provides navigation between lessons with progress indicators
 */

"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
   ChevronDown,
   ChevronRight,
   CheckCircle,
   Lock,
   Play,
   BookOpen,
   Target,
   Clock,
} from "lucide-react";
import { useProgressStore } from "@/stores";
import type {
   Course,
   Module,
   Lesson,
   CourseId,
   LessonId,
   ModuleId,
} from "@/types/course";

// Type casting utilities for branded types
const toCourseId = (id: string): CourseId => id as CourseId;
const toLessonId = (id: string): LessonId => id as LessonId;
const toModuleId = (id: string): ModuleId => id as ModuleId;

interface CourseSidebarProps {
   readonly course: Course;
   readonly currentLessonId?: string;
   readonly className?: string;
}

interface ModuleSectionProps {
   readonly module: Module;
   readonly courseId: string;
   readonly currentLessonId?: string;
   readonly isExpanded: boolean;
   readonly onToggle: () => void;
}

interface LessonItemProps {
   readonly lesson: Lesson;
   readonly courseId: string;
   readonly isActive: boolean;
   readonly isCompleted: boolean;
   readonly isLocked: boolean;
}

const ModuleSection = ({
   module,
   courseId,
   currentLessonId,
   isExpanded,
   onToggle,
}: ModuleSectionProps) => {
   const { getModuleProgress, isLessonCompleted } = useProgressStore();
   const moduleProgress = getModuleProgress(
      toCourseId(courseId),
      toModuleId(module.id)
   );
   const completedLessons = module.lessons.filter((lesson) =>
      isLessonCompleted(toCourseId(courseId), toLessonId(lesson.id))
   ).length;

   return (
      <div className='border-b border-border/50 last:border-b-0'>
         <button
            onClick={onToggle}
            className='w-full p-4 text-left hover:bg-muted/50 transition-colors'
         >
            <div className='flex items-center justify-between'>
               <div className='flex items-center gap-2'>
                  {isExpanded ? (
                     <ChevronDown className='w-4 h-4 text-muted-foreground' />
                  ) : (
                     <ChevronRight className='w-4 h-4 text-muted-foreground' />
                  )}
                  <div>
                     <h3 className='font-medium'>{module.title}</h3>
                     <p className='text-sm text-muted-foreground mt-1'>
                        {completedLessons}/{module.lessons.length} lessons •{" "}
                        {module.duration}m
                     </p>
                  </div>
               </div>
               <div className='flex items-center gap-2'>
                  <div className='text-xs text-muted-foreground'>
                     {Math.round(moduleProgress)}%
                  </div>
                  <div className='w-8 h-1 bg-muted rounded-full overflow-hidden'>
                     <div
                        className='h-full bg-primary transition-all duration-300'
                        style={{ width: `${moduleProgress}%` }}
                     />
                  </div>
               </div>
            </div>
         </button>

         <AnimatePresence>
            {isExpanded && (
               <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
               >
                  <div className='pb-2'>
                     {module.lessons.map((lesson) => (
                        <LessonItem
                           key={lesson.id}
                           lesson={lesson}
                           courseId={courseId}
                           isActive={currentLessonId === lesson.slug}
                           isCompleted={isLessonCompleted(
                              toCourseId(courseId),
                              toLessonId(lesson.id)
                           )}
                           isLocked={false} // TODO: Implement lesson locking logic
                        />
                     ))}
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
};

const LessonItem = ({
   lesson,
   isActive,
   isCompleted,
   isLocked,
}: LessonItemProps) => {
   const lessonUrl = `/lessons/${lesson.slug}`;

   const getLessonIcon = () => {
      if (isLocked) return <Lock className='w-4 h-4 text-muted-foreground' />;
      if (isCompleted)
         return <CheckCircle className='w-4 h-4 text-green-600' />;
      if (isActive) return <Play className='w-4 h-4 text-primary' />;

      switch (lesson.type) {
         case "video":
            return <Play className='w-4 h-4 text-blue-600' />;
         case "quiz":
            return <Target className='w-4 h-4 text-purple-600' />;
         default:
            return <BookOpen className='w-4 h-4 text-green-600' />;
      }
   };

   const content = (
      <div
         className={`
      flex items-center gap-3 p-3 mx-2 rounded-lg transition-all duration-200
      ${
         isActive
            ? "bg-primary/10 border border-primary/20"
            : "hover:bg-muted/50"
      }
      ${isLocked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
    `}
      >
         <div className='flex-shrink-0'>{getLessonIcon()}</div>

         <div className='flex-1 min-w-0'>
            <div className='flex items-center justify-between'>
               <h4
                  className={`text-sm font-medium truncate ${
                     isActive ? "text-primary" : "text-foreground"
                  }`}
               >
                  {lesson.title}
               </h4>
               {lesson.duration > 0 && (
                  <span className='text-xs text-muted-foreground ml-2'>
                     {lesson.duration}m
                  </span>
               )}
            </div>

            {lesson.description && (
               <p className='text-xs text-muted-foreground mt-1 line-clamp-2'>
                  {lesson.description}
               </p>
            )}
         </div>

         <div className='flex-shrink-0'>
            {isCompleted && <CheckCircle className='w-4 h-4 text-green-600' />}
         </div>
      </div>
   );

   if (isLocked) {
      return <div>{content}</div>;
   }

   return (
      <Link href={lessonUrl} className='block'>
         {content}
      </Link>
   );
};

export function CourseSidebar({
   course,
   currentLessonId,
   className,
}: CourseSidebarProps) {
   const [expandedModules, setExpandedModules] = React.useState<Set<string>>(
      new Set(course.modules.map((module) => module.id))
   );
   const { getCourseProgress, isLessonCompleted } = useProgressStore();

   const toggleModule = (moduleId: string) => {
      const newExpanded = new Set(expandedModules);
      if (newExpanded.has(moduleId)) {
         newExpanded.delete(moduleId);
      } else {
         newExpanded.add(moduleId);
      }
      setExpandedModules(newExpanded);
   };

   const courseProgress = getCourseProgress(course.id);
   const courseProgressPercentage = courseProgress?.progressPercentage || 0;
   const totalLessons = course.modules.reduce(
      (sum, module) => sum + module.lessons.length,
      0
   );
   const completedLessons = course.modules.reduce(
      (sum, module) =>
         sum +
         module.lessons.filter((lesson) =>
            isLessonCompleted(toCourseId(course.id), toLessonId(lesson.id))
         ).length,
      0
   );

   return (
      <div
         className={`bg-card border-r border-border h-full flex flex-col ${className || ""}`}
      >
         {/* Course Header */}
         <div className='p-4 border-b border-border/50'>
            <div className='space-y-3'>
               <div>
                  <h2 className='font-semibold text-lg line-clamp-2'>
                     {course.title}
                  </h2>
                  <p className='text-sm text-muted-foreground mt-1'>
                     {course.modules.length} modules • {totalLessons} lessons
                  </p>
               </div>

               <div className='space-y-2'>
                  <div className='flex justify-between items-center text-sm'>
                     <span className='text-muted-foreground'>Progress</span>
                     <span className='font-medium'>
                        {completedLessons}/{totalLessons} completed
                     </span>
                  </div>
                  <Progress value={courseProgressPercentage} className='h-2' />
                  <div className='text-xs text-muted-foreground text-center'>
                     {Math.round(courseProgressPercentage)}% complete
                  </div>
               </div>

               <div className='flex items-center gap-2'>
                  <Badge variant='secondary'>{course.difficulty}</Badge>
                  <div className='flex items-center gap-1 text-sm text-muted-foreground'>
                     <Clock className='w-3 h-3' />
                     <span>{course.duration}m</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Course Content */}
         <ScrollArea className='flex-1'>
            <div>
               {course.modules.map((module) => (
                  <ModuleSection
                     key={module.id}
                     module={module}
                     courseId={course.id}
                     currentLessonId={currentLessonId}
                     isExpanded={expandedModules.has(module.id)}
                     onToggle={() => toggleModule(module.id)}
                  />
               ))}
            </div>
         </ScrollArea>

         {/* Action Buttons */}
         <div className='p-4 border-t border-border/50 space-y-2'>
            <Button className='w-full' size='sm'>
               <Play className='w-4 h-4 mr-2' />
               {courseProgressPercentage > 0
                  ? "Continue Learning"
                  : "Start Course"}
            </Button>

            <Button variant='outline' className='w-full' size='sm'>
               <Target className='w-4 h-4 mr-2' />
               Take Quiz
            </Button>
         </div>
      </div>
   );
}
