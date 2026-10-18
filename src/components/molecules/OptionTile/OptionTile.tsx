import { useId, type ReactNode, type Ref } from 'react'
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
export function OptionTile({ value, label, description, layout = 'stacked', action, tileRef, 'data-state': state, className }: OptionTileProps) {
  const labelId = useId()
  const descriptionId = useId()
  const classes = ['option-tile', `option-tile--${layout}`, className].filter(Boolean).join(' ')

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
            <span className="option-tile__text">
              <span id={labelId} className="option-tile__label type-label-lg">
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
