import { VendorLogo } from '../../atoms/VendorLogo'
import type { VendorLogoFiles } from '../../../data/vendors'
import { IconButton } from '../IconButton'
import './SelectedItemCard.css'

export interface SelectedItemCardProps {
  /** "Cargill". */
  name: string
  /** ESN, "DEMO-0022". */
  meta: string
  /** For the Vendor logo (the fallback when there's no logo file). */
  wordmark: string
  /** The vendor's logo files. The card shows the brand-color logo. */
  logo?: VendorLogoFiles
  onRemove: () => void
  className?: string
}

/*
  A chosen vendor. The parent lists cards in <ul aria-labelledby> / <li>, and after a
  removal moves focus to the next card's Remove (or the search) and announces it.
*/
export function SelectedItemCard({ name, meta, wordmark, logo, onRemove, className }: SelectedItemCardProps) {
  return (
    <div className={className ? `selected-item-card ${className}` : 'selected-item-card'}>
      <div className="selected-item-card__identity">
        {/* Brand-color logo on a white tile (decision log, Oct 18); decorative, the name is in text. */}
        <VendorLogo vendor={name} wordmark={wordmark} content="brand" logo={logo} size="lg" />
        <div className="selected-item-card__text">
          <span className="selected-item-card__name" title={name}>{name}</span>
          <span className="selected-item-card__meta type-data-sm">{meta}</span>
        </div>
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
