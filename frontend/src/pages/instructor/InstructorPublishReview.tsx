import { Navbar } from "../../components/ui/Navbar";
import { SiteFooter } from "../../components/ui/SiteFooter";
import { Link } from "react-router-dom";

/**
 * Figma frame 140:881 — "Instructor · Publish review".
 *
 * Reproduces the frame's panel composition (learner preview, publication
 * sidebar checklist, publishing summary, PUBLISH CHANGES action) with neutral
 * content. Publishing uses create/update/deleteCourse, but no course is ready
 * to publish here, so the screen renders its Figma shape without inventing
 * course records.
 */
export function InstructorPublishReview() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar activePath="/instructor/publish/review" navIndicator="full" />

      <section className="flex min-h-[176px] flex-col gap-2 bg-aktif-navy px-6 pb-5 pt-[22px] lg:px-[72px]">
        <p className="font-display text-[10px] font-bold text-aktif-gold">INSTRUCTOR WORKSPACE</p>
        <div className="flex min-h-[60px] items-start justify-between shrink-0 w-full gap-4 flex-wrap sm:flex-nowrap">
          <h1 className="font-['Castoro_Titling'] text-[40px] leading-[1.5] text-text-inverse">Review and publish</h1>
        </div>
        <p className="font-display text-[14px] text-[#d1d8ee]">Review your course before publishing it to learners.</p>
      </section>

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-start gap-6 px-6 pt-[32px] lg:px-[72px]">
        <div className="flex gap-4 w-full items-start flex-wrap sm:flex-nowrap">
          <button
            type="button"
            className="flex h-[48px] items-center justify-center rounded-[9px] border border-black border-solid bg-aktif-gold px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-black transition-colors hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            PUBLISH CHANGES
          </button>
          <button
            type="button"
            className="flex h-[48px] items-center justify-center rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:border-[#000e53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            BACK TO EDITOR
          </button>
          <button
            type="button"
            className="flex h-[48px] items-center justify-center rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:border-[#000e53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            LEARNER PREVIEW
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
            <h2 className="font-display text-[21px] font-bold text-text-primary">Publish review unavailable</h2>
            <p className="font-display text-[12px] text-text-secondary">No course context</p>
          </div>
          <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
            No course is ready to publish yet. Create or edit a course first, then return here to
            review and publish it.
          </p>
          <Link
            to="/instructor/courses/new"
            className="flex h-[40px] w-[176px] items-center justify-center rounded-[9px] border border-black border-solid bg-aktif-gold px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-black transition-colors hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            Create course
          </Link>
        </section>

        <section aria-label="Learner preview" className="flex w-full flex-col gap-4 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-6 lg:p-10">
          <h2 className="font-display text-[21px] font-bold text-text-primary">Preview</h2>
          <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
            Ready for your learners. No course content is available to preview yet.
          </p>
        </section>

        <section aria-label="Publishing summary" className="flex w-full flex-col gap-4 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-6 lg:p-10">
          <h2 className="font-display text-[21px] font-bold text-text-primary">Publishing summary</h2>
          <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
            No publishing summary available until a course is ready to publish.
          </p>
        </section>
      </main>

      <div className="pt-8">
        <SiteFooter />
      </div>
    </div>
  );
}
