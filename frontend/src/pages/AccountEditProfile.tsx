import { Link } from 'react-router-dom'
import { Input } from '../components/ui/Input'

/**
 * Account · Edit profile — signed-in page within MainLayout (Navbar + Footer provided by shell).
 * Canvas bg, navy page-intro band ("Edit your profile"), left sidebar with account
 * navigation, right panel with editable profile fields (display name, first/last name,
 * email, mobile, date of birth, gender), sample changes + cancel + save buttons.
 * Entrance fade + hover/press. Responsive: stacked on mobile, side-by-side on desktop.
 */
export function AccountEditProfile() {
  const buttonClass = (variant: 'gold' | 'white') =>
    `content-stretch cursor-pointer flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-full transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0 ${
      variant === 'gold'
        ? 'bg-[#ffb700] border border-[#000e53] border-solid'
        : 'bg-white border border-[#dfe5f0] border-solid'
    }`

  const buttonText = (variant: 'gold' | 'white') =>
    `flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-center ${variant === 'gold' ? 'text-[#000e53]' : 'text-[#000e53]'} text-[11px]`

  return (
    <div className="bg-[#f4f6fa] min-h-screen flex flex-col relative animate-page-fade">
      {/* Page intro band — navy, matches Figma edit profile page header */}
      <div className="[word-break:break-word] bg-[#000e53] content-stretch flex flex-col gap-[8px] items-start leading-[1.5] overflow-clip pb-[20px] pt-[22px] px-[72px] relative shrink-0 w-full">
        <p className="font-['Lexend_Exa:Bold'] font-bold relative shrink-0 text-[#ffb700] text-[10px] w-full whitespace-pre-wrap">
          MY ACCOUNT  /  EDIT PROFILE
        </p>
        <p className="font-['Castoro_Titling:Regular'] not-italic relative shrink-0 text-[36px] text-white w-full">
          Edit your profile
        </p>
        <p className="font-['Lexend_Exa:Regular'] font-normal relative shrink-0 text-[#d1d8ee] text-[13px] w-full">
          Keep your personal and contact information up to date.
        </p>
      </div>

      {/* Main content area */}
      <main className="flex-1 flex flex-col px-6 sm:px-10 lg:px-[72px] pt-[32px] relative w-full max-w-[1440px] mx-auto">
        <div className="content-stretch flex flex-col lg:flex-row gap-[24px] items-start overflow-clip relative shrink-0 w-full">
          {/* Left sidebar — account navigation */}
          <aside className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-[8px] shrink-0 w-full lg:w-[288px] lg:flex-none">
            <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[10px] w-[min-content]">
              YOUR ACCOUNT
            </p>
            <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#000e53] text-[19px] w-[min-content]">
              Make it yours
            </p>
            <Link to="/account-profile" className={buttonClass('white')}>
              <p className={buttonText('white')}>
                ACCOUNT OVERVIEW
              </p>
            </Link>
            <div className="bg-[#fff4cd] border border-[#000e53] border-solid content-stretch flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-full">
              <p className={buttonText('gold')}>
                EDIT PROFILE
              </p>
            </div>
            <Link to="/security" className={buttonClass('white')}>
              <p className={buttonText('white')}>
                PASSWORD & SECURITY
              </p>
            </Link>
            <Link to="/help-support" className={buttonClass('white')}>
              <p className={buttonText('white')}>
                HELP & SUPPORT
              </p>
            </Link>
            <div className="[word-break:break-word] bg-[#f4f6fa] content-stretch flex flex-col gap-[10px] items-start leading-[1.5] overflow-clip p-[16px] relative rounded-[8px] shrink-0 text-[#596579] w-full">
              <p className="font-['Lexend_Exa:Bold'] font-bold relative shrink-0 text-[10px] w-full">
                YOUR CHANGES, YOUR CHOICE
              </p>
              <p className="font-['Lexend_Exa:Regular'] font-normal relative shrink-0 text-[12px] w-full">
                Changes are applied only when you save. Cancel returns to your profile without changing saved information.
              </p>
            </div>
          </aside>

          {/* Right panel — profile edit form */}
          <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-[8px] shrink-0 w-full lg:w-[984px] lg:flex-none">
            <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#000e53] text-[20px] w-[min-content]">
              Personal and contact information
            </p>
            <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[12px] w-[min-content]">
              Your profile details stay separate from your student or instructor role.
            </p>

            {/* Profile fields */}
            <div className="content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full">
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#15203a] text-[12px] w-[min-content]">
                  Display name *
                </p>
                <Input
                  placeholder="Hoshimi Miyabi"
                  inputSize="auth"
                  className="w-full border-[#dfe5f0] border-solid"
                />
              </div>

              <div className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full">
                  <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#15203a] text-[12px] w-[min-content]">
                    First name *
                  </p>
                  <Input placeholder="Miyabi" inputSize="auth" className="w-full border-[#dfe5f0] border-solid" />
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full">
                  <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#15203a] text-[12px] w-[min-content]">
                    Last name *
                  </p>
                  <Input placeholder="Hoshimi" inputSize="auth" className="w-full border-[#dfe5f0] border-solid" />
                </div>
              </div>

              <div className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full">
                  <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#15203a] text-[12px] w-[min-content]">
                    Email address *
                  </p>
                  <Input
                    type="email"
                    placeholder="alexsmith.mobbin@gmail.com"
                    inputSize="auth"
                    className="w-full border-[#dfe5f0] border-solid"
                  />
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full">
                  <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#15203a] text-[12px] w-[min-content]">
                    Mobile number
                  </p>
                  <Input placeholder="+1 650-213-7390" inputSize="auth" className="w-full border-[#dfe5f0] border-solid" />
                </div>
              </div>

              <div className="content-stretch flex gap-[24px] items-start overflow-clip relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full">
                  <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#15203a] text-[12px] w-[min-content]">
                    Date of birth
                  </p>
                  <div className="bg-white border border-[#dfe5f0] border-solid content-stretch cursor-pointer flex flex-col h-[48px] items-start overflow-clip p-[12px] relative rounded-[8px] shrink-0 w-full">
                    <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[12px] text-left w-full">
                      Not provided
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full">
                  <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold min-w-full relative shrink-0 text-[#15203a] text-[12px] w-[min-content]">
                    Gender
                  </p>
                  <div className="bg-white border border-[#dfe5f0] border-solid content-stretch cursor-pointer flex flex-col font-['Lexend_Exa:Regular'] font-normal h-[48px] items-start overflow-clip pl-[12px] pr-[40px] py-[12px] relative rounded-[8px] shrink-0 text-left w-full">
                    <p className="relative shrink-0 text-[#596579] text-[12px] w-full">
                      Not specified
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sample edit tip box */}
            <div className="[word-break:break-word] bg-[#fff4cd] content-stretch flex flex-col gap-[8px] items-start leading-[1.5] overflow-clip p-[16px] relative rounded-[8px] shrink-0 w-full">
              <p className="font-['Lexend_Exa:Bold'] font-bold relative shrink-0 text-[#000e53] text-[10px] w-full">
                TRY A SAMPLE EDIT
              </p>
              <p className="font-['Lexend_Exa:Regular'] font-normal relative shrink-0 text-[#596579] text-[12px] w-full">
                Use sample changes to preview an updated phone number, birthday, and gender preference. Nothing is applied until you select Save changes.
              </p>
            </div>

            {/* Action buttons */}
            <div className="content-stretch cursor-pointer flex gap-[16px] items-start overflow-clip relative shrink-0 w-full">
              <button className={buttonClass('white')}>
                <p className={buttonText('white')}>
                  USE SAMPLE CHANGES
                </p>
              </button>
              <button className={buttonClass('white')}>
                <p className={buttonText('white')}>
                  CANCEL
                </p>
              </button>
              <button className={buttonClass('gold')}>
                <p className={buttonText('gold')}>
                  SAVE CHANGES
                </p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
