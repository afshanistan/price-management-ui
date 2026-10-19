import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Button, Checkbox as AriaCheckbox } from 'react-aria-components'
import { CheckboxBox, type CheckboxChecked } from '../../atoms/Checkbox'
import { Icon } from '../../atoms/Icon'
import './GroupHeader.css'

export interface GroupHeaderProps {
  /** "Cargill". */
  vendor: string
  /** Id for the vendor text, so the list group can be labelled by it. */
  vendorId?: string
  /** "4 of 5". Omit to hide. */
  count?: string
  /** Tri-state select all, on the right before the caret. Omit to hide the checkbox. */
  selectAll?: {
    checked: CheckboxChecked
    onChange: () => void
    /** Accessible name: "Select all Cargill brands" / "Select 2 matches". Starts with the visible text. */
    label: string
    /** Visible text beside the box: "Select all", or "Select 2 matches" while searching. */
    text: string
    /**
     * Inside a listbox a real checkbox isn't allowed, so the list renders the real control
     * outside it and the header shows the box only (clickable, hidden from screen readers).
     */
    visualOnly?: boolean
    /** visualOnly: the real control has keyboard focus, so the box shows the focus ring. */
    isFocusVisible?: boolean
  }
  /** Opens and closes the vendor's group: the whole bar is the target, the caret shows the state. Omit for a plain label. */
  expand?: {
    isExpanded: boolean
    onToggle: () => void
    /** While searching every group with matches is open, so the bar can't be closed. */
    isDisabled?: boolean
    /** Same as selectAll.visualOnly: the real button lives outside the listbox. */
    visualOnly?: boolean
    isFocusVisible?: boolean
  }
  className?: string
}

/** "3 of 19", with a small tick when the number changes (not on first render). Off with reduced motion. */
function Count({ value }: { value: string }) {
  const [tick, setTick] = useState(0)
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    setTick((t) => t + 1)
  }, [value])
  return (
    <span key={tick} className="group-header__count type-body-sm" data-tick={tick > 0 || undefined}>
      {value}
    </span>
  )
}

/*
  A vendor group label in the Brand list: name + count on the left; select all and the caret on the
  right, so the checkbox and the caret are never side by side. Not a heading. The list makes it sticky.
*/
export function GroupHeader({ vendor, vendorId, count, selectAll, expand, className }: GroupHeaderProps) {
  const toggleable = expand && !expand.isDisabled
  const title = (
    <>
      <span id={vendorId} className="group-header__vendor type-body-lg-medium">
        {vendor}
      </span>
      {count && <Count value={count} />}
    </>
  )

  // The select-all cluster never opens or closes the group, so a near-miss on the box is harmless.
  const keepFromToggle = (event: MouseEvent) => event.stopPropagation()

  return (
    <div
      className={className ? `group-header ${className}` : 'group-header'}
      data-expandable={expand ? true : undefined}
      data-expanded={expand?.isExpanded || undefined}
      data-toggleable={toggleable || undefined}
      data-focus-visible={(expand?.visualOnly && expand.isFocusVisible) || undefined}
      onClick={expand?.visualOnly && toggleable ? expand.onToggle : undefined}
    >
      {expand && !expand.visualOnly ? (
        <Button
          className="group-header__title group-header__toggle"
          aria-expanded={expand.isExpanded}
          isDisabled={expand.isDisabled}
          onPress={expand.onToggle}
        >
          {title}
        </Button>
      ) : (
        <span className="group-header__title">{title}</span>
      )}

      {selectAll?.visualOnly && (
        <span
          className="group-header__select-all group-header__box"
          data-focus-visible={selectAll.isFocusVisible || undefined}
          onClick={(event) => {
            keepFromToggle(event)
            selectAll.onChange()
          }}
        >
          <CheckboxBox checked={selectAll.checked} />
          <span className="group-header__select-text type-label-md">{selectAll.text}</span>
        </span>
      )}
      {selectAll && !selectAll.visualOnly && (
        <AriaCheckbox
          aria-label={selectAll.label}
          isSelected={selectAll.checked === true}
          isIndeterminate={selectAll.checked === 'mixed'}
          onChange={selectAll.onChange}
          className="checkbox group-header__select-all"
        >
          {({ isSelected, isIndeterminate }) => (
            <>
              <CheckboxBox checked={isIndeterminate ? 'mixed' : isSelected} />
              <span className="group-header__select-text type-label-md">{selectAll.text}</span>
            </>
          )}
        </AriaCheckbox>
      )}

      {expand && (
        <span className="group-header__caret" aria-hidden="true">
          <Icon name="chevron-right" size={16} />
        </span>
      )}
    </div>
  )
}
