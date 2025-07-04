/**
 * Course overview component
 * Displays course information and lesson list
 */

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CourseEnrollmentButton } from "@/components/course/course-enrollment";
import { CourseRatings } from "@/components/course/course-ratings";
import {
   Clock,
   BookOpen,
   User,
   Calendar,
   Play,
   CheckCircle,
   Lock,
   Target,
} from "lucide-react";
import type { Course } from "@/types/course";

interface CourseOverviewProps {
   readonly course: Course;
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

export function CourseOverview({ course }: CourseOverviewProps) {
   const totalLessons = course.modules.reduce(
      (sum, module) => sum + module.lessons.length,
      0
   );
   const completedLessons = 0; // TODO: Get from progress store
   const progressPercentage =
      totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

   return (
      <motion.div
         variants={containerVariants}
         initial='hidden'
         animate='visible'
         className='container mx-auto px-4 py-8 max-w-6xl'
      >
         {/* Course Header */}
         <motion.div variants={itemVariants} className='mb-8'>
            <Card className='overflow-hidden'>
               <div className='md:flex'>
                  {course.thumbnail && (
                     <div className='md:w-1/3'>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                           src={course.thumbnail}
                           alt={course.title}
                           className='w-full h-48 md:h-full object-cover'
                        />
                     </div>
                  )}
                  <div className='md:w-2/3 p-6'>
                     <CardHeader className='p-0 mb-4'>
                        <div className='flex items-center gap-2 mb-2'>
                           <Badge variant='secondary'>
                              {course.difficulty}
                           </Badge>
                           <Badge variant='outline'>{course.status}</Badge>
                           {course.featured && (
                              <Badge variant='default'>Featured</Badge>
                           )}
                        </div>
                        <CardTitle className='text-3xl font-bold mb-2'>
                           {course.title}
                        </CardTitle>
                        <CardDescription className='text-lg'>
                           {course.description}
                        </CardDescription>
                     </CardHeader>

                     <CardContent className='p-0'>
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-6'>
                           <div className='flex items-center gap-2'>
                              <Clock className='w-4 h-4 text-blue-600' />
                              <span className='text-sm'>
                                 {course.duration}m
                              </span>
                           </div>
                           <div className='flex items-center gap-2'>
                              <BookOpen className='w-4 h-4 text-green-600' />
                              <span className='text-sm'>
                                 {totalLessons} lessons
                              </span>
                           </div>
                           <div className='flex items-center gap-2'>
                              <User className='w-4 h-4 text-purple-600' />
                              <span className='text-sm'>{course.author}</span>
                           </div>
                           <div className='flex items-center gap-2'>
                              <Calendar className='w-4 h-4 text-orange-600' />
                              <span className='text-sm'>
                                 {new Date(
                                    course.updatedAt
                                 ).toLocaleDateString()}
                              </span>
                           </div>
                        </div>

                        {progressPercentage > 0 && (
                           <div className='mb-4'>
                              <div className='flex justify-between items-center mb-2'>
                                 <span className='text-sm font-medium'>
                                    Progress
                                 </span>
                                 <span className='text-sm text-muted-foreground'>
                                    {completedLessons}/{totalLessons} completed
                                 </span>
                              </div>
                              <Progress
                                 value={progressPercentage}
                                 className='h-2'
                              />
                           </div>
                        )}

                        <div className='flex gap-3'>
                           <CourseEnrollmentButton
                              course={course}
                              variant='detailed'
                              className='flex-1'
                           />
                           <Button variant='outline'>
                              <BookOpen className='w-4 h-4 mr-2' />
                              Course Overview
                           </Button>
                        </div>
                     </CardContent>
                  </div>
               </div>
            </Card>
         </motion.div>

         <div className='grid lg:grid-cols-3 gap-8'>
            {/* Course Content */}
            <motion.div variants={itemVariants} className='lg:col-span-2'>
               <Card>
                  <CardHeader>
                     <CardTitle className='flex items-center gap-2'>
                        <BookOpen className='w-5 h-5' />
                        Course Content
                     </CardTitle>
                     <CardDescription>
                        {course.modules.length} modules • {totalLessons} lessons
                        • {course.duration} minutes
                     </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                     {course.modules.map((module) => (
                        <div key={module.id} className='border rounded-lg'>
                           <div className='p-4 bg-muted/50'>
                              <h3 className='font-semibold'>{module.title}</h3>
                              <p className='text-sm text-muted-foreground mt-1'>
                                 {module.description}
                              </p>
                              <div className='flex items-center gap-4 mt-2 text-sm text-muted-foreground'>
                                 <span>{module.lessons.length} lessons</span>
                                 <span>{module.duration} minutes</span>
                              </div>
                           </div>
                           <div className='p-2'>
                              {module.lessons.map((lesson) => (
                                 <Link
                                    key={lesson.id}
                                    href={`/lessons/${lesson.slug}`}
                                    className='block p-3 rounded-lg hover:bg-muted/50 transition-colors'
                                 >
                                    <div className='flex items-center justify-between'>
                                       <div className='flex items-center gap-3'>
                                          <div className='flex-shrink-0'>
                                             {lesson.type === "video" ? (
                                                <Play className='w-4 h-4 text-blue-600' />
                                             ) : lesson.type === "quiz" ? (
                                                <Target className='w-4 h-4 text-purple-600' />
                                             ) : (
                                                <BookOpen className='w-4 h-4 text-green-600' />
                                             )}
                                          </div>
                                          <div>
                                             <p className='font-medium'>
                                                {lesson.title}
                                             </p>
                                             <p className='text-sm text-muted-foreground'>
                                                {lesson.description}
                                             </p>
                                          </div>
                                       </div>
                                       <div className='flex items-center gap-2'>
                                          <span className='text-sm text-muted-foreground'>
                                             {lesson.duration}m
                                          </span>
                                          <CheckCircle className='w-4 h-4 text-green-600 opacity-0' />
                                       </div>
                                    </div>
                                 </Link>
                              ))}
                           </div>
                        </div>
                     ))}
                  </CardContent>
               </Card>
            </motion.div>

            {/* Course Details Sidebar */}
            <motion.div variants={itemVariants} className='space-y-6'>
               {/* Learning Objectives */}
               {course.learningObjectives.length > 0 && (
                  <Card>
                     <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                           <Target className='w-5 h-5' />
                           Learning Objectives
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <ul className='space-y-2'>
                           {course.learningObjectives.map(
                              (objective, index) => (
                                 <li
                                    key={index}
                                    className='flex items-start gap-2'
                                 >
                                    <CheckCircle className='w-4 h-4 text-green-600 mt-0.5 flex-shrink-0' />
                                    <span className='text-sm'>{objective}</span>
                                 </li>
                              )
                           )}
                        </ul>
                     </CardContent>
                  </Card>
               )}

               {/* Prerequisites */}
               {course.prerequisites.length > 0 && (
                  <Card>
                     <CardHeader>
                        <CardTitle className='flex items-center gap-2'>
                           <Lock className='w-5 h-5' />
                           Prerequisites
                        </CardTitle>
                     </CardHeader>
                     <CardContent>
                        <ul className='space-y-2'>
                           {course.prerequisites.map((prerequisite, index) => (
                              <li
                                 key={index}
                                 className='flex items-start gap-2'
                              >
                                 <BookOpen className='w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0' />
                                 <span className='text-sm'>{prerequisite}</span>
                              </li>
                           ))}
                        </ul>
                     </CardContent>
                  </Card>
               )}

               {/* Tags */}
               {course.tags.length > 0 && (
                  <Card>
                     <CardHeader>
                        <CardTitle>Tags</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className='flex flex-wrap gap-2'>
                           {course.tags.map((tag) => (
                              <Badge key={tag} variant='outline'>
                                 {tag}
                              </Badge>
                           ))}
                        </div>
                     </CardContent>
                  </Card>
               )}
            </motion.div>
         </div>

         {/* Course Ratings */}
         <motion.div variants={itemVariants} className='mt-8'>
            <CourseRatings course={course} />
         </motion.div>
      </motion.div>
   );
}
