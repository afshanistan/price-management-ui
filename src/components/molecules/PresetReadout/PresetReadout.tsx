import './PresetReadout.css'

export interface PresetReadoutProps {
  /** "Effective date". */
  label: string
  /** null shows "No default", in subtle text. */
  value: string | null
  className?: string
}

/** One preset in Review's strip: a <dt> / <dd> pair, so the strip is a description list (<dl>). */
export function PresetReadout({ label, value, className }: PresetReadoutProps) {
  return (
    <div className={className ? `preset-readout ${className}` : 'preset-readout'}>
      <dt className="preset-readout__label type-body-sm">{label}</dt>
      <dd className="preset-readout__value" data-empty={value === null || undefined}>
        {value ?? 'No default'}
      </dd>
    </div>
  )
}
