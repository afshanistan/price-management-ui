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
          'A 16px status dot: a citron circle with a check when a vendor has brands, a dashed ring when it still needs one. ' +
          'In the Selected brands panel, the complete mark sits right after each vendor\'s count once it has a brand (the to-do ring isn\'t used there; Oct 19). ' +
          'Always decorative: nearby hidden text says the status ("…, complete").',
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
    <div style={{ display: 'flex', gap: 'var(--space-16)', padding: 'var(--space-12)', background: 'var(--surface-card)' }}>
      <StatusMark status="complete" />
      <StatusMark status="todo" />
    </div>
  ),
  parameters: { controls: { disable: true }, docs: { description: { story: 'On the panel surface, where the complete mark sits.' } } },
}
