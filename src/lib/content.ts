/**
 * Content management utilities
 * Handles content scanning, caching, and manifest generation
 */

import { getCourseStructure } from "@/lib/mdx";
import type { MDXContent } from "@/types/mdx";
import type { Course } from "@/types/course";

/**
 * Content manifest interface
 */
export interface ContentManifest {
   readonly courses: Course[];
   readonly totalLessons: number;
   readonly lastUpdated: string;
   readonly structure: Record<string, MDXContent[]>;
}

/**
 * Course metadata cache
 */
let cachedManifest: ContentManifest | null = null;
let lastCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Generate course metadata from MDX content
 */
function generateCourseFromContent(
   courseId: string,
   lessons: MDXContent[]
): Course {
   const sortedLessons = lessons.sort(
      (a, b) => a.frontmatter.order - b.frontmatter.order
   );
   const totalDuration = sortedLessons.reduce(
      (sum, lesson) => sum + (lesson.frontmatter.duration || 0),
      0
   );

   // Create a default module from the lessons
   const defaultModule = {
      id: `${courseId}-main` as string & { __brand: "ModuleId" },
      slug: `${courseId}-main`,
      title: "Main Module",
      description: `Core lessons for ${courseId}`,
      order: 1,
      duration: totalDuration,
      lessons: sortedLessons.map((lesson) => ({
         id: lesson.frontmatter.slug as string & { __brand: "LessonId" },
         slug: lesson.frontmatter.slug,
         title: lesson.frontmatter.title,
         description: lesson.frontmatter.description,
         type: "text" as const,
         duration: lesson.frontmatter.duration || 0,
         order: lesson.frontmatter.order,
         content: lesson.content,
         resources: [],
      })),
   };

   return {
      id: courseId as string & { __brand: "CourseId" },
      slug: courseId,
      title: courseId.charAt(0).toUpperCase() + courseId.slice(1),
      description: `Learn ${courseId} programming from basics to advanced concepts`,
      shortDescription: `${courseId} fundamentals`,
      thumbnail: `/images/courses/${courseId}.jpg`,
      author: "Learn To Code Team",
      duration: totalDuration,
      difficulty: "beginner",
      tags: [
         ...new Set(
            sortedLessons.flatMap((lesson) => lesson.frontmatter.tags || [])
         ),
      ],
      modules: [defaultModule],
      status: "published",
      price: 0,
      featured: false,
      prerequisites: [],
      learningObjectives: sortedLessons.flatMap(
         (lesson) => lesson.frontmatter.learningObjectives || []
      ),
      createdAt: new Date(),
      updatedAt: new Date(),
   };
}

/**
 * Scan content directory and generate manifest
 */
export async function generateContentManifest(): Promise<ContentManifest> {
   try {
      const structure = await getCourseStructure();
      const courses: Course[] = [];
      let totalLessons = 0;

      for (const [courseId, lessons] of Object.entries(structure)) {
         const course = generateCourseFromContent(courseId, lessons);
         courses.push(course);
         totalLessons += lessons.length;
      }

      return {
         courses,
         totalLessons,
         lastUpdated: new Date().toISOString(),
         structure,
      };
   } catch (error) {
      console.error("Error generating content manifest:", error);
      throw new Error("Failed to generate content manifest");
   }
}

/**
 * Get cached content manifest (with cache invalidation)
 */
export async function getContentManifest(
   forceRefresh = false
): Promise<ContentManifest> {
   const now = Date.now();

   if (
      !forceRefresh &&
      cachedManifest &&
      now - lastCacheTime < CACHE_DURATION
   ) {
      return cachedManifest;
   }

   cachedManifest = await generateContentManifest();
   lastCacheTime = now;

   return cachedManifest;
}

/**
 * Get all available courses
 */
export async function getAllCourses(): Promise<Course[]> {
   const manifest = await getContentManifest();
   return manifest.courses;
}

/**
 * Get a specific course by ID
 */
export async function getCourseById(courseId: string): Promise<Course | null> {
   const manifest = await getContentManifest();
   return manifest.courses.find((course) => course.id === courseId) || null;
}

/**
 * Get course by slug
 */
export async function getCourseBySlug(slug: string): Promise<Course | null> {
   const manifest = await getContentManifest();
   return manifest.courses.find((course) => course.slug === slug) || null;
}

/**
 * Search courses by query
 */
export async function searchCourses(query: string): Promise<Course[]> {
   const manifest = await getContentManifest();
   const lowercaseQuery = query.toLowerCase();

   return manifest.courses.filter(
      (course) =>
         course.title.toLowerCase().includes(lowercaseQuery) ||
         course.description.toLowerCase().includes(lowercaseQuery) ||
         course.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
   );
}

/**
 * Get content statistics
 */
export async function getContentStats(): Promise<{
   totalCourses: number;
   totalLessons: number;
   totalDuration: number;
   lastUpdated: string;
}> {
   const manifest = await getContentManifest();
   const totalDuration = manifest.courses.reduce(
      (sum, course) => sum + course.duration,
      0
   );

   return {
      totalCourses: manifest.courses.length,
      totalLessons: manifest.totalLessons,
      totalDuration,
      lastUpdated: manifest.lastUpdated,
   };
}

/**
 * Get featured courses (first 3 courses for now)
 */
export async function getFeaturedCourses(): Promise<Course[]> {
   const manifest = await getContentManifest();
   return manifest.courses.slice(0, 3);
}

/**
 * Get recent courses (last 5 updated)
 */
export async function getRecentCourses(): Promise<Course[]> {
   const manifest = await getContentManifest();
   return manifest.courses
      .sort(
         (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
      .slice(0, 5);
}

/**
 * Invalidate content cache
 */
export function invalidateContentCache(): void {
   cachedManifest = null;
   lastCacheTime = 0;
}
