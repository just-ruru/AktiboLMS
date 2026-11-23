import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'

/**
 * Account · Password updated — shared pre-signup Navbar, centered white confirmation
 * card, "PASSWORD UPDATED" label, "A fresh start" heading, info box, gold BACK TO
 * SIGN IN button, prototype fine print, Need help link, shared Footer.
 * Responsive at 320/375/390/768/1024/1440.
 */
export function AccountPasswordUpdated() {
  const navigate = useNavigate()

  return (
    <div className="bg-aktibo-navy min-h-screen flex flex-col relative animate-page-fade">
      {/* Navigation — shared pre-signup Navbar */}

      {/* Account form workspace */}
      <main className="flex-1 flex items-center justify-center px-[72px] pt-6 pb-8">
        <CardForm>
          <CardFormIntro>
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted">
              PASSWORD UPDATED
            </p>
            <p className="font-display text-[32px] font-bold leading-tight text-aktibo-navy whitespace-nowrap whitespace-normal">
              A fresh start
            </p>
            <p className="mt-2 text-[12px] text-aktibo-muted">
              Your password has been updated in this prototype flow.
            </p>
          </CardFormIntro>

          {/* Info box */}
          <div className="mt-6 p-4 rounded-control bg-aktibo-warning-bg border border-aktibo-warning-fg/30">
            <p className="text-[11px] text-aktibo-warning-fg">
              Return to sign-in and use the sample details to continue to your workspace.
            </p>
          </div>

          {/* BACK TO SIGN IN button */}
          <Button
            size="lg"
            fullWidth
            variant="primary"
            className="mt-4"
            onClick={() => navigate('/login')}
          >
            Back to sign in
          </Button>

          {/* Prototype fine print */}
          <p className="mt-6 text-[11px] text-aktibo-muted text-center">
            Prototype only · No real password has been changed.
          </p>

          <Link
            to="/help-support"
            className="mt-4 block text-[12px] font-medium text-aktibo-navy underline underline-offset-4 text-center"
          >
            Need help? Visit Help & support
          </Link>
        </CardForm>
      </main>

    </div>
  )
}

/** Centered white form card for auth pages. */
function CardForm({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-aktibo-surface flex flex-col gap-5 p-6 p-8 rounded-panel shadow-panel w-full max-w-[560px]">
      {children}
    </div>
  )
}

/** Form intro heading block inside an auth card. */
function CardFormIntro({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>
}
