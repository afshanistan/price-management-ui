import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarDate } from '@internationalized/date'
import { userEvent, within } from 'storybook/test'
import type { DatesValue } from '../../../data/presets'
import { DatesPreset } from './DatesPreset'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/dates-preset.md?raw'

// Stories freeze today at Oct 17, 2026: Next month = Nov 1, 2026, Next quarter = Jan 1, 2027.
const today = new CalendarDate(2026, 10, 17)

const meta = {
  title: 'Molecules/DatesPreset',
  component: DatesPreset,
  args: { value: { source: 'none', date: null }, onChange: () => {}, today },
  render: function Render(args) {
    const [value, setValue] = useState<DatesValue>(args.value)
    return (
      <div style={{ width: 282 }}>
        <DatesPreset {...args} value={value} onChange={setValue} />
      </div>
    )
  },
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Dates preset 825:3744).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=825-3744' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'DatesPreset — Effective date fieldset; Custom date opens the Date picker. One value, three inputs.\n\n' +
          'The Effective date preset: No default, Next month and Next quarter (computed from today), or a Custom date picked in the Date picker. ' +
          'Choosing Custom date opens the picker; Cancel goes back to the previous choice if no date was ever confirmed. ' +
          'A confirmed date is remembered while another option is selected. The calendar button (or clicking the selected tile) reopens it. No typed date field.',
      },
    },
  },
} satisfies Meta<typeof DatesPreset>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = { parameters: { docs: { description: { story: 'Figma State=Closed (03a).' } } } }

export const Open: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByText('Custom date'))
  },
  parameters: { docs: { description: { story: 'Figma State=Open (03b): Custom date chosen, picker open. Cancel or Esc goes back to No default.' } } },
}

export const Confirmed: Story = {
  args: { value: { source: 'custom', date: new CalendarDate(2026, 10, 28) } },
  parameters: { docs: { description: { story: 'Figma State=Confirmed (03c): Oct 28, 2026.' } } },
}
