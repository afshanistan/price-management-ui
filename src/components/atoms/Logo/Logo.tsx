import './Logo.css'

export interface LogoProps {
  /** Rendered size in px. Drawn on a 32 grid; scales down to 16. */
  size?: number
  /** Accessible name. */
  title?: string
  /** Set when the app name sits right beside the logo, so it isn't read twice. */
  'aria-hidden'?: boolean
  className?: string
}

// Inlined from src/assets/logo.svg so --logo-primary / --logo-accent resolve
// from the container's mode (citron bars on brand). The logo never sets a mode.
export function Logo({ size = 32, title = 'Price Management', className, ...rest }: LogoProps) {
  const decorative = rest['aria-hidden'] === true

  return (
    <svg
      className={className ? `logo ${className}` : 'logo'}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      focusable="false"
      {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': title })}
    >
      {/* Bars: --logo-primary */}
      <g className="logo__bars">
        <path d="M9.92 17.2C9.92 16.0512 8.98875 15.12 7.84 15.12C6.69125 15.12 5.76 16.0512 5.76 17.2V22.96C5.76 24.1088 6.69125 25.04 7.84 25.04C8.98875 25.04 9.92 24.1088 9.92 22.96V17.2Z" />
        <path d="M15.36 13.36C15.36 12.2112 14.4288 11.28 13.28 11.28C12.1312 11.28 11.2 12.2112 11.2 13.36V25.2C11.2 26.3488 12.1312 27.28 13.28 27.28C14.4288 27.28 15.36 26.3488 15.36 25.2V13.36Z" />
        <path d="M20.8 13.36C20.8 12.2112 19.8688 11.28 18.72 11.28C17.5712 11.28 16.64 12.2112 16.64 13.36V25.2C16.64 26.3488 17.5712 27.28 18.72 27.28C19.8688 27.28 20.8 26.3488 20.8 25.2V13.36Z" />
        <path d="M26.24 17.2C26.24 16.0512 25.3088 15.12 24.16 15.12C23.0112 15.12 22.08 16.0512 22.08 17.2V22.96C22.08 24.1088 23.0112 25.04 24.16 25.04C25.3088 25.04 26.24 24.1088 26.24 22.96V17.2Z" />
      </g>
      {/* Stem and leaf: --logo-accent */}
      <g className="logo__leaf">
        <path d="M16.48 6.208C16.48 5.9429 16.2651 5.728 16 5.728C15.7349 5.728 15.52 5.9429 15.52 6.208V11.008C15.52 11.2731 15.7349 11.488 16 11.488C16.2651 11.488 16.48 11.2731 16.48 11.008V6.208Z" />
        <path d="M16.16 8.608C17.6 5.728 20.8 4.448 24.32 4.768C23.36 7.648 19.84 9.568 16.16 8.608Z" />
      </g>
    </svg>
  )
}
