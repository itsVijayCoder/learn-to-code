import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Difficulty } from "@/types/course";

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  className?: string;
}

const difficultyConfig = {
  beginner: {
    label: "Beginner",
    variant: "secondary" as const,
    className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  intermediate: {
    label: "Intermediate", 
    variant: "secondary" as const,
    className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
  advanced: {
    label: "Advanced",
    variant: "secondary" as const,
    className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  },
} as const;

const DifficultyBadge = ({ difficulty, className }: DifficultyBadgeProps) => {
  const config = difficultyConfig[difficulty];
  
  return (
    <Badge 
      variant={config.variant}
      className={cn(config.className, className)}
    >
      {config.label}
    </Badge>
  );
};

interface CourseMetaProps {
  duration?: string;
  studentCount?: number;
  rating?: number;
  difficulty: Difficulty;
  className?: string;
}

const CourseMeta = ({ 
  duration, 
  studentCount, 
  rating, 
  difficulty, 
  className 
}: CourseMetaProps) => {
  return (
    <div className={cn("flex items-center gap-4 text-sm text-muted-foreground", className)}>
      {duration && (
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{duration}</span>
        </div>
      )}
      
      {studentCount && (
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4" />
          <span>{studentCount.toLocaleString()} students</span>
        </div>
      )}
      
      {rating && (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span>{rating.toFixed(1)}</span>
        </div>
      )}
      
      <DifficultyBadge difficulty={difficulty} />
    </div>
  );
};

interface ProgressIndicatorProps {
  progress: number;
  total: number;
  showPercentage?: boolean;
  className?: string;
}

const ProgressIndicator = ({ 
  progress, 
  total, 
  showPercentage = true, 
  className 
}: ProgressIndicatorProps) => {
  const percentage = Math.round((progress / total) * 100);
  
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Progress</span>
        {showPercentage && (
          <span className="font-medium">{percentage}%</span>
        )}
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{progress} completed</span>
        <span>{total} total</span>
      </div>
    </div>
  );
};

export { DifficultyBadge, CourseMeta, ProgressIndicator };
