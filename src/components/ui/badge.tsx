import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Badge variants
 */
const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground border-border',
        success: 'border-transparent bg-green-500 text-white hover:bg-green-500/80',
        warning: 'border-transparent bg-yellow-500 text-white hover:bg-yellow-500/80',
        info: 'border-transparent bg-blue-500 text-white hover:bg-blue-500/80',
        glass: 'glass-effect text-foreground border-transparent',
      },
      size: {
        default: 'text-xs px-2.5 py-0.5',
        sm: 'text-xs px-2 py-0.5',
        lg: 'text-sm px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

/**
 * Badge props interface
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

/**
 * Badge component for status indicators and labels
 */
function Badge({ className, variant, size, leftIcon, rightIcon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {leftIcon && <span className="mr-1">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-1">{rightIcon}</span>}
    </div>
  )
}

export { Badge, badgeVariants }
