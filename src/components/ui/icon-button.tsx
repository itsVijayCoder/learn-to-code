import * as React from "react";
import { Button, buttonVariants } from "./button";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

/**
 * IconButton component interface - extends Button props with icon functionality
 */
export interface IconButtonProps
   extends React.ComponentProps<typeof Button>,
      VariantProps<typeof buttonVariants> {
   leftIcon?: React.ReactNode;
   rightIcon?: React.ReactNode;
   isLoading?: boolean;
   iconSize?: "sm" | "md" | "lg" | "xl";
}

/**
 * IconButton component that extends the original Button component
 * with icon functionality and micro-animations on hover
 */
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
   (
      {
         className,
         children,
         leftIcon,
         rightIcon,
         isLoading = false,
         iconSize = "md",
         disabled,
         ...props
      },
      ref
   ) => {
      // Icon size classes based on iconSize prop
      const iconSizeClasses = {
         sm: "size-3",
         md: "size-4",
         lg: "size-5",
         xl: "size-6",
      };

      return (
         <Button
            ref={ref}
            className={cn("group relative overflow-hidden", className)}
            disabled={disabled || isLoading}
            {...props}
         >
            {/* Left Icon with Hover Animation */}
            {leftIcon && !isLoading && (
               <span
                  className={cn(
                     "transition-transform duration-200 ease-out group-hover:-translate-x-0.5 shrink-0",
                     `[&_svg]:${iconSizeClasses[iconSize]}`
                  )}
               >
                  {leftIcon}
               </span>
            )}

            {/* Loading Spinner */}
            {isLoading && (
               <Loader2
                  className={cn(
                     "animate-spin shrink-0",
                     iconSizeClasses[iconSize]
                  )}
               />
            )}

            {/* Button Text */}
            {children && (
               <span className='transition-all duration-200 ease-out'>
                  {children}
               </span>
            )}

            {/* Right Icon with Hover Animation */}
            {rightIcon && !isLoading && (
               <span
                  className={cn(
                     "transition-transform duration-200 ease-out group-hover:translate-x-0.5 shrink-0",
                     `[&_svg]:${iconSizeClasses[iconSize]}`
                  )}
               >
                  {rightIcon}
               </span>
            )}
         </Button>
      );
   }
);

IconButton.displayName = "IconButton";

export { IconButton };
