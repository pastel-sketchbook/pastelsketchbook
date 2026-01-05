import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  direction?: 'left' | 'right' | 'up' | 'down' | 'none'
  delay?: number
  duration?: number
  staggerChildren?: boolean
  staggerDelay?: number
  className?: string
}

/**
 * ScrollReveal component that triggers animations when element enters viewport
 * Respects prefers-reduced-motion for accessibility
 */
export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  staggerChildren = false,
  staggerDelay = 0.1,
  className = '',
}: ScrollRevealProps) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  // Check if user prefers reduced motion
  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

  const getInitialPosition = () => {
    if (prefersReducedMotion) return {}
    switch (direction) {
      case 'left':
        return { x: -50, opacity: 0 }
      case 'right':
        return { x: 50, opacity: 0 }
      case 'down':
        return { y: -50, opacity: 0 }
      case 'up':
        return { y: 50, opacity: 0 }
      default:
        return { opacity: 0 }
    }
  }

  const animateValues = prefersReducedMotion
    ? { x: 0, y: 0, opacity: 1 }
    : { x: 0, y: 0, opacity: 1 }

  const containerVariants = staggerChildren
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }
    : {}

  const childVariants = staggerChildren
    ? {
        hidden: getInitialPosition(),
        visible: {
          ...animateValues,
          transition: { duration: prefersReducedMotion ? 0 : duration },
        },
      }
    : {}

  if (staggerChildren) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className={className}
      >
        {Array.isArray(children)
          ? children.map((child, i) => (
              <motion.div key={i} variants={childVariants}>
                {child}
              </motion.div>
            ))
          : children}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={inView ? 'visible' : 'hidden'}
      transition={
        prefersReducedMotion ? { duration: 0 } : { duration, delay }
      }
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal
