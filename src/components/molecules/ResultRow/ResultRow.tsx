import { ListBoxItem, type ListBoxItemProps } from 'react-aria-components'
import { CheckboxBox } from '../../atoms/Checkbox'
import { Icon } from '../../atoms/Icon'
import { VendorLogo } from '../../atoms/VendorLogo'
import './ResultRow.css'

export type ResultRowSelect = 'single' | 'multi'

export interface ResultRowProps extends Omit<ListBoxItemProps, 'children' | 'className' | 'style' | 'textValue'> {
  /** Vendor name (single) or brand name (multi). */
  name: string
  /** Single: ESN, "DEMO-0022". */
  meta?: string
  /** Single: for the Vendor logo. */
  wordmark?: string
  /** Multi: shown as "SKUs: 4", read as "4 SKUs". */
  skuCount?: number
  /** Multi: the brand's vendor. Not shown; read after the name, because the section label is skipped
      when the row is reached with aria-activedescendant ("Diamond Crystal, Cargill, 4 SKUs"). */
  vendor?: string
  /** Bolds the matched part of the name. */
  query?: string
  /** single = vendor search (logo, ESN, "Selected"); multi = brand list (checkbox, SKU count). */
  select?: ResultRowSelect
  /** Forces a state for the "All states" story only. Never set it in product code. */
  'data-state'?: 'hover' | 'keyboard' | 'pressed'
}

/*
  An option in the Results panel's listbox. Selection, hover, press and keyboard
  highlight come from React Aria: [data-selected], [data-hovered], [data-pressed], [data-focus-visible].
*/
export function ResultRow({ name, meta = '', wordmark = '', skuCount = 0, vendor, query, select = 'single', 'data-state': state, ...rest }: ResultRowProps) {
  return (
    <ListBoxItem
      {...rest}
      textValue={name}
      className={`result-row result-row--${select}`}
      data-state={state}
    >
      {({ isSelected, isPressed }) =>
        select === 'multi' ? (
          <>
            {/* Decoration only: the row is the option and carries aria-selected. Pressed shows checked. */}
            <CheckboxBox checked={isSelected || isPressed || state === 'pressed'} />
            <span className="result-row__name" title={name}>
              <Highlight text={name} query={query} />
            </span>
            {vendor && <span className="visually-hidden">{`, ${vendor}`}</span>}
            {/* Read as "Truvia, Cargill, 4 SKUs"; shown as "SKUs: 4". */}
            <span className="visually-hidden">{`, ${skuCount} ${skuCount === 1 ? 'SKU' : 'SKUs'}`}</span>
            <span className="result-row__meta type-data-sm" aria-hidden="true">
              SKUs: {skuCount}
            </span>
          </>
        ) : (
        <>
          <VendorLogo vendor={name} wordmark={wordmark} isSelected={isSelected || isPressed || state === 'pressed'} />
          {/* One line with an ellipsis; the full name in the tooltip. */}
          <span className="result-row__name" title={name}>
            <Highlight text={name} query={query} />
          </span>
          {/* The accessible name comes from the text: "Cargill, DEMO-0022" (selection is aria-selected). */}
          <span className="visually-hidden">, </span>
          {/* Once added, "Selected" replaces the ESN on screen; screen readers still get the ESN. */}
          <span className={isSelected ? 'visually-hidden' : 'result-row__meta type-data-sm'}>{meta}</span>
          {isSelected && (
            <span className="result-row__selected" aria-hidden="true">
              <Icon name="check-circle" size={16} filled />
              <span className="type-label-sm">Selected</span>
            </span>
          )}
        </>
        )
      }
    </ListBoxItem>
  )
}

/** Bolds the first match of the query in the name (not drawn in Figma; spec flag 3). */
function Highlight({ text, query }: { text: string; query?: string }) {
  const q = query?.trim()
  const start = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1
  if (!q || start < 0) return <>{text}</>

  return (
    <>
      {text.slice(0, start)}
      <mark className="result-row__match">{text.slice(start, start + q.length)}</mark>
      {text.slice(start + q.length)}
    </>
  )
}
