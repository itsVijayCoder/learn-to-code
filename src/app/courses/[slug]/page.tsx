/**
 * Dynamic course page
 * Displays course overview and lessons
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseBySlug } from "@/lib/content";
import { CourseOverview } from "@/components/course/course-overview";
import { AuthGuard } from "@/components/auth";

interface CoursePageProps {
   readonly params: Promise<{
      readonly slug: string;
   }>;
}

export async function generateMetadata({
   params,
}: CoursePageProps): Promise<Metadata> {
   const { slug } = await params;
   const course = await getCourseBySlug(slug);

   if (!course) {
      return {
         title: "Course Not Found",
         description: "The requested course could not be found.",
      };
   }

   return {
      title: `${course.title} - Learn To Code`,
      description: course.description,
      keywords: course.tags.join(", "),
      openGraph: {
         title: course.title,
         description: course.description,
         images: course.thumbnail ? [course.thumbnail] : [],
         type: "article",
      },
   };
}

export default async function CoursePage({ params }: CoursePageProps) {
   const { slug } = await params;
   const course = await getCourseBySlug(slug);

   if (!course) {
      notFound();
   }

   return (
      <AuthGuard>
         <div className='min-h-screen bg-background'>
            <CourseOverview course={course} />
         </div>
      </AuthGuard>
   );
}
