import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../../components/ui/Navbar'
import { SiteFooter } from '../../components/ui/SiteFooter'
import { backend, type Course } from '../../lib/backendAdapter'

/**
 * Figma frame 109:620 — "Instructor · Course subjects".
 *
 * Reproduces the frame's panel composition (subjects navigation, teaching
 * summary, course subjects list, latest course update, enrolment access) with
 * neutral, explicit content. The backend has no subjects endpoint, so the
 * subjects regions render their Figma shape without inventing sample records.
 */
export function InstructorSubjects() {
  const [courses, setCourses] = useState<Course[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    let active = true
    backend
      .getCourses()
      .then((data) => {
        if (!active) return
        setCourses(data)
        setStatus('ready')
      })
      .catch(() => {
        if (!active) return
        setStatus('error')
      })
    return () => {
      active = false
    }
  }, [])

  const tab = (active: boolean) =>
    `flex h-11 items-center justify-center rounded-[9px] border px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
      active
        ? 'border-black border-solid bg-aktif-gold text-black hover:bg-amber-400'
        : 'border-[#dee4ee] border-solid bg-surface-white text-aktif-navy hover:border-[#000e53]'
    }`

  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar activePath="/instructor/courses/subjects" navIndicator="full" />

      <section className="flex min-h-[176px] flex-col gap-2 bg-aktif-navy px-6 pb-5 pt-[22px] lg:px-[72px]">
        <p className="font-display text-[10px] font-bold text-aktif-gold">INSTRUCTOR WORKSPACE</p>
        <div className="flex min-h-[60px] items-start justify-between shrink-0 w-full gap-4 flex-wrap sm:flex-nowrap">
          <h1 className="font-['Castoro_Titling'] text-[40px] leading-[1.5] text-text-inverse">Course subjects</h1>
        </div>
        <p className="font-display text-[14px] text-[#d1d8ee]">Organise your courses by subject area and track what you teach.</p>
      </section>

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-start gap-6 px-6 pt-[32px] lg:px-[72px]">
        <div className="flex gap-4 w-full items-start flex-wrap sm:flex-nowrap">
          <Link
            to="/instructor/courses/new"
            className={`${tab(true)}`}
          >
            EDIT COURSE
          </Link>
          <Link
            to="/instructor/courses/subjects"
            className={`${tab(true)}`}
          >
            SUBJECTS
          </Link>
          <Link
            to="/instructor/courses/modules"
            className={`${tab(false)}`}
          >
            MODULES
          </Link>
          <Link
            to="/instructor/progress"
            className={`${tab(false)}`}
          >
            ACTIVITY
          </Link>
        </div>

        <section className="flex w-full flex-col gap-4 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-6 lg:p-10">
          <h2 className="font-display text-[21px] font-bold text-text-primary">Teaching summary</h2>
          {status === 'loading' && (
            <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
              Loading your courses…
            </p>
          )}
          {status === 'error' && (
            <p role="alert" className="font-display text-[12px] leading-[1.5] text-state-danger">
              We couldn’t load your courses. Please try again.
            </p>
          )}
          {status === 'ready' && courses.length === 0 && (
            <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
              No courses yet. Create a course to start teaching.
            </p>
          )}
          {status === 'ready' && courses.length > 0 && (
            <>
              <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
                {courses.length} {courses.length === 1 ? 'course' : 'courses'} in the catalogue.
                Subject areas and module counts appear once the subjects API is available.
              </p>
              <ul className="flex w-full flex-col gap-2">
                {courses.map((course) => (
                  <li
                    key={course.id}
                    className="flex w-full flex-wrap items-center justify-between gap-3 rounded-[9px] border border-[#dee4ee] border-solid px-4 py-3"
                  >
                    <span className="font-display text-[14px] font-bold leading-[1.5] text-text-primary">
                      {course.courseTitle}
                    </span>
                    <span className="font-display text-[12px] leading-[1.5] text-text-secondary">
                      {course.courseCode} · {course.units} units
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        <section className="flex w-full flex-col gap-4 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-6 lg:p-10">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-[21px] font-bold text-text-primary">Subjects</h2>
            <p className="font-display text-[12px] text-text-secondary">No subjects</p>
          </div>
          <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
            Subjects unavailable.
          </p>
          <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
            The subjects endpoint is not available yet.
          </p>
        </section>

        <section className="flex w-full flex-col gap-4 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-6 lg:p-10">
          <h2 className="font-display text-[21px] font-bold text-text-primary">Latest course update</h2>
          <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
            No course updates available. The backend does not publish course updates yet.
          </p>
        </section>

        <section className="flex w-full flex-col gap-4 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-6 lg:p-10">
          <h2 className="font-display text-[21px] font-bold text-text-primary">Enrolment access</h2>
          <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
            No enrolment access records available. The backend does not track enrolment access yet.
          </p>
        </section>
      </main>

      <div className="pt-8">
        <SiteFooter />
      </div>
    </div>
  )
}
