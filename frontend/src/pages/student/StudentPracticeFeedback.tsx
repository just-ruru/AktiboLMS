import { Navbar } from '../../components/ui/Navbar'
import { SiteFooter } from '../../components/ui/SiteFooter'

/**
 * Figma frame 140:254 — "Student · Practice feedback".
 *
 * Reproduces the practice feedback frame panel for panel: page introduction band,
 * quick-check navigation, question panel, answer options (A / B), feedback and
 * the next-question action.
 *
 * Practice content (question text, answers, feedback, scores) has no backend
 * endpoint at all, so every record value is expressed as neutral content inside
 * the reproduced structure. No question, answer or score is presented as real
 * data, and no attempt result is claimed.
 */
export function StudentPracticeFeedback() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar activePath="/courses/practice/feedback" />

      <section className="bg-aktif-navy px-6 pb-[37px] pt-[22px] lg:px-[72px]">
        <div className="flex flex-col gap-[9px] h-[176px] items-start overflow-clip">
          <p className="font-display text-[11px] font-bold text-aktif-gold whitespace-nowrap">
            STUDENT WORKSPACE
          </p>
          <div className="flex flex-col h-[62px] items-start pt-[6px]">
            <div className="flex gap-[509px] h-[56px] items-start w-[1296px]">
              <h1 className="font-['Castoro_Titling'] text-[36px] leading-[1.5] text-text-inverse whitespace-nowrap">
                Practice feedback
              </h1>
              <button
                className="bg-surface-white border border-border-light border-solid flex h-[48px] items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[264px] font-display text-[12px] font-bold leading-[1.5] text-aktif-navy whitespace-nowrap hover:border-aktif-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                type="button"
              >
                BACK TO LESSON
              </button>
            </div>
          </div>
          <p className="font-display text-[13px] leading-[1.5] text-[#d1d8ee] whitespace-pre-line">
            Practice · Answer options · Feedback
          </p>
        </div>
      </section>

      <main className="pl-6 pt-[32px] lg:pl-[72px]">
        <div className="flex w-full max-w-[1296px] flex-col gap-[32px] pb-[40px]">
          {/* Question panel */}
          <section className="bg-surface-white border border-border-light border-solid flex flex-col gap-[17px] h-[202px] items-start overflow-clip pb-[22px] pt-[16px] px-[24px] relative rounded-[16px] shrink-0 w-full">
            <p className="font-display text-[10px] font-bold text-text-secondary whitespace-nowrap">QUICK CHECK</p>
            <h2 className="font-display text-[15px] font-bold text-text-primary whitespace-nowrap">
              Question not available
            </h2>
            <div className="flex flex-col h-[55px] items-start pt-[11px] w-full">
              <p className="font-display text-[14px] leading-[1.5] text-text-primary w-[904px]">
                The backend does not provide practice questions, so no question
                can be shown yet.
              </p>
            </div>
            <div className="flex gap-[16px] h-[44px] items-start w-[904px]">
              <button
                className="bg-surface-white border border-border-light border-solid flex h-full items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[144px] font-display text-[12px] font-bold leading-[1.5] text-aktif-navy text-left whitespace-nowrap hover:border-aktif-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                type="button"
              >
                A
              </button>
              <button
                className="bg-surface-white border border-border-light border-solid flex h-full items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[176px] font-display text-[12px] font-bold leading-[1.5] text-aktif-navy text-left whitespace-nowrap hover:border-aktif-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                type="button"
              >
                B
              </button>
              <a
                href="/courses/practice/feedback"
                className="bg-aktif-gold border border-black border-solid flex h-full items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[264px] font-display text-[12px] font-bold leading-[1.5] text-black whitespace-nowrap hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                NEXT QUESTION
              </a>
            </div>
            <div className="flex flex-col h-[20px] items-start pt-[5px] w-[340px]">
              <p className="font-display text-[10px] leading-[1.5] text-text-secondary whitespace-nowrap">
                Answer result not saved
              </p>
            </div>
          </section>
        </div>
      </main>

      <div className="pt-8">
        <SiteFooter accountLabel="My account" accountPath="/account-profile" />
      </div>
    </div>
  )
}
