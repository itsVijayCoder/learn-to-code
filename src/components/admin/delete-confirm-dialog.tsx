/**
 * Delete Confirmation Dialog Component
 * Handles course deletion with confirmation
 * Follows Single Responsibility Principle
 */

"use client";

import React, { useState } from "react";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { AdminCourse } from "@/lib/admin/course-service";

interface DeleteConfirmDialogProps {
   open: boolean;
   onClose: () => void;
   course: AdminCourse | null;
   onConfirm: (courseId: string) => Promise<void>;
}

export function DeleteConfirmDialog({
   open,
   onClose,
   course,
   onConfirm,
}: DeleteConfirmDialogProps) {
   const [confirmText, setConfirmText] = useState("");
   const [deleting, setDeleting] = useState(false);

   const handleConfirm = async () => {
      if (!course || confirmText !== course.title) {
         return;
      }

      try {
         setDeleting(true);
         await onConfirm(course.id);
         onClose();
         setConfirmText("");
      } catch (error) {
         console.error("Failed to delete course:", error);
      } finally {
         setDeleting(false);
      }
   };

   const handleClose = () => {
      if (!deleting) {
         setConfirmText("");
         onClose();
      }
   };

   if (!course) {
      return null;
   }

   const isConfirmValid = confirmText === course.title;

   return (
      <Dialog open={open} onOpenChange={handleClose}>
         <DialogContent className='max-w-md'>
            <DialogHeader>
               <DialogTitle className='flex items-center gap-2 text-destructive'>
                  <Trash2 className='h-5 w-5' />
                  Delete Course
               </DialogTitle>
               <DialogDescription>
                  This action cannot be undone. This will permanently delete the
                  course and all associated data.
               </DialogDescription>
            </DialogHeader>

            <div className='space-y-4'>
               <Alert>
                  <AlertTriangle className='h-4 w-4' />
                  <AlertDescription>
                     <strong>Warning:</strong> Deleting this course will:
                     <ul className='list-disc list-inside mt-2 space-y-1'>
                        <li>Remove all course content and modules</li>
                        <li>Remove all student enrollments and progress</li>
                        <li>Remove all ratings and reviews</li>
                        <li>This action is irreversible</li>
                     </ul>
                  </AlertDescription>
               </Alert>

               <div className='space-y-2'>
                  <Label htmlFor='confirm-text'>
                     Type <strong>{course.title}</strong> to confirm deletion:
                  </Label>
                  <Input
                     id='confirm-text'
                     value={confirmText}
                     onChange={(e) => setConfirmText(e.target.value)}
                     placeholder={course.title}
                     disabled={deleting}
                  />
               </div>

               <div className='bg-muted p-3 rounded-md'>
                  <h4 className='font-medium text-sm mb-2'>Course Details:</h4>
                  <div className='space-y-1 text-sm text-muted-foreground'>
                     <p>
                        <strong>Title:</strong> {course.title}
                     </p>
                     <p>
                        <strong>Author:</strong> {course.author}
                     </p>
                     <p>
                        <strong>Category:</strong> {course.category}
                     </p>
                     <p>
                        <strong>Status:</strong>{" "}
                        {course.published ? "Published" : "Draft"}
                     </p>
                  </div>
               </div>
            </div>

            <DialogFooter className='gap-2'>
               <Button
                  variant='outline'
                  onClick={handleClose}
                  disabled={deleting}
               >
                  Cancel
               </Button>
               <Button
                  variant='destructive'
                  onClick={handleConfirm}
                  disabled={!isConfirmValid || deleting}
               >
                  {deleting ? "Deleting..." : "Delete Course"}
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
}
