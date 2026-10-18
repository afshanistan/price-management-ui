import { Logo } from '../../atoms/Logo'
import { Button } from '../../molecules/Button'
import { IconButton } from '../../molecules/IconButton'
import { NavLink } from '../../molecules/NavLink'
import { AccountBadge } from '../../molecules/AccountBadge'
import './MainNavigation.css'

export type MainNavigationVariant = 'default' | 'focus'
export type MainNavigationPage = 'templates' | 'submissions' | 'messages'

export interface MainNavigationProps {
  /** Default = full product nav. Focus = the wizard: logo, title, Save and exit. */
  variant?: MainNavigationVariant
  /** App or task name beside the logo. Not a heading. */
  title?: string
  /** Focus: "Save and exit". */
  onExit?: () => void
  /** Default: the nav link for the current page. */
  currentPage?: MainNavigationPage
  /** Default: the signed-in person, shown in the Account badge. */
  account?: { name: string; src: string }
  /** Default: "Upload CSV". */
  onUpload?: () => void
  onHelp?: () => void
  onSettings?: () => void
  /** Default: opens the account menu (later). */
  onAccount?: () => void
}

const defaultTitle: Record<MainNavigationVariant, string> = {
  default: 'Price Management Portal',
  focus: 'Template Builder',
}

const pages: { id: MainNavigationPage; label: string; icon: 'tag' | 'upload' | 'messages'; href: string }[] = [
  { id: 'templates', label: 'Templates', icon: 'tag', href: '/templates' },
  { id: 'submissions', label: 'Submissions', icon: 'upload', href: '/submissions' },
  { id: 'messages', label: 'Messages', icon: 'messages', href: '/messages' },
]

export function MainNavigation({
  variant = 'default',
  title = defaultTitle[variant],
  onExit,
  currentPage = 'templates',
  account,
  onUpload,
  onHelp,
  onSettings,
  onAccount,
}: MainNavigationProps) {
  return (
    // The header is a place: every token inside resolves to its on-brand value.
    <header data-mode="on-brand" className={`main-navigation main-navigation--${variant}`}>
      <div className="main-navigation__content">
        <div className="main-navigation__identity">
          <span className="main-navigation__logo">
            {/* The title beside it names the app, so the logo isn't read twice. */}
            <Logo size={32} aria-hidden />
          </span>
          <span className="main-navigation__divider" aria-hidden="true" />
          {/* The app name, not a heading: the card title is the page's only H1. */}
          <span className="main-navigation__title">{title}</span>
        </div>

        {variant === 'focus' ? (
          <div className="main-navigation__actions">
            <Button size="medium" hierarchy="secondary" onPress={onExit}>
              Save and exit
            </Button>
          </div>
        ) : (
          <>
            <nav className="main-navigation__links" aria-label="Main">
              {pages.map((page) => (
                <NavLink key={page.id} icon={page.icon} href={page.href} isActive={page.id === currentPage}>
                  {page.label}
                </NavLink>
              ))}
            </nav>
            <div className="main-navigation__actions">
              <Button size="medium" hierarchy="primary" trailingIcon="upload" onPress={onUpload}>
                Upload CSV
              </Button>
              <span className="main-navigation__divider" aria-hidden="true" />
              <IconButton icon="help" aria-label="Help" onPress={onHelp} />
              <IconButton icon="settings" aria-label="Settings" onPress={onSettings} />
              {account && <AccountBadge src={account.src} name={account.name} onPress={onAccount} />}
            </div>
          </>
        )}
      </div>
    </header>
  )
}
