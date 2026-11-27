import { Navbar } from '../../components/ui/Navbar'
import { SiteFooter } from '../../components/ui/SiteFooter'

/**
 * Figma frame 109:118 — "Student · Interactive lesson".
 *
 * Reproduces the lesson frame panel for panel: page introduction band (breadcrumb,
 * title, MARK COMPLETE, meta), module navigation sidebar, reading player panel,
 * embedded coding activity (editor, output, RUN CODE), and the quick-check prompt
 * panel with answer options and check controls.
 *
 * Lesson content (lesson title, reading copy, code, question, answers, feedback,
 * scores, durations) has no backend endpoint at all, so every record value is
 * expressed as neutral content inside the reproduced structure. No lesson copy,
 * question, answer or score is presented as real data, and no completion is
 * claimed (no confirmation endpoint exists).
 *
 * Layout notes: the desktop frame uses fixed pixel widths, but the page must stay
 * within the viewport at narrow widths, so containers use max-width and side-by-side
 * regions stack below the lg breakpoint.
 */
export function StudentInteractiveLesson() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar activePath="/courses/lessons" />

      <section className="bg-aktif-navy px-6 pb-[36px] pt-[22px] lg:px-[72px]">
        <div className="flex flex-col gap-[9px]">
          <p className="font-display text-[11px] font-bold text-aktif-gold whitespace-nowrap">
            STUDENT WORKSPACE
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-[12px] lg:gap-0 w-full">
            <h1 className="font-['Castoro_Titling'] text-[32px] leading-[1.5] text-text-inverse sm:text-[36px] whitespace-normal">
              Interactive lesson
            </h1>
            <div className="self-start lg:self-auto">
              <button
                className="bg-aktif-gold border border-black border-solid flex h-[48px] items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[264px] font-display text-[12px] font-bold leading-[1.5] text-black whitespace-nowrap hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                MARK COMPLETE
              </button>
            </div>
          </div>
          <p className="font-display text-[13px] leading-[1.5] text-[#d1d8ee] whitespace-pre-line">
            Reading · Python activity · Quick check
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
            <div className="flex flex-col min-h-[50px] items-start pl-[8px] pt-[4px] w-full max-w-[143px]">
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
            <div className="flex flex-col h-[55px] items-start pl-[8px] pt-[40px] w-[123px]">
              <p className="font-display text-[10px] font-bold text-text-secondary whitespace-nowrap">
                ACTIVITY CHECKS
              </p>
            </div>
            <div className="flex flex-col h-[39px] items-start pl-[8px] pt-[5px] w-full max-w-[272px]">
              <p className="font-display text-[11px] leading-[1.5] text-text-secondary w-full max-w-[264px] whitespace-pre-wrap">
                Activity results not available
              </p>
            </div>
          </aside>

          {/* Main lesson body */}
          <div className="flex flex-col gap-[24px] h-full items-start relative shrink-0 w-full lg:w-[952px]">
            {/* Reading panel */}
            <section className="bg-surface-white border border-border-light border-solid flex flex-col gap-[13px] h-[176px] items-start overflow-clip pb-[43px] pt-[18px] px-[24px] relative rounded-[16px] shrink-0 w-full">
              <p className="font-display text-[10px] font-bold text-text-secondary whitespace-nowrap">01 / READ</p>
              <h2 className="font-display text-[20px] font-bold text-text-primary">
                Reading content not available
              </h2>
              <div className="flex flex-col h-[44px] items-start pt-[2px] w-full">
                <p className="font-display text-[14px] leading-[1.5] text-text-primary whitespace-pre-wrap">
                  The backend does not provide lesson content, so the reading panel
                  cannot be populated yet.
                </p>
              </div>
            </section>

            {/* Coding activity */}
            <section className="bg-surface-white border border-border-light border-solid flex flex-col gap-[11px] h-[322px] items-start overflow-clip pb-[18px] pt-[12px] px-[16px] relative rounded-[16px] shrink-0 w-full">
              <div className="flex flex-col h-[40px] items-start pl-[8px] w-full">
                <div className="flex flex-col lg:flex-row lg:items-start gap-[20px] lg:gap-[571px] w-full">
                  <div className="flex h-[23px] items-start pt-[6px] w-[157px]">
                    <p className="font-display text-[11px] font-bold text-aktif-navy leading-[1.5] whitespace-pre">
                      02 / TRY IT · PYTHON
                    </p>
                  </div>
                  <button
                    className="bg-aktif-gold border border-black border-solid flex h-full items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[176px] font-display text-[12px] font-bold leading-[1.5] text-black whitespace-nowrap hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                  >
                    RUN CODE
                  </button>
                </div>
              </div>
              <div className="flex flex-col h-[18px] items-start pl-[8px] w-full max-w-[375px]">
                <p className="font-display text-[12px] leading-[1.5] text-text-secondary whitespace-nowrap">
                  Coding activity not available
                </p>
              </div>
              <div className="flex flex-col h-[212px] items-start pt-[8px] w-full">
                <div className="flex flex-col lg:flex-row gap-[16px] lg:gap-[16px] h-[204px] items-start w-full">
                  <div className="bg-[#071747] flex flex-col h-full items-start overflow-clip pb-[30px] pl-[20px] pr-[20px] lg:pr-[333px] pt-[24px] relative rounded-[10px] min-w-0 w-full lg:w-[588px]">
                    <div className="font-['Cascadia_Mono'] text-[16px] leading-[30px] text-[#e9edff] w-full whitespace-pre-wrap">
                      <p className="mb-0"># Editor not connected</p>
                      <p className="mb-0"># No Python runtime endpoint exists.</p>
                    </div>
                  </div>
                  <div className="bg-[#f4f6fa] flex flex-col gap-[24px] h-full items-start overflow-clip pb-[55px] pt-[20px] px-[20px] relative rounded-[10px] shrink-0 w-full lg:w-[316px]">
                    <p className="font-display text-[10px] font-bold text-text-secondary whitespace-nowrap">OUTPUT</p>
                    <p className="font-display text-[18px] leading-[1.5] text-[#236543] whitespace-nowrap">—</p>
                    <div className="flex flex-col h-[39px] items-start pt-[22px] w-full">
                      <p className="font-display text-[11px] leading-[1.5] text-text-secondary whitespace-pre-wrap">
                        Output not available
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick check prompt panel */}
            <section className="bg-surface-white border border-border-light border-solid flex flex-col gap-[17px] h-[202px] items-start overflow-clip pb-[22px] pt-[16px] px-[24px] relative rounded-[16px] shrink-0 w-full">
              <p className="font-display text-[10px] font-bold text-text-secondary whitespace-nowrap">03 / QUICK CHECK</p>
              <h2 className="font-display text-[15px] font-bold text-text-primary">
                Check question not available
              </h2>
              <div className="flex flex-col h-[55px] items-start pt-[11px] w-full">
                <div className="flex flex-col lg:flex-row gap-[16px] lg:gap-[16px] h-[44px] items-start w-full">
                  <button
                    className="bg-surface-white border border-border-light border-solid flex h-full items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[144px] font-display text-[12px] font-bold leading-[1.5] text-aktif-navy text-left whitespace-nowrap hover:border-aktif-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                  >
                    A · IF
                  </button>
                  <button
                    className="bg-[#e9f5ef] border border-[#236543] border-solid flex h-full items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[176px] font-display text-[12px] font-bold leading-[1.5] text-aktif-navy text-left whitespace-nowrap hover:border-[#236543] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                  >
                    B · ELSE
                  </button>
                  <div className="flex h-[37px] items-start pl-[24px] w-full lg:w-[552px]">
                    <p className="font-display text-[12px] leading-[1.5] text-[#236543] whitespace-pre-wrap">
                      Answer feedback not available
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col h-[20px] items-start pt-[5px] w-full max-w-[340px]">
                <p className="font-display text-[10px] leading-[1.5] text-text-secondary whitespace-nowrap">
                  Quiz result not saved
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <div className="pt-8">
        <SiteFooter accountLabel="My account" accountPath="/account-profile" />
      </div>
    </div>
  )
}
