import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components'
import { Icon, type IconName } from '../../atoms/Icon'
import './IconButton.css'

export type IconButtonTone = 'default' | 'destructive'
export type IconButtonSize = 'medium'

export interface IconButtonProps extends Omit<AriaButtonProps, 'children' | 'className' | 'style' | 'aria-label'> {
  icon: IconName
  /** Required. Names action + object: "Remove Cargill", "Settings". */
  'aria-label': string
  /** Destructive = the vendor-card trash. */
  tone?: IconButtonTone
  /** Only Medium (32) exists. */
  size?: IconButtonSize
  className?: string
}

export function IconButton({ icon, tone = 'default', size = 'medium', className, ...rest }: IconButtonProps) {
  const classes = ['icon-button', `icon-button--${tone}`, `icon-button--${size}`, className].filter(Boolean).join(' ')

  return (
    <AriaButton {...rest} className={classes}>
      {tone === 'default' ? (
        // Both drawings stacked: stroke at rest, crossfade to filled on hover and press.
        <span className="icon-button__icons">
          <Icon name={icon} className="icon-button__stroke" />
          <Icon name={icon} filled className="icon-button__filled" />
        </span>
      ) : (
        <Icon name={icon} filled />
      )}
    </AriaButton>
  )
}
