/**
 * API route for fetching lesson content by slug
 */

import { NextResponse } from "next/server";
import { getMDXBySlug } from "@/lib/mdx";

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
               error: "Lesson slug is required",
            },
            { status: 400 }
         );
      }

      const lesson = await getMDXBySlug(slug);

      if (!lesson) {
         return NextResponse.json(
            {
               success: false,
               error: "Lesson not found",
            },
            { status: 404 }
         );
      }

      return NextResponse.json({
         success: true,
         data: lesson,
      });
   } catch (error) {
      console.error("Error fetching lesson:", error);

      return NextResponse.json(
         {
            success: false,
            error: "Failed to fetch lesson",
            message: error instanceof Error ? error.message : "Unknown error",
         },
         { status: 500 }
      );
   }
}
