import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export function StudentQuickCheckResults() {
  const navigate = useNavigate()

  return (
    <div className="bg-[#f4f6fa] content-stretch flex flex-col items-start relative size-full animate-page-fade">
      {/* Navbar — signed-in variant per Figma */}

      {/* Page introduction — navy band per Figma */}
      <div className="bg-[#000e53] content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full">
        <div className="mx-auto w-full max-w-[1296px] px-6 py-6 sm:px-10 lg:px-[72px] lg:py-0">
          <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#ffb700] text-[11px] whitespace-nowrap">
            QUICK CHECK RESULTS
          </p>
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 lg:mt-0">
            <h1 className="font-titling leading-[1.2] not-italic relative shrink-0 text-[32px] sm:text-[40px] text-white whitespace-normal">
              Quick Check Complete
            </h1>
          </div>
          <p className="mt-2 [word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#d1d8ee] text-[14px] whitespace-normal">
            Module 3: Data Structures • Quick Check 3 of 5
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
                'max-w-[768px]',
              ].join(' ')}
            >
              <div className="bg-[#e9f5ef] border border-[#236543] border-solid content-stretch flex h-[64px] items-center justify-center overflow-clip relative rounded-[12px] shrink-0 w-full">
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#236543] text-[18px] text-center whitespace-nowrap">
                  ✅ 4 out of 5 Correct
                </p>
              </div>

              <div className="mt-8 content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#596579] text-[10px] w-full whitespace-nowrap">
                  YOUR SCORE
                </p>
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#000e53] text-[32px] w-full whitespace-nowrap">
                  80%
                </p>

                <div className="mt-4 flex gap-[4px] items-center relative shrink-0 w-full">
                  <div className="flex-1 h-[8px] bg-[#dee4ee] rounded-full overflow-hidden">
                    <div className="h-full bg-[#ffb700] w-[80%]" />
                  </div>
                  <p className="ml-2 text-[12px] font-['Lexend Exa'] font-bold text-[#000e53]">
                    80%
                  </p>
                </div>
              </div>

              <div className="mt-8 content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#596579] text-[10px] w-full whitespace-nowrap">
                  REVIEW YOUR ANSWERS
                </p>
                <div
                  className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full"
                >
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                    <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#000e53] text-[14px] w-full whitespace-normal">
                      Q1. What is an array?
                    </p>
                    <p className="text-[#236543] font-['Lexend Exa'] text-[14px]">
                      ✅ Correct
                    </p>
                  </div>
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                    <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#000e53] text-[14px] w-full whitespace-normal">
                      Q2. How do you add an element to an array?
                    </p>
                    <p className="text-[#000e53] font-['Lexend Exa'] text-[14px]">
                      ❌ Incorrect — answer: .push()
                    </p>
                  </div>
                </div>
              </div>

              <div className="content-stretch flex gap-[16px] items-start justify-between relative shrink-0 w-full mt-8">
                <Button
                  variant="primary"
                  onClick={() => navigate('/student/courses')}
                  className="flex-1 h-[48px] rounded-[9px] bg-[#ffb700] border border-[#000e53] text-[#000e53] font-['Lexend_Exa'] font-bold whitespace-nowrap hover:bg-[#ffc933] active:bg-[#e8a800] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
                >
                  RETRY QUICK CHECK
                </Button>
                <Button
                  variant="primary"
                  onClick={() => navigate('/student/courses')}
                  className="flex-1 h-[48px] rounded-[9px] bg-white border border-[#000e53] text-[#000e53] font-['Lexend_Exa'] font-bold whitespace-nowrap hover:bg-[#f4f6fa] active:bg-[#e8ecf3] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
                >
                  BACK TO COURSES
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
