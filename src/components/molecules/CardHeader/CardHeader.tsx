import type { PictogramType } from '../../atoms/Pictogram'
import { IconTile } from '../IconTile'
import { Tag } from '../Tag'
import './CardHeader.css'

export interface CardHeaderProps {
  /** The page's only H1. */
  title: string
  /** For the Icon tile. */
  pictogram: PictogramType
  /** Omit to hide (Figma "Show description"). */
  description?: string
  /** e.g. "Optional" on step 3 (Figma "Show tag"). Reads as part of the H1. */
  tag?: string
  className?: string
}

export function CardHeader({ title, pictogram, description, tag, className }: CardHeaderProps) {
  return (
    <div className={className ? `card-header ${className}` : 'card-header'}>
      <IconTile pictogram={pictogram} size={48} />
      <div className="card-header__text">
        {/* Focusable by script only: the wizard moves focus here on a step change, so it's announced. */}
        <h1 tabIndex={-1} className="card-header__title">
          {title}
          {/* The hidden comma makes it read "Add pricing defaults, optional". */}
          {tag && (
            <>
              <span className="visually-hidden">, </span>
              <Tag>{tag}</Tag>
            </>
          )}
        </h1>
        {description && <p className="card-header__description">{description}</p>}
      </div>
    </div>
  )
}
