import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'default' | 'sm' | 'xs' | 'tiny'
  fullWidth?: boolean
  disabled?: boolean
}

const SIZES: Record<string, string> = {
  default: 'h-[48px] text-[16px]',
  sm: 'h-[44px] text-[14px]',
  xs: 'h-[36px] text-[14px]',
  tiny: 'h-[24px] text-[10px]',
}

const VARIANTS: Record<string, string> = {
  primary:
    'bg-aktif-gold border border-aktif-navy border-solid text-aktif-navy hover:bg-amber-400 active:bg-amber-500 transition-colors duration-200',
  secondary:
    'bg-aktif-white border border-border-light border-solid text-aktif-inverse hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200',
  danger:
    'bg-state-danger border border-aktif-navy border-solid text-aktif-white hover:bg-[#ff4044] active:bg-[#e83a3d] transition-colors duration-200',
}

export function Button({
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'rounded-[8px] flex items-center justify-center font-semibold font-["Inter"] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-border-focus disabled:opacity-50 disabled:pointer-events-none'

  return (
    <button
      type="button"
      disabled={disabled}
      className={[
        base,
        VARIANTS[variant],
        SIZES[size],
        fullWidth ? 'w-full' : '',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    />
  )
}
