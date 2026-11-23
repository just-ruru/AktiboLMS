import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    instructor: 'Dr. Sarah Chen',
    structure: '5 modules • 18 lessons',
    progress: 42,
    buttonLabel: 'OPEN COURSE',
  },
  {
    courseCode: 'WEB201',
    category: 'Web Development',
    status: 'Enrolled' as const,
    title: 'Modern Web Development',
    instructor: 'Marcus Rodriguez',
    structure: '6 modules • 22 lessons',
    progress: 28,
    buttonLabel: 'OPEN COURSE',
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

export function StudentView() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [sort, setSort] = useState('Recently updated')
  const [activeTab, setActiveTab] = useState<'all' | 'myLearning'>('all')
  const navigate = useNavigate()

  const filtered = COURSES.filter((course) => {
    const query = search.trim().toLowerCase()
    if (
      query &&
      !course.title.toLowerCase().includes(query) &&
      !course.courseCode.toLowerCase().includes(query) &&
      !course.instructor.toLowerCase().includes(query)
    )
      return false
    if (activeTab === 'myLearning' && course.status !== 'Enrolled') return false
    if (category !== 'All Categories' && course.category !== category) return false
    return true
  }).sort((a, b) => {
    if (sort === 'Name (A-Z)') return a.title.localeCompare(b.title)
    if (sort === 'Course code') return a.courseCode.localeCompare(b.courseCode)
    return 0
  })

  const allCount = COURSES.length
  const myCount = COURSES.filter((c) => c.status === 'Enrolled').length

  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative animate-page-fade">
      <PageIntro
        breadcrumb="Student workspace / Courses"
        title="Courses"
        metadata="Discover a course, explore its subjects, and keep learning actively."
      />

      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        {/* Actions row — ALL COURSES / MY LEARNING */}
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
            active={activeTab === 'myLearning'}
            label={`MY LEARNING ${myCount}`}
            onClick={() => setActiveTab('myLearning')}
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
                onButtonClick={() =>
                  navigate(
                    course.status === 'Enrolled'
                      ? `/student/courses/${course.courseCode}/subjects`
                      : `/student/courses/${course.courseCode}/subjects`,
                  )
                }
              />
            ))
          )}
        </div>
      </main>
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
