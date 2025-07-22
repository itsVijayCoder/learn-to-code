/**
 * API route for fetching all courses
 */

import { NextResponse } from "next/server";
import { getAllCourses } from "@/lib/content";

export async function GET() {
   try {
      const courses = await getAllCourses();

      return NextResponse.json({
         success: true,
         data: courses,
         count: courses.length,
      });
   } catch (error) {
      console.error("Error fetching courses:", error);

      return NextResponse.json(
         {
            success: false,
            error: "Failed to fetch courses",
            message: error instanceof Error ? error.message : "Unknown error",
         },
         { status: 500 }
      );
   }
}
