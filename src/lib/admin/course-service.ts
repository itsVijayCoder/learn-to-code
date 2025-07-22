/**
 * Admin Course Service Implementation
 * Follows SOLID principles with functional programming
 */

import { z } from "zod";

// Course Schema and Types
export const CourseFormSchema = z.object({
   title: z.string().min(1, "Title is required").max(100),
   description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
   slug: z
      .string()
      .min(1, "Slug is required")
      .regex(/^[a-z0-9-]+$/, "Invalid slug format"),
   difficulty: z.enum(["beginner", "intermediate", "advanced"]),
   duration: z.number().min(1, "Duration must be at least 1 hour"),
   tags: z.array(z.string()).min(1, "At least one tag is required"),
   author: z.string().min(1, "Author is required"),
   published: z.boolean(),
   category: z.string().min(1, "Category is required"),
   prerequisites: z.array(z.string()),
   learningObjectives: z
      .array(z.string())
      .min(1, "At least one learning objective is required"),
});

export type CourseFormData = z.infer<typeof CourseFormSchema>;

export interface AdminCourse extends CourseFormData {
   id: string;
   createdAt: Date;
   updatedAt: Date;
}

export interface CourseStats {
   totalEnrollments: number;
   activeEnrollments: number;
   completionRate: number;
   averageRating: number;
   totalReviews: number;
}

export interface CourseAnalytics {
   totalStudents: number;
   completedStudents: number;
   inProgressStudents: number;
   completionRate: number;
   averageRating: number;
   revenue: number;
   averageTimeToComplete: number;
   monthlyEnrollments: { month: string; count: number }[];
}

export interface EnrollmentMetrics {
   enrollmentsOverTime: { date: string; count: number }[];
   completionRates: { period: string; rate: number }[];
   userRetention: { week: number; retention: number }[];
}

// Repository Functions - Following functional programming principles
export type CourseRepository = {
   getAll: () => Promise<AdminCourse[]>;
   getById: (id: string) => Promise<AdminCourse | null>;
   create: (data: CourseFormData) => Promise<AdminCourse>;
   update: (id: string, data: Partial<CourseFormData>) => Promise<AdminCourse>;
   delete: (id: string) => Promise<void>;
};

// Validation Functions
export const validateSlugUniqueness =
   (repository: CourseRepository) =>
   async (slug: string, excludeId?: string): Promise<boolean> => {
      const courses = await repository.getAll();
      return !courses.some(
         (course) => course.slug === slug && course.id !== excludeId
      );
   };

export const validateCourseData = (data: unknown): CourseFormData => {
   try {
      return CourseFormSchema.parse(data);
   } catch (error) {
      throw new Error(`Invalid course data: ${error}`);
   }
};

// Analytics Functions
export const getCourseStats = async (): Promise<CourseStats> => {
   // In production, this would query the database for real metrics
   return {
      totalEnrollments: Math.floor(Math.random() * 1000) + 100,
      activeEnrollments: Math.floor(Math.random() * 100) + 10,
      completionRate: Math.random() * 0.8 + 0.2, // 20-100%
      averageRating: Math.random() * 2 + 3, // 3-5 stars
      totalReviews: Math.floor(Math.random() * 200) + 20,
   };
};

export const getCourseAnalytics = async (): Promise<CourseAnalytics> => {
   // Mock data for development
   const totalStudents = Math.floor(Math.random() * 500) + 50;
   const completedStudents = Math.floor(
      totalStudents * (Math.random() * 0.5 + 0.2)
   );
   const inProgressStudents = Math.floor(
      (totalStudents - completedStudents) * 0.7
   );

   return {
      totalStudents,
      completedStudents,
      inProgressStudents,
      completionRate: (completedStudents / totalStudents) * 100,
      averageRating: Math.random() * 2 + 3,
      revenue: Math.floor(Math.random() * 10000) + 1000,
      averageTimeToComplete: Math.floor(Math.random() * 120) + 60, // minutes
      monthlyEnrollments: Array.from({ length: 6 }, (_, i) => ({
         month: new Date(
            Date.now() - (5 - i) * 30 * 24 * 60 * 60 * 1000
         ).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
         count: Math.floor(Math.random() * 50) + 10,
      })),
   };
};

export const getEnrollmentMetrics = async (): Promise<EnrollmentMetrics> => {
   // Mock data for development
   const now = new Date();
   const enrollmentsOverTime = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(now.getTime() - (29 - i) * 24 * 60 * 60 * 1000);
      return {
         date: date.toISOString().split("T")[0] || date.toDateString(),
         count: Math.floor(Math.random() * 20) + 1,
      };
   });

   const completionRates = [
      { period: "Week 1", rate: 0.95 },
      { period: "Week 2", rate: 0.85 },
      { period: "Week 3", rate: 0.75 },
      { period: "Week 4", rate: 0.65 },
   ];

   const userRetention = Array.from({ length: 12 }, (_, i) => ({
      week: i + 1,
      retention: Math.max(0.3, 1 - i * 0.1 - Math.random() * 0.1),
   }));

   return {
      enrollmentsOverTime,
      completionRates,
      userRetention,
   };
};

