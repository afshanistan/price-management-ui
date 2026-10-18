import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { vendors, type Vendor } from '../../../data/vendors'
import { mockVendors } from '../../../data/mockVendors'
import { SelectVendorsCard } from '../../cards/SelectVendorsCard'
import { MainNavigation } from '../../navigation/MainNavigation'
import { Stepper } from '../../navigation/Stepper'
import { WizardNavigation } from '../../navigation/WizardNavigation'
import { WizardLayout } from './WizardLayout'

/* Step 1 as the app shows it: real header, stepper, card and footer. No wizard state yet. */
function Step1({ initial = [], list = vendors }: { initial?: Vendor[]; list?: Vendor[] }) {
  const [selected, setSelected] = useState<Vendor[]>(initial)
  return (
    <WizardLayout
      header={<MainNavigation variant="focus" onExit={() => {}} />}
      stepper={<Stepper currentStep={1} />}
      footer={
        <WizardNavigation
          next={{ label: 'Select brands', onPress: () => {} }}
          canContinue={selected.length > 0}
          hint="Add at least one vendor to continue."
        />
      }
    >
      <SelectVendorsCard vendors={list} selected={selected} onChange={setSelected} />
    </WizardLayout>
  )
}

const meta = {
  title: 'Layouts/WizardLayout',
  component: WizardLayout,
  parameters: {
    a11y: {
      // The Results panel scrolls past 6 results; it's reached via arrow keys from the search (aria-activedescendant), which axe can't detect. Answered Oct 18.
      config: { rules: [{ id: 'scrollable-region-focusable', enabled: false }] },
    },
    layout: 'fullscreen',
    // Design tab: no Layouts component in Figma yet, so this links the Final Comps screen 01a (879:4657).
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/Iz1cbfAMKHnHopr6wgXZCa/Screens---Price-Managment?node-id=879-4657',
    },
    docs: {
      description: {
        component:
          'WizardLayout — the Template Builder page shell (no Figma component yet; built from the Final Comps).\n\n' +
          'Focus header (56) → plum stage with the stepper band (80) → `<main>` with the step\'s card, fixed at 644 in the 960 column, its content scrolling inside → 24 → wizard footer, outside `<main>`. ' +
          'The layout only places its four slots; the header, stepper and footer render their own landmarks.',
      },
    },
  },
} satisfies Meta<typeof WizardLayout>

export default meta
type Story = StoryObj<typeof meta>

const placeholderArgs = { header: null, stepper: null, children: null, footer: null }

export const Step1Empty: Story = {
  name: 'Step 1 (empty)',
  args: placeholderArgs,
  render: () => <Step1 />,
  // Landmarks (code-backlog Rule ID 4): one banner, one Progress nav, one main, one footer outside main, one H1.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const main = canvas.getByRole('main')
    await expect(canvas.getByRole('banner')).toBeInTheDocument()
    await expect(canvas.getByRole('navigation', { name: 'Progress' })).toBeInTheDocument()
    await expect(canvas.getByRole('contentinfo')).toBeInTheDocument()
    await expect(main).not.toContainElement(canvas.getByRole('contentinfo'))
    await expect(canvas.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    // The card is the fixed 644 frame, whatever its content.
    await expect(main.querySelector('.wizard-layout__card')!.getBoundingClientRect().height).toBe(644)
  },
  parameters: { docs: { description: { story: 'Final Comps 01a: no vendors yet, Next blocked with its hint.' } } },
}

export const Step1Selected: Story = {
  name: 'Step 1 (all vendors)',
  args: placeholderArgs,
  render: () => <Step1 initial={vendors} />,
  // Only the selected vendors grid scrolls; the card, its title and search stay put.
  play: async ({ canvasElement }) => {
    const card = canvasElement.querySelector<HTMLElement>('.wizard-layout__card > *')!
    const grid = within(canvasElement).getByRole('list', { name: /Selected vendors/ })
    await expect(card.scrollHeight).toBe(card.clientHeight)
    await expect(grid.scrollHeight).toBeGreaterThan(grid.clientHeight)
  },
  parameters: {
    docs: { description: { story: 'All 7 sample vendors: the card stays 644; only the selected vendors grid scrolls, under its label. The footer doesn\'t move.' } },
  },
}

/* ---------- Pressure test: the 60 mock vendors (src/data/mockVendors.ts) ---------- */

export const MockSearch: Story = {
  name: 'Mock: 60 vendors, search',
  args: placeholderArgs,
  render: () => <Step1 list={mockVendors} />,
  parameters: { docs: { description: { story: '60 real suppliers to search: try "co", "del monte", "foods", or part of an 8-digit ESN.' } } },
}

export const MockCrowded: Story = {
  name: 'Mock: 25 selected',
  args: placeholderArgs,
  render: () => <Step1 list={mockVendors} initial={mockVendors.slice(0, 25)} />,
  parameters: { docs: { description: { story: '25 vendors in the template: long names, 4-letter wordmarks, near-duplicates side by side.' } } },
}

const typeInSearch = (text: string): Story['play'] => async ({ canvasElement }) => {
  await userEvent.type(within(canvasElement).getByRole('searchbox', { name: 'Vendor name or ESN' }), text)
  // React Aria moves the highlight 500ms after typing (so screen readers finish the letter); let it settle before axe runs.
  await new Promise((resolve) => setTimeout(resolve, 600))
}

export const MockSearchCo: Story = {
  name: 'Mock: search "co" (17 results)',
  args: placeholderArgs,
  render: () => <Step1 list={mockVendors} />,
  play: typeInSearch('co'),
}

export const MockSearchDelMonte: Story = {
  name: 'Mock: search "del monte" (near-duplicates)',
  args: placeholderArgs,
  render: () => <Step1 list={mockVendors} />,
  play: typeInSearch('del monte'),
}

export const MockSearchNestle: Story = {
  name: 'Mock: search "nestle" (no accent)',
  args: placeholderArgs,
  render: () => <Step1 list={mockVendors} />,
  play: typeInSearch('nestle'),
}
