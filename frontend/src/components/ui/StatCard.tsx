import type { HTMLAttributes } from 'react'

interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  value: string | number
  label: string
  tone?: 'default' | 'gold' | 'success' | 'info'
}

const TONES = {
  default: 'text-aktibo-navy-deep',
  gold: 'text-aktibo-gold',
  success: 'text-aktibo-success-fg',
  info: 'text-aktibo-info-fg',
}

/**
 * Metric tile — used in the instructor "Course teaching summary" strip and
 * the student learning-progress overview.
 */
export function StatCard({ value, label, tone = 'default', className = '', ...props }: StatCardProps) {
  return (
    <div
      className={[
        'rounded-[16px] border border-aktibo-border bg-aktibo-surface px-6 py-4 shadow-card',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      <p className={`font-display text-[28px] font-bold leading-none ${TONES[tone]}`}>{value}</p>
      <p className="mt-2 text-[11px] font-display font-bold uppercase tracking-[0.08em] text-aktibo-muted">
        {label}
      </p>
    </div>
  )
}
