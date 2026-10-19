import './PresetReadout.css'

export interface PresetReadoutProps {
  /** "Effective date". */
  label: string
  /** null shows "Decide later" (bold, like a set value) with "Fill in per row" beside it, as on step 3 (step 4 review R13, R15, R17, R21). */
  value: string | null
  className?: string
}

/** One preset in Review's strip: a <dt> / <dd> pair, so the strip is a description list (<dl>). */
export function PresetReadout({ label, value, className }: PresetReadoutProps) {
  return (
    <div className={className ? `preset-readout ${className}` : 'preset-readout'}>
      <dt className="preset-readout__label type-body-sm">{label}</dt>
      {value === null ? (
        <dd className="preset-readout__value" data-empty>
          Decide later
          <span className="preset-readout__hint type-body-sm">Fill in per row</span>
        </dd>
      ) : (
        <dd className="preset-readout__value">{value}</dd>
      )}
    </div>
  )
}
