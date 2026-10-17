import './Icon.css'
import type { IconName, IconSize } from './iconNames'

export interface IconProps {
  /** Which icon to draw. */
  name: IconName
  /** Figma "Icon style" mode: Stroke = false, Fill = true. */
  filled?: boolean
  /** Rendered size in px. Drawn on a 24 grid; the SVG scales. */
  size?: IconSize
  /** Only for a meaningful standalone icon. Without it the icon is decorative. */
  'aria-label'?: string
  className?: string
}

// The exported artwork in src/assets/icons is the single source of truth.
// Keep only what's inside each file's <svg> tag; the wrapper is drawn below.
const files = import.meta.glob<string>('../../../assets/icons/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const artwork: Record<string, string> = {}
for (const [path, svg] of Object.entries(files)) {
  const file = path.split('/').pop()!.replace('.svg', '')
  artwork[file] = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
}

export function Icon({ name, filled = false, size = 24, className, ...rest }: IconProps) {
  const label = rest['aria-label']
  const drawing = artwork[filled ? `${name}-filled` : name]

  return (
    <svg
      className={className ? `icon ${className}` : 'icon'}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      focusable="false"
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
      dangerouslySetInnerHTML={{ __html: drawing }}
    />
  )
}
