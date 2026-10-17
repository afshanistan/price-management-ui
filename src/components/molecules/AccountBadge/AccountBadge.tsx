import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components'
import './AccountBadge.css'

export interface AccountBadgeProps extends Omit<AriaButtonProps, 'children' | 'className' | 'style' | 'aria-label'> {
  /** Photo URL. Covers the 36×36 circle. */
  src: string
  /** The signed-in person. Accessible name = "Account: {name}". */
  name: string
  className?: string
}

export function AccountBadge({ src, name, className, ...rest }: AccountBadgeProps) {
  const classes = ['account-badge', className].filter(Boolean).join(' ')

  return (
    <AriaButton {...rest} className={classes} aria-label={`Account: ${name}`}>
      {/* The button carries the name, so the photo itself is decorative. */}
      <img className="account-badge__photo" src={src} alt="" />
    </AriaButton>
  )
}
