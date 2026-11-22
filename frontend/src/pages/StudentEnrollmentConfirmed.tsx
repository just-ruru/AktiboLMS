import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Navbar } from '../components/ui/Navbar'

export function StudentEnrollmentConfirmed() {
  const navigate = useNavigate()

  return (
    <div className="bg-[#f4f6fa] content-stretch flex flex-col items-start relative size-full animate-page-fade">
      {/* Navbar — signed-in variant per Figma */}
      <Navbar className="w-full" signedIn />

      {/* Page introduction — navy band per Figma */}
      <div className="bg-[#000e53] content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full">
        <div className="mx-auto w-full max-w-[1296px] px-6 py-6 sm:px-10 lg:px-[72px] lg:py-0">
          <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#ffb700] text-[11px] whitespace-nowrap">
            ENROLLMENT CONFIRMED
          </p>
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 lg:mt-0">
            <h1 className="font-titling leading-[1.2] not-italic relative shrink-0 text-[32px] sm:text-[40px] text-white whitespace-normal">
              You’re Enrolled!
            </h1>
          </div>
          <p className="mt-2 [word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#d1d8ee] text-[14px] whitespace-normal">
            You’ve successfully enrolled in Introduction to Computer Science.
          </p>
        </div>
      </div>

      {/* Page workspace */}
      <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full pb-8">
        <div className="mx-auto w-full max-w-[1296px] px-6 sm:px-10 lg:px-[72px]">
          <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">
            <div
              className={[
                'bg-white border border-[#dee4ee] border-solid content-stretch flex flex-col items-start overflow-clip p-[32px] relative rounded-[16px] shrink-0 w-full',
                'max-w-[576px]',
              ].join(' ')}
            >
              <div className="bg-[#e9f5ef] border border-[#236543] border-solid content-stretch flex h-[64px] items-center justify-center overflow-clip relative rounded-[12px] shrink-0 w-full">
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#236543] text-[18px] text-center whitespace-nowrap">
                  ✅ Enrollment Confirmed
                </p>
              </div>

              <p className="mt-6 [word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#000e53] text-[22px] w-full whitespace-nowrap">
                Introduction to Computer Science
              </p>
              <p className="mt-2 [word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[14px] w-full whitespace-normal">
                Instructor: Dr. Sarah Chen
              </p>
              <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[14px] w-full whitespace-normal">
                5 modules • 18 lessons • Starts today
              </p>

              <div className="mt-8 flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                <Button
                  variant="primary"
                  onClick={() => navigate('/student/courses')}
                  className="w-full h-[48px] rounded-[9px] bg-[#ffb700] border border-[#000e53] text-[#000e53] font-['Lexend_Exa'] font-bold whitespace-nowrap hover:bg-[#ffc933] active:bg-[#e8a800] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
                >
                  GO TO COURSE
                </Button>
                <Button
                  variant="primary"
                  onClick={() => navigate('/student/courses')}
                  className="w-full h-[48px] rounded-[9px] bg-white border border-[#000e53] text-[#000e53] font-['Lexend_Exa'] font-bold whitespace-nowrap hover:bg-[#f4f6fa] active:bg-[#e8ecf3] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
                >
                  VIEW ALL COURSES
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
