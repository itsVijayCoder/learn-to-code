/**
 * This file has been consolidated into course-service.ts
 * All validation and analytics functions are now functional programming based
 * and located in the main service file
 */

// Re-export from main service for backwards compatibility
export {
   validateSlugUniqueness,
   validateCourseData,
   getCourseStats,
   getCourseAnalytics,
   getEnrollmentMetrics,
} from "./course-service";
