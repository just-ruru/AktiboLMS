import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  fullWidth?: boolean
}

export function Button({
  variant = 'primary',
  fullWidth = false,
  className = '',
  disabled,
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
      type="button"
      disabled={disabled}
      className={[
        base,
        variants[variant],
        fullWidth ? 'w-full' : '',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    />
  )
}
