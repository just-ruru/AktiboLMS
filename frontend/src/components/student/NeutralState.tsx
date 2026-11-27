import { Link } from 'react-router-dom'

interface NeutralStateProps {
  title: string
  message: string
  actionLabel?: string
  actionTo?: string
}

export function NeutralState({ title, message, actionLabel, actionTo }: NeutralStateProps) {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 rounded-lg border border-border-light bg-surface-white p-12 text-center">
      <h2 className="font-display text-[21px] font-bold text-text-primary">{title}</h2>
      <p className="font-display text-[13px] text-text-secondary">{message}</p>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="inline-flex items-center justify-center rounded-[9px] border border-border-light bg-surface-white px-6 py-3 font-display text-[11px] font-bold text-text-secondary transition-colors hover:border-aktif-navy hover:text-aktif-navy"
        >
          {actionLabel}
        </Link>
      )}
    </section>
  )
}
