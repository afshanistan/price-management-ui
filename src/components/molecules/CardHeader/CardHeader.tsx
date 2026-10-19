import type { PictogramType } from '../../atoms/Pictogram'
import { IconTile } from '../IconTile'
import './CardHeader.css'

export interface CardHeaderProps {
  /** The page's only H1. */
  title: string
  /** For the Icon tile. */
  pictogram: PictogramType
  /** Omit to hide (Figma "Show description"). */
  description?: string
  /**
   * e.g. "(optional)" on step 3: part of the title line, in the title's size but regular weight and
   * subtle text, so it can't get lost (Oct 19; replaced the Optional tag, Figma "Show tag").
   */
  suffix?: string
  className?: string
}

export function CardHeader({ title, pictogram, description, suffix, className }: CardHeaderProps) {
  return (
    <div className={className ? `card-header ${className}` : 'card-header'}>
      <IconTile pictogram={pictogram} size={48} />
      <div className="card-header__text">
        {/* Focusable by script only: the wizard moves focus here on a step change, so it's announced. */}
        <h1 tabIndex={-1} className="card-header__title">
          {title}
          {/* Reads "Add pricing defaults (optional)". */}
          {suffix && <span className="card-header__suffix">{suffix}</span>}
        </h1>
        {description && <p className="card-header__description">{description}</p>}
      </div>
    </div>
  )
}
