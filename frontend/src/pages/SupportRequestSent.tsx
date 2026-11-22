import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'

/**
 * Public · Support request sent — matches Figma frame 174:1001.
 * Pre-signup Navbar variant (LOG IN highlighted with gold underline),
 * centered white confirmation panel (rounded-[24px], w-[680px], h-[560px]),
 * REQUEST PREVIEW COMPLETE label (#236543), Castoro Titling "Your request is
 * ready", email address line name@example.com (#000e53 bold 13px),
 * support request summary box bg-[#f4f6fa] h-[86px], BACK TO HELP (gold) +
 * HOME (white) buttons w-[300px] each, fine print, footer.
 */
export function SupportRequestSent() {
  const navigate = useNavigate()

  return (
    <div className="bg-[#000e53] content-stretch flex flex-col items-start relative size-full animate-page-fade">
      {/* Navigation — pre-signup Navbar matches Figma 174:1002-174:1019 */}
      <Navbar signedIn={false} />

      {/* Account form workspace */}
      <div className="content-stretch flex flex-col h-[792px] items-center justify-center relative shrink-0 w-[1440px]">
        <div className="bg-white content-stretch flex flex-col gap-[16px] h-[560px] items-start overflow-clip p-[32px] relative rounded-[24px] shrink-0 w-[680px]">
          <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#236543] text-[10px] w-[min-content]">
            REQUEST PREVIEW COMPLETE
          </p>
          <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] h-[100px] items-start leading-[1.5] overflow-clip relative shrink-0 w-[616px]">
            <p className="font-['Castoro_Titling:Regular'] not-italic relative shrink-0 text-[#000e53] text-[32px] w-full">
              Your request is ready
            </p>
            <p className="font-['Lexend_Exa:Regular'] font-normal relative shrink-0 text-[#596579] text-[12px] w-full">
              This is the confirmation state for your support request.
            </p>
          </div>
          <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#000e53] text-[13px] w-[min-content]">
            name@example.com
          </p>
          <div className="[word-break:break-word] bg-[#f4f6fa] content-stretch flex flex-col font-['Lexend_Exa:Regular'] font-normal gap-[8px] h-[86px] items-start leading-[1.5] overflow-clip p-[16px] relative rounded-[8px] shrink-0 text-[#596579] w-[616px]">
            <p className="relative shrink-0 text-[12px] w-full">
              A copy of your request would be sent to this email address.
            </p>
            <p className="relative shrink-0 text-[11px] w-full">
              Prototype preview · No message has actually been submitted.
            </p>
          </div>
          <div className="content-stretch cursor-pointer flex gap-[16px] h-[44px] items-start overflow-clip relative shrink-0 w-[616px]">
            <a
              className="bg-[#ffb700] border border-[#000e53] border-solid content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-[300px]"
              onClick={() => navigate('/help-support')}
            >
              <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
                BACK TO HELP
              </p>
            </a>
            <a
              className="bg-white border border-[#dfe5f0] border-solid content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-[300px]"
              onClick={() => navigate('/')}
            >
              <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
                HOME
              </p>
            </a>
          </div>
          <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[11px] w-[min-content]">
            You can return to Help & support to review another topic.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="content-stretch flex flex-col h-[128px] items-start relative shrink-0 w-full">
        <div className="bg-[#000e53] content-stretch flex flex-col gap-[14px] h-[128px] items-start overflow-clip pb-[14px] pt-[32px] px-[72px] relative shrink-0 w-[1440px]">
          <div className="absolute bg-[#304074] h-px left-[72px] top-0 w-[1296px]" />
          <div className="content-stretch flex gap-[556px] h-[48px] items-start relative shrink-0 w-full">
            <a className="content-stretch cursor-pointer flex gap-[12px] h-full items-center overflow-clip relative shrink-0 w-[256px]">
              <div className="relative shrink-0 size-[40px]">
                <img src="/assets/aktibo-symbol.png" alt="" />
              </div>
              <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[normal] relative shrink-0 text-[18px] text-left text-white whitespace-nowrap">
                AKTIBO LMS
              </p>
            </a>
            <div className="content-stretch flex h-[46px] items-start pt-[2px] relative shrink-0 w-[484px]">
              <div className="content-stretch flex gap-[12px] h-[44px] items-center overflow-clip relative shrink-0 w-[484px]">
                <a
                  className="content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[96px]"
                  onClick={() => navigate('/')}
                >
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-left text-white whitespace-nowrap">
                    Home
                  </p>
                </a>
                <a
                  className="content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[112px]"
                  onClick={() => navigate('/student/courses')}
                >
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-left text-white whitespace-nowrap">
                    Courses
                  </p>
                </a>
                <a
                  className="content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[96px]"
                  onClick={() => navigate('/pricing')}
                >
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-left text-white whitespace-nowrap">
                    Pricing
                  </p>
                </a>
                <a
                  className="content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[144px]"
                  onClick={() => navigate('/login')}
                >
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-left text-white whitespace-nowrap">
                    Log in
                  </p>
                </a>
              </div>
            </div>
          </div>
          <div className="content-stretch flex font-['Inter:Regular'] font-normal gap-[965px] h-[20px] items-start leading-[1.4] not-italic relative shrink-0 text-[#d1d8ee] text-[14px] w-full">
            <p className="h-full relative shrink-0 w-[193px]">A more focused way to learn.</p>
            <p className="h-full relative shrink-0 w-[138px]">Learning, with focus.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
