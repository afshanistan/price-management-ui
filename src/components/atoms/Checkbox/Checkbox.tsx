import { Checkbox as AriaCheckbox, type CheckboxProps as AriaCheckboxProps } from 'react-aria-components'
import './Checkbox.css'

export type CheckboxChecked = boolean | 'mixed'

export interface CheckboxBoxProps {
  checked?: CheckboxChecked
  /** Forces Hover for the "All states" story only. Inside a Result row, hover comes from the row. */
  'data-state'?: 'hover'
  className?: string
}

/*
  The visual box only, shared by both uses (the styles live in one place):
  - inside a multi Result row, as decoration (the row is the option and carries aria-selected);
  - inside Checkbox, the real select-all control.
*/
export function CheckboxBox({ checked = false, 'data-state': state, className }: CheckboxBoxProps) {
  return (
    <span
      className={className ? `checkbox-box ${className}` : 'checkbox-box'}
      data-checked={checked === true || undefined}
      data-mixed={checked === 'mixed' || undefined}
      data-state={state}
      aria-hidden="true"
    >
      {/* Check 9×7 / dash 8, 2px strokes. Not in the icon set. pathLength drives the draw-in. */}
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="checkbox-box__glyph">
        {checked === 'mixed' ? (
          <path d="M1 4h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" pathLength={1} />
        ) : (
          <path d="M1 4.2 3.7 6.8 9 1.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
        )}
      </svg>
    </span>
  )
}

export interface CheckboxProps extends Omit<AriaCheckboxProps, 'children' | 'className' | 'style'> {
  /** Required: names the action, e.g. "Select all Cargill brands" / "Select 2 matches". */
  'aria-label': string
  className?: string
}

/** The real, focusable checkbox: select all in a Group header. Mixed = isIndeterminate (aria-checked="mixed"). */
export function Checkbox({ className, ...rest }: CheckboxProps) {
  return (
    <AriaCheckbox {...rest} className={className ? `checkbox ${className}` : 'checkbox'}>
      {({ isSelected, isIndeterminate }) => <CheckboxBox checked={isIndeterminate ? 'mixed' : isSelected} />}
    </AriaCheckbox>
  )
}
