import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useIsPresent } from 'motion/react'
import { useReducedMotionSetting } from '../../../foundations/useReducedMotionSetting'
import { duration, ease } from '../../../styles/motion'
import './WizardLayout.css'

export interface WizardLayoutProps {
  /** The Focus header: <MainNavigation variant="focus" />. It renders its own on-brand <header>. */
  header: ReactNode
  /** The progress stepper: <Stepper />. It renders its own <nav aria-label="Progress">. */
  stepper: ReactNode
  /** The step's card. The layout fixes it at 644 and its content scrolls inside; it never grows. */
  children: ReactNode
  /**
   * fixed (default): the card fills the 644 frame (list steps). hug: the card is only as tall as its
   * content, at the top of the frame (step 3, Oct 19). The frame keeps its 644 either way, so the footer
   * never moves between steps.
   */
  cardFit?: 'fixed' | 'hug'
  /**
   * Changes when the step changes: the old content exits and the new one enters (stepper review B).
   * Omit for a single static card.
   */
  stepKey?: string | number
  /** Which way the step change goes: 1 = forward (Next), -1 = back (Back, Edit). */
  direction?: 1 | -1
  /** The wizard footer: <WizardNavigation />. It renders its own <footer>, outside <main>. */
  footer: ReactNode
  /** Optional page-level toast (<ToastRegion />), placed over the bottom of the card. */
  toast?: ReactNode
}

/* How far content travels on a step change. */
const travel = 24

/*
  The Template Builder page (Final Comps 01a–04, code-backlog "Landmarks + headings"):
  Focus header 56 → plum stage with the stepper band 80 → <main> with the fixed 644 card
  in the 960 column → 24 → wizard footer. The layout only places things; the slots own their landmarks.

  Step transition (stepper review, Oct 19): the card surface stays put and only its content moves.
  The old content fades and slides 24px toward where you came from (base, ease-in); the new one comes
  in from the travel side (300ms, ease-out) while its groups fade in one page stagger apart (motion.css).
  The surface eases its height when step 3's hugging card comes or goes (layout, ease-in-out), and the
  footer never moves. Focus moves to the new card's heading once the old one has left. Runs alongside the
  stepper's fuse and never waits for it. Reduced motion: fades only, at fast.
*/
export function WizardLayout({ header, stepper, children, footer, toast, cardFit = 'fixed', stepKey, direction = 1 }: WizardLayoutProps) {
  const reduced = useReducedMotionSetting()
  const frameRef = useRef<HTMLDivElement>(null)
  const [frameHeight, setFrameHeight] = useState<number | null>(null)
  const [contentHeight, setContentHeight] = useState<number | null>(null)
  // After the first step change, entrances are step arrivals (fade, page stagger), not the page load.
  const [arrived, setArrived] = useState(false)
  const [firstKey] = useState(stepKey)
  if (!arrived && stepKey !== firstKey) setArrived(true)

  // The surface follows the card: the whole frame when fixed, the arriving content's height when it hugs.
  useLayoutEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const measure = () => setFrameHeight(frame.clientHeight)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])
  const surfaceHeight = cardFit === 'hug' ? contentHeight : frameHeight

  return (
    <div className="wizard-layout">
      {header}
      {/* The plum stage: carries the stepper band, and its plum runs on behind the top of the card. */}
      <div className="wizard-layout__stage" data-mode="on-brand">
        {stepper}
      </div>
      <main className="wizard-layout__main">
        <div ref={frameRef} className="wizard-layout__card" data-fit={cardFit} data-arrival={arrived ? 'step' : undefined}>
          {/* The card's surface (border, fill, shadow): drawn once, so it stays put while content moves. */}
          <motion.div
            className="wizard-layout__surface"
            initial={false}
            animate={surfaceHeight === null ? undefined : { height: surfaceHeight }}
            transition={{ duration: reduced ? 0 : duration.layout, ease: ease.inOut }}
          />
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <StepContent key={stepKey} onHeight={setContentHeight} reduced={reduced} focusHeading={arrived}>
              {children}
            </StepContent>
          </AnimatePresence>
          {toast && <div className="wizard-layout__toast">{toast}</div>}
        </div>
      </main>
      <div className="wizard-layout__footer">{footer}</div>
    </div>
  )
}

/*
  One step's content. Leaving, it can't be clicked or focused. Arriving after a step change (not the
  first load), it moves focus to its heading so the new step is announced.
*/
function StepContent({ onHeight, reduced, focusHeading, children }: { onHeight: (height: number) => void; reduced: boolean; focusHeading: boolean; children: ReactNode }) {
  const isPresent = useIsPresent()
  const ownRef = useRef<HTMLDivElement>(null)
  // Report this step's height while it's the one on screen (the surface hugs it on step 3).
  useLayoutEffect(() => {
    const element = ownRef.current
    if (!element || !isPresent) return
    const measure = () => onHeight(element.offsetHeight)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [isPresent, onHeight])
  useEffect(() => {
    if (focusHeading) ownRef.current?.querySelector<HTMLElement>('h1')?.focus()
    // Once, when this step's content arrives.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <motion.div
      ref={ownRef}
      className="wizard-layout__content"
      inert={!isPresent}
      variants={{
        enter: (d: number) => ({ opacity: 0, x: reduced ? 0 : travel * d }),
        center: { opacity: 1, x: 0, transition: { duration: reduced ? duration.fast : duration.page, ease: ease.out } },
        exit: (d: number) => ({ opacity: 0, x: reduced ? 0 : -travel * d, transition: { duration: reduced ? duration.fast : duration.base, ease: ease.in } }),
      }}
      initial="enter"
      animate="center"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}
