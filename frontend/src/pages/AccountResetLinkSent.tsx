import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'

/**
 * Account · Reset link sent — shared pre-signup Navbar, centered white confirmation
 * card, "LINK SENT" label, "Reset link sent" heading, email address, gold RESET
 * PASSWORD · DEMO button, white RESEND + BACK TO SIGN IN buttons, prototype banner,
 * Need help link, shared Footer. Responsive at 320/375/390/768/1024/1440.
 */
export function AccountResetLinkSent() {
  const navigate = useNavigate()

  return (
    <div className="bg-aktibo-navy min-h-screen flex flex-col relative animate-page-fade">
      {/* Navigation — shared pre-signup Navbar */}

      {/* Account form workspace */}
      <main className="flex-1 flex items-center justify-center px-[72px] pt-6 pb-8">
        <CardForm>
          <CardFormIntro>
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted">
              LINK SENT
            </p>
            <p className="font-display text-[32px] font-bold leading-tight text-aktibo-navy whitespace-nowrap whitespace-normal">
              Reset link sent
            </p>
            <p className="mt-2 text-[12px] text-aktibo-muted">
              A password reset link would be sent to the address you registered with.
            </p>
          </CardFormIntro>

          {/* Email address */}
          <p className="mt-6 font-display text-[14px] font-bold text-aktibo-navy whitespace-nowrap whitespace-normal">
            name@example.com
          </p>

          <p className="mt-2 text-[12px] text-aktibo-muted">
            Use the demo reset link below to continue.
          </p>

          {/* Reset actions */}
          <div className="mt-6 flex flex-col gap-3">
            <Button
              size="lg"
              fullWidth
              variant="primary"
              onClick={() => navigate('/account/set-new-password')}
            >
              Reset password · demo
            </Button>
            <Button
              size="lg"
              fullWidth
              variant="ghost"
              onClick={() => {}}
            >
              Resend reset link
            </Button>
            <Button
              size="lg"
              fullWidth
              variant="ghost"
              onClick={() => navigate('/login')}
            >
              Back to sign in
            </Button>
          </div>

          {/* Prototype form guidance */}
          <div className="mt-6 p-4 rounded-control bg-aktibo-warning-bg border border-aktibo-warning-fg/30">
            <p className="text-[11px] text-aktibo-warning-fg">
              No email is sent. The demo link previews the reset flow and takes you to set a new password.
            </p>
          </div>

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
