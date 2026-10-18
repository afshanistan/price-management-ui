import './Tag.css'

export interface TagProps {
  /** "Optional". */
  children: string
  className?: string
}

/** A neutral label. Never a status, never interactive. */
export function Tag({ children, className }: TagProps) {
  return <span className={className ? `tag type-label-xs ${className}` : 'tag type-label-xs'}>{children}</span>
}
