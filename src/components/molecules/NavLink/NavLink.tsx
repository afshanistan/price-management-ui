import type { ReactNode } from 'react'
import { Link as AriaLink, type LinkProps as AriaLinkProps } from 'react-aria-components'
import { Icon, type IconName } from '../../atoms/Icon'
import './NavLink.css'

export interface NavLinkProps extends Omit<AriaLinkProps, 'children' | 'className' | 'style'> {
  /** Label. Also the accessible name. */
  children: ReactNode
  /** Shown in the reserved 16px slot: stroke on hover, filled on press and when active. */
  icon: IconName
  href: string
  /** Current page. Sets aria-current="page". */
  isActive?: boolean
  className?: string
}

export function NavLink({ children, icon, isActive = false, className, ...rest }: NavLinkProps) {
  const classes = ['nav-link', className].filter(Boolean).join(' ')

  return (
    <AriaLink {...rest} className={classes} aria-current={isActive ? 'page' : undefined}>
      {/* The slot is always there, so nothing reflows when the icon fades in. */}
      <span className="nav-link__icons">
        <Icon name={icon} size={16} className="nav-link__stroke" />
        <Icon name={icon} size={16} filled className="nav-link__filled" />
      </span>
      <span className="nav-link__label">{children}</span>
    </AriaLink>
  )
}
