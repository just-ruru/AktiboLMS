/**
 * Overlay · Select an option — matches Figma frame 174:1490.
 * Opaque navy backdrop, white dialog panel rounded-[16px], 4 option buttons + CANCEL.
 * Can be used as a controlled modal (isOpen/onClose) or as a standalone route.
 */
export function OverlaySelectOption({
  isOpen = true,
  onClose,
  onSelect,
}: { isOpen?: boolean; onClose?: () => void; onSelect?: (option: string) => void } = {}) {
  if (!isOpen) return null

  const OPTIONS = ['Computer Science', 'Information Technology', 'Information Systems', 'Other']

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
        className="bg-white content-stretch flex flex-col gap-[20px] h-[600px] items-start overflow-clip p-[32px] relative rounded-[16px] shrink-0 w-[620px]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="[word-break:break-word] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-full relative shrink-0 text-[#000e53] text-[22px] w-[min-content]">
          Choose a course
        </p>
        <p className="[word-break:break-word] font-['Lexend_Exa:Regular'] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#596579] text-[12px] w-[min-content]">
          Choose an option to continue.
        </p>
        <div className="content-stretch cursor-pointer flex flex-col gap-[12px] h-[252px] items-start overflow-clip relative shrink-0 w-[556px]">
          {OPTIONS.map((option) => (
            <button
              key={option}
              className="bg-white border border-[#dfe5f0] border-solid content-stretch cursor-pointer flex h-[48px] items-center justify-center overflow-clip p-[12px] relative rounded-[9px] shrink-0 w-[556px] hover:bg-[#f4f6fa] active:bg-[#e8ecf3] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
              onClick={(e) => {
                e.stopPropagation()
                onSelect?.(option)
              }}
            >
              <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
                {option}
              </p>
            </button>
          ))}
        </div>
        <button
          className="bg-white border border-[#dfe5f0] border-solid content-stretch cursor-pointer flex h-[48px] items-center justify-center overflow-clip p-[12px] relative rounded-[9px] shrink-0 w-[556px] hover:bg-[#f4f6fa] active:bg-[#e8ecf3] transition-all duration-200 ease-out hover:-translate-y-px active:translate-y-0"
          onClick={(e) => {
            e.stopPropagation()
            onClose?.()
          }}
        >
          <p className="[word-break:break-word] flex-[1_0_0] font-['Lexend_Exa:Bold'] font-bold leading-[1.5] min-w-px relative text-[#000e53] text-[11px] text-center">
            CANCEL
          </p>
        </button>
      </div>
    </div>
  )
}
