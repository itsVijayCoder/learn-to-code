/**
 * Breadcrumb navigation component
 * Shows the current path and allows navigation between levels
 */

"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
   readonly label: string;
   readonly href?: string;
   readonly isActive?: boolean;
}

interface BreadcrumbProps {
   readonly items: BreadcrumbItem[];
   readonly className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
   return (
      <nav
         className={cn("flex items-center space-x-1 text-sm", className)}
         aria-label='Breadcrumb'
      >
         <Link
            href='/'
            className='flex items-center text-muted-foreground hover:text-foreground transition-colors'
            aria-label='Home'
         >
            <Home className='w-4 h-4' />
         </Link>

         {items.map((item, index) => (
            <React.Fragment key={index}>
               <ChevronRight className='w-4 h-4 text-muted-foreground' />

               {item.href && !item.isActive ? (
                  <Link
                     href={item.href}
                     className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                     {item.label}
                  </Link>
               ) : (
                  <span
                     className={cn(
                        "text-foreground",
                        item.isActive && "font-medium"
                     )}
                     aria-current={item.isActive ? "page" : undefined}
                  >
                     {item.label}
                  </span>
               )}
            </React.Fragment>
         ))}
      </nav>
   );
}

/**
 * Hook to generate breadcrumb items for course pages
 */
export function useCourseBreadcrumbs(
   courseTitle?: string,
   courseSlug?: string,
   lessonTitle?: string
): BreadcrumbItem[] {
   return React.useMemo(() => {
      const items: BreadcrumbItem[] = [{ label: "Courses", href: "/courses" }];

      if (courseTitle && courseSlug) {
         items.push({
            label: courseTitle,
            href: lessonTitle ? `/courses/${courseSlug}` : undefined,
            isActive: !lessonTitle,
         });
      }

      if (lessonTitle) {
         items.push({
            label: lessonTitle,
            isActive: true,
         });
      }

      return items;
   }, [courseTitle, courseSlug, lessonTitle]);
}
