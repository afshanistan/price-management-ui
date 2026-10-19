import { useState } from 'react'
import { formatEsn, MIN_LOGO_RATIO, type VendorLogoFiles } from '../../../data/vendors'
import { IconButton } from '../IconButton'
import './SelectedItemCard.css'

export interface SelectedItemCardProps {
  /** "Cargill". */
  name: string
  /** The ESN, the bare number; shown as "ESN-70441642". */
  meta: string
  /** The vendor's logo files. The card shows the brand-color logo; with none (or a tall one), the space stays empty. */
  logo?: VendorLogoFiles
  onRemove: () => void
  className?: string
}

/*
  A chosen vendor (Figma Selected item card 707:705): name and ESN on top beside Remove, the
  brand-color logo below. The parent lists cards in <ul aria-labelledby> / <li>, and after a
  removal moves focus to the next card's Remove (or the search) and announces it.
*/
export function SelectedItemCard({ name, meta, logo, onRemove, className }: SelectedItemCardProps) {
  // Without a measured ratio (e.g. real data later), use the image file's own shape once it loads.
  const [fileRatio, setFileRatio] = useState<number | null>(null)
  const ratio = logo?.ratio ?? fileRatio
  const showLogo = logo && (ratio === null || ratio === undefined || ratio >= MIN_LOGO_RATIO)

  return (
    <div className={className ? `selected-item-card ${className}` : 'selected-item-card'}>
      <div className="selected-item-card__identity">
        <div className="selected-item-card__text">
          <span className="selected-item-card__name type-body-lg-strong" title={name}>{name}</span>
          <span className="selected-item-card__meta type-data-sm">{formatEsn(meta)}</span>
        </div>
        {/* Decorative: the name is in text. No logo, or a tall one → the 28px stays, empty (no wordmark: the name already says it). */}
        <span className="selected-item-card__logo" aria-hidden="true">
          {showLogo && (
            <img
              src={logo.color}
              alt=""
              onLoad={logo.ratio ? undefined : (e) => setFileRatio(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)}
            />
          )}
        </span>
      </div>
      <IconButton
        icon="trash"
        tone="destructive"
        aria-label={`Remove ${name}`}
        onPress={onRemove}
        className="selected-item-card__remove"
      />
    </div>
  )
}
