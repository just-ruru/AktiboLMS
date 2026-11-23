import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { clsx } from 'clsx'

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()

  const themes: { value: 'light' | 'dark' | 'system'; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <Sun className="w-5 h-5" /> },
    { value: 'dark', label: 'Dark', icon: <Moon className="w-5 h-5" /> },
    { value: 'system', label: 'System', icon: <Monitor className="w-5 h-5" /> },
  ]

  return (
    <div className="relative group">
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark')}
        className={clsx(
          'relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200',
          'hover:bg-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500'
        )}
        aria-label={`Current theme: ${theme}. Click to cycle.`}
        title={`Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`}
      >
        {theme === 'light' && <Sun className="w-5 h-5 text-amber-500" />}
        {theme === 'dark' && <Moon className="w-5 h-5 text-brand-400" />}
        {theme === 'system' && <Monitor className="w-5 h-5 text-brand-500" />}
        {/* System indicator dot */}
        {theme === 'system' && resolvedTheme === 'dark' && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-brand-400 rounded-full border-2 border-bg-secondary" />
        )}
      </button>

      {/* Dropdown - shows on hover/focus */}
      <div className="absolute right-0 top-full mt-2 z-dropdown min-w-[10rem] hidden group-hover:block group-focus-within:block">
        <div className="glass rounded-lg p-1.5 shadow-lg animate-scale-in">
          {themes.map((t) => (
            <button
              key={t.value}
              onClick={() => setTheme(t.value)}
              className={clsx(
                'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                theme === t.value
                  ? 'bg-brand-100 text-brand-700 dark:bg-brand-900 dark:text-brand-200'
                  : 'text-fg-secondary hover:text-fg-primary hover:bg-tertiary'
              )}
            >
              <span className="flex-shrink-0">{t.icon}</span>
              <span>{t.label}</span>
              {theme === t.value && (
                <svg className="ml-auto w-4 h-4 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ThemeToggleWrapper() {
  return (
    <div className="group">
      <ThemeToggle />
    </div>
  )
}
