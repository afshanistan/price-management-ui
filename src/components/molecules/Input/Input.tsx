import { Button as AriaButton, Input as AriaInput, type InputProps as AriaInputProps } from 'react-aria-components'
import { Icon, type IconName } from '../../atoms/Icon'
import './Input.css'

export interface InputProps extends Omit<AriaInputProps, 'className' | 'style'> {
  /** 20px stroke icon at the start. Pass null to hide. */
  leadingIcon?: IconName | null
  /** Shows the round Clear button while the field has a value. Search fields only. */
  isClearable?: boolean
  /** Forces a state for the "All states" story only. Never set it in product code. */
  'data-state'?: 'hover' | 'focus'
  className?: string
}

/*
  The field itself: icon + value + Clear. It's the visual part of a React Aria field,
  so render it inside one (Text field's SearchField, or a SearchField in an Autocomplete):
  the field supplies the label, value, invalid and disabled state, and Clear's behavior.
*/
export function Input({ leadingIcon = 'search', isClearable = true, 'data-state': state, className, ...rest }: InputProps) {
  return (
    <div className={className ? `input ${className}` : 'input'} data-state={state}>
      {leadingIcon && <Icon name={leadingIcon} size={20} className="input__icon" />}
      <AriaInput {...rest} className="input__control" />
      {/* Inside a SearchField this clears the value and keeps focus in the input; it names itself "Clear search". */}
      {isClearable && (
        <AriaButton className="input__clear">
          <Icon name="close" size={16} />
        </AriaButton>
      )}
    </div>
  )
}
