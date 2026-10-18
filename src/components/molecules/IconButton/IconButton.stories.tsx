import type { Meta, StoryObj } from '@storybook/react-vite'
import { iconNames } from '../../atoms/Icon'
import { IconButton, type IconButtonTone } from './IconButton'
import './IconButton.stories.css'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/icon-button.md?raw'

const tones: IconButtonTone[] = ['default', 'destructive']
const states = ['default', 'hover', 'pressed', 'focus', 'disabled'] as const

const meta = {
  title: 'Molecules/IconButton',
  component: IconButton,
  args: {
    icon: 'settings',
    'aria-label': 'Settings',
    tone: 'default',
    size: 'medium',
    isDisabled: false,
  },
  argTypes: {
    icon: { control: 'select', options: iconNames },
    tone: { control: 'inline-radio', options: tones },
    size: { control: 'inline-radio', options: ['medium'] },
  },
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Icon button 603:52).
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=603-52',
    },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'IconButton — square/round icon-only action; needs aria-label naming action + object.\n\n' +
          'Icon-only action, a fixed 32×32 square with a 24px icon. **Default** tone fills its icon on hover and stays filled on press (no hover background). ' +
          '**Destructive** is the vendor-card trash: filled teal at rest, crimson over a light crimson circle on hover. ' +
          '`aria-label` is required and names action + object ("Remove Cargill"); the icon itself is hidden from screen readers.',
      },
    },
  },
} satisfies Meta<typeof IconButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Destructive: Story = {
  args: {
    icon: 'trash',
    tone: 'destructive',
    'aria-label': 'Remove Cargill',
  },
}

/* ---------- All states: forced with data-state, this story only ---------- */

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <table className="icon-button-story__table">
      <thead>
        <tr className="type-label-sm icon-button-story__caption">
          <th scope="col">Tone</th>
          {states.map((state) => (
            <th key={state} scope="col">{state}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tones.map((tone) => (
          <tr key={tone}>
            <th scope="row" className="type-label-sm icon-button-story__caption">{tone}</th>
            {states.map((state) => (
              <td key={state}>
                <IconButton
                  tone={tone}
                  icon={tone === 'destructive' ? 'trash' : 'settings'}
                  aria-label={tone === 'destructive' ? `Remove Cargill (${state})` : `Settings (${state})`}
                  isDisabled={state === 'disabled'}
                  data-state={state === 'disabled' || state === 'default' ? undefined : state}
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
          'The 10 Figma variants. Hover, pressed and focus are forced for this story only; in the other stories they are real (hover, click, Tab).',
      },
    },
  },
}

/* ---------- On brand ---------- */

export const OnBrand: Story = {
  name: 'On brand',
  render: (args) => (
    <div data-mode="on-brand" className="icon-button-story__on-brand">
      <IconButton {...args} icon="help" aria-label="Help" />
      <IconButton {...args} icon="settings" aria-label="Settings" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Header icon buttons. Same component, no props: inside `data-mode="on-brand"` the tokens resolve to the header colors.',
      },
    },
  },
}
