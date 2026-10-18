import type { Meta, StoryObj } from '@storybook/react-vite'
import { SummaryStat } from './SummaryStat'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/summary-stat.md?raw'

const meta = {
  title: 'Molecules/SummaryStat',
  component: SummaryStat,
  args: { value: '3', label: 'Vendors', status: 'complete', srLabel: '3 vendors, complete' },
  argTypes: { status: { control: 'inline-radio', options: ['complete', 'optional'] } },
  decorators: [(Story) => <div style={{ width: 304 }}><Story /></div>],
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Summary stat 832:2673).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=832-2673' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'SummaryStat — big number + label; complete shows the citron check, optional shows the Tag.\n\n' +
          'One of the three big numbers at the top of Review: vendors and brands get a citron check; presets always get the Optional tag, whatever the count. ' +
          'Screen readers hear one phrase instead ("3 vendors, complete").',
      },
    },
  },
} satisfies Meta<typeof SummaryStat>

export default meta
type Story = StoryObj<typeof meta>

export const Complete: Story = {}
export const Optional: Story = { args: { value: '1 of 3', label: 'Presets set', status: 'optional', srLabel: '1 of 3 presets set, optional' } }
