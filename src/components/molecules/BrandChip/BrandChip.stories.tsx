import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { BrandChip } from './BrandChip'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/brand-chip.md?raw'

const meta = {
  title: 'Molecules/BrandChip',
  component: BrandChip,
  args: { type: 'brand', label: 'Truvia', removeLabel: 'Remove Truvia', onRemove: fn() },
  argTypes: { type: { control: 'inline-radio', options: ['brand', 'all'] } },
  decorators: [(Story) => <div style={{ width: 328 }}><Story /></div>],
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Brand chip 891:629).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=891-629' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'BrandChip — a selected brand in the basket; only the × reacts (24px target, teal, no red). "All N brands" collapses a full vendor.\n\n' +
          'A soft teal pill for one selected brand in the Selected brands panel; its × unchecks the brand. ' +
          'When every brand of a vendor is selected, one full-width **All N brands** chip replaces them. ' +
          'Only the × reacts (a teal circle on hover, a round focus ring); removing is low-stakes and reversible, so no red.',
      },
    },
  },
} satisfies Meta<typeof BrandChip>

export default meta
type Story = StoryObj<typeof meta>

export const Brand: Story = {}

export const AllBrands: Story = {
  name: 'All brands',
  args: { type: 'all', label: 'All 9 brands', removeLabel: 'Remove all General Mills brands' },
}

export const LongName: Story = {
  name: 'Long name',
  args: { label: 'Honeysuckle White Premium Ground Turkey Selection', removeLabel: 'Remove Honeysuckle White Premium Ground Turkey Selection' },
  parameters: { docs: { description: { story: 'Never wider than the panel: one line, ellipsis, full name on hover.' } } },
}
