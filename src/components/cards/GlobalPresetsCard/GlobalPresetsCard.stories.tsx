import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarDate } from '@internationalized/date'
import { expect, userEvent, waitFor, within } from 'storybook/test'
import { initialPresets, presetsSetCount, type GlobalPresetsValue } from '../../../data/presets'
import { GlobalPresetsCard } from './GlobalPresetsCard'
// Raw import: the Docs page shows the spec and updates whenever it changes.
import spec from '../../../../design/specs/global-presets-card.md?raw'

// Stories freeze today at Oct 17, 2026, as in Figma.
const today = new CalendarDate(2026, 10, 17)

const meta = {
  title: 'Cards/GlobalPresetsCard',
  component: GlobalPresetsCard,
  args: { value: initialPresets, onChange: () => {}, today },
  // Controlled card; each story keeps the value in local state and shows Review's "N of 3".
  render: function Render(args) {
    const [value, setValue] = useState<GlobalPresetsValue>(args.value)
    return (
      <div style={{ display: 'grid', gap: 'var(--space-12)' }}>
        <GlobalPresetsCard {...args} value={value} onChange={setValue} />
        <p className="type-body-sm" style={{ margin: 0, color: 'var(--text-subtle)' }}>
          Presets set (for Review): {presetsSetCount(value)} of 3
        </p>
      </div>
    )
  },
  parameters: {
    layout: 'padded',
    // Shown on the Docs page below the stories (.storybook/DocsPage.tsx).
    spec,
    // Design tab: the main component in Figma (Global presets card 791:2631).
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=791-2631',
    },
    docs: {
      description: {
        component:
          // Figma component description, verbatim.
          'GlobalPresetsCard — step 3: three fieldsets (Effective date, Currency, Pricing model).\n\n' +
          'Step 3 of the wizard, optional (Next is never blocked): three presets side by side, each starting at "No default". ' +
          'Effective date can be next month, next quarter or a custom date from the Date picker. ' +
          'The title reads "Add pricing defaults, optional". Today is frozen at Oct 17, 2026 in these stories.',
      },
    },
  },
} satisfies Meta<typeof GlobalPresetsCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { parameters: { docs: { description: { story: 'Figma 03a: everything at No default.' } } } }

export const DatePickerOpen: Story = {
  name: 'Date picker open',
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByText('Custom date'))
  },
  parameters: { docs: { description: { story: 'Figma 03b: Custom date chosen, the picker open under it.' } } },
}

export const CustomDateSet: Story = {
  name: 'Custom date set',
  args: { value: { ...initialPresets, effectiveDate: { source: 'custom', date: new CalendarDate(2026, 10, 28) } } },
  parameters: { docs: { description: { story: 'Figma 03c: Oct 28, 2026 confirmed.' } } },
}

/* ---------- Interaction test (runs with npm run test-storybook) ---------- */

export const FlowPresets: Story = {
  name: 'Flow: pick, cancel, confirm',
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // The picker renders in a portal, outside the canvas.
    const page = within(canvasElement.ownerDocument.body)
    // Pick a currency.
    await userEvent.click(canvas.getByText('USD'))
    await expect(canvas.getByRole('radio', { name: 'USD' })).toBeChecked()
    // Custom date opens the picker; Esc cancels and goes back to No default.
    await userEvent.click(canvas.getByText('Custom date'))
    await expect(await page.findByRole('dialog', { name: 'Choose custom date' })).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(page.queryByRole('dialog')).not.toBeInTheDocument())
    await expect(canvas.getAllByRole('radio', { name: 'No default' })[0]).toBeChecked()
    // Again, then Enter on the first available day (Oct 18; today is the 17th) and OK.
    await userEvent.click(canvas.getByText('Custom date'))
    await page.findByRole('dialog', { name: 'Choose custom date' })
    await userEvent.keyboard('{Enter}')
    await userEvent.click(page.getByRole('button', { name: 'OK' }))
    await waitFor(() => expect(page.queryByRole('dialog')).not.toBeInTheDocument())
    await expect(canvas.getByRole('radio', { name: 'Custom date' })).toBeChecked()
    await expect(canvas.getByText('Oct 18, 2026')).toBeInTheDocument()
    await expect(canvas.getByRole('status')).toHaveTextContent('Effective date set to October 18, 2026')
  },
  parameters: { docs: { description: { story: 'Automated: pick USD, open and cancel the date picker, then confirm Oct 18, 2026 with Enter and OK.' } } },
}
