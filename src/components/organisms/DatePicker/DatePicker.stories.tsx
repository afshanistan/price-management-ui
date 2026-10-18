import { useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarDate } from '@internationalized/date'
import { formatShort } from '../../../data/presets'
import { Button } from '../../molecules/Button'
import { DatePicker } from './DatePicker'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/date-picker.md?raw'

// Stories freeze today at Oct 17, 2026, as in Figma.
const today = new CalendarDate(2026, 10, 17)

/* A stand-in for the Custom date tile: the picker anchors to it. */
function Demo({ initial, startOpen }: { initial: CalendarDate | null; startOpen: boolean }) {
  const anchor = useRef<HTMLDivElement>(null)
  const [isOpen, setOpen] = useState(startOpen)
  const [value, setValue] = useState(initial)
  return (
    <div style={{ width: 282, display: 'grid', gap: 'var(--space-8)' }}>
      <div ref={anchor} style={{ padding: 'var(--space-12)', border: 'var(--border-width-1) solid var(--border-structural)', borderRadius: 'var(--radius-8)' }}>
        <span className="type-label-lg">Custom date</span> <span className="type-body-xs" style={{ color: 'var(--text-subtle)' }}>{value ? formatShort(value) : 'Pick a date'}</span>
      </div>
      <Button size="xsmall" hierarchy="secondary" leadingIcon="calendar" onPress={() => setOpen(true)}>Open picker</Button>
      <DatePicker
        isOpen={isOpen}
        triggerRef={anchor}
        value={value}
        today={today}
        onConfirm={(date) => { setValue(date); setOpen(false) }}
        onCancel={() => setOpen(false)}
      />
    </div>
  )
}

const meta = {
  title: 'Organisms/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'padded',
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Date picker 815:3262).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=815-3262' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'DatePicker — popover calendar anchored to the Custom date tile; explicit OK / Cancel; grid with arrow keys.\n\n' +
          'Opens below the Custom date tile at its width. Pick a day (click, or arrows + Enter); nothing is saved until **OK**, which stays blocked until a day is highlighted. ' +
          '**Cancel**, Esc or a click outside throws the draft away. Past days and today are unavailable. ' +
          'Arrow keys move between days, Page Up / Down change month, and focus returns to what opened it.',
      },
    },
  },
  args: { isOpen: true, triggerRef: { current: null }, value: null, today, onConfirm: () => {}, onCancel: () => {} },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  render: () => <Demo initial={null} startOpen />,
  parameters: { docs: { description: { story: 'Figma Dates preset State=Open (03b): no date yet, so OK is blocked. Today is frozen at Oct 17, 2026.' } } },
}

export const WithConfirmedDate: Story = {
  name: 'With a confirmed date',
  render: () => <Demo initial={new CalendarDate(2026, 10, 28)} startOpen />,
  parameters: { docs: { description: { story: 'Reopened with Oct 28, 2026 confirmed: it opens on that month with the day selected.' } } },
}
