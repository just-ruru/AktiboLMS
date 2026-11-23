import type { HTMLAttributes } from 'react'

export interface TabItem {
  id: string
  label: string
}

interface TabsBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tabs: TabItem[]
  activeId: string
  onChange: (id: string) => void
}

/** Pill tab row used on the course workspace screens (Figma "Actions row 1"). */
export function TabsBar({ tabs, activeId, onChange, className = '', ...props }: TabsBarProps) {
  return (
    <div
      role="tablist"
      aria-label="Course sections"
      className={['flex flex-wrap gap-4', className].filter(Boolean).join(' ')}
      {...props}
    >
      {tabs.map((tab) => {
        const active = tab.id === activeId
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={[
              'h-11 rounded-control border px-5 text-[12px] font-display font-bold uppercase tracking-[0.06em] transition-colors duration-200',
              active
                ? 'border-aktibo-navy bg-aktibo-gold text-aktibo-ink-on-gold hover:bg-aktibo-gold-hover active:bg-aktibo-gold-hover transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0'
                : 'border-aktibo-border bg-aktibo-surface text-aktibo-navy hover:bg-aktibo-canvas',
            ].join(' ')}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
