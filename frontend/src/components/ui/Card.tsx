import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'surface' | 'outline' | 'navy'
  padded?: boolean
}

const VARIANTS = {
  surface: 'bg-aktibo-surface border-aktibo-border',
  outline: 'bg-transparent border-aktibo-border',
  navy: 'bg-aktibo-navy border-aktibo-navy',
}

export function Card({
  children,
  variant = 'surface',
  padded = true,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={[
        'rounded-card border shadow-card',
        VARIANTS[variant],
        padded ? 'p-6 sm:p-7' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}
