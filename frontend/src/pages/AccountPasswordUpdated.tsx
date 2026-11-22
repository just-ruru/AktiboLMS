import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'
import { Footer } from '../components/ui/Footer'

/**
 * Account · Password updated — matches Figma frame 174:883.
 * Navy bg, shared pre-signup Navbar, centered white success panel
 * (rounded-[24px], max-w-[680px]), "PASSWORD UPDATED" label, Castoro Titling
 * "A fresh start" heading, green info box, gold BACK TO SIGN IN button,
 * prototype fine print, and shared Footer. Entrance fade + hover/press on button.
 * Responsive via auth-page overrides at 320/375/390/768/1024/1440.
 */
export function AccountPasswordUpdated() {
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
      {/* Navigation — shared pre-signup Navbar matches Figma */}
      <Navbar signedIn={false} />

      {/* Account form workspace */}
      <main className="flex-1 flex items-center justify-center px-6 sm:px-10 lg:px-[72px] pt-[40px] pb-[24px]">
        <div className="bg-white content-stretch flex flex-col gap-[16px] p-[32px] relative rounded-[24px] shrink-0 w-full max-w-[680px]">
          {/* Success label */}
          <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#236543] text-[10px] w-[min-content]">
            PASSWORD UPDATED
          </p>

          {/* Form introduction */}
          <div className="content-stretch flex flex-col gap-[8px] items-start leading-[1.5] overflow-clip relative shrink-0 w-full max-w-[616px]">
            <p className="font-['Castoro_Titling:Regular'] not-italic relative shrink-0 text-[#000e53] text-[32px] w-full">
              A fresh start
            </p>
            <p className="font-['Lexend_Exa:Regular'] font-normal relative shrink-0 text-[#596579] text-[12px] w-full">
              Your password has been updated in this prototype flow.
            </p>
          </div>

          {/* Info box */}
          <div className="bg-[#e8f4ef] content-stretch flex flex-col items-start overflow-clip p-[20px] relative rounded-[8px] shrink-0 w-full max-w-[616px]">
            <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#236543] text-[13px] w-full">
              Return to sign-in and use the sample details to continue to your workspace.
            </p>
          </div>

          {/* BACK TO SIGN IN button */}
          <a className={buttonClass('gold')} onClick={() => navigate('/login')}>
            <p className={buttonText('gold')}>
              BACK TO SIGN IN
            </p>
          </a>

          {/* Prototype fine print */}
          <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[11px] w-[min-content]">
            Prototype only · No real password has been changed.
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer signedIn={false} />
    </div>
  )
}
