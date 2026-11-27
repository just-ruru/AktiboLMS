import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../../components/ui/Navbar'
import { SiteFooter } from '../../components/ui/SiteFooter'
import { backend, type Course, type CourseModule } from '../../lib/backendAdapter'

/**
 * Figma frame 109:42 — "Student · Course subjects".
 *
 * The frame shows one course with its subject list, a progress summary, the
 * latest course update and the next learning step. Only two of those regions
 * have a confirmed backend source: the course itself and its modules. Subjects,
 * progress and course updates have no endpoint at all, so those regions are
 * rendered in their Figma shape with neutral, explicit content instead of the
 * frame's sample records.
 */
export function StudentSubjects() {
  const [courses, setCourses] = useState<Course[]>([])
  const [selected, setSelected] = useState<Course | null>(null)
  const [fetchedModules, setModules] = useState<CourseModule[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    let active = true
    backend
      .getCourses()
      .then((data) => {
        if (!active) return
        setCourses(data)
        setSelected(data[0] ?? null)
        setStatus('ready')
      })
      .catch(() => {
        if (!active) return
        setStatus('error')
        setMessage("We couldn't load the course catalogue. Please try again.")
      })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (!selected) return
    let active = true
    backend
      .getCourseModules(selected.id)
      .then((data) => {
        if (active) setModules(data)
      })
      .catch(() => {
        if (active) setModules([])
      })
    return () => {
      active = false
    }
  }, [selected])

  const modules = selected ? fetchedModules : []

  const nextModule = modules[0]
  const publishedModules = modules.filter((module) => module.published)

  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar activePath="/courses" accountName="STUDENT" />

      <section className="flex h-[176px] shrink-0 flex-col gap-[9px] bg-aktif-navy px-6 pb-[36px] pt-[22px] lg:px-[72px]">
        <p className="font-display text-[11px] font-bold leading-[1.5] text-aktif-gold">
          {selected ? `COURSES  /  ${selected.courseCode}` : 'COURSES'}
        </p>
        <div className="flex h-[62px] items-start pt-[6px]">
          <h1 className="font-['Castoro_Titling'] text-[34px] leading-[1.5] text-text-inverse">
            {selected?.courseTitle ?? 'Course subjects'}
          </h1>
          <Link
            to="/courses/lessons"
            className="ml-auto flex h-12 w-[264px] items-center justify-center rounded-[9px] border border-black bg-aktif-gold font-display text-[12px] font-bold leading-[1.5] text-black transition-colors duration-200 hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            RESUME LEARNING
          </Link>
        </div>
        <p className="font-display text-[14px] leading-[1.5] text-[#d1d8ee]">
          {selected
            ? `${selected.units} units  ·  ${publishedModules.length} published modules`
            : 'No course is available to show subjects for.'}
        </p>
      </section>

      <main className="w-full pl-6 pt-8 lg:pl-[72px]">
        <div className="flex w-full max-w-[1296px] flex-col gap-[9px] pb-[34px]">
          <div className="flex min-h-11 flex-wrap items-start gap-4">
            <span className="flex h-11 w-[192px] items-center justify-center rounded-[9px] border border-black bg-aktif-gold font-display text-[12px] font-bold leading-[1.5] text-black">
              SUBJECTS
            </span>
            <Link
              to="/courses/subjects/modules"
              className="flex h-11 w-[192px] items-center justify-center rounded-[9px] border border-border-light bg-aktif-white font-display text-[12px] font-bold leading-[1.5] text-aktif-navy transition-colors duration-200 hover:border-aktif-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              MODULES  {publishedModules.length}
            </Link>
            <Link
              to="/courses/progress"
              className="flex h-11 w-[176px] items-center justify-center rounded-[9px] border border-border-light bg-aktif-white font-display text-[12px] font-bold leading-[1.5] text-aktif-navy transition-colors duration-200 hover:border-aktif-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              ACTIVITY
            </Link>
            {courses.length > 1 && (
              <label htmlFor="course-switcher" className="ml-auto flex h-11 w-full items-center gap-3 lg:w-auto">
                <span className="font-display text-[10px] font-bold leading-[1.5] text-text-secondary">COURSE</span>
                <select
                  id="course-switcher"
                  value={selected?.id ?? ''}
                  onChange={(event) => {
                    const next = courses.find((course) => course.id === Number(event.target.value))
                    if (next) setSelected(next)
                  }}
                  className="h-11 w-full rounded-[9px] border border-border-light bg-aktif-white px-4 font-display text-[13px] text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus lg:w-[240px]"
                >
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.courseCode}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>

          <section
            aria-label="Course progress summary"
            className="flex min-h-24 flex-wrap items-start gap-x-[72px] gap-y-4 rounded-[16px] border border-border-light bg-aktif-white px-6 pb-[26px] pt-[17px] lg:pr-[121px]"
          >
            <div className="flex w-full max-w-[216px] flex-col gap-[10px]">
              <p className="font-display text-[16px] font-bold leading-[1.5] text-text-primary">Your course progress</p>
              <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
                The backend does not track course progress yet.
              </p>
            </div>
            <div className="flex w-full min-w-0 flex-1 items-start pt-[30px] lg:w-auto lg:pl-[196px]">
              <div className="h-2 w-full max-w-[530px] overflow-hidden rounded-[4px] bg-[#e5eaf4]" aria-hidden="true" />
            </div>
            <p className="font-display text-[26px] font-bold leading-[1.5] text-aktif-navy">—</p>
          </section>

          <div className="flex flex-col pt-[17px]">
            <h2 className="font-display text-[22px] font-bold leading-[1.5] text-text-primary">Course subjects</h2>
          </div>
          <p className="font-display text-[13px] leading-[1.5] text-text-secondary">
            Open a subject to explore its modules and hands-on activities.
          </p>

          <div className="flex flex-col pt-[15px]">
            <div className="flex w-full flex-wrap gap-6">
              {status === 'loading' && (
                <p className="font-display text-[13px] text-text-secondary">Loading the course catalogue…</p>
              )}

              {status === 'error' && (
                <p role="alert" className="font-display text-[13px] text-state-danger">
                  {message}
                </p>
              )}

              {status === 'ready' && !selected && (
                <section className="flex h-[248px] w-full max-w-[416px] flex-col gap-[10px] rounded-[16px] border border-border-light bg-aktif-white px-6 pb-6 pt-5">
                  <p className="font-display text-[10px] font-bold leading-[1.5] text-text-secondary">SUBJECTS</p>
                  <h3 className="font-display text-[18px] font-bold leading-[1.5] text-text-primary">
                    No courses published yet
                  </h3>
                  <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
                    The course catalogue is empty, so there is no course to show subjects for.
                  </p>
                </section>
              )}

              {status === 'ready' && selected && (
                <section className="flex h-[248px] w-full max-w-[416px] flex-col gap-[10px] rounded-[16px] border border-border-light bg-aktif-white px-6 pb-6 pt-5">
                  <p className="font-display text-[10px] font-bold leading-[1.5] text-text-secondary">SUBJECTS</p>
                  <h3 className="font-display text-[18px] font-bold leading-[1.5] text-text-primary">
                    Subject list not available
                  </h3>
                  <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
                    The backend has no subjects endpoint, so this course&apos;s subject list cannot be loaded.
                  </p>
                  <div className="mt-auto flex items-start">
                    <Link
                      to="/courses/subjects/modules"
                      className="flex h-10 w-[192px] items-center justify-center rounded-[9px] border border-black bg-aktif-gold font-display text-[12px] font-bold leading-[1.5] text-black transition-colors duration-200 hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                    >
                      VIEW MODULES
                    </Link>
                  </div>
                </section>
              )}
            </div>
          </div>

          <div className="flex flex-col pt-[21px]">
            <div className="flex w-full flex-wrap gap-6">
              <section className="flex h-[156px] w-full max-w-[856px] flex-col gap-[10px] rounded-[16px] border border-border-light bg-aktif-white px-6 pb-[19px] pt-[18px]">
                <p className="font-display text-[10px] font-bold leading-[1.5] text-text-secondary">
                  LATEST COURSE UPDATE
                </p>
                <h3 className="font-display text-[17px] font-bold leading-[1.5] text-text-primary">
                  No course updates available
                </h3>
                <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
                  The backend does not publish course updates yet.
                </p>
                <p className="mt-auto font-display text-[10px] leading-[1.5] text-text-secondary">—</p>
              </section>

              <section className="flex h-[156px] w-full max-w-[416px] flex-col gap-[13px] rounded-[16px] border border-border-light bg-aktif-white px-6 pb-[21px] pt-[18px]">
                <p className="font-display text-[10px] font-bold leading-[1.5] text-text-secondary">UP NEXT</p>
                <p className="font-display text-[16px] font-bold leading-[1.5] text-text-primary">
                  {nextModule?.moduleTitle ?? 'No next step available'}
                </p>
                <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
                  {nextModule ? 'Read · Code · Quick check' : 'No module is published for this course yet.'}
                </p>
                <p className="mt-auto font-display text-[11px] leading-[1.5] text-aktif-navy">
                  {nextModule ? `Module ${String(nextModule.sequenceOrder).padStart(2, '0')}` : '—'}
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <div className="pt-8">
        <SiteFooter accountLabel="My account" accountPath="/account-profile" />
      </div>
    </div>
  )
}
