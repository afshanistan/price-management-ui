import type { Meta, StoryObj } from '@storybook/react-vite'
import { iconNames } from '../../atoms/Icon'
import { NavLink } from './NavLink'
import './NavLink.stories.css'

const states = ['inactive', 'hover', 'pressed', 'active', 'focus'] as const

const meta = {
  title: 'Molecules/NavLink',
  component: NavLink,
  args: {
    children: 'Messages',
    icon: 'messages',
    href: '#',
    isActive: false,
  },
  argTypes: {
    icon: { control: 'select', options: iconNames },
  },
  // Nav links only live on the brand header.
  decorators: [
    (Story) => (
      <div data-mode="on-brand" className="nav-link-story__on-brand">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'NavLink — top-nav tab on the brand header; icon slot reserved in every state so nothing reflows.\n\n' +
          'Top-nav tab on the brand header (Main navigation, Variant=Default only). A pill whose 16px icon slot is reserved in every state, so nothing reflows: ' +
          'the icon is hidden when inactive, fades in as a stroke on hover, fills on press and stays filled when active. ' +
          'The active link is fully neutral and sets `aria-current="page"`.',
      },
    },
  },
} satisfies Meta<typeof NavLink>

export default meta
type Story = StoryObj<typeof meta>

export const Inactive: Story = {}

export const Active: Story = {
  args: { isActive: true },
}

/* ---------- All states: forced with data-state, this story only ---------- */

export const AllStates: Story = {
  name: 'All states',
  decorators: [(Story) => <Story />],
  render: () => (
    <div data-mode="on-brand" className="nav-link-story__states">
      {states.map((state) => (
        <div key={state} className="nav-link-story__state">
          <span className="type-label-sm nav-link-story__caption">{state}</span>
          <NavLink
            href="#"
            icon="messages"
            isActive={state === 'active'}
            data-state={state === 'inactive' || state === 'active' ? undefined : state}
          >
            Messages
          </NavLink>
        </div>
      ))}
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'The 5 Figma states. Hover, pressed and focus are forced for this story only; in the other stories they are real (hover, click, Tab).',
      },
    },
  },
}

/* ---------- On brand: the header's three links ---------- */

export const OnBrand: Story = {
  name: 'On brand',
  decorators: [(Story) => <Story />],
  render: () => (
    <nav aria-label="Main" data-mode="on-brand" className="nav-link-story__on-brand">
      <NavLink href="#" icon="create" isActive>Templates</NavLink>
      <NavLink href="#" icon="upload">Submissions</NavLink>
      <NavLink href="#" icon="messages">Messages</NavLink>
    </nav>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'The three links as they sit in the Default header (gap 4 in Figma).',
      },
    },
  },
}
