import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { currencyOptions, NO_DEFAULT, pricingModelOptions } from '../../../data/presets'
import { PresetFieldset } from './PresetFieldset'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/preset-fieldset.md?raw'

const meta = {
  title: 'Molecules/PresetFieldset',
  component: PresetFieldset,
  args: { title: 'Currency', helper: 'Choose which currency to use.', options: currencyOptions, value: NO_DEFAULT, onChange: () => {} },
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return (
      <div style={{ width: 282 }}>
        <PresetFieldset {...args} value={value} onChange={setValue} />
      </div>
    )
  },
  parameters: {
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the Currency preset in Figma (796:2752); Pricing model preset is 796:2785.
    design: { type: 'figma', url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=796-2752' },
    docs: {
      description: {
        component:
          // Figma component descriptions, verbatim.
          'CurrencyPreset — fieldset + legend of Option tiles.\n\nPricingModelPreset — fieldset + legend of Option tiles (names are placeholders).\n\n' +
          'One step 3 preset: a radio group of Option tiles under a plum top edge, titled and described by its helper. "No default" is the starting choice. ' +
          'One Tab stop per group; arrow keys move the choice. Currency and Pricing model are the same component with different options (in `src/data/presets.ts`).',
      },
    },
  },
} satisfies Meta<typeof PresetFieldset>

export default meta
type Story = StoryObj<typeof meta>

export const Currency: Story = {}

export const PricingModel: Story = {
  name: 'Pricing model',
  args: { title: 'Pricing model', helper: 'Choose how prices are calculated.', options: pricingModelOptions },
  parameters: { docs: { description: { story: 'The three model names are placeholders, kept in data.' } } },
}
