/**
 * Course ratings and reviews component
 * Displays course ratings, reviews, and rating submission form
 */

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
   Star,
   MessageSquare,
   ThumbsUp,
   Flag,
   Edit3,
   Trash2,
} from "lucide-react";
import { useEnrollmentStore } from "@/stores";
import { useAuthStore } from "@/stores";
import type { Course, CourseRating, UserId, CourseId } from "@/types";

interface CourseRatingsProps {
   readonly course: Course;
   readonly className?: string;
}

interface RatingStarsProps {
   readonly rating: number;
   readonly interactive?: boolean;
   readonly size?: "sm" | "md" | "lg";
   readonly onRatingChange?: (rating: number) => void;
}

interface ReviewItemProps {
   readonly rating: CourseRating;
   readonly canEdit?: boolean;
   readonly onEdit?: (rating: CourseRating) => void;
   readonly onDelete?: (ratingId: string) => void;
}

// Type casting utilities
const toUserId = (id: string): UserId => id as UserId;
const toCourseId = (id: string): CourseId => id as CourseId;

function RatingStars({
   rating,
   interactive = false,
   size = "md",
   onRatingChange,
}: RatingStarsProps) {
   const [hoveredRating, setHoveredRating] = useState<number>(0);

   const sizeClasses = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5",
   };

   const handleStarClick = (newRating: number) => {
      if (interactive && onRatingChange) {
         onRatingChange(newRating);
      }
   };

   const handleStarHover = (newRating: number) => {
      if (interactive) {
         setHoveredRating(newRating);
      }
   };

   const handleStarLeave = () => {
      if (interactive) {
         setHoveredRating(0);
      }
   };

   const displayRating = interactive ? hoveredRating || rating : rating;

   return (
      <div className='flex items-center gap-1'>
         {[1, 2, 3, 4, 5].map((star) => (
            <Star
               key={star}
               className={`${sizeClasses[size]} ${
                  interactive ? "cursor-pointer transition-colors" : ""
               } ${
                  star <= displayRating
                     ? "fill-yellow-400 text-yellow-400"
                     : "text-gray-300"
               }`}
               onClick={() => handleStarClick(star)}
               onMouseEnter={() => handleStarHover(star)}
               onMouseLeave={handleStarLeave}
            />
         ))}
      </div>
   );
}

function ReviewItem({ rating, canEdit, onEdit, onDelete }: ReviewItemProps) {
   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className='border rounded-lg p-4 space-y-3'
      >
         <div className='flex items-start justify-between'>
            <div className='flex items-center gap-3'>
               <Avatar className='w-8 h-8'>
                  <AvatarImage src='' />
                  <AvatarFallback>
                     {rating.userId.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
               </Avatar>
               <div>
                  <div className='flex items-center gap-2'>
                     <span className='font-medium text-sm'>Anonymous User</span>
                     <RatingStars rating={rating.rating} size='sm' />
                  </div>
                  <span className='text-xs text-muted-foreground'>
                     {new Date(rating.ratedAt).toLocaleDateString()}
                  </span>
               </div>
            </div>

            {canEdit && (
               <div className='flex gap-1'>
                  <Button
                     variant='ghost'
                     size='sm'
                     onClick={() => onEdit?.(rating)}
                  >
                     <Edit3 className='w-3 h-3' />
                  </Button>
                  <Button
                     variant='ghost'
                     size='sm'
                     onClick={() => onDelete?.(rating.id)}
                  >
                     <Trash2 className='w-3 h-3' />
                  </Button>
               </div>
            )}
         </div>

         {rating.review && (
            <p className='text-sm text-muted-foreground leading-relaxed'>
               {rating.review}
            </p>
         )}

         <div className='flex items-center gap-4 text-xs text-muted-foreground'>
            <button className='flex items-center gap-1 hover:text-foreground transition-colors'>
               <ThumbsUp className='w-3 h-3' />
               Helpful
            </button>
            <button className='flex items-center gap-1 hover:text-foreground transition-colors'>
               <Flag className='w-3 h-3' />
               Report
            </button>
         </div>
      </motion.div>
   );
}

