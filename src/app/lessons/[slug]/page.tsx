/**
 * Dynamic lesson page
 * Displays MDX lesson content
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMDXBySlug } from "@/lib/mdx";
import { LessonViewer } from "@/components/lesson/lesson-viewer";
import { AuthGuard } from "@/components/auth";

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

   return (
      <AuthGuard>
         <div className='min-h-screen bg-background'>
            <LessonViewer lesson={lesson} />
         </div>
      </AuthGuard>
   );
}
