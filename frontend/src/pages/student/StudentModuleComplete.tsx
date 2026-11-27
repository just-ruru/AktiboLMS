import { Navbar } from '../../components/ui/Navbar'
import { SiteFooter } from '../../components/ui/SiteFooter'

/**
 * Figma frame 140:380 — "Student · Module complete".
 *
 * Reproduces the module-complete frame panel for panel: page introduction band,
 * confirmation banner, activity outcomes (reading, Python activity, quick check),
 * progress and the next-module actions.
 *
 * Completion records (module names, scores, percentages, counts) have no backend
 * endpoint at all, so every record value is expressed as neutral content inside
 * the reproduced structure. No completion score or percentage is presented as
 * real data, and no module is confirmed complete.
 *
 * Layout notes: containers use max-width and side-by-side regions stack below the
 * lg breakpoint so the page stays within the viewport at narrow widths.
 */
export function StudentModuleComplete() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar activePath="/courses/modules/complete" />

      <section className="bg-aktif-navy px-6 pb-[36px] pt-[22px] lg:px-[72px]">
        <div className="flex flex-col gap-[9px]">
          <p className="font-display text-[11px] font-bold text-aktif-gold whitespace-nowrap">
            STUDENT WORKSPACE
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-[12px] lg:gap-0 w-full">
            <h1 className="font-['Castoro_Titling'] text-[32px] leading-[1.5] text-text-inverse sm:text-[36px] whitespace-normal">
              Module complete
            </h1>
            <div className="self-start lg:self-auto">
              <button
                className="bg-surface-white border border-border-light border-solid flex h-[48px] items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[264px] font-display text-[12px] font-bold leading-[1.5] text-aktif-navy whitespace-nowrap hover:border-aktif-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                type="button"
              >
                BACK TO MODULES
              </button>
            </div>
          </div>
          <p className="font-display text-[13px] leading-[1.5] text-[#d1d8ee] whitespace-pre-line">
            Confirmation · Activity outcomes · Next module
          </p>
        </div>
      </section>

      <main className="pl-6 pt-[32px] lg:pl-[72px]">
        <div className="flex w-full max-w-[1296px] flex-col gap-[32px] pb-[40px]">
          {/* Confirmation */}
          <section className="bg-[#e9f5ef] border border-[#236543] border-solid flex flex-col gap-[13px] min-h-[112px] items-start overflow-clip pb-[18px] pt-[16px] px-[24px] relative rounded-[16px] shrink-0 w-full">
            <p className="font-display text-[10px] font-bold text-[#236543] whitespace-nowrap">COMPLETED & SAVED</p>
            <h2 className="font-display text-[20px] font-bold leading-[1.5] text-text-primary">
              Module outcome not available
            </h2>
            <p className="font-display text-[14px] leading-[1.5] text-text-primary whitespace-pre-wrap">
              The backend does not record module completion yet, so no outcome is
              saved.
            </p>
          </section>

          {/* Activity outcomes */}
          <section className="bg-surface-white border border-border-light border-solid flex flex-col gap-[17px] min-h-[202px] items-start overflow-clip pb-[22px] pt-[16px] px-[24px] relative rounded-[16px] shrink-0 w-full">
            <div className="flex flex-col h-[55px] items-start pt-[11px] w-full">
              <p className="font-display text-[10px] font-bold text-text-secondary whitespace-nowrap">ACTIVITY OUTCOMES</p>
              <p className="font-display text-[12px] leading-[1.5] text-text-secondary w-full max-w-[264px]">
                Activity results are not connected to a backend yet.
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-[24px] lg:gap-[24px] items-start w-full">
              {['READING', 'PYTHON ACTIVITY', 'QUICK CHECK'].map((label) => (
                <div
                  key={label}
                  className="flex flex-col gap-[8px] items-start overflow-clip pb-[13px] pt-[12px] px-[12px] relative rounded-[9px] shrink-0 w-full lg:w-[280px]"
                >
                  <p className="font-display text-[11px] font-bold text-aktif-navy whitespace-nowrap">{label}</p>
                  <p className="font-display text-[12px] leading-[1.5] text-text-secondary w-[220px]">
                    Result not available
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Next module actions */}
          <div className="flex flex-col lg:flex-row gap-[16px] lg:gap-[16px] h-[44px] items-start w-full">
            <a
              href="/courses/lessons/multimedia"
              className="bg-aktif-gold border border-black border-solid flex h-[48px] items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[264px] font-display text-[12px] font-bold leading-[1.5] text-black whitespace-nowrap hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              CONTINUE TO LOOPS
            </a>
            <a
              href="/courses/lessons"
              className="bg-surface-white border border-border-light border-solid flex h-[48px] items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[264px] font-display text-[12px] font-bold leading-[1.5] text-aktif-navy whitespace-nowrap hover:border-aktif-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              START NEXT MODULE
            </a>
          </div>
        </div>
      </main>

      <div className="pt-8">
        <SiteFooter accountLabel="My account" accountPath="/account-profile" />
      </div>
    </div>
  )
}
