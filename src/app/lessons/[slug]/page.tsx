/**
 * Dynamic lesson page
 * Displays MDX lesson content with course navigation
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMDXBySlug } from "@/lib/mdx";
import { getContentManifest } from "@/lib/content";
import { LessonViewer } from "@/components/lesson/lesson-viewer";
import { CourseSidebar } from "@/components/course";
import { LessonNavigation } from "@/components/navigation";
import { AuthGuard } from "@/components/auth";
import type { Course, Lesson } from "@/types/course";

interface LessonPageProps {
   readonly params: Promise<{
      readonly slug: string;
   }>;
}

export async function generateMetadata({
   params,
}: LessonPageProps): Promise<Metadata> {
   const { slug } = await params;
   const lesson = await getMDXBySlug(slug);

   if (!lesson) {
      return {
         title: "Lesson Not Found",
         description: "The requested lesson could not be found.",
      };
   }

   return {
      title: `${lesson.frontmatter.title} - Learn To Code`,
      description: lesson.frontmatter.description,
      keywords: lesson.frontmatter.tags?.join(", "),
      openGraph: {
         title: lesson.frontmatter.title,
         description: lesson.frontmatter.description,
         type: "article",
      },
   };
}

export default async function LessonPage({ params }: LessonPageProps) {
   const { slug } = await params;
   const lesson = await getMDXBySlug(slug);

   if (!lesson) {
      notFound();
   }

   // Get course context from content manifest
   const manifest = await getContentManifest();
   let course: Course | undefined;
   let lessonData: Lesson | undefined;

   // Find which course this lesson belongs to
   for (const courseItem of manifest.courses) {
      for (const moduleItem of courseItem.modules) {
         const foundLesson = moduleItem.lessons.find((l) => l.slug === slug);
         if (foundLesson) {
            course = courseItem;
            lessonData = foundLesson;
            break;
         }
      }
      if (course) break;
   }

   return (
      <AuthGuard>
         <div className='min-h-screen bg-background'>
            {course ? (
               <div className='flex h-screen'>
                  {/* Course Sidebar */}
                  <div className='w-80 flex-shrink-0 border-r border-border bg-card'>
                     <CourseSidebar
                        course={course}
                        currentLessonId={lessonData?.slug}
                        className='h-full'
                     />
                  </div>

                  {/* Main Content */}
                  <div className='flex-1 flex flex-col overflow-hidden'>
                     <div className='flex-1 overflow-y-auto'>
                        <LessonViewer
                           lesson={lesson}
                           course={course}
                           lessonData={lessonData}
                        />
                     </div>

                     {/* Lesson Navigation */}
                     {course && lessonData && (
                        <LessonNavigation
                           course={course}
                           currentLesson={lessonData}
                        />
                     )}
                  </div>
               </div>
            ) : (
               // Fallback for lessons without course context
               <LessonViewer lesson={lesson} />
            )}
         </div>
      </AuthGuard>
   );
}
