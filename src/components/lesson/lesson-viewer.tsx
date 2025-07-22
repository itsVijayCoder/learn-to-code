/**
 * Lesson viewer component
 * Displays MDX lesson content with navigation and progress tracking
 */

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MDXRenderer } from "@/components/mdx";
import { Breadcrumb, useCourseBreadcrumbs } from "@/components/navigation";
import {
   ArrowLeft,
   ArrowRight,
   Clock,
   BookOpen,
   User,
   Calendar,
   CheckCircle,
   Target,
   PlayCircle,
} from "lucide-react";
import { useProgressStore } from "@/stores";
import type { MDXContent } from "@/types/mdx";
import type { Course, Lesson, CourseId, LessonId } from "@/types/course";
import type { UserId } from "@/types/user";

// Type casting utilities for branded types
const toCourseId = (id: string): CourseId => id as CourseId;
const toLessonId = (id: string): LessonId => id as LessonId;
const toUserId = (id: string): UserId => id as UserId;

interface LessonViewerProps {
   readonly lesson: MDXContent;
   readonly course?: Course;
   readonly lessonData?: Lesson;
}

const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.1,
      },
   },
};

const itemVariants = {
   hidden: { opacity: 0, y: 20 },
   visible: { opacity: 1, y: 0 },
};

interface LessonViewerProps {
   readonly lesson: MDXContent;
   readonly course?: Course;
   readonly lessonData?: Lesson;
}

