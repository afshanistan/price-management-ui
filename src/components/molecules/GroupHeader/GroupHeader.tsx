import { Checkbox, CheckboxBox, type CheckboxChecked } from '../../atoms/Checkbox'
import './GroupHeader.css'

export interface GroupHeaderProps {
  /** "Cargill". */
  vendor: string
  /** Id for the vendor text, so the list group can be labelled by it. */
  vendorId?: string
  /** "4 of 5". Omit to hide. */
  count?: string
  /** Tri-state select all. Omit to hide the checkbox. */
  selectAll?: {
    checked: CheckboxChecked
    onChange: () => void
    label: string
    /**
     * Inside a listbox a real checkbox isn't allowed, so the list renders the real control
     * outside it and the header shows the box only (clickable, hidden from screen readers).
     */
    visualOnly?: boolean
    /** visualOnly: the real control has keyboard focus, so the box shows the focus ring. */
    isFocusVisible?: boolean
  }
  className?: string
}

/** A vendor group label in the Brand list. Not a heading. The list makes it sticky. */
export function GroupHeader({ vendor, vendorId, count, selectAll, className }: GroupHeaderProps) {
  return (
    <div className={className ? `group-header ${className}` : 'group-header'}>
      {selectAll?.visualOnly && (
        <span className="group-header__select-all group-header__box" data-focus-visible={selectAll.isFocusVisible || undefined} onClick={selectAll.onChange}>
          <CheckboxBox checked={selectAll.checked} />
        </span>
      )}
      {selectAll && !selectAll.visualOnly && (
        <Checkbox
          aria-label={selectAll.label}
          isSelected={selectAll.checked === true}
          isIndeterminate={selectAll.checked === 'mixed'}
          onChange={selectAll.onChange}
          className="group-header__select-all"
        />
      )}
      <span id={vendorId} className="group-header__vendor type-label-md">
        {vendor}
      </span>
      {count && <span className="group-header__count type-body-sm">{count}</span>}
    </div>
  )
}
