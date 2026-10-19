/*
  SCRATCH — throwaway exploration for the step 2 design review (Oct 19). Not part of the library.
  Group header ideas for the Brand list: fill, name type/color, select-all placement, collapse.
  Delete this folder once Will decides; the winner gets built into GroupHeader / BrandList properly.
  Fills borrow existing tokens that already point at the right teal (no new tokens for a throwaway).
*/
import { useEffect, useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox as AriaCheckbox, ListBox, type Selection } from 'react-aria-components'
import { Checkbox, CheckboxBox } from '../components/atoms/Checkbox'
import { Icon } from '../components/atoms/Icon'
import { ResultRow } from '../components/molecules/ResultRow'
import { TextField } from '../components/molecules/TextField'
import { findMatch } from '../data/search'
import { mockBrands } from '../data/mockBrands'
import './GroupHeaderExplorations.css'

type Fill = 'current' | 'teal-100' | 'teal-100-rule' | 'teal-50'
type TypeStyle = 'current' | 'T1' | 'T2'
type NameColor = 'plum' | 'C1' | 'C2'
type SelectAll = 'P1' | 'P2' | 'P3' | 'P4'

interface Look {
  fill: Fill
  type: TypeStyle
  color: NameColor
  selectAll: SelectAll
}

const vendors = [
  { id: 'general-mills', name: 'General Mills', preselected: 3 },
  { id: 'kraft-heinz', name: 'Kraft Heinz', preselected: 0 },
  { id: 'mars', name: 'Mars, Incorporated', preselected: 15 },
]

const brandsOf = (vendorId: string) => mockBrands.filter((b) => b.vendorId === vendorId)

function initialSelection() {
  const ids = new Set<string>()
  for (const v of vendors) brandsOf(v.id).slice(0, v.preselected).forEach((b) => ids.add(b.id))
  return ids
}

