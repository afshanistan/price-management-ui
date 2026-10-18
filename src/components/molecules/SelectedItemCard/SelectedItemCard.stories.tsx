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
          'at most 128 × 28, scaled to fit and lined up with the name. A vendor with no logo keeps the space empty, so cards stay the same height; no wordmark, the name already says it. ' +
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

export const BadgeLogo: Story = {
  name: 'Logo: badge (Del Monte Foods)',
  args: vendor('del-monte-foods'),
  parameters: { docs: { description: { story: 'A badge fills the 28 height and sits left.' } } },
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
      {['coca-cola', 'del-monte-foods', 'mars', 'blue-diamond'].map((id) => (
        <SelectedItemCard key={id} {...vendor(id)} onRemove={() => {}} />
      ))}
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { description: { story: 'As in Figma\'s reference frame (990:11496): wide, badge, wordmark, no logo. All four cards are the same height.' } } },
}
