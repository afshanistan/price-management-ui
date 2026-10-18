import { ListBoxItem, type ListBoxItemProps } from 'react-aria-components'
import { Icon } from '../../atoms/Icon'
import { VendorLogo } from '../../atoms/VendorLogo'
import './ResultRow.css'

export type ResultRowSelect = 'single'

export interface ResultRowProps extends Omit<ListBoxItemProps, 'children' | 'className' | 'style' | 'textValue'> {
  /** Vendor name. */
  name: string
  /** ESN, "DEMO-0022". */
  meta: string
  /** For the Vendor logo. */
  wordmark: string
  /** Bolds the matched part of the name. */
  query?: string
  /** Only `single` (vendor search) for now; `multi` comes with the Checkbox spec in step 2. */
  select?: ResultRowSelect
  /** Forces a state for the "All states" story only. Never set it in product code. */
  'data-state'?: 'hover' | 'keyboard' | 'pressed'
}

/*
  An option in the Results panel's listbox. Selection, hover, press and keyboard
  highlight come from React Aria: [data-selected], [data-hovered], [data-pressed], [data-focus-visible].
*/
export function ResultRow({ name, meta, wordmark, query, select = 'single', 'data-state': state, ...rest }: ResultRowProps) {
  return (
    <ListBoxItem
      {...rest}
      textValue={name}
      className={`result-row result-row--${select}`}
      data-state={state}
    >
      {({ isSelected, isPressed }) => (
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
      )}
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
