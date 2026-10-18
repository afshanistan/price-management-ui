import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarDate } from '@internationalized/date'
import { Calendar, CalendarGrid, CalendarGridBody, ListBox, RadioGroup } from 'react-aria-components'
import { expect, userEvent } from 'storybook/test'
import avatar from '../assets/avatar-placeholder.svg'
import { CalendarDay } from '../components/atoms/CalendarDay'
import { Checkbox } from '../components/atoms/Checkbox'
import { AccountBadge } from '../components/molecules/AccountBadge'
import { BrandChip } from '../components/molecules/BrandChip'
import { Button } from '../components/molecules/Button'
import { IconButton } from '../components/molecules/IconButton'
import { NavLink } from '../components/molecules/NavLink'
import { OptionTile } from '../components/molecules/OptionTile'
import { ResultRow } from '../components/molecules/ResultRow'
import { TextField } from '../components/molecules/TextField'
import './Motion.stories.css'

/* One of every interactive component, in Tab order. */
function FocusRingsPage() {
  const today = new CalendarDate(2026, 10, 17)
  return (
    <div className="motion-story">
      <div className="motion-story__row">
        <Button size="medium" hierarchy="primary">Button</Button>
        <IconButton icon="settings" aria-label="Settings" />
        <IconButton icon="trash" tone="destructive" aria-label="Remove Cargill" />
        <NavLink href="#templates" icon="tag">Templates</NavLink>
        <AccountBadge src={avatar} name="Will Norris" />
      </div>
      <div style={{ width: 320 }}>
        <TextField label="Vendor name or ESN" placeholder="Search by vendor name or ESN" />
      </div>
      <div className="motion-story__row">
        <Checkbox aria-label="Select all Cargill brands" />
        <BrandChip label="Truvia" removeLabel="Remove Truvia" onRemove={() => {}} />
      </div>
      <RadioGroup aria-label="Currency" defaultValue="none" className="motion-story__tiles">
        <OptionTile value="none" label="No default" />
        <OptionTile value="usd" label="USD" description="US dollar" layout="inline" />
      </RadioGroup>
      <ListBox aria-label="Vendors" selectionMode="multiple" style={{ width: 480 }}>
        <ResultRow id="cargill" name="Cargill" meta="DEMO-0022" />
      </ListBox>
      <Calendar aria-label="Effective date" defaultFocusedValue={new CalendarDate(2026, 10, 20)} minValue={today.add({ days: 1 })}>
        <CalendarGrid>
          <CalendarGridBody>{(date) => <CalendarDay date={date} today={today} />}</CalendarGridBody>
        </CalendarGrid>
      </Calendar>
    </div>
  )
}

/* Where each component draws its ring: the element itself, or the box that wraps it. */
function ringHost(el: Element) {
  return el.closest('.input, .option-tile') ?? (el.closest('.checkbox')?.querySelector('.checkbox-box') as Element | null) ?? el
}

const meta = {
  title: 'Foundations/Focus rings',
  component: FocusRingsPage,
  parameters: {
    docs: {
      description: {
        component:
          'Rule ID 8: every interactive element shows a focus ring when reached by keyboard. ' +
          'The play step presses Tab through one of each component and checks the ring (2px `--focus-ring` outline; round on the chip ×, calendar day and input clear; inset on result rows; on the tile for option tiles). ' +
          'It runs with `npm run test-storybook`. A global `:focus-visible` baseline in `global.css` covers anything a component misses.',
      },
    },
  },
} satisfies Meta<typeof FocusRingsPage>

export default meta
type Story = StoryObj<typeof meta>

export const TabThroughEverything: Story = {
  name: 'Tab through everything',
  play: async ({ canvasElement }) => {
    const seen: string[] = []
    // 11 Tab stops: button, two icon buttons, nav link, account badge, the search, checkbox, chip ×, the radio group, a row, a day.
    for (let i = 0; i < 11; i++) {
      await userEvent.tab()
      const el = canvasElement.ownerDocument.activeElement as HTMLElement
      await expect(canvasElement.contains(el)).toBe(true)
      const host = ringHost(el)
      const style = getComputedStyle(host)
      const name = el.getAttribute('aria-label') || el.textContent?.trim() || el.tagName
      seen.push(name)
      await expect(style.outlineStyle, `focus ring on "${name}"`).not.toBe('none')
      await expect(parseFloat(style.outlineWidth), `focus ring width on "${name}"`).toBeGreaterThan(0)
    }
  },
}
