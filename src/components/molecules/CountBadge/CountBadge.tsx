import { useEffect, useRef, useState } from 'react'
import './CountBadge.css'

export type CountBadgeStatus = 'todo' | 'complete'

export interface CountBadgeProps {
  status: CountBadgeStatus
  children: number
  /** "16 brands selected". */
  'aria-label': string
  className?: string
}

/** A count pill. Citron (complete) is never alone: it always holds the number. */
export function CountBadge({ status, children, className, ...rest }: CountBadgeProps) {
  // A small pop when the number changes (not on first render); off with reduced motion.
  const [pop, setPop] = useState(false)
  const previous = useRef(children)
  useEffect(() => {
    if (previous.current === children) return
    previous.current = children
    setPop(true)
    const timer = setTimeout(() => setPop(false), 150)
    return () => clearTimeout(timer)
  }, [children])

  return (
    <span
      role="img"
      {...rest}
      className={['count-badge', `count-badge--${status}`, 'type-label-lg', className].filter(Boolean).join(' ')}
      data-pop={pop || undefined}
    >
      {children}
    </span>
  )
}
