/**
 * Overlay · Confirm logout — matches Figma frame 174:1478.
 * Opaque navy backdrop, white dialog panel rounded-[16px], two h-[48px] buttons.
 * Can be used as a controlled modal (isOpen/onClose) or as a standalone route.
 */
export function OverlayConfirmLogout({
  isOpen = true,
  onClose,
}: { isOpen?: boolean; onClose?: () => void } = {}) {
  if (!isOpen) return null

  return (
    <div
      className="bg-[#000e53] content-stretch fixed inset-0 z-[100] flex items-center justify-center overflow-clip relative size-full animate-page-fade"
      onClick={onClose}
    >
      {/* Dismiss overlay background */}
      <button
        className="absolute bg-[#000e53] block cursor-pointer h-[1220px] left-0 top-0 w-[1440px]"
        onClick={(e) => {
          e.stopPropagation()
          onClose?.()
        }}
        aria-label="Dismiss overlay"
      />
      <div
        className="bg-white content-stretch flex flex-col gap-[20px] h-[400px] items-start overflow-clip p-[32px] relative rounded-[16px] shrink-0 w-[620px]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#000e53] text-[10px] w-[min-content]">
          YOUR ACCOUNT
        </p>
        <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#000e53] text-[24px] w-[min-content]">
          Log out of AktiboLMS?
        </p>
        <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[13px] w-[min-content]">
          You will return to sign-in. Your saved course progress and account details remain available the next time you sign in.
        </p>
        <div className="content-stretch cursor-pointer flex gap-[16px] h-[48px] items-start overflow-clip relative shrink-0 w-[556px]">
          <button
            className="bg-white border border-[#dfe5f0] border-solid content-stretch cursor-pointer flex h-[48px] items-center justify-center overflow-clip p-[12px] relative rounded-[9px] shrink-0 w-[270px] hover:bg-[#f4f6fa] active:bg-[#e8ecf3] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
            onClick={(e) => {
              e.stopPropagation()
              onClose?.()
            }}
          >
            <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
              STAY SIGNED IN
            </p>
          </button>
          <a
            href="/login"
            className="bg-[#ffb700] border border-[#000e53] border-solid content-stretch cursor-pointer flex h-[48px] items-center justify-center overflow-clip p-[12px] relative rounded-[9px] shrink-0 w-[270px] hover:bg-[#ffc933] active:bg-[#e8a800] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
            onClick={(e) => {
              e.stopPropagation()
              onClose?.()
            }}
          >
            <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
              LOG OUT
            </p>
          </a>
        </div>
        <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[11px] w-[min-content]">
          In this prototype, only the preview session is reset.
        </p>
      </div>
    </div>
  )
}