function ScratchList({ look, label }: { look: Look; label: string }) {
  const [selected, setSelected] = useState<Set<string>>(initialSelection)
  const [open, setOpen] = useState<Set<string>>(() => new Set([vendors[0].id]))

  const toggleOpen = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  return (
    <figure className="scratch-variant">
      <figcaption className="scratch-variant__label">{label}</figcaption>
      <div className="scratch-list" data-fill={look.fill} data-type={look.type} data-color={look.color}>
        {vendors.map((vendor) => {
          const brands = brandsOf(vendor.id)
          const count = brands.filter((b) => selected.has(b.id)).length
          const checked = count === 0 ? false : count === brands.length ? true : ('mixed' as const)
          const isOpen = open.has(vendor.id)
          const panelId = `${label}-${vendor.id}`.replace(/\W+/g, '-')

          const selectAll = () =>
            setSelected((prev) => {
              const next = new Set(prev)
              if (checked === true) brands.forEach((b) => next.delete(b.id))
              else brands.forEach((b) => next.add(b.id))
              return next
            })

          const onRows = (keys: Selection) =>
            setSelected((prev) => {
              const next = new Set(prev)
              brands.forEach((b) => next.delete(b.id))
              const picked = keys === 'all' ? brands.map((b) => b.id) : [...keys].map(String)
              picked.forEach((id) => next.add(id))
              return next
            })

          return (
            <section key={vendor.id} className="scratch-group">
              <div className="scratch-header" data-open={isOpen || undefined}>
                {look.selectAll === 'P1' && (
                  <Checkbox
                    className="scratch-header__check"
                    aria-label={`Select all ${vendor.name} brands`}
                    isSelected={checked === true}
                    isIndeterminate={checked === 'mixed'}
                    onChange={selectAll}
                  />
                )}
                {look.selectAll === 'P4' && (
                  <AriaCheckbox
                    className="checkbox scratch-header__check scratch-labelled-check"
                    aria-label={`All ${vendor.name} brands`}
                    isSelected={checked === true}
                    isIndeterminate={checked === 'mixed'}
                    onChange={selectAll}
                  >
                    {({ isSelected, isIndeterminate }) => (
                      <>
                        <CheckboxBox checked={isIndeterminate ? 'mixed' : isSelected} />
                        <span className="scratch-labelled-check__text type-label-sm">All</span>
                      </>
                    )}
                  </AriaCheckbox>
                )}
                <button
                  type="button"
                  className="scratch-header__toggle"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleOpen(vendor.id)}
                >
                  <span className="scratch-header__name">{vendor.name}</span>
                  <span className="scratch-header__count type-body-sm">
                    {count} of {brands.length}
                  </span>
                </button>
                {look.selectAll === 'P2' && (
                  <AriaCheckbox
                    className="checkbox scratch-header__check scratch-labelled-check"
                    aria-label={`Select all ${vendor.name} brands`}
                    isSelected={checked === true}
                    isIndeterminate={checked === 'mixed'}
                    onChange={selectAll}
                  >
                    {({ isSelected, isIndeterminate }) => (
                      <>
                        <CheckboxBox checked={isIndeterminate ? 'mixed' : isSelected} />
                        <span className="scratch-labelled-check__text type-label-md">Select all</span>
                      </>
                    )}
                  </AriaCheckbox>
                )}
                <span className="scratch-header__caret" aria-hidden="true">
                  <Icon name="chevron-right" size={16} />
                </span>
              </div>

              {isOpen && (
                <div id={panelId}>
                  {look.selectAll === 'P3' && (
                    <AriaCheckbox
                      className="checkbox scratch-selectall-row"
                      isSelected={checked === true}
                      isIndeterminate={checked === 'mixed'}
                      onChange={selectAll}
                    >
                      {({ isSelected, isIndeterminate }) => (
                        <>
                          <CheckboxBox checked={isIndeterminate ? 'mixed' : isSelected} />
                          <span className="type-label-lg">Select all {brands.length} brands</span>
                        </>
                      )}
                    </AriaCheckbox>
                  )}
                  <ListBox
                    aria-label={`${vendor.name} brands`}
                    selectionMode="multiple"
                    selectedKeys={new Set(brands.filter((b) => selected.has(b.id)).map((b) => b.id))}
                    onSelectionChange={onRows}
                  >
                    {brands.map((b) => (
                      <ResultRow key={b.id} id={b.id} select="multi" name={b.name} vendor={vendor.name} skuCount={b.skuCount} />
                    ))}
                  </ListBox>
                </div>
              )}
            </section>
          )
        })}
      </div>
    </figure>
  )
}

