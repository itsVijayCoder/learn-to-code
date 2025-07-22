/**
 * Course Form Dialog Component
 * Handles course creation and editing with validation
 * Follows Single Responsibility Principle
 */

"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import {
   CourseFormSchema,
   type CourseFormData,
   type AdminCourse,
} from "@/lib/admin/course-service";

interface CourseFormDialogProps {
   open: boolean;
   onClose: () => void;
   course?: AdminCourse | null;
   onSave: (data: CourseFormData) => Promise<void>;
   mode: "create" | "edit";
}

export function CourseFormDialog({
   open,
   onClose,
   course,
   onSave,
   mode,
}: CourseFormDialogProps) {
   const [tagInput, setTagInput] = useState("");
   const [saving, setSaving] = useState(false);

   const form = useForm<CourseFormData>({
      resolver: zodResolver(CourseFormSchema),
      defaultValues: {
         title: "",
         description: "",
         slug: "",
         difficulty: "beginner",
         duration: 1,
         tags: [],
         author: "",
         published: false,
         category: "",
         prerequisites: [],
         learningObjectives: [""],
         ...course,
      },
   });

   // Reset form when course changes
   useEffect(() => {
      if (course && mode === "edit") {
         form.reset({
            title: course.title,
            description: course.description,
            slug: course.slug,
            difficulty: course.difficulty,
            duration: course.duration,
            tags: course.tags,
            author: course.author,
            published: course.published,
            category: course.category,
            prerequisites: course.prerequisites,
            learningObjectives: course.learningObjectives,
         });
      } else if (mode === "create") {
         form.reset({
            title: "",
            description: "",
            slug: "",
            difficulty: "beginner",
            duration: 1,
            tags: [],
            author: "",
            published: false,
            category: "",
            prerequisites: [],
            learningObjectives: [""],
         });
      }
   }, [course, mode, form]);

   const handleSubmit = async (data: CourseFormData) => {
      try {
         setSaving(true);
         await onSave(data);
         onClose();
      } catch (error) {
         console.error("Failed to save course:", error);
      } finally {
         setSaving(false);
      }
   };

   const addTag = () => {
      const tag = tagInput.trim();
      if (tag && !form.getValues("tags").includes(tag)) {
         const currentTags = form.getValues("tags");
         form.setValue("tags", [...currentTags, tag]);
         setTagInput("");
      }
   };

   const removeTag = (tagToRemove: string) => {
      const currentTags = form.getValues("tags");
      form.setValue(
         "tags",
         currentTags.filter((tag) => tag !== tagToRemove)
      );
   };

   const generateSlug = () => {
      const title = form.getValues("title");
      const slug = title
         .toLowerCase()
         .replace(/[^a-z0-9]+/g, "-")
         .replace(/^-+|-+$/g, "");
      form.setValue("slug", slug);
   };

   return (
      <Dialog open={open} onOpenChange={onClose}>
         <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
            <DialogHeader>
               <DialogTitle>
                  {mode === "create" ? "Create New Course" : "Edit Course"}
               </DialogTitle>
               <DialogDescription>
                  {mode === "create"
                     ? "Fill in the details to create a new course."
                     : "Update the course information below."}
               </DialogDescription>
            </DialogHeader>

            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className='space-y-6'
               >
                  {/* Basic Information */}
                  <div className='grid grid-cols-2 gap-4'>
                     <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Title *</FormLabel>
                              <FormControl>
                                 <Input {...field} placeholder='Course title' />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name='slug'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Slug *</FormLabel>
                              <FormControl>
                                 <div className='flex gap-2'>
                                    <Input
                                       {...field}
                                       placeholder='course-slug'
                                    />
                                    <Button
                                       type='button'
                                       variant='outline'
                                       onClick={generateSlug}
                                    >
                                       Auto
                                    </Button>
                                 </div>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <FormField
                     control={form.control}
                     name='description'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Description *</FormLabel>
                           <FormControl>
                              <Textarea
                                 {...field}
                                 placeholder='Course description'
                                 rows={3}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <div className='grid grid-cols-3 gap-4'>
                     <FormField
                        control={form.control}
                        name='author'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Author *</FormLabel>
                              <FormControl>
                                 <Input
                                    {...field}
                                    placeholder='Course author'
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name='difficulty'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Difficulty *</FormLabel>
                              <Select
                                 onValueChange={field.onChange}
                                 defaultValue={field.value}
                              >
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder='Select difficulty' />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    <SelectItem value='beginner'>
                                       Beginner
                                    </SelectItem>
                                    <SelectItem value='intermediate'>
                                       Intermediate
                                    </SelectItem>
                                    <SelectItem value='advanced'>
                                       Advanced
                                    </SelectItem>
                                 </SelectContent>
                              </Select>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name='duration'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Duration (hours) *</FormLabel>
                              <FormControl>
                                 <Input
                                    {...field}
                                    type='number'
                                    min='1'
                                    onChange={(e) =>
                                       field.onChange(
                                          parseInt(e.target.value) || 1
                                       )
                                    }
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <FormField
                     control={form.control}
                     name='category'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Category *</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 placeholder='e.g., Programming, Design, Marketing'
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* Tags */}
                  <FormField
                     control={form.control}
                     name='tags'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Tags *</FormLabel>
                           <div className='space-y-2'>
                              <div className='flex gap-2'>
                                 <Input
                                    value={tagInput}
                                    onChange={(e) =>
                                       setTagInput(e.target.value)
                                    }
                                    placeholder='Add a tag'
                                    onKeyPress={(e) =>
                                       e.key === "Enter" &&
                                       (e.preventDefault(), addTag())
                                    }
                                 />
                                 <Button
                                    type='button'
                                    variant='outline'
                                    onClick={addTag}
                                 >
                                    Add
                                 </Button>
                              </div>
                              <div className='flex flex-wrap gap-2'>
                                 {field.value.map((tag) => (
                                    <Badge
                                       key={tag}
                                       variant='secondary'
                                       className='gap-1'
                                    >
                                       {tag}
                                       <button
                                          type='button'
                                          onClick={() => removeTag(tag)}
                                          className='ml-1 rounded-full hover:bg-secondary-foreground/20'
                                       >
                                          <X className='h-3 w-3' />
                                       </button>
                                    </Badge>
                                 ))}
                              </div>
                           </div>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* Learning Objectives */}
                  <FormField
                     control={form.control}
                     name='learningObjectives'
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Learning Objectives *</FormLabel>
                           <FormDescription>
                              What will students learn from this course?
                           </FormDescription>
                           <div className='space-y-2'>
                              {field.value.map((objective, index) => (
                                 <div key={index} className='flex gap-2'>
                                    <Input
                                       value={objective}
                                       onChange={(e) => {
                                          const newObjectives = [
                                             ...field.value,
                                          ];
                                          newObjectives[index] = e.target.value;
                                          field.onChange(newObjectives);
                                       }}
                                       placeholder={`Learning objective ${index + 1}`}
                                    />
                                    {field.value.length > 1 && (
                                       <Button
                                          type='button'
                                          variant='outline'
                                          size='icon'
                                          onClick={() => {
                                             const newObjectives =
                                                field.value.filter(
                                                   (_, i) => i !== index
                                                );
                                             field.onChange(newObjectives);
                                          }}
                                       >
                                          <X className='h-4 w-4' />
                                       </Button>
                                    )}
                                 </div>
                              ))}
                              <Button
                                 type='button'
                                 variant='outline'
                                 onClick={() =>
                                    field.onChange([...field.value, ""])
                                 }
                              >
                                 Add Objective
                              </Button>
                           </div>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* Actions */}
                  <div className='flex justify-end gap-2 pt-4 border-t'>
                     <Button type='button' variant='outline' onClick={onClose}>
                        Cancel
                     </Button>
                     <Button type='submit' disabled={saving}>
                        {saving
                           ? "Saving..."
                           : mode === "create"
                             ? "Create Course"
                             : "Update Course"}
                     </Button>
                  </div>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
}
