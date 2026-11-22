import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'
import { Footer } from '../components/ui/Footer'

/**
 * Account · Choose your role — matches Figma frame 149:2.
 * Navy bg, shared pre-signup Navbar, centered white role-selection panel
 * (rounded-[24px], max-w-[1080px]), Castoro Titling "How will you use Aktibo?"
 * heading, student + instructor choice cards with continue buttons,
 * back-to-sign-in button, prototype note, and shared Footer.
 * Entrance fade + hover/press on buttons. Responsive at 320/375/390/768/1024/1440.
 */
export function ChooseRole() {
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

      {/* Role selection workspace */}
      <main className="flex-1 flex items-center justify-center px-6 sm:px-10 lg:px-[72px] pt-[40px] pb-[24px]">
        <div className="bg-white content-stretch flex flex-col gap-[24px] p-[40px] relative rounded-[24px] shrink-0 w-full max-w-[1080px]">
          {/* Role selection introduction */}
          <div className="content-stretch flex flex-col gap-[8px] items-center leading-[1.5] overflow-clip relative shrink-0 text-center w-full max-w-[1000px]">
            <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold relative shrink-0 text-[#596579] text-[10px] w-full whitespace-nowrap">
              WELCOME TO AKTIBO LMS
            </p>
            <p className="font-['Castoro_Titling:Regular'] not-italic relative shrink-0 text-[#000e53] text-[32px] w-full">
              How will you use Aktibo?
            </p>
            <p className="font-['Lexend_Exa:Regular'] font-normal relative shrink-0 text-[#596579] text-[13px] w-full">
              Choose your role to open the right workspace for you.
            </p>
          </div>

          {/* Student and instructor choices */}
          <div className="content-stretch cursor-pointer flex flex-col lg:flex-row gap-[24px] items-start overflow-clip relative shrink-0 w-full max-w-[1000px]">
            {/* Student card */}
            <a
              onClick={() => navigate('/student/courses')}
              className="bg-[#f4f6fa] border border-[#dfe5f0] border-solid content-stretch flex flex-col gap-[20px] items-start overflow-clip p-[24px] relative rounded-[12px] shrink-0 w-full lg:w-[488px] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
            >
              <div className="content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 text-left w-full max-w-[440px]">
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#596579] text-[10px] w-full whitespace-nowrap">
                  FOR YOUR LEARNING JOURNEY
                </p>
                <p className="font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#000e53] text-[22px] w-full whitespace-nowrap">
                  I am a student
                </p>
                <div className="font-['Lexend_Exa:Regular'] font-normal leading-[0] relative shrink-0 text-[#596579] text-[12px] w-full">
                  <p className="leading-[1.5] mb-0">Join courses, work through interactive lessons,</p>
                  <p className="leading-[1.5]">and keep track of your progress.</p>
                </div>
              </div>
              <div className={buttonClass('gold')}>
                <p className={buttonText('gold')}>
                  CONTINUE AS STUDENT
                </p>
              </div>
            </a>

            {/* Instructor card */}
            <a
              onClick={() => navigate('/instructor/courses')}
              className="bg-[#f4f6fa] border border-[#dfe5f0] border-solid content-stretch flex flex-col gap-[20px] items-start overflow-clip p-[24px] relative rounded-[12px] shrink-0 w-full lg:w-[488px] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
            >
              <div className="content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 text-left w-full max-w-[440px]">
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#596579] text-[10px] w-full whitespace-nowrap">
                  FOR YOUR CLASSROOM
                </p>
                <p className="font-['Lexend_Exa:Bold'] font-bold leading-[1.5] relative shrink-0 text-[#000e53] text-[22px] w-full whitespace-nowrap">
                  I am an instructor
                </p>
                <div className="font-['Lexend_Exa:Regular'] font-normal leading-[0] relative shrink-0 text-[#596579] text-[12px] w-full">
                  <p className="leading-[1.5] mb-0">Create interactive lessons, manage your courses,</p>
                  <p className="leading-[1.5]">and support your learners.</p>
                </div>
              </div>
              <div className={buttonClass('gold')}>
                <p className={buttonText('gold')}>
                  CONTINUE AS INSTRUCTOR
                </p>
              </div>
            </a>
          </div>

          {/* Account navigation */}
          <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0 w-full max-w-[1000px]">
            <button className={buttonClass('white')} onClick={() => navigate('/login')}>
              <p className={buttonText('white')}>
                BACK TO SIGN IN
              </p>
            </button>
          </div>
          <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[11px] text-center w-full max-w-[1000px]">
            Your choice opens the matching learning or teaching workspace.
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer signedIn={false} />
    </div>
  )
}
