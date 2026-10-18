import './VendorLogo.css'

export type VendorLogoSize = 'sm' | 'lg'

export interface VendorLogoProps {
  /** Full vendor name. The accessible name when the logo stands alone. */
  vendor: string
  /** Placeholder text in the tile ("CGL") until real logos exist. */
  wordmark: string
  /** sm = 56×36 (Result row); lg = 80×48 (Selected item card). */
  size?: VendorLogoSize
  /** Set by the parent row or card: teal tile. */
  isSelected?: boolean
  /** True when the logo stands alone. Inside a row or card that names the vendor, it's decorative. */
  isStandalone?: boolean
  className?: string
}

export function VendorLogo({ vendor, wordmark, size = 'sm', isSelected = false, isStandalone = false, className }: VendorLogoProps) {
  const classes = ['vendor-logo', `vendor-logo--${size}`, className].filter(Boolean).join(' ')

  return (
    <span
      className={classes}
      data-selected={isSelected || undefined}
      {...(isStandalone ? { role: 'img', 'aria-label': vendor } : { 'aria-hidden': true })}
    >
      <span className="vendor-logo__wordmark type-label-xs">{wordmark}</span>
    </span>
  )
}
