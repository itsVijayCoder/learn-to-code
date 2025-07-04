'use client'

import { motion } from 'framer-motion'
import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Page transition variants
 */
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
}

const pageTransition = {
  type: 'tween' as const,
  ease: 'anticipate' as const,
  duration: 0.5,
}

/**
 * Page transition wrapper component
 */
interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      className={cn('min-h-screen', className)}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  )
}

/**
 * Modal transition variants
 */
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: 'spring' as const, damping: 25, stiffness: 300 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.2 }
  },
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

/**
 * Modal transition wrapper
 */
interface ModalTransitionProps {
  children: React.ReactNode
  className?: string
  overlayClassName?: string
}

export function ModalTransition({ 
  children, 
  className, 
  overlayClassName 
}: ModalTransitionProps) {
  return (
    <motion.div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center',
        overlayClassName
      )}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={overlayVariants}
    >
      <motion.div
        className={cn('relative', className)}
        variants={modalVariants}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

/**
 * Slide transition variants
 */
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
}

/**
 * Slide transition for carousels and tabs
 */
interface SlideTransitionProps {
  children: React.ReactNode
  direction: number
  className?: string
}

export function SlideTransition({ 
  children, 
  direction, 
  className 
}: SlideTransitionProps) {
  return (
    <motion.div
      key={direction}
      className={className}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Drawer transition for side panels
 */
interface DrawerTransitionProps {
  children: React.ReactNode
  isOpen: boolean
  className?: string
  side?: 'left' | 'right' | 'top' | 'bottom'
}

export function DrawerTransition({ 
  children, 
  isOpen, 
  className,
  side = 'right'
}: DrawerTransitionProps) {
  const getVariants = (direction: string) => {
    switch (direction) {
      case 'left':
        return {
          closed: { x: '-100%' },
          open: { x: 0 },
        }
      case 'right':
        return {
          closed: { x: '100%' },
          open: { x: 0 },
        }
      case 'top':
        return {
          closed: { y: '-100%' },
          open: { y: 0 },
        }
      case 'bottom':
        return {
          closed: { y: '100%' },
          open: { y: 0 },
        }
      default:
        return {
          closed: { x: '100%' },
          open: { x: 0 },
        }
    }
  }

  return (
    <motion.div
      className={className}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={getVariants(side)}
      transition={{ type: 'spring' as const, damping: 25, stiffness: 300 }}
    >
      {children}
    </motion.div>
  )
}
