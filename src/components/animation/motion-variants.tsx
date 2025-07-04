'use client'

import { motion, type Variants } from 'framer-motion'
import * as React from 'react'

/**
 * Common animation variants for consistent motion design
 */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
}

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
}

export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
}

export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
}

export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
}

export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
}

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  },
}

/**
 * Animation wrapper component props
 */
interface AnimateInViewProps {
  children: React.ReactNode
  variants?: Variants
  className?: string
  delay?: number
  once?: boolean
}

/**
 * Component that animates children when they come into view
 */
export function AnimateInView({ 
  children, 
  variants = slideUpVariants, 
  className,
  delay = 0,
  once = true 
}: AnimateInViewProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.3 }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Stagger animation container
 */
interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({ 
  children, 
  className, 
  staggerDelay = 0.1 
}: StaggerContainerProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  )
}

/**
 * Individual stagger item
 */
interface StaggerItemProps {
  children: React.ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={staggerItemVariants}
    >
      {children}
    </motion.div>
  )
}

/**
 * Fade in animation component
 */
interface FadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
}

export function FadeIn({ 
  children, 
  className, 
  delay = 0, 
  duration = 0.3 
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Scale in animation component
 */
interface ScaleInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
}

export function ScaleIn({ 
  children, 
  className, 
  delay = 0, 
  duration = 0.3 
}: ScaleInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Floating animation component
 */
interface FloatingProps {
  children: React.ReactNode
  className?: string
  duration?: number
  yOffset?: number
}

export function Floating({ 
  children, 
  className, 
  duration = 3, 
  yOffset = 10 
}: FloatingProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -yOffset, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}
