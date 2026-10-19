import { useEffect, useId, useRef, useState, type ReactNode, type Ref } from 'react'
import { Radio } from 'react-aria-components'
import { RadioCircle } from '../../atoms/Radio'
import './OptionTile.css'

export type OptionTileLayout = 'stacked' | 'inline'

export interface OptionTileProps {
  /** The React Aria Radio value inside the preset's RadioGroup. */
  value: string
  /** "Next month". The radio's name. */
  label: string
  /** "Nov 1, 2026", "US dollar". Omit to hide. Linked with aria-describedby. */
  description?: string
  /** Stacked = description under the label; Inline = beside it. */
  layout?: OptionTileLayout
  /** Trailing control (Custom date's calendar button). A sibling of the radio, never inside it. */
  action?: ReactNode
  /** The label is a placeholder ("Select a date"): shown in subtle text until a real value replaces it. */
  isPlaceholder?: boolean
  /** The tile box, e.g. to anchor the Date picker. */
  tileRef?: Ref<HTMLDivElement>
  /** Forces a state for the "All states" story only. Never set it in product code. */
  'data-state'?: 'hover' | 'pressed'
  className?: string
}

/*
  A radio choice as a whole tile. The tile is a box holding a React Aria Radio (a hidden
  native radio + the circle + the text, all one label) and, if any, the action button beside it.
  States come from the Radio: [data-hovered], [data-pressed], [data-selected], [data-focus-visible].
*/
export function OptionTile({ value, label, description, layout = 'stacked', action, tileRef, isPlaceholder, 'data-state': state, className }: OptionTileProps) {
  const labelId = useId()
  const descriptionId = useId()
  const classes = ['option-tile', `option-tile--${layout}`, className].filter(Boolean).join(' ')
  // When the label changes ("Select a date" → "Oct 22, 2026"), the text fades in (not on first render).
  const [swap, setSwap] = useState(0)
  const shownLabel = useRef(label)
  useEffect(() => {
    if (shownLabel.current === label) return
    shownLabel.current = label
    setSwap((n) => n + 1)
  }, [label])

  return (
    <div ref={tileRef} className={classes} data-state={state}>
      <Radio
        value={value}
        aria-labelledby={labelId}
        aria-describedby={description ? descriptionId : undefined}
        className="option-tile__radio"
      >
        {({ isSelected, isPressed }) => (
          <>
            <span className="option-tile__slot">
              <RadioCircle checked={isSelected || isPressed || state === 'pressed'} />
            </span>
            <span key={swap} className="option-tile__text" data-swap={swap > 0 || undefined}>
              <span id={labelId} className="option-tile__label type-label-lg" data-placeholder={isPlaceholder || undefined}>
                {label}
              </span>
              {description && (
                <span id={descriptionId} className="option-tile__description type-body-xs">
                  {description}
                </span>
              )}
            </span>
          </>
        )}
      </Radio>
      {action && <span className="option-tile__action">{action}</span>}
    </div>
  )
}
