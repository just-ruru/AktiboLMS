import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import type { HTMLAttributes } from 'react'

interface NavbarProps extends HTMLAttributes<HTMLElement> {
  signedIn?: boolean
  userName?: string
}

const PRE_SIGNUP_LINKS = [
  { to: '/', label: 'HOME', end: true },
  { to: '/student/courses', label: 'COURSES' },
  { to: '/pricing', label: 'PRICING' },
]

const PRE_SIGNUP_ACTIONS = [
  { to: '/login', label: 'LOG IN', end: true },
  { to: '/register', label: 'REGISTER' },
]

const POST_SIGNUP_LINKS = [
  { to: '/', label: 'HOME', end: true },
  { to: '/student/courses', label: 'COURSES' },
  { to: '/pricing', label: 'PRICING' },
]

const POST_SIGNUP_ACTIONS = [
  { to: '/account-profile', label: 'MY ACCOUNT', end: true },
  { to: '/account/confirm-logout', label: 'LOGOUT', end: true },
]

const COURSES_PATHS = ['/student/courses', '/instructor/courses']

const isLinkActive = (to: string, pathname: string) => {
  if (to === '/') return pathname === '/'
  if (to === '/student/courses') return COURSES_PATHS.includes(pathname)
  return pathname === to
}

const LINK_WIDTHS: Record<string, string> = {
  HOME: 'w-[96px]',
  COURSES: 'w-[144px]',
  PRICING: 'w-[128px]',
  'LOG IN': 'w-[160px]',
  REGISTER: 'w-[160px]',
  'MY ACCOUNT': 'w-[160px]',
  LOGOUT: 'w-[160px]',
}

const ACTIVE_BAR_WIDTHS: Record<string, string> = {
  HOME: 'w-[64px]',
  'MY ACCOUNT': 'w-[128px]',
}

export function Navbar({
  className = '',
  signedIn = false,
  userName = 'Hoshimi Miyabi',
  ...props
}: NavbarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const links = signedIn ? POST_SIGNUP_LINKS : PRE_SIGNUP_LINKS
  const actions = signedIn ? POST_SIGNUP_ACTIONS : PRE_SIGNUP_ACTIONS

  return (
    <nav
      className={`bg-[#000e53] content-stretch flex items-center justify-between px-[72px] sm:px-6 lg:px-[72px] relative border-b border-[#304074] ${className}`}
      aria-label="Main navigation"
      {...props}
    >
      <Link
        to="/"
        className="content-stretch flex gap-[12px] h-[56px] items-center relative shrink-0 w-[256px] sm:w-auto max-w-[256px]"
      >
        <div className="relative shrink-0 size-[52px]">
          <img
            src="/assets/aktibo-symbol.png"
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          />
        </div>
        <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[normal] relative shrink-0 text-[20px] text-white whitespace-nowrap sm:text-[18px]">
          AKTIBO LMS
        </p>
      </Link>

      <div
        className="content-stretch flex gap-[16px] h-[48px] items-center relative shrink-0 w-[400px] sm:max-w-[400px] lg:w-[400px]"
      >
        {links.map(({ to, label, end }) => {
          const active = isLinkActive(to, location.pathname)
          const width = LINK_WIDTHS[label]
          const barWidth = ACTIVE_BAR_WIDTHS[label] ?? 'w-[64px]'
          return (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={() => `content-stretch cursor-pointer flex h-[48px] items-center justify-center relative rounded-[9px] shrink-0 ${width} sm:max-w-[${width}]`}
            >
              <p className={`[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[24px] relative shrink-0 text-[16px] text-left whitespace-nowrap ${isLinkActive(to, location.pathname) ? 'text-[#ffb700]' : 'text-white'}`}>
                {label}
              </p>
              {active && (
                <div className={`absolute bg-[#ffb700] h-[3px] left-[16px] top-[45px] ${barWidth}`} />
              )}
            </NavLink>
          )
        })}
      </div>

      <div className="content-stretch cursor-pointer flex gap-[16px] h-[48px] items-center relative shrink-0 w-[336px] sm:max-w-[336px] lg:w-[336px]">
        {actions.map(({ to, label }) => {
          const isRegister = label === 'REGISTER'
          const isLogout = label === 'LOGOUT'
          const isMyAccount = label === 'MY ACCOUNT'
          const active = isLinkActive(to, location.pathname)
          return (
            <a
              key={to}
              href={to}
              onClick={(e) => {
                e.preventDefault()
                if (isLogout) {
                  navigate(to)
                } else {
                  ;(window as unknown as { location: Location }).location.href = to
                }
              }}
              className={`content-stretch flex h-[48px] items-center justify-center relative rounded-[9px] shrink-0 ${LINK_WIDTHS[label]} ${
                isRegister ? 'bg-[#ffb700] border border-[#000e53] border-solid hover:bg-[#ffc933] active:bg-[#e8a800] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0' : ''
              }`}
            >
              <p className={`[word-break:break-word] font-['Lexend_Exa:${isRegister || isMyAccount ? 'Bold' : 'Regular'}'] font-${isRegister || isMyAccount ? 'bold' : 'normal'} leading-[24px] relative shrink-0 text-[16px] text-left whitespace-nowrap ${
                isRegister ? 'text-[#000e53]' : isMyAccount ? 'text-[#ffb700]' : 'text-white'
              }`}>
                {label}
              </p>
              {isMyAccount && active && (
                <div className="absolute bg-[#ffb700] h-[3px] left-[16px] top-[45px] w-[128px]" />
              )}
            </a>
          )
        })}
        {signedIn ? (
          <div className="content-stretch cursor-pointer flex h-[48px] items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[160px] border border-white/40">
            <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[24px] relative shrink-0 text-[16px] text-white whitespace-nowrap">
              {userName}
            </p>
          </div>
        ) : null}
      </div>
    </nav>
  )
}
