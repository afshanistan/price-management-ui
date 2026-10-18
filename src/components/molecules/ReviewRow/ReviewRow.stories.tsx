import type { Meta, StoryObj } from '@storybook/react-vite'
import { ReviewRow } from './ReviewRow'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/review-row.md?raw'

const meta = {
  title: 'Molecules/ReviewRow',
  component: ReviewRow,
  args: { type: 'vendor', name: 'Cargill', wordmark: 'CGL', brandCount: 4, esn: 'DEMO-0022' },
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
          'One line in Review\'s Vendors or Brands list. Vendor: logo, name, "4 brands", ESN. Brand: name and its vendor. ' +
          'Read-only: no hover, no focus; the list scrolls, not the row.',
      },
    },
  },
} satisfies Meta<typeof ReviewRow>

export default meta
type Story = StoryObj<typeof meta>

export const Vendor: Story = {}
export const Brand: Story = { args: { type: 'brand', name: 'Truvia', vendorName: 'Cargill' } }
export const OneBrand: Story = { name: 'One brand', args: { name: 'Kraft Heinz', wordmark: 'KHC', brandCount: 1, esn: 'DEMO-0005' } }
