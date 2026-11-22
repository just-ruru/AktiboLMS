import { Link } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'

const imgAktiboSymbol = '/assets/aktibo-symbol.png'

export function StudentModuleComplete() {
  return (
    <div className="bg-[#f4f6fa] content-stretch flex flex-col items-start relative size-full animate-page-fade">
      {/* Signed-in navbar — matches Figma 140:381-140:398 (MY ACCOUNT + ALEX SMITH pill) */}
      <Navbar signedIn={true} userName="ALEX SMITH" />

      <div className="bg-[#000e53] content-stretch flex flex-col gap-[9px] h-[176px] items-start overflow-clip pb-[37px] pt-[22px] px-[72px] relative shrink-0 w-full">
        <Link to="/student/courses" className="[word-break:break-word] block cursor-pointer font-['Lexend_Exa:Bold'] font-bold leading-[0] relative shrink-0 text-[#ffb700] text-[11px] whitespace-nowrap">
          <p className="leading-[1.5] whitespace-pre">CS101  /  PROGRAMMING FUNDAMENTALS  /  MODULE 03</p>
        </Link>
        <div className="content-stretch flex flex-col h-[62px] items-start pt-[6px] relative shrink-0 w-full">
          <div className="content-stretch flex gap-[24px] h-[56px] items-start relative shrink-0 w-[1296px]">
            <p className="[word-break:break-word] flex-[1_0_0] font-['Castoro_Titling:Regular'] leading-[1.5] min-w-px not-italic relative text-[36px] text-white">
              Module complete
            </p>
            <div className="content-stretch flex h-full items-start pt-[8px] relative shrink-0 w-[264px]">
              <Link to="/student/modules" className="bg-[#ffb700] border border-[#000e53] border-solid content-stretch cursor-pointer flex h-[48px] items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[264px] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0 hover:bg-[#ffc933] active:bg-[#e8a800]">
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[12px] text-black text-left whitespace-nowrap">
                  BACK TO MODULES
                </p>
              </Link>
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#d1d8ee] text-[13px] whitespace-pre">
          Conditional Statements  ·  Your activities and results have been saved.
        </p>
      </div>

      <div className="content-stretch flex flex-col h-[780px] items-start pl-[72px] pt-[32px] relative shrink-0 w-[1368px]">
        <div className="content-stretch flex flex-col gap-[24px] h-[748px] items-start overflow-clip relative shrink-0 w-[1296px]">
          <div className="bg-[#e8f4ef] border border-[#bbd9ca] border-solid content-stretch flex flex-col gap-[12px] h-[230px] items-start overflow-clip p-[24px] relative rounded-[8px] shrink-0 w-[1296px]">
            <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[10px] w-[min-content]">
              COMPLETED & SAVED
            </p>
            <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#000e53] text-[27px] w-[min-content]">
              One more concept put into practice.
            </p>
            <div className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[0] min-w-full relative shrink-0 text-[#15203a] text-[14px] w-[min-content]">
              <p className="leading-[1.5] mb-0">You completed Conditional Statements. You can now choose between</p>
              <p className="leading-[1.5]">if and else branches and test your decisions in Python.</p>
            </div>
            <div className="content-stretch cursor-pointer flex gap-[16px] h-[44px] items-start overflow-clip relative shrink-0 w-[1248px]">
              <Link to="/student/loops-iteration" className="bg-[#ffb700] border border-[#000e53] border-solid content-stretch flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0 w-[270px] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0 hover:bg-[#ffc933] active:bg-[#e8a800]">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
                  CONTINUE TO LOOPS
                </p>
              </Link>
              <Link to="/student/lesson" className="bg-white border border-[#dfe5f0] border-solid content-stretch flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0 w-[250px]">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
                  REVIEW THIS LESSON
                </p>
              </Link>
            </div>
          </div>

          <div className="[word-break:break-word] content-stretch flex gap-[24px] h-[134px] items-start leading-[1.5] overflow-clip relative shrink-0 w-[1296px]">
            <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col gap-[12px] h-[134px] items-start overflow-clip p-[24px] relative rounded-[8px] shrink-0 w-[416px]">
              <p className="font-['Lexend_Exa:Bold'] font-bold relative shrink-0 text-[#596579] text-[10px] w-full">
                READING
              </p>
              <p className="font-['Lexend_Exa:Bold'] font-bold relative shrink-0 text-[#236543] text-[21px] w-full">
                Reviewed
              </p>
              <p className="font-['Lexend_Exa:Regular'] font-normal relative shrink-0 text-[#596579] text-[11px] w-full">
                Choose what happens next
              </p>
            </div>
            <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col gap-[12px] h-[134px] items-start overflow-clip p-[24px] relative rounded-[8px] shrink-0 w-[416px]">
              <p className="font-['Lexend_Exa:Bold'] font-bold relative shrink-0 text-[#596579] text-[10px] w-full">
                PYTHON ACTIVITY
              </p>
              <p className="font-['Lexend_Exa:Bold'] font-bold relative shrink-0 text-[#236543] text-[21px] w-full">
                Passed
              </p>
              <p className="font-['Lexend_Exa:Regular'] font-normal relative shrink-0 text-[#596579] text-[11px] w-full">
                Program executed successfully
              </p>
            </div>
            <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col gap-[12px] h-[134px] items-start overflow-clip p-[24px] relative rounded-[8px] shrink-0 w-[416px]">
              <p className="font-['Lexend_Exa:Bold'] font-bold relative shrink-0 text-[#596579] text-[10px] w-full">
                QUICK CHECK
              </p>
              <p className="font-['Lexend_Exa:Bold'] font-bold relative shrink-0 text-[#236543] text-[21px] w-full">
                1 / 1 correct
              </p>
              <p className="font-['Lexend_Exa:Regular'] font-normal relative shrink-0 text-[#596579] text-[11px] w-full">
                Result saved to your progress
              </p>
            </div>
          </div>

          <div className="content-stretch flex gap-[24px] h-[336px] items-start overflow-clip relative shrink-0 w-[1296px]">
            <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col gap-[12px] h-[336px] items-start overflow-clip p-[24px] relative rounded-[8px] shrink-0 w-[636px]">
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[10px] w-[min-content]">
                INTRODUCTION TO COMPUTING
              </p>
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#15203a] text-[19px] w-[min-content]">
                Your progress is moving forward
              </p>
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#000e53] text-[22px] w-[min-content]">
                5 / 12 modules complete
              </p>
              <div className="bg-[#dfe5f0] content-stretch flex flex-col h-[8px] items-start overflow-clip relative rounded-[8px] shrink-0 w-[588px]">
                <div className="bg-[#ffb700] h-[8px] relative rounded-[8px] shrink-0 w-[246.96px]" />
              </div>
              <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[11px] w-[min-content]">
                42% completed · Previously 4 of 12
              </p>
              <div className="[word-break:break-word] bg-[#f4f6fa] content-stretch flex flex-col gap-[10px] h-[82px] items-start leading-[1.5] overflow-clip p-[16px] relative rounded-[8px] shrink-0 w-[588px]">
                <p className="font-['Lexend_Exa:Bold'] font-bold relative shrink-0 text-[#15203a] text-[13px] w-full">
                  Programming Fundamentals
                </p>
                <p className="font-['Lexend_Exa:Regular'] font-normal relative shrink-0 text-[#596579] text-[12px] w-full">
                  3 of 4 modules complete · 75%
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col gap-[12px] h-[336px] items-start overflow-clip p-[24px] relative rounded-[8px] shrink-0 w-[636px]">
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[10px] w-[min-content] whitespace-pre-wrap">
                UP NEXT  /  MODULE 04
              </p>
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#000e53] text-[22px] w-[min-content]">
                Loops and Iteration
              </p>
              <div className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[0] min-w-full relative shrink-0 text-[#15203a] text-[13px] w-[min-content]">
                <p className="leading-[1.5] mb-0">Learn how to repeat actions without repeating your work.</p>
                <p className="leading-[1.5]">Try your first for loop in an embedded coding activity.</p>
              </div>
              <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[11px] w-[min-content]">
                25 min · Reading · Python activity
              </p>
              <Link to="/student/loops-iteration" className="bg-[#ffb700] border border-[#000e53] border-solid content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[8px] shrink-0 w-[270px] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0 hover:bg-[#ffc933] active:bg-[#e8a800]">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
                  START NEXT MODULE
                </p>
              </Link>
              <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[10px] w-[min-content]">
                Your current lesson remains available to review.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="content-stretch flex flex-col h-[160px] items-start pt-[32px] relative shrink-0 w-full">
        <div className="bg-[#000e53] content-stretch flex flex-col gap-[14px] h-[128px] items-start overflow-clip pb-[14px] pt-[32px] px-[72px] relative shrink-0 w-[1440px]">
          <div className="absolute bg-[#304074] h-px left-[72px] top-0 w-[1296px]" />
          <div className="content-stretch flex gap-[556px] h-[48px] items-start relative shrink-0 w-full">
            <Link to="/" className="content-stretch cursor-pointer flex gap-[12px] h-full items-center overflow-clip relative shrink-0 w-[256px]">
              <img src={imgAktiboSymbol} alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" />
              <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[normal] relative shrink-0 text-[18px] text-left text-white whitespace-nowrap">
                AKTIBO LMS
              </p>
            </Link>
            <div className="content-stretch flex h-[46px] items-start pt-[2px] relative shrink-0 w-[484px]">
              <div className="content-stretch cursor-pointer flex gap-[12px] h-[44px] items-center overflow-clip relative shrink-0 w-[484px]">
                <Link to="/" className="content-stretch flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[96px]">
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-left text-white whitespace-nowrap">
                    Home
                  </p>
                </Link>
                <Link to="/student/courses" className="content-stretch flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[112px]">
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-left text-white whitespace-nowrap">
                    Courses
                  </p>
                </Link>
                <Link to="/pricing" className="content-stretch flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[96px]">
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-left text-white whitespace-nowrap">
                    Pricing
                  </p>
                </Link>
                <Link to="/account-profile" className="content-stretch flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[144px]">
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-left text-white whitespace-nowrap">
                    My account
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex font-['Inter:Regular'] font-normal gap-[965px] h-[20px] items-start leading-[1.4] not-italic relative shrink-0 text-[#d1d8ee] text-[14px] w-full">
            <p className="h-full relative shrink-0 w-[193px]">
              A more focused way to learn.
            </p>
            <p className="h-full relative shrink-0 w-[138px]">
              Learning, with focus.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
