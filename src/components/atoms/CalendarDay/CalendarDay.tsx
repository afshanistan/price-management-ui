import type { CalendarDate } from '@internationalized/date'
import { CalendarCell } from 'react-aria-components'
import './CalendarDay.css'

export interface CalendarDayProps {
  date: CalendarDate
  /** Injected so stories can freeze the date. Today gets a small dot. */
  today?: CalendarDate
  /** Forces Hover for the "All states" story only. */
  'data-state'?: 'hover'
}

/*
  One day in the Date picker grid: the styling of React Aria's CalendarCell
  (gridcell with a button named "Wednesday, October 28, 2026"). States come from React Aria:
  [data-hovered], [data-selected], [data-disabled], [data-outside-month], [data-focus-visible].
*/
export function CalendarDay({ date, today, 'data-state': state }: CalendarDayProps) {
  const isToday = today ? date.compare(today) === 0 : false

  return (
    <CalendarCell date={date} className="calendar-day" data-today={isToday || undefined} data-state={state}>
      {({ formattedDate, isOutsideMonth }) =>
        isOutsideMonth ? null : (
          <>
            {formattedDate}
            {isToday && <span className="calendar-day__today" aria-hidden="true" />}
          </>
        )
      }
    </CalendarCell>
  )
}
