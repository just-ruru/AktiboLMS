import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { LogOut, Menu, X, BookOpen, BarChart2, LayoutDashboard, ChevronDown } from 'lucide-react'
import { clsx } from 'clsx'
import { useState } from 'react'
import { ThemeToggleWrapper } from '../ui/ThemeToggle'

export function Navbar() {
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const navigation = user?.role === 'instructor' ? [
    { name: 'Dashboard', href: '/instructor', icon: LayoutDashboard },
    { name: 'Courses', href: '/instructor/courses', icon: BookOpen },
    { name: 'Analytics', href: '/instructor/analytics', icon: BarChart2 },
  ] : [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Courses', href: '/my-courses', icon: BookOpen },
    { name: 'Progress', href: '/progress', icon: BarChart2 },
  ]

  return (
    <header className="navbar" aria-label="Main navigation">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2" aria-label="AktiboLMS Home">
              <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-fg-primary hidden sm:block">AktiboLMS</span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:flex md:items-center md:gap-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    clsx(
                      'nav-link',
                      isActive && 'nav-link-active'
                    )
                  }
                >
                  <item.icon className="w-4 h-4" aria-hidden="true" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <ThemeToggleWrapper />

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-tertiary transition-colors"
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
                aria-label="User menu"
              >
                <div className="w-8 h-8 bg-brand-100 dark:bg-brand-900 rounded-full flex items-center justify-center">
                  {user?.avatarUrl ? (
                    <img src={user.avatarUrl} alt="" className="w-8 h-8 rounded-full" />
                  ) : (
                    <span className="text-sm font-medium text-brand-700 dark:text-brand-300">
                      {user?.fullName?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  )}
                </div>
                <span className="hidden sm:block text-sm font-medium text-fg-primary">
                  {user?.fullName}
                </span>
                <ChevronDown className="w-4 h-4 text-fg-tertiary" aria-hidden="true" />
              </button>

              {userMenuOpen && (
                <div className="dropdown animate-scale-in">
                  <div className="px-4 py-2 border-b border-border-primary">
                    <p className="text-sm font-medium text-fg-primary">{user?.fullName}</p>
                    <p className="text-xs text-fg-tertiary capitalize">{user?.role}</p>
                  </div>
                  <button
                    onClick={() => { logout(); setUserMenuOpen(false); }}
                    className="dropdown-item w-full text-red-600 dark:text-red-400"
                  >
                    <LogOut className="w-4 h-4" aria-hidden="true" />
                    Sign out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-fg-secondary hover:bg-tertiary hover:text-fg-primary transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-border-primary animate-slide-down">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    clsx(
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium transition-colors',
                      isActive
                        ? 'bg-brand-50 text-brand-700 dark:bg-brand-900 dark:text-brand-300'
                        : 'text-fg-secondary hover:text-fg-primary hover:bg-tertiary'
                    )
                  }
                >
                  <item.icon className="w-5 h-5" aria-hidden="true" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}