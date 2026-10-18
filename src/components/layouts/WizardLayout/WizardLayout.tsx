import type { ReactNode } from 'react'
import './WizardLayout.css'

export interface WizardLayoutProps {
  /** The Focus header: <MainNavigation variant="focus" />. It renders its own on-brand <header>. */
  header: ReactNode
  /** The progress stepper: <Stepper />. It renders its own <nav aria-label="Progress">. */
  stepper: ReactNode
  /** The step's card. The layout fixes it at 644 and its content scrolls inside; it never grows. */
  children: ReactNode
  /** The wizard footer: <WizardNavigation />. It renders its own <footer>, outside <main>. */
  footer: ReactNode
}

/*
  The Template Builder page (Final Comps 01a–04, code-backlog "Landmarks + headings"):
  Focus header 56 → plum stage with the stepper band 80 → <main> with the fixed 644 card
  in the 960 column → 24 → wizard footer. The layout only places things; the slots own their landmarks.
*/
export function WizardLayout({ header, stepper, children, footer }: WizardLayoutProps) {
  return (
    <div className="wizard-layout">
      {header}
      {/* The plum stage: carries the stepper band, and its plum runs on behind the top of the card. */}
      <div className="wizard-layout__stage" data-mode="on-brand">
        {stepper}
      </div>
      <main className="wizard-layout__main">
        <div className="wizard-layout__card">{children}</div>
      </main>
      <div className="wizard-layout__footer">{footer}</div>
    </div>
  )
}
