import type { ReactNode } from 'react'
import { Label, RadioGroup, Text } from 'react-aria-components'
import type { PresetOption } from '../../../data/presets'
import { OptionTile } from '../OptionTile'
import './PresetFieldset.css'

export interface PresetFieldsetProps {
  /** "Currency". The radio group's label (the legend), not a heading. */
  title: string
  /** "Choose which currency to use." Describes the group. */
  helper: string
  /** The choices; "none" = No default. Or pass Option tiles as children (Dates preset). */
  options?: PresetOption[]
  /** Controlled. */
  value: string
  onChange: (value: string) => void
  children?: ReactNode
  className?: string
}

/** A step 3 preset: one radio group of Option tiles under a plum top edge. One Tab stop; arrows move the choice. */
export function PresetFieldset({ title, helper, options, value, onChange, children, className }: PresetFieldsetProps) {
  return (
    <RadioGroup value={value} onChange={onChange} className={className ? `preset-fieldset ${className}` : 'preset-fieldset'}>
      <div className="preset-fieldset__heading">
        <Label className="preset-fieldset__title">{title}</Label>
        <Text slot="description" className="preset-fieldset__helper type-body-sm">
          {helper}
        </Text>
      </div>
      <div className="preset-fieldset__options">
        {options?.map((option) => (
          <OptionTile key={option.value} value={option.value} label={option.label} description={option.description} layout={option.layout} />
        ))}
        {children}
      </div>
    </RadioGroup>
  )
}
