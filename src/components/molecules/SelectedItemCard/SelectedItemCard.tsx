import { VendorLogo } from '../../atoms/VendorLogo'
import { IconButton } from '../IconButton'
import './SelectedItemCard.css'

export interface SelectedItemCardProps {
  /** "Cargill". */
  name: string
  /** ESN, "DEMO-0022". */
  meta: string
  /** For the Vendor logo. */
  wordmark: string
  onRemove: () => void
  className?: string
}

/*
  A chosen vendor. The parent lists cards in <ul aria-labelledby> / <li>, and after a
  removal moves focus to the next card's Remove (or the search) and announces it.
*/
export function SelectedItemCard({ name, meta, wordmark, onRemove, className }: SelectedItemCardProps) {
  return (
    <div className={className ? `selected-item-card ${className}` : 'selected-item-card'}>
      <div className="selected-item-card__identity">
        {/* Always the selected (teal) tile; decorative, the name is in text. */}
        <VendorLogo vendor={name} wordmark={wordmark} size="lg" isSelected />
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
