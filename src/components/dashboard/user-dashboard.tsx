/**
 * User dashboard component
 * Displays user statistics, recent activity, and learning progress
 */

"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
   Trophy,
   BookOpen,
   Star,
   TrendingUp,
   Award,
   Target,
   Activity,
   Heart,
   Play,
   CheckCircle2,
} from "lucide-react";
import { useEnrollmentStore } from "@/stores";
import { useAuthStore } from "@/stores";
import type { UserId } from "@/types";

interface UserDashboardProps {
   readonly className?: string;
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

// Type casting utility
const toUserId = (id: string): UserId => id as UserId;

export function UserDashboard({ className }: UserDashboardProps) {
   const { user } = useAuthStore();
   const {
      recentActivity,
      recommendations,
      loadUserDashboard,
      loadRecommendations,
      getUserEnrollments,
      getUserFavorites,
      getUserRatings,
      isLoading,
      error,
   } = useEnrollmentStore();

   const userId = user ? toUserId(user.id) : null;

   useEffect(() => {
      if (userId) {
         loadUserDashboard(userId);
         loadRecommendations(userId);
      }
   }, [userId, loadUserDashboard, loadRecommendations]);

   if (!user || !userId) {
      return (
         <div className='container mx-auto px-4 py-8'>
            <Card>
               <CardContent className='flex flex-col items-center justify-center py-12'>
                  <BookOpen className='w-12 h-12 mb-4 text-muted-foreground' />
                  <h3 className='text-lg font-semibold mb-2'>
                     Sign in to view your dashboard
                  </h3>
                  <p className='text-muted-foreground text-center mb-4'>
                     Track your learning progress, view recommendations, and
                     manage your courses.
                  </p>
                  <Button asChild>
                     <Link href='/auth/login'>Sign In</Link>
                  </Button>
               </CardContent>
            </Card>
         </div>
      );
   }

   const userEnrollments = getUserEnrollments(userId);
   const userFavorites = getUserFavorites(userId);
   const userRatings = getUserRatings(userId);

   const completedCourses = userEnrollments.filter(
      (e) => e.status === "completed"
   ).length;
   const inProgressCourses = userEnrollments.filter(
      (e) => e.status === "enrolled"
   ).length;
   const averageRating =
      userRatings.length > 0
         ? userRatings.reduce((sum: number, r) => sum + r.rating, 0) /
           userRatings.length
         : 0;

   if (isLoading) {
      return (
         <div className='container mx-auto px-4 py-8'>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
               {[...Array(4)].map((_, i) => (
                  <Card key={i}>
                     <CardContent className='p-6'>
                        <div className='animate-pulse'>
                           <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
                           <div className='h-6 bg-gray-200 rounded w-1/2'></div>
                        </div>
                     </CardContent>
                  </Card>
               ))}
            </div>
         </div>
      );
   }

   return (
      <motion.div
         className={`container mx-auto px-4 py-8 ${className}`}
         variants={containerVariants}
         initial='hidden'
         animate='visible'
      >
         {/* Welcome Header */}
         <motion.div variants={itemVariants} className='mb-8'>
            <div className='flex items-center gap-4 mb-6'>
               <Avatar className='w-16 h-16'>
                  <AvatarImage src='' />
                  <AvatarFallback className='text-lg font-semibold'>
                     {user.email.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
               </Avatar>
               <div>
                  <h1 className='text-3xl font-bold'>Welcome back!</h1>
                  <p className='text-muted-foreground'>
                     Continue your learning journey
                  </p>
               </div>
            </div>
         </motion.div>

         {/* Stats Overview */}
         <motion.div
            variants={itemVariants}
            className='grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8'
         >
            <Card>
               <CardContent className='p-6'>
                  <div className='flex items-center gap-3'>
                     <div className='p-2 bg-blue-100 rounded-lg'>
                        <BookOpen className='w-5 h-5 text-blue-600' />
                     </div>
                     <div>
                        <p className='text-sm text-muted-foreground'>
                           Enrolled Courses
                        </p>
                        <p className='text-2xl font-bold'>
                           {userEnrollments.length}
                        </p>
                     </div>
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardContent className='p-6'>
                  <div className='flex items-center gap-3'>
                     <div className='p-2 bg-green-100 rounded-lg'>
                        <CheckCircle2 className='w-5 h-5 text-green-600' />
                     </div>
                     <div>
                        <p className='text-sm text-muted-foreground'>
                           Completed
                        </p>
                        <p className='text-2xl font-bold'>{completedCourses}</p>
                     </div>
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardContent className='p-6'>
                  <div className='flex items-center gap-3'>
                     <div className='p-2 bg-purple-100 rounded-lg'>
                        <Heart className='w-5 h-5 text-purple-600' />
                     </div>
                     <div>
                        <p className='text-sm text-muted-foreground'>
                           Favorites
                        </p>
                        <p className='text-2xl font-bold'>
                           {userFavorites.length}
                        </p>
                     </div>
                  </div>
               </CardContent>
            </Card>

            <Card>
               <CardContent className='p-6'>
                  <div className='flex items-center gap-3'>
                     <div className='p-2 bg-yellow-100 rounded-lg'>
                        <Star className='w-5 h-5 text-yellow-600' />
                     </div>
                     <div>
                        <p className='text-sm text-muted-foreground'>
                           Avg. Rating
                        </p>
                        <p className='text-2xl font-bold'>
                           {averageRating > 0
                              ? averageRating.toFixed(1)
                              : "N/A"}
                        </p>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </motion.div>

         <div className='grid lg:grid-cols-3 gap-8'>
            {/* Current Progress */}
            <motion.div
               variants={itemVariants}
               className='lg:col-span-2 space-y-6'
            >
               <Card>
                  <CardHeader>
                     <CardTitle className='flex items-center gap-2'>
                        <TrendingUp className='w-5 h-5' />
                        Current Progress
                     </CardTitle>
                     <CardDescription>
                        Your ongoing courses and progress
                     </CardDescription>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                     {inProgressCourses > 0 ? (
                        userEnrollments
                           .filter((e) => e.status === "enrolled")
                           .slice(0, 3)
                           .map((enrollment) => (
                              <div
                                 key={enrollment.id}
                                 className='flex items-center gap-4 p-4 border rounded-lg'
                              >
                                 <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center'>
                                    <BookOpen className='w-6 h-6 text-white' />
                                 </div>
                                 <div className='flex-1'>
                                    <h4 className='font-medium'>
                                       Course {enrollment.courseId}
                                    </h4>
                                    <div className='flex items-center gap-2 mt-1'>
                                       <Progress
                                          value={enrollment.progress}
                                          className='flex-1 h-2'
                                       />
                                       <span className='text-sm text-muted-foreground'>
                                          {Math.round(enrollment.progress)}%
                                       </span>
                                    </div>
                                 </div>
                                 <Button variant='outline' size='sm' asChild>
                                    <Link
                                       href={`/courses/${enrollment.courseId}`}
                                    >
                                       <Play className='w-4 h-4 mr-2' />
                                       Continue
                                    </Link>
                                 </Button>
                              </div>
                           ))
                     ) : (
                        <div className='text-center py-8 text-muted-foreground'>
                           <BookOpen className='w-12 h-12 mx-auto mb-4 opacity-50' />
                           <p>No courses in progress</p>
                           <Button className='mt-4' asChild>
                              <Link href='/courses'>Browse Courses</Link>
                           </Button>
                        </div>
                     )}
                  </CardContent>
               </Card>

               {/* Recent Activity */}
               <Card>
                  <CardHeader>
                     <CardTitle className='flex items-center gap-2'>
                        <Activity className='w-5 h-5' />
                        Recent Activity
                     </CardTitle>
                     <CardDescription>
                        Your latest learning activities
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     {recentActivity.length > 0 ? (
                        <div className='space-y-4'>
                           {recentActivity.slice(0, 5).map((activity) => (
                              <div
                                 key={activity.id}
                                 className='flex items-start gap-3'
                              >
                                 <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0'>
                                    <Target className='w-4 h-4 text-blue-600' />
                                 </div>
                                 <div className='flex-1'>
                                    <p className='text-sm'>
                                       {activity.type.replace("_", " ")}
                                    </p>
                                    <p className='text-xs text-muted-foreground'>
                                       {new Date(
                                          activity.timestamp
                                       ).toLocaleDateString()}
                                    </p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     ) : (
                        <div className='text-center py-8 text-muted-foreground'>
                           <Activity className='w-12 h-12 mx-auto mb-4 opacity-50' />
                           <p>No recent activity</p>
                        </div>
                     )}
                  </CardContent>
               </Card>
            </motion.div>

            {/* Sidebar */}
            <motion.div variants={itemVariants} className='space-y-6'>
               {/* Recommendations */}
               <Card>
                  <CardHeader>
                     <CardTitle className='flex items-center gap-2'>
                        <Trophy className='w-5 h-5' />
                        Recommended for You
                     </CardTitle>
                     <CardDescription>
                        Courses based on your interests
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     {recommendations.length > 0 ? (
                        <div className='space-y-4'>
                           {recommendations.slice(0, 3).map((rec, index) => (
                              <div
                                 key={`${rec.courseId}-${index}`}
                                 className='space-y-2'
                              >
                                 <h4 className='font-medium text-sm'>
                                    Course {rec.courseId}
                                 </h4>
                                 <p className='text-xs text-muted-foreground'>
                                    {rec.explanation}
                                 </p>
                                 <div className='flex items-center gap-2'>
                                    <Badge
                                       variant='secondary'
                                       className='text-xs'
                                    >
                                       {Math.round(rec.score * 100)}% match
                                    </Badge>
                                    <Button variant='outline' size='sm' asChild>
                                       <Link href={`/courses/${rec.courseId}`}>
                                          View
                                       </Link>
                                    </Button>
                                 </div>
                              </div>
                           ))}
                        </div>
                     ) : (
                        <div className='text-center py-6 text-muted-foreground'>
                           <Trophy className='w-8 h-8 mx-auto mb-2 opacity-50' />
                           <p className='text-sm'>No recommendations yet</p>
                        </div>
                     )}
                  </CardContent>
               </Card>

               {/* Achievements */}
               <Card>
                  <CardHeader>
                     <CardTitle className='flex items-center gap-2'>
                        <Award className='w-5 h-5' />
                        Achievements
                     </CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className='space-y-3'>
                        {completedCourses > 0 && (
                           <div className='flex items-center gap-3'>
                              <div className='w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center'>
                                 <Award className='w-4 h-4 text-yellow-600' />
                              </div>
                              <div>
                                 <p className='text-sm font-medium'>
                                    Course Completer
                                 </p>
                                 <p className='text-xs text-muted-foreground'>
                                    Completed {completedCourses} course
                                    {completedCourses !== 1 ? "s" : ""}
                                 </p>
                              </div>
                           </div>
                        )}

                        {userRatings.length >= 5 && (
                           <div className='flex items-center gap-3'>
                              <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                                 <Star className='w-4 h-4 text-blue-600' />
                              </div>
                              <div>
                                 <p className='text-sm font-medium'>
                                    Helpful Reviewer
                                 </p>
                                 <p className='text-xs text-muted-foreground'>
                                    Submitted {userRatings.length} reviews
                                 </p>
                              </div>
                           </div>
                        )}

                        {userEnrollments.length >= 10 && (
                           <div className='flex items-center gap-3'>
                              <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                                 <BookOpen className='w-4 h-4 text-green-600' />
                              </div>
                              <div>
                                 <p className='text-sm font-medium'>
                                    Learning Enthusiast
                                 </p>
                                 <p className='text-xs text-muted-foreground'>
                                    Enrolled in {userEnrollments.length} courses
                                 </p>
                              </div>
                           </div>
                        )}

                        {completedCourses === 0 &&
                           userRatings.length === 0 &&
                           userEnrollments.length < 10 && (
                              <div className='text-center py-6 text-muted-foreground'>
                                 <Award className='w-8 h-8 mx-auto mb-2 opacity-50' />
                                 <p className='text-sm'>No achievements yet</p>
                                 <p className='text-xs'>
                                    Complete courses to earn badges!
                                 </p>
                              </div>
                           )}
                     </div>
                  </CardContent>
               </Card>
            </motion.div>
         </div>

         {error && (
            <motion.div variants={itemVariants} className='mt-8'>
               <Card className='border-red-200 bg-red-50'>
                  <CardContent className='p-4'>
                     <p className='text-red-800 text-sm'>
                        Error loading dashboard: {error.message}
                     </p>
                  </CardContent>
               </Card>
            </motion.div>
         )}
      </motion.div>
   );
}
