import type { HTMLAttributes } from 'react'

interface ProgressSummaryProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  detail: string
  percent: number
}

/**
 * Course progress summary band — Figma "Course progress summary" frame.
 * Title/detail on the left, long progress track in the middle, percent on the right.
 */
export function ProgressSummary({
  title,
  detail,
  percent,
  className = '',
  ...props
}: ProgressSummaryProps) {
  const clamped = Math.min(100, Math.max(0, percent))

  return (
    <div
      className={[
        'flex w-full flex-wrap items-center gap-x-8 gap-y-3 rounded-[16px] border border-aktibo-border bg-aktibo-surface px-6 py-4 shadow-card',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      <div className="min-w-[160px]">
        <p className="font-display text-[14px] font-bold text-aktibo-navy-deep">{title}</p>
        <p className="mt-1 text-[12px] text-aktibo-muted">{detail}</p>
      </div>

      <div className="h-[8px] min-w-[120px] flex-1 overflow-hidden rounded-full bg-[#e7ebf3]">
        <div
          className="h-full rounded-full bg-aktibo-gold transition-[width] duration-300 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>

      <p className="font-display text-[24px] font-bold text-aktibo-navy-deep">
        {Math.round(clamped)}%
      </p>
    </div>
  )
}
