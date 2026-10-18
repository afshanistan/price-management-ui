import {
  FieldError,
  Label,
  SearchField as AriaSearchField,
  Text,
  type SearchFieldProps as AriaSearchFieldProps,
} from 'react-aria-components'
import { Icon, type IconName } from '../../atoms/Icon'
import { Input } from '../Input'
import './TextField.css'

export interface TextFieldProps extends Omit<AriaSearchFieldProps, 'children' | 'className' | 'style' | 'isInvalid'> {
  /** Always rendered; hideLabel makes it visually hidden (Figma "Show label"). */
  label: string
  hideLabel?: boolean
  /** Figma "Show helper". */
  helper?: string
  /** When set: Error state, and it replaces the helper. Say the fix ("Enter a vendor name or ESN."), never "Invalid". */
  errorMessage?: string
  placeholder?: string
  leadingIcon?: IconName | null
  /** Forces the input's state for the "All states" story only. Never set it in product code. */
  'data-state'?: 'hover' | 'focus'
  className?: string
}

/*
  Label + Input + helper or error, on React Aria's SearchField (the step 1 and 2 searches):
  the label, helper (aria-describedby) and error (aria-invalid) are wired automatically,
  Esc clears, and Clear keeps focus in the input.
*/
export function TextField({
  label,
  hideLabel = false,
  helper,
  errorMessage,
  placeholder,
  leadingIcon = 'search',
  'data-state': state,
  className,
  ...rest
}: TextFieldProps) {
  const isInvalid = Boolean(errorMessage)

  return (
    <AriaSearchField {...rest} isInvalid={isInvalid} className={className ? `text-field ${className}` : 'text-field'}>
      <Label className={hideLabel ? 'visually-hidden' : 'text-field__label type-label-md'}>{label}</Label>
      <Input placeholder={placeholder} leadingIcon={leadingIcon} data-state={state} />
      {helper && !isInvalid && (
        <Text slot="description" className="text-field__helper type-body-sm">
          {helper}
        </Text>
      )}
      <FieldError className="text-field__error type-body-sm">
        <Icon name="alert-circle" size={16} filled className="text-field__error-icon" />
        {errorMessage}
      </FieldError>
    </AriaSearchField>
  )
}
