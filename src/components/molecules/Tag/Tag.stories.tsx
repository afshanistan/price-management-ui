import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag } from './Tag'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/tag.md?raw'

const meta = {
  title: 'Molecules/Tag',
  component: Tag,
  args: { children: 'Optional' },
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Tag 791:2608).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=791-2608' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'Tag — neutral label such as "Optional". Never a status, never interactive.\n\n' +
          'A small neutral pill. Step 3\'s Card header uses it beside the title, where it reads as part of the heading ("Add pricing defaults, optional"). See Card header.',
      },
    },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
