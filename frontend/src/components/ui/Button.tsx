import type { ButtonHTMLAttributes } from 'react'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-aktibo-gold text-aktibo-ink-on-gold border border-black hover:bg-aktibo-gold-hover active:bg-[#e8a800] active:translate-y-0',
  secondary:
    'bg-aktibo-surface text-aktibo-navy border border-aktibo-border hover:bg-aktibo-canvas active:bg-aktibo-border',
  outline:
    'bg-transparent text-aktibo-navy border border-aktibo-navy hover:bg-aktibo-navy hover:text-white',
  ghost:
    'bg-transparent text-aktibo-navy border border-transparent hover:bg-aktibo-navy/10',
  danger:
    'bg-aktibo-danger-bg text-aktibo-danger-fg border border-aktibo-danger-fg hover:bg-[#ffd4d4]',
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
    'inline-flex items-center justify-center gap-2 font-display font-bold tracking-tight ' +
    'transition-all duration-200 ease-out active:translate-y-0 hover:-translate-y-px ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aktibo-gold focus-visible:ring-offset-2 ' +
    'disabled:pointer-events-none disabled:opacity-50'

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={[
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
