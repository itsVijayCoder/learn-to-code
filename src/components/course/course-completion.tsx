/**
 * Course completion flow component
 * Handles course completion ceremony and next actions
 */

"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
   Trophy,
   Award,
   Star,
   Download,
   Share2,
   BookOpen,
   Target,
   Clock,
   CheckCircle2,
} from "lucide-react";
import { useProgressStore } from "@/stores";
import type { Course, CourseId, LessonId } from "@/types/course";

// Type casting utilities for branded types
const toCourseId = (id: string): CourseId => id as CourseId;
const toLessonId = (id: string): LessonId => id as LessonId;

interface CourseCompletionProps {
   readonly course: Course;
   readonly isVisible: boolean;
   readonly onClose: () => void;
   readonly onDownloadCertificate?: () => void;
   readonly onShareCompletion?: () => void;
   readonly onNextCourse?: () => void;
}

export function CourseCompletion({
   course,
   isVisible,
   onClose,
   onDownloadCertificate,
   onShareCompletion,
   onNextCourse,
}: CourseCompletionProps) {
   const { getCourseProgress } = useProgressStore();
   const courseProgress = getCourseProgress(toCourseId(course.id));

   const stats = React.useMemo(() => {
      const totalLessons = course.modules.reduce(
         (sum, module) => sum + module.lessons.length,
         0
      );
      const timeSpent = courseProgress?.timeSpent || 0;
      const completionDate = courseProgress?.completedAt || new Date();

      return {
         totalLessons,
         timeSpent: Math.round(timeSpent / 60), // Convert to minutes
         completionDate: completionDate.toLocaleDateString(),
         modules: course.modules.length,
      };
   }, [course, courseProgress]);

   return (
      <AnimatePresence>
         {isVisible && (
            <>
               {/* Backdrop */}
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='fixed inset-0 bg-black/50 z-50'
                  onClick={onClose}
               />

               {/* Modal */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ type: "spring", bounce: 0.3 }}
                  className='fixed inset-0 z-50 flex items-center justify-center p-4'
               >
                  <Card className='w-full max-w-md mx-auto p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20'>
                     {/* Header */}
                     <div className='text-center mb-6'>
                        <motion.div
                           initial={{ scale: 0 }}
                           animate={{ scale: 1 }}
                           transition={{
                              delay: 0.2,
                              type: "spring",
                              bounce: 0.6,
                           }}
                           className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4'
                        >
                           <Trophy className='w-8 h-8 text-white' />
                        </motion.div>

                        <motion.h2
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.3 }}
                           className='text-2xl font-bold text-foreground mb-2'
                        >
                           Course Completed!
                        </motion.h2>

                        <motion.p
                           initial={{ opacity: 0, y: 10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.4 }}
                           className='text-muted-foreground'
                        >
                           Congratulations on completing{" "}
                           <strong>{course.title}</strong>
                        </motion.p>
                     </div>

                     {/* Progress Summary */}
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className='space-y-4 mb-6'
                     >
                        <div className='grid grid-cols-2 gap-4 text-center'>
                           <div className='space-y-1'>
                              <div className='flex items-center justify-center gap-1'>
                                 <CheckCircle2 className='w-4 h-4 text-green-600' />
                                 <span className='text-2xl font-bold'>
                                    {stats.totalLessons}
                                 </span>
                              </div>
                              <p className='text-xs text-muted-foreground'>
                                 Lessons
                              </p>
                           </div>

                           <div className='space-y-1'>
                              <div className='flex items-center justify-center gap-1'>
                                 <Clock className='w-4 h-4 text-blue-600' />
                                 <span className='text-2xl font-bold'>
                                    {stats.timeSpent}
                                 </span>
                              </div>
                              <p className='text-xs text-muted-foreground'>
                                 Minutes
                              </p>
                           </div>

                           <div className='space-y-1'>
                              <div className='flex items-center justify-center gap-1'>
                                 <BookOpen className='w-4 h-4 text-purple-600' />
                                 <span className='text-2xl font-bold'>
                                    {stats.modules}
                                 </span>
                              </div>
                              <p className='text-xs text-muted-foreground'>
                                 Modules
                              </p>
                           </div>

                           <div className='space-y-1'>
                              <div className='flex items-center justify-center gap-1'>
                                 <Star className='w-4 h-4 text-yellow-600' />
                                 <span className='text-2xl font-bold'>100</span>
                              </div>
                              <p className='text-xs text-muted-foreground'>
                                 Progress %
                              </p>
                           </div>
                        </div>

                        <div className='text-center'>
                           <Progress value={100} className='h-2 mb-2' />
                           <p className='text-xs text-muted-foreground'>
                              Completed on {stats.completionDate}
                           </p>
                        </div>

                        <div className='flex items-center justify-center gap-2'>
                           <Badge
                              variant='secondary'
                              className='bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
                           >
                              <Award className='w-3 h-3 mr-1' />
                              {course.difficulty}
                           </Badge>
                           <Badge variant='secondary'>
                              <Target className='w-3 h-3 mr-1' />
                              Certificate Earned
                           </Badge>
                        </div>
                     </motion.div>

                     {/* Actions */}
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className='space-y-3'
                     >
                        {onDownloadCertificate && (
                           <Button
                              onClick={onDownloadCertificate}
                              className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                           >
                              <Download className='w-4 h-4 mr-2' />
                              Download Certificate
                           </Button>
                        )}

                        <div className='grid grid-cols-2 gap-3'>
                           {onShareCompletion && (
                              <Button
                                 variant='outline'
                                 onClick={onShareCompletion}
                                 size='sm'
                              >
                                 <Share2 className='w-4 h-4 mr-2' />
                                 Share
                              </Button>
                           )}

                           {onNextCourse && (
                              <Button
                                 variant='outline'
                                 onClick={onNextCourse}
                                 size='sm'
                              >
                                 <BookOpen className='w-4 h-4 mr-2' />
                                 Next Course
                              </Button>
                           )}
                        </div>

                        <Button
                           variant='ghost'
                           onClick={onClose}
                           className='w-full'
                        >
                           Close
                        </Button>
                     </motion.div>
                  </Card>
               </motion.div>
            </>
         )}
      </AnimatePresence>
   );
}

/**
 * Hook to check if course is completed and show completion flow
 */
export function useCourseCompletion(course: Course) {
   const [showCompletion, setShowCompletion] = React.useState(false);
   const { getCourseProgress, isLessonCompleted } = useProgressStore();

   const isCompleted = React.useMemo(() => {
      const allLessons = course.modules.flatMap((module) => module.lessons);
      const completedLessons = allLessons.filter((lesson) =>
         isLessonCompleted(toCourseId(course.id), toLessonId(lesson.id))
      );
      return (
         completedLessons.length === allLessons.length && allLessons.length > 0
      );
   }, [course, isLessonCompleted]);

   const courseProgress = getCourseProgress(toCourseId(course.id));
   const wasAlreadyCompleted = React.useRef(
      courseProgress?.status === "completed"
   );

   React.useEffect(() => {
      if (isCompleted && !wasAlreadyCompleted.current) {
         setShowCompletion(true);
         wasAlreadyCompleted.current = true;
      }
   }, [isCompleted]);

   const handleClose = React.useCallback(() => {
      setShowCompletion(false);
   }, []);

   return {
      isCompleted,
      showCompletion,
      setShowCompletion,
      handleClose,
   };
}
