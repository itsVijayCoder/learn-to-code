import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Skeleton component props
 */
export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'text' | 'circular' | 'rectangular'
  animation?: 'pulse' | 'wave' | 'none'
}

/**
 * Skeleton component for loading states
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'default', animation = 'pulse', ...props }, ref) => {
    const variants = {
      default: 'rounded-md',
      text: 'rounded h-4',
      circular: 'rounded-full aspect-square',
      rectangular: 'rounded-none',
    }

    const animations = {
      pulse: 'animate-pulse',
      wave: 'animate-shimmer',
      none: '',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'bg-muted',
          variants[variant],
          animations[animation],
          className
        )}
        role="status"
        aria-label="Loading..."
        {...props}
      />
    )
  }
)
Skeleton.displayName = 'Skeleton'

/**
 * Text skeleton with multiple lines
 */
export interface TextSkeletonProps {
  lines?: number
  className?: string
  animation?: 'pulse' | 'wave' | 'none'
}

const TextSkeleton = ({ lines = 3, className, animation = 'pulse' }: TextSkeletonProps) => {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          animation={animation}
          className={cn(
            'w-full',
            index === lines - 1 && 'w-3/4' // Last line is shorter
          )}
        />
      ))}
    </div>
  )
}

/**
 * Card skeleton for loading card layouts
 */
export interface CardSkeletonProps {
  className?: string
  showImage?: boolean
  showHeader?: boolean
  showFooter?: boolean
  lines?: number
}

const CardSkeleton = ({ 
  className, 
  showImage = false, 
  showHeader = true, 
  showFooter = false,
  lines = 2 
}: CardSkeletonProps) => {
  return (
    <div className={cn('rounded-xl border bg-card p-6', className)}>
      {showImage && (
        <Skeleton className="mb-4 h-48 w-full rounded-lg" />
      )}
      
      {showHeader && (
        <div className="mb-4 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      )}
      
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <Skeleton
            key={index}
            className={cn(
              'h-4',
              index === lines - 1 ? 'w-2/3' : 'w-full'
            )}
          />
        ))}
      </div>
      
      {showFooter && (
        <div className="mt-4 flex space-x-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-16" />
        </div>
      )}
    </div>
  )
}

/**
 * Avatar skeleton
 */
export interface AvatarSkeletonProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const AvatarSkeleton = ({ size = 'md', className }: AvatarSkeletonProps) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  }

  return (
    <Skeleton
      variant="circular"
      className={cn(sizes[size], className)}
    />
  )
}

export { Skeleton, TextSkeleton, CardSkeleton, AvatarSkeleton }
