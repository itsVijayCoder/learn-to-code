/**
 * API route for fetching content statistics
 */

import { NextResponse } from "next/server";
import { getContentStats } from "@/lib/content";

export async function GET() {
   try {
      const stats = await getContentStats();

      return NextResponse.json({
         success: true,
         data: stats,
      });
   } catch (error) {
      console.error("Error fetching content stats:", error);

      return NextResponse.json(
         {
            success: false,
            error: "Failed to fetch content statistics",
            message: error instanceof Error ? error.message : "Unknown error",
         },
         { status: 500 }
      );
   }
}
