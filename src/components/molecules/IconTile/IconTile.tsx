import { Pictogram, type PictogramType } from '../../atoms/Pictogram'
import './IconTile.css'

export type IconTileSize = 32 | 48

export interface IconTileProps {
  /** vendor on step 1, brand on step 2, presets on step 3. */
  pictogram: PictogramType
  /** 32 (24 pictogram) or 48 (40 pictogram, Card header). */
  size?: IconTileSize
  className?: string
}

/** A label, not an action: decorative, not interactive. */
export function IconTile({ pictogram, size = 32, className }: IconTileProps) {
  const classes = ['icon-tile', `icon-tile--${size}`, className].filter(Boolean).join(' ')

  return (
    <span className={classes} aria-hidden="true">
      <Pictogram type={pictogram} size={size === 48 ? 40 : 24} />
    </span>
  )
}
