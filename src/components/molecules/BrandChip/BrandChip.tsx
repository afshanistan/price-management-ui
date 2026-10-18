import { Button as AriaButton } from 'react-aria-components'
import { Icon } from '../../atoms/Icon'
import './BrandChip.css'

export type BrandChipType = 'brand' | 'all'

export interface BrandChipProps {
  /** brand = one brand; all = "All N brands" (a whole vendor, fills the width). */
  type?: BrandChipType
  /** "Truvia" or "All 9 brands". */
  label: string
  /** "Remove Truvia" / "Remove all General Mills brands". */
  removeLabel: string
  onRemove: () => void
  className?: string
}

/** A selected brand in the panel. The chip body never reacts; only the × does (teal, never red). */
export function BrandChip({ type = 'brand', label, removeLabel, onRemove, className }: BrandChipProps) {
  const classes = ['brand-chip', `brand-chip--${type}`, className].filter(Boolean).join(' ')

  return (
    <span className={classes}>
      <span className={`brand-chip__label ${type === 'all' ? 'type-label-sm' : 'type-body-sm'}`} title={label}>
        {label}
      </span>
      <AriaButton className="brand-chip__remove" aria-label={removeLabel} onPress={onRemove}>
        {/* 16 inside the 24 target, as drawn (spec flag 1). */}
        <Icon name="close" size={16} />
      </AriaButton>
    </span>
  )
}
