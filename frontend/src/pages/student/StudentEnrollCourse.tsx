import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../../components/ui/Navbar'
import { SiteFooter } from '../../components/ui/SiteFooter'
import { Label } from '../../components/ui/Label'
import { Input } from '../../components/ui/Input'
import { SelectOptionOverlay } from '../../components/overlays/SelectOptionOverlay'
import { backend, type Course } from '../../lib/backendAdapter'

/**
 * Figma frame 109:813 — "Student · Enroll course".
 *
 * Reproduces the course-catalog frame panel for panel: page introduction band,
 * actions row (ALL COURSES / MY LEARNING / FILTERS), course search, category and
 * sort filters, the "N courses" summary, and the course grid.
 *
 * Only the course list has a confirmed backend source (backend.getCourses()).
 * Enrolment status, instructors, subject/module counts and progress have no
 * endpoint, so those values are rendered neutrally inside the reproduced card
 * structure. No sample course names, enrolments or progress are invented.
 *
 * Layout notes: containers use max-width and side-by-side regions stack below the
 * lg breakpoint so the page stays within the viewport at narrow widths.
 */
export function StudentEnrollCourse() {
  const [courses, setCourses] = useState<Course[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [message, setMessage] = useState('')
  const [pickerOpen, setPickerOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)

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

  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar activePath="/courses/enroll" />

      <section className="bg-aktif-navy px-6 pb-[36px] pt-[22px] lg:px-[72px]">
        <div className="flex flex-col gap-[9px]">
          <p className="font-display text-[10px] font-bold text-aktif-gold">STUDENT WORKSPACE</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-[12px] lg:gap-0 w-full">
            <h1 className="font-['Castoro_Titling'] text-[32px] leading-[1.5] text-text-inverse sm:text-[36px] whitespace-normal">
              Courses
            </h1>
            <div className="self-start lg:self-auto">
              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                className="bg-aktif-gold border border-black border-solid flex h-[48px] items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[264px] font-display text-[12px] font-bold leading-[1.5] text-black whitespace-nowrap hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                ENROLL COURSE
              </button>
            </div>
          </div>
          <p className="font-display text-[14px] leading-[1.5] text-[#d1d8ee]">
            Discover a course, explore its subjects, and keep learning actively.
          </p>
        </div>
      </section>

      <main className="pl-6 pt-[32px] lg:pl-[72px]">
        <div className="flex w-full max-w-[1296px] flex-col gap-[20px] pb-[40px]">
          {selectedCourse && (
            <p
              role="status"
              className="font-display text-[12px] leading-[1.5] text-text-secondary"
            >
              Enrolment is not connected yet — no enrolment was created for “{selectedCourse}”.
            </p>
          )}

          {/* Actions row */}
          <div className="flex flex-col lg:flex-row gap-[16px] lg:gap-[16px] h-[44px] items-start w-full">
            <Link
              to="/courses"
              className="bg-aktif-gold border border-black border-solid flex h-full items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[224px] lg:w-auto font-display text-[12px] font-bold leading-[1.5] text-black whitespace-nowrap hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              ALL COURSES {courses.length}
            </Link>
            <Link
              to="/courses"
              className="bg-surface-white border border-border-light border-solid flex h-full items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[224px] lg:w-auto font-display text-[12px] font-bold leading-[1.5] text-aktif-navy whitespace-nowrap hover:border-aktif-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              MY LEARNING
            </Link>
            <div className="self-start lg:self-auto">
              <button
                className="bg-surface-white border border-border-light border-solid flex h-[44px] items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[128px] font-display text-[12px] font-bold leading-[1.5] text-aktif-navy whitespace-nowrap hover:border-aktif-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                FILTERS
              </button>
            </div>
          </div>

          {/* Search / filter row */}
          <div className="flex flex-col lg:flex-row lg:flex-wrap gap-[24px] lg:gap-[24px] h-[52px] items-start w-full">
            <div className="bg-surface-white border border-border-light border-solid flex flex-col items-start overflow-clip rounded-[9px] shrink-0 w-full lg:w-[640px] pb-[17px] px-[20px] pt-[15px]">
              <Label htmlFor="enroll-course-search">Search course title, code, or instructor</Label>
              <Input id="enroll-course-search" placeholder="Search course title, code, or instructor" className="w-full" />
            </div>
            <div className="bg-surface-white border border-border-light border-solid flex gap-[122px] h-full items-start overflow-clip rounded-[9px] shrink-0 w-full lg:w-[280px] pb-[15px] pl-[16px] pr-[26px] pt-[13px]">
              <div className="flex h-[22px] items-start pt-[2px] w-[110px]">
                <p className="font-display text-[13px] leading-[1.5] text-text-primary whitespace-nowrap">All categories</p>
              </div>
              <p className="font-display text-[16px] leading-[1.5] text-text-secondary w-[6px]">▾</p>
            </div>
            <div className="bg-surface-white border border-border-light border-solid flex gap-[97px] h-full items-start overflow-clip rounded-[9px] shrink-0 w-full lg:w-[328px] pb-[15px] pl-[16px] pr-[26px] pt-[13px]">
              <div className="flex h-[22px] items-start pt-[2px] w-[183px]">
                <p className="font-display text-[13px] leading-[1.5] text-text-primary whitespace-nowrap">Sort: Recently updated</p>
              </div>
              <p className="font-display text-[16px] leading-[1.5] text-text-secondary w-[6px]">▾</p>
            </div>
          </div>

          {/* Summary */}
          {status === 'ready' && (
            <p className="font-display text-[12px] leading-[1.5] text-text-secondary whitespace-pre">
              {courses.length} courses
            </p>
          )}

          {/* Course grid */}
          <div className="flex flex-col h-[260px] items-start pt-[10px] w-full">
            <div className="flex flex-wrap gap-[24px] lg:gap-[24px] h-[250px] items-start w-full">
              {status === 'loading' && (
                <p className="font-display text-[13px] text-text-secondary">Loading courses…</p>
              )}
              {status === 'error' && (
                <p role="alert" className="font-display text-[13px] text-state-danger">
                  {message}
                </p>
              )}
              {status === 'ready' && courses.length === 0 && (
                <section className="flex h-[250px] w-full max-w-[416px] flex-col gap-[10px] rounded-[16px] border border-border-light bg-surface-white px-6 pb-6 pt-5">
                  <p className="font-display text-[10px] font-bold leading-[1.5] text-text-secondary">COURSES</p>
                  <h3 className="font-display text-[18px] font-bold leading-[1.5] text-text-primary">
                    No courses available
                  </h3>
                  <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
                    The course catalogue is empty, so there are no courses to enrol in.
                  </p>
                </section>
              )}
              {status === 'ready' && courses.length > 0 &&
                courses.map((course) => (
                  <div
                    key={course.id}
                    className={`bg-surface-white border border-solid flex flex-col gap-[9px] h-full items-start overflow-clip p-[20px] relative rounded-[16px] shrink-0 w-full lg:w-[416px] ${
                      selectedCourse === course.courseTitle
                        ? 'border-aktif-navy'
                        : 'border-border-light'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row gap-[12px] lg:gap-[156px] h-[26px] items-start w-full">
                      <div className="bg-[#f4f6fa] flex h-full items-center justify-center overflow-clip relative rounded-[6px] shrink-0 w-[94px]">
                        <p className="font-display text-[10px] leading-[1.5] text-aktif-navy whitespace-nowrap">
                          {course.courseCode}
                        </p>
                      </div>
                      <div
                        className={`flex h-full items-center justify-center overflow-clip relative rounded-[6px] shrink-0 w-[126px] font-display text-[10px] leading-[1.5] whitespace-nowrap ${
                          course.status === 'PUBLISHED'
                            ? 'bg-[#e9f5ef] text-[#236543]'
                            : 'bg-[#f4f6fa] text-aktif-navy'
                        }`}
                      >
                        {course.status === 'PUBLISHED' ? 'Open to enrol' : course.status}
                      </div>
                    </div>
                    <div className="flex flex-col min-h-[59px] items-start pt-[5px] w-full">
                      <h3 className="font-display text-[18px] font-bold leading-[1.35] text-text-primary whitespace-pre-wrap">
                        {course.courseTitle}
                      </h3>
                    </div>
                    <p className="font-display text-[12px] leading-[1.5] text-text-secondary whitespace-nowrap">
                      Instructor not connected
                    </p>
                    <div className="flex flex-col h-[20px] items-start pt-[3px] w-[152px]">
                      <p className="font-display text-[11px] leading-[1.5] text-text-secondary whitespace-nowrap">
                        Subjects · modules not available
                      </p>
                    </div>
                    <div className="flex flex-col h-[51px] items-start pt-[11px] w-full">
                      <div className="flex flex-col lg:flex-row gap-[20px] lg:gap-[20px] h-[40px] items-start w-full">
                        <div className="flex flex-col gap-[13px] h-[33px] items-start w-[180px]">
                          <p className="font-display text-[10px] leading-[1.5] min-w-full text-text-secondary w-[min-content]">
                            Progress not tracked
                          </p>
                          <div className="bg-[#e5eaf4] flex flex-col h-[5px] items-start overflow-clip relative rounded-[3px] shrink-0 w-[160px]" />
                        </div>
                        <Link
                          to="/courses/lessons"
                          className="bg-aktif-gold border border-black border-solid flex h-full items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[176px] font-display text-[12px] font-bold leading-[1.5] text-black whitespace-nowrap hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                        >
                          VIEW COURSE
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>

      <SelectOptionOverlay
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(option) => {
          setSelectedCourse(option)
          setPickerOpen(false)
        }}
        title="Choose a course"
        description="Pick a course from the catalogue to enrol in."
        options={courses.map((course) => course.courseTitle)}
      />

      <div className="pt-8">
        <SiteFooter accountLabel="My account" accountPath="/account-profile" />
      </div>
    </div>
  )
}
