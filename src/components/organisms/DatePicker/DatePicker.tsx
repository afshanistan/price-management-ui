import { useState, type RefObject } from 'react'
import type { CalendarDate } from '@internationalized/date'
import { Calendar, CalendarGrid, CalendarGridBody, CalendarGridHeader, CalendarHeaderCell, Dialog, Heading, Popover } from 'react-aria-components'
import { CalendarDay } from '../../atoms/CalendarDay'
import { Button } from '../../molecules/Button'
import { IconButton } from '../../molecules/IconButton'
import './DatePicker.css'

export interface DatePickerProps {
  /** Open / closed is owned by the parent (Dates preset). */
  isOpen: boolean
  /** The Custom date tile: the popover opens below it, at its width. */
  triggerRef: RefObject<HTMLElement | null>
  /** The confirmed custom date, if any: the calendar opens on its month. */
  value: CalendarDate | null
  /** OK. */
  onConfirm: (date: CalendarDate) => void
  /** Cancel, Esc, or a click outside: the draft is thrown away. */
  onCancel: () => void
  /** Injected so stories can freeze the date. */
  today: CalendarDate
  /** First selectable day. Default: tomorrow (past days and today disabled; docs/open-questions.md). */
  minValue?: CalendarDate
}

/*
  A popover calendar anchored to the Custom date tile. The calendar holds a draft:
  OK commits it (disabled until a day is highlighted), Cancel throws it away.
  It renders in a portal, so the card's scrolling body doesn't clip it, and flips above when there's no room.
*/
export function DatePicker({ isOpen, triggerRef, value, onConfirm, onCancel, today, minValue = today.add({ days: 1 }) }: DatePickerProps) {
  const [draft, setDraft] = useState<CalendarDate | null>(value)

  // Every opening starts from the confirmed date (or nothing).
  const [wasOpen, setWasOpen] = useState(isOpen)
  if (isOpen !== wasOpen) {
    setWasOpen(isOpen)
    if (isOpen) setDraft(value)
  }

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={(open) => !open && onCancel()}
      triggerRef={triggerRef}
      // Above the Custom date tile, inside the card, with the tile still showing underneath (Will, Oct 19;
      // Figma 03b had it 4px under the tile). Flips below only when there's no room above.
      placement="top start"
      offset={4}
      shouldFlip
      className="date-picker"
    >
      <Dialog aria-label="Choose custom date" className="date-picker__dialog">
        <Calendar
          aria-label="Effective date"
          value={draft}
          onChange={setDraft}
          minValue={minValue}
          defaultFocusedValue={value ?? minValue}
          autoFocus
          className="date-picker__calendar"
        >
          <header className="date-picker__header">
            <Heading className="date-picker__month" />
            <div className="date-picker__nav">
              <IconButton slot="previous" icon="chevron-left" aria-label="Previous month" />
              <IconButton slot="next" icon="chevron-right" aria-label="Next month" />
            </div>
          </header>
          <CalendarGrid className="date-picker__grid" weekdayStyle="short">
            <CalendarGridHeader>
              {/* "Su Mo Tu We Th Fr Sa". Weeks start on Sunday (en-US). */}
              {(day) => <CalendarHeaderCell className="date-picker__weekday type-label-xs">{day.slice(0, 2)}</CalendarHeaderCell>}
            </CalendarGridHeader>
            <CalendarGridBody>{(date) => <CalendarDay date={date} today={today} />}</CalendarGridBody>
          </CalendarGrid>
        </Calendar>
        <footer className="date-picker__footer">
          <Button size="medium" hierarchy="tertiary" onPress={onCancel}>
            Cancel
          </Button>
          {/* Blocked, not disabled, until a day is highlighted: it stays focusable (decision log). */}
          <Button size="medium" hierarchy="primary" aria-disabled={!draft || undefined} onPress={draft ? () => onConfirm(draft) : undefined}>
            OK
          </Button>
        </footer>
      </Dialog>
    </Popover>
  )
}
