import type { HTMLAttributes } from 'react'

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'info' | 'danger'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
  children: React.ReactNode
}

const TONES: Record<BadgeTone, string> = {
  neutral: 'bg-aktibo-canvas text-aktibo-muted border-aktibo-border',
  accent: 'bg-aktibo-gold text-aktibo-ink-on-gold border-aktibo-ink-on-gold',
  success: 'bg-aktibo-success-bg text-aktibo-success-fg border-aktibo-success-bg',
  warning: 'bg-aktibo-warning-bg text-aktibo-warning-fg border-aktibo-warning-bg',
  info: 'bg-aktibo-info-bg text-aktibo-info-fg border-aktibo-info-bg',
  danger: 'bg-aktibo-danger-bg text-aktibo-danger-fg border-aktibo-danger-bg',
}

export function Badge({ tone = 'neutral', children, className = '', ...props }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1 rounded-[6px] border px-2.5 py-1',
        'font-display text-[10px] font-bold uppercase tracking-[0.08em] leading-none',
        TONES[tone],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </span>
  )
}
