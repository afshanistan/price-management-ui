import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioCircle } from './Radio'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/radio.md?raw'

const meta = {
  title: 'Atoms/Radio',
  component: RadioCircle,
  args: { checked: true },
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Radio 796:2665).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=796-2665' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'Radio — single choice inside Option tile.\n\n' +
          'The 18px radio circle, empty or with a dot. It\'s only used inside an Option tile, which holds the real (visually hidden) radio input; ' +
          'the circle is decorative, and its hover look follows the tile. Try it in Molecules/OptionTile.',
      },
    },
  },
} satisfies Meta<typeof RadioCircle>

export default meta
type Story = StoryObj<typeof meta>

export const Checked: Story = {}

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: 'var(--space-16)', width: 'max-content' }}>
      <RadioCircle />
      <RadioCircle data-state="hover" />
      <RadioCircle checked />
      <RadioCircle checked data-state="hover" />
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { description: { story: 'The 4 Figma variants: False / True × Default / Hover (hover forced for this story only).' } } },
}
