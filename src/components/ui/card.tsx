import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Card component props
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
   variant?: "default" | "glass" | "bordered" | "elevated";
   padding?: "none" | "sm" | "md" | "lg";
}

/**
 * Main Card component with multiple variants
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
   ({ className, variant = "default", padding = "md", ...props }, ref) => {
      const variants = {
         default: "bg-card text-card-foreground shadow-sm",
         glass: "glass-effect",
         bordered: "border border-border bg-card text-card-foreground",
         elevated: "bg-card text-card-foreground shadow-lg",
      };

      const paddings = {
         none: "",
         sm: "p-4",
         md: "p-6",
         lg: "p-8",
      };

      return (
         <div
            ref={ref}
            className={cn(
               "rounded-xl transition-all duration-200",
               variants[variant],
               paddings[padding],
               className
            )}
            {...props}
         />
      );
   }
);
Card.displayName = "Card";

/**
 * Card header component
 */
const CardHeader = React.forwardRef<
   HTMLDivElement,
   React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
   <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6 pb-4", className)}
      {...props}
   />
));
CardHeader.displayName = "CardHeader";

/**
 * Card title component
 */
const CardTitle = React.forwardRef<
   HTMLParagraphElement,
   React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
   <h3
      ref={ref}
      className={cn(
         "font-semibold leading-none tracking-tight text-xl",
         className
      )}
      {...props}
   >
      {children}
   </h3>
));
CardTitle.displayName = "CardTitle";

/**
 * Card description component
 */
const CardDescription = React.forwardRef<
   HTMLParagraphElement,
   React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
   <p
      ref={ref}
      className={cn("text-sm text-muted-foreground leading-relaxed", className)}
      {...props}
   />
));
CardDescription.displayName = "CardDescription";

/**
 * Card content component
 */
const CardContent = React.forwardRef<
   HTMLDivElement,
   React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
   <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

/**
 * Card footer component
 */
const CardFooter = React.forwardRef<
   HTMLDivElement,
   React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
   <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
   />
));
CardFooter.displayName = "CardFooter";

export {
   Card,
   CardHeader,
   CardFooter,
   CardTitle,
   CardDescription,
   CardContent,
};
