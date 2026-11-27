import { useCallback, useEffect, useRef } from 'react'

interface ConfirmLogoutDialogProps {
  open: boolean
  onClose: () => void
  onLogout: () => void
}

/**
 * Confirm logout dialog.
 *
 * A self-contained, fixed-position dialog rendered above a page backdrop.
 * Keyboard accessible: Escape closes, focus moves into the dialog on open,
 * and it carries role="dialog" + aria-modal="true" + an accessible name.
 *
 * This is a prototype overlay: there is no authentication/session backend, so
 * logging out only resets the preview session. It does not claim a real
 * sign-out happened.
 */
export function ConfirmLogoutDialog({
  open,
  onClose,
  onLogout,
}: ConfirmLogoutDialogProps) {
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
        aria-labelledby="confirm-logout-title"
        className="bg-surface-white rounded-[16px] p-[32px] flex flex-col gap-[20px] w-[620px] max-w-full outline-none"
        tabIndex={-1}
      >
        <p className="font-display text-[10px] font-bold text-aktif-navy">
          YOUR ACCOUNT
        </p>
        <h2 id="confirm-logout-title" className="font-display text-[24px] font-bold text-aktif-navy">
          Log out of AktiboLMS?
        </h2>
        <p className="font-display text-[13px] text-text-secondary">
          You will return to sign-in. Your saved course progress and account
          details remain available the next time you sign in.
        </p>
        <div className="flex gap-[16px] w-[556px]">
          <button
            type="button"
            onClick={onClose}
            className="h-11 flex-1 rounded-[9px] border border-[#dfe5f0] bg-surface-white px-[12px] py-[12px] font-display text-[11px] font-bold text-aktif-navy flex items-center justify-center"
          >
            STAY SIGNED IN
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="h-11 flex-1 rounded-[9px] border border-[#000e53] bg-aktif-gold px-[12px] py-[12px] font-display text-[11px] font-bold text-aktif-navy flex items-center justify-center"
          >
            LOG OUT
          </button>
        </div>
        <p className="font-display text-[11px] text-text-secondary">
          In this prototype, only the preview session is reset.
        </p>
      </div>
    </div>
  )
}
