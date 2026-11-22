import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'
import { Footer } from '../components/ui/Footer'

/**
 * Account · Verify email — matches Figma frame 174:942.
 * Navy bg, shared pre-signup Navbar (LOG IN active), centered white verification card
 * (rounded-[24px], max-w-[680px]), "ONE MORE STEP" label, Castoro Titling heading,
 * email address, gold VERIFY EMAIL · DEMO + white RESEND/BACK buttons,
 * prototype guidance banner, and shared Footer. Entrance fade + hover/press on buttons.
 * Responsive via auth-page overrides at 320/375/390/768/1024/1440.
 */
export function AccountVerifyEmail() {
  const navigate = useNavigate()

  const buttonClass = (variant: 'gold' | 'white') =>
    `content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-full transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0 ${
      variant === 'gold'
        ? 'bg-[#ffb700] border border-[#000e53] border-solid'
        : 'bg-white border border-[#dfe5f0] border-solid'
    }`

  const buttonText = (variant: 'gold' | 'white') =>
    `flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-center ${variant === 'gold' ? 'text-[#000e53]' : 'text-[#000e53]'} text-[11px]`

  return (
    <div className="bg-[#000e53] min-h-screen flex flex-col relative auth-page animate-page-fade">
      {/* Navigation — shared pre-signup Navbar matches Figma 174:943-174:960 */}
      <Navbar signedIn={false} />

      {/* Account form workspace */}
      <main className="flex-1 flex items-center justify-center px-6 sm:px-10 lg:px-[72px] pt-[40px] pb-[24px]">
        <div className="bg-white content-stretch flex flex-col gap-[16px] p-[32px] relative rounded-[24px] shrink-0 w-full max-w-[680px]">
          {/* Form introduction */}
          <div className="content-stretch flex flex-col gap-[8px] items-start leading-[1.5] overflow-clip relative shrink-0 w-full max-w-[616px]">
            <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#596579] text-[10px] w-full">
              ONE MORE STEP
            </p>
            <p className="font-['Castoro_Titling:Regular'] not-italic relative shrink-0 text-[#000e53] text-[32px] w-full">
              Verify your email
            </p>
            <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[12px] w-full">
              A verification link would be sent to the address you registered with.
            </p>
          </div>

          {/* Email address */}
          <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#000e53] text-[14px] w-[min-content]">
            name@example.com
          </p>

          {/* Demo verification link note */}
          <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[12px] w-[min-content]">
            Use the demo verification link below to continue.
          </p>

          {/* VERIFY EMAIL · DEMO button */}
          <a className={buttonClass('gold')} onClick={() => navigate('/choose-role')}>
            <p className={buttonText('gold')}>
              VERIFY EMAIL · DEMO
            </p>
          </a>

          {/* RESEND VERIFICATION LINK button */}
          <button className={buttonClass('white')} onClick={() => {}}>
            <p className={buttonText('white')}>
              RESEND VERIFICATION LINK
            </p>
          </button>

          {/* BACK TO SIGN IN button */}
          <a className={buttonClass('white')} onClick={() => navigate('/login')}>
            <p className={buttonText('white')}>
              BACK TO SIGN IN
            </p>
          </a>

          {/* Prototype form guidance */}
          <div className="bg-[#fff4cd] content-stretch flex flex-col items-start overflow-clip p-[14px] relative rounded-[8px] shrink-0 w-full max-w-[616px]">
            <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[11px] w-full">
              No email is sent. The demo link previews verification and takes you to role selection.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer signedIn={false} />
    </div>
  )
}
