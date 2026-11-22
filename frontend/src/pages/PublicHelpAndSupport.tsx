import { Link } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'

export function PublicHelpAndSupport() {
  return (
    <div className="bg-[#f4f6fa] content-stretch flex flex-col items-start relative size-full animate-page-fade">
      <Navbar signedIn={false} />

      <div className="[word-break:break-word] bg-[#000e53] content-stretch flex flex-col gap-[8px] h-[176px] items-start leading-[1.5] overflow-clip pb-[20px] pt-[22px] px-[72px] relative shrink-0 w-full">
        <p className="font-['Lexend_Exa:Bold'] font-bold relative shrink-0 text-[#ffb700] text-[10px] w-full">
          HELP & SUPPORT
        </p>
        <p className="font-['Castoro_Titling:Regular'] not-italic relative shrink-0 text-[36px] text-white w-full">
          A little help, right here
        </p>
        <p className="font-['Lexend_Exa:Regular'] font-normal relative shrink-0 text-[#d1d8ee] text-[13px] w-full">
          Find an answer or prepare a support request without leaving your workspace.
        </p>
      </div>

      <div className="content-stretch flex flex-col h-[780px] items-start pl-[72px] pt-[32px] relative shrink-0 w-[1368px]">
        <div className="content-stretch flex gap-[24px] h-[748px] items-start overflow-clip relative shrink-0 w-[1296px]">
          <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col gap-[16px] h-[748px] items-start overflow-clip p-[24px] relative rounded-[8px] shrink-0 w-[636px]">
            <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#000e53] text-[20px] w-[min-content]">
              Find a quick answer
            </p>
            <div className="content-stretch cursor-pointer flex flex-col gap-[12px] h-[220px] items-start overflow-clip relative shrink-0 w-[588px]">
              <button className="bg-white border border-[#dfe5f0] border-solid content-stretch flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-[588px]">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
                  How do I join a course?
                </p>
              </button>
              <button className="bg-white border border-[#dfe5f0] border-solid content-stretch flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-[588px]">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
                  Which role should I choose?
                </p>
              </button>
              <button className="bg-white border border-[#dfe5f0] border-solid content-stretch flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-[588px]">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
                  How do I reset my password?
                </p>
              </button>
              <button className="bg-white border border-[#dfe5f0] border-solid content-stretch flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-[588px]">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
                  Why can’t I run an activity?
                </p>
              </button>
            </div>
            <div className="[word-break:break-word] bg-[#f4f6fa] content-stretch flex flex-col gap-[14px] h-[244px] items-start leading-[1.5] overflow-clip p-[20px] relative rounded-[8px] shrink-0 w-[588px]">
              <p className="font-['Lexend_Exa:Bold'] font-bold relative shrink-0 text-[#000e53] text-[17px] w-full">
                How do I join a course?
              </p>
              <p className="font-['Lexend_Exa:Regular'] font-normal relative shrink-0 text-[#596579] text-[13px] w-full">
                Open Courses, choose Enroll course, and enter the code shared by your instructor. Check the course preview before confirming.
              </p>
            </div>
            <Link to="/forgot-password" className="bg-white border border-[#dfe5f0] border-solid content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-[300px]">
              <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
                GO TO PASSWORD RECOVERY
              </p>
            </Link>
          </div>

          <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col gap-[16px] h-[748px] items-start overflow-clip p-[24px] relative rounded-[8px] shrink-0 w-[636px]">
            <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#000e53] text-[20px] w-[min-content]">
              Still need a hand?
            </p>
            <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[12px] w-[min-content]">
              Describe what happened so the support team has the context they need.
            </p>
            <div className="content-stretch flex flex-col gap-[12px] h-[326px] items-start overflow-clip relative shrink-0 w-[588px]">
              <div className="content-stretch flex flex-col gap-[8px] h-[74px] items-start overflow-clip relative shrink-0 w-[588px]">
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#15203a] text-[12px] w-[min-content]">
                  Name *
                </p>
                <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col h-[48px] items-start overflow-clip p-[12px] relative rounded-[8px] shrink-0 w-[588px]">
                  <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[12px] text-left w-full">
                    Your name
                  </p>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[8px] h-[74px] items-start overflow-clip relative shrink-0 w-[588px]">
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#15203a] text-[12px] w-[min-content]">
                  Email *
                </p>
                <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col h-[48px] items-start overflow-clip p-[12px] relative rounded-[8px] shrink-0 w-[588px]">
                  <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[12px] text-left w-full">
                    name@example.com
                  </p>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[8px] h-[154px] items-start overflow-clip relative shrink-0 w-[588px]">
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#15203a] text-[12px] w-[min-content]">
                  What do you need help with? *
                </p>
                <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col h-[128px] items-start overflow-clip p-[12px] relative rounded-[8px] shrink-0 w-[588px]">
                  <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[12px] text-left w-full">
                    How can we help?
                  </p>
                </div>
              </div>
            </div>
            <div className="content-stretch cursor-pointer flex gap-[16px] h-[44px] items-start overflow-clip relative shrink-0 w-[588px]">
              <button className="bg-white border border-[#dfe5f0] border-solid content-stretch flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-[286px]">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
                  USE SAMPLE DETAILS
                </p>
              </button>
              <button className="bg-[#ffb700] border border-[#000e53] border-solid content-stretch flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-[286px]">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
                  SEND REQUEST
                </p>
              </button>
            </div>
            <div className="[word-break:break-word] bg-[#fff4cd] content-stretch flex flex-col gap-[8px] h-[96px] items-start leading-[1.5] overflow-clip p-[16px] relative rounded-[8px] shrink-0 w-[588px]">
              <p className="font-['Lexend_Exa:Bold'] font-bold relative shrink-0 text-[#000e53] text-[10px] w-full">
                TRY THE FLOW
              </p>
              <p className="font-['Lexend_Exa:Regular'] font-normal relative shrink-0 text-[#596579] text-[11px] w-full">
                Click a field to fill an example, or use sample details. No real support request is sent from this prototype.
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
              <img src="/assets/aktibo-symbol.png" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" />
              <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[normal] relative shrink-0 text-[18px] text-left text-white whitespace-nowrap">
                AKTIBO LMS
              </p>
            </Link>
            <div className="content-stretch flex h-[46px] items-start pt-[2px] relative shrink-0 w-[484px]">
              <div className="content-stretch flex gap-[12px] h-[44px] items-center overflow-clip relative shrink-0 w-[484px]">
                <Link to="/" className="content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[96px]">
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-left text-white whitespace-nowrap">
                    Home
                  </p>
                </Link>
                <Link to="/student/courses" className="content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[112px]">
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-left text-white whitespace-nowrap">
                    Courses
                  </p>
                </Link>
                <div className="content-stretch flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[96px]">
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-left text-white whitespace-nowrap">
                    Pricing
                  </p>
                </div>
                <Link to="/login" className="content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[144px]">
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-left text-white whitespace-nowrap">
                    Log in
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
