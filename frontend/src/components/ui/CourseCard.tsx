import type { HTMLAttributes } from 'react'

export interface CourseCardProps extends HTMLAttributes<HTMLDivElement> {
  courseCode: string
  status: 'Enrolled' | 'Open to enroll' | 'Completed'
  title: string
  instructor: string
  structure: string
  progress: number // 0-100
  buttonLabel: string
  onButtonClick?: () => void
  isInstructor?: boolean
}

export function CourseCard({
  courseCode,
  status,
  title,
  instructor,
  structure,
  progress,
  buttonLabel,
  onButtonClick,
  isInstructor = false,
  className = '',
  ...props
}: CourseCardProps) {
  const statusColors: Record<string, string> = {
    Enrolled: 'bg-aktibo-success-bg text-aktibo-success-fg',
    'Open to enroll': 'bg-aktibo-canvas text-aktibo-muted',
    Completed: 'bg-aktibo-success-bg text-aktibo-success-fg',
  }

  return (
    <div
      className={[
        'course-card bg-aktibo-surface border border-aktibo-border content-stretch flex flex-col items-start p-6 rounded-card shadow-card',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <div className="course-card__top">
        <div
          className={[
            'bg-aktibo-canvas content-stretch flex items-center justify-center rounded-control px-3 py-1',
            statusColors[status],
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <p className="font-display text-[10px] text-aktibo-navy-deep">
            {courseCode}
          </p>
        </div>
        <div
          className={[
            'content-stretch flex items-center justify-center rounded-control px-3 py-1',
            status === 'Enrolled' ? statusColors[status] : statusColors['Open to enroll'],
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <p className="font-display text-[10px]">
            {status}
          </p>
        </div>
      </div>
      <h2 className="course-card__title font-display text-[18px] font-bold leading-snug text-aktibo-navy-deep">
        {title}
      </h2>
      <p className="course-card__instructor font-sans text-[12px] text-aktibo-muted">
        {instructor}
      </p>
      <p className="course-card__structure font-sans text-[11px] text-aktibo-muted">
        {structure}
      </p>
      <div className="course-card__footer">
        <div className="course-card__progress">
          <p className="mb-2 text-[10px] text-aktibo-muted">
              Learning progress
            </p>
          <div className="course-card__progress-track bg-aktibo-border h-[6px] rounded-[3px] overflow-hidden">
            <div
              className="bg-aktibo-gold h-full rounded-[3px] transition-all duration-300 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
            </div>
        </div>
        <button
          type="button"
          onClick={onButtonClick}
          className={[
            'course-card__action h-10 rounded-control transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0',
            isInstructor
              ? 'bg-aktibo-surface border border-aktibo-border text-aktibo-navy hover:bg-aktibo-canvas'
              : 'bg-aktibo-gold border border-aktibo-navy text-aktibo-ink-on-gold hover:bg-aktibo-gold-hover',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <span className="font-display text-[12px] font-bold uppercase tracking-[0.04em]">
            {buttonLabel}
          </span>
        </button>
      </div>
    </div>
  )
}
