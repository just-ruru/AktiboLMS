import type { ReactNode } from 'react'

export interface PageIntroProps {
  breadcrumb: string
  title: string
  metadata: string
  action?: ReactNode
}

/**
 * Navy page-introduction band (Figma "Page introduction" frame).
 * Full-bleed navy, 176px tall on desktop, breadcrumb on top, big titling
 * title with an optional action button on the right, metadata line below.
 */
export function PageIntro({ breadcrumb, title, metadata, action }: PageIntroProps) {
  return (
    <div className="bg-aktibo-navy w-full">
      <div className="mx-auto w-full max-w-[1296px] px-[72px] py-0 h-[176px] flex flex-col justify-center">
        <p className="font-display text-[11px] font-bold uppercase tracking-[0.08em] text-aktibo-gold">
          {breadcrumb}
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4 mt-2 h-[62px]">
          <h1 className="font-titling text-[40px] leading-[1.2] text-white">
            {title}
          </h1>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
        <p className="text-[14px] text-aktibo-muted-on-navy mt-1">{metadata}</p>
      </div>
    </div>
  )
}
