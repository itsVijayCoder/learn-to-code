import { CourseId, ModuleId, LessonId } from './course'
import { UserId } from './user'

/**
 * Progress ID is a composite key
 */
export type ProgressId = `${CourseId}/${ModuleId}/${LessonId}`

/**
 * Progress status enumeration
 */
export type ProgressStatus = 'not-started' | 'in-progress' | 'completed'

/**
 * Individual lesson progress
 */
export interface LessonProgress {
  readonly userId: UserId
  readonly lessonId: LessonId
  readonly courseId: CourseId
  readonly moduleId: ModuleId
  readonly status: ProgressStatus
  readonly completedAt: Date | null
  readonly startedAt: Date | null
  readonly timeSpent: number // in seconds
  readonly score?: number // for quizzes
  readonly attempts?: number // for quizzes
}

/**
 * Module progress aggregation
 */
export interface ModuleProgress {
  readonly moduleId: ModuleId
  readonly totalLessons: number
  readonly completedLessons: number
  readonly progressPercentage: number
  readonly timeSpent: number
  readonly lastAccessedAt: Date | null
}

/**
 * Course progress aggregation
 */
export interface CourseProgress {
  readonly userId: UserId
  readonly courseId: CourseId
  readonly status: ProgressStatus
  readonly totalLessons: number
  readonly completedLessons: number
  readonly progressPercentage: number
  readonly timeSpent: number // in seconds
  readonly enrolledAt: Date
  readonly lastAccessedAt: Date | null
  readonly completedAt: Date | null
  readonly modules: readonly ModuleProgress[]
  readonly currentLesson?: {
    readonly moduleId: ModuleId
    readonly lessonId: LessonId
  }
}

/**
 * User's overall progress summary
 */
export interface UserProgress {
  readonly userId: UserId
  readonly totalCoursesEnrolled: number
  readonly totalCoursesCompleted: number
  readonly totalTimeSpent: number
  readonly totalLessonsCompleted: number
  readonly streakDays: number
  readonly lastActiveDate: Date | null
  readonly achievements: readonly Achievement[]
}

/**
 * Achievement interface
 */
export interface Achievement {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly icon: string
  readonly unlockedAt: Date
  readonly type: 'course-completion' | 'streak' | 'time-spent' | 'quiz-score'
}

/**
 * Certificate interface
 */
export interface Certificate {
  readonly id: string
  readonly userId: UserId
  readonly courseId: CourseId
  readonly issuedAt: Date
  readonly certificateUrl: string
  readonly verificationCode: string
}