export function CourseRatings({ course, className }: CourseRatingsProps) {
   const { user } = useAuthStore();
   const {
      rateCourse,
      updateRating,
      deleteRating,
      getCourseRatings,
      getCourseRating,
      isEnrolled,
   } = useEnrollmentStore();

   const [isRating, setIsRating] = useState(false);
   const [newRating, setNewRating] = useState(0);
   const [newReview, setNewReview] = useState("");
   const [editingRating, setEditingRating] = useState<CourseRating | null>(
      null
   );

   const courseId = toCourseId(course.id);
   const userId = user ? toUserId(user.id) : null;

   const courseRatings = getCourseRatings(courseId);
   const userRating = userId ? getCourseRating(userId, courseId) : null;
   const userIsEnrolled = userId ? isEnrolled(userId, courseId) : false;

   const averageRating =
      courseRatings.length > 0
         ? courseRatings.reduce(
              (sum: number, r: CourseRating) => sum + r.rating,
              0
           ) / courseRatings.length
         : 0;

   const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      count: courseRatings.filter((r: CourseRating) => r.rating === stars)
         .length,
      percentage:
         courseRatings.length > 0
            ? (courseRatings.filter((r: CourseRating) => r.rating === stars)
                 .length /
                 courseRatings.length) *
              100
            : 0,
   }));

   const handleSubmitRating = async () => {
      if (!userId || newRating === 0) return;

      try {
         if (editingRating) {
            updateRating(editingRating.id, newRating, newReview || undefined);
         } else {
            await rateCourse(
               userId,
               courseId,
               newRating,
               newReview || undefined
            );
         }

         setIsRating(false);
         setEditingRating(null);
         setNewRating(0);
         setNewReview("");
      } catch (error) {
         console.error("Failed to submit rating:", error);
      }
   };

   const handleEditRating = (rating: CourseRating) => {
      setEditingRating(rating);
      setNewRating(rating.rating);
      setNewReview(rating.review || "");
      setIsRating(true);
   };

   const handleDeleteRating = (ratingId: string) => {
      deleteRating(ratingId);
   };

   const canRate = userId && userIsEnrolled && !userRating;
   const canEdit = userId && userRating;

   return (
      <div className={className}>
         <Card>
            <CardHeader>
               <CardTitle className='flex items-center gap-2'>
                  <Star className='w-5 h-5' />
                  Ratings & Reviews
               </CardTitle>
               <CardDescription>
                  See what students are saying about this course
               </CardDescription>
            </CardHeader>

            <CardContent className='space-y-6'>
               {/* Rating Summary */}
               <div className='grid md:grid-cols-2 gap-6'>
                  <div className='text-center space-y-2'>
                     <div className='text-4xl font-bold'>
                        {averageRating.toFixed(1)}
                     </div>
                     <RatingStars rating={averageRating} size='lg' />
                     <div className='text-sm text-muted-foreground'>
                        {courseRatings.length}{" "}
                        {courseRatings.length === 1 ? "review" : "reviews"}
                     </div>
                  </div>

                  <div className='space-y-2'>
                     {ratingDistribution.map(({ stars, count, percentage }) => (
                        <div
                           key={stars}
                           className='flex items-center gap-2 text-sm'
                        >
                           <span className='w-8 text-right'>{stars}</span>
                           <Star className='w-3 h-3 fill-yellow-400 text-yellow-400' />
                           <div className='flex-1 bg-gray-200 rounded-full h-2'>
                              <div
                                 className='bg-yellow-400 h-2 rounded-full transition-all duration-300'
                                 style={{ width: `${percentage}%` }}
                              />
                           </div>
                           <span className='w-8 text-muted-foreground'>
                              {count}
                           </span>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Rating Form */}
               {(canRate || canEdit || isRating) && (
                  <div className='border rounded-lg p-4 space-y-4'>
                     {!isRating ? (
                        <div className='flex items-center justify-between'>
                           <div>
                              {canEdit ? (
                                 <div className='flex items-center gap-2'>
                                    <span className='text-sm font-medium'>
                                       Your rating:
                                    </span>
                                    <RatingStars
                                       rating={userRating!.rating}
                                       size='sm'
                                    />
                                 </div>
                              ) : (
                                 <span className='text-sm font-medium'>
                                    Rate this course
                                 </span>
                              )}
                           </div>
                           <Button
                              variant={canEdit ? "outline" : "default"}
                              size='sm'
                              onClick={() => {
                                 if (canEdit) {
                                    handleEditRating(userRating!);
                                 } else {
                                    setIsRating(true);
                                 }
                              }}
                           >
                              {canEdit ? "Edit Rating" : "Write a Review"}
                           </Button>
                        </div>
                     ) : (
                        <div className='space-y-4'>
                           <div>
                              <label className='text-sm font-medium mb-2 block'>
                                 Rating
                              </label>
                              <RatingStars
                                 rating={newRating}
                                 interactive
                                 size='lg'
                                 onRatingChange={setNewRating}
                              />
                           </div>

                           <div>
                              <label className='text-sm font-medium mb-2 block'>
                                 Review (optional)
                              </label>
                              <Textarea
                                 placeholder='Share your experience with this course...'
                                 value={newReview}
                                 onChange={(
                                    e: React.ChangeEvent<HTMLTextAreaElement>
                                 ) => setNewReview(e.target.value)}
                                 className='min-h-[100px]'
                              />
                           </div>

                           <div className='flex gap-2'>
                              <Button
                                 onClick={handleSubmitRating}
                                 disabled={newRating === 0}
                              >
                                 {editingRating
                                    ? "Update Rating"
                                    : "Submit Rating"}
                              </Button>
                              <Button
                                 variant='outline'
                                 onClick={() => {
                                    setIsRating(false);
                                    setEditingRating(null);
                                    setNewRating(0);
                                    setNewReview("");
                                 }}
                              >
                                 Cancel
                              </Button>
                           </div>
                        </div>
                     )}
                  </div>
               )}

               {/* Reviews List */}
               {courseRatings.length > 0 && (
                  <div className='space-y-4'>
                     <h4 className='font-medium flex items-center gap-2'>
                        <MessageSquare className='w-4 h-4' />
                        Student Reviews
                     </h4>
                     <div className='space-y-3'>
                        {courseRatings.map((rating: CourseRating) => (
                           <ReviewItem
                              key={rating.id}
                              rating={rating}
                              canEdit={userId === rating.userId}
                              onEdit={handleEditRating}
                              onDelete={handleDeleteRating}
                           />
                        ))}
                     </div>
                  </div>
               )}

               {courseRatings.length === 0 && (
                  <div className='text-center py-8 text-muted-foreground'>
                     <MessageSquare className='w-12 h-12 mx-auto mb-4 opacity-50' />
                     <p>No reviews yet. Be the first to rate this course!</p>
                  </div>
               )}
            </CardContent>
         </Card>
      </div>
   );
}
