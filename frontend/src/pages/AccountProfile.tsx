import profilePicPlaceholder from "../assets/profile_pic_placeholder.jpg";

export function AccountProfile() {

  return (
    <div className="bg-[#f4f6fa] flex flex-col min-h-screen relative size-full animate-page-fade">
      {/* Navbar — signed-in variant per Figma */}

      {/* Page introduction — navy band per Figma */}
      <div className="bg-[#000e53] content-stretch flex flex-col gap-[10px] items-start overflow-clip relative shrink-0 w-full">
        <div className="mx-auto w-full max-w-[1296px] px-6 py-6 sm:px-10 lg:px-[72px] lg:py-0">
          <p className="font-['Inter'] font-bold text-[#ffb700] text-[12px] whitespace-nowrap">
            YOUR ACCOUNT
          </p>
          <div className="content-stretch flex flex-col items-start pt-[2px] relative shrink-0">
            <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[32px] text-white whitespace-normal">
              Account profile
            </p>
          </div>
          <p className="[word-break:break-word] font-['Inter'] font-normal leading-[1.4] min-w-full not-italic relative shrink-0 text-[#cdd5f0] text-[18px] whitespace-normal">
            Manage your personal information and account details.
          </p>
        </div>
      </div>

      {/* Profile workspace — responsive padding */}
      <div className="content-stretch flex flex-col items-start pt-[40px] relative shrink-0 w-full pb-8">
        <div className="mx-auto w-full max-w-[1296px] px-6 sm:px-10 lg:px-[72px]">
          <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full">

            {/* Left column — profile summary + session actions */}
            <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full lg:w-[312px]">
              <div className="bg-white border border-[#dee4ee] border-solid content-stretch flex flex-col gap-[9px] items-center overflow-clip px-[28px] py-[16px] relative rounded-[16px] shrink-0 w-full">
                <div className="bg-[#ffb700] h-[4px] relative rounded-[2px] shrink-0 w-[40px]" />
                <div className="relative shrink-0 size-[219px]">
                  <img
                    src={profilePicPlaceholder}
                    alt="Avatar"
                    className="absolute block inset-0 max-w-none size-full"
                  />
                </div>
                <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#596579] text-[12px] w-[min-content]">
                  ACCOUNT HOLDER
                </p>
                <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[1.4] min-w-full not-italic relative shrink-0 text-[#15203a] text-[28px] w-[min-content]">
                  Hoshimi Miyabi
                </p>
                <p className="[word-break:break-word] font-['Inter'] font-normal leading-[1.4] min-w-full not-italic relative shrink-0 text-[#596579] text-[14px] w-[min-content]">
                  miyabi.hoshimi@hand.org
                </p>
                <div className="bg-[#dee4ee] h-px relative shrink-0 w-full" />
                <div className="bg-white border border-[#dee4ee] border-solid content-stretch flex h-[48px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-full">
                  <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[#000e53] text-[16px] whitespace-nowrap">
                    Edit basic info
                  </p>
                </div>
              </div>

              <div className="content-stretch flex flex-col gap-[12px] items-start overflow-clip pb-[50px] pr-[5px] relative shrink-0 w-full">
                <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[#15203a] text-[16px] whitespace-nowrap">
                  Account access
                </p>
                <p className="[word-break:break-word] font-['Inter'] font-normal leading-[1.4] not-italic relative shrink-0 text-[#596579] text-[14px] whitespace-nowrap">
                  Finished learning for now?
                </p>
                <div className="content-stretch flex flex-col h-[54px] items-start pt-[10px] relative shrink-0 w-full">
                  <div className="bg-white border border-[#dee4ee] border-solid content-stretch flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-full lg:w-[307px]">
                    <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[#a32c3b] text-[16px] whitespace-nowrap">
                      Log out
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column — Account details card */}
            <div className="bg-white border border-[#dee4ee] border-solid content-stretch flex flex-col gap-[24px] items-start overflow-clip pb-[78px] pt-[28px] px-[32px] relative rounded-[16px] shrink-0 w-full">
              <div className="content-stretch flex flex-col gap-[4px] items-start overflow-clip relative shrink-0 w-full">
                <div className="content-stretch flex gap-[20px] items-start overflow-clip pb-[9px] relative shrink-0 w-full">
                  <div className="[word-break:break-word] content-stretch flex flex-col gap-[6px] items-start leading-[1.4] not-italic relative shrink-0 w-full">
                    <p className="font-['Inter'] font-semibold relative shrink-0 text-[#15203a] text-[26px] whitespace-nowrap">
                      Account Details
                    </p>
                    <p className="font-['Inter'] font-normal min-w-full relative shrink-0 text-[#596579] text-[15px] w-[min-content]">
                      Your personal and contact information.
                    </p>
                  </div>
                  <div className="bg-[#ffb700] content-stretch flex h-[48px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-full lg:w-[246px]">
                    <p className="[word-break:break-word] font-['Inter'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[#000e53] text-[16px] whitespace-nowrap">
                      Edit Account Details
                    </p>
                  </div>
                </div>

                <div className="content-stretch flex flex-col h-[336px] items-start overflow-clip relative shrink-0 w-full">
                  <div className="[word-break:break-word] content-stretch flex font-['Inter'] font-medium gap-[32px] h-[112px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-full">
                    <div className="content-stretch flex flex-col gap-[8px] h-[112px] items-start overflow-clip pt-[20px] relative shrink-0 w-full lg:w-[428px]">
                      <p className="relative shrink-0 text-[#596579] text-[14px] whitespace-nowrap">
                        First name
                      </p>
                      <p className="relative shrink-0 text-[#15203a] text-[18px]">
                        Hoshimi
                      </p>
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] h-[112px] items-start overflow-clip pt-[20px] relative shrink-0 w-full lg:w-[428px]">
                      <p className="relative shrink-0 text-[#596579] text-[14px] whitespace-nowrap">
                        Last name
                      </p>
                      <p className="relative shrink-0 text-[#15203a] text-[18px]">
                        Miyabi
                      </p>
                    </div>
                  </div>
                  <div className="[word-break:break-word] content-stretch flex font-['Inter'] font-medium gap-[32px] h-[112px] items-start leading-[1.4] not-italic overflow-clip relative shrink-0 w-full">
                    <div className="content-stretch flex flex-col gap-[8px] h-[112px] items-start overflow-clip pt-[20px] relative shrink-0 w-full lg:w-[428px]">
                      <p className="relative shrink-0 text-[#596579] text-[14px] whitespace-nowrap">
                        Mobile number
                      </p>
                      <p className="relative shrink-0 text-[#15203a] text-[18px]">
                        +1 XXX-XXX-XXXX
                      </p>
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] h-[112px] items-start overflow-clip pt-[20px] relative shrink-0 w-full lg:w-[428px]">
                      <p className="relative shrink-0 text-[#596579] text-[14px] whitespace-nowrap">
                        Email address
                      </p>
                      <p className="relative shrink-0 text-[#15203a] text-[18px]">
                        miyabi.hoshimi@hand.org
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col gap-[32px] h-[112px] items-start overflow-clip relative shrink-0 w-full">
                    <div className="content-stretch flex flex-col gap-[8px] h-[112px] items-start overflow-clip pt-[20px] relative shrink-0 w-full lg:w-[428px]">
                      <p className="[word-break:break-word] font-['Inter'] font-medium leading-[1.4] not-italic relative shrink-0 text-[#596579] text-[14px] whitespace-nowrap">
                        Date of birth
                      </p>
                      <div className="content-stretch flex h-[44px] items-center overflow-clip relative shrink-0 w-[100px]">
                        <p className="[text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-['Inter'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[#000e53] text-[18px] underline whitespace-nowrap">
                          + Add
                        </p>
                      </div>
                    </div>
                    <div className="content-stretch flex flex-col gap-[8px] h-[112px] items-start overflow-clip pt-[20px] relative shrink-0 w-full lg:w-[428px]">
                      <p className="[word-break:break-word] font-['Inter'] font-medium leading-[1.4] not-italic relative shrink-0 text-[#596579] text-[14px] whitespace-nowrap">
                        Gender
                      </p>
                      <div className="content-stretch flex h-[44px] items-center overflow-clip relative shrink-0 w-[100px]">
                        <p className="[text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-['Inter'] font-semibold leading-[1.4] not-italic relative shrink-0 text-[#000e53] text-[18px] underline whitespace-nowrap">
                          + Add
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="content-stretch flex flex-col h-[51px] items-start pt-[30px] relative shrink-0 w-[295px]">
                  <p className="[word-break:break-word] font-['Inter'] font-normal leading-[1.4] not-italic relative shrink-0 text-[#596579] text-[15px] whitespace-nowrap">
                    Keep your contact information up to date.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer inset */}
      <div className="content-stretch flex flex-col h-[152px] items-start pt-[24px] relative shrink-0 w-full">
        <div className="bg-[#000e53] content-stretch flex flex-col gap-[14px] h-[128px] items-start overflow-clip pb-[14px] pt-[32px] px-[72px] relative shrink-0 w-full max-w-[1440px]">
          <div className="absolute bg-[#304074] h-px left-[72px] top-0 w-[1296px]" />
          <div className="content-stretch flex gap-[556px] h-[48px] items-start relative shrink-0 w-full">
            <div className="content-stretch flex gap-[12px] h-full items-center overflow-clip relative shrink-0 w-[256px]">
              <div className="relative shrink-0 size-[40px]">
                <img src="/assets/aktibo-symbol.png" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" />
              </div>
              <p className="[word-break:break-word] font-['Lexend Exa'] font-normal leading-[normal] relative shrink-0 text-[18px] text-left text-white whitespace-nowrap">
                AKTIBO LMS
              </p>
            </div>
            <div className="content-stretch flex h-[46px] items-start pt-[2px] relative shrink-0 w-[484px]">
              <div className="content-stretch flex gap-[12px] h-[44px] items-center overflow-clip relative shrink-0 w-[484px]">
                <div className="content-stretch flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[96px]">
                  <p className="[word-break:break-word] font-['Inter'] font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-left text-white whitespace-nowrap">
                    Home
                  </p>
                </div>
                <div className="content-stretch flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[112px]">
                  <p className="[word-break:break-word] font-['Inter'] font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-left text-white whitespace-nowrap">
                    Courses
                  </p>
                </div>
                <div className="content-stretch flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[96px]">
                  <p className="[word-break:break-word] font-['Inter'] font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-left text-white whitespace-nowrap">
                    Pricing
                  </p>
                </div>
                <div className="content-stretch flex h-[44px] items-center justify-center overflow-clip relative rounded-[8px] shrink-0 w-[144px]">
                  <p className="[word-break:break-word] font-['Inter'] font-medium leading-[1.4] not-italic relative shrink-0 text-[14px] text-left text-white whitespace-nowrap">
                    My account
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex font-['Inter'] font-normal gap-[965px] h-[20px] items-start leading-[1.4] not-italic relative shrink-0 text-[#d1d8ee] text-[14px] w-full">
            <p className="h-full relative shrink-0 w-[193px]">A more focused way to learn.</p>
            <p className="h-full relative shrink-0 w-[138px]">Learning, with focus.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
