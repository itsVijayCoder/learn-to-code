import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button variants using CVA for consistent styling
 */
const buttonVariants = cva(
   "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
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
 * Button component interface
 */
export interface ButtonProps
   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariants> {
   asChild?: boolean;
   isLoading?: boolean;
   leftIcon?: React.ReactNode;
   rightIcon?: React.ReactNode;
}

/**
 * Button component with multiple variants and accessibility features
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
   (
      {
         className,
         variant,
         size,
         asChild = false,
         isLoading,
         leftIcon,
         rightIcon,
         children,
         disabled,
         ...props
      },
      ref
   ) => {
      const Comp = asChild ? "span" : "button";

      return (
         <Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            disabled={disabled || isLoading}
            aria-busy={isLoading}
            {...props}
         >
            {isLoading && (
               <svg
                  className='mr-2 h-4 w-4 animate-spin'
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
            {!isLoading && leftIcon && <span className='mr-2'>{leftIcon}</span>}
            {children}
            {!isLoading && rightIcon && (
               <span className='ml-2'>{rightIcon}</span>
            )}
         </Comp>
      );
   }
);
Button.displayName = "Button";

export { Button, buttonVariants };
