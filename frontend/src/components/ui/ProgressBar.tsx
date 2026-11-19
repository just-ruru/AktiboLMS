interface ProgressBarProps {
  value: number
  label?: string
  showValue?: boolean
  tone?: 'accent' | 'success' | 'info'
  className?: string
}

const TONES = {
  accent: 'bg-aktibo-gold',
  success: 'bg-aktibo-success-fg',
  info: 'bg-aktibo-info-fg',
}

export function ProgressBar({
  value,
  label,
  showValue = false,
  tone = 'accent',
  className = '',
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div className={className}>
      {label || showValue ? (
        <div className="mb-2 flex items-baseline justify-between gap-3">
          {label ? (
            <span className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted">
              {label}
            </span>
          ) : (
            <span />
          )}
          {showValue ? (
            <span className="font-display text-[11px] font-bold text-aktibo-ink">
              {Math.round(clamped)}%
            </span>
          ) : null}
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}
        className="h-1.5 w-full overflow-hidden rounded-full bg-aktibo-canvas"
      >
        <div
          className={`h-full rounded-full ${TONES[tone]} transition-[width] duration-300 ease-out`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  )
}
