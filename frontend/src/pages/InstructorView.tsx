import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { CourseCard } from '../components/ui/CourseCard'

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
    ) return false
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
    <div className="bg-[#f4f6fa] content-stretch flex flex-col items-start relative size-full animate-page-fade">
      {/* Navbar — signed-in variant per Figma */}

      {/* Page introduction — navy band per Figma */}
      <div className="bg-[#000e53] content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full">
        <div className="mx-auto w-full max-w-[1296px] px-6 py-6 sm:px-10 lg:px-[72px] lg:py-0">
          <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#ffb700] text-[11px] whitespace-nowrap">
            INSTRUCTOR WORKSPACE
          </p>
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 lg:mt-0">
            <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-4">
              <p className="[word-break:break-word] font-['Castoro_Titling:Regular'] h-full leading-[1.2] not-italic relative shrink-0 text-[32px] sm:text-[40px] text-white whitespace-normal">
                Courses
              </p>
            </div>
            <div className="flex items-end gap-3 sm:items-center">
              <Button
                variant="primary"
                onClick={() => {
                  setActiveTab('all')
                  setSearch('')
                }}
                className={[
                  'rounded-[9px] bg-[#ffb700] border border-[#000e53] text-[#000e53] font-[' +
                    "Lexend_Exa'] font-bold whitespace-nowrap hover:bg-[#ffc933] active:bg-[#e8a800] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0",
                  'h-[42px] sm:h-[48px] px-4 sm:px-[72px] text-[11px] sm:text-[12px]',
                ].join(' ')}
              >
                CREATE COURSE
              </Button>
            </div>
          </div>
          <p className="mt-2 [word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#d1d8ee] text-[14px] whitespace-normal">
            Manage your courses, track student progress, and create new learning content.
          </p>
        </div>
      </div>

      {/* Page workspace */}
      <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full pb-8">
        <div className="mx-auto w-full max-w-[1296px] px-6 sm:px-10 lg:px-[72px]">
          <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">

            {/* Actions row — ALL COURSES / MY COURSES */}
            <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
              <div
                className={`bg-[#ffb700] border border-[#000e53] border-solid content-stretch flex h-full items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-full lg:w-[224px]`}
                onClick={() => setActiveTab('all')}
              >
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[12px] text-black whitespace-pre">
                  ALL COURSES {allCount}
                </p>
              </div>
              <div
                className={`bg-white border border-[#dee4ee] border-solid content-stretch flex h-full items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-full lg:w-[224px]${activeTab === 'myCourses' ? ' bg-[#ffb700] border-[#000e53] text-[#000e53]' : ''}`}
                onClick={() => setActiveTab('myCourses')}
              >
                <p className={`[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[12px] whitespace-pre${activeTab === 'myCourses' ? ' text-[#000e53]' : ' text-[#000e53]'}`}>
                  MY COURSES {myCount}
                </p>
              </div>
            </div>

            {/* Search / filter / sort row */}
            <div className="content-stretch flex flex-col sm:flex-row gap-[24px] items-start relative shrink-0 w-full">
              <div
                className="bg-white border border-[#dee4ee] border-solid content-stretch flex flex-col items-start overflow-clip pb-[17px] pl-[20px] pr-[20px] pt-[15px] relative rounded-[9px] shrink-0 w-full sm:w-[640px]"
              >
                <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[13px] w-full">
                  Search courses by title, code, or instructor
                </p>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full mt-2 h-[42px] rounded-[11px] border border-[#dee4ee] bg-white px-4 text-[16px] font-['Lexend Exa'] focus:outline-none focus:ring-2 focus:ring-aktibo-gold"
                  placeholder="Search courses..."
                />
              </div>
              <div
                className="bg-white border border-[#dee4ee] border-solid content-stretch flex gap-[122px] items-start overflow-clip pb-[15px] pl-[16px] pr-[26px] pt-[13px] relative rounded-[9px] shrink-0 w-full sm:w-[280px]"
              >
                <div className="content-stretch flex h-[22px] items-start pt-[2px] relative shrink-0 w-full">
                  <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#15203a] text-[13px] whitespace-nowrap">
                    {category}
                  </p>
                </div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-full appearance-none bg-transparent text-[#596579] text-[16px] font-['Lexend Exa'] focus:outline-none"
                >
                  <option>All Categories</option>
                  <option>Computer Science</option>
                  <option>Web Development</option>
                  <option>Science</option>
                  <option>Data Science</option>
                  <option>Design</option>
                </select>
              </div>
              <div
                className="bg-white border border-[#dee4ee] border-solid content-stretch flex gap-[97px] items-start overflow-clip pb-[15px] pl-[16px] pr-[26px] pt-[13px] relative rounded-[9px] shrink-0 w-full sm:w-[328px]"
              >
                <div className="content-stretch flex h-[22px] items-start pt-[2px] relative shrink-0 w-full">
                  <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#15203a] text-[13px] whitespace-nowrap">
                    Sort: {sort}
                  </p>
                </div>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full h-full appearance-none bg-transparent text-[#596579] text-[16px] font-['Lexend Exa'] focus:outline-none"
                >
                  <option>Recently updated</option>
                  <option>Name (A-Z)</option>
                  <option>Course code</option>
                </select>
              </div>
            </div>

            {/* Result count */}
            <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[12px] whitespace-pre">
              {filtered.length} courses
            </p>

            {/* Course grid — responsive grid instead of horizontal flex */}
            <div className="grid gap-[24px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-[#596579] text-[16px] font-['Lexend Exa'] w-full col-span-full">
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
          </div>
        </div>
      </div>

      {selectedCourse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedCourse(null)
          }}
        >
          <section
            className="bg-white rounded-[16px] border border-aktibo-border shadow-panel w-full max-w-md p-6 max-h-[80vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-dialog-title"
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full p-2 hover:bg-aktibo-surface transition-colors"
              onClick={() => setSelectedCourse(null)}
              aria-label="Close course details"
            >
              ×
            </button>
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.08em] text-aktibo-muted">
              {selectedCourse.courseCode} · {selectedCourse.category}
            </p>
            <h2 id="course-dialog-title" className="font-titling text-[24px] leading-[1.2] text-[#15203a] mt-1">
              {selectedCourse.title}
            </h2>
            <p className="mt-2 text-[#596579] text-[14px]">Instructor: {selectedCourse.instructor}</p>
            <p className="mt-2 text-[#596579] text-[14px]">{selectedCourse.structure}</p>
            <p className="mt-2 text-[#596579] text-[14px]">Status: {selectedCourse.status}</p>
            <Button variant="primary" onClick={() => setSelectedCourse(null)} className="mt-4">
              Back to courses
            </Button>
          </section>
        </div>
      )}
    </div>
  )
}
