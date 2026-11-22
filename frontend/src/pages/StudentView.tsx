import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { CourseCard } from '../components/ui/CourseCard'

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
    ) return false
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
    <div className="bg-[#f4f6fa] min-h-screen flex flex-col relative animate-page-fade">
      {/* Navbar — signed-in variant per Figma */}

      {/* Page introduction — navy band per Figma */}
      <div className="bg-[#000e53] content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full">
        <div className="mx-auto w-full max-w-[1296px] px-6 py-6 sm:px-10 lg:px-[72px] lg:py-0">
          <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#ffb700] text-[11px] whitespace-nowrap">
            STUDENT WORKSPACE
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
                ENROLL COURSE
              </Button>
            </div>
          </div>
          <p className="mt-2 [word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#d1d8ee] text-[14px] whitespace-normal">
            Discover a course, explore its subjects, and keep learning actively.
          </p>
        </div>
      </div>

      {/* Page workspace */}
      <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full pb-8">
        <div className="mx-auto w-full max-w-[1296px] px-6 sm:px-10 lg:px-[72px]">
          <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">

            {/* Actions row — ALL COURSES / MY LEARNING */}
            <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
              <div
                className={`bg-[#ffb700] border border-[#000e53] border-solid content-stretch flex h-full items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-full lg:w-[224px]`}
                onClick={() => setActiveTab('all')}
              >
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[12px] text-[#000e53] whitespace-pre">
                  ALL COURSES {allCount}
                </p>
              </div>
              <div
                className={`bg-white border border-[#dee4ee] border-solid content-stretch flex h-full items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-full lg:w-[224px]${activeTab === 'myLearning' ? ' bg-[#ffb700] border-[#000e53] text-[#000e53]' : ''}`}
                onClick={() => setActiveTab('myLearning')}
              >
                <p className={`[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[12px] whitespace-pre${activeTab === 'myLearning' ? ' text-[#000e53]' : ' text-[#000e53]'}`}>
                  MY LEARNING {myCount}
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
          </div>
        </div>
      </div>
    </div>
  )
}
