import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * IconButton variants using CVA for consistent styling
 */
const iconButtonVariants = cva(
   "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
   {
      variants: {
         variant: {
            default:
               "bg-primary text-primary-foreground shadow hover:bg-primary/90",
            destructive:
               "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
            outline:
               "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
            secondary:
               "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
            gradient:
               "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105",
            glass: "glass-effect text-foreground hover:bg-white/20 dark:hover:bg-black/20",
         },
         size: {
            default: "h-10 px-4 py-2",
            sm: "h-8 rounded-md px-3 text-xs",
            lg: "h-12 rounded-lg px-8",
            xl: "h-14 rounded-xl px-10 text-base",
            icon: "h-10 w-10",
            "icon-sm": "h-8 w-8",
            "icon-lg": "h-12 w-12",
         },
      },
      defaultVariants: {
         variant: "default",
         size: "default",
      },
   }
);

/**
 * IconButton component interface
 */
export interface IconButtonProps
   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof iconButtonVariants> {
   asChild?: boolean;
   isLoading?: boolean;
   leftIcon?: React.ReactNode;
   rightIcon?: React.ReactNode;
   iconSize?: "sm" | "md" | "lg";
}

/**
 * IconButton component specifically designed for buttons with icons
 * Provides perfect alignment and spacing for icons and text
 */
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
   (
      {
         className,
         variant,
         size,
         asChild = false,
         isLoading,
         leftIcon,
         rightIcon,
         iconSize = "md",
         children,
         disabled,
         ...props
      },
      ref
   ) => {
      const Comp = asChild ? "span" : "button";

      // Icon size classes based on iconSize prop
      const iconSizeClasses = {
         sm: "h-3 w-3",
         md: "h-4 w-4",
         lg: "h-5 w-5",
      };

      const iconClassName = iconSizeClasses[iconSize];

      const renderIcon = (icon: React.ReactNode) => {
         if (!icon) return null;

         // If it's already a React element with className, clone it with additional classes
         if (React.isValidElement(icon)) {
            const existingClassName =
               (icon.props as { className?: string })?.className || "";
            return React.cloneElement(
               icon as React.ReactElement<{ className?: string }>,
               {
                  className: cn(
                     iconClassName,
                     "flex-shrink-0",
                     existingClassName
                  ),
               }
            );
         }

         // Otherwise wrap it in a span with proper sizing
         return (
            <span
               className={cn(
                  iconClassName,
                  "flex-shrink-0 inline-flex items-center justify-center"
               )}
            >
               {icon}
            </span>
         );
      };

      return (
         <Comp
            className={cn(iconButtonVariants({ variant, size, className }))}
            ref={ref}
            disabled={disabled || isLoading}
            aria-busy={isLoading}
            {...props}
         >
            {isLoading && (
               <svg
                  className={cn(iconClassName, "animate-spin flex-shrink-0")}
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  aria-hidden='true'
               >
                  <circle
                     className='opacity-25'
                     cx='12'
                     cy='12'
                     r='10'
                     stroke='currentColor'
                     strokeWidth='4'
                  />
                  <path
                     className='opacity-75'
                     fill='currentColor'
                     d='m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  />
               </svg>
            )}

            {!isLoading && leftIcon && renderIcon(leftIcon)}

            {children && (
               <span className='flex-shrink-0 leading-none'>{children}</span>
            )}

            {!isLoading && rightIcon && renderIcon(rightIcon)}
         </Comp>
      );
   }
);

IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
