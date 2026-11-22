import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export function StudentPracticeFeedback() {
  const navigate = useNavigate()

  return (
    <div className="bg-[#f4f6fa] content-stretch flex flex-col items-start relative size-full animate-page-fade">
      {/* Navbar — signed-in variant per Figma */}

      {/* Page introduction — navy band per Figma */}
      <div className="bg-[#000e53] content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full">
        <div className="mx-auto w-full max-w-[1296px] px-6 py-6 sm:px-10 lg:px-[72px] lg:py-0">
          <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#ffb700] text-[11px] whitespace-nowrap">
            PRACTICE FEEDBACK
          </p>
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 lg:mt-0">
            <h1 className="font-titling leading-[1.2] not-italic relative shrink-0 text-[32px] sm:text-[40px] text-white whitespace-normal">
              Practice Exercise Review
            </h1>
          </div>
          <p className="mt-2 [word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#d1d8ee] text-[14px] whitespace-normal">
            Module 2: Programming Fundamentals • Practice 2 of 6
          </p>
        </div>
      </div>

      {/* Page workspace */}
      <div className="content-stretch flex flex-col items-start pt-[32px] relative shrink-0 w-full pb-8">
        <div className="mx-auto w-full max-w-[1296px] px-6 sm:px-10 lg:px-[72px]">
          <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">

            {/* Feedback card */}
            <div
              className={[
                'bg-white border border-[#dee4ee] border-solid content-stretch flex flex-col items-start overflow-clip p-[32px] relative rounded-[16px] shrink-0 w-full',
                'max-w-[768px]',
              ].join(' ')}
            >
              <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#596579] text-[10px] w-full whitespace-nowrap">
                  YOUR SUBMISSION
                </p>
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#000e53] text-[22px] w-full whitespace-nowrap">
                  85% — Great work!
                </p>
                <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[14px] w-full whitespace-normal">
                  You correctly identified the output of the loop exercise. One small
                  detail to review: off-by-one errors in the boundary condition.
                </p>

                <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                  <div
                    className={[
                      'bg-[#e9f5ef] border border-[#236543] border-solid content-stretch flex flex-col items-start overflow-clip p-[20px] relative rounded-[12px] shrink-0 w-full',
                    ].join(' ')}
                  >
                    <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#236543] text-[13px] w-full whitespace-nowrap">
                      ✅ What you got right
                    </p>
                    <ul className="mt-2 content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full list-disc pl-4">
                      <li className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[14px] whitespace-normal">
                        Correct loop initialization
                      </li>
                      <li className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[14px] whitespace-normal">
                        Proper use of template literals
                      </li>
                    </ul>
                  </div>

                  <div
                    className={[
                      'bg-[#fff4d6] border border-[#dfe5f0] border-solid content-stretch flex flex-col items-start overflow-clip p-[20px] relative rounded-[12px] shrink-0 w-full',
                    ].join(' ')}
                  >
                    <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#000e53] text-[13px] w-full whitespace-nowrap">
                      💡 Suggestion for improvement
                    </p>
                    <p className="mt-2 [word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[14px] w-full whitespace-normal">
                      Watch the boundary condition — use i &lt; array.length rather than
                      i &lt;= array.length to avoid reading past the last element.
                    </p>
                  </div>
                </div>

                <div className="content-stretch flex gap-[16px] items-start justify-between relative shrink-0 w-full mt-4">
                  <Button
                    variant="primary"
                    onClick={() => navigate('/student/courses')}
                    className="flex-1 h-[48px] rounded-[9px] bg-[#ffb700] border border-[#000e53] text-[#000e53] font-['Lexend_Exa'] font-bold whitespace-nowrap hover:bg-[#ffc933] active:bg-[#e8a800] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
                  >
                    TRY AGAIN
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => navigate('/student/courses')}
                    className="flex-1 h-[48px] rounded-[9px] bg-white border border-[#000e53] text-[#000e53] font-['Lexend_Exa'] font-bold whitespace-nowrap hover:bg-[#f4f6fa] active:bg-[#e8ecf3] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
                  >
                    BACK TO PRACTICE
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
