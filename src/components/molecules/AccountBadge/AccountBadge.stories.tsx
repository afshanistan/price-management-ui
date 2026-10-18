import type { Meta, StoryObj } from '@storybook/react-vite'
import avatar from '../../../assets/avatar-placeholder.svg'
import { AccountBadge } from './AccountBadge'
import './AccountBadge.stories.css'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/account-badge.md?raw'

const states = ['default', 'hover', 'pressed', 'focus'] as const

const meta = {
  title: 'Molecules/AccountBadge',
  component: AccountBadge,
  args: {
    src: avatar,
    name: 'Will Norris',
  },
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Account-Badge 617:107).
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=617-107',
    },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'AccountBadge — avatar button in the header; hover thickens the rim, focus uses the offset ring.\n\n' +
          'The signed-in person\'s photo in a fixed 36×36 circle, used only in the Default header. ' +
          'Hover thickens the rim to 2px teal; focus keeps the 1px rim and adds the standard offset ring, so keyboard users can tell hover and focus apart. ' +
          'Its accessible name is "Account: {name}". Later it opens the account menu.',
      },
    },
  },
} satisfies Meta<typeof AccountBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

/* ---------- All states: forced with data-state, this story only ---------- */

export const AllStates: Story = {
  name: 'All states',
  render: (args) => (
    <table className="account-badge-story__table">
      <thead>
        <tr className="type-label-sm account-badge-story__caption">
          <th scope="col">Mode</th>
          {states.map((state) => (
            <th key={state} scope="col">{state}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {(['light', 'on-brand'] as const).map((mode) => (
          <tr key={mode} data-mode={mode} style={mode === 'on-brand' ? { background: 'var(--surface-brand)' } : undefined}>
            <th scope="row" className="type-label-sm account-badge-story__caption">{mode === 'light' ? 'Light' : 'On brand'}</th>
            {states.map((state) => (
              <td key={state}>
                <AccountBadge
                  src={args.src}
                  name={`${args.name} (${state})`}
                  data-state={state === 'default' ? undefined : state}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'The 4 Figma variants, in both modes. Hover, pressed and focus are forced for this story only; in the other stories they are real (hover, click, Tab).',
      },
    },
  },
}

/* ---------- On brand ---------- */

export const OnBrand: Story = {
  name: 'On brand',
  render: (args) => (
    <div data-mode="on-brand" className="account-badge-story__on-brand">
      <AccountBadge {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Where it lives: the right end of the plum header. Same component, no props: inside `data-mode="on-brand"` the rim tokens resolve to the header colors.',
      },
    },
  },
}
