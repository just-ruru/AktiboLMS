import type { HTMLAttributes } from 'react'

export interface SidebarSubject {
  name: string
  completion: string
}

interface SubjectSidebarProps extends Omit<HTMLAttributes<HTMLElement>, 'onSelect'> {
  heading: string
  subjects: SidebarSubject[]
  activeIndex?: number
  onSelect?: (index: number) => void
  legendTitle?: string
  legend?: string
}

/**
 * Course-subjects sidebar — Figma "Course subjects sidebar" frame (312 wide).
 * Subject nav list plus an activity legend at the bottom.
 */
export function SubjectSidebar({
  heading,
  subjects,
  activeIndex = 0,
  onSelect,
  legendTitle = 'ACTIVITY TYPES',
  legend = 'Lesson · Video · Practice · Quiz',
  className = '',
  ...props
}: SubjectSidebarProps) {
  return (
    <aside
      className={[
        'w-full rounded-[16px] border border-aktibo-border bg-aktibo-surface p-4 lg:w-[312px] lg:shrink-0',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      <p className="px-2 pt-2 font-display text-[11px] font-bold uppercase tracking-[0.08em] text-aktibo-muted">
        {heading}
      </p>

      <nav aria-label="Subjects" className="mt-3 flex flex-col gap-3">
        {subjects.map((subject, index) => {
          const active = index === activeIndex
          return (
            <button
              key={subject.name}
              type="button"
              onClick={() => onSelect?.(index)}
              aria-current={active ? 'true' : undefined}
              className={[
                'w-full rounded-[12px] border px-4 py-3 text-left transition-colors duration-200',
                active
                  ? 'border-aktibo-gold bg-aktibo-gold-soft'
                  : 'border-transparent hover:bg-aktibo-canvas',
              ].join(' ')}
            >
              <span className="block font-display text-[14px] font-bold leading-snug text-aktibo-navy-deep">
                {subject.name}
              </span>
              <span className="mt-1 block text-[11px] text-aktibo-muted">{subject.completion}</span>
            </button>
          )
        })}
      </nav>

      <div className="my-4 h-px w-full bg-aktibo-border" />

      <p className="px-2 font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted">
        {legendTitle}
      </p>
      <p className="mt-1 px-2 text-[11px] leading-relaxed text-aktibo-muted">{legend}</p>
    </aside>
  )
}
