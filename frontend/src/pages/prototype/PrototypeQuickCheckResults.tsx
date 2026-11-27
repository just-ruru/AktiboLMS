import { Link } from 'react-router-dom'
import { Navbar } from '../../components/ui/Navbar'
import { SiteFooter } from '../../components/ui/SiteFooter'

const GOLD_BUTTON =
  'h-11 rounded-[9px] border border-[#000e53] bg-aktif-gold px-[10px] py-[10px] font-display text-[11px] font-bold text-aktif-navy flex items-center justify-center'

const WHITE_BUTTON =
  'h-11 rounded-[9px] border border-[#dfe5f0] bg-surface-white px-[10px] py-[10px] font-display text-[11px] font-bold text-aktif-navy flex items-center justify-center'

/**
 * Figma frame 142:105 — "Student · Quick check results".
 *
 * Reproduces the frame's composition: page shell, the "Saved quick check results"
 * panel (score region and results actions) and the "Concept review" panel
 * (takeaway list). The score is prototype content only — the backend has no
 * practice or quiz endpoint, so no check was submitted and no grade was recorded.
 */
export function PrototypeQuickCheckResults() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar activePath="/courses" />

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-start gap-6 px-6 pt-8 lg:px-[72px]">
        <section className="flex w-full flex-col gap-2 bg-aktif-navy px-6 pb-5 pt-[22px]">
          <p className="font-display text-[10px] font-bold text-aktif-gold">
            CS101 / DIGITAL CITIZENSHIP / MODULE 02
          </p>
          <h1 className="font-display text-[36px] leading-[1.2] text-text-inverse">
            Quick check complete
          </h1>
          <p className="font-display text-[13px] text-[#d1d8ee]">
            Digital Citizenship · Evaluating Online Sources · 3 questions answered
          </p>
        </section>

        <section className="flex w-full flex-col gap-[24px]">
          <article className="rounded-[8px] border border-[#dfe5f0] border-solid bg-[#e8f4ef] p-[24px] w-full">
            <p className="font-display text-[11px] font-bold text-text-secondary">
              RESULTS SAVED
            </p>
            <h2 className="font-display text-[27px] font-bold leading-[1.5] text-aktif-navy">
              A little practice. A stronger habit.
            </h2>
            <div className="flex font-display font-bold gap-[16px] items-baseline leading-[1.5] text-aktif-navy">
              <span className="text-[44px]">2</span>
              <span className="text-[24px]">/ 3</span>
            </div>
            <p className="font-display text-[14px] leading-[1.5] text-text-primary mt-4">
              Correct. The publication date helps you judge whether information is still relevant to
              your topic.
            </p>
            <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
              This is a sample score shown in the prototype. No real grade is recorded — there is no
              practice or quiz backend connected, so no check was submitted or graded here.
            </p>
            <div className="flex flex-wrap gap-[16px] mt-6">
              <Link role="button" to="/courses/lessons" className={`${GOLD_BUTTON} w-full sm:w-[270px]`}>
                BACK TO LESSON
              </Link>
              <Link role="button" to="/courses/progress" className={`${WHITE_BUTTON} w-full sm:w-[300px]`}>
                VIEW LEARNING PROGRESS
              </Link>
              <button type="button" className={`${WHITE_BUTTON} w-full sm:w-[260px]`}>
                REVIEW QUICK CHECK
              </button>
            </div>
          </article>

          <article className="rounded-[8px] border border-[#dfe5f0] border-solid bg-surface-white p-[24px] w-full">
            <h3 className="font-display text-[20px] font-bold text-aktif-navy">
              Take these checks into your next lesson
            </h3>
            <ul className="flex flex-col gap-3 mt-4">
              <li className="flex gap-3 font-display text-[14px] leading-[1.5] text-text-primary">
                <span className="shrink-0 text-aktif-gold font-bold">&#10003;</span>
                Check the author.
              </li>
              <li className="flex gap-3 font-display text-[14px] leading-[1.5] text-text-primary">
                <span className="shrink-0 text-aktif-gold font-bold">&#10003;</span>
                Follow the evidence.
              </li>
              <li className="flex gap-3 font-display text-[14px] leading-[1.5] text-text-primary">
                <span className="shrink-0 text-aktif-gold font-bold">&#10003;</span>
                Consider the date.
              </li>
            </ul>
          </article>
        </section>
      </main>

      <div className="pt-8">
        <SiteFooter accountLabel="My account" accountPath="/account-profile" />
      </div>
    </div>
  )
}
