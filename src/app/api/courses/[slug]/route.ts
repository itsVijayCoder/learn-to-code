/**
 * API route for fetching a specific course by slug
 */

import { NextResponse } from "next/server";
import { getCourseBySlug } from "@/lib/content";

export async function GET(
   _request: Request,
   context: { params: Promise<{ slug: string }> }
) {
   try {
      const { slug } = await context.params;

      if (!slug) {
         return NextResponse.json(
            {
               success: false,
               error: "Course slug is required",
            },
            { status: 400 }
         );
      }

      const course = await getCourseBySlug(slug);

      if (!course) {
         return NextResponse.json(
            {
               success: false,
               error: "Course not found",
            },
            { status: 404 }
         );
      }

      return NextResponse.json({
         success: true,
         data: course,
      });
   } catch (error) {
      console.error("Error fetching course:", error);

      return NextResponse.json(
         {
            success: false,
            error: "Failed to fetch course",
            message: error instanceof Error ? error.message : "Unknown error",
         },
         { status: 500 }
      );
   }
}
