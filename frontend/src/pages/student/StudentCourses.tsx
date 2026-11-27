import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../../components/ui/Navbar'
import { SiteFooter } from '../../components/ui/SiteFooter'
import { backend, type Course } from '../../lib/backendAdapter'

/**
 * Figma frame 109:4 — "Student · Courses".
 *
 * The frame is a catalogue workspace: a page-introduction band, a view-tab row,
 * a search / filter / sort row, a result count line, and a three-column grid of
 * course cards. Only the course records themselves come from the API
 * (`GET /api/courses`) plus their module counts
 * (`GET /api/courses/{courseId}/modules`). Enrolment, progress, categories and
 * instructors have no endpoint at all, so those slots of the frame are rendered
 * in their Figma shape with neutral, explicit content instead of the frame's
 * sample records.
 */

type SortMode = 'updated' | 'title' | 'units'
type StatusFilter = 'ALL' | 'PUBLISHED' | 'DRAFT' | 'ARCHIVED'

const CARD_STATUS: Record<Course['status'], string> = {
  PUBLISHED: 'Open to enroll',
  DRAFT: 'Draft',
  ARCHIVED: 'Archived',
}

export function StudentCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [moduleCounts, setModuleCounts] = useState<Record<number, number>>({})
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortMode>('updated')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL')
  const [filtersOpen, setFiltersOpen] = useState(false)

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
        setMessage("We couldn't load the course catalogue. Please try again.")
      })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (courses.length === 0) return
    let active = true
    Promise.all(
      courses.map(async (course) => {
        try {
          const modules = await backend.getCourseModules(course.id)
          return [course.id, modules.length] as const
        } catch {
          return [course.id, 0] as const
        }
      }),
    ).then((entries) => {
      if (!active) return
      setModuleCounts(Object.fromEntries(entries))
    })
    return () => {
      active = false
    }
  }, [courses])

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const filtered = courses.filter((course) => {
      if (statusFilter !== 'ALL' && course.status !== statusFilter) return false
      if (!needle) return true
      return (
        course.courseCode.toLowerCase().includes(needle) ||
        course.courseTitle.toLowerCase().includes(needle) ||
        (course.description ?? '').toLowerCase().includes(needle)
      )
    })
    return [...filtered].sort((a, b) => {
      if (sort === 'title') return a.courseTitle.localeCompare(b.courseTitle)
      if (sort === 'units') return b.units - a.units
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })
  }, [courses, query, sort, statusFilter])

  const publishedCount = courses.filter((course) => course.status === 'PUBLISHED').length

  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar activePath="/courses" accountName="STUDENT" />

      <section className="flex min-h-[176px] shrink-0 flex-col gap-[8px] bg-aktif-navy px-6 pb-[36px] pt-[22px] lg:px-[72px]">
        <p className="font-display text-[11px] font-bold leading-[1.5] text-aktif-gold">
          STUDENT WORKSPACE
        </p>
        <div className="flex min-h-[64px] flex-col items-start gap-4 pt-[4px] sm:flex-row">
          <h1 className="font-['Castoro_Titling'] text-[34px] leading-[1.5] text-text-inverse lg:text-[40px]">
            Courses
          </h1>
          <Link
            to="/courses/enroll"
            className="flex h-12 w-full max-w-[264px] items-center justify-center rounded-[9px] border border-black bg-aktif-gold font-display text-[12px] font-bold leading-[1.5] text-black transition-colors duration-200 hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus sm:ml-auto"
          >
            ENROLL COURSE
          </Link>
        </div>
        <p className="font-display text-[14px] leading-[1.5] text-[#d1d8ee]">
          Discover a course, explore its subjects, and keep learning actively.
        </p>
      </section>

      <main className="w-full pl-6 pt-8 lg:pl-[72px]">
        <div className="flex w-full max-w-[1296px] flex-col gap-[20px] pb-[40px]">
          <div className="flex min-h-11 flex-wrap items-start gap-4">
            <span className="flex h-11 w-[224px] items-center justify-center rounded-[9px] border border-black bg-aktif-gold font-display text-[12px] font-bold leading-[1.5] text-black">
              ALL COURSES&nbsp;&nbsp;{courses.length}
            </span>
            <span
              title="Enrolment tracking is not connected to the backend yet."
              aria-disabled="true"
              className="flex h-11 w-[224px] items-center justify-center rounded-[9px] border border-border-light bg-aktif-white font-display text-[12px] font-bold leading-[1.5] text-aktif-navy"
            >
              MY LEARNING&nbsp;&nbsp;—
            </span>
            <button
              type="button"
              aria-expanded={filtersOpen}
              onClick={() => setFiltersOpen((open) => !open)}
              className="ml-auto flex h-11 w-[128px] items-center justify-center rounded-[9px] border border-border-light bg-aktif-white font-display text-[12px] font-bold leading-[1.5] text-aktif-navy transition-colors duration-200 hover:border-aktif-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              FILTERS
            </button>
          </div>

          {filtersOpen && (
            <div className="flex h-12 items-center gap-4 animate-slide-down">
              <label htmlFor="course-status-filter" className="font-display text-[12px] font-bold text-text-secondary">
                STATUS
              </label>
              <select
                id="course-status-filter"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
                className="h-11 w-[280px] rounded-[9px] border border-border-light bg-aktif-white px-4 font-display text-[13px] text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                <option value="ALL">All statuses</option>
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
                <option value="ARCHIVED">Archived</option>
              </select>
              {statusFilter !== 'ALL' && (
                <button
                  type="button"
                  onClick={() => setStatusFilter('ALL')}
                  className="font-display text-[12px] font-bold text-aktif-navy underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  CLEAR
                </button>
              )}
            </div>
          )}

          <div className="flex flex-col items-start gap-6 xl:flex-row">
            <div className="flex h-[52px] w-full items-center rounded-[9px] border border-border-light bg-aktif-white pb-[17px] pl-5 pr-5 pt-[15px] xl:w-[640px]">
              <label htmlFor="course-search" className="sr-only">
                Search course title, code, or instructor
              </label>
              <input
                id="course-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search course title, code, or instructor"
                className="w-full bg-transparent font-display text-[13px] leading-[1.5] text-text-primary placeholder:text-text-secondary focus-visible:outline-none"
              />
            </div>
            <div
              title="The backend has no categories endpoint yet."
              aria-disabled="true"
              className="flex h-[52px] w-full items-center justify-between rounded-[9px] border border-border-light bg-aktif-white pb-[15px] pl-4 pr-6 pt-[13px] xl:w-[280px]"
            >
              <span className="font-display text-[13px] leading-[1.5] text-text-primary">All categories</span>
              <span aria-hidden="true" className="font-display text-[16px] leading-[1.5] text-text-secondary">
                ▾
              </span>
            </div>
            <div className="flex h-[52px] w-full items-center justify-between rounded-[9px] border border-border-light bg-aktif-white pb-[15px] pl-4 pr-6 pt-[13px] xl:w-[328px]">
              <label htmlFor="course-sort" className="sr-only">
                Sort courses
              </label>
              <select
                id="course-sort"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortMode)}
                className="w-full appearance-none bg-transparent font-display text-[13px] leading-[1.5] text-text-primary focus-visible:outline-none"
              >
                <option value="updated">Sort: Recently updated</option>
                <option value="title">Sort: Title A–Z</option>
                <option value="units">Sort: Most units</option>
              </select>
              <span aria-hidden="true" className="font-display text-[16px] leading-[1.5] text-text-secondary">
                ▾
              </span>
            </div>
          </div>

          <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
            {courses.length} courses&nbsp; · &nbsp;{publishedCount} published
            {query.trim() ? `  ·  ${visible.length} matching` : ''}
          </p>

          {status === 'loading' && (
            <p className="font-display text-[13px] leading-[1.5] text-text-secondary">Loading the course catalogue…</p>
          )}

          {status === 'error' && (
            <p role="alert" className="font-display text-[13px] leading-[1.5] text-state-danger">
              {message}
            </p>
          )}

          {status === 'ready' && visible.length === 0 && (
            <section className="flex h-[250px] w-full max-w-[416px] flex-col gap-[9px] rounded-[16px] border border-border-light bg-aktif-white p-5">
              <p className="font-display text-[10px] font-bold leading-[1.5] text-text-secondary">COURSE</p>
              <h2 className="font-display text-[18px] font-bold leading-[1.5] text-text-primary">
                {courses.length === 0 ? 'No courses published yet' : 'No course matches those filters'}
              </h2>
              <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
                {courses.length === 0
                  ? 'The course catalogue is empty, so there is nothing to browse yet.'
                  : 'Clear the search or status filter to see the full catalogue.'}
              </p>
            </section>
          )}

          {status === 'ready' && visible.length > 0 && (
            <ul className="flex w-full flex-wrap gap-6">
              {visible.map((course) => (
                <li
                  key={course.id}
                  className="flex min-h-[250px] w-full max-w-[416px] flex-col gap-[9px] rounded-[16px] border border-border-light bg-aktif-white p-5 transition-shadow duration-200 hover:shadow-[0_10px_30px_rgba(0,14,83,0.08)]"
                >
                  <div className="flex h-[26px] items-start justify-between gap-2">
                    <span className="flex h-[26px] w-[94px] items-center justify-center rounded-[6px] bg-surface-light font-display text-[10px] leading-[1.5] text-aktif-navy">
                      {course.courseCode}
                    </span>
                    <span className="flex h-[26px] w-[126px] items-center justify-center rounded-[6px] bg-surface-light font-display text-[10px] leading-[1.5] text-text-secondary">
                      {CARD_STATUS[course.status]}
                    </span>
                  </div>

                  <div className="flex h-[59px] items-start pt-[5px]">
                    <h2 className="font-display text-[18px] font-bold leading-[1.5] text-text-primary">
                      {course.courseTitle}
                    </h2>
                  </div>

                  <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
                    Instructor not listed
                  </p>

                  <div className="flex h-5 items-start pt-[3px]">
                    <p className="font-display text-[11px] leading-[1.5] text-text-secondary">
                      {course.units} units&nbsp; · &nbsp;{moduleCounts[course.id] ?? 0} modules
                    </p>
                  </div>

                  <div className="flex min-h-[51px] flex-wrap items-start gap-x-5 gap-y-3 pt-[11px]">
                    <div className="flex w-[160px] shrink-0 flex-col gap-[13px]">
                      <p className="font-display text-[10px] leading-[1.5] text-text-secondary">
                        Progress not tracked
                      </p>
                      <div className="h-[5px] w-[160px] overflow-hidden rounded-[3px] bg-[#e5eaf4]" aria-hidden="true" />
                    </div>
                    <Link
                      to="/courses/subjects"
                      className={`flex h-10 w-[176px] shrink-0 items-center justify-center rounded-[9px] font-display text-[12px] font-bold leading-[1.5] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus ${
                        course.status === 'PUBLISHED'
                          ? 'border border-black bg-aktif-gold text-black hover:bg-amber-400'
                          : 'border border-border-light bg-aktif-white text-aktif-navy hover:border-aktif-navy'
                      }`}
                    >
                      {course.status === 'PUBLISHED' ? 'OPEN COURSE' : 'VIEW COURSE'}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>

      <div className="pt-8">
        <SiteFooter accountLabel="My account" accountPath="/account-profile" />
      </div>
    </div>
  )
}
