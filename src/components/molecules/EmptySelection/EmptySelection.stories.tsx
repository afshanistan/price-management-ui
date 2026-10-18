import type { Meta, StoryObj } from '@storybook/react-vite'
import { pictogramTypes } from '../../atoms/Pictogram'
import { EmptySelection } from './EmptySelection'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/empty-selection.md?raw'

const meta = {
  title: 'Molecules/EmptySelection',
  component: EmptySelection,
  args: {
    layout: 'stacked',
    pictogram: 'vendor',
    message: 'No vendors selected yet',
    helper: 'Search above to add vendors to this template.',
  },
  argTypes: {
    layout: { control: 'inline-radio', options: ['stacked', 'inline'] },
    pictogram: { control: 'inline-radio', options: pictogramTypes },
  },
  decorators: [(Story) => <div style={{ width: 640 }}><Story /></div>],
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Empty selection 903:616).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=903-616' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'EmptySelection — non-interactive placeholder (pictogram + message). Stacked for a whole panel, inline for one vendor.\n\n' +
          'A dashed placeholder where selections will appear. **Stacked** fills a whole section (step 1, before any vendor is added), at the same height as a vendor card. ' +
          '**Inline** is one line for a vendor without brands (step 2). Plain text, never interactive.',
      },
    },
  },
} satisfies Meta<typeof EmptySelection>

export default meta
type Story = StoryObj<typeof meta>

export const Stacked: Story = { name: 'Stacked (step 1)' }

export const Inline: Story = {
  name: 'Inline (step 2)',
  args: { layout: 'inline', pictogram: 'brand', message: 'No Kraft Heinz brands yet', helper: undefined },
}
