import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DifficultyBadge, CourseMeta } from "@/components/shared";
import Link from "next/link";
import type { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
  progress?: number;
  className?: string;
}

const CourseCard = ({ course, showProgress = false, progress = 0, className }: CourseCardProps) => {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-200 ${className}`}>
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={course.thumbnail || "/api/placeholder/400/200"}
            alt={course.title}
            className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <DifficultyBadge difficulty={course.difficulty} />
          </div>
          {course.featured && (
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                Featured
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
              {course.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {course.shortDescription || course.description}
            </p>
          </div>

          <CourseMeta
            duration={`${Math.floor(course.duration / 60)}h ${course.duration % 60}m`}
            difficulty={course.difficulty}
          />

          {showProgress && progress > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">by</span>
              <span className="text-sm font-medium">{course.author}</span>
            </div>
            
            <Button asChild>
              <Link href={`/courses/${course.slug}`}>
                {showProgress && progress > 0 ? "Continue" : "Start Course"}
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface CourseGridProps {
  courses: Course[];
  showProgress?: boolean;
  progressData?: Record<string, number>;
  className?: string;
}

const CourseGrid = ({ courses, showProgress = false, progressData = {}, className }: CourseGridProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          showProgress={showProgress}
          progress={progressData[course.id] || 0}
        />
      ))}
    </div>
  );
};

export { CourseCard, CourseGrid };
