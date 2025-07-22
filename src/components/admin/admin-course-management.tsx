/**
 * Admin Course Management Component - Functional Programming
 * Main interface for course CRUD operations in admin dashboard
 * Follows SOLID principles with functional approach
 */

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
   Plus,
   Search,
   MoreHorizontal,
   Edit,
   Trash2,
   BarChart3,
} from "lucide-react";
import { useAdminCourses } from "@/hooks/use-admin-courses";
import type {
   AdminCourse,
   CourseFormData,
   CourseAnalytics,
} from "@/lib/admin/course-service";
import { CourseFormDialog } from "./course-form-dialog";
import { CourseAnalyticsDialog } from "./course-analytics-dialog";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";

export function AdminCourseManagement() {
   const {
      courses,
      loading,
      error,
      createCourse,
      updateCourse,
      deleteCourse,
      getCourseAnalytics,
   } = useAdminCourses();

   // Dialog states
   const [showCreateDialog, setShowCreateDialog] = useState(false);
   const [showEditDialog, setShowEditDialog] = useState(false);
   const [showAnalyticsDialog, setShowAnalyticsDialog] = useState(false);
   const [showDeleteDialog, setShowDeleteDialog] = useState(false);

   // Selected course state
   const [selectedCourse, setSelectedCourse] = useState<AdminCourse | null>(
      null
   );
   const [courseAnalytics, setCourseAnalytics] =
      useState<CourseAnalytics | null>(null);

   // Search and filter state
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState<
      "all" | "published" | "draft"
   >("all");

   // Filter courses based on search and status
   const filteredCourses = courses.filter((course) => {
      const matchesSearch =
         course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
         course.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
         course.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
         statusFilter === "all" ||
         (statusFilter === "published" && course.published) ||
         (statusFilter === "draft" && !course.published);

      return matchesSearch && matchesStatus;
   });

   // Event handlers
   const handleCreateCourse = async (data: CourseFormData) => {
      await createCourse(data);
      setShowCreateDialog(false);
   };

   const handleEditCourse = (course: AdminCourse) => {
      setSelectedCourse(course);
      setShowEditDialog(true);
   };

   const handleUpdateCourse = async (data: CourseFormData) => {
      if (!selectedCourse) return;
      await updateCourse(selectedCourse.id, data);
      setShowEditDialog(false);
      setSelectedCourse(null);
   };

   const handleDeleteCourse = (course: AdminCourse) => {
      setSelectedCourse(course);
      setShowDeleteDialog(true);
   };

   const handleConfirmDelete = async (courseId: string) => {
      await deleteCourse(courseId);
      setShowDeleteDialog(false);
      setSelectedCourse(null);
   };

   const handleViewAnalytics = async (course: AdminCourse) => {
      setSelectedCourse(course);
      setShowAnalyticsDialog(true);

      try {
         const analytics = await getCourseAnalytics();
         setCourseAnalytics(analytics);
      } catch (error) {
         console.error("Failed to load analytics:", error);
      }
   };

   const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat("en-US", {
         year: "numeric",
         month: "short",
         day: "numeric",
      }).format(date);
   };

   if (loading) {
      return (
         <div className='flex justify-center items-center min-h-64'>
            <div className='text-muted-foreground'>Loading courses...</div>
         </div>
      );
   }

   if (error) {
      return (
         <div className='text-center text-red-600 min-h-64 flex items-center justify-center'>
            <div>
               <p className='font-medium'>Error loading courses</p>
               <p className='text-sm text-muted-foreground'>{error}</p>
            </div>
         </div>
      );
   }

   return (
      <div className='space-y-6'>
         {/* Header */}
         <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
            <div>
               <h1 className='text-2xl font-bold'>Course Management</h1>
               <p className='text-muted-foreground'>
                  Manage your courses, view analytics, and track performance
               </p>
            </div>
            <Button onClick={() => setShowCreateDialog(true)}>
               <Plus className='h-4 w-4 mr-2' />
               Create Course
            </Button>
         </div>

         {/* Filters */}
         <div className='flex flex-col sm:flex-row gap-4'>
            <div className='relative flex-1'>
               <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
               <Input
                  placeholder='Search courses...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='pl-10'
               />
            </div>

            <div className='flex gap-2'>
               <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  size='sm'
                  onClick={() => setStatusFilter("all")}
               >
                  All ({courses.length})
               </Button>
               <Button
                  variant={statusFilter === "published" ? "default" : "outline"}
                  size='sm'
                  onClick={() => setStatusFilter("published")}
               >
                  Published ({courses.filter((c) => c.published).length})
               </Button>
               <Button
                  variant={statusFilter === "draft" ? "default" : "outline"}
                  size='sm'
                  onClick={() => setStatusFilter("draft")}
               >
                  Draft ({courses.filter((c) => !c.published).length})
               </Button>
            </div>
         </div>

         {/* Courses Table */}
         <div className='border rounded-lg'>
            <Table>
               <TableHeader>
                  <TableRow>
                     <TableHead>Course</TableHead>
                     <TableHead>Author</TableHead>
                     <TableHead>Category</TableHead>
                     <TableHead>Status</TableHead>
                     <TableHead>Created</TableHead>
                     <TableHead>Actions</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {filteredCourses.length === 0 ? (
                     <TableRow>
                        <TableCell colSpan={6} className='text-center py-8'>
                           <div className='text-muted-foreground'>
                              {courses.length === 0
                                 ? "No courses found"
                                 : "No courses match your filters"}
                           </div>
                        </TableCell>
                     </TableRow>
                  ) : (
                     filteredCourses.map((course) => (
                        <TableRow key={course.id}>
                           <TableCell>
                              <div>
                                 <div className='font-medium'>
                                    {course.title}
                                 </div>
                                 <div className='text-sm text-muted-foreground'>
                                    {course.difficulty} • {course.duration}h
                                 </div>
                              </div>
                           </TableCell>
                           <TableCell>{course.author}</TableCell>
                           <TableCell>{course.category}</TableCell>
                           <TableCell>
                              <Badge
                                 variant={
                                    course.published ? "default" : "secondary"
                                 }
                              >
                                 {course.published ? "Published" : "Draft"}
                              </Badge>
                           </TableCell>
                           <TableCell>{formatDate(course.createdAt)}</TableCell>
                           <TableCell>
                              <DropdownMenu>
                                 <DropdownMenuTrigger asChild>
                                    <Button variant='ghost' size='sm'>
                                       <MoreHorizontal className='h-4 w-4' />
                                    </Button>
                                 </DropdownMenuTrigger>
                                 <DropdownMenuContent align='end'>
                                    <DropdownMenuItem
                                       onClick={() =>
                                          handleViewAnalytics(course)
                                       }
                                    >
                                       <BarChart3 className='h-4 w-4 mr-2' />
                                       Analytics
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                       onClick={() => handleEditCourse(course)}
                                    >
                                       <Edit className='h-4 w-4 mr-2' />
                                       Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                       onClick={() =>
                                          handleDeleteCourse(course)
                                       }
                                       className='text-red-600'
                                    >
                                       <Trash2 className='h-4 w-4 mr-2' />
                                       Delete
                                    </DropdownMenuItem>
                                 </DropdownMenuContent>
                              </DropdownMenu>
                           </TableCell>
                        </TableRow>
                     ))
                  )}
               </TableBody>
            </Table>
         </div>

         {/* Dialogs */}
         <CourseFormDialog
            open={showCreateDialog}
            onClose={() => setShowCreateDialog(false)}
            onSave={handleCreateCourse}
            mode='create'
         />

         <CourseFormDialog
            open={showEditDialog}
            onClose={() => {
               setShowEditDialog(false);
               setSelectedCourse(null);
            }}
            course={selectedCourse}
            onSave={handleUpdateCourse}
            mode='edit'
         />

         <CourseAnalyticsDialog
            open={showAnalyticsDialog}
            onClose={() => {
               setShowAnalyticsDialog(false);
               setSelectedCourse(null);
               setCourseAnalytics(null);
            }}
            course={selectedCourse}
            analytics={courseAnalytics}
            loading={loading}
         />

         <DeleteConfirmDialog
            open={showDeleteDialog}
            onClose={() => {
               setShowDeleteDialog(false);
               setSelectedCourse(null);
            }}
            course={selectedCourse}
            onConfirm={handleConfirmDelete}
         />
      </div>
   );
}
