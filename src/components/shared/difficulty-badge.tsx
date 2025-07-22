/**
 * Difficulty badge component
 * Displays course difficulty level with appropriate styling
 */

import { Badge } from "@/components/ui/badge";
import type { Difficulty } from "@/types/course";

interface DifficultyBadgeProps {
   readonly difficulty: Difficulty;
   readonly className?: string;
}

const difficultyConfig = {
   beginner: {
      label: "Beginner",
      className:
         "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
   },
   intermediate: {
      label: "Intermediate",
      className:
         "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
   },
   advanced: {
      label: "Advanced",
      className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
   },
};

export function DifficultyBadge({
   difficulty,
   className,
}: DifficultyBadgeProps) {
   const config = difficultyConfig[difficulty];

   return (
      <Badge
         variant='secondary'
         className={`${config.className} ${className || ""}`}
      >
         {config.label}
      </Badge>
   );
}
