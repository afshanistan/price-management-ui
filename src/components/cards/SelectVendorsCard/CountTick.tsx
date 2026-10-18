import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { duration, ease } from '../../../styles/motion'

/*
  A number that ticks when it changes: the new value slides in (up when it grows, down when it
  shrinks) as the old one slides out, over fast. Visual only: the caller keeps the real text for
  screen readers. Under reduced motion only the fade remains.
*/
export function CountTick({ value }: { value: number }) {
  // Which way to tick: remembered from the last value (React's "adjust state during render" pattern).
  const [shown, setShown] = useState({ value, direction: 1 })
  if (shown.value !== value) setShown({ value, direction: value > shown.value ? 1 : -1 })
  const direction = value === shown.value ? shown.direction : value > shown.value ? 1 : -1
  return (
    <span className="count-tick">
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        <motion.span
          key={value}
          className="count-tick__value"
          custom={direction}
          variants={{
            enter: (d: number) => ({ y: `${0.6 * d}em`, opacity: 0 }),
            center: { y: 0, opacity: 1 },
            exit: (d: number) => ({ y: `${-0.6 * d}em`, opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: duration.fast, ease: ease.out }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
