/**
 * Overlay · Form validation — matches Figma frame 174:1469.
 * Opaque navy backdrop, white dialog panel rounded-[16px], single BACK TO FORM button.
 * Can be used as a controlled modal (isOpen/onClose) or as a standalone route.
 */
export function OverlayFormValidation({
  isOpen = true,
  onClose,
}: { isOpen?: boolean; onClose?: () => void } = {}) {
  if (!isOpen) return null

  return (
    <div
      className="bg-[#000e53] content-stretch fixed inset-0 z-[100] flex items-center justify-center overflow-clip relative size-full animate-page-fade"
      onClick={onClose}
    >
      <button
        className="absolute bg-[#000e53] block cursor-pointer h-[1220px] left-0 top-0 w-[1440px]"
        onClick={(e) => {
          e.stopPropagation()
          onClose?.()
        }}
        aria-label="Dismiss overlay"
      />
      <div
        className="bg-white content-stretch flex flex-col gap-[20px] h-[420px] items-start overflow-clip p-[32px] relative rounded-[16px] shrink-0 w-[620px]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#000e53] text-[10px] w-[min-content]">
          CHECK THE FORM
        </p>
        <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#000e53] text-[24px] w-[min-content]">
          Check your details
        </p>
        <div className="bg-[#f4f6fa] content-stretch flex flex-col h-[120px] items-start overflow-clip p-[16px] relative rounded-[8px] shrink-0 w-[556px]">
          <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] relative shrink-0 text-[#596579] text-[13px] w-full">
            Complete the required fields before continuing.
          </p>
        </div>
        <button
          className="bg-[#ffb700] border border-[#000e53] border-solid content-stretch cursor-pointer flex h-[48px] items-center justify-center overflow-clip p-[12px] relative rounded-[9px] shrink-0 w-[556px] hover:bg-[#ffc933] active:bg-[#e8a800] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
          onClick={(e) => {
            e.stopPropagation()
            onClose?.()
          }}
        >
          <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
            BACK TO FORM
          </p>
        </button>
      </div>
    </div>
  )
}
