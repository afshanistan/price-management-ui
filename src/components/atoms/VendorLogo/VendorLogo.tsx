import type { CSSProperties } from 'react'
import type { VendorLogoFiles } from '../../../data/vendors'
import './VendorLogo.css'

/** Figma's Content property: Wordmark | Mono logo | Brand logo. */
export type VendorLogoContent = 'wordmark' | 'mono' | 'brand'

export interface VendorLogoProps {
  /** Full vendor name. The accessible name when the logo stands alone. */
  vendor: string
  /** Text in the tile ("CGL"): the fallback when the vendor has no logo file for this content. */
  wordmark: string
  /**
   * wordmark = text only. mono = single-color logo in the tile's ink (text-subtle; white on teal).
   * brand = brand-color logo, on a white surface-card tile only. Falls back to the wordmark
   * when the vendor has no file for it. Brand colors are content, not UI color roles.
   */
  content?: VendorLogoContent
  /** The vendor's logo files (src/data/mockVendors.ts). */
  logo?: VendorLogoFiles
  /** Set by the parent row: teal tile, white ink. Not used with brand. */
  isSelected?: boolean
  /** True when the logo stands alone. Inside a row or card that names the vendor, it's decorative. */
  isStandalone?: boolean
  className?: string
}

export function VendorLogo({
  vendor,
  wordmark,
  content = 'wordmark',
  logo,
  isSelected = false,
  isStandalone = false,
  className,
}: VendorLogoProps) {
  const classes = ['vendor-logo', className].filter(Boolean).join(' ')
  const src = content === 'mono' ? logo?.mono : content === 'brand' ? logo?.color : undefined

  return (
    <span
      className={classes}
      // The tile follows the requested content, so a brand tile stays white even when it falls back to the wordmark.
      data-content={content}
      data-selected={(isSelected && content !== 'brand') || undefined}
      {...(isStandalone ? { role: 'img', 'aria-label': vendor } : { 'aria-hidden': true })}
    >
      {!src ? (
        <span className="vendor-logo__wordmark type-label-xs">{wordmark}</span>
      ) : content === 'mono' ? (
        <MonoLogo src={src} className="vendor-logo__art" />
      ) : (
        <img src={src} alt="" className="vendor-logo__art vendor-logo__brand" />
      )}
    </span>
  )
}

/**
 * A single-color logo drawn in currentColor: the SVG is a mask over the ink, so the container sets
 * the color (like Icon). Scaled to fit, never stretched. Also used by the Vendor coverage tile.
 */
export function MonoLogo({ src, className }: { src: string; className?: string }) {
  // Inline style: a file URL, not a design value.
  const style = { '--vendor-logo-src': `url("${src}")` } as CSSProperties
  return <span className={className ? `mono-logo ${className}` : 'mono-logo'} style={style} />
}
