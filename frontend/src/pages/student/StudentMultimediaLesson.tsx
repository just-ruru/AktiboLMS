import { Navbar } from '../../components/ui/Navbar'
import { SiteFooter } from '../../components/ui/SiteFooter'

/**
 * Figma frame 140:128 — "Student · Multimedia lesson".
 *
 * Reproduces the multimedia lesson frame panel for panel: page introduction band,
 * module navigation sidebar, video block (01 / WATCH), explore tips (02 / EXPLORE),
 * practice entry (03 / APPLY) and the quick-check entry point.
 *
 * Lesson content (video, tips, practice prompts) has no backend endpoint at all,
 * so every record value is expressed as neutral content inside the reproduced
 * structure. No video title, tip or practice item is presented as real data.
 *
 * Layout notes: containers use max-width and side-by-side regions stack below the
 * lg breakpoint so the page stays within the viewport at narrow widths.
 */
export function StudentMultimediaLesson() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar activePath="/courses/lessons/multimedia" />

      <section className="bg-aktif-navy px-6 pb-[36px] pt-[22px] lg:px-[72px]">
        <div className="flex flex-col gap-[9px]">
          <p className="font-display text-[11px] font-bold text-aktif-gold whitespace-nowrap">
            STUDENT WORKSPACE
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-[12px] lg:gap-0 w-full">
            <h1 className="font-['Castoro_Titling'] text-[32px] leading-[1.5] text-text-inverse sm:text-[36px] whitespace-normal">
              Multimedia lesson
            </h1>
            <div className="self-start lg:self-auto">
              <a
                href="/courses/practice/feedback"
                className="bg-aktif-gold border border-black border-solid flex h-[48px] items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[264px] font-display text-[12px] font-bold leading-[1.5] text-black whitespace-nowrap hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                GO TO QUICK CHECK
              </a>
            </div>
          </div>
          <p className="font-display text-[13px] leading-[1.5] text-[#d1d8ee] whitespace-pre-line">
            Video · Explore · Practice
          </p>
        </div>
      </section>

      <main className="pl-6 pt-[32px] lg:pl-[72px]">
        <div className="flex w-full max-w-[1296px] flex-col gap-[32px] pb-[40px]">
          {/* Module navigation sidebar */}
          <aside className="bg-surface-white border border-border-light border-solid flex flex-col gap-[12px] items-start overflow-clip relative rounded-[16px] shrink-0 w-full lg:w-[312px] px-[16px] pb-[68px] pt-[22px]">
            <div className="flex flex-col h-[18px] items-start pl-[8px] w-[80px]">
              <p className="font-display text-[12px] font-bold text-aktif-navy whitespace-nowrap">MODULES</p>
            </div>
            <div className="flex flex-col min-h-[50px] items-start pl-[8px] pt-[4px] w-full max-w-[220px]">
              <h2 className="font-display text-[15px] font-bold leading-[1.5] text-text-primary w-full max-w-[220px]">
                Subject not connected
              </h2>
            </div>
            <div className="flex flex-col h-[112px] items-start pt-[12px] w-full">
              {['01', '02', '03', '04'].map((n) => (
                <div
                  key={n}
                  className="bg-surface-white flex flex-col gap-[24px] h-[100px] items-start overflow-clip pb-[13px] pt-[12px] px-[12px] relative rounded-[9px] shrink-0 w-full"
                >
                  <div className="flex gap-[20px] h-[36px] items-start w-full">
                    <div className="flex h-[20px] items-start pt-[3px] w-[16px]">
                      <p className="font-display text-[11px] font-bold text-text-secondary whitespace-nowrap">{n}</p>
                    </div>
                    <h3 className="font-display text-[12px] font-bold leading-[1.5] text-text-primary w-full max-w-[220px]">
                      Module title not available
                    </h3>
                  </div>
                  <div className="flex flex-col min-h-[15px] items-start pl-[36px] w-full max-w-[102px]">
                    <p className="font-display text-[10px] leading-[1.5] text-text-secondary whitespace-pre-wrap">
                      Status not available
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Main lesson body */}
          <div className="flex flex-col gap-[24px] h-full items-start relative shrink-0 w-full lg:w-[952px]">
            {/* Video block */}
            <section className="bg-surface-white border border-border-light border-solid flex flex-col gap-[13px] h-[176px] items-start overflow-clip pb-[43px] pt-[18px] px-[24px] relative rounded-[16px] shrink-0 w-full">
              <p className="font-display text-[10px] font-bold text-text-secondary whitespace-nowrap">01 / WATCH</p>
              <h2 className="font-display text-[20px] font-bold text-text-primary whitespace-nowrap">
                Video not available
              </h2>
              <div className="flex flex-col h-[44px] items-start pt-[2px] w-full">
                <p className="font-display text-[14px] leading-[1.5] text-text-primary whitespace-pre-wrap">
                  The backend does not provide multimedia content, so the video
                  cannot be played yet.
                </p>
              </div>
            </section>

            {/* Explore tips */}
            <section className="bg-surface-white border border-border-light border-solid flex flex-col gap-[11px] h-[176px] items-start overflow-clip pb-[43px] pt-[18px] px-[24px] relative rounded-[16px] shrink-0 w-full">
              <p className="font-display text-[10px] font-bold text-text-secondary whitespace-nowrap">02 / EXPLORE</p>
              <h2 className="font-display text-[20px] font-bold text-text-primary whitespace-nowrap">
                Explore tips not available
              </h2>
              <div className="flex flex-col h-[44px] items-start pt-[2px] w-full">
                <p className="font-display text-[14px] leading-[1.5] text-text-primary whitespace-pre-wrap">
                  Source-evaluation tips are not provided by the backend yet.
                </p>
              </div>
            </section>

            {/* Practice entry */}
            <section className="bg-surface-white border border-border-light border-solid flex flex-col gap-[13px] h-[176px] items-start overflow-clip pb-[43px] pt-[18px] px-[24px] relative rounded-[16px] shrink-0 w-full">
              <p className="font-display text-[10px] font-bold text-text-secondary whitespace-nowrap">03 / APPLY</p>
              <h2 className="font-display text-[20px] font-bold text-text-primary whitespace-nowrap">
                Practice item not available
              </h2>
              <div className="flex flex-col h-[44px] items-start pt-[2px] w-full">
                <p className="font-display text-[14px] leading-[1.5] text-text-primary whitespace-pre-wrap">
                  The quick-check practice entry is not connected to a backend yet.
                </p>
              </div>
            </section>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-[12px] lg:gap-0 w-full">
              <a
                href="/courses/practice/feedback"
                className="bg-aktif-gold border border-black border-solid flex h-[48px] items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[264px] font-display text-[12px] font-bold leading-[1.5] text-black whitespace-nowrap hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                START QUICK CHECK
              </a>
            </div>
          </div>
        </div>
      </main>

      <div className="pt-8">
        <SiteFooter accountLabel="My account" accountPath="/account-profile" />
      </div>
    </div>
  )
}
