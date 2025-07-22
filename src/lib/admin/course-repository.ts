/**
 * Course Repository Implementation - Functional Programming
 * Follows Repository pattern with functional approach
 */

import type {
   AdminCourse,
   CourseFormData,
   CourseRepository,
} from "./course-service";

// Custom error types
export class CourseNotFoundError extends Error {
   constructor(id: string) {
      super(`Course with ID ${id} not found`);
      this.name = "CourseNotFoundError";
   }
}

export class CourseValidationError extends Error {
   constructor(message: string) {
      super(message);
      this.name = "CourseValidationError";
   }
}

// Mock data store - In production this would be replaced with database queries
const mockCourses: AdminCourse[] = [
   {
      id: "1",
      title: "Introduction to React",
      description: "Learn the fundamentals of React development",
      slug: "intro-to-react",
      difficulty: "beginner" as const,
      duration: 8,
      tags: ["React", "JavaScript", "Frontend"],
      author: "John Doe",
      published: true,
      category: "Web Development",
      prerequisites: ["HTML", "CSS", "JavaScript"],
      learningObjectives: [
         "Understand React components",
         "Learn state management",
         "Build interactive UIs",
      ],
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-01-20"),
   },
   {
      id: "2",
      title: "Advanced TypeScript",
      description: "Master advanced TypeScript concepts and patterns",
      slug: "advanced-typescript",
      difficulty: "advanced" as const,
      duration: 12,
      tags: ["TypeScript", "JavaScript", "Programming"],
      author: "Jane Smith",
      published: true,
      category: "Programming Languages",
      prerequisites: ["JavaScript", "Basic TypeScript"],
      learningObjectives: [
         "Master advanced types",
         "Understand generics",
         "Learn design patterns",
      ],
      createdAt: new Date("2024-01-10"),
      updatedAt: new Date("2024-01-25"),
   },
];

// Helper functions
const generateId = (): string => {
   return `course_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Repository Functions
const getAllCourses = async (): Promise<AdminCourse[]> => {
   // Simulate API delay
   await new Promise((resolve) => setTimeout(resolve, 100));
   return [...mockCourses];
};

const getCourseById = async (id: string): Promise<AdminCourse | null> => {
   // Simulate API delay
   await new Promise((resolve) => setTimeout(resolve, 50));
   return mockCourses.find((course) => course.id === id) || null;
};

const createCourse = async (data: CourseFormData): Promise<AdminCourse> => {
   // Simulate API delay
   await new Promise((resolve) => setTimeout(resolve, 200));

   const newCourse: AdminCourse = {
      ...data,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
   };

   mockCourses.push(newCourse);
   return newCourse;
};

const updateCourse = async (
   id: string,
   data: Partial<CourseFormData>
): Promise<AdminCourse> => {
   // Simulate API delay
   await new Promise((resolve) => setTimeout(resolve, 150));

   const courseIndex = mockCourses.findIndex((course) => course.id === id);
   if (courseIndex === -1) {
      throw new CourseNotFoundError(id);
   }

   const existingCourse = mockCourses[courseIndex]!; // Safe to assert since we checked above
   const updatedCourse: AdminCourse = {
      id: existingCourse.id,
      title: data.title ?? existingCourse.title,
      description: data.description ?? existingCourse.description,
      slug: data.slug ?? existingCourse.slug,
      difficulty: data.difficulty ?? existingCourse.difficulty,
      duration: data.duration ?? existingCourse.duration,
      tags: data.tags ?? existingCourse.tags,
      author: data.author ?? existingCourse.author,
      published: data.published ?? existingCourse.published,
      category: data.category ?? existingCourse.category,
      prerequisites: data.prerequisites ?? existingCourse.prerequisites,
      learningObjectives:
         data.learningObjectives ?? existingCourse.learningObjectives,
      createdAt: existingCourse.createdAt,
      updatedAt: new Date(),
   };

   mockCourses[courseIndex] = updatedCourse;
   return updatedCourse;
};

const deleteCourse = async (id: string): Promise<void> => {
   // Simulate API delay
   await new Promise((resolve) => setTimeout(resolve, 100));

   const courseIndex = mockCourses.findIndex((course) => course.id === id);
   if (courseIndex === -1) {
      throw new CourseNotFoundError(id);
   }

   mockCourses.splice(courseIndex, 1);
};

// Repository factory function
export const createCourseRepository = (): CourseRepository => ({
   getAll: getAllCourses,
   getById: getCourseById,
   create: createCourse,
   update: updateCourse,
   delete: deleteCourse,
});

// Default repository instance
export const courseRepository = createCourseRepository();
