import { useCallback, useEffect, useRef } from 'react'

interface SelectOptionOverlayProps {
  open: boolean
  onClose: () => void
  onSelect: (option: string) => void
  /** Dialog heading. Defaults to the frame's own title. */
  title?: string
  /** Helper line under the heading. */
  description?: string
  /** The options to offer. Supplied by the owning screen. */
  options?: string[]
}

/**
 * Select an option overlay — Figma frame 174:1490.
 *
 * A self-contained, fixed-position dialog rendered above a page backdrop.
 * Keyboard accessible: Escape closes, focus moves into the dialog on open,
 * and it carries role="dialog" + aria-modal="true" + an accessible name.
 *
 * The options are supplied by the owning screen, so the overlay never offers
 * invented records; picking one only reports the choice back to that screen.
 */
export function SelectOptionOverlay({
  open,
  onClose,
  onSelect,
  title = 'Choose a course',
  description = 'Choose an option to continue.',
  options = [],
}: SelectOptionOverlayProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    },
    [onClose],
  )

  useEffect(() => {
    if (!open) return
    document.addEventListener('keydown', handleKeyDown)
    dialogRef.current?.focus()
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, handleKeyDown])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#000e53]/70 p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose()
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="select-option-title"
        className="bg-surface-white rounded-[16px] p-[32px] flex flex-col gap-[20px] w-[620px] max-w-full outline-none"
        tabIndex={-1}
      >
        <h2 id="select-option-title" className="font-display text-[22px] font-bold text-aktif-navy">
          {title}
        </h2>
        <p className="font-display text-[12px] text-text-secondary">{description}</p>
        <div className="flex flex-col gap-[12px] w-[556px]">
          {options.length === 0 && (
            <p className="font-display text-[12px] text-text-secondary">No options are available.</p>
          )}
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className="h-11 rounded-[9px] border border-[#dfe5f0] bg-surface-white px-[12px] py-[12px] font-display text-[11px] font-bold text-aktif-navy flex items-center justify-center"
            >
              {option}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="h-11 rounded-[9px] border border-[#dfe5f0] bg-surface-white px-[12px] py-[12px] font-display text-[11px] font-bold text-aktif-navy w-[556px] flex items-center justify-center"
        >
          CANCEL
        </button>
      </div>
    </div>
  )
}
