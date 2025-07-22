/**
 * Course Analytics Dialog Component
 * Displays detailed analytics for a specific course
 * Follows Single Responsibility Principle
 */

"use client";

import React from "react";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
   Users,
   Clock,
   Star,
   TrendingUp,
   GraduationCap,
   CalendarDays,
   BarChart3,
} from "lucide-react";
import type { AdminCourse, CourseAnalytics } from "@/lib/admin/course-service";

interface CourseAnalyticsDialogProps {
   open: boolean;
   onClose: () => void;
   course: AdminCourse | null;
   analytics: CourseAnalytics | null;
   loading?: boolean;
}

export function CourseAnalyticsDialog({
   open,
   onClose,
   course,
   analytics,
   loading = false,
}: CourseAnalyticsDialogProps) {
   if (!course || !analytics) {
      return null;
   }

   const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat("en-US", {
         year: "numeric",
         month: "short",
         day: "numeric",
      }).format(date);
   };

   const formatDuration = (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      if (hours > 0) {
         return `${hours}h ${mins}m`;
      }
      return `${mins}m`;
   };

   return (
      <Dialog open={open} onOpenChange={onClose}>
         <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
            <DialogHeader>
               <DialogTitle className='flex items-center gap-2'>
                  <BarChart3 className='h-5 w-5' />
                  Course Analytics: {course.title}
               </DialogTitle>
               <DialogDescription>
                  Detailed analytics and performance metrics for this course
               </DialogDescription>
            </DialogHeader>

            {loading ? (
               <div className='flex justify-center py-8'>
                  <div className='text-muted-foreground'>
                     Loading analytics...
                  </div>
               </div>
            ) : (
               <div className='space-y-6'>
                  {/* Overview Cards */}
                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                     <Card>
                        <CardContent className='flex items-center justify-between p-4'>
                           <div>
                              <p className='text-sm font-medium text-muted-foreground'>
                                 Total Students
                              </p>
                              <p className='text-2xl font-bold'>
                                 {analytics.totalStudents}
                              </p>
                           </div>
                           <Users className='h-8 w-8 text-blue-500' />
                        </CardContent>
                     </Card>

                     <Card>
                        <CardContent className='flex items-center justify-between p-4'>
                           <div>
                              <p className='text-sm font-medium text-muted-foreground'>
                                 Completions
                              </p>
                              <p className='text-2xl font-bold'>
                                 {analytics.completedStudents}
                              </p>
                           </div>
                           <GraduationCap className='h-8 w-8 text-green-500' />
                        </CardContent>
                     </Card>

                     <Card>
                        <CardContent className='flex items-center justify-between p-4'>
                           <div>
                              <p className='text-sm font-medium text-muted-foreground'>
                                 Avg. Rating
                              </p>
                              <p className='text-2xl font-bold'>
                                 {analytics.averageRating.toFixed(1)}
                              </p>
                           </div>
                           <Star className='h-8 w-8 text-yellow-500' />
                        </CardContent>
                     </Card>

                     <Card>
                        <CardContent className='flex items-center justify-between p-4'>
                           <div>
                              <p className='text-sm font-medium text-muted-foreground'>
                                 Revenue
                              </p>
                              <p className='text-2xl font-bold'>
                                 ${analytics.revenue.toLocaleString()}
                              </p>
                           </div>
                           <TrendingUp className='h-8 w-8 text-purple-500' />
                        </CardContent>
                     </Card>
                  </div>

                  {/* Completion Metrics */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Completion Metrics</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className='space-y-4'>
                           <div>
                              <div className='flex justify-between text-sm mb-2'>
                                 <span>Completion Rate</span>
                                 <span>
                                    {analytics.completionRate.toFixed(1)}%
                                 </span>
                              </div>
                              <Progress
                                 value={analytics.completionRate}
                                 className='h-2'
                              />
                           </div>

                           <div className='grid grid-cols-3 gap-4 pt-4 border-t'>
                              <div className='text-center'>
                                 <p className='text-2xl font-bold text-green-600'>
                                    {analytics.completedStudents}
                                 </p>
                                 <p className='text-sm text-muted-foreground'>
                                    Completed
                                 </p>
                              </div>
                              <div className='text-center'>
                                 <p className='text-2xl font-bold text-yellow-600'>
                                    {analytics.inProgressStudents}
                                 </p>
                                 <p className='text-sm text-muted-foreground'>
                                    In Progress
                                 </p>
                              </div>
                              <div className='text-center'>
                                 <p className='text-2xl font-bold text-red-600'>
                                    {analytics.totalStudents -
                                       analytics.completedStudents -
                                       analytics.inProgressStudents}
                                 </p>
                                 <p className='text-sm text-muted-foreground'>
                                    Not Started
                                 </p>
                              </div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Time Analytics */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Time Analytics</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className='grid grid-cols-2 gap-6'>
                           <div>
                              <p className='text-sm font-medium text-muted-foreground mb-2'>
                                 Average Time to Complete
                              </p>
                              <div className='flex items-center gap-2'>
                                 <Clock className='h-4 w-4 text-muted-foreground' />
                                 <span className='text-lg font-semibold'>
                                    {formatDuration(
                                       analytics.averageTimeToComplete
                                    )}
                                 </span>
                              </div>
                           </div>
                           <div>
                              <p className='text-sm font-medium text-muted-foreground mb-2'>
                                 Course Duration
                              </p>
                              <div className='flex items-center gap-2'>
                                 <CalendarDays className='h-4 w-4 text-muted-foreground' />
                                 <span className='text-lg font-semibold'>
                                    {course.duration}h
                                 </span>
                              </div>
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Course Information */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Course Information</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className='grid grid-cols-2 gap-6'>
                           <div className='space-y-3'>
                              <div>
                                 <p className='text-sm font-medium text-muted-foreground'>
                                    Status
                                 </p>
                                 <Badge
                                    variant={
                                       course.published
                                          ? "default"
                                          : "secondary"
                                    }
                                 >
                                    {course.published ? "Published" : "Draft"}
                                 </Badge>
                              </div>
                              <div>
                                 <p className='text-sm font-medium text-muted-foreground'>
                                    Difficulty
                                 </p>
                                 <Badge
                                    variant='outline'
                                    className={
                                       course.difficulty === "beginner"
                                          ? "border-green-500 text-green-700"
                                          : course.difficulty === "intermediate"
                                            ? "border-yellow-500 text-yellow-700"
                                            : "border-red-500 text-red-700"
                                    }
                                 >
                                    {course.difficulty}
                                 </Badge>
                              </div>
                              <div>
                                 <p className='text-sm font-medium text-muted-foreground'>
                                    Category
                                 </p>
                                 <p className='font-medium'>
                                    {course.category}
                                 </p>
                              </div>
                           </div>
                           <div className='space-y-3'>
                              <div>
                                 <p className='text-sm font-medium text-muted-foreground'>
                                    Author
                                 </p>
                                 <p className='font-medium'>{course.author}</p>
                              </div>
                              <div>
                                 <p className='text-sm font-medium text-muted-foreground'>
                                    Created
                                 </p>
                                 <p className='font-medium'>
                                    {formatDate(course.createdAt)}
                                 </p>
                              </div>
                              <div>
                                 <p className='text-sm font-medium text-muted-foreground'>
                                    Last Updated
                                 </p>
                                 <p className='font-medium'>
                                    {formatDate(course.updatedAt)}
                                 </p>
                              </div>
                           </div>
                        </div>

                        {/* Tags */}
                        <div className='mt-4 pt-4 border-t'>
                           <p className='text-sm font-medium text-muted-foreground mb-2'>
                              Tags
                           </p>
                           <div className='flex flex-wrap gap-2'>
                              {course.tags.map((tag) => (
                                 <Badge
                                    key={tag}
                                    variant='secondary'
                                    className='text-xs'
                                 >
                                    {tag}
                                 </Badge>
                              ))}
                           </div>
                        </div>
                     </CardContent>
                  </Card>

                  {/* Monthly Enrollments */}
                  <Card>
                     <CardHeader>
                        <CardTitle>Monthly Enrollments</CardTitle>
                     </CardHeader>
                     <CardContent>
                        <div className='space-y-2'>
                           {analytics.monthlyEnrollments.map(
                              (enrollment, index) => {
                                 const maxEnrollments = Math.max(
                                    ...analytics.monthlyEnrollments.map(
                                       (e) => e.count
                                    )
                                 );
                                 const percentage =
                                    maxEnrollments > 0
                                       ? (enrollment.count / maxEnrollments) *
                                         100
                                       : 0;

                                 return (
                                    <div
                                       key={index}
                                       className='flex items-center justify-between'
                                    >
                                       <span className='text-sm font-medium min-w-0 flex-1'>
                                          {enrollment.month}
                                       </span>
                                       <div className='flex items-center gap-3 flex-1'>
                                          <Progress
                                             value={percentage}
                                             className='h-2'
                                          />
                                          <span className='text-sm text-muted-foreground min-w-0'>
                                             {enrollment.count}
                                          </span>
                                       </div>
                                    </div>
                                 );
                              }
                           )}
                        </div>
                     </CardContent>
                  </Card>
               </div>
            )}
         </DialogContent>
      </Dialog>
   );
}
