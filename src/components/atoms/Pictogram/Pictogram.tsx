import './Pictogram.css'

export type PictogramType = 'vendor' | 'brand' | 'presets' | 'review' | 'placeholder'
export type PictogramSize = 20 | 24 | 40

export interface PictogramProps {
  type: PictogramType
  /** 20 in Review's section headers; 24 in Empty selection and the 32 Icon tile; 40 in the Card header's 48 tile. */
  size?: PictogramSize
  className?: string
}

export const pictogramTypes: PictogramType[] = ['vendor', 'brand', 'presets', 'review', 'placeholder']

// The exported artwork in src/assets/pictograms is the single source of truth.
// Keep only the drawing inside each file's <svg> tag (and drop the export's <metadata>).
const files = import.meta.glob<string>('../../../assets/pictograms/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const artwork: Record<string, string> = {}
for (const [path, svg] of Object.entries(files)) {
  const file = path.split('/').pop()!.replace('.svg', '')
  artwork[file] = svg
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/<metadata>[\s\S]*?<\/metadata>/g, '')
}

/** Always decorative: the text next to it carries the meaning. One drawing, always filled. */
export function Pictogram({ type, size = 24, className }: PictogramProps) {
  return (
    <svg
      className={className ? `pictogram ${className}` : 'pictogram'}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      focusable="false"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: artwork[type] }}
    />
  )
}
