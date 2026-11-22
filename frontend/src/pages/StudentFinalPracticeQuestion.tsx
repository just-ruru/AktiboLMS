import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export function StudentFinalPracticeQuestion() {
  const navigate = useNavigate()

  return (
    <div className="bg-[#f4f6fa] content-stretch flex flex-col items-start relative size-full animate-page-fade">
      {/* Navbar — signed-in variant per Figma */}

      {/* Page introduction — navy band per Figma */}
      <div className="bg-[#000e53] content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full">
        <div className="mx-auto w-full max-w-[1296px] px-6 py-6 sm:px-10 lg:px-[72px] lg:py-0">
          <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#ffb700] text-[11px] whitespace-nowrap">
            FINAL PRACTICE QUESTION
          </p>
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 lg:mt-0">
            <h1 className="font-titling leading-[1.2] not-italic relative shrink-0 text-[32px] sm:text-[40px] text-white whitespace-normal">
              Capstone Practice
            </h1>
          </div>
          <p className="mt-2 [word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#d1d8ee] text-[14px] whitespace-normal">
            Module 4: Final Review • Question 10 of 10
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
              <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#596579] text-[10px] w-full whitespace-nowrap">
                  FINAL QUESTION
                </p>
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#000e53] text-[20px] w-full whitespace-nowrap">
                  What will the following code output?
                </p>
                <pre className="mt-2 bg-[#f4f6fa] border border-[#dee4ee] border-solid content-stretch flex overflow-clip p-[20px] relative rounded-[12px] shrink-0 w-full whitespace-pre text-[14px] font-['Lexend Exa'] text-[#000e53]">
                  {`for (let i = 0; i < 3; i++) {
  console.log(i);
}`}
                </pre>
                <div className="mt-6 flex flex-col gap-[4px] items-start relative shrink-0 w-full">
                  <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#596579] text-[11px] w-full whitespace-nowrap">
                    TYPE YOUR ANSWER
                  </p>
                  <textarea
                    rows={3}
                    className="w-full h-[96px] rounded-[11px] border border-[#dee4ee] bg-white px-4 py-3 text-[16px] font-['Lexend Exa'] focus:outline-none focus:ring-2 focus:ring-aktibo-gold"
                    placeholder="e.g. 0 1 2"
                  />
                </div>
              </div>

              <div className="content-stretch flex gap-[16px] items-start justify-between relative shrink-0 w-full mt-8">
                <Button
                  variant="primary"
                  onClick={() => navigate('/student/courses')}
                  className="flex-1 h-[48px] rounded-[9px] bg-[#ffb700] border border-[#000e53] text-[#000e53] font-['Lexend_Exa'] font-bold whitespace-nowrap hover:bg-[#ffc933] active:bg-[#e8a800] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
                >
                  SUBMIT ANSWER
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
