import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export function StudentEnrollCourse() {
  const navigate = useNavigate()
  const [enrollmentCode, setEnrollmentCode] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [courseFound, setCourseFound] = useState(false)

  return (
    <div className="bg-[#f4f6fa] content-stretch flex flex-col items-start relative size-full animate-page-fade">
      {/* Navbar — signed-in variant per Figma */}

      {/* Page introduction — navy band per Figma */}
      <div className="bg-[#000e53] content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full">
        <div className="mx-auto w-full max-w-[1296px] px-6 py-6 sm:px-10 lg:px-[72px] lg:py-0">
          <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#ffb700] text-[11px] whitespace-nowrap">
            ENROLL IN COURSE
          </p>
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 lg:mt-0">
            <h1 className="font-titling leading-[1.2] not-italic relative shrink-0 text-[32px] sm:text-[40px] text-white whitespace-normal">
              Enroll in a Course
            </h1>
          </div>
          <p className="mt-2 [word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#d1d8ee] text-[14px] whitespace-normal">
            Enter your enrollment code to join a course.
          </p>
        </div>
      </div>

      {/* Page workspace */}
      <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full pb-8">
        <div className="mx-auto w-full max-w-[1296px] px-6 sm:px-10 lg:px-[72px]">
          <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
            <div
              className={[
                'bg-white border border-[#dee4ee] border-solid content-stretch flex flex-col gap-[24px] items-start overflow-clip p-[32px] relative rounded-[16px] shrink-0 w-full',
                'max-w-[576px]',
              ].join(' ')}
            >
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#596579] text-[10px] w-full whitespace-nowrap">
                ENROLLMENT CODE
              </p>
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#000e53] text-[22px] w-full whitespace-nowrap">
                Enter your enrollment code
              </p>
              <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[13px] w-full whitespace-normal">
                Ask your instructor for the enrollment code for the course you want to join.
              </p>

              <div
                className={[
                  'border border-[#dee4ee] border-solid content-stretch flex flex-col items-start overflow-clip rounded-[9px] shrink-0 w-full',
                  enrollmentCode ? 'bg-[#e9f5ef] border-[#236543]' : 'bg-white border-[#dee4ee]',
                ].join(' ')}
              >
                <input
                  type="text"
                  value={enrollmentCode}
                  onChange={(e) => setEnrollmentCode(e.target.value)}
                  placeholder="e.g. CS101-2025"
                  className="w-full h-[56px] bg-transparent border-none px-4 text-[16px] font-['Lexend Exa'] focus:outline-none placeholder:text-[#596579]/50"
                />
                {courseFound && (
                  <p className="mt-2 [word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#236543] text-[13px] w-full whitespace-normal">
                    Course found: Introduction to Computer Science
                  </p>
                )}
              </div>

              <Button
                variant="primary"
                onClick={() => {
                  setCourseFound(true)
                  setDialogOpen(true)
                }}
                disabled={!enrollmentCode}
                className="w-full h-[48px] rounded-[9px] bg-[#ffb700] border border-[#000e53] text-[#000e53] font-['Lexend_Exa'] font-bold whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none hover:bg-[#ffc933] active:bg-[#e8a800] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
              >
                ENROLL COURSE
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Enroll course dialog */}
      {dialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDialogOpen(false)
          }}
        >
          <div
            className="bg-white border border-[#dee4ee] border-solid content-stretch flex flex-col gap-[24px] items-start overflow-clip p-[24px] relative rounded-[8px] shrink-0 w-full max-w-[576px] max-h-[560px] overflow-y-auto"
          >
            <div className="content-stretch flex flex-col gap-[6px] items-start overflow-clip relative shrink-0 w-full max-w-[576px]">
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#596579] text-[10px] w-full whitespace-nowrap">
                COURSE FOUND
              </p>
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#000e53] text-[22px] w-full whitespace-nowrap">
                Introduction to Computer Science
              </p>
              <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[13px] w-full whitespace-normal">
                Dr. Sarah Chen • 5 modules • 18 lessons
              </p>
            </div>

            <div
              className={[
                'bg-[#fff4d6] border border-[#dfe5f0] border-solid content-stretch flex gap-[12px] h-[134px] items-start overflow-clip p-[12px] relative rounded-[9px] shrink-0 w-full',
                'max-w-[576px]',
              ].join(' ')}
            >
              <div className="content-stretch flex flex-col gap-[8px] h-[130px] items-start overflow-clip relative shrink-0 w-full max-w-[528px]">
                <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[13px] w-full whitespace-normal">
                  Introduction to Computer Science
                </p>
                <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#000e53] text-[18px] w-full whitespace-normal">
                  Dr. Sarah Chen
                </p>
              </div>
            </div>

            <div className="content-stretch flex gap-[12px] h-[48px] items-center justify-center overflow-clip relative shrink-0 w-full">
              <Button
                variant="primary"
                onClick={() => {
                  setDialogOpen(false)
                  navigate('/student/courses')
                }}
                className="flex-[1_1_0] h-[48px] rounded-[9px] bg-[#ffb700] border border-[#000e53] text-[#000e53] font-['Lexend_Exa'] font-bold whitespace-nowrap hover:bg-[#ffc933] active:bg-[#e8a800] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
              >
                ENROLL COURSE
              </Button>
              <Button
                variant="primary"
                onClick={() => setDialogOpen(false)}
                className="flex-[1_1_0] h-[48px] rounded-[9px] bg-white border border-[#000e53] text-[#000e53] font-['Lexend_Exa'] font-bold whitespace-nowrap hover:bg-[#f4f6fa] active:bg-[#e8ecf3] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
              >
                CANCEL
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
