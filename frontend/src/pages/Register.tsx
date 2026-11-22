import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'
import { Footer } from '../components/ui/Footer'
import { Input } from '../components/ui/Input'

/**
 * Register — matches Figma frame 25:44 (Registration).
 * Navy bg, shared pre-signup Navbar, centered white registration form
 * (rounded-[24px]), Castoro Titling "Create your account" heading,
 * first name + last name, email + course, password + re-enter password,
 * phone number field, "USE SAMPLE DETAILS" / "SHOW / HIDE PASSWORDS" /
 * "CREATE ACCOUNT" buttons, secondary links, prototype guidance banner,
 * and shared Footer. Responsive at 320/375/390/768/1024/1440.
 */
export function Register() {
  const navigate = useNavigate()

  return (
    <div className="bg-[#000e53] min-h-screen flex flex-col relative auth-page animate-page-fade">
      {/* Navigation — shared pre-signup Navbar matches Figma 95:101-95:118 */}
      <Navbar signedIn={false} />

      {/* Account form workspace */}
      <main className="flex-1 flex items-center justify-center px-6 sm:px-10 lg:px-[72px] pt-[40px] pb-[24px]">
        <div className="bg-white content-stretch flex flex-col gap-[16px] p-[32px] relative rounded-[24px] shrink-0 w-full max-w-[1180px]">
          {/* Form introduction */}
          <div className="content-stretch flex flex-col gap-[8px] items-start leading-[1.5] overflow-clip relative shrink-0 w-full max-w-[1116px]">
            <p className="font-['Castoro_Titling:Regular'] not-italic relative shrink-0 text-[#000e53] text-[32px] w-full">
              Create your account
            </p>
            <p className="font-['Lexend_Exa:Regular'] font-normal relative shrink-0 text-[#596579] text-[12px] w-full">
              Start with your details, then verify your email and choose your role.
            </p>
          </div>

          {/* Registration fields */}
          <div className="content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-full max-w-[1116px]">
            {/* Row 1: first name + last name */}
            <div className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full max-w-[1116px]">
              <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full max-w-[546px]">
                <Input
                  label="First name *"
                  placeholder="First name"
                  inputSize="auth"
                  className="w-full border-[#dfe5f0] border-solid"
                />
              </div>
              <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full max-w-[546px]">
                <Input
                  label="Last name *"
                  placeholder="Last name"
                  inputSize="auth"
                  className="w-full border-[#dfe5f0] border-solid"
                />
              </div>
            </div>

            {/* Row 2: email + course */}
            <div className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full max-w-[1116px]">
              <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full max-w-[546px]">
                <Input
                  label="Email *"
                  placeholder="name@example.com"
                  type="email"
                  inputSize="auth"
                  className="w-full border-[#dfe5f0] border-solid"
                />
              </div>
              <div className="content-stretch flex flex-col gap-[8px] items-start leading-[1.5] overflow-clip relative shrink-0 w-full max-w-[546px]">
                <label className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#15203a] text-[12px] w-full">
                  Course *
                </label>
                <select
                  className="bg-white border border-[#dfe5f0] border-solid content-stretch cursor-pointer flex flex-col font-['Lexend_Exa:Regular'] font-normal h-[48px] items-start overflow-clip pl-[12px] pr-[40px] py-[12px] relative rounded-[8px] shrink-0 text-left w-full"
                >
                  <option>Select a course</option>
                </select>
              </div>
            </div>

            {/* Row 3: password + re-enter password */}
            <div className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full max-w-[1116px]">
              <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full max-w-[546px]">
                <Input
                  label="Password *"
                  placeholder="Create password"
                  type="password"
                  inputSize="auth"
                  className="w-full border-[#dfe5f0] border-solid"
                />
              </div>
              <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full max-w-[546px]">
                <Input
                  label="Re-enter password *"
                  placeholder="Repeat password"
                  type="password"
                  inputSize="auth"
                  className="w-full border-[#dfe5f0] border-solid"
                />
              </div>
            </div>

            {/* Row 4: phone number */}
            <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full max-w-[1116px]">
              <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full max-w-[546px]">
                <Input
                  label="Phone number"
                  placeholder="Optional"
                  inputSize="auth"
                  className="w-full border-[#dfe5f0] border-solid"
                />
              </div>
            </div>
          </div>

          {/* Registration actions */}
          <div className="content-stretch cursor-pointer flex gap-[16px] items-start overflow-clip relative shrink-0 w-full max-w-[1116px]">
            <button
              className="bg-white border border-[#dfe5f0] border-solid content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-full max-w-[350px] text-center"
            >
              <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px]">
                USE SAMPLE DETAILS
              </p>
            </button>
            <button
              className="bg-white border border-[#dfe5f0] border-solid content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-full max-w-[350px] text-center"
            >
              <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px]">
                SHOW / HIDE PASSWORDS
              </p>
            </button>
            <button
              className="bg-[#ffb700] border border-[#000e53] border-solid content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-full max-w-[384px] text-center"
              onClick={() => navigate('/account-profile')}
            >
              <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[normal] min-w-px relative text-[#000e53] text-[11px]">
                CREATE ACCOUNT
              </p>
            </button>
          </div>

          {/* Form secondary links */}
          <div className="content-stretch cursor-pointer flex font-['Lexend_Exa:Bold'] font-bold gap-[16px] items-start leading-[0] overflow-clip relative shrink-0 text-[11px] text-black text-center w-full justify-center">
            <a className="block flex-[1_0_0] min-w-px relative" onClick={() => navigate('/login')}>
              <p className="leading-[normal]">Already have an account? Sign in</p>
            </a>
            <a className="block flex-[1_0_0] min-w-px relative" onClick={() => navigate('/forgot-password')}>
              <p className="leading-[normal]">Forgot Password?</p>
            </a>
          </div>

          {/* Prototype form guidance */}
          <div className="bg-[#fff4cd] content-stretch flex flex-col items-start overflow-clip p-[14px] relative rounded-[8px] shrink-0 w-full max-w-[1116px]">
            <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[11px] w-full">
              Prototype preview: use sample details or click each field. Choose your course from the selector. Registration and verification are simulated.
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
