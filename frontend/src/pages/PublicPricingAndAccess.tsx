import { Link } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'

export function PublicPricingAndAccess() {
  return (
    <div className="bg-[#f4f6fa] content-stretch flex flex-col items-start relative size-full animate-page-fade">
      <Navbar signedIn={false} />

      <div className="[word-break:break-word] bg-[#000e53] content-stretch flex flex-col gap-[8px] h-[176px] items-start leading-[1.5] overflow-clip pb-[20px] pt-[22px] px-[72px] relative shrink-0 w-full">
        <p className="font-['Lexend_Exa:Bold'] font-bold relative shrink-0 text-[#ffb700] text-[10px] w-full">
          PRICING & ACCESS
        </p>
        <p className="font-['Castoro_Titling:Regular'] not-italic relative shrink-0 text-[36px] text-white w-full">
          Plans for active learning
        </p>
        <p className="font-['Lexend_Exa:Regular'] font-normal relative shrink-0 text-[#d1d8ee] text-[13px] w-full">
          Explore the workspace that fits your learning or teaching needs.
        </p>
      </div>

      <div className="content-stretch flex flex-col h-[780px] items-start pl-[72px] pt-[32px] relative shrink-0 w-[1368px]">
        <div className="content-stretch flex flex-col gap-[24px] h-[748px] items-start overflow-clip relative shrink-0 w-[1296px]">
          <div className="[word-break:break-word] bg-[#fff4cd] content-stretch flex flex-col gap-[8px] h-[84px] items-start leading-[1.5] overflow-clip p-[20px] relative rounded-[8px] shrink-0 w-[1296px]">
            <p className="font-['Lexend_Exa:Bold'] font-bold relative shrink-0 text-[#000e53] text-[10px] w-full">
              ACCESS OPTIONS · PROTOTYPE PREVIEW
            </p>
            <p className="font-['Lexend_Exa:Regular'] font-normal relative shrink-0 text-[#15203a] text-[12px] w-full">
              Monetary pricing has not been defined for this project. No payment is collected in this prototype.
            </p>
          </div>

          <div className="content-stretch flex gap-[24px] h-[432px] items-start overflow-clip relative shrink-0 w-[1296px]">
            <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col h-[432px] items-start justify-between overflow-clip p-[24px] relative rounded-[8px] shrink-0 w-[416px]">
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[10px] w-[min-content]">
                FOR LEARNERS
              </p>
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#000e53] text-[21px] w-[min-content]">
                Student access
              </p>
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#15203a] text-[13px] w-[min-content]">
                Your next learning step
              </p>
              <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[12px] w-[min-content]">
                Join a course and turn concepts into practice.
              </p>
              <div className="[word-break:break-word] content-stretch flex flex-col font-['Lexend_Exa:Regular'] font-normal gap-[12px] h-[128px] items-start leading-[1.5] overflow-clip relative shrink-0 text-[#15203a] text-[11px] w-[368px] whitespace-pre-wrap">
                <p className="relative shrink-0 w-full">•  Interactive reading and video lessons</p>
                <p className="relative shrink-0 w-full">•  In-lesson programming activities</p>
                <p className="relative shrink-0 w-full">•  Quick checks with immediate feedback</p>
                <p className="relative shrink-0 w-full">•  Personal progress and activity history</p>
              </div>
              <Link to="/register" className="bg-[#ffb700] border border-[#000e53] border-solid content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-[368px]">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
                  GET STARTED AS A STUDENT
                </p>
              </Link>
            </div>

            <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col h-[432px] items-start justify-between overflow-clip p-[24px] relative rounded-[8px] shrink-0 w-[416px]">
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[10px] w-[min-content]">
                FOR EDUCATORS
              </p>
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#000e53] text-[21px] w-[min-content]">
                Instructor access
              </p>
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#15203a] text-[13px] w-[min-content]">
                Build an active classroom
              </p>
              <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[12px] w-[min-content]">
                Create focused lessons and understand learner progress.
              </p>
              <div className="[word-break:break-word] content-stretch flex flex-col font-['Lexend_Exa:Regular'] font-normal gap-[12px] h-[128px] items-start leading-[1.5] overflow-clip relative shrink-0 text-[#15203a] text-[11px] w-[368px] whitespace-pre-wrap">
                <p className="relative shrink-0 w-full">•  Course, subject, and module authoring</p>
                <p className="relative shrink-0 w-full">•  Rich-media and programming blocks</p>
                <p className="relative shrink-0 w-full">•  Practice questions with explanations</p>
                <p className="relative shrink-0 w-full">•  Learner progress and engagement data</p>
              </div>
              <Link to="/register" className="bg-[#ffb700] border border-[#000e53] border-solid content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-[368px]">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
                  GET STARTED AS AN INSTRUCTOR
                </p>
              </Link>
            </div>

            <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col h-[432px] items-start justify-between overflow-clip p-[24px] relative rounded-[8px] shrink-0 w-[416px]">
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[10px] w-[min-content]">
                FOR TEAMS
              </p>
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#000e53] text-[21px] w-[min-content]">
                Institution access
              </p>
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#15203a] text-[13px] w-[min-content]">
                Explore a shared rollout
              </p>
              <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[12px] w-[min-content]">
                Discuss how AktiboLMS could support your learning community.
              </p>
              <div className="[word-break:break-word] content-stretch flex flex-col font-['Lexend_Exa:Regular'] font-normal gap-[12px] h-[128px] items-start leading-[1.5] overflow-clip relative shrink-0 text-[#15203a] text-[11px] w-[368px] whitespace-pre-wrap">
                <p className="relative shrink-0 w-full">•  Align learning and teaching workflows</p>
                <p className="relative shrink-0 w-full">•  Plan course and enrollment access</p>
                <p className="relative shrink-0 w-full">•  Discuss onboarding needs</p>
                <p className="relative shrink-0 w-full">•  Review requirements with your team</p>
              </div>
              <a href="#" className="bg-[#ffb700] border border-[#000e53] border-solid content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-[368px]">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
                  DISCUSS YOUR NEEDS
                </p>
              </a>
            </div>
          </div>

          <div className="content-stretch flex gap-[24px] h-[184px] items-start overflow-clip relative shrink-0 w-[1296px]">
            <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col gap-[16px] h-[184px] items-start overflow-clip p-[24px] relative rounded-[8px] shrink-0 w-[636px]">
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#15203a] text-[18px] w-[min-content]">
                Already have an account?
              </p>
              <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[12px] w-[min-content]">
                Sign in and choose your student or instructor workspace.
              </p>
              <Link to="/login" className="bg-white border border-[#dfe5f0] border-solid content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-[220px]">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
                  LOG IN
                </p>
              </Link>
            </div>

            <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col gap-[16px] h-[184px] items-start overflow-clip p-[24px] relative rounded-[8px] shrink-0 w-[636px]">
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#15203a] text-[18px] w-[min-content]">
                Not sure where to start?
              </p>
              <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[12px] w-[min-content]">
                Find answers about enrollment, roles, and getting help.
              </p>
              <Link to="/help-support" className="bg-white border border-[#dfe5f0] border-solid content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-[240px]">
                <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
                  HELP & SUPPORT
                </p>
              </Link>
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
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">
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
