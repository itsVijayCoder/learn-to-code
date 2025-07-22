/**
 * Enrollment store for managing course enrollments, favorites, and ratings
 */

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type {
   Enrollment,
   CourseFavorite,
   CourseRating,
   UserDashboardStats,
   UserActivity,
   CourseRecommendation,
   EnrollmentStatus,
   UserId,
   CourseId,
} from "@/types";

/**
 * Enrollment store interface
 */
interface EnrollmentStore {
   // State
   enrollments: Record<string, Enrollment>;
   favorites: Record<string, CourseFavorite>;
   ratings: Record<string, CourseRating>;
   userStats: UserDashboardStats | null;
   recentActivity: UserActivity[];
   recommendations: CourseRecommendation[];
   isLoading: boolean;
   error: Error | null;

   // Actions
   enrollInCourse: (userId: UserId, courseId: CourseId) => Promise<void>;
   updateEnrollmentStatus: (
      enrollmentId: string,
      status: EnrollmentStatus
   ) => void;
   addToFavorites: (userId: UserId, courseId: CourseId, notes?: string) => void;
   removeFromFavorites: (userId: UserId, courseId: CourseId) => void;
   rateCourse: (
      userId: UserId,
      courseId: CourseId,
      rating: number,
      review?: string
   ) => void;
   updateRating: (ratingId: string, rating: number, review?: string) => void;
   deleteRating: (ratingId: string) => void;
   loadUserDashboard: (userId: UserId) => Promise<void>;
   loadRecommendations: (userId: UserId) => Promise<void>;
   syncEnrollments: (userId: UserId) => Promise<void>;

   // Getters
   getUserEnrollments: (userId: UserId) => Enrollment[];
   getUserFavorites: (userId: UserId) => CourseFavorite[];
   getUserRatings: (userId: UserId) => CourseRating[];
   getCourseRating: (
      userId: UserId,
      courseId: CourseId
   ) => CourseRating | undefined;
   getCourseRatings: (courseId: CourseId) => CourseRating[];
   isEnrolled: (userId: UserId, courseId: CourseId) => boolean;
   isFavorited: (userId: UserId, courseId: CourseId) => boolean;
   getEnrollmentStatus: (
      userId: UserId,
      courseId: CourseId
   ) => EnrollmentStatus | null;

   // Utils
   setLoading: (isLoading: boolean) => void;
   setError: (error: Error | null) => void;
   clearEnrollments: () => void;
}

/**
 * Type casting utilities for branded types
 */
const toCourseId = (id: string): CourseId => id as CourseId;

/**
 * Enrollment store implementation
 */
