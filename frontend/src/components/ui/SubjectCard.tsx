import type { HTMLAttributes } from 'react'

export interface SubjectCardProps extends HTMLAttributes<HTMLDivElement> {
  number: string
  title: string
  description: string
  progress: number // 0-100
  actionLabel: string
  onAction?: () => void
}

/**
 * Subject card — Figma "Subject · <name>" frame, 416x248 on desktop.
 * Number eyebrow, title, description, then a bottom row with a slim
 * progress track on the left and the action button on the right.
 */
export function SubjectCard({
  number,
  title,
  description,
  progress,
  actionLabel,
  onAction,
  className = '',
  ...props
}: SubjectCardProps) {
  const clamped = Math.min(100, Math.max(0, progress))

  return (
    <div
      className={[
        'flex min-h-[248px] w-full flex-col rounded-[16px] border border-aktibo-border bg-aktibo-surface p-6 shadow-card',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      <p className="font-display text-[11px] font-bold uppercase tracking-[0.08em] text-aktibo-muted">
        {number}
      </p>
      <h3 className="mt-3 font-display text-[18px] font-bold leading-snug text-aktibo-navy-deep">
        {title}
      </h3>
      <p className="mt-2 text-[12px] leading-relaxed text-aktibo-muted">{description}</p>

      <div className="mt-auto flex items-end justify-between gap-4 pt-6">
        <div className="w-[152px]">
          <p className="text-[10px] font-display font-bold uppercase tracking-[0.06em] text-aktibo-muted">
            Progress {Math.round(clamped)}%
          </p>
          <div className="mt-2 h-[5px] w-full overflow-hidden rounded-full bg-aktibo-border">
            <div
              className="h-full rounded-full bg-aktibo-gold transition-[width] duration-300 ease-out"
              style={{ width: `${clamped}%` }}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={onAction}
          className="h-10 w-[192px] shrink-0 rounded-control border border-aktibo-navy bg-aktibo-gold font-display text-[12px] font-bold uppercase tracking-[0.04em] text-aktibo-ink-on-gold hover:bg-aktibo-gold-hover transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  )
}
