import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Lock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Module, Lesson } from "@/types/course";

interface LessonItemProps {
   lesson: Lesson;
   moduleSlug: string;
   courseSlug: string;
   isCompleted: boolean;
   isLocked: boolean;
   isActive?: boolean;
   onClick?: () => void;
}

const LessonItem = ({
   lesson,
   moduleSlug,
   courseSlug,
   isCompleted,
   isLocked,
   isActive = false,
   onClick,
}: LessonItemProps) => {
   const href = `/courses/${courseSlug}/${moduleSlug}/${lesson.slug}`;

   const content = (
      <div
         className={cn(
            "flex items-center gap-3 p-3 rounded-lg transition-colors cursor-pointer",
            isActive && "bg-primary/10 border border-primary/20",
            !isLocked && !isActive && "hover:bg-muted",
            isLocked && "opacity-50 cursor-not-allowed"
         )}
         onClick={!isLocked ? onClick : undefined}
      >
         <div className='flex-shrink-0'>
            {isLocked ? (
               <Lock className='h-5 w-5 text-muted-foreground' />
            ) : isCompleted ? (
               <CheckCircle2 className='h-5 w-5 text-green-600' />
            ) : (
               <Circle className='h-5 w-5 text-muted-foreground' />
            )}
         </div>

         <div className='flex-1 min-w-0'>
            <h4
               className={cn(
                  "text-sm font-medium truncate",
                  isActive && "text-primary",
                  isLocked && "text-muted-foreground"
               )}
            >
               {lesson.title}
            </h4>
            <div className='flex items-center gap-2 mt-1'>
               <span className='text-xs text-muted-foreground capitalize'>
                  {lesson.type}
               </span>
               <span className='text-xs text-muted-foreground'>
                  {lesson.duration}m
               </span>
            </div>
         </div>
      </div>
   );

   if (isLocked) {
      return content;
   }

   return <Link href={href}>{content}</Link>;
};

interface ModuleProgressProps {
   module: Module;
   courseSlug: string;
   completedLessons: Set<string>;
   currentLessonId?: string;
   onLessonClick?: (lessonId: string) => void;
}

const ModuleProgress = ({
   module,
   courseSlug,
   completedLessons,
   currentLessonId,
   onLessonClick,
}: ModuleProgressProps) => {
   const completedCount = module.lessons.filter((lesson) =>
      completedLessons.has(lesson.id)
   ).length;
   const totalLessons = module.lessons.length;
   const progressPercentage = (completedCount / totalLessons) * 100;

   return (
      <Card>
         <CardHeader>
            <div className='flex items-center justify-between'>
               <CardTitle className='text-lg'>{module.title}</CardTitle>
               <span className='text-sm text-muted-foreground'>
                  {completedCount}/{totalLessons}
               </span>
            </div>
            <Progress value={progressPercentage} className='h-2' />
         </CardHeader>

         <CardContent>
            <p className='text-sm text-muted-foreground mb-4'>
               {module.description}
            </p>

            <div className='space-y-2'>
               {module.lessons.map((lesson, index) => {
                  const isCompleted = completedLessons.has(lesson.id);
                  const previousLesson =
                     index > 0 ? module.lessons[index - 1] : null;
                  const isLocked = Boolean(
                     index > 0 &&
                        previousLesson &&
                        !completedLessons.has(previousLesson.id)
                  );
                  const isActive = currentLessonId === lesson.id;

                  return (
                     <LessonItem
                        key={lesson.id}
                        lesson={lesson}
                        moduleSlug={module.slug}
                        courseSlug={courseSlug}
                        isCompleted={isCompleted}
                        isLocked={isLocked}
                        isActive={isActive}
                        onClick={() => onLessonClick?.(lesson.id)}
                     />
                  );
               })}
            </div>
         </CardContent>
      </Card>
   );
};

interface CourseProgressProps {
   modules: Module[];
   courseSlug: string;
   completedLessons: Set<string>;
   currentLessonId?: string;
   onLessonClick?: (lessonId: string) => void;
}

const CourseProgress = ({
   modules,
   courseSlug,
   completedLessons,
   currentLessonId,
   onLessonClick,
}: CourseProgressProps) => {
   const totalLessons = modules.reduce(
      (acc, module) => acc + module.lessons.length,
      0
   );
   const totalCompleted = Array.from(completedLessons).length;
   const overallProgress = (totalCompleted / totalLessons) * 100;

   return (
      <div className='space-y-6'>
         <Card>
            <CardHeader>
               <CardTitle>Course Progress</CardTitle>
               <div className='flex items-center justify-between text-sm'>
                  <span className='text-muted-foreground'>
                     {totalCompleted}/{totalLessons} lessons completed
                  </span>
                  <span className='font-medium'>
                     {Math.round(overallProgress)}%
                  </span>
               </div>
               <Progress value={overallProgress} className='h-3' />
            </CardHeader>
         </Card>

         {modules.map((module) => (
            <ModuleProgress
               key={module.id}
               module={module}
               courseSlug={courseSlug}
               completedLessons={completedLessons}
               currentLessonId={currentLessonId}
               onLessonClick={onLessonClick}
            />
         ))}
      </div>
   );
};

export { LessonItem, ModuleProgress, CourseProgress };
