import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Navbar } from '../components/ui/Navbar'
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
    <div className="bg-[#f4f6fa] content-stretch flex flex-col items-start relative size-full">
      {/* Navbar — signed-in variant per Figma */}
      <Navbar className="w-full" signedIn />

      {/* Page introduction — navy band h-[176px] per Figma */}
      <div className="bg-[#000e53] content-stretch flex flex-col gap-[8px] h-[176px] items-start overflow-clip pb-[36px] pt-[22px] px-[72px] relative shrink-0 w-full">
        <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#ffb700] text-[11px] whitespace-nowrap">
          INSTRUCTOR WORKSPACE
        </p>
        <div className="content-stretch flex flex-col h-[64px] items-start pt-[4px] relative shrink-0 w-full">
          <div className="content-stretch flex gap-[843px] h-[60px] items-start relative shrink-0 w-[1296px]">
            <p className="[word-break:break-word] font-['Castoro_Titling:Regular'] h-full leading-[1.5] not-italic relative shrink-0 text-[40px] text-white w-[189px]">
              Courses
            </p>
            <div className="content-stretch flex h-[59px] items-start pt-[11px] relative shrink-0 w-[264px]">
              <Button
                variant="primary"
                onClick={() => {
                  setActiveTab('all')
                  setSearch('')
                }}
                className="h-[48px] w-[264px] rounded-[9px] bg-[#ffb700] border border-black text-black text-[12px] font-['Lexend_Exa'] font-bold whitespace-nowrap hover:bg-amber-400 active:bg-amber-500 transition-colors duration-200"
              >
                CREATE COURSE
              </Button>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#d1d8ee] text-[14px] whitespace-nowrap">
          Manage your courses, track student progress, and create new learning content.
        </p>
      </div>

      {/* Page workspace */}
      <div className="content-stretch flex flex-col h-[780px] items-start pl-[72px] pt-[32px] relative shrink-0 w-[1368px]">
        <div className="content-stretch flex flex-col gap-[20px] h-[748px] items-start overflow-clip pb-[40px] relative shrink-0 w-[1296px]">

          {/* Actions row — ALL COURSES / MY COURSES */}
          <div className="content-stretch flex gap-[16px] h-[44px] items-start relative shrink-0 w-full">
            <div
              className={`bg-[#ffb700] border border-black border-solid content-stretch flex h-full items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[224px]`}
              onClick={() => setActiveTab('all')}
            >
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[12px] text-black whitespace-pre">
                ALL COURSES {allCount}
              </p>
            </div>
            <div
              className={`bg-white border border-[#dee4ee] border-solid content-stretch flex h-full items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[224px]${
                activeTab === 'myCourses' ? ' bg-[#ffb700] border-black text-black' : ''
              }`}
              onClick={() => setActiveTab('myCourses')}
            >
              <p className={`[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[12px] whitespace-pre${
                activeTab === 'myCourses' ? ' text-black' : ' text-[#000e53]'
              }`}>
                MY COURSES {myCount}
              </p>
            </div>
          </div>

          {/* Search / filter / sort row */}
          <div className="content-stretch flex gap-[24px] h-[52px] items-start relative shrink-0 w-full">
            <div
              className="bg-white border border-[#dee4ee] border-solid content-stretch flex flex-col h-full items-start overflow-clip pb-[17px] pl-[20px] pr-[312px] pt-[15px] relative rounded-[9px] shrink-0 w-[640px]"
            >
              <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[13px] w-full">
                Search courses by title, code, or instructor
              </p>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full mt-2 h-[42px] rounded-[11px] border border-black bg-white px-4 text-[16px] font-['Lexend Exa'] focus:outline-none focus:ring-2 focus:ring-aktif-gold"
                placeholder="Search courses..."
              />
            </div>
            <div
              className="bg-white border border-[#dee4ee] border-solid content-stretch flex gap-[122px] h-full items-start overflow-clip pb-[15px] pl-[16px] pr-[26px] pt-[13px] relative rounded-[9px] shrink-0 w-[280px]"
            >
              <div className="content-stretch flex h-[22px] items-start pt-[2px] relative shrink-0 w-[110px]">
                <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#15203a] text-[13px] whitespace-nowrap">
                  {category}
                </p>
              </div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-[6px] h-full appearance-none bg-transparent text-[#596579] text-[16px] font-['Lexend Exa'] focus:outline-none"
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
              className="bg-white border border-[#dee4ee] border-solid content-stretch flex gap-[97px] h-full items-start overflow-clip pb-[15px] pl-[16px] pr-[26px] pt-[13px] relative rounded-[9px] shrink-0 w-[328px]"
            >
              <div className="content-stretch flex h-[22px] items-start pt-[2px] relative shrink-0 w-[183px]">
                <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#15203a] text-[13px] whitespace-nowrap">
                  Sort: {sort}
                </p>
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-[6px] h-full appearance-none bg-transparent text-[#596579] text-[16px] font-['Lexend Exa'] focus:outline-none"
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

          {/* Course grid */}
          <div className="content-stretch flex gap-[24px] h-full items-start relative shrink-0 w-[1296px] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#596579] text-[16px] font-['Lexend Exa'] w-full">
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

      {selectedCourse && (
        <div
          className="course-dialog-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedCourse(null)
          }}
        >
          <section
            className="course-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-dialog-title"
          >
            <button
              type="button"
              className="course-dialog__close"
              onClick={() => setSelectedCourse(null)}
              aria-label="Close course details"
            >
              ×
            </button>
            <p className="eyebrow">{selectedCourse.courseCode} · {selectedCourse.category}</p>
            <h2 id="course-dialog-title">{selectedCourse.title}</h2>
            <p>Instructor: {selectedCourse.instructor}</p>
            <p>{selectedCourse.structure}</p>
            <p>Status: {selectedCourse.status}</p>
            <Button variant="primary" onClick={() => setSelectedCourse(null)}>
              Back to courses
            </Button>
          </section>
        </div>
      )}
    </div>
  )
}
