import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface UseCountUpProps {
  target: number
  duration?: number
  start?: number
  suffix?: string
  prefix?: string
}

export function useCountUp({
  target,
  duration = 2,
  start = 0,
  suffix = '',
  prefix = '',
}: UseCountUpProps) {
  const [count, setCount] = useState(start)
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  useEffect(() => {
    if (!inView) return

    const prefersReducedMotion =
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false

    if (prefersReducedMotion) {
      setCount(target)
      return
    }

    const steps = 60
    const stepDuration = (duration * 1000) / steps
    const increment = (target - start) / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      setCount(Math.floor(start + increment * currentStep))
      if (currentStep >= steps) {
        setCount(target)
        clearInterval(interval)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [inView, target, duration, start])

  return {
    ref,
    displayValue: `${prefix}${count.toLocaleString()}${suffix}`,
  }
}
