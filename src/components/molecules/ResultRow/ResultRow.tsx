import { motion } from 'motion/react'
import { ListBoxItem, type ListBoxItemProps } from 'react-aria-components'
import { CheckboxBox } from '../../atoms/Checkbox'
import { Icon } from '../../atoms/Icon'
import { findMatch, findPrefix } from '../../../data/search'
import { ESN_PREFIX } from '../../../data/vendors'
import { duration, ease } from '../../../styles/motion'
import './ResultRow.css'

export type ResultRowSelect = 'single' | 'multi'

export interface ResultRowProps extends Omit<ListBoxItemProps, 'children' | 'className' | 'style' | 'textValue'> {
  /** Vendor name (single) or brand name (multi). */
  name: string
  /** Single: the ESN, the bare number; shown as "ESN-70441642". */
  meta?: string
  /** Multi: shown as "SKUs: 4", read as "4 SKUs". */
  skuCount?: number
  /** Multi: the brand's vendor. Not shown; read after the name, because the section label is skipped
      when the row is reached with aria-activedescendant ("Diamond Crystal, Cargill, 4 SKUs"). */
  vendor?: string
  /** Bolds the matched part of the name. */
  query?: string
  /** single = vendor search (name, ESN, "Selected"; no logo tile); multi = brand list (checkbox, SKU count). */
  select?: ResultRowSelect
  /** Single: a shared id for the keyboard highlight, so it slides from row to row (one per panel and query). */
  highlightId?: string
  /** Forces a state for the "All states" story only. Never set it in product code. */
  'data-state'?: 'hover' | 'keyboard' | 'pressed'
}

/*
  An option in the Results panel's listbox. Selection, hover, press and keyboard
  highlight come from React Aria: [data-selected], [data-hovered], [data-pressed], [data-focus-visible].
*/
export function ResultRow({ name, meta = '', skuCount = 0, vendor, query, select = 'single', highlightId, 'data-state': state, ...rest }: ResultRowProps) {
  return (
    <ListBoxItem
      {...rest}
      textValue={name}
      className={`result-row result-row--${select}`}
      data-state={state}
      data-slide={(select === 'single' && highlightId) || undefined}
    >
      {({ isSelected, isPressed, isFocusVisible }) =>
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
          {/* Keyboard highlight: one shared shape that slides to the active row (fast, ease-out). */}
          {highlightId && isFocusVisible && (
            <motion.span
              layoutId={highlightId}
              className="result-row__highlight"
              aria-hidden="true"
              transition={{ layout: { duration: duration.fast, ease: ease.out } }}
            />
          )}
          {/* No logo tile (decision log, Oct 18): the name and ESN identify the vendor. One line with an ellipsis; the full name in the tooltip. */}
          <span className="result-row__name" title={name}>
            <Highlight text={name} query={query} />
          </span>
          {/* The accessible name comes from the text: "Cargill, ESN-70441642" (selection is aria-selected). */}
          <span className="visually-hidden">, </span>
          {/* Once added, "Selected" replaces the ESN on screen; screen readers still get the ESN. */}
          <span className={isSelected ? 'visually-hidden' : 'result-row__meta type-data-sm'}>
            {/* "ESN-" + the number. ESNs match from their first digit, so only a leading match is bold. */}
            {ESN_PREFIX}
            <Highlight text={meta} query={query} prefixOnly />
          </span>
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

/** Bolds the best match of the query in the text, ignoring accents and punctuation (src/data/search.ts). */
function Highlight({ text, query, prefixOnly = false }: { text: string; query?: string; prefixOnly?: boolean }) {
  const match = query ? (prefixOnly ? findPrefix(text, query) : findMatch(text, query)) : null
  if (!match) return <>{text}</>

  return (
    <>
      {text.slice(0, match.start)}
      <mark className="result-row__match">{text.slice(match.start, match.end)}</mark>
      {text.slice(match.end)}
    </>
  )
}
