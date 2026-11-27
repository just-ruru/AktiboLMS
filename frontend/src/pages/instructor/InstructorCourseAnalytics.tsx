import { Navbar } from "../../components/ui/Navbar";
import { SiteFooter } from "../../components/ui/SiteFooter";
import { Link } from "react-router-dom";

/**
 * Figma frame 140:506 — "Instructor · Course analytics".
 *
 * Reproduces the frame's panel composition (metrics stat tiles, practice
 * accuracy by subject, where learners get stuck, learner performance table)
 * with neutral content. The backend has no analytics endpoint (getCourses and
 * getCourseAssignments only supply catalogue/assignment data), so the chart
 * and table keep their axes and headers but show no data, and no invented
 * learner or sample records appear anywhere.
 */
export function InstructorCourseAnalytics() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar activePath="/instructor/analytics" navIndicator="full" />

      <section className="flex min-h-[176px] flex-col gap-2 bg-aktif-navy px-6 pb-5 pt-[22px] lg:px-[72px]">
        <p className="font-display text-[10px] font-bold text-aktif-gold">INSTRUCTOR WORKSPACE</p>
        <div className="flex min-h-[60px] items-start justify-between shrink-0 w-full gap-4 flex-wrap sm:flex-nowrap">
          <h1 className="font-['Castoro_Titling'] text-[32px] leading-[1.5] text-text-inverse lg:text-[40px]">Course performance</h1>
        </div>
        <p className="font-display text-[14px] text-[#d1d8ee]">View analytics and insights for your courses.</p>
      </section>

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-start gap-6 px-6 pt-[32px] lg:px-[72px]">
        <div className="flex gap-4 w-full items-start flex-wrap sm:flex-nowrap">
          <button
            type="button"
            className="flex h-[44px] items-center justify-center rounded-[9px] border border-black border-solid bg-aktif-gold px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-black transition-colors hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            OVERVIEW
          </button>
          <button
            type="button"
            className="flex h-[44px] items-center justify-center rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:border-[#000e53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            LEARNERS
          </button>
          <button
            type="button"
            className="flex h-[44px] items-center justify-center rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:border-[#000e53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            ACTIVITIES
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
            <h2 className="font-display text-[21px] font-bold text-text-primary">Analytics unavailable</h2>
            <p className="font-display text-[12px] text-text-secondary">No analytics data</p>
          </div>
          <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
            There is no backend endpoint for course analytics yet. This screen will show analytics
            once the analytics API is available.
          </p>
          <Link
            to="/instructor/courses"
            className="flex h-[40px] w-[176px] items-center justify-center rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:border-[#000e53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            Browse courses
          </Link>
        </section>

        <section aria-label="Metrics" className="flex w-full flex-col gap-4 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-6 lg:p-10">
          <h2 className="font-display text-[21px] font-bold text-text-primary">Metrics</h2>
          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <p className="font-display text-[10px] font-bold text-text-secondary">Enrolled learners</p>
              <p className="font-display text-[26px] font-bold leading-[1.5] text-text-primary">—</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-display text-[10px] font-bold text-text-secondary">Average progress</p>
              <p className="font-display text-[26px] font-bold leading-[1.5] text-text-primary">—</p>
            </div>
          </div>
        </section>

        <section aria-label="Practice accuracy by subject" className="flex w-full flex-col gap-4 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-6 lg:p-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-[21px] font-bold text-text-primary">Practice accuracy by subject</h2>
            <p className="font-display text-[12px] text-text-secondary">No data</p>
          </div>
          <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
            No practice accuracy data is available yet. The chart will render per-subject accuracy
            once the analytics API is available.
          </p>
        </section>

        <section aria-label="Where learners get stuck" className="flex w-full flex-col gap-4 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-6 lg:p-10">
          <h2 className="font-display text-[21px] font-bold text-text-primary">Where learners get stuck</h2>
          <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
            No stuck-point data is available yet.
          </p>
        </section>

        <section aria-label="Learner performance" className="flex w-full flex-col gap-4 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-6 lg:p-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-[21px] font-bold text-text-primary">Learner overview</h2>
            <p className="font-display text-[12px] text-text-secondary">No records yet</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#dee4ee]">
                  <th className="font-display text-[11px] font-bold text-text-secondary pb-2">Learner</th>
                  <th className="font-display text-[11px] font-bold text-text-secondary pb-2">Progress</th>
                  <th className="font-display text-[11px] font-bold text-text-secondary pb-2">Quiz average</th>
                  <th className="font-display text-[11px] font-bold text-text-secondary pb-2">Last active</th>
                  <th className="font-display text-[11px] font-bold text-text-secondary pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-display text-[12px] text-text-secondary py-4" colSpan={5}>
                    No records
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
