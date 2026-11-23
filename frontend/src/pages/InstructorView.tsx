import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { CourseCard } from '../components/ui/CourseCard'
import { Input } from '../components/ui/Input'
import { PageIntro } from '../components/ui/PageIntro'
import { SelectField } from '../components/ui/SelectField'

const COURSES = [
  {
    courseCode: 'CS101',
    category: 'Computer Science',
    status: 'Enrolled' as const,
    title: 'Introduction to Computer Science',
    instructor: 'Marcus Rodriguez',
    structure: '5 modules • 18 lessons',
    progress: 68,
    buttonLabel: 'MANAGE COURSE',
  },
  {
    courseCode: 'WEB201',
    category: 'Web Development',
    status: 'Enrolled' as const,
    title: 'Modern Web Development',
    instructor: 'Marcus Rodriguez',
    structure: '6 modules • 22 lessons',
    progress: 45,
    buttonLabel: 'VIEW COURSE',
  },
  {
    courseCode: 'GE102',
    category: 'Science',
    status: 'Open to enroll' as const,
    title: 'General Science Fundamentals',
    instructor: 'Dr. Emily Watson',
    structure: '4 modules • 14 lessons',
    progress: 0,
    buttonLabel: 'VIEW COURSE',
  },
  {
    courseCode: 'DS201',
    category: 'Data Science',
    status: 'Open to enroll' as const,
    title: 'Data Structures & Algorithms',
    instructor: 'Prof. James Okonkwo',
    structure: '7 modules • 26 lessons',
    progress: 0,
    buttonLabel: 'VIEW COURSE',
  },
  {
    courseCode: 'UX101',
    category: 'Design',
    status: 'Open to enroll' as const,
    title: 'User Experience Design',
    instructor: 'Lisa Park',
    structure: '5 modules • 20 lessons',
    progress: 0,
    buttonLabel: 'VIEW COURSE',
  },
  {
    courseCode: 'PY301',
    category: 'Data Science',
    status: 'Open to enroll' as const,
    title: 'Python for Data Analysis',
    instructor: 'Dr. Anita Desai',
    structure: '6 modules • 24 lessons',
    progress: 0,
    buttonLabel: 'VIEW COURSE',
  },
]

const CATEGORIES = [
  'All Categories',
  'Computer Science',
  'Web Development',
  'Science',
  'Data Science',
  'Design',
]

const SORTS = ['Recently updated', 'Name (A-Z)', 'Course code']

export function InstructorView() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [sort, setSort] = useState('Recently updated')
  const [activeTab, setActiveTab] = useState<'all' | 'myCourses'>('all')
  const [selectedCourse, setSelectedCourse] = useState<(typeof COURSES)[number] | null>(null)

  const filtered = COURSES.filter((course) => {
    const query = search.trim().toLowerCase()
    if (
      query &&
      !course.title.toLowerCase().includes(query) &&
      !course.courseCode.toLowerCase().includes(query) &&
      !course.instructor.toLowerCase().includes(query)
    )
      return false
    if (activeTab === 'myCourses' && course.instructor !== 'Marcus Rodriguez') return false
    if (category !== 'All Categories' && course.category !== category) return false
    return true
  }).sort((a, b) => {
    if (sort === 'Name (A-Z)') return a.title.localeCompare(b.title)
    if (sort === 'Course code') return a.courseCode.localeCompare(b.courseCode)
    return 0
  })

  const allCount = COURSES.length
  const myCount = COURSES.filter((c) => c.instructor === 'Marcus Rodriguez').length

  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative animate-page-fade">
      <PageIntro
        breadcrumb="Instructor workspace / Courses"
        title="Courses"
        metadata="Manage your courses, track student progress, and create new learning content."
      />

      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        {/* Actions row — ALL COURSES / MY COURSES */}
        <div className="flex gap-3 items-start w-full">
          <TabPill
            active={activeTab === 'all'}
            label={`ALL COURSES ${allCount}`}
            onClick={() => {
              setActiveTab('all')
              setSearch('')
            }}
          />
          <TabPill
            active={activeTab === 'myCourses'}
            label={`MY COURSES ${myCount}`}
            onClick={() => setActiveTab('myCourses')}
          />
        </div>

        {/* Search / filter / sort row */}
        <div className="mt-5 flex flex-row gap-4 w-full items-start">
          <div className="flex-1 min-w-[320px]">
            <Input
              label="Search courses"
              placeholder="Search by title, code, or instructor"
              inputSize="md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-[260px]">
            <SelectField label="Category" value={category} onChange={setCategory}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </SelectField>
          </div>
          <div className="w-[300px]">
            <SelectField label="Sort" value={sort} onChange={setSort}>
              {SORTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </SelectField>
          </div>
        </div>

        {/* Result count */}
        <p className="mt-3 text-[12px] text-aktibo-muted">
          {filtered.length} courses
        </p>

        {/* Course grid */}
        <div className="mt-5 grid gap-5 grid-cols-2 grid-cols-3 w-full">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-aktibo-muted text-[15px] w-full col-span-full">
              No courses found.
            </div>
          ) : (
            filtered.map((course) => (
              <CourseCard
                key={course.courseCode}
                courseCode={course.courseCode}
                status={course.status}
                title={course.title}
                instructor={course.instructor}
                structure={course.structure}
                progress={course.progress}
                buttonLabel={course.buttonLabel}
                isInstructor
                onButtonClick={() => setSelectedCourse(course)}
              />
            ))
          )}
        </div>
      </main>

      {/* Course detail dialog */}
      {selectedCourse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedCourse(null)
          }}
        >
          <section
            className="bg-aktibo-surface rounded-card border border-aktibo-border shadow-panel w-full max-w-md p-6 max-h-[80vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-dialog-title"
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full p-2 hover:bg-aktibo-surface/50 transition-colors"
              onClick={() => setSelectedCourse(null)}
              aria-label="Close course details"
            >
              ×
            </button>
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.08em] text-aktibo-muted">
              {selectedCourse.courseCode} · {selectedCourse.category}
            </p>
            <h2 id="course-dialog-title" className="font-titling text-[24px] leading-[1.2] text-aktibo-ink mt-1">
              {selectedCourse.title}
            </h2>
            <p className="mt-2 text-aktibo-muted text-[14px]">
              Instructor: {selectedCourse.instructor}
            </p>
            <p className="mt-2 text-aktibo-muted text-[14px]">
              {selectedCourse.structure}
            </p>
            <p className="mt-2 text-aktibo-muted text-[14px]">
              Status: {selectedCourse.status}
            </p>
            <Button
              variant="primary"
              onClick={() => setSelectedCourse(null)}
              className="mt-4 w-full"
            >
              Back to courses
            </Button>
          </section>
        </div>
      )}
    </div>
  )
}

function TabPill({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <Button
      size="lg"
      variant={active ? 'primary' : 'ghost'}
      onClick={onClick}
      className={active ? '' : 'text-aktibo-navy border-aktibo-border hover:bg-aktibo-navy/5'}
    >
      {label}
    </Button>
  )
}
