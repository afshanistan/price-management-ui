import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarDate } from '@internationalized/date'
import { Calendar, CalendarGrid, CalendarGridBody } from 'react-aria-components'
import { CalendarDay } from './CalendarDay'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/calendar-day.md?raw'

// Stories freeze today at Oct 17, 2026, as in Figma.
const today = new CalendarDate(2026, 10, 17)

const meta = {
  title: 'Atoms/CalendarDay',
  component: CalendarDay,
  args: { date: today, today },
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Calendar day 801:24).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=801-24' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'CalendarDay — one day cell in the Date picker grid (role="gridcell").\n\n' +
          'A 36px day in the Date picker\'s month grid. Hover is a light teal circle, the selected day a teal circle with white text, ' +
          'today has a small dot, past days are greyed out and unavailable, and other-month days are empty. ' +
          'Screen readers hear the full date ("Wednesday, October 28, 2026"). It only works inside the Date picker\'s calendar.',
      },
    },
  },
} satisfies Meta<typeof CalendarDay>

export default meta
type Story = StoryObj<typeof meta>

/* One week row of October 2026, showing every state. */
export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <Calendar
      aria-label="Calendar day states"
      defaultValue={new CalendarDate(2026, 10, 28)}
      defaultFocusedValue={new CalendarDate(2026, 10, 28)}
      minValue={today.add({ days: 1 })}
    >
      <CalendarGrid>
        <CalendarGridBody>
          {(date) => <CalendarDay date={date} today={today} data-state={date.compare(new CalendarDate(2026, 10, 20)) === 0 ? 'hover' : undefined} />}
        </CalendarGridBody>
      </CalendarGrid>
    </Calendar>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'October 2026 with today frozen at the 17th: past days and today disabled, the 17th has the dot, the 20th is forced Hover (this story only), the 28th is Selected, and September / November days are empty.',
      },
    },
  },
}
