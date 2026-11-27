import { Navbar } from "../../components/ui/Navbar";
import { SiteFooter } from "../../components/ui/SiteFooter";
import { Link } from "react-router-dom";

/**
 * Figma frame 109:714 — "Instructor · Subject modules".
 *
 * Reproduces the frame's panel composition (subject sidebar, subject summary,
 * module rows 01-04 with EDIT MODULE actions) with neutral content. Module
 * management requires a course context and the backend exposes no subject or
 * module listing independent of a course, so this screen renders its Figma
 * shape in a neutral empty state instead of inventing module records.
 */
export function InstructorModules() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar activePath="/instructor/courses/modules" navIndicator="full" />

      <section className="flex min-h-[176px] flex-col gap-2 bg-aktif-navy px-6 pb-5 pt-[22px] lg:px-[72px]">
        <p className="font-display text-[10px] font-bold text-aktif-gold">INSTRUCTOR WORKSPACE</p>
        <div className="flex min-h-[60px] items-start justify-between shrink-0 w-full gap-4 flex-wrap sm:flex-nowrap">
          <h1 className="font-['Castoro_Titling'] text-[40px] leading-[1.5] text-text-inverse">Subject modules</h1>
        </div>
        <p className="font-display text-[14px] text-[#d1d8ee]">View and organise the modules within each of your courses.</p>
      </section>

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-start gap-6 px-6 pt-[32px] lg:px-[72px]">
        <div className="flex gap-4 w-full items-start flex-wrap sm:flex-nowrap">
          <Link
            to="/instructor/courses/modules"
            className="flex h-[44px] items-center justify-center rounded-[9px] border border-black border-solid bg-aktif-gold px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-black transition-colors hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            CREATE MODULE
          </Link>
          <Link
            to="/instructor/courses/subjects"
            className="flex h-[44px] items-center justify-center rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:border-[#000e53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            SUBJECTS
          </Link>
          <Link
            to="/instructor/progress"
            className="flex h-[44px] items-center justify-center rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:border-[#000e53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            ACTIVITY
          </Link>
          <Link
            to="/instructor/courses"
            className="flex h-[44px] items-center justify-center rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:border-[#000e53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            BACK TO COURSES
          </Link>
        </div>

        <section className="flex w-full flex-col gap-4 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-6 lg:p-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-[21px] font-bold text-text-primary">Subject summary</h2>
            <p className="font-display text-[12px] text-text-secondary">No subject selected</p>
          </div>
          <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
            Open a subject from your courses list to see its module summary here.
          </p>
        </section>

        <section className="flex w-full flex-col gap-4 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-6 lg:p-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-[21px] font-bold text-text-primary">Modules unavailable</h2>
            <p className="font-display text-[12px] text-text-secondary">No course context</p>
          </div>
          <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
            Module management requires a course context — open a course from your courses list first.
          </p>
          <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
            Once a course is open, this panel lists its modules (01, 02, 03, 04) with EDIT MODULE
            actions for each row.
          </p>
          <Link
            to="/instructor/courses"
            className="flex h-[40px] w-[176px] items-center justify-center rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:border-[#000e53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            Browse courses
          </Link>
        </section>
      </main>

      <div className="pt-8">
        <SiteFooter />
      </div>
    </div>
  );
}
