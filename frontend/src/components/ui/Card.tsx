import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'surface' | 'outlined'
}

export function Card({
  children,
  variant = 'default',
  className = '',
  ...props
}: CardProps) {
  const variants: Record<string, string> = {
    default: 'bg-surface-white rounded-[16px] border border-border-light border-solid p-8 shadow-sm',
    surface: 'bg-surface-light rounded-[12px] p-6',
    outlined:
      'bg-surface-white rounded-[16px] border border-border-light border-solid p-8',
  }

  return (
    <div
      className={[variants[variant], className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}
