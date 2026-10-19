import { useState } from 'react'
import type { CalendarDate } from '@internationalized/date'
import { currencyOptions, pricingModelOptions, type GlobalPresetsValue } from '../../../data/presets'
import { CardHeader } from '../../molecules/CardHeader'
import { DatesPreset } from '../../molecules/DatesPreset'
import { PresetFieldset } from '../../molecules/PresetFieldset'
import './GlobalPresetsCard.css'

export interface GlobalPresetsCardProps {
  /** Controlled by the app (Review needs it). */
  value: GlobalPresetsValue
  onChange: (value: GlobalPresetsValue) => void
  /** Passed to the Dates preset; stories freeze it. */
  today: CalendarDate
  className?: string
}

/*
  Step 3: three optional presets. The step is optional, so Next is never blocked.
  How many are set (Review's "1 of 3") is presetsSetCount() in src/data/presets.ts.
*/
export function GlobalPresetsCard({ value, onChange, today, className }: GlobalPresetsCardProps) {
  const [announcement, setAnnouncement] = useState('')

  return (
    <div className={className ? `global-presets-card ${className}` : 'global-presets-card'}>
      <CardHeader title="Add pricing defaults" pictogram="presets" suffix="(optional)" />
      {/* Tab order: Effective date → calendar button → Currency → Pricing model. */}
      <div className="global-presets-card__grid">
        <DatesPreset
          value={value.effectiveDate}
          onChange={(effectiveDate) => onChange({ ...value, effectiveDate })}
          today={today}
          onAnnounce={setAnnouncement}
        />
        <PresetFieldset
          title="Currency"
          helper="Choose which currency to use."
          options={currencyOptions}
          value={value.currency}
          onChange={(currency) => onChange({ ...value, currency })}
        />
        <PresetFieldset
          title="Pricing model"
          helper="Choose how prices are calculated."
          options={pricingModelOptions}
          value={value.pricingModel}
          onChange={(pricingModel) => onChange({ ...value, pricingModel })}
        />
      </div>
      {/* Polite live region: "Effective date set to October 28, 2026". */}
      <div role="status" className="visually-hidden">
        {announcement}
      </div>
    </div>
  )
}
