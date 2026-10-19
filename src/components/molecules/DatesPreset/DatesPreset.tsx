import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import type { CalendarDate } from '@internationalized/date'
import { decideLaterOption, formatLong, formatShort, nextMonth, nextQuarter, type DateSource, type DatesValue } from '../../../data/presets'
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
  Effective date: the preset shell plus the Date picker (no typed input).
  Step 3 design review (Oct 19):
  - The date leads ("Nov 1, 2026", described "Next month"): it's the value. Next month / Next quarter are
    relative while you build and fixed once picked (saved in value.fixed).
  - Custom date reads "Select a date" until a date is confirmed, then the latest confirmed date.
  - Clicking the Custom date tile always opens the picker (also when coming back to a remembered date).
    Arrowing onto it only selects it (no surprise popup, WCAG 3.2.2); Enter or Space opens it, as does
    the calendar button.
  - OK commits. Cancel keeps what was there; if no custom date was ever confirmed, the selection goes back
    to the option before, and so does focus, so the Custom tile doesn't look chosen.
*/
export function DatesPreset({ value, onChange, today, onAnnounce, className }: DatesPresetProps) {
  const [isOpen, setOpen] = useState(false)
  const customTile = useRef<HTMLDivElement>(null)
  // The whole value before Custom date was chosen: where Cancel goes back to when no date was ever confirmed.
  const revertTo = useRef<DatesValue | null>(null)

  function choose(source: string) {
    const next = source as DateSource
    if (next === 'custom') {
      if (value.source !== 'custom') revertTo.current = value
      onChange({ source: 'custom', date: value.date })
      return
    }
    // Relative while building, fixed once chosen.
    const fixed = next === 'next-month' ? nextMonth(today) : next === 'next-quarter' ? nextQuarter(today) : null
    onChange({ source: next, date: value.date, fixed })
  }

  // Focus a tile's radio once the picker has gone (its own focus restore runs as it closes).
  function focusTile(source: DateSource) {
    const group = customTile.current?.closest('[role="radiogroup"]')
    let frames = 0
    const tick = () => {
      if (document.querySelector('.date-picker') && frames++ < 30) requestAnimationFrame(tick)
      else group?.querySelector<HTMLInputElement>(`input[value="${source}"]`)?.focus()
    }
    requestAnimationFrame(tick)
  }

  function confirm(date: CalendarDate) {
    revertTo.current = null
    setOpen(false)
    onChange({ source: 'custom', date })
    onAnnounce?.(`Effective date set to ${formatLong(date)}`)
    focusTile('custom')
  }

  function cancel() {
    setOpen(false)
    const previous = revertTo.current
    revertTo.current = null
    // No date was ever confirmed: back to the option selected before, and focus goes with it.
    if (value.source === 'custom' && !value.date && previous) {
      onChange(previous)
      focusTile(previous.source)
    }
  }

  // A click on the Custom date tile (not its calendar button) opens the picker, selected or not.
  function openOnClick(event: PointerEvent) {
    if ((event.target as HTMLElement).closest('.option-tile__action')) return
    setOpen(true)
  }

  // Keyboard: Enter or Space on the Custom date radio opens it; arrows only select.
  function openOnKey(event: KeyboardEvent) {
    if ((event.key === 'Enter' || event.key === ' ') && (event.target as HTMLElement).matches('input[type="radio"]')) {
      if (value.source !== 'custom') choose('custom')
      setOpen(true)
    }
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
        <OptionTile value="none" label={decideLaterOption.label} description={decideLaterOption.description} layout="inline" />
        <OptionTile value="next-month" label={formatShort(nextMonth(today))} description="Next month" layout="inline" />
        <OptionTile value="next-quarter" label={formatShort(nextQuarter(today))} description="Next quarter" layout="inline" />
        <div onPointerUp={openOnClick} onKeyDownCapture={openOnKey}>
          <OptionTile
            value="custom"
            label={value.date ? formatShort(value.date) : 'Select a date'}
            isPlaceholder={!value.date}
            description="Custom date"
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
