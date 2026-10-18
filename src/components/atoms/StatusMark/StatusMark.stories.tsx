import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatusMark } from './StatusMark'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/status-mark.md?raw'

const meta = {
  title: 'Atoms/StatusMark',
  component: StatusMark,
  args: { status: 'complete' },
  argTypes: { status: { control: 'inline-radio', options: ['complete', 'todo'] } },
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Status mark 890:3037).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=890-3037' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'StatusMark — complete (citron + check) or to-do (dashed ring). Never interactive, never color alone.\n\n' +
          'A 16px status dot for the Vendor coverage tile: a citron circle with a check when a vendor has brands, a dashed ring when it still needs one. ' +
          'Always decorative: the tile\'s hidden text says the status ("…, complete" / "…, to do").',
      },
    },
  },
} satisfies Meta<typeof StatusMark>

export default meta
type Story = StoryObj<typeof meta>

export const Complete: Story = {}
export const ToDo: Story = { name: 'To do', args: { status: 'todo' } }

export const BothStatuses: Story = {
  name: 'Both statuses',
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-16)', padding: 'var(--space-12)', background: 'var(--fill-coverage-tile)' }}>
      <StatusMark status="complete" />
      <StatusMark status="todo" />
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { description: { story: 'On the coverage tile fill, where they sit.' } } },
}
