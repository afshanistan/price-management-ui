import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stepper, type StepperStep } from './Stepper'
import './Stepper.stories.css'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/stepper.md?raw'

const meta = {
  title: 'Navigation/Stepper',
  component: Stepper,
  args: {
    currentStep: 1,
  },
  argTypes: {
    currentStep: { control: 'inline-radio', options: [1, 2, 3, 4] satisfies StepperStep[] },
  },
  // The stepper only ever sits on the plum stage.
  decorators: [
    (Story) => (
      <div data-mode="on-brand" className="stepper-story__stage">
        <Story />
      </div>
    ),
  ],
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Stepper 879:293).
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=879-293',
    },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'Stepper — `<ol>` progress on the plum stage (On brand mode set on the component); citron = complete. Charge-up motion in code.\n\n' +
          'Shows where you are in the four-step wizard: Vendors · Brands · Presets · Review. It sits on the plum stage between the Focus header and the card, 960 wide and aligned to the card. ' +
          'Steps before `currentStep` are complete (citron check and line, with a soft glow), the current step has a citron ring, and the rest are small dots. ' +
          'It isn\'t interactive: Back and Edit move between steps. Screen readers hear "Progress" navigation, a list of four, the current step, and ", completed" on done steps.',
      },
    },
  },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

/* ---------- One story per Figma variant ---------- */

export const Step1: Story = { name: 'Step 1', args: { currentStep: 1 } }
export const Step2: Story = { name: 'Step 2', args: { currentStep: 2 } }
export const Step3: Story = { name: 'Step 3', args: { currentStep: 3 } }
export const Step4: Story = { name: 'Step 4', args: { currentStep: 4 } }

/* ---------- All states: the four variants stacked ---------- */

export const AllSteps: Story = {
  name: 'All steps',
  render: () => (
    <>
      {([1, 2, 3, 4] as const).map((step) => (
        <div key={step}>
          <p className="type-label-sm stepper-story__caption">Current step = {step}</p>
          <Stepper currentStep={step} />
        </div>
      ))}
    </>
  ),
  parameters: {
    controls: { disable: true },
    // Four "Progress" navs on one canvas is a story-only artifact: a real page has one.
    a11y: {
      config: {
        rules: [{ id: 'landmark-unique', enabled: false }],
      },
    },
    docs: {
      description: {
        story: 'The four Figma variants. Every node, line and label state appears at least once: complete, in progress and not started.',
      },
    },
  },
}