export const useEnrollmentStore = create<EnrollmentStore>()(
   devtools(
      persist(
         immer((set, get) => ({
            // Initial state
            enrollments: {},
            favorites: {},
            ratings: {},
            userStats: null,
            recentActivity: [],
            recommendations: [],
            isLoading: false,
            error: null,

            // Actions
            enrollInCourse: async (userId, courseId) => {
               set((state) => {
                  state.isLoading = true;
               });

               try {
                  // TODO: Replace with actual API call
                  const enrollmentId = `${userId}-${courseId}-${Date.now()}`;
                  const enrollment: Enrollment = {
                     id: enrollmentId,
                     userId,
                     courseId,
                     status: "enrolled",
                     enrolledAt: new Date(),
                     progress: 0,
                     enrollmentSource: "direct",
                  };

                  set((state) => {
                     state.enrollments[enrollmentId] = enrollment;
                     state.recentActivity.unshift({
                        id: `activity-${Date.now()}`,
                        userId,
                        type: "course_enrolled",
                        courseId,
                        timestamp: new Date(),
                     });
                     state.isLoading = false;
                  });
               } catch (error) {
                  set((state) => {
                     state.error = error as Error;
                     state.isLoading = false;
                  });
               }
            },

            updateEnrollmentStatus: (enrollmentId, status) =>
               set((state) => {
                  const enrollment = state.enrollments[enrollmentId];
                  if (enrollment) {
                     state.enrollments[enrollmentId] = {
                        ...enrollment,
                        status,
                        completedAt:
                           status === "completed"
                              ? new Date()
                              : enrollment.completedAt,
                        droppedAt:
                           status === "dropped"
                              ? new Date()
                              : enrollment.droppedAt,
                     };

                     // Add activity for status changes
                     if (status === "completed") {
                        state.recentActivity.unshift({
                           id: `activity-${Date.now()}`,
                           userId: enrollment.userId,
                           type: "course_completed",
                           courseId: enrollment.courseId,
                           timestamp: new Date(),
                        });
                     }
                  }
               }),

            addToFavorites: (userId, courseId, notes) =>
               set((state) => {
                  const favoriteId = `${userId}-${courseId}`;
                  state.favorites[favoriteId] = {
                     id: favoriteId,
                     userId,
                     courseId,
                     favoritedAt: new Date(),
                     notes,
                  };
               }),

            removeFromFavorites: (userId, courseId) =>
               set((state) => {
                  const favoriteId = `${userId}-${courseId}`;
                  delete state.favorites[favoriteId];
               }),

            rateCourse: (userId, courseId, rating, review) =>
               set((state) => {
                  const ratingId = `${userId}-${courseId}`;
                  state.ratings[ratingId] = {
                     id: ratingId,
                     userId,
                     courseId,
                     rating,
                     review,
                     ratedAt: new Date(),
                     helpful: 0,
                     isVerifiedPurchase: true, // TODO: Check actual enrollment
                  };

                  state.recentActivity.unshift({
                     id: `activity-${Date.now()}`,
                     userId,
                     type: "rating_given",
                     courseId,
                     timestamp: new Date(),
                     metadata: { rating, review },
                  });
               }),

            updateRating: (ratingId, rating, review) =>
               set((state) => {
                  const existingRating = state.ratings[ratingId];
                  if (existingRating) {
                     state.ratings[ratingId] = {
                        ...existingRating,
                        rating,
                        review,
                        ratedAt: new Date(),
                     };
                  }
               }),

            deleteRating: (ratingId) =>
               set((state) => {
                  delete state.ratings[ratingId];
               }),

            loadUserDashboard: async (userId) => {
               set((state) => {
                  state.isLoading = true;
               });

               try {
                  // TODO: Replace with actual API call
                  const enrollments = Object.values(get().enrollments).filter(
                     (e) => e.userId === userId
                  );

                  const stats: UserDashboardStats = {
                     userId,
                     totalCoursesEnrolled: enrollments.length,
                     coursesCompleted: enrollments.filter(
                        (e) => e.status === "completed"
                     ).length,
                     coursesInProgress: enrollments.filter(
                        (e) => e.status === "enrolled"
                     ).length,
                     totalTimeSpent: 0, // TODO: Calculate from progress tracking
                     certificatesEarned: enrollments.filter(
                        (e) => e.certificateIssued
                     ).length,
                     currentStreak: 0, // TODO: Calculate streak
                     longestStreak: 0, // TODO: Calculate from historical data
                     favoriteSubjects: [], // TODO: Extract from enrolled courses
                     recentActivity: get().recentActivity.slice(0, 10),
                  };

                  set((state) => {
                     state.userStats = {
                        ...stats,
                        favoriteSubjects: [...stats.favoriteSubjects],
                        recentActivity: [...stats.recentActivity],
                     };
                     state.isLoading = false;
                  });
               } catch (error) {
                  set((state) => {
                     state.error = error as Error;
                     state.isLoading = false;
                  });
               }
            },

            loadRecommendations: async (userId: UserId) => {
               // TODO: Use userId for personalized recommendations
               console.log("Loading recommendations for user:", userId);

               try {
                  // TODO: Replace with actual recommendation engine
                  const mockRecommendations: CourseRecommendation[] = [
                     {
                        courseId: toCourseId("react"),
                        score: 0.9,
                        reason: "skill_progression",
                        explanation:
                           "Perfect next step after JavaScript fundamentals",
                     },
                     {
                        courseId: toCourseId("typescript"),
                        score: 0.8,
                        reason: "popular_choice",
                        explanation: "Popular among JavaScript learners",
                     },
                  ];

                  set((state) => {
                     state.recommendations = mockRecommendations;
                  });
               } catch (error) {
                  set((state) => {
                     state.error = error as Error;
                  });
               }
            },

            syncEnrollments: async (userId: UserId) => {
               // TODO: Use userId for syncing user-specific enrollments
               console.log("Syncing enrollments for user:", userId);

               set((state) => {
                  state.isLoading = true;
               });

               try {
                  // TODO: Sync with backend API
                  await new Promise((resolve) => setTimeout(resolve, 1000));

                  set((state) => {
                     state.isLoading = false;
                  });
               } catch (error) {
                  set((state) => {
                     state.error = error as Error;
                     state.isLoading = false;
                  });
               }
            },

            // Getters
            getUserEnrollments: (userId) => {
               return Object.values(get().enrollments).filter(
                  (e) => e.userId === userId
               );
            },

            getUserFavorites: (userId) => {
               return Object.values(get().favorites).filter(
                  (f) => f.userId === userId
               );
            },

            getUserRatings: (userId) => {
               return Object.values(get().ratings).filter(
                  (r) => r.userId === userId
               );
            },

            getCourseRating: (userId, courseId) => {
               const ratingId = `${userId}-${courseId}`;
               return get().ratings[ratingId];
            },

            getCourseRatings: (courseId) => {
               return Object.values(get().ratings).filter(
                  (r) => r.courseId === courseId
               );
            },

            isEnrolled: (userId, courseId) => {
               return Object.values(get().enrollments).some(
                  (e) =>
                     e.userId === userId &&
                     e.courseId === courseId &&
                     e.status !== "dropped"
               );
            },

            isFavorited: (userId, courseId) => {
               const favoriteId = `${userId}-${courseId}`;
               return !!get().favorites[favoriteId];
            },

            getEnrollmentStatus: (userId, courseId) => {
               const enrollment = Object.values(get().enrollments).find(
                  (e) => e.userId === userId && e.courseId === courseId
               );
               return enrollment?.status || null;
            },

            // Utils
            setLoading: (isLoading) =>
               set((state) => {
                  state.isLoading = isLoading;
               }),

            setError: (error) =>
               set((state) => {
                  state.error = error;
                  state.isLoading = false;
               }),

            clearEnrollments: () =>
               set((state) => {
                  state.enrollments = {};
                  state.favorites = {};
                  state.ratings = {};
                  state.userStats = null;
                  state.recentActivity = [];
                  state.recommendations = [];
                  state.error = null;
               }),
         })),
         {
            name: "enrollment-store",
            partialize: (state) => ({
               enrollments: state.enrollments,
               favorites: state.favorites,
               ratings: state.ratings,
               recentActivity: state.recentActivity,
            }),
         }
      ),
      { name: "enrollment-store" }
   )
);

/**
 * Selectors for optimized re-renders
 */
export const useUserEnrollments = (userId: UserId) =>
   useEnrollmentStore((state) => state.getUserEnrollments(userId));

export const useUserFavorites = (userId: UserId) =>
   useEnrollmentStore((state) => state.getUserFavorites(userId));

export const useUserDashboardStats = () =>
   useEnrollmentStore((state) => state.userStats);

export const useEnrollmentLoading = () =>
   useEnrollmentStore((state) => state.isLoading);

export const useEnrollmentError = () =>
   useEnrollmentStore((state) => state.error);
