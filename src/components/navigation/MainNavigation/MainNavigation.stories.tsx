import type { Meta, StoryObj } from '@storybook/react-vite'
import avatar from '../../../assets/avatar-placeholder.svg'
import { MainNavigation, type MainNavigationPage } from './MainNavigation'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/main-navigation.md?raw'

const meta = {
  title: 'Navigation/MainNavigation',
  component: MainNavigation,
  args: {
    variant: 'focus',
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'focus'] },
    currentPage: { control: 'inline-radio', options: ['templates', 'submissions', 'messages'] satisfies MainNavigationPage[] },
  },
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Main-Navigation 642:156).
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=642-156',
    },
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'MainNavigation — plum header (data-mode="on-brand"). Default = full product nav; Focus = logo, "Template Builder", Save and exit.\n\n' +
          'The 56px plum header across the top of every page. It sets `data-mode="on-brand"` itself, so the logo, buttons and links inside take their header colors with no props. ' +
          '**Focus** is the wizard header: logo, "Template Builder" and Save and exit, the only tab stop. ' +
          '**Default** is the product header: nav links in the center, then Upload CSV, Help, Settings and the Account badge. ' +
          'The title is the app name, not a heading; the card title is the page\'s only H1.',
      },
    },
  },
} satisfies Meta<typeof MainNavigation>

export default meta
type Story = StoryObj<typeof meta>

export const Focus: Story = {}

export const Default: Story = {
  args: {
    variant: 'default',
    currentPage: 'templates',
    account: { name: 'Will Norris', src: avatar },
  },
}

export const BothVariants: Story = {
  name: 'Both variants',
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--space-24)' }}>
      <MainNavigation variant="default" account={{ name: 'Will Norris', src: avatar }} />
      <MainNavigation variant="focus" />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    // Two headers on one canvas is a story-only artifact: a real page has exactly one banner.
    a11y: {
      config: {
        rules: [
          { id: 'landmark-no-duplicate-banner', enabled: false },
          { id: 'landmark-unique', enabled: false },
        ],
      },
    },
    docs: {
      description: {
        story: 'The two Figma variants, stacked. Hover, press and Tab work on every control; their states are shown in each molecule\'s own "All states" story.',
      },
    },
  },
}
