import type { Meta, StoryObj } from '@storybook/react-vite'
import { pictogramTypes } from '../../atoms/Pictogram'
import { IconTile } from './IconTile'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/icon-tile.md?raw'

const meta = {
  title: 'Molecules/IconTile',
  component: IconTile,
  args: { pictogram: 'vendor', size: 32 },
  argTypes: {
    pictogram: { control: 'inline-radio', options: pictogramTypes },
    size: { control: 'inline-radio', options: [32, 48] },
  },
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Icon tile 649:119).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=649-119' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'IconTile — light plum tile holding a pictogram; a label, not an action.\n\n' +
          'A light plum square with a brand-colored pictogram that says what a card is about. 32 by default; the Card header uses it at 48. Decorative and never interactive.',
      },
    },
  },
} satisfies Meta<typeof IconTile>

export default meta
type Story = StoryObj<typeof meta>

export const Size32: Story = { name: '32' }
export const Size48: Story = { name: '48 (Card header)', args: { size: 48 } }

export const AllPictograms: Story = {
  name: 'All pictograms',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-16)', alignItems: 'center' }}>
      {pictogramTypes.flatMap((type) => [<IconTile key={type + 32} pictogram={type} />, <IconTile key={type + 48} pictogram={type} size={48} />])}
    </div>
  ),
  parameters: { controls: { disable: true } },
}
