import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { WizardNavigation } from './WizardNavigation'
import './WizardNavigation.stories.css'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/wizard-navigation.md?raw'

// Two footers on one canvas is a story-only artifact: a real page has exactly one.
const twoFooters = {
  config: {
    rules: [
      { id: 'landmark-no-duplicate-contentinfo', enabled: false },
      { id: 'landmark-unique', enabled: false },
    ],
  },
}

const meta = {
  title: 'Navigation/WizardNavigation',
  component: WizardNavigation,
  args: {
    back: { label: 'Edit vendors', onPress: fn() },
    next: { label: 'Set presets', onPress: fn() },
    canContinue: true,
    hint: 'Add at least one brand for every vendor to continue.',
  },
  parameters: {
    // Shown on the Docs page above the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Wizard navigation 853:184).
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=853-184',
    },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'WizardNavigation — footer outside `<main>`: Back (Secondary XLarge) / Next (Primary XLarge) with a hint beside a blocked Next.\n\n' +
          'The wizard footer, pinned 24px below the card and aligned to its edges. Labels name the destination ("Edit vendors", "Select brands"); the arrows are icons. ' +
          'Back is left out on step 1, but its slot stays, so Next never moves. When the step isn\'t complete (`canContinue` is false), Next is blocked and the hint appears beside it, linked with `aria-describedby`. ' +
          'A blocked Next is `aria-disabled`, not natively disabled: it stays in the Tab order so screen readers read the hint, and presses do nothing. ' +
          'It sits on the light page, below the plum stage, so it has no On brand story.',
      },
    },
  },
} satisfies Meta<typeof WizardNavigation>

export default meta
type Story = StoryObj<typeof meta>

/* ---------- One story per step ---------- */

export const Step1Vendors: Story = {
  name: 'Step 1: Vendors (blocked)',
  args: {
    back: undefined,
    next: { label: 'Select brands', onPress: fn() },
    canContinue: false,
    hint: 'Add at least one vendor to continue.',
  },
}

export const Step2Brands: Story = {
  name: 'Step 2: Brands',
  args: {
    back: { label: 'Edit vendors', onPress: fn() },
    next: { label: 'Set presets', onPress: fn() },
  },
}

export const Step3Presets: Story = {
  name: 'Step 3: Presets',
  args: {
    back: { label: 'Edit brands', onPress: fn() },
    next: { label: 'Review template', onPress: fn() },
  },
}

export const Step4Review: Story = {
  name: 'Step 4: Review',
  args: {
    back: { label: 'Edit presets', onPress: fn() },
    next: { label: 'Download template', icon: 'download', onPress: fn() },
  },
}

/* ---------- All states: the two Figma variants ---------- */

export const AllStates: Story = {
  name: 'All states',
  render: (args) => (
    <div className="wizard-navigation-story__stack">
      <div>
        <p className="type-label-sm wizard-navigation-story__caption">Next disabled</p>
        <WizardNavigation {...args} back={{ label: 'Edit vendors', onPress: fn() }} next={{ label: 'Set presets', onPress: fn() }} canContinue={false} />
      </div>
      <div>
        <p className="type-label-sm wizard-navigation-story__caption">Next enabled</p>
        <WizardNavigation {...args} back={{ label: 'Edit vendors', onPress: fn() }} next={{ label: 'Set presets', onPress: fn() }} canContinue />
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    a11y: twoFooters,
    docs: {
      description: {
        story: 'The two Figma variants. The state isn\'t a prop: it comes from `canContinue`, which the app derives from the step\'s data. Tab to the blocked Next: it takes focus, and a screen reader reads its hint.',
      },
    },
  },
}