// Main Course Service Functions
export const createCourseService = (repository: CourseRepository) => ({
   getAllCourses: repository.getAll,

   getCourseById: repository.getById,

   createCourse: async (data: CourseFormData): Promise<AdminCourse> => {
      // Validate course data
      const validData = validateCourseData(data);

      // Check slug uniqueness
      const isSlugUnique = await validateSlugUniqueness(repository)(
         validData.slug
      );
      if (!isSlugUnique) {
         throw new Error("Course slug already exists");
      }

      return repository.create(validData);
   },

   updateCourse: async (
      id: string,
      data: Partial<CourseFormData>
   ): Promise<AdminCourse> => {
      // If slug is being updated, validate uniqueness
      if (data.slug) {
         const isSlugUnique = await validateSlugUniqueness(repository)(
            data.slug,
            id
         );
         if (!isSlugUnique) {
            throw new Error("Course slug already exists");
         }
      }

      return repository.update(id, data);
   },

   deleteCourse: repository.delete,

   getCourseStats,

   getCourseAnalytics,

   getEnrollmentMetrics,
});

// Interface Segregation: Separate interfaces for different responsibilities
export interface ICourseRepository {
   getAll(): Promise<Course[]>;
   getById(id: string): Promise<Course | null>;
   create(data: CourseFormData): Promise<Course>;
   update(id: string, data: Partial<CourseFormData>): Promise<Course>;
   delete(id: string): Promise<void>;
   publish(id: string): Promise<Course>;
   unpublish(id: string): Promise<Course>;
}

export interface ICourseValidationService {
   validateSlugUniqueness(slug: string, excludeId?: string): Promise<boolean>;
   validateCourseData(data: unknown): CourseFormData;
}

export interface ICourseAnalyticsService {
   getCourseStats(id: string): Promise<CourseStats>;
   getEnrollmentMetrics(id: string): Promise<EnrollmentMetrics>;
}

// Dependency Inversion: Service depends on abstractions
export class AdminCourseService {
   constructor(
      private courseRepo: ICourseRepository,
      private validationService: ICourseValidationService,
      private analyticsService: ICourseAnalyticsService
   ) {}

   async createCourse(data: unknown): Promise<Course> {
      const validatedData = this.validationService.validateCourseData(data);

      const isSlugUnique = await this.validationService.validateSlugUniqueness(
         validatedData.slug
      );
      if (!isSlugUnique) {
         throw new Error("Course slug already exists");
      }

      return await this.courseRepo.create(validatedData);
   }

   async updateCourse(id: string, data: unknown): Promise<Course> {
      const validatedData = this.validationService.validateCourseData(data);

      if (validatedData.slug) {
         const isSlugUnique =
            await this.validationService.validateSlugUniqueness(
               validatedData.slug,
               id
            );
         if (!isSlugUnique) {
            throw new Error("Course slug already exists");
         }
      }

      return await this.courseRepo.update(id, validatedData);
   }

   async deleteCourse(id: string): Promise<void> {
      const course = await this.courseRepo.getById(id);
      if (!course) {
         throw new Error("Course not found");
      }

      // Business logic: Check if course has active enrollments
      const stats = await this.analyticsService.getCourseStats(id);
      if (stats.activeEnrollments > 0) {
         throw new Error("Cannot delete course with active enrollments");
      }

      await this.courseRepo.delete(id);
   }

   async publishCourse(id: string): Promise<Course> {
      const course = await this.courseRepo.getById(id);
      if (!course) {
         throw new Error("Course not found");
      }

      // Business logic: Validate course is ready for publishing
      if (course.modules.length === 0) {
         throw new Error("Course must have at least one module to publish");
      }

      return await this.courseRepo.publish(id);
   }
}

// Types
export interface Course {
   id: string;
   title: string;
   description: string;
   slug: string;
   difficulty: "beginner" | "intermediate" | "advanced";
   duration: number;
   tags: string[];
   author: string;
   published: boolean;
   category: string;
   prerequisites: string[];
   learningObjectives: string[];
   modules: Module[];
   createdAt: Date;
   updatedAt: Date;
}

export interface Module {
   id: string;
   title: string;
   description: string;
   slug: string;
   lessons: Lesson[];
   order: number;
}

export interface Lesson {
   id: string;
   title: string;
   description: string;
   slug: string;
   content: string;
   duration: number;
   order: number;
   type: "text" | "video" | "quiz" | "exercise";
}

export interface CourseStats {
   totalEnrollments: number;
   activeEnrollments: number;
   completionRate: number;
   averageRating: number;
   totalReviews: number;
}

export interface EnrollmentMetrics {
   enrollmentsOverTime: Array<{ date: string; count: number }>;
   completionRates: Array<{ period: string; rate: number }>;
   userRetention: Array<{ week: number; retention: number }>;
}