export function LessonViewer({
   lesson,
   course,
   lessonData,
}: LessonViewerProps) {
   const { frontmatter } = lesson;
   const { markLessonComplete, isLessonCompleted } = useProgressStore();

   // Generate breadcrumbs
   const breadcrumbItems = useCourseBreadcrumbs(
      course?.title,
      course?.slug,
      frontmatter.title
   );

   const [readingProgress, setReadingProgress] = React.useState(0);

   // Track lesson completion status
   const isCompleted =
      course && lessonData
         ? isLessonCompleted(toCourseId(course.id), toLessonId(lessonData.id))
         : false;

   // Handle marking lesson as complete
   const handleMarkComplete = React.useCallback(() => {
      if (course && lessonData) {
         markLessonComplete(
            toUserId("current-user"), // TODO: Get actual user ID
            toCourseId(course.id),
            toLessonId(lessonData.id)
         );
      }
   }, [course, lessonData, markLessonComplete]);

   // Mock reading progress tracking
   React.useEffect(() => {
      const timer = setInterval(() => {
         setReadingProgress((prev) => Math.min(prev + 1, 100));
      }, 30000); // Increment every 30 seconds

      return () => clearInterval(timer);
   }, []);

   return (
      <motion.div
         variants={containerVariants}
         initial='hidden'
         animate='visible'
         className='container mx-auto px-4 py-8'
      >
         {/* Breadcrumb Navigation */}
         <motion.div variants={itemVariants} className='mb-6'>
            <Breadcrumb items={breadcrumbItems} />
         </motion.div>
         {/* Lesson Header */}
         <motion.div variants={itemVariants} className='mb-8'>
            <Card>
               <CardHeader>
                  <div className='flex flex-wrap items-center gap-2 mb-4'>
                     {frontmatter.type && (
                        <Badge variant='secondary'>{frontmatter.type}</Badge>
                     )}
                     {isCompleted && (
                        <Badge variant='default' className='bg-green-600'>
                           <CheckCircle className='w-3 h-3 mr-1' />
                           Completed
                        </Badge>
                     )}
                     {frontmatter.tags?.map((tag) => (
                        <Badge key={tag} variant='outline'>
                           {tag}
                        </Badge>
                     ))}
                  </div>

                  <CardTitle className='text-3xl font-bold mb-2'>
                     {frontmatter.title}
                  </CardTitle>
                  <p className='text-lg text-muted-foreground'>
                     {frontmatter.description}
                  </p>

                  <div className='flex flex-wrap items-center gap-6 mt-4 text-sm text-muted-foreground'>
                     {frontmatter.duration && (
                        <div className='flex items-center gap-2'>
                           <Clock className='w-4 h-4' />
                           <span>{frontmatter.duration} minutes</span>
                        </div>
                     )}

                     {frontmatter.author && (
                        <div className='flex items-center gap-2'>
                           <User className='w-4 h-4' />
                           <span>{frontmatter.author}</span>
                        </div>
                     )}

                     {frontmatter.lastModified && (
                        <div className='flex items-center gap-2'>
                           <Calendar className='w-4 h-4' />
                           <span>
                              Updated{" "}
                              {new Date(
                                 frontmatter.lastModified
                              ).toLocaleDateString()}
                           </span>
                        </div>
                     )}
                  </div>
               </CardHeader>
            </Card>
         </motion.div>

         <div className='grid lg:grid-cols-4 gap-8'>
            {/* Main Content */}
            <motion.div variants={itemVariants} className='lg:col-span-3'>
               <Card className='min-h-[600px]'>
                  <CardContent className='p-8'>
                     <MDXRenderer content={lesson} className='max-w-none' />

                     {/* Lesson Actions */}
                     <div className='flex justify-between items-center mt-12 pt-8 border-t'>
                        <Button variant='outline' asChild>
                           <Link
                              href={
                                 course ? `/courses/${course.slug}` : "/courses"
                              }
                           >
                              <ArrowLeft className='w-4 h-4 mr-2' />
                              {course ? "Back to Course" : "Back to Courses"}
                           </Link>
                        </Button>

                        {!isCompleted ? (
                           <Button onClick={handleMarkComplete}>
                              <CheckCircle className='w-4 h-4 mr-2' />
                              Mark Complete
                           </Button>
                        ) : (
                           <Button variant='outline' disabled>
                              <CheckCircle className='w-4 h-4 mr-2' />
                              Completed
                           </Button>
                        )}
                     </div>
                  </CardContent>
               </Card>
            </motion.div>

            {/* Sidebar */}
            <motion.div variants={itemVariants} className='space-y-6'>
               {/* Prerequisites */}
               {frontmatter.prerequisites &&
                  frontmatter.prerequisites.length > 0 && (
                     <Card>
                        <CardHeader>
                           <CardTitle className='flex items-center gap-2 text-lg'>
                              <BookOpen className='w-5 h-5' />
                              Prerequisites
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <ul className='space-y-2'>
                              {frontmatter.prerequisites.map(
                                 (prerequisite, index) => (
                                    <li
                                       key={index}
                                       className='flex items-start gap-2'
                                    >
                                       <ArrowRight className='w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0' />
                                       <span className='text-sm'>
                                          {prerequisite}
                                       </span>
                                    </li>
                                 )
                              )}
                           </ul>
                        </CardContent>
                     </Card>
                  )}

               {/* Learning Objectives */}
               {frontmatter.learningObjectives &&
                  frontmatter.learningObjectives.length > 0 && (
                     <Card>
                        <CardHeader>
                           <CardTitle className='flex items-center gap-2 text-lg'>
                              <Target className='w-5 h-5' />
                              Learning Objectives
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <ul className='space-y-2'>
                              {frontmatter.learningObjectives.map(
                                 (objective, index) => (
                                    <li
                                       key={index}
                                       className='flex items-start gap-2'
                                    >
                                       <CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
                                       <span className='text-sm'>
                                          {objective}
                                       </span>
                                    </li>
                                 )
                              )}
                           </ul>
                        </CardContent>
                     </Card>
                  )}

               {/* Lesson Progress */}
               <Card>
                  <CardHeader>
                     <CardTitle className='text-lg'>Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className='space-y-4'>
                        <div>
                           <div className='flex justify-between items-center mb-2'>
                              <span className='text-sm font-medium'>
                                 Reading Progress
                              </span>
                              <span className='text-sm text-muted-foreground'>
                                 {readingProgress}%
                              </span>
                           </div>
                           <Progress value={readingProgress} className='h-2' />
                        </div>

                        <div className='text-sm text-muted-foreground'>
                           <p>
                              Estimated time: {frontmatter.duration || 30}{" "}
                              minutes
                           </p>
                           {isCompleted && (
                              <p className='text-green-600 font-medium mt-2'>
                                 ✓ Lesson completed
                              </p>
                           )}
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Quick Actions */}
               <Card>
                  <CardHeader>
                     <CardTitle className='text-lg'>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-3'>
                     <Button variant='outline' className='w-full justify-start'>
                        <BookOpen className='w-4 h-4 mr-2' />
                        Take Notes
                     </Button>
                     <Button variant='outline' className='w-full justify-start'>
                        <Target className='w-4 h-4 mr-2' />
                        Practice Quiz
                     </Button>
                     {course && (
                        <Button
                           variant='outline'
                           className='w-full justify-start'
                           asChild
                        >
                           <Link href={`/courses/${course.slug}`}>
                              <PlayCircle className='w-4 h-4 mr-2' />
                              Course Overview
                           </Link>
                        </Button>
                     )}
                  </CardContent>
               </Card>
            </motion.div>
         </div>
      </motion.div>
   );
}
