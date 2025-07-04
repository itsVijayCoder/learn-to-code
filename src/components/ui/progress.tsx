import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Progress component props
 */
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  showValue?: boolean
  variant?: 'default' | 'success' | 'warning' | 'error' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

/**
 * Progress component for displaying completion status
 */
const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ 
    className, 
    value = 0, 
    max = 100, 
    showValue = false, 
    variant = 'default',
    size = 'md',
    animated = false,
    ...props 
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    const variants = {
      default: 'bg-primary',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      error: 'bg-red-500',
      gradient: 'bg-gradient-to-r from-primary to-accent',
    }

    const sizes = {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4',
    }

    return (
      <div className="w-full">
        <div
          ref={ref}
          className={cn(
            'relative w-full overflow-hidden rounded-full bg-secondary',
            sizes[size],
            className
          )}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label={`Progress: ${percentage.toFixed(0)}%`}
          {...props}
        >
          <div
            className={cn(
              'h-full transition-all duration-300 ease-out',
              variants[variant],
              animated && 'animate-pulse'
            )}
            style={{ width: `${percentage}%` }}
          />
          
          {/* Shimmer effect for animated progress */}
          {animated && (
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
              style={{ width: `${percentage}%` }}
            />
          )}
        </div>
        
        {showValue && (
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>{value}</span>
            <span>{max}</span>
          </div>
        )}
      </div>
    )
  }
)
Progress.displayName = 'Progress'

/**
 * Circular progress component
 */
export interface CircularProgressProps extends React.SVGAttributes<SVGElement> {
  value?: number
  max?: number
  size?: number
  strokeWidth?: number
  showValue?: boolean
  variant?: 'default' | 'success' | 'warning' | 'error'
}

const CircularProgress = React.forwardRef<SVGSVGElement, CircularProgressProps>(
  ({
    className,
    value = 0,
    max = 100,
    size = 120,
    strokeWidth = 8,
    showValue = false,
    variant = 'default',
    ...props
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    const variants = {
      default: 'stroke-primary',
      success: 'stroke-green-500',
      warning: 'stroke-yellow-500',
      error: 'stroke-red-500',
    }

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg
          ref={ref}
          className={cn('transform -rotate-90', className)}
          width={size}
          height={size}
          {...props}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted/30"
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={cn('transition-all duration-500 ease-out', variants[variant])}
          />
        </svg>
        
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium">
              {percentage.toFixed(0)}%
            </span>
          </div>
        )}
      </div>
    )
  }
)
CircularProgress.displayName = 'CircularProgress'

export { Progress, CircularProgress }
