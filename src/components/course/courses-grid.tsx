/**
 * Courses grid component
 * Displays a grid of course cards with search and filtering
 */

"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CourseCard } from "./course-card";
import { Search, Filter, SortAsc } from "lucide-react";
import type { Course } from "@/types/course";

interface CoursesGridProps {
   readonly courses: Course[];
}

const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.1,
      },
   },
};

const itemVariants = {
   hidden: { opacity: 0, y: 20 },
   visible: { opacity: 1, y: 0 },
};

export function CoursesGrid({ courses }: CoursesGridProps) {
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
      null
   );
   const [sortBy, setSortBy] = useState<"title" | "duration" | "updated">(
      "title"
   );

   // Get all unique difficulties and tags
   const difficulties = useMemo(() => {
      return Array.from(new Set(courses.map((course) => course.difficulty)));
   }, [courses]);

   const allTags = useMemo(() => {
      return Array.from(
         new Set(courses.flatMap((course) => course.tags))
      ).slice(0, 10);
   }, [courses]);

   // Filter and sort courses
   const filteredCourses = useMemo(() => {
      const filtered = courses.filter((course) => {
         const matchesSearch =
            !searchQuery ||
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description
               .toLowerCase()
               .includes(searchQuery.toLowerCase()) ||
            course.tags.some((tag) =>
               tag.toLowerCase().includes(searchQuery.toLowerCase())
            );

         const matchesDifficulty =
            !selectedDifficulty || course.difficulty === selectedDifficulty;

         return matchesSearch && matchesDifficulty;
      });

      // Sort courses
      const sorted = [...filtered].sort((a, b) => {
         switch (sortBy) {
            case "duration":
               return a.duration - b.duration;
            case "updated":
               return (
                  new Date(b.updatedAt).getTime() -
                  new Date(a.updatedAt).getTime()
               );
            case "title":
            default:
               return a.title.localeCompare(b.title);
         }
      });

      return sorted;
   }, [courses, searchQuery, selectedDifficulty, sortBy]);

   return (
      <div className='space-y-6'>
         {/* Search and Filters */}
         <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className='flex flex-col md:flex-row gap-4 items-start md:items-center justify-between'
         >
            <div className='relative flex-1 max-w-md'>
               <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4' />
               <Input
                  placeholder='Search courses...'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='pl-10'
               />
            </div>

            <div className='flex items-center gap-2'>
               <Button
                  variant='outline'
                  size='sm'
                  onClick={() =>
                     setSortBy(
                        sortBy === "title"
                           ? "duration"
                           : sortBy === "duration"
                             ? "updated"
                             : "title"
                     )
                  }
               >
                  <SortAsc className='w-4 h-4 mr-2' />
                  Sort by {sortBy}
               </Button>

               <Button
                  variant='outline'
                  size='sm'
                  onClick={() => {
                     /* TODO: Implement filter modal */
                  }}
               >
                  <Filter className='w-4 h-4 mr-2' />
                  Filter
               </Button>
            </div>
         </motion.div>

         {/* Difficulty Filter */}
         <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='flex flex-wrap gap-2'
         >
            <Button
               variant={selectedDifficulty === null ? "default" : "outline"}
               size='sm'
               onClick={() => setSelectedDifficulty(null)}
            >
               All Levels
            </Button>
            {difficulties.map((difficulty) => (
               <Button
                  key={difficulty}
                  variant={
                     selectedDifficulty === difficulty ? "default" : "outline"
                  }
                  size='sm'
                  onClick={() => setSelectedDifficulty(difficulty)}
               >
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
               </Button>
            ))}
         </motion.div>

         {/* Popular Tags */}
         {allTags.length > 0 && (
            <motion.div
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               className='space-y-2'
            >
               <h3 className='text-sm font-medium text-muted-foreground'>
                  Popular Topics
               </h3>
               <div className='flex flex-wrap gap-2'>
                  {allTags.map((tag) => (
                     <Badge
                        key={tag}
                        variant='outline'
                        className='cursor-pointer hover:bg-primary hover:text-primary-foreground'
                        onClick={() => setSearchQuery(tag)}
                     >
                        {tag}
                     </Badge>
                  ))}
               </div>
            </motion.div>
         )}

         {/* Results Count */}
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-sm text-muted-foreground'
         >
            Showing {filteredCourses.length} of {courses.length} courses
         </motion.div>

         {/* Courses Grid */}
         <motion.div
            variants={containerVariants}
            initial='hidden'
            animate='visible'
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
         >
            {filteredCourses.map((course) => (
               <motion.div key={course.id} variants={itemVariants}>
                  <CourseCard course={course} />
               </motion.div>
            ))}
         </motion.div>

         {/* No Results */}
         {filteredCourses.length === 0 && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className='text-center py-12'
            >
               <div className='text-muted-foreground'>
                  <h3 className='text-lg font-medium mb-2'>No courses found</h3>
                  <p>
                     Try adjusting your search criteria or browse all courses.
                  </p>
               </div>
               <Button
                  className='mt-4'
                  onClick={() => {
                     setSearchQuery("");
                     setSelectedDifficulty(null);
                  }}
               >
                  Clear Filters
               </Button>
            </motion.div>
         )}
      </div>
   );
}
