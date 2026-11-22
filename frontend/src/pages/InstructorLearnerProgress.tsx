import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export function InstructorLearnerProgress() {
  const navigate = useNavigate()

  return (
    <div className="bg-[#f4f6fa] content-stretch flex flex-col items-start relative size-full animate-page-fade">
      {/* Navbar — signed-in variant per Figma */}

      {/* Page introduction — navy band per Figma */}
      <div className="bg-[#000e53] content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full">
        <div className="mx-auto w-full max-w-[1296px] px-6 py-6 sm:px-10 lg:px-[72px] lg:py-0">
          <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#ffb700] text-[11px] whitespace-nowrap">
            LEARNER PROGRESS
          </p>
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 lg:mt-0">
            <h1 className="font-titling leading-[1.2] not-italic relative shrink-0 text-[32px] sm:text-[40px] text-white whitespace-normal">
              Course Learners
            </h1>
          </div>
          <p className="mt-2 [word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#d1d8ee] text-[14px] whitespace-normal">
            Introduction to Computer Science • 42 enrolled learners
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
                'min-h-[400px]',
              ].join(' ')}
            >
              <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#596579] text-[10px] w-full whitespace-nowrap">
                  LEARNER LIST
                </p>

                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-[#f4f6fa]">
                      <th className="pb-3 px-4 text-[13px] font-['Lexend Exa'] font-bold text-[#596579] whitespace-nowrap">
                        Learner
                      </th>
                      <th className="pb-3 px-4 text-[13px] font-['Lexend Exa'] font-bold text-[#596579] whitespace-nowrap">
                        Progress
                      </th>
                      <th className="pb-3 px-4 text-[13px] font-['Lexend Exa'] font-bold text-[#596579] whitespace-nowrap">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Hoshimi Miyabi', progress: 100, status: 'Completed' },
                      { name: 'Alex Rivera', progress: 85, status: 'In Progress' },
                      { name: 'Jordan Kim', progress: 60, status: 'In Progress' },
                      { name: 'Sam Wilson', progress: 25, status: 'Started' },
                    ].map((learner) => (
                      <tr key={learner.name} className="border-b border-[#dee4ee] hover:bg-[#f4f6fa] transition-colors duration-200">
                        <td className="py-4 px-4 text-[14px] font-['Lexend Exa'] text-[#000e53]">
                          {learner.name}
                        </td>
                        <td className="py-4 px-4 text-[14px] font-['Lexend Exa'] text-[#000e53]">
                          {learner.progress}%
                        </td>
                        <td className="py-4 px-4 text-[14px] font-['Lexend Exa'] font-bold text-[#236543]">
                          {learner.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="content-stretch flex gap-[16px] items-start justify-between relative shrink-0 w-full">
              <Button
                variant="primary"
                onClick={() => navigate('/instructor/courses')}
                className="flex-1 h-[48px] rounded-[9px] bg-[#ffb700] border border-[#000e53] text-[#000e53] font-['Lexend_Exa'] font-bold whitespace-nowrap hover:bg-[#ffc933] active:bg-[#e8a800] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
              >
                EXPORT REPORT
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate('/instructor/courses')}
                className="flex-1 h-[48px] rounded-[9px] bg-white border border-[#000e53] text-[#000e53] font-['Lexend_Exa'] font-bold whitespace-nowrap hover:bg-[#f4f6fa] active:bg-[#e8ecf3] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
              >
                BACK TO COURSES
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
