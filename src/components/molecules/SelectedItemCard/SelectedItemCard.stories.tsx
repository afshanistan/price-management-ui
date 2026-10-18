import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { mockVendors } from '../../../data/mockVendors'
import { SelectedItemCard } from './SelectedItemCard'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/selected-item-card.md?raw'

const vendor = (id: string) => {
  const v = mockVendors.find((m) => m.id === id)!
  return { name: v.name, meta: v.esn, logo: v.logo }
}

const meta = {
  title: 'Molecules/SelectedItemCard',
  component: SelectedItemCard,
  args: { ...vendor('coca-cola'), onRemove: fn() },
  argTypes: { logo: { control: false } },
  // One column of step 1's three-across grid.
  decorators: [(Story) => <div style={{ width: 293 }}><Story /></div>],
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Selected item card 707:717).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=707-717' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'SelectedItemCard — a chosen vendor (logo, name, ESN) with a destructive remove button.\n\n' +
          'One added vendor in step 1\'s grid: name (Body/LG Strong) and ESN on top, the trash button top-right ("Remove Coca-Cola"), and the brand-color logo below, ' +
          'at most 128 × 28, scaled to fit and lined up with the name. Logos under 1.5 : 1 (tall or square) are left out. A vendor with no logo keeps the space empty, so cards stay the same height; no wordmark, the name already says it. ' +
          'Brand colors are content, not UI color roles. The parent lists the cards and, after a removal, moves focus to the next card\'s Remove (or the search) and announces it.',
      },
    },
  },
} satisfies Meta<typeof SelectedItemCard>

export default meta
type Story = StoryObj<typeof meta>

export const WideLogo: Story = {
  name: 'Logo: wide (The Coca-Cola Company)',
  parameters: { docs: { description: { story: 'A wide logo fills the 128 width and stays short.' } } },
}

export const TallLogoHidden: Story = {
  name: 'Tall logo, hidden (Del Monte Foods)',
  args: vendor('del-monte-foods'),
  parameters: { docs: { description: { story: 'Del Monte\'s badge is 1.34 : 1. Under 1.5 the card leaves it out and the space stays empty.' } } },
}

export const WordmarkLogo: Story = {
  name: 'Logo: wordmark (Mars)',
  args: vendor('mars'),
  parameters: { docs: { description: { story: 'A plain wordmark logo at full height (see the follow-up on capping its height).' } } },
}

export const NoLogo: Story = {
  name: 'No logo (Blue Diamond Growers)',
  args: vendor('blue-diamond'),
  parameters: { docs: { description: { story: 'No logo file: the 28px space stays, empty.' } } },
}

export const LongName: Story = {
  name: 'Long name',
  args: vendor('tillamook'),
  parameters: { docs: { description: { story: 'One line with an ellipsis; the full name on hover. (Two-line names are decided but not yet drawn in Figma.)' } } },
}

export const AllLogos: Story = {
  name: 'All logo cases',
  decorators: [(Story) => <div style={{ width: 'auto' }}><Story /></div>],
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 293px)', gap: 'var(--space-16)' }}>
      {['coca-cola', 'mars', 'del-monte-foods', 'blue-diamond'].map((id) => (
        <SelectedItemCard key={id} {...vendor(id)} onRemove={() => {}} />
      ))}
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { description: { story: 'Wide, wordmark, a tall logo (hidden) and no logo. All four cards are the same height.' } } },
}

/* ---------- Test: every mock vendor, tallest logo first ---------- */

export const AllVendorsByShape: Story = {
  name: 'All 60 vendors, tallest logo first',
  decorators: [(Story) => <div style={{ width: 'auto' }}><Story /></div>],
  render: () => {
    const sorted = [...mockVendors].sort((a, b) => (a.logo?.ratio ?? 99) - (b.logo?.ratio ?? 99))
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 293px)', gap: 'var(--space-16)' }}>
        {sorted.map((v) => (
          <div key={v.id}>
            <div className="type-label-sm" style={{ color: 'var(--text-subtle)', marginBottom: 'var(--space-4)' }}>
              {v.logo?.ratio ? `${v.logo.ratio.toFixed(2)} : 1${v.logo.ratio < 1.5 ? ' · hidden (under 1.5)' : ''}` : 'no logo'}
            </div>
            <SelectedItemCard name={v.name} meta={v.esn} logo={v.logo} onRemove={() => {}} />
          </div>
        ))}
      </div>
    )
  },
  parameters: {
    controls: { disable: true },
    docs: { description: { story: 'The label is each logo\'s width ÷ height. Logos under 1.5 : 1 (tall or square) are hidden and the space stays empty, like a vendor with no logo (14 of 60).' } },
  },
}
