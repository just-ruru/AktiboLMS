import { Navbar } from "../../components/ui/Navbar";
import { SiteFooter } from "../../components/ui/SiteFooter";
import { Link } from "react-router-dom";

/**
 * Figma frame 140:756 — "Instructor · Practice editor".
 *
 * Reproduces the frame's panel composition (question list sidebar, question
 * and answer-options editing, feedback configuration, SAVE QUESTION action)
 * with neutral content. The backend has no practice-question endpoint, so the
 * editor regions render their Figma shape without inventing question records.
 */
export function InstructorPracticeEditor() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar activePath="/instructor/practice/edit" navIndicator="full" />

      <section className="flex min-h-[176px] flex-col gap-2 bg-aktif-navy px-6 pb-5 pt-[22px] lg:px-[72px]">
        <p className="font-display text-[10px] font-bold text-aktif-gold">INSTRUCTOR WORKSPACE</p>
        <div className="flex min-h-[60px] items-start justify-between shrink-0 w-full gap-4 flex-wrap sm:flex-nowrap">
          <h1 className="font-['Castoro_Titling'] text-[40px] leading-[1.5] text-text-inverse">Practice editor</h1>
        </div>
        <p className="font-display text-[14px] text-[#d1d8ee]">Create and manage practice sets for your learners.</p>
      </section>

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-start gap-6 px-6 pt-[32px] lg:px-[72px]">
        <div className="flex gap-4 w-full items-start flex-wrap sm:flex-nowrap">
          <button
            type="button"
            className="flex h-[48px] items-center justify-center rounded-[9px] border border-black border-solid bg-aktif-gold px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-black transition-colors hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            SAVE QUESTION
          </button>
          <button
            type="button"
            className="flex h-[48px] items-center justify-center rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:border-[#000e53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            PREVIEW QUESTION
          </button>
          <Link
            to="/instructor/courses"
            className="flex h-[48px] items-center justify-center rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:border-[#000e53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            BACK TO COURSES
          </Link>
        </div>

        <section className="flex w-full flex-col gap-4 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-6 lg:p-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-[21px] font-bold text-text-primary">Practice editor unavailable</h2>
            <p className="font-display text-[12px] text-text-secondary">No practice set available</p>
          </div>
          <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
            There is no backend endpoint for practice questions yet. This screen will support
            practice management once the practice API is available.
          </p>
          <Link
            to="/instructor/courses"
            className="flex h-[40px] w-[176px] items-center justify-center rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:border-[#000e53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            Browse courses
          </Link>
        </section>

        <section aria-label="Question list" className="flex w-full flex-col gap-4 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-6 lg:p-10">
          <h2 className="font-display text-[21px] font-bold text-text-primary">Question list</h2>
          <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
            No questions have been created yet. Add a question to begin building a practice set.
          </p>
        </section>

        <section aria-label="Question editor" className="flex w-full flex-col gap-4 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-6 lg:p-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-3">
              <span className="font-display text-[12px] font-bold text-text-primary">Prompt</span>
              <p className="font-display text-[11px] text-text-secondary">No prompt text available</p>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-3">
              <span className="font-display text-[12px] font-bold text-text-primary">Answer options</span>
              <p className="font-display text-[11px] text-text-secondary">No options available</p>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-3">
              <span className="font-display text-[12px] font-bold text-text-primary">Feedback</span>
              <p className="font-display text-[11px] text-text-secondary">No feedback configured</p>
            </div>
          </div>
        </section>
      </main>

      <div className="pt-8">
        <SiteFooter />
      </div>
    </div>
  );
}
