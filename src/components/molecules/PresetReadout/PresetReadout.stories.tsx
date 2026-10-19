import type { Meta, StoryObj } from '@storybook/react-vite'
import { PresetReadout } from './PresetReadout'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/preset-readout.md?raw'

const meta = {
  title: 'Molecules/PresetReadout',
  component: PresetReadout,
  args: { label: 'Effective date', value: 'Nov 1, 2026' },
  // A readout is a dt / dd pair, so it sits in a description list.
  decorators: [(Story) => <dl style={{ width: 304, margin: 0 }}><Story /></dl>],
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Preset readout 843:3144).
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=843-3144' },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'PresetReadout — label over value; "No default" in text-subtle.\n\n' +
          'One preset in Review\'s Global presets strip: a quiet label over its value in Body/LG Strong, or "Decide later · Fill in per row" in subtle text, as on step 3 (step 4 review, Oct 19). Not interactive.',
      },
    },
  },
} satisfies Meta<typeof PresetReadout>

export default meta
type Story = StoryObj<typeof meta>

export const Set: Story = {}
export const DecideLater: Story = { name: 'Decide later', args: { label: 'Pricing model', value: null } }
