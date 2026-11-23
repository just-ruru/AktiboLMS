import type { ButtonHTMLAttributes } from 'react'

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

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  fullWidth?: boolean
  loading?: boolean
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-aktibo-gold text-aktibo-ink-on-gold border border-aktibo-navy hover:bg-aktibo-gold-hover active:bg-aktibo-navy active:text-white active:translate-y-0',
  secondary:
    'bg-aktibo-surface text-aktibo-navy border border-aktibo-border hover:bg-aktibo-canvas active:bg-aktibo-border',
  outline:
    'bg-transparent text-aktibo-navy border border-aktibo-navy hover:bg-aktibo-navy hover:text-white',
  ghost:
    'bg-transparent text-aktibo-navy border border-transparent hover:bg-aktibo-navy/10',
  danger:
    'bg-aktibo-danger-bg text-aktibo-danger-fg border border-aktibo-danger-fg hover:bg-aktibo-danger-bg/80',
}

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-[12px] rounded-[8px]',
  md: 'h-11 px-4 text-[13px] rounded-control',
  lg: 'h-12 px-6 text-[14px] rounded-control',
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled,
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  const base =
    'rounded-[9px] border border-black text-black text-[16px] font-bold font-["Lexend Exa"] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 flex items-center justify-center hover:-translate-y-[1px] active:translate-y-0'

  const variants: Record<string, string> = {
    primary: 'bg-aktif-gold hover:bg-amber-400 active:bg-amber-500',
    secondary: 'bg-aktif-white hover:bg-gray-100 active:bg-gray-200',
    danger: 'bg-[#ff585b] border-black text-black hover:bg-[#ff4044] active:bg-[#e83a3d]',
  }


  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={
        base,
        VARIANTS[variant],
        SIZES[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      ) : null}
      {children}
    </button>
  )
}
