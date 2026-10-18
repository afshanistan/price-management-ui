import type { Meta, StoryObj } from '@storybook/react-vite'
import { VendorCoverageTile } from './VendorCoverageTile'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/vendor-coverage-tile.md?raw'

const meta = {
  title: 'Molecules/VendorCoverageTile',
  component: VendorCoverageTile,
  args: { vendorName: 'Cargill', wordmark: 'CGL', selectedCount: 4, totalCount: 5 },
  decorators: [(Story) => <div style={{ display: 'flex', width: 104 }}><Story /></div>],
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Vendor coverage tile 891:643).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=891-643' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'VendorCoverageTile — vendor logo + StatusMark in the coverage strip. Informational only; placeholder until real logos.\n\n' +
          'One tile per vendor at the top of the Selected brands panel: the wordmark with a status mark, complete once the vendor has at least one brand. ' +
          'Informational only. Screen readers hear "Cargill, 4 of 5 brands selected, complete". The counts aren\'t in the tile; they sit beside the vendor label in the panel.',
      },
    },
  },
} satisfies Meta<typeof VendorCoverageTile>

export default meta
type Story = StoryObj<typeof meta>

export const Complete: Story = {}
export const ToDo: Story = { name: 'To do', args: { vendorName: 'Kraft Heinz', wordmark: 'KHC', selectedCount: 0, totalCount: 8 } }
