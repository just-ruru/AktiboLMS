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
      <div className="mx-auto w-full max-w-[1296px] px-6 py-6 sm:px-10 lg:px-[72px] lg:py-0 lg:h-[176px] lg:flex lg:flex-col lg:justify-center">
        <p className="font-display text-[11px] font-bold uppercase tracking-[0.08em] text-aktibo-gold">
          {breadcrumb}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-4 lg:mt-2 lg:h-[62px]">
          <h1 className="font-titling text-[32px] leading-[1.2] text-white sm:text-[40px] lg:h-[51px]">
            {title}
          </h1>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
        <p className="mt-2 text-[14px] text-aktibo-muted-on-navy lg:mt-1">{metadata}</p>
      </div>
    </div>
  )
}
