import { Navbar } from "../../components/ui/Navbar";
import { SiteFooter } from "../../components/ui/SiteFooter";
import { Link, useNavigate } from "react-router-dom";

/**
 * Figma frame 140:631 — "Instructor · Learner progress".
 *
 * Reproduces the frame's panel composition (learner summary, progress by
 * subject, current learning, recorded activity table) with neutral content.
 * The backend has no learner-progress endpoint, so the summary tiles and the
 * recorded-activity table keep their labels and headers but show no data, and
 * no invented learner or sample records appear anywhere.
 */
export function InstructorLearnerProgress() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar activePath="/instructor/progress" navIndicator="full" />

      <section className="flex min-h-[176px] flex-col gap-2 bg-aktif-navy px-6 pb-5 pt-[22px] lg:px-[72px]">
        <p className="font-display text-[10px] font-bold text-aktif-gold">INSTRUCTOR WORKSPACE</p>
        <div className="flex min-h-[60px] items-start justify-between shrink-0 w-full gap-4 flex-wrap sm:flex-nowrap">
          <h1 className="font-['Castoro_Titling'] text-[40px] leading-[1.5] text-text-inverse">Learner progress</h1>
        </div>
        <p className="font-display text-[14px] text-[#d1d8ee]">Track your learners' progress across your courses.</p>
      </section>

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-start gap-6 px-6 pt-[32px] lg:px-[72px]">
        <div className="flex gap-4 w-full items-start flex-wrap sm:flex-nowrap">
          <button
            type="button"
            className="flex h-[44px] items-center justify-center rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:border-[#000e53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            onClick={() => navigate("/instructor/analytics")}
          >
            BACK TO ANALYTICS
          </button>
          <Link
            to="/instructor/courses"
            className="flex h-[44px] items-center justify-center rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:border-[#000e53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            BACK TO COURSES
          </Link>
        </div>

        <section className="flex w-full flex-col gap-4 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-6 lg:p-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-[21px] font-bold text-text-primary">Learner progress unavailable</h2>
            <p className="font-display text-[12px] text-text-secondary">No progress data</p>
          </div>
          <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
            There is no backend endpoint for learner progress tracking yet. This screen will show
            progress data once the progress API is available.
          </p>
          <Link
            to="/instructor/courses"
            className="flex h-[40px] w-[176px] items-center justify-center rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:border-[#000e53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            Browse courses
          </Link>
        </section>

        <section aria-label="Learner summary" className="flex w-full flex-col gap-4 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-6 lg:p-10">
          <h2 className="font-display text-[21px] font-bold text-text-primary">Learner summary</h2>
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <p className="font-display text-[10px] font-bold text-text-secondary">Course progress</p>
              <p className="font-display text-[26px] font-bold leading-[1.5] text-text-primary">—</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-display text-[10px] font-bold text-text-secondary">Quiz average</p>
              <p className="font-display text-[26px] font-bold leading-[1.5] text-text-primary">—</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-display text-[10px] font-bold text-text-secondary">Last activity</p>
              <p className="font-display text-[26px] font-bold leading-[1.5] text-text-primary">—</p>
            </div>
          </div>
        </section>

        <section aria-label="Progress by subject" className="flex w-full flex-col gap-4 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-6 lg:p-10">
          <h2 className="font-display text-[21px] font-bold text-text-primary">Progress by subject</h2>
          <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
            No progress-by-subject data is available yet.
          </p>
        </section>

        <section aria-label="Current learning" className="flex w-full flex-col gap-4 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-6 lg:p-10">
          <h2 className="font-display text-[21px] font-bold text-text-primary">Current learning</h2>
          <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
            No current learning activity is recorded yet.
          </p>
        </section>

        <section aria-label="Recorded activity" className="flex w-full flex-col gap-4 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-6 lg:p-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-[21px] font-bold text-text-primary">Recorded activity</h2>
            <p className="font-display text-[12px] text-text-secondary">No data</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#dee4ee]">
                  <th className="font-display text-[11px] font-bold text-text-secondary pb-2">Lesson / activity</th>
                  <th className="font-display text-[11px] font-bold text-text-secondary pb-2">Type</th>
                  <th className="font-display text-[11px] font-bold text-text-secondary pb-2">Result</th>
                  <th className="font-display text-[11px] font-bold text-text-secondary pb-2">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-display text-[12px] text-text-secondary py-4" colSpan={4}>
                    No data
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <div className="pt-8">
        <SiteFooter />
      </div>
    </div>
  );
}
