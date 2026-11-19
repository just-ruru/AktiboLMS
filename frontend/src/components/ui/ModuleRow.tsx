import type { HTMLAttributes } from 'react'

export type ModuleStatus = 'Completed' | 'In progress' | 'Not started' | 'Locked'

export interface ModuleRowProps extends HTMLAttributes<HTMLDivElement> {
  number: string
  title: string
  activityTypes: string
  status: ModuleStatus
  actionLabel: string
  onAction?: () => void
}

const STATUS_TONE: Record<ModuleStatus, string> = {
  Completed: 'bg-aktibo-success-bg text-aktibo-success-fg',
  'In progress': 'bg-aktibo-info-bg text-aktibo-info-fg',
  'Not started': 'bg-aktibo-canvas text-aktibo-muted',
  Locked: 'bg-aktibo-canvas text-aktibo-muted',
}

/**
 * Module row — Figma "Module 0X" frame, 952x112 on desktop.
 * Number badge, title + activity types, then status + action on the right.
 */
export function ModuleRow({
  number,
  title,
  activityTypes,
  status,
  actionLabel,
  onAction,
  className = '',
  ...props
}: ModuleRowProps) {
  return (
    <div
      className={[
        'flex w-full flex-wrap items-center gap-x-6 gap-y-3 rounded-[16px] border border-aktibo-border bg-aktibo-surface px-5 py-3 shadow-card',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[12px] bg-aktibo-navy font-display text-[18px] font-bold text-aktibo-gold">
        {number}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate font-display text-[16px] font-bold text-aktibo-navy-deep">
          {title}
        </h3>
        <p className="mt-1 truncate text-[12px] text-aktibo-muted">{activityTypes}</p>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={[
            'rounded-[6px] px-3 py-1 text-[10px] font-display font-bold uppercase tracking-[0.06em]',
            STATUS_TONE[status],
          ].join(' ')}
        >
          {status}
        </span>
        <button
          type="button"
          onClick={onAction}
          className="h-[42px] w-[176px] shrink-0 rounded-[9px] border border-aktibo-border bg-aktibo-surface font-display text-[12px] font-bold uppercase tracking-[0.04em] text-aktibo-navy transition-colors duration-200 hover:bg-aktibo-canvas"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  )
}
