import { Link } from 'react-router-dom'
import type { HTMLAttributes } from 'react'

interface FooterProps extends HTMLAttributes<HTMLElement> {
  signedIn?: boolean
  userName?: string
}

/**
 * Shared app footer — Figma "Footer" frame (divider, brand + nav row, tagline).
 * Used on the student/instructor workspace screens.
 */
export function Footer({ signedIn = false, userName, className = '', ...props }: FooterProps) {
  const links = signedIn
    ? [
        { to: '/', label: 'Home' },
        { to: '/student/courses', label: 'Courses' },
        { to: '/pricing', label: 'Pricing' },
        { to: '/account-profile', label: 'My account' },
      ]
    : [
        { to: '/', label: 'Home' },
        { to: '/student/courses', label: 'Courses' },
        { to: '/login', label: 'Log in' },
        { to: '/register', label: 'Register' },
      ]

  return (
    <footer className={`w-full bg-aktibo-surface ${className}`} {...props}>
      <div className="mx-auto w-full max-w-[1296px] px-6 py-8 sm:px-10 lg:px-[72px]">
        <div className="h-px w-full bg-aktibo-border" />
        <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
          <Link to="/" className="site-nav__brand">
            <img src="/assets/aktibo-symbol.png" alt="" />
            <span>AKTIBO LMS</span>
          </Link>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-8 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.to + link.label}
                to={link.to}
                className="font-display text-[12px] font-bold uppercase tracking-[0.06em] text-aktibo-navy hover:text-aktibo-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-[12px] text-aktibo-muted">
          <p>A more focused way to learn.</p>
          <p>{signedIn && userName ? `Signed in as ${userName}` : 'Learning, with focus.'}</p>
        </div>
      </div>
    </footer>
  )
}
