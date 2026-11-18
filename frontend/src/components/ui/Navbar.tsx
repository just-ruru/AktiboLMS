import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import type { HTMLAttributes } from 'react'

interface NavbarProps extends HTMLAttributes<HTMLElement> {
  signedIn?: boolean
  userName?: string
}

const PRE_SIGNUP_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/student/courses', label: 'Courses' },
  { to: '/login', label: 'Log in', end: true },
  { to: '/register', label: 'Register', end: true },
]

const POST_SIGNUP_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/student/courses', label: 'Courses' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/account-profile', label: 'My account', end: true },
]

const COURSES_PATHS = ['/student/courses', '/instructor/courses']

const isLinkActive = (to: string, pathname: string) => {
  if (to === '/') return pathname === '/'
  if (to === '/student/courses') return COURSES_PATHS.includes(pathname)
  return pathname === to
}

export function Navbar({
  className = '',
  signedIn = false,
  userName = 'Hoshimi Miyabi',
  ...props
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const links = signedIn ? POST_SIGNUP_LINKS : PRE_SIGNUP_LINKS

  const closeMenu = () => setIsOpen(false)

  return (
    <nav className={`site-nav ${className}`} aria-label="Main navigation" {...props}>
      <Link to="/" className="site-nav__brand" onClick={closeMenu}>
        <img src="/assets/aktibo-symbol.png" alt="" />
        <span>AKTIBO LMS</span>
      </Link>

      <div className="site-nav__desktop">
        <div className="site-nav__links">
          {links.map(({ to, label, end }) => {
            const active = isLinkActive(to, location.pathname)
            return (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `site-nav__link${active || isActive ? ' is-active' : ''}${
                    label === 'My account' ? ' site-nav__my-account' : ''
                  }`
                }
              >
                {label}
              </NavLink>
            )
          })}
        </div>

        {signedIn ? (
          <Link
            to="/account-profile"
            className={`site-nav__signed-in${
              location.pathname === '/account-profile' ? ' is-active' : ''
            }`}
            onClick={closeMenu}
          >
            {userName}
          </Link>
        ) : null}
      </div>

      <button
        type="button"
        className="site-nav__toggle"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      <div
        id="mobile-navigation"
        className={`site-nav__mobile${isOpen ? ' is-open' : ''}`}
        hidden={!isOpen}
      >
        {links.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={closeMenu}
            className={({ isActive }) =>
              `site-nav__mobile-link${isActive || location.pathname === to ? ' is-active' : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
        {signedIn && (
          <NavLink
            to="/account-profile"
            onClick={closeMenu}
            className={`site-nav__mobile-link${location.pathname === '/account-profile' ? ' is-active' : ''} site-nav__mobile-signed-in`}
          >
            {userName}
          </NavLink>
        )}
      </div>
    </nav>
  )
}