const meta = {
  title: 'Scratch/Group header explorations',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Throwaway exploration for the step 2 design review. Each row changes one thing and holds the rest. ' +
          'General Mills starts open; click a header to open or close it. Hover the rows to compare the row hover with the header fill.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<Look>

const fillLabels: Record<Fill, string> = {
  current: 'Current: white + plum rule',
  'teal-100': '1 · Teal/100 (= row hover)',
  'teal-100-rule': '2 (a) · Teal/100 + dark teal rule',
  'teal-50': '3 (b) · Teal/50, hover stays Teal/100',
}

const typeLabels: Record<TypeStyle, string> = {
  current: 'Label/MD 13 medium',
  T1: 'T1 · Label/LG 14 medium',
  T2: 'T2 · Body/LG Strong 16 semibold',
}

const colorLabels: Record<NameColor, string> = {
  plum: 'plum',
  C1: 'C1 · neutral dark',
  C2: 'C2 · dark teal',
}

const selectAllLabels: Record<SelectAll, string> = {
  P1: 'P1 · left checkbox, no label (as now)',
  P2: 'P2 · right, "Select all" before the caret',
  P3: 'P3 · first row inside the open group',
  P4: 'P4 · left checkbox + "All"',
}

const fillControl = {
  control: 'select' as const,
  options: ['current', 'teal-100', 'teal-100-rule', 'teal-50'],
  labels: fillLabels,
}

/** Row 1: the four fills. Current name style (plum Label/MD) and current select all (P1). */
export const Fill: Story = {
  render: () => (
    <div className="scratch-grid">
      {(Object.keys(fillLabels) as Fill[]).map((fill) => (
        <ScratchList key={fill} label={fillLabels[fill]} look={{ fill, type: 'current', color: 'plum', selectAll: 'P1' }} />
      ))}
    </div>
  ),
}

/** Row 2: name size × color on one fill (switch it in Controls). Select all P1. */
export const NameType: Story = {
  args: { fill: 'teal-100-rule' },
  argTypes: { fill: fillControl },
  render: ({ fill }) => (
    <div className="scratch-grid">
      {(['T1', 'T2'] as TypeStyle[]).flatMap((type) =>
        (['C1', 'C2'] as NameColor[]).map((color) => (
          <ScratchList
            key={`${type}-${color}`}
            label={`${typeLabels[type]} · ${colorLabels[color]}`}
            look={{ fill, type, color, selectAll: 'P1' }}
          />
        )),
      )}
    </div>
  ),
}

/** Row 3: select-all placement on one fill and name style (switch them in Controls). */
export const SelectAllPlacement: Story = {
  args: { fill: 'teal-100-rule', type: 'T1', color: 'C1' },
  argTypes: {
    fill: fillControl,
    type: { control: 'select', options: ['current', 'T1', 'T2'], labels: typeLabels },
    color: { control: 'select', options: ['plum', 'C1', 'C2'], labels: colorLabels },
  },
  render: ({ fill, type, color }) => (
    <div className="scratch-grid">
      {(Object.keys(selectAllLabels) as SelectAll[]).map((selectAll) => (
        <ScratchList key={selectAll} label={selectAllLabels[selectAll]} look={{ fill, type, color, selectAll }} />
      ))}
    </div>
  ),
}

/* ---------- Proposed layout (round 2): Will's order vs Claude's, with search ---------- */

type ClusterOrder = 'will' | 'claude' | 'will-v2'

const proposedVendors = [
  { id: 'coca-cola', name: 'The Coca-Cola Company', preselected: 20 },
  { id: 'coca-cola-consolidated', name: 'Coca-Cola Consolidated', preselected: 2 },
  { id: 'general-mills', name: 'General Mills', preselected: 3 },
  { id: 'kraft-heinz', name: 'The Kraft Heinz Company', preselected: 0 },
  { id: 'tillamook', name: 'Tillamook County Creamery Association', preselected: 0 },
]

function proposedInitialSelection() {
  const ids = new Set<string>()
  for (const v of proposedVendors) brandsOf(v.id).slice(0, v.preselected).forEach((b) => ids.add(b.id))
  return ids
}

/** "3 of 19" with a small tick when the number changes (not on first render). */
function TickingCount({ count, total }: { count: number; total: number }) {
  const [tick, setTick] = useState(0)
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    setTick((t) => t + 1)
  }, [count])
  return (
    <span key={tick} className="proposed-count type-body-sm" data-tick={tick > 0 || undefined} aria-live="polite">
      {count} of {total}
    </span>
  )
}

