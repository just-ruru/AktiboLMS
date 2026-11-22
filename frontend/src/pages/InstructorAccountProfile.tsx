import { Link } from 'react-router-dom'

export function InstructorAccountProfile() {
  return (
    <div className="bg-[#f4f6fa] content-stretch flex flex-col items-start relative size-full animate-page-fade">

      <div className="[word-break:break-word] bg-[#000e53] content-stretch flex flex-col gap-[8px] h-[176px] items-start leading-[1.5] overflow-clip pb-[20px] pt-[22px] px-[72px] relative shrink-0 w-full">
        <p className="font-['Lexend_Exa:Bold'] font-bold relative shrink-0 text-[#ffb700] text-[10px] w-full whitespace-pre-wrap">
          INSTRUCTOR ACCOUNT
        </p>
        <p className="font-['Castoro_Titling:Regular'] not-italic relative shrink-0 text-[36px] text-white w-full">
          Your instructor profile
        </p>
        <p className="font-['Lexend_Exa:Regular'] font-normal relative shrink-0 text-[#d1d8ee] text-[13px] w-full">
          Manage your teaching presence and account details.
        </p>
      </div>

      <div className="content-stretch flex flex-col h-[780px] items-start pl-[72px] pt-[32px] relative shrink-0 w-[1368px]">
        <div className="content-stretch flex gap-[24px] h-[748px] items-start overflow-clip relative shrink-0 w-[1296px]">
          <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col gap-[24px] h-[748px] items-start overflow-clip p-[24px] relative rounded-[8px] shrink-0 w-[288px]">
            <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[10px] w-[min-content]">
              INSTRUCTOR MENU
            </p>
            <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#000e53] text-[19px] w-[min-content]">
              Manage your teaching account
            </p>
            <Link to="/instructor/account-profile" className="bg-[#fff4cd] border border-[#000e53] border-solid content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-[240px]">
              <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
                ACCOUNT DETAILS
              </p>
            </Link>
            <Link to="/instructor/courses" className="bg-white border border-[#dfe5f0] border-solid content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-[240px]">
              <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
                MY COURSES
              </p>
            </Link>
            <Link to="/help-support" className="bg-white border border-[#dfe5f0] border-solid content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-[240px]">
              <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
                HELP & SUPPORT
              </p>
            </Link>
          </div>

          <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col gap-[24px] h-[748px] items-start overflow-clip p-[24px] relative rounded-[8px] shrink-0 w-[984px]">
            <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#000e53] text-[20px] w-[min-content]">
              Account details
            </p>
            <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[12px] w-[min-content]">
              Keep your instructor account information up to date so learners know who you are.
            </p>

            <div className="content-stretch flex gap-[24px] h-[224px] items-start overflow-clip relative shrink-0 w-[936px]">
              <div className="bg-[#f4f6fa] content-stretch flex flex-col gap-[16px] h-[224px] items-start overflow-clip p-[24px] relative rounded-[8px] shrink-0 w-[288px]">
                <img src="/assets/aktibo-symbol.png" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full h-[64px] w-[64px]" />
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#000e53] text-[16px] w-[min-content]">
                  Instructor
                </p>
                <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[12px] w-[min-content]">
                  Your teaching profile
                </p>
                <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[11px] w-[min-content]">
                  Active since today
                </p>
              </div>

              <div className="content-stretch flex flex-col gap-[16px] h-[224px] items-start overflow-clip p-[24px] relative rounded-[8px] shrink-0 w-[624px]">
                <div className="content-stretch flex flex-col gap-[8px] h-[74px] items-start overflow-clip relative shrink-0 w-[624px]">
                  <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#15203a] text-[12px] w-[min-content]">
                    Instructor name *
                  </p>
                  <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col h-[48px] items-start overflow-clip p-[12px] relative rounded-[8px] shrink-0 w-[624px]">
                    <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[12px] w-full">
                      Hoshimi Miyabi
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] h-[74px] items-start overflow-clip relative shrink-0 w-[624px]">
                  <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#15203a] text-[12px] w-[min-content]">
                    Email address *
                  </p>
                  <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col h-[48px] items-start overflow-clip p-[12px] relative rounded-[8px] shrink-0 w-[624px]">
                    <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[12px] w-full">
                      instructor@example.com
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] h-[74px] items-start overflow-clip relative shrink-0 w-[624px]">
                  <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#15203a] text-[12px] w-[min-content]">
                    Teaching focus
                  </p>
                  <div className="bg-white border border-[#dfe5f0] border-solid content-stretch cursor-pointer flex flex-col h-[48px] items-start overflow-clip p-[12px] relative rounded-[8px] shrink-0 w-[624px]">
                    <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[12px] text-left w-full">
                      Programming
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="content-stretch cursor-pointer flex gap-[16px] h-[44px] items-start overflow-clip relative shrink-0 w-[936px]">
              <button className="bg-white border border-[#dfe5f0] border-solid content-stretch flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-[300px]">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
                  CANCEL
                </p>
              </button>
              <button className="bg-[#ffb700] border border-[#000e53] border-solid content-stretch flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-[300px]">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
                  EDIT ACCOUNT DETAILS
                </p>
              </button>
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
                <Link to="/instructor/courses" className="content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[112px]">
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-left text-white whitespace-nowrap">
                    Courses
                  </p>
                </Link>
                <Link to="/pricing" className="content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[96px]">
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-left text-white whitespace-nowrap">
                    Pricing
                  </p>
                </Link>
                <Link to="/instructor/account-profile" className="content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[144px]">
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
