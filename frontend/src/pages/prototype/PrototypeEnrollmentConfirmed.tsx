import { Link } from 'react-router-dom'
import { Navbar } from '../../components/ui/Navbar'
import { SiteFooter } from '../../components/ui/SiteFooter'

const GOLD_BUTTON =
  'h-11 rounded-[9px] border border-[#000e53] bg-aktif-gold px-[10px] py-[10px] font-display text-[11px] font-bold text-aktif-navy flex items-center justify-center'

const WHITE_BUTTON =
  'h-11 rounded-[9px] border border-[#dfe5f0] bg-surface-white px-[10px] py-[10px] font-display text-[11px] font-bold text-aktif-navy flex items-center justify-center'

/**
 * Figma frame 142:387 — "Student · Enrollment confirmed".
 *
 * Reproduces the frame's composition: page shell, the "Enrollment success"
 * confirmation card and the "Enrolled course details" panel with its summary
 * rows and next-step actions. The enrollment is prototype content only — the
 * backend has no enrollment endpoint, so no real enrollment was created and no
 * learner identity, course code or counts are presented as real data.
 */
export function PrototypeEnrollmentConfirmed() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar activePath="/courses" />

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-start gap-6 px-6 pt-8 lg:px-[72px]">
        <section className="flex w-full flex-col gap-2 bg-aktif-navy px-6 pb-5 pt-[22px]">
          <p className="font-display text-[10px] font-bold text-aktif-gold">
            STUDENT WORKSPACE / ENROLLMENT
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:gap-4 w-full gap-4">
            <h1 className="font-['Castoro_Titling'] text-[36px] leading-[1.2] text-text-inverse">
              You are enrolled
            </h1>
            <Link role="button" to="/courses" className={`${GOLD_BUTTON} w-full shrink-0 lg:w-[264px]`}>
              BACK TO COURSES
            </Link>
          </div>
          <p className="font-display text-[13px] text-[#d1d8ee]">
            Data Fundamentals · Enrollment confirmed
          </p>
        </section>

        <section className="flex w-full flex-col gap-[24px]">
          <article className="rounded-[8px] border border-[#dfe5f0] border-solid bg-[#e8f4ef] p-[24px] w-full">
            <p className="font-display text-[11px] font-bold text-text-secondary">
              ENROLLMENT CONFIRMED
            </p>
            <h2 className="font-display text-[28px] font-bold leading-[1.5] text-aktif-navy">
              Your next chapter is ready.
            </h2>
            <p className="font-display text-[15px] leading-[1.5] text-text-primary">
              This is a prototype — no real enrollment was created. The backend has no enrollment
              endpoint, so no course enrollment was recorded here.
            </p>
            <Link role="button" to="/courses" className={`${GOLD_BUTTON} w-full mt-6 lg:w-[280px]`}>
              BACK TO COURSES
            </Link>
          </article>

          <article className="rounded-[8px] border border-[#dfe5f0] border-solid bg-surface-white p-[24px] w-full">
            <h2 className="font-display text-[26px] font-bold text-aktif-navy">
              Data Fundamentals
            </h2>
            <dl className="flex flex-col gap-2 mt-4">
              <div className="flex gap-4">
                <dt className="font-display text-[13px] font-bold text-text-primary">Course</dt>
                <dd className="font-display text-[13px] text-text-secondary">—</dd>
              </div>
              <div className="flex gap-4">
                <dt className="font-display text-[13px] font-bold text-text-primary">
                  Subjects · Modules
                </dt>
                <dd className="font-display text-[13px] text-text-secondary">— · —</dd>
              </div>
              <div className="flex gap-4">
                <dt className="font-display text-[13px] font-bold text-text-primary">
                  Enrollment code
                </dt>
                <dd className="font-display text-[13px] text-text-secondary">—</dd>
              </div>
            </dl>
            <p className="font-display text-[15px] leading-[1.5] text-text-primary mt-6">
              Course details are not available — there is no enrollment endpoint to confirm
              enrollment against.
            </p>
            <Link role="button" to="/courses" className={`${WHITE_BUTTON} w-full mt-6 lg:w-[280px]`}>
              VIEW MY LEARNING
            </Link>
          </article>
        </section>
      </main>

      <div className="pt-8">
        <SiteFooter accountLabel="My account" accountPath="/account-profile" />
      </div>
    </div>
  )
}
