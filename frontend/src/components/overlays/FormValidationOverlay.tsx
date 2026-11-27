import { useCallback, useEffect, useRef } from 'react'

interface FormValidationOverlayProps {
  open: boolean
  onClose: () => void
  /** Dialog heading. Defaults to the frame's own title. */
  title?: string
  /** Explanation of what has to be corrected. Supplied by the owning form. */
  message?: string
}

/**
 * Form validation overlay — Figma frame 174:1469.
 *
 * A self-contained, fixed-position dialog rendered above a page backdrop.
 * Keyboard accessible: Escape closes, focus moves into the dialog on open,
 * and it carries role="dialog" + aria-modal="true" + an accessible name.
 *
 * The dialog reports what the owning form needs; it never claims a form was
 * submitted or a validation was persisted.
 */
export function FormValidationOverlay({
  open,
  onClose,
  title = 'Check your details',
  message = 'Complete the required fields before continuing.',
}: FormValidationOverlayProps) {
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
        aria-labelledby="form-validation-title"
        className="bg-surface-white rounded-[16px] p-[32px] flex flex-col gap-[20px] w-[620px] max-w-full outline-none"
        tabIndex={-1}
      >
        <p className="font-display text-[10px] font-bold text-aktif-navy">
          CHECK THE FORM
        </p>
        <h2 id="form-validation-title" className="font-display text-[24px] font-bold text-aktif-navy">
          {title}
        </h2>
        <div className="bg-[#f4f6fa] rounded-[8px] p-[16px]">
          <p className="font-display text-[13px] text-text-secondary">{message}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="h-11 rounded-[9px] border border-[#000e53] bg-aktif-gold px-[12px] py-[12px] font-display text-[11px] font-bold text-aktif-navy w-[556px] flex items-center justify-center"
        >
          BACK TO FORM
        </button>
      </div>
    </div>
  )
}
