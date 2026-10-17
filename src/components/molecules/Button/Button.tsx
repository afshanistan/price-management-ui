import type { ReactNode } from 'react'
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components'
import { Icon, type IconName, type IconSize } from '../../atoms/Icon'
import './Button.css'

export type ButtonSize = 'xsmall' | 'medium' | 'xlarge'
export type ButtonHierarchy = 'primary' | 'secondary' | 'tertiary'

export interface ButtonProps extends Omit<AriaButtonProps, 'children' | 'className' | 'style'> {
  /** Label. Also the accessible name, unless aria-label extends it ("Edit" → "Edit vendors"). */
  children: ReactNode
  size?: ButtonSize
  hierarchy?: ButtonHierarchy
  /** Icon before the label. Always the filled drawing. */
  leadingIcon?: IconName
  /** Icon after the label. Always the filled drawing. */
  trailingIcon?: IconName
  className?: string
}

const iconSize: Record<ButtonSize, IconSize> = {
  xsmall: 14,
  medium: 16,
  xlarge: 20,
}

export function Button({
  children,
  size = 'medium',
  hierarchy = 'primary',
  leadingIcon,
  trailingIcon,
  className,
  ...rest
}: ButtonProps) {
  const classes = ['button', `button--${size}`, `button--${hierarchy}`, className].filter(Boolean).join(' ')

  return (
    <AriaButton {...rest} className={classes}>
      {leadingIcon && <Icon name={leadingIcon} size={iconSize[size]} filled />}
      <span className="button__label">{children}</span>
      {trailingIcon && <Icon name={trailingIcon} size={iconSize[size]} filled />}
    </AriaButton>
  )
}
