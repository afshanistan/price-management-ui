import { useRef, useState } from 'react'
import type { CalendarDate } from '@internationalized/date'
import { formatLong, formatShort, nextMonth, nextQuarter, type DateSource, type DatesValue } from '../../../data/presets'
import { DatePicker } from '../../organisms/DatePicker'
import { IconButton } from '../IconButton'
import { OptionTile } from '../OptionTile'
import { PresetFieldset } from '../PresetFieldset'

export interface DatesPresetProps {
  /** Controlled: the chosen source, and the confirmed custom date (remembered while another option is selected). */
  value: DatesValue
  onChange: (value: DatesValue) => void
  /** Injected so stories and tests can freeze the date. Preset dates are computed from it. */
  today: CalendarDate
  /** The card's live region: "Effective date set to October 28, 2026". */
  onAnnounce?: (message: string) => void
  className?: string
}

/*
  Effective date: the preset shell plus the Date picker (the later "Custom date flow"; no typed input).
  State is derived: closed / open / confirmed.
*/
export function DatesPreset({ value, onChange, today, onAnnounce, className }: DatesPresetProps) {
  const [isOpen, setOpen] = useState(false)
  const customTile = useRef<HTMLDivElement>(null)
  // Where Cancel goes back to when Custom date was chosen but no date was ever confirmed.
  const revertTo = useRef<DateSource | null>(null)

  function choose(source: string) {
    const next = source as DateSource
    if (next === 'custom' && !value.date) {
      // Choosing Custom date with no date yet selects it and opens the picker.
      revertTo.current = value.source
      onChange({ source: 'custom', date: null })
      setOpen(true)
      return
    }
    // A confirmed custom date is remembered, so switching back shows it without reopening.
    onChange({ source: next, date: value.date })
  }

  function confirm(date: CalendarDate) {
    revertTo.current = null
    setOpen(false)
    onChange({ source: 'custom', date })
    onAnnounce?.(`Effective date set to ${formatLong(date)}`)
  }

  function cancel() {
    setOpen(false)
    // No date was ever confirmed: back to the option selected before.
    if (!value.date && revertTo.current) onChange({ source: revertTo.current, date: null })
    revertTo.current = null
  }

  return (
    <>
      <PresetFieldset
        title="Effective date"
        helper="Choose when prices take effect."
        value={value.source}
        onChange={choose}
        className={className}
      >
        <OptionTile value="none" label="No default" />
        <OptionTile value="next-month" label="Next month" description={formatShort(nextMonth(today))} layout="inline" />
        <OptionTile value="next-quarter" label="Next quarter" description={formatShort(nextQuarter(today))} layout="inline" />
        {/* Clicking the already-selected Custom date tile reopens the picker (pointer only; the calendar button covers the keyboard). */}
        <div
          onPointerUp={(event) => {
            const onAction = (event.target as HTMLElement).closest('.option-tile__action')
            if (value.source === 'custom' && !onAction) setOpen(true)
          }}
        >
          <OptionTile
            value="custom"
            label="Custom date"
            description={value.date ? formatShort(value.date) : 'Pick a date'}
            layout="inline"
            tileRef={customTile}
            action={<IconButton icon="calendar" aria-label="Choose custom date" onPress={() => setOpen(true)} />}
          />
        </div>
      </PresetFieldset>
      <DatePicker isOpen={isOpen} triggerRef={customTile} value={value.date} today={today} onConfirm={confirm} onCancel={cancel} />
    </>
  )
}
