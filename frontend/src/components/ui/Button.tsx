import { ButtonHTMLAttributes, forwardRef, memo } from 'react'
import { clsx } from 'clsx'

/* ============================================================================
   STUDY NOTES — components/ui/Button.tsx  (design-system button)
   ----------------------------------------------------------------------------
   WHAT: Reusable button primitive with variants (primary/secondary/outline/
         danger/ghost), sizes (sm/md/lg), a loading state, and optional icon.
         Used across forms, CTAs, and table actions.
   HOW IT WORKS:
     1. forwardRef + memo for ref forwarding and re-render optimization.
     2. clsx merges base styles + variant + size + caller className.
     3. loading disables the button and shows an inline SVG spinner.
     4. icon renders before children when provided.
   WHERE THE API CONTRACT LIVES: none here (pure UI).
   WHAT TO CHANGE FOR THE NEW UI:
     • Restyle variants to the new tokens:
         – primary → brand teal gradient (--brand-600 → --brand-500)
         – accent → amber for "continue/resume" CTAs
         – ghost-white → for dark CTA cards
     • Add new variants as needed (e.g. 'accent', 'outline-brand').
     • Keep forwardRef + memo — that's the right pattern for a design-system
       component; just don't remove the disabled/loading handling.
   QA MEDIUM: Button wasn't memoized in the original review; this file already
              wraps with memo. Keep it.
   ============================================================================ */

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
}

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, icon, ...props }, ref) => {
    const variantClasses = {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      outline: 'btn-outline',
      danger: 'btn-danger',
      ghost: 'btn-ghost',
      accent: 'btn-accent',
    }

    const sizeClasses = {
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg',
    }

    return (
      <button
        ref={ref}
        className={clsx(variantClasses[variant], sizeClasses[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!loading && icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    )
  }
)

const Button = memo(ButtonComponent)
Button.displayName = 'Button'

export { Button }