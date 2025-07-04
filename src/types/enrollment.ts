/**
 * Course enrollment types and interfaces
 */

import type { UserId } from "./user";
import type { CourseId } from "./course";

/**
 * Enrollment status enumeration
 */
export type EnrollmentStatus = "enrolled" | "completed" | "dropped" | "pending";

/**
 * Enrollment interface
 */
export interface Enrollment {
   readonly id: string;
   readonly userId: UserId;
   readonly courseId: CourseId;
   readonly status: EnrollmentStatus;
   readonly enrolledAt: Date;
   readonly completedAt?: Date;
   readonly droppedAt?: Date;
   readonly progress: number; // 0-100
   readonly lastAccessedAt?: Date;
   readonly certificateIssued?: boolean;
   readonly enrollmentSource: "direct" | "recommendation" | "requirement";
}

/**
 * Course favorite/bookmark interface
 */
export interface CourseFavorite {
   readonly id: string;
   readonly userId: UserId;
   readonly courseId: CourseId;
   readonly favoritedAt: Date;
   readonly notes?: string;
}

/**
 * Course rating interface
 */
export interface CourseRating {
   readonly id: string;
   readonly userId: UserId;
   readonly courseId: CourseId;
   readonly rating: number; // 1-5 stars
   readonly review?: string;
   readonly ratedAt: Date;
   readonly helpful?: number; // Number of helpful votes
   readonly isVerifiedPurchase: boolean;
}

/**
 * Course analytics interface
 */
export interface CourseAnalytics {
   readonly courseId: CourseId;
   readonly totalEnrollments: number;
   readonly activeEnrollments: number;
   readonly completionRate: number;
   readonly averageRating: number;
   readonly totalRatings: number;
   readonly averageCompletionTime: number; // in hours
   readonly dropoutRate: number;
   readonly popularityScore: number;
   readonly lastUpdated: Date;
}

/**
 * User dashboard stats interface
 */
export interface UserDashboardStats {
   readonly userId: UserId;
   readonly totalCoursesEnrolled: number;
   readonly coursesCompleted: number;
   readonly coursesInProgress: number;
   readonly totalTimeSpent: number; // in minutes
   readonly certificatesEarned: number;
   readonly currentStreak: number; // days
   readonly longestStreak: number; // days
   readonly favoriteSubjects: readonly string[];
   readonly recentActivity: readonly UserActivity[];
}

/**
 * User activity interface
 */
export interface UserActivity {
   readonly id: string;
   readonly userId: UserId;
   readonly type:
      | "lesson_completed"
      | "course_enrolled"
      | "course_completed"
      | "rating_given"
      | "certificate_earned";
   readonly courseId?: CourseId;
   readonly lessonId?: string;
   readonly timestamp: Date;
   readonly metadata?: Record<string, unknown>;
}

/**
 * Course recommendation interface
 */
export interface CourseRecommendation {
   readonly courseId: CourseId;
   readonly score: number; // 0-1 confidence score
   readonly reason:
      | "similar_content"
      | "skill_progression"
      | "popular_choice"
      | "instructor_match"
      | "completion_pattern";
   readonly explanation: string;
}

/**
 * Learning path interface
 */
export interface LearningPath {
   readonly id: string;
   readonly title: string;
   readonly description: string;
   readonly courses: readonly CourseId[];
   readonly estimatedDuration: number; // in hours
   readonly difficulty: "beginner" | "intermediate" | "advanced";
   readonly tags: readonly string[];
   readonly createdAt: Date;
   readonly isOfficial: boolean;
}
