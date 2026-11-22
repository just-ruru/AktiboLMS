import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'
import { Footer } from '../components/ui/Footer'
import { Input } from '../components/ui/Input'

/**
 * Forgot Password — matches Figma frame 34:143 (Password Recovery).
 * Navy bg, shared pre-signup Navbar, centered white recovery form
 * (rounded-[24px]), Castoro Titling "Forgot password?" heading, single email
 * field, "USE SAMPLE EMAIL" + "SEND RESET LINK" buttons, secondary "Log in"
 * link, prototype guidance banner, "Need help? Visit Help & support",
 * and shared Footer. Responsive at 320/375/390/768/1024/1440.
 */
export function ForgotPassword() {
  const navigate = useNavigate()

  return (
    <div className="bg-[#000e53] min-h-screen flex flex-col relative auth-page animate-page-fade">
      {/* Navigation — shared pre-signup Navbar matches Figma 95:67-95:84 */}
      <Navbar signedIn={false} />

      {/* Account form workspace */}
      <main className="flex-1 flex items-center justify-center px-6 sm:px-10 lg:px-[72px] pt-[40px] pb-[24px]">
        <div className="bg-white content-stretch flex flex-col gap-[16px] p-[32px] relative rounded-[24px] shrink-0 w-full max-w-[620px]">
          {/* Form introduction */}
          <div className="content-stretch flex flex-col gap-[8px] items-start leading-[1.5] overflow-clip relative shrink-0 w-full max-w-[556px]">
            <p className="font-['Castoro_Titling:Regular'] not-italic relative shrink-0 text-[#000e53] text-[32px] w-full">
              Forgot password?
            </p>
            <p className="font-['Lexend_Exa:Regular'] font-normal relative shrink-0 text-[#596579] text-[12px] w-full">
              Enter the email address associated with your account.
            </p>
          </div>

          {/* Email field */}
          <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full max-w-[556px]">
            <Input
              label="Email address *"
              placeholder="name@example.com"
              type="email"
              inputSize="auth"
              className="w-full border-[#dfe5f0] border-solid"
            />
          </div>

          {/* USE SAMPLE EMAIL button */}
          <button
            className="bg-white border border-[#dfe5f0] border-solid content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-full text-center"
          >
            <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px]">
              USE SAMPLE EMAIL
            </p>
          </button>

          {/* SEND RESET LINK button */}
          <button
            className="bg-[#ffb700] border border-[#000e53] border-solid content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-full text-center"
            onClick={() => navigate('/login')}
          >
            <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[normal] min-w-px relative text-[#000e53] text-[11px]">
              SEND RESET LINK
            </p>
          </button>

          {/* Form secondary links */}
          <div className="content-stretch cursor-pointer flex font-['Lexend_Exa:Bold'] font-bold items-start leading-[0] overflow-clip relative shrink-0 text-[11px] text-black text-center w-full justify-center">
            <a className="block flex-[1_0_0] min-w-px relative" onClick={() => navigate('/login')}>
              <p className="leading-[normal]">Log in</p>
            </a>
          </div>

          {/* Prototype recovery guidance */}
          <div className="bg-[#fff4cd] content-stretch flex flex-col items-start overflow-clip p-[14px] relative rounded-[8px] shrink-0 w-full max-w-[556px]">
            <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[11px] w-full">
              If an account exists, a reset link would be sent. No email is sent in this prototype.
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