function ProposedList({ order, query, label }: { order: ClusterOrder; query: string; label: string }) {
  const [selected, setSelected] = useState<Set<string>>(proposedInitialSelection)
  // Default open: the first vendor with no brands yet.
  const [open, setOpen] = useState<Set<string>>(() => {
    const first = proposedVendors.find((v) => v.preselected === 0)
    return new Set(first ? [first.id] : [])
  })
  const searching = query.trim() !== ''

  return (
    <figure className="scratch-variant">
      <figcaption className="scratch-variant__label">{label}</figcaption>
      <div className="scratch-list proposed-list" data-fill="teal-100-rule">
        {proposedVendors.map((vendor) => {
          const all = brandsOf(vendor.id)
          const visible = searching ? all.filter((b) => findMatch(b.name, query.trim())) : all
          if (visible.length === 0) return null

          const count = all.filter((b) => selected.has(b.id)).length
          // Select all acts on the visible brands (all of them, or the matches while searching).
          const visibleSelected = visible.filter((b) => selected.has(b.id)).length
          const checked = visibleSelected === 0 ? false : visibleSelected === visible.length ? true : ('mixed' as const)
          // While searching, every group with matches opens; clearing returns to the manual state.
          const isOpen = searching || open.has(vendor.id)
          const panelId = `${label}-${vendor.id}`.replace(/\W+/g, '-')
          const actionText = searching ? `Select ${visible.length} ${visible.length === 1 ? 'match' : 'matches'}` : 'Select all'

          const toggleOpen = () =>
            setOpen((prev) => {
              const next = new Set(prev)
              if (next.has(vendor.id)) next.delete(vendor.id)
              else next.add(vendor.id)
              return next
            })

          const selectAll = () =>
            setSelected((prev) => {
              const next = new Set(prev)
              if (checked === true) visible.forEach((b) => next.delete(b.id))
              else visible.forEach((b) => next.add(b.id))
              return next
            })

          const onRows = (keys: Selection) =>
            setSelected((prev) => {
              const next = new Set(prev)
              visible.forEach((b) => next.delete(b.id))
              const picked = keys === 'all' ? visible.map((b) => b.id) : [...keys].map(String)
              picked.forEach((id) => next.add(id))
              return next
            })

          const checkbox = (
            <AriaCheckbox
              className="checkbox proposed-check"
              aria-label={searching ? `${actionText} in ${vendor.name}` : `Select all ${vendor.name} brands`}
              isSelected={checked === true}
              isIndeterminate={checked === 'mixed'}
              onChange={selectAll}
            >
              {({ isSelected, isIndeterminate }) => (
                <>
                  {order === 'will' && <span className="proposed-check__text type-label-md">{actionText}</span>}
                  <CheckboxBox checked={isIndeterminate ? 'mixed' : isSelected} />
                  {order !== 'will' && <span className="proposed-check__text type-label-md">{actionText}</span>}
                </>
              )}
            </AriaCheckbox>
          )

          return (
            <section key={vendor.id} className="scratch-group">
              <div className="scratch-header proposed-header" data-open={isOpen || undefined}>
                <button
                  type="button"
                  className="scratch-header__toggle"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  disabled={searching}
                  onClick={toggleOpen}
                >
                  <span className="scratch-header__name proposed-name">{vendor.name}</span>
                  {order === 'will-v2' && <TickingCount count={count} total={all.length} />}
                </button>
                {/* No-collapse zone: clicks here never open or close the group. */}
                <div className="proposed-cluster" data-order={order}>
                  {order === 'claude' && <TickingCount count={count} total={all.length} />}
                  {checkbox}
                  {order === 'will' && <TickingCount count={count} total={all.length} />}
                </div>
                <span className="scratch-header__caret proposed-caret" aria-hidden="true">
                  <Icon name="chevron-right" size={16} />
                </span>
              </div>

              {isOpen && (
                <ListBox
                  id={panelId}
                  aria-label={`${vendor.name} brands`}
                  selectionMode="multiple"
                  selectedKeys={new Set(visible.filter((b) => selected.has(b.id)).map((b) => b.id))}
                  onSelectionChange={onRows}
                >
                  {visible.map((b) => (
                    <ResultRow key={b.id} id={b.id} select="multi" name={b.name} vendor={vendor.name} skuCount={b.skuCount} query={query.trim()} />
                  ))}
                </ListBox>
              )}
            </section>
          )
        })}
      </div>
    </figure>
  )
}

/**
 * Round 2: fill (a), name T2 neutral dark, cluster right-aligned before the caret.
 * Will's order (Select all ☐ count), Claude's (count ☐ Select all), and Will v2, the chosen one:
 * name + count on the left, ☐ Select all + caret on the right (built into GroupHeader, Oct 19).
 * Kraft Heinz starts open (first vendor with no brands). Try searching "sprite" or "coca".
 */
export const ProposedLayout: Story = {
  render: function Render() {
    const [query, setQuery] = useState('')
    return (
      <div className="proposed-stage">
        <TextField label="Search by brand" placeholder="Search brands" leadingIcon="search" value={query} onChange={setQuery} />
        <div className="scratch-grid proposed-grid">
          <ProposedList order="will" query={query} label="Will · name … Select all ☐ 3 of 19  ⌄" />
          <ProposedList order="claude" query={query} label="Claude · name … 3 of 19  ☐ Select all  ⌄" />
          <ProposedList order="will-v2" query={query} label="Will v2 (chosen) · name 3 of 19 … ☐ Select all  ⌄" />
        </div>
      </div>
    )
  },
}
