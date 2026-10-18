import type { Meta, StoryObj } from '@storybook/react-vite'
import { Logo } from './Logo'

const meta = {
  title: 'Atoms/Logo',
  component: Logo,
  args: {
    size: 32,
    title: 'Price Management',
  },
  parameters: {
    // Design tab: the main component in Figma (Logo 637:25).
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=637-25',
    },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'Logo — two-tone "produce bars" mark; layers bound to logo-primary / logo-accent (citron bars on brand).\n\n' +
          'Two-tone "produce bars" mark. Bars use `--logo-primary` (Teal/500, Citron/300 on brand); the stem and leaf use `--logo-accent` (Plum/600, Plum/300 on brand). ' +
          'The logo never sets a mode: it turns citron because its container has `data-mode="on-brand"` (the header). ' +
          'In the header it sits in a 36×36 frame with 2px padding, so the drawing is 32px. ' +
          'When the app name sits right beside it, mark it `aria-hidden` so the name isn\'t read twice.',
      },
    },
  },
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {}

export const OnBrand: Story = {
  name: 'On brand',
  decorators: [
    (Story) => (
      <div data-mode="on-brand" style={{ background: 'var(--surface-brand)', padding: 'var(--space-24)' }}>
        <Story />
      </div>
    ),
  ],
}

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--space-24)' }}>
      {[32, 24, 16].map((size) => (
        <Logo key={size} {...args} size={size} />
      ))}
    </div>
  ),
}
