import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { SelectedItemCard } from './SelectedItemCard'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/selected-item-card.md?raw'

const meta = {
  title: 'Molecules/SelectedItemCard',
  component: SelectedItemCard,
  args: { name: 'Cargill', meta: 'DEMO-0022', wordmark: 'CGL', onRemove: fn() },
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
          'One added vendor: the large teal logo, then name and ESN, with a trash button top-right ("Remove Cargill"). ' +
          'Step 1 shows them three across. The parent lists them and, after a removal, moves focus to the next card\'s Remove (or the search) and announces it.',
      },
    },
  },
} satisfies Meta<typeof SelectedItemCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongName: Story = {
  name: 'Long name',
  args: { name: 'McCormick & Company International', meta: 'DEMO-0017', wordmark: 'MKC' },
  parameters: { docs: { description: { story: 'One line with an ellipsis; the full name on hover.' } } },
}
