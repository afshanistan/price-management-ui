import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useIsPresent } from 'motion/react'
import { duration, ease } from '../../../styles/motion'
import { Button } from '../Button'
import './Toast.css'

export interface ToastMessage {
  /** Changes for every new toast: a new removal replaces the toast. */
  id: string | number
  /** "Cargill removed". */
  message: string
  /** "Undo". */
  actionLabel?: string
  onAction?: () => void
}

export interface ToastRegionProps {
  /** The toast to show; null hides it. One at a time. */
  toast: ToastMessage | null
  /** Called when the toast times out (or after its action). */
  onDismiss: () => void
  /** Auto-dismiss, ms. Paused while hovered or focused. */
  timeout?: number
  className?: string
}

/*
  A simple toast (visual design to come from Figma: docs/open-questions.md, "Toast needs Figma design").
  The region is always mounted and polite (role="status"), so each new message is announced once;
  the toast itself enters by sliding up 8px and fading (base, ease-out) and exits by fading.
  No close button: it dismisses after the timeout, which pauses on hover and focus.
*/
export function ToastRegion({ toast, onDismiss, timeout = 5000, className }: ToastRegionProps) {
  return (
    <div role="status" className={className ? `toast-region ${className}` : 'toast-region'}>
      {/* popLayout: a replaced toast fades out on top, without pushing the new one aside. */}
      <AnimatePresence mode="popLayout">
        {toast && <Toast key={toast.id} toast={toast} onDismiss={onDismiss} timeout={timeout} />}
      </AnimatePresence>
    </div>
  )
}

function Toast({ toast, onDismiss, timeout }: { toast: ToastMessage; onDismiss: () => void; timeout: number }) {
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const remaining = useRef(timeout)
  const paused = hovered || focused
  // Once it starts leaving, a toast can't be pressed, focused or announced: only the newest one acts.
  const isPresent = useIsPresent()
  // The parent may pass a new function each render; the timer only cares about the latest one.
  const dismiss = useRef(onDismiss)
  useEffect(() => {
    dismiss.current = onDismiss
  })

  // Count down while not paused; keep what's left when paused, so the timer resumes, not restarts.
  useEffect(() => {
    if (paused) return
    const started = performance.now()
    const timer = window.setTimeout(() => dismiss.current(), remaining.current)
    return () => {
      window.clearTimeout(timer)
      remaining.current = Math.max(0, remaining.current - (performance.now() - started))
    }
  }, [paused])

  return (
    <motion.div
      className="toast"
      inert={!isPresent}
      aria-hidden={!isPresent || undefined}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0, transition: { duration: duration.base, ease: ease.out } }}
      exit={{ opacity: 0, transition: { duration: duration.layout, ease: ease.in } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setFocused(false)
      }}
    >
      <span className="toast__message type-body-md">{toast.message}</span>
      {toast.actionLabel && toast.onAction && (
        <Button hierarchy="tertiary" size="xsmall" onPress={toast.onAction} className="toast__action">
          {toast.actionLabel}
        </Button>
      )}
      {/* Countdown: a line that shrinks over the timeout and pauses with the timer. Decorative. */}
      <span
        className="toast__countdown"
        aria-hidden="true"
        // Inline style: the timeout and paused state, not design values.
        style={{ animationDuration: `${timeout}ms`, animationPlayState: paused ? 'paused' : 'running' }}
      />
    </motion.div>
  )
}
