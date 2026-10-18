import { useId } from 'react'
import type { IconName } from '../../atoms/Icon'
import { Button } from '../../molecules/Button'
import './WizardNavigation.css'

export interface WizardNavigationProps {
  /** Omit on step 1. The left slot stays, so Next never moves. */
  back?: { label: string; onPress: () => void }
  /** Label names the destination. `icon` defaults to arrow-right; step 4 uses download. */
  next: { label: string; icon?: IconName; onPress: () => void }
  /** Derived from the step's data in the app. False blocks Next and shows the hint. */
  canContinue: boolean
  /** Shown beside the blocked Next: "Add at least one vendor to continue." */
  hint?: string
}

export function WizardNavigation({ back, next, canContinue, hint }: WizardNavigationProps) {
  const hintId = useId()
  const blocked = !canContinue
  const showHint = blocked && Boolean(hint)

  return (
    // Rendered outside <main>.
    <footer className="wizard-navigation">
      {/* The left slot is always there, so Next stays on the right edge. */}
      <div className="wizard-navigation__left">
        {back && (
          <Button size="xlarge" hierarchy="secondary" leadingIcon="arrow-left" onPress={back.onPress}>
            {back.label}
          </Button>
        )}
      </div>
      <div className="wizard-navigation__right">
        {showHint && (
          <p id={hintId} className="wizard-navigation__hint">
            {hint}
          </p>
        )}
        <Button
          size="xlarge"
          hierarchy="primary"
          trailingIcon={next.icon ?? 'arrow-right'}
          // Blocked = aria-disabled, not native disabled: Next stays focusable, so its hint is read.
          aria-disabled={blocked || undefined}
          aria-describedby={showHint ? hintId : undefined}
          // A blocked Next ignores presses.
          onPress={blocked ? undefined : next.onPress}
        >
          {next.label}
        </Button>
      </div>
    </footer>
  )
}
