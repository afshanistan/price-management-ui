import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { ReviewRow } from './ReviewRow'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/review-row.md?raw'

const meta = {
  title: 'Molecules/ReviewRow',
  component: ReviewRow,
  args: { type: 'vendor', name: 'Cargill', brandCount: 4, esn: '70441642' },
  argTypes: { type: { control: 'inline-radio', options: ['vendor', 'brand'] } },
  // A row is a list item.
  decorators: [(Story) => <ul style={{ width: 444, margin: 0, padding: 0, listStyle: 'none' }}><Story /></ul>],
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Review row 836:2688).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=836-2688' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'ReviewRow — read-only row (no hover, no focus stop).\n\n' +
          'One line in Review\'s Vendors or Brands list. Vendor: name, "4 brands", "ESN-70441642" (no logo tile, like step 1). ' +
          'Brand: its name and a trash to remove it from the template, quiet at rest and red on hover; on a vendor\'s last brand the trash is blocked, with a tooltip. ' +
          'Brands sit under their vendor\'s label in the card, so the row doesn\'t repeat the vendor (step 4 review, Oct 19).',
      },
    },
  },
} satisfies Meta<typeof ReviewRow>

export default meta
type Story = StoryObj<typeof meta>

export const Vendor: Story = {}
export const Brand: Story = { args: { type: 'brand', name: 'Truvia', onRemove: fn() } }
export const BrandLast: Story = {
  name: 'Brand, last of its vendor',
  args: { type: 'brand', name: 'Truvia', onRemove: fn(), removeBlockedReason: 'Each vendor needs a brand' },
  parameters: { docs: { description: { story: 'The trash looks disabled but stays focusable: hover it or Tab to it for the tooltip.' } } },
}
export const OneBrand: Story = { name: 'One brand', args: { name: 'The Kraft Heinz Company', brandCount: 1, esn: '24870547' } }
