import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { brandsByVendor, incompleteSample, selectedSample, step2Vendors } from '../../../data/brandSamples'
import { SelectedBrandsPanel } from './SelectedBrandsPanel'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/selected-brands-panel.md?raw'

function Interactive({ initial }: { initial: Set<string> }) {
  const [selected, setSelected] = useState(initial)
  return (
    <div style={{ display: 'flex', height: 548 }}>
      <SelectedBrandsPanel
        vendors={step2Vendors}
        brandsByVendor={brandsByVendor}
        selectedIds={selected}
        onRemove={(id) => setSelected((prev) => { const next = new Set(prev); next.delete(id); return next })}
        onRemoveVendor={(vendorId) => setSelected((prev) => new Set([...prev].filter((id) => !id.startsWith(vendorId + '--'))))}
      />
    </div>
  )
}

const meta = {
  title: 'Organisms/SelectedBrandsPanel',
  component: SelectedBrandsPanel,
  args: { vendors: step2Vendors, brandsByVendor, selectedIds: selectedSample, onRemove: () => {}, onRemoveVendor: () => {} },
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Selected brands panel 756:1494).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=756-1494' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'SelectedBrandsPanel — the basket: summary, coverage strip, chips by vendor; 3px plum top edge.\n\n' +
          'The right side of step 2: "Selected brands" with its count badge, one coverage tile per vendor, then the selected brands as chips grouped by vendor (an H3 each). ' +
          'A vendor with every brand selected collapses to "All N brands"; a vendor with none shows an inline empty state. ' +
          'Removing a chip moves focus to the next chip\'s ×, else the previous one, else the vendor\'s heading.',
      },
    },
  },
} satisfies Meta<typeof SelectedBrandsPanel>

export default meta
type Story = StoryObj<typeof meta>

export const WithSelections: Story = { name: 'With selections', render: () => <Interactive initial={selectedSample} /> }
export const Incomplete: Story = { render: () => <Interactive initial={incompleteSample} /> }
export const Empty: Story = { render: () => <Interactive initial={new Set()} /> }
