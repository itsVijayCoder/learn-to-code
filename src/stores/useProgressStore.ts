import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type {
   CourseProgress,
   LessonProgress,
   UserId,
   CourseId,
   LessonId,
   ModuleId,
} from "@/types";

/**
 * Progress store interface
 */
interface ProgressStore {
   // State
   courseProgress: Record<string, CourseProgress>;
   lessonProgress: Record<string, LessonProgress>;
   isLoading: boolean;
   error: Error | null;
   lastSyncTime: Date | null;

   // Actions
   setCourseProgress: (courseId: CourseId, progress: CourseProgress) => void;
   setLessonProgress: (lessonId: LessonId, progress: LessonProgress) => void;
   markLessonComplete: (
      userId: UserId,
      courseId: CourseId,
      lessonId: LessonId
   ) => void;
   updateTimeSpent: (
      userId: UserId,
      lessonId: LessonId,
      timeSpent: number
   ) => void;
   setLoading: (isLoading: boolean) => void;
   setError: (error: Error | null) => void;
   clearProgress: () => void;
   syncProgress: () => Promise<void>;
   getCourseProgress: (courseId: CourseId) => CourseProgress | undefined;
   getLessonProgress: (lessonId: LessonId) => LessonProgress | undefined;
   getOverallProgress: (userId: UserId) => {
      totalCourses: number;
      completedCourses: number;
      totalTimeSpent: number;
   };
}

/**
 * Progress store with offline-first approach
 */
export const useProgressStore = create<ProgressStore>()(
   devtools(
      persist(
         immer((set, get) => ({
            // Initial state
            courseProgress: {},
            lessonProgress: {},
            isLoading: false,
            error: null,
            lastSyncTime: null,

            // Actions
            setCourseProgress: (courseId, progress) =>
               set((state) => {
                  state.courseProgress[courseId] = progress;
               }),

            setLessonProgress: (lessonId, progress) =>
               set((state) => {
                  state.lessonProgress[lessonId] = progress;
               }),

            markLessonComplete: (userId, courseId, lessonId) =>
               set((state) => {
                  const lessonKey = lessonId;
                  const existingProgress = state.lessonProgress[lessonKey];

                  state.lessonProgress[lessonKey] = {
                     ...existingProgress,
                     userId,
                     lessonId,
                     courseId,
                     moduleId:
                        existingProgress?.moduleId || ("module-1" as ModuleId), // Fallback
                     status: "completed",
                     completedAt: new Date(),
                     startedAt: existingProgress?.startedAt || new Date(),
                     timeSpent: existingProgress?.timeSpent || 0,
                  };

                  // Update course progress
                  const courseKey = courseId;
                  const courseProgress = state.courseProgress[courseKey];
                  if (courseProgress) {
                     const completedLessons = (
                        Object.values(state.lessonProgress) as LessonProgress[]
                     ).filter(
                        (progress) =>
                           progress.courseId === courseId &&
                           progress.status === "completed"
                     ).length;

                     state.courseProgress[courseKey] = {
                        ...courseProgress,
                        completedLessons,
                        progressPercentage: Math.round(
                           (completedLessons / courseProgress.totalLessons) *
                              100
                        ),
                        lastAccessedAt: new Date(),
                        status:
                           completedLessons === courseProgress.totalLessons
                              ? "completed"
                              : "in-progress",
                        completedAt:
                           completedLessons === courseProgress.totalLessons
                              ? new Date()
                              : null,
                     };
                  }
               }),

            updateTimeSpent: (_userId, lessonId, timeSpent) =>
               set((state) => {
                  const lessonKey = lessonId;
                  const existingProgress = state.lessonProgress[lessonKey];

                  if (existingProgress) {
                     state.lessonProgress[lessonKey] = {
                        ...existingProgress,
                        timeSpent:
                           (existingProgress.timeSpent || 0) + timeSpent,
                     };
                  }
               }),

            setLoading: (isLoading) =>
               set((state) => {
                  state.isLoading = isLoading;
               }),

            setError: (error) =>
               set((state) => {
                  state.error = error;
                  state.isLoading = false;
               }),

            clearProgress: () =>
               set((state) => {
                  state.courseProgress = {};
                  state.lessonProgress = {};
                  state.error = null;
                  state.lastSyncTime = null;
               }),

            syncProgress: async () => {
               set((state) => {
                  state.isLoading = true;
               });

               try {
                  // TODO: Implement actual sync with backend
                  await new Promise((resolve) => setTimeout(resolve, 1000));

                  set((state) => {
                     state.lastSyncTime = new Date();
                     state.isLoading = false;
                     state.error = null;
                  });
               } catch (error) {
                  set((state) => {
                     state.error = error as Error;
                     state.isLoading = false;
                  });
               }
            },

            getCourseProgress: (courseId) => {
               const state = get();
               return state.courseProgress[courseId];
            },

            getLessonProgress: (lessonId) => {
               const state = get();
               return state.lessonProgress[lessonId];
            },

            getOverallProgress: (userId) => {
               const state = get();
               const courses = Object.values(state.courseProgress).filter(
                  (progress) => progress.userId === userId
               );

               const totalCourses = courses.length;
               const completedCourses = courses.filter(
                  (progress) => progress.status === "completed"
               ).length;
               const totalTimeSpent = courses.reduce(
                  (total, progress) => total + progress.timeSpent,
                  0
               );

               return {
                  totalCourses,
                  completedCourses,
                  totalTimeSpent,
               };
            },
         })),
         {
            name: "progress-store",
            partialize: (state) => ({
               courseProgress: state.courseProgress,
               lessonProgress: state.lessonProgress,
               lastSyncTime: state.lastSyncTime,
            }),
         }
      ),
      { name: "progress-store" }
   )
);

/**
 * Selectors for optimized re-renders
 */
export const useCourseProgress = (courseId: CourseId) =>
   useProgressStore((state) => state.courseProgress[courseId]);

export const useLessonProgress = (lessonId: LessonId) =>
   useProgressStore((state) => state.lessonProgress[lessonId]);

export const useProgressLoading = () =>
   useProgressStore((state) => state.isLoading);

export const useProgressError = () => useProgressStore((state) => state.error);
