import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * Overlay · Confirm logout — confirmation dialog for ending a session.
 * Navy scrim, white dialog panel, two actions. Works as a controlled modal
 * (isOpen/onClose) or as a standalone route.
 */
export function OverlayConfirmLogout({
  isOpen = true,
  onClose,
}: { isOpen?: boolean; onClose?: () => void } = {}) {
  const navigate = useNavigate()
  const panelRef = useRef<HTMLDivElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)

  // Move focus into the dialog when it opens so keyboard users land here.
  useEffect(() => {
    if (isOpen) cancelRef.current?.focus()
  }, [isOpen])

  // Escape closes the dialog.
  useEffect(() => {
    if (!isOpen || !onClose) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-aktibo-navy/80 p-4 animate-page-fade"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-logout-title"
        aria-describedby="confirm-logout-body"
        className="flex w-full max-w-[560px] flex-col gap-5 rounded-card bg-aktibo-surface p-6 shadow-panel p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-display text-[11px] font-bold uppercase tracking-[0.08em] text-aktibo-gold">
          Your account
        </p>
        <h2
          id="confirm-logout-title"
          className="font-display text-[24px] font-bold leading-tight text-aktibo-navy"
        >
          Log out of AktiboLMS?
        </h2>
        <p id="confirm-logout-body" className="text-[14px] leading-relaxed text-aktibo-muted">
          You will return to sign-in. Your saved course progress and account details remain available the next time you sign in.
        </p>

        <div className="flex flex-col-reverse gap-3 flex-row justify-end">
          <button
            ref={cancelRef}
            type="button"
            className="h-11 rounded-control border border-aktibo-border bg-aktibo-surface px-5 font-display text-[13px] font-bold uppercase tracking-[0.06em] text-aktibo-navy transition-colors hover:bg-aktibo-canvas w-auto"
            onClick={(e) => {
              e.stopPropagation()
              onClose?.()
            }}
          >
            Stay signed in
          </button>
          <button
            type="button"
            className="h-11 rounded-control border border-aktibo-navy bg-aktibo-gold px-5 font-display text-[13px] font-bold uppercase tracking-[0.06em] text-aktibo-ink-on-gold transition-colors hover:bg-aktibo-gold-hover w-auto"
            onClick={(e) => {
              e.stopPropagation()
              onClose?.()
              navigate('/login')
            }}
          >
            Log out
          </button>
        </div>

        <p className="text-[12px] text-aktibo-muted">
          In this prototype, only the preview session is reset.
        </p>
      </div>
    </div>
  )
}
