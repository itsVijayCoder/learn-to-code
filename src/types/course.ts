import { Brand } from "./utils";

/**
 * Branded course ID type
 */
export type CourseId = Brand<string, "CourseId">;

/**
 * Branded module ID type
 */
export type ModuleId = Brand<string, "ModuleId">;

/**
 * Branded lesson ID type
 */
export type LessonId = Brand<string, "LessonId">;

/**
 * Course difficulty levels
 */
export type Difficulty = "beginner" | "intermediate" | "advanced";

/**
 * Lesson content types
 */
export type LessonType = "video" | "text" | "quiz" | "interactive";

/**
 * Course status enumeration
 */
export type CourseStatus = "draft" | "published" | "archived";

/**
 * Course interface
 */
export interface Course {
   readonly id: CourseId;
   readonly slug: string;
   readonly title: string;
   readonly description: string;
   readonly shortDescription?: string;
   readonly thumbnail: string | null;
   readonly author: string;
   readonly duration: number; // in minutes
   readonly difficulty: Difficulty;
   readonly tags: readonly string[];
   readonly modules: readonly Module[];
   readonly status: CourseStatus;
   readonly price?: number;
   readonly featured: boolean;
   readonly prerequisites: readonly string[];
   readonly learningObjectives: readonly string[];
   readonly createdAt: Date;
   readonly updatedAt: Date;
}

/**
 * Course module interface
 */
export interface Module {
   readonly id: ModuleId;
   readonly slug: string;
   readonly title: string;
   readonly description: string;
   readonly order: number;
   readonly lessons: readonly Lesson[];
   readonly duration: number; // calculated from lessons
}

/**
 * Lesson interface
 */
export interface Lesson {
   readonly id: LessonId;
   readonly slug: string;
   readonly title: string;
   readonly description: string;
   readonly type: LessonType;
   readonly duration: number; // in minutes
   readonly order: number;
   readonly content?: string;
   readonly videoUrl?: string;
   readonly quizData?: QuizData;
   readonly resources?: readonly LessonResource[];
}

/**
 * Quiz data interface
 */
export interface QuizData {
   readonly questions: readonly QuizQuestion[];
   readonly passingScore: number;
   readonly timeLimit?: number; // in minutes
}

/**
 * Quiz question interface
 */
export interface QuizQuestion {
   readonly id: string;
   readonly question: string;
   readonly type: "multiple-choice" | "true-false" | "short-answer";
   readonly options?: readonly string[];
   readonly correctAnswer: string | number;
   readonly explanation?: string;
}

/**
 * Lesson resource interface
 */
export interface LessonResource {
   readonly id: string;
   readonly title: string;
   readonly type: "pdf" | "link" | "download" | "code";
   readonly url: string;
   readonly size?: string;
}

/**
 * Course navigation structure
 */
export interface CourseNavigation {
   readonly courseId: CourseId;
   readonly modules: readonly NavigationModule[];
   readonly totalLessons: number;
   readonly totalDuration: number;
}

/**
 * Navigation module interface
 */
export interface NavigationModule {
   readonly id: ModuleId;
   readonly title: string;
   readonly slug: string;
   readonly lessons: readonly NavigationLesson[];
   readonly order: number;
}

/**
 * Navigation lesson interface
 */
export interface NavigationLesson {
   readonly id: LessonId;
   readonly title: string;
   readonly slug: string;
   readonly type: LessonType;
   readonly duration: number;
   readonly order: number;
   readonly completed?: boolean;
}
