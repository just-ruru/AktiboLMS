import { Link } from 'react-router-dom'

/**
 * Account · Security — signed-in page within MainLayout (Navbar + Footer provided by shell).
 * Canvas bg, navy page-intro band ("Keep your account secure"), left sidebar with
 * account navigation, right panel with password change form (current / new / confirm),
 * security tip box, CANCEL + UPDATE PASSWORD buttons. Entrance fade + hover/press.
 * Responsive: stacked on mobile, side-by-side on desktop.
 */
export function AccountSecurity() {
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
      {/* Page intro band — navy, matches Figma security page header */}
      <div className="[word-break:break-word] bg-[#000e53] content-stretch flex flex-col gap-[8px] items-start leading-[1.5] overflow-clip pb-[20px] pt-[22px] px-[72px] relative shrink-0 w-full">
        <p className="font-['Lexend_Exa:Bold'] font-bold relative shrink-0 text-[#ffb700] text-[10px] w-full whitespace-pre-wrap">
          MY ACCOUNT  /  PASSWORD & SECURITY
        </p>
        <p className="font-['Castoro_Titling:Regular'] not-italic relative shrink-0 text-[36px] text-white w-full">
          Keep your account secure
        </p>
        <p className="font-['Lexend_Exa:Regular'] font-normal relative shrink-0 text-[#d1d8ee] text-[13px] w-full">
          Change your password and review your active sessions.
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
              Security center
            </p>
            <Link to="/account-profile" className={buttonClass('white')}>
              <p className={buttonText('white')}>
                ACCOUNT OVERVIEW
              </p>
            </Link>
            <Link to="/edit-profile" className={buttonClass('white')}>
              <p className={buttonText('white')}>
                EDIT PROFILE
              </p>
            </Link>
            <div className="bg-[#fff4cd] border border-[#000e53] border-solid content-stretch flex h-[44px] items-center justify-center overflow-clip p-[10px] relative rounded-[9px] shrink-0 w-full">
              <p className={buttonText('gold')}>
                PASSWORD & SECURITY
              </p>
            </div>
            <Link to="/help-support" className={buttonClass('white')}>
              <p className={buttonText('white')}>
                HELP & SUPPORT
              </p>
            </Link>
            <div className="[word-break:break-word] bg-[#f4f6fa] content-stretch flex flex-col gap-[10px] items-start leading-[1.5] overflow-clip p-[16px] relative rounded-[8px] shrink-0 text-[#596579] w-full">
              <p className="font-['Lexend_Exa:Bold'] font-bold relative shrink-0 text-[10px] w-full">
                KEEP IT SECURE
              </p>
              <p className="font-['Lexend_Exa:Regular'] font-normal relative shrink-0 text-[12px] w-full">
                Change your password when you need it. Sessions you start now stay active until you sign out.
              </p>
            </div>
          </aside>

          {/* Right panel — change password form */}
          <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col gap-[16px] items-start overflow-clip p-[24px] relative rounded-[8px] shrink-0 w-full lg:w-[984px] lg:flex-none">
            <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#000e53] text-[20px] w-[min-content]">
              Change your password
            </p>
            <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[12px] w-[min-content]">
              All fields are required to confirm your new password.
            </p>

            {/* Password fields */}
            <div className="content-stretch flex flex-col gap-[12px] items-start overflow-clip relative shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full">
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#15203a] text-[12px] w-[min-content]">
                  Current password *
                </p>
                <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col h-[48px] items-start overflow-clip p-[12px] relative rounded-[8px] shrink-0 w-full">
                  <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[12px] text-left w-full">
                    ••••••••
                  </p>
                </div>
              </div>

              <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full">
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#15203a] text-[12px] w-[min-content]">
                  New password *
                </p>
                <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col h-[48px] items-start overflow-clip p-[12px] relative rounded-[8px] shrink-0 w-full">
                  <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[12px] text-left w-full">
                    ••••••••
                  </p>
                </div>
              </div>

              <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0 w-full">
                <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#15203a] text-[12px] w-[min-content]">
                  Confirm new password *
                </p>
                <div className="bg-white border border-[#dfe5f0] border-solid content-stretch flex flex-col h-[48px] items-start overflow-clip p-[12px] relative rounded-[8px] shrink-0 w-full">
                  <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[12px] text-left w-full">
                    ••••••••
                  </p>
                </div>
              </div>
            </div>

            {/* After password change info */}
            <div className="content-stretch flex flex-col gap-[16px] items-start overflow-clip relative shrink-0 w-full">
              <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#000e53] text-[17px] w-full">
                After you change your password
              </p>
              <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[12px] w-[min-content]">
                Your current session stays active. Sign in again on any other device where you were signed in with the old password.
              </p>
              <div className="[word-break:break-word] bg-[#fff4cd] content-stretch flex flex-col gap-[8px] items-start leading-[1.5] overflow-clip p-[16px] relative rounded-[8px] shrink-0 w-full">
                <p className="font-['Lexend_Exa:Bold'] font-bold relative shrink-0 text-[#000e53] text-[10px] w-full">
                  SECURITY TIP
                </p>
                <p className="font-['Lexend_Exa:Regular'] font-normal relative shrink-0 text-[#596579] text-[12px] w-full">
                  Use a strong mix of letters, numbers, and symbols — and don’t reuse passwords across services.
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="content-stretch cursor-pointer flex gap-[16px] items-start overflow-clip relative shrink-0 w-full">
              <button className={buttonClass('white')}>
                <p className={buttonText('white')}>
                  CANCEL
                </p>
              </button>
              <button className={buttonClass('gold')}>
                <p className={buttonText('gold')}>
                  UPDATE PASSWORD
                </p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
