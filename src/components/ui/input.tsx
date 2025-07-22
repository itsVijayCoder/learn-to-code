import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Input component props
 */
export interface InputProps
   extends React.InputHTMLAttributes<HTMLInputElement> {
   leftIcon?: React.ReactNode;
   rightIcon?: React.ReactNode;
   error?: string;
   variant?: "default" | "ghost" | "glass";
}

/**
 * Input component with icons and error states
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
   (
      {
         className,
         type,
         leftIcon,
         rightIcon,
         error,
         variant = "default",
         ...props
      },
      ref
   ) => {
      const variants = {
         default: "border border-input bg-background",
         ghost: "border-0 bg-transparent",
         glass: "glass-effect border-0",
      };

      const inputElement = (
         <input
            type={type}
            className={cn(
               "flex h-10 w-full rounded-lg px-3 py-2 text-sm transition-colors",
               "file:border-0 file:bg-transparent file:text-sm file:font-medium",
               "placeholder:text-muted-foreground",
               "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
               "disabled:cursor-not-allowed disabled:opacity-50",
               variants[variant],
               error && "border-destructive focus-visible:ring-destructive",
               leftIcon && "pl-10",
               rightIcon && "pr-10",
               className
            )}
            ref={ref}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
         />
      );

      if (leftIcon || rightIcon) {
         return (
            <div className='relative'>
               {leftIcon && (
                  <div className='absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
                     {leftIcon}
                  </div>
               )}
               {inputElement}
               {rightIcon && (
                  <div className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'>
                     {rightIcon}
                  </div>
               )}
               {error && (
                  <p
                     id={`${props.id}-error`}
                     className='mt-1 text-sm text-destructive'
                     role='alert'
                  >
                     {error}
                  </p>
               )}
            </div>
         );
      }

      return (
         <div>
            {inputElement}
            {error && (
               <p
                  id={`${props.id}-error`}
                  className='mt-1 text-sm text-destructive'
                  role='alert'
               >
                  {error}
               </p>
            )}
         </div>
      );
   }
);
Input.displayName = "Input";

export { Input };
