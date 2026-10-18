/*
  Step 3 presets: options, value shapes and date helpers, shared by the stories and the app.
  The pricing model names are placeholders (keep them here, not in components).
*/
import { CalendarDate, DateFormatter, getLocalTimeZone, startOfMonth, today as todayIn } from '@internationalized/date'

export type DateSource = 'none' | 'next-month' | 'next-quarter' | 'custom'

export interface DatesValue {
  source: DateSource
  /** The confirmed custom date, remembered while another option is selected. */
  date: CalendarDate | null
}

export interface GlobalPresetsValue {
  effectiveDate: DatesValue
  currency: string
  pricingModel: string
}

export const NO_DEFAULT = 'none'

export const initialPresets: GlobalPresetsValue = {
  effectiveDate: { source: 'none', date: null },
  currency: NO_DEFAULT,
  pricingModel: NO_DEFAULT,
}

export interface PresetOption {
  value: string
  label: string
  description?: string
  layout?: 'stacked' | 'inline'
}

export const currencyOptions: PresetOption[] = [
  { value: NO_DEFAULT, label: 'No default' },
  { value: 'USD', label: 'USD', description: 'US dollar', layout: 'inline' },
  { value: 'CAD', label: 'CAD', description: 'Canadian dollar', layout: 'inline' },
  { value: 'MXN', label: 'MXN', description: 'Mexican peso', layout: 'inline' },
]

export const pricingModelOptions: PresetOption[] = [
  { value: NO_DEFAULT, label: 'No default' },
  { value: 'fixed-price', label: 'Fixed price' },
  { value: 'cost-plus', label: 'Cost plus' },
  { value: 'target-margin', label: 'Target margin' },
]

/** The real today; stories pass a frozen date instead. */
export const currentDay = () => todayIn(getLocalTimeZone())

/** First day of next month. */
export const nextMonth = (today: CalendarDate) => startOfMonth(today.add({ months: 1 }))

/** First day of the next calendar quarter (Jan, Apr, Jul, Oct). */
export function nextQuarter(today: CalendarDate) {
  const firstMonthOfNext = Math.floor((today.month - 1) / 3) * 3 + 4
  return firstMonthOfNext > 12 ? new CalendarDate(today.year + 1, firstMonthOfNext - 12, 1) : new CalendarDate(today.year, firstMonthOfNext, 1)
}

const short = new DateFormatter('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
const long = new DateFormatter('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

/** "Nov 1, 2026". */
export const formatShort = (date: CalendarDate) => short.format(date.toDate(getLocalTimeZone()))
/** "November 1, 2026", for announcements. */
export const formatLong = (date: CalendarDate) => long.format(date.toDate(getLocalTimeZone()))

/** The effective date a value resolves to, or null for No default (and an unconfirmed custom date). */
export function effectiveDateOf(value: DatesValue, today: CalendarDate) {
  if (value.source === 'next-month') return nextMonth(today)
  if (value.source === 'next-quarter') return nextQuarter(today)
  if (value.source === 'custom') return value.date
  return null
}

/** How many of the three presets aren't "No default" (Review: "1 of 3"). */
export function presetsSetCount(value: GlobalPresetsValue) {
  return [value.effectiveDate.source !== 'none', value.currency !== NO_DEFAULT, value.pricingModel !== NO_DEFAULT].filter(Boolean).length
}
