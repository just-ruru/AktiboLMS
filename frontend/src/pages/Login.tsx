import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'
import { Footer } from '../components/ui/Footer'
import { Input } from '../components/ui/Input'

/**
 * Login — matches Figma frame 24:7 (Public · Login).
 * Navy bg, shared pre-signup Navbar, centered white sign-in form
 * (rounded-[24px]), Castoro Titling "Welcome back" heading, input fields,
 * gold SIGN IN, secondary links, prototype guidance banner, and shared Footer.
 * Responsive at 320/375/390/768/1024/1440.
 */
export function Login() {
  const navigate = useNavigate()

  return (
    <div className="bg-[#000e53] min-h-screen flex flex-col relative auth-page animate-page-fade">
      {/* Navigation — shared pre-signup Navbar matches Figma 95:32-95:49 */}
      <Navbar signedIn={false} />

      {/* Account form workspace */}
      <main className="flex-1 flex items-center justify-center px-6 sm:px-10 lg:px-[72px] pt-[40px] pb-[24px]">
        <div className="bg-white content-stretch flex flex-col gap-[16px] p-[32px] relative rounded-[24px] shrink-0 w-full max-w-[620px]">
          {/* Form introduction */}
          <div className="content-stretch flex flex-col gap-[8px] items-start leading-[1.5] overflow-clip relative shrink-0 w-full max-w-[556px]">
            <p className="font-['Castoro_Titling:Regular'] not-italic relative shrink-0 text-[#000e53] text-[32px] w-full">
              Welcome back
            </p>
            <p className="font-['Lexend_Exa:Regular'] font-normal relative shrink-0 text-[#596579] text-[12px] w-full">
              Sign in to return to your learning or teaching workspace.
            </p>
          </div>

          {/* Sign-in fields */}
          <div className="content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-full max-w-[556px]">
            <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full max-w-[556px]">
              <Input
                label="Username or email *"
                placeholder="Enter username or email"
                inputSize="auth"
                className="w-full border-[#dfe5f0] border-solid"
              />
            </div>
            <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full max-w-[556px]">
              <Input
                label="Password *"
                placeholder="Enter password"
                type="password"
                inputSize="auth"
                className="w-full border-[#dfe5f0] border-solid"
              />
            </div>
          </div>

          {/* Sign-in preview controls */}
          <div className="content-stretch cursor-pointer flex gap-[16px] items-start overflow-clip relative shrink-0 w-full max-w-[556px]">
            <button
              className="bg-white border border-[#dfe5f0] border-solid content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-full max-w-[270px] text-center"
            >
              <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px]">
                USE SAMPLE DETAILS
              </p>
            </button>
            <button
              className="bg-white border border-[#dfe5f0] border-solid content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-full max-w-[270px] text-center"
            >
              <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px]">
                SHOW / HIDE PASSWORDS
              </p>
            </button>
          </div>

          {/* SIGN IN button */}
          <button
            className="bg-[#ffb700] border border-[#000e53] border-solid content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-full"
            onClick={() => navigate('/account-profile')}
          >
            <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[normal] min-w-px relative text-[#000e53] text-[11px]">
              SIGN IN
            </p>
          </button>

          {/* Form secondary links */}
          <div className="content-stretch cursor-pointer flex font-['Lexend_Exa:Bold'] font-bold gap-[16px] items-start leading-[0] overflow-clip relative shrink-0 text-[11px] text-black text-center w-full justify-center">
            <a className="block flex-[1_0_0] min-w-px relative" onClick={() => navigate('/register')}>
              <p className="leading-[normal]">Don’t have an account?</p>
            </a>
            <a className="block flex-[1_0_0] min-w-px relative" onClick={() => navigate('/forgot-password')}>
              <p className="leading-[normal]">Forgot Password</p>
            </a>
          </div>

          {/* Prototype form guidance */}
          <div className="bg-[#fff4cd] content-stretch flex flex-col items-start overflow-clip p-[14px] relative rounded-[8px] shrink-0 w-full max-w-[556px]">
            <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[11px] w-full">
              Prototype preview: click a field to fill an example, or use sample details. No real sign-in occurs.
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

      {/* Footer inset */}
      <Footer signedIn={false} />
    </div>
  )
}
