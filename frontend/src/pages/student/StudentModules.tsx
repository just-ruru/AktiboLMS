import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../../components/ui/Navbar'
import { SiteFooter } from '../../components/ui/SiteFooter'
import { backend, type Course, type CourseModule } from '../../lib/backendAdapter'

/**
 * Figma frame 109:80 — "Student · Subject modules".
 *
 * The frame is a course-context screen: a page-introduction band naming the
 * course, a section tab row (SUBJECTS / MODULES / ACTIVITY), a course-subjects
 * sidebar, a subject summary card and a list of module rows. The course and its
 * modules come from the API; subjects, lesson activity metadata and completion
 * progress have no endpoint, so those slots of the frame are rendered in their
 * Figma shape with neutral, explicit content.
 */
export function StudentModules() {
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

  const publishedModules = modules.filter((module) => module.published)

  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar activePath="/courses" accountName="STUDENT" />

      <section className="flex min-h-[176px] shrink-0 flex-col gap-[9px] bg-aktif-navy px-6 pb-[36px] pt-[22px] lg:px-[72px]">
        <p className="font-display text-[11px] font-bold leading-[1.5] text-aktif-gold">
          {selected ? `COURSES  /  ${selected.courseCode}` : 'COURSES'}
        </p>
        <div className="flex min-h-[62px] flex-col items-start gap-4 pt-[6px] sm:flex-row">
          <h1 className="font-['Castoro_Titling'] text-[34px] leading-[1.5] text-text-inverse">
            {selected?.courseTitle ?? 'Course modules'}
          </h1>
          <Link
            to="/courses/lessons"
            className="flex h-12 w-full max-w-[264px] items-center justify-center rounded-[9px] border border-black bg-aktif-gold font-display text-[12px] font-bold leading-[1.5] text-black transition-colors duration-200 hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus sm:ml-auto"
          >
            RESUME LEARNING
          </Link>
        </div>
        <p className="font-display text-[14px] leading-[1.5] text-[#d1d8ee]">
          {selected
            ? `${selected.units} units  ·  ${publishedModules.length} published modules`
            : 'No course is available to show modules for.'}
        </p>
      </section>

      <main className="w-full pl-6 pt-8 lg:pl-[72px]">
        <div className="flex w-full max-w-[1296px] flex-col gap-[28px] pb-[36px]">
          <div className="flex min-h-11 flex-wrap items-start gap-4">
            <Link
              to="/courses/subjects"
              className="flex h-11 w-[192px] items-center justify-center rounded-[9px] border border-border-light bg-aktif-white font-display text-[12px] font-bold leading-[1.5] text-aktif-navy transition-colors duration-200 hover:border-aktif-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              SUBJECTS&nbsp;&nbsp;—
            </Link>
            <span className="flex h-11 w-[192px] items-center justify-center rounded-[9px] border border-black bg-aktif-gold font-display text-[12px] font-bold leading-[1.5] text-black">
              MODULES&nbsp;&nbsp;{modules.length}
            </span>
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

          <div className="flex flex-col items-start gap-8 xl:flex-row xl:gap-[32px]">
            <aside className="flex w-full shrink-0 flex-col gap-[16px] rounded-[16px] border border-border-light bg-aktif-white px-4 pb-[74px] pt-6 xl:w-[312px]">
              <p className="pl-2 font-display text-[12px] font-bold leading-[1.5] text-aktif-navy">
                COURSE SUBJECTS
              </p>

              <div className="flex w-full flex-col gap-[16px] pt-3">
                <div className="flex h-[106px] w-full flex-col gap-[20px] rounded-[9px] bg-[#fff4cf] px-4 pb-[15px] pt-[14px]">
                  <p className="font-display text-[14px] font-bold leading-[1.5] text-text-primary">
                    Subject list not available
                  </p>
                  <p className="font-display text-[10px] leading-[1.5] text-text-secondary">
                    The backend has no subjects endpoint, so this course has no
                    subject navigation yet.
                  </p>
                </div>
              </div>

              <div className="h-px w-full bg-border-light" />

              <div className="flex w-full flex-col gap-[3px] pl-2 pt-[42px]">
                <p className="font-display text-[10px] font-bold leading-[1.5] text-text-secondary">
                  LEARNING ACTIVITIES
                </p>
                <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
                  Read a short lesson
                  <br />
                  Try code in place
                  <br />
                  Check your understanding
                </p>
              </div>
            </aside>

            <div className="flex w-full min-w-0 flex-col gap-[16px]">
              <section
                aria-label="Course module summary"
                className="flex min-h-[96px] w-full flex-col gap-[10px] rounded-[16px] border border-border-light bg-aktif-white px-6 pb-6 pt-[17px]"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="font-display text-[20px] font-bold leading-[1.5] text-text-primary">
                    {selected?.courseTitle ?? 'Course modules'}
                  </p>
                  <p className="font-display text-[24px] font-bold leading-[1.5] text-aktif-navy">—</p>
                </div>
                <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
                  {modules.length} modules&nbsp; · &nbsp;{publishedModules.length} published&nbsp; · &nbsp;
                  completion not tracked
                </p>
              </section>

              {status === 'loading' && (
                <p className="font-display text-[13px] leading-[1.5] text-text-secondary">Loading modules…</p>
              )}

              {status === 'error' && (
                <p role="alert" className="font-display text-[13px] leading-[1.5] text-state-danger">
                  {message}
                </p>
              )}

              {status === 'ready' && modules.length === 0 && (
                <section className="flex min-h-[112px] w-full flex-col gap-[9px] rounded-[16px] border border-border-light bg-aktif-white px-5 pb-5 pt-3">
                  <p className="font-display text-[10px] font-bold leading-[1.5] text-text-secondary">MODULE</p>
                  <p className="font-display text-[17px] font-bold leading-[1.5] text-text-primary">
                    No modules published yet
                  </p>
                  <p className="font-display text-[11px] leading-[1.5] text-text-secondary">
                    {selected
                      ? `This course has no modules in the backend yet.`
                      : 'There is no course to load modules from.'}
                  </p>
                </section>
              )}

              {status === 'ready' &&
                modules.map((module) => (
                  <article
                    key={module.id}
                    className="flex min-h-[112px] w-full flex-wrap items-start gap-5 rounded-[16px] border border-border-light bg-aktif-white px-5 pb-5 pt-3"
                  >
                    <div className="flex size-12 shrink-0 items-start justify-center rounded-[8px] bg-surface-light pb-3 pl-[11px] pr-4 pt-[13px]">
                      <p className="font-display text-[15px] font-bold leading-[1.5] text-aktif-navy">
                        {String(module.sequenceOrder).padStart(2, '0')}
                      </p>
                    </div>

                    <div className="flex w-full min-w-0 flex-1 flex-col gap-[16px] pt-[10px]">
                      <p className="font-display text-[17px] font-bold leading-[1.5] text-text-primary">
                        {module.moduleTitle}
                      </p>
                      <p className="font-display text-[11px] leading-[1.5] text-text-secondary">
                        Module details not available — the backend stores no lesson activities or duration.
                      </p>
                    </div>

                    <div className="flex w-full shrink-0 flex-col gap-[23px] pt-4 sm:w-[176px]">
                      <p className="font-display text-[10px] leading-[1.5] text-text-secondary">
                        {module.published ? 'Published' : 'Not published'}
                      </p>
                      <Link
                        to="/courses/lessons"
                        aria-disabled={!module.published}
                        className={`flex h-[42px] w-full items-center justify-center rounded-[9px] font-display text-[12px] font-bold leading-[1.5] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                          module.published
                            ? 'border border-black bg-aktif-gold text-black hover:bg-amber-400'
                            : 'pointer-events-none border border-border-light bg-aktif-white text-aktif-navy opacity-60'
                        }`}
                      >
                        START
                      </Link>
                    </div>
                  </article>
                ))}
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
