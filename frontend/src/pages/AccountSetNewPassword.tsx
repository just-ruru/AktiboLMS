import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'
import { Footer } from '../components/ui/Footer'
import { Input } from '../components/ui/Input'

/**
 * Account · Set new password — matches Figma frame 174:824.
 * Navy bg, shared pre-signup Navbar, centered white reset form
 * (rounded-[24px], max-w-[620px]), Castoro Titling "Set a new password" heading,
 * new password + confirm password fields, preview controls, gold SET PASSWORD · DEMO
 * + white BACK TO RECOVERY buttons, prototype guidance banner, Need help link,
 * and shared Footer. Entrance fade + hover/press on buttons.
 * Responsive via auth-page overrides at 320/375/390/768/1024/1440.
 */
export function AccountSetNewPassword() {
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
        <div className="bg-white content-stretch flex flex-col gap-[16px] p-[32px] relative rounded-[24px] shrink-0 w-full max-w-[620px]">
          {/* Form introduction */}
          <div className="content-stretch flex flex-col gap-[8px] items-start leading-[1.5] overflow-clip relative shrink-0 w-full max-w-[556px]">
            <p className="font-['Castoro_Titling:Regular'] not-italic relative shrink-0 text-[#000e53] text-[32px] w-full">
              Set a new password
            </p>
            <p className="font-['Lexend_Exa:Regular'] font-normal relative shrink-0 text-[#596579] text-[12px] w-full">
              Choose a new password to regain access to your account.
            </p>
          </div>

          {/* New password fields */}
          <div className="content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-full max-w-[556px]">
            <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full max-w-[556px]">
              <Input
                label="New password *"
                placeholder="Create new password"
                type="password"
                inputSize="auth"
                className="w-full border-[#dfe5f0] border-solid"
              />
            </div>
            <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full max-w-[556px]">
              <Input
                label="Confirm new password *"
                placeholder="Repeat new password"
                type="password"
                inputSize="auth"
                className="w-full border-[#dfe5f0] border-solid"
              />
            </div>
          </div>

          {/* Reset password preview controls */}
          <div className="content-stretch cursor-pointer flex gap-[16px] items-start overflow-clip relative shrink-0 w-full max-w-[556px]">
            <button
              className="bg-white border border-[#dfe5f0] border-solid content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-full max-w-[270px] text-center transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
            >
              <p className={buttonText('white')}>
                USE SAMPLE DETAILS
              </p>
            </button>
            <button
              className="bg-white border border-[#dfe5f0] border-solid content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-full max-w-[270px] text-center transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
            >
              <p className={buttonText('white')}>
                SHOW / HIDE PASSWORDS
              </p>
            </button>
          </div>

          {/* SET PASSWORD · DEMO button */}
          <button className={buttonClass('gold')} onClick={() => navigate('/account/password-updated')}>
            <p className={buttonText('gold')}>
              SET PASSWORD · DEMO
            </p>
          </button>

          {/* BACK TO RECOVERY button */}
          <a className={buttonClass('white')} onClick={() => navigate('/forgot-password')}>
            <p className={buttonText('white')}>
              BACK TO RECOVERY
            </p>
          </a>

          {/* Prototype form guidance */}
          <div className="bg-[#fff4cd] content-stretch flex flex-col items-start overflow-clip p-[14px] relative rounded-[8px] shrink-0 w-full max-w-[556px]">
            <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[11px] w-full">
              Use at least 8 characters. Sample values let you try matching and missing-password states.
            </p>
          </div>

          <a
            className="block cursor-pointer font-['Lexend_Exa:Bold'] font-bold leading-[0] min-w-full relative shrink-0 text-[#000e53] text-[11px] text-center w-full text-center"
            onClick={() => navigate('/help-support')}
          >
            <p className="[text-underline-position:from-font] decoration-from-font decoration-solid leading-[1.5] underline">
              Need help? Visit Help & support
            </p>
          </a>
        </div>
      </main>

      {/* Footer */}
      <Footer signedIn={false} />
    </div>
  )
}
