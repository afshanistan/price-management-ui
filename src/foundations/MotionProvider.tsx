import type { ReactNode } from 'react'
import { MotionConfig } from 'motion/react'
import { useReducedMotionSetting } from './useReducedMotionSetting'

/*
  Reduced motion for the Motion library, from either switch: the OS setting, or Storybook's Motion
  toolbar (data-motion="reduced" on <html>, the same switch motion.css reads). Motion's own
  reducedMotion="user" only hears the OS, so the toolbar couldn't preview it.
  Under reduced motion Motion drops transforms and layout glides and keeps opacity.
*/
export function MotionProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotionSetting()
  return <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>{children}</MotionConfig>
}
