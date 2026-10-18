import './Radio.css'

export interface RadioCircleProps {
  checked?: boolean
  /** Forces Hover for the "All states" story only. In an Option tile, hover comes from the tile. */
  'data-state'?: 'hover'
  className?: string
}

/*
  The visual circle only. The real control is the React Aria Radio inside Option tile
  (a visually hidden native radio), so the circle is decorative.
*/
export function RadioCircle({ checked = false, 'data-state': state, className }: RadioCircleProps) {
  return (
    <span
      className={className ? `radio-circle ${className}` : 'radio-circle'}
      data-checked={checked || undefined}
      data-state={state}
      aria-hidden="true"
    />
  )
}
