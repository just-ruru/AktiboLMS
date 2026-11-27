import { Navbar } from '../../components/ui/Navbar'
import { SiteFooter } from '../../components/ui/SiteFooter'

/**
 * Figma frame 140:2 — "Student · Progress".
 *
 * Reproduces the learning-progress frame panel for panel: page introduction band,
 * learning-view tabs, stat tiles, progress-by-course, recommendation and recent
 * activity.
 *
 * Progress values (percentages, counts, durations, course names) have no backend
 * endpoint at all, so every record value is expressed as neutral content inside
 * the reproduced structure. No percentage, count or course name is presented as
 * real data, and no learning activity is claimed.
 *
 * Layout notes: containers use max-width and side-by-side regions stack below the
 * lg breakpoint so the page stays within the viewport at narrow widths.
 */
export function StudentProgress() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar activePath="/courses/progress" />

      <section className="bg-aktif-navy px-6 pb-[36px] pt-[22px] lg:px-[72px]">
        <div className="flex flex-col gap-[9px]">
          <p className="font-display text-[11px] font-bold text-aktif-gold whitespace-nowrap">
            STUDENT WORKSPACE
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-[12px] lg:gap-0 w-full">
            <h1 className="font-['Castoro_Titling'] text-[32px] leading-[1.5] text-text-inverse sm:text-[36px] whitespace-normal">
              Your learning progress
            </h1>
            <div className="self-start lg:self-auto">
              <button
                className="bg-aktif-gold border border-black border-solid flex h-[48px] items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[264px] font-display text-[12px] font-bold leading-[1.5] text-black whitespace-nowrap hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                type="button"
              >
                CONTINUE LEARNING
              </button>
            </div>
          </div>
          <p className="font-display text-[13px] leading-[1.5] text-[#d1d8ee] whitespace-pre-line">
            Your learning journey at a glance
          </p>
        </div>
      </section>

      <main className="pl-6 pt-[32px] lg:pl-[72px]">
        <div className="flex w-full max-w-[1296px] flex-col gap-[32px] pb-[40px]">
          {/* Learning view tabs */}
          <div className="flex flex-col lg:flex-row gap-[16px] lg:gap-[16px] h-[44px] items-start w-full">
            <button
              className="bg-surface-white border border-border-light border-solid flex h-full items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[192px] lg:w-auto font-display text-[12px] font-bold leading-[1.5] text-aktif-navy whitespace-nowrap hover:border-aktif-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              type="button"
            >
              OVERVIEW
            </button>
            <button
              className="bg-surface-white border border-border-light border-solid flex h-full items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[192px] lg:w-auto font-display text-[12px] font-bold leading-[1.5] text-aktif-navy whitespace-nowrap hover:border-aktif-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              type="button"
            >
              ACTIVITY HISTORY
            </button>
            <button
              className="bg-surface-white border border-border-light border-solid flex h-full items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[176px] lg:w-auto font-display text-[12px] font-bold leading-[1.5] text-aktif-navy whitespace-nowrap hover:border-aktif-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              type="button"
            >
              QUIZ RESULTS
            </button>
          </div>

          {/* Stat tiles */}
          <div className="flex flex-col lg:flex-row lg:flex-wrap gap-[24px] lg:gap-[24px] h-[156px] items-start w-full">
            {[
              'MODULES COMPLETE',
              'QUICK CHECK AVERAGE',
              'PRACTICE COMPLETED',
              'LEARNING TIME',
            ].map((label) => (
              <div
                key={label}
                className="bg-surface-white border border-border-light border-solid flex flex-col gap-[13px] h-full items-start overflow-clip pb-[18px] pt-[16px] px-[20px] relative rounded-[16px] shrink-0 w-full lg:w-[304px]"
              >
                <p className="font-display text-[10px] font-bold text-text-secondary whitespace-nowrap">{label}</p>
                <p className="font-display text-[26px] font-bold leading-[1.5] text-text-primary">—</p>
                <p className="font-display text-[12px] leading-[1.5] text-text-secondary whitespace-pre-wrap">
                  Progress data not available
                </p>
              </div>
            ))}
          </div>

          {/* Your courses */}
          <section className="bg-surface-white border border-border-light border-solid flex flex-col gap-[13px] h-[176px] items-start overflow-clip pb-[43px] pt-[18px] px-[24px] relative rounded-[16px] shrink-0 w-full">
            <p className="font-display text-[10px] font-bold text-text-secondary whitespace-nowrap">YOUR COURSES</p>
            <h2 className="font-display text-[20px] font-bold text-text-primary whitespace-nowrap">
              Courses not available
            </h2>
            <p className="font-display text-[14px] leading-[1.5] text-text-primary whitespace-pre-wrap">
              The backend does not expose the student&rsquo;s courses yet, so no
              course progress can be shown.
            </p>
          </section>

          {/* Recent activity */}
          <section className="bg-surface-white border border-border-light border-solid flex flex-col gap-[13px] h-[176px] items-start overflow-clip pb-[43px] pt-[18px] px-[24px] relative rounded-[16px] shrink-0 w-full">
            <p className="font-display text-[10px] font-bold text-text-secondary whitespace-nowrap">RECENT ACTIVITY</p>
            <h2 className="font-display text-[20px] font-bold text-text-primary whitespace-nowrap">
              Activity not available
            </h2>
            <p className="font-display text-[14px] leading-[1.5] text-text-primary whitespace-pre-wrap">
              The backend does not record learning activity yet, so there is
              nothing to display.
            </p>
          </section>
        </div>
      </main>

      <div className="pt-8">
        <SiteFooter accountLabel="My account" accountPath="/account-profile" />
      </div>
    </div>
  )
}
