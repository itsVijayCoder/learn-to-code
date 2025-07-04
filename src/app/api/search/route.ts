import { NextResponse } from "next/server";
import { searchCourses } from "@/lib/content";
import { searchMDXContent } from "@/lib/mdx";
import type { Course } from "@/types/course";
import type { MDXContent } from "@/types/mdx";

export async function GET(request: Request) {
   try {
      const { searchParams } = new URL(request.url);
      const query = searchParams.get("q");
      const type = searchParams.get("type") || "all"; // courses, lessons, all

      if (!query) {
         return NextResponse.json(
            {
               success: false,
               error: "Search query is required",
            },
            { status: 400 }
         );
      }

      const results: {
         query: string;
         courses: Course[];
         lessons: MDXContent[];
      } = {
         query,
         courses: [],
         lessons: [],
      };

      if (type === "courses" || type === "all") {
         results.courses = await searchCourses(query);
      }

      if (type === "lessons" || type === "all") {
         results.lessons = await searchMDXContent(query);
      }

      return NextResponse.json({
         success: true,
         data: results,
         totalResults: results.courses.length + results.lessons.length,
      });
   } catch (error) {
      console.error("Error searching content:", error);

      return NextResponse.json(
         {
            success: false,
            error: "Failed to search content",
            message: error instanceof Error ? error.message : "Unknown error",
         },
         { status: 500 }
      );
   }
}
