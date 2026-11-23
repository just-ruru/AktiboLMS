import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

/**
 * Account · Set new password — shared pre-signup Navbar, centered white reset form,
 * "Set a new password" heading, new password + confirm password fields, preview
 * controls, gold SET PASSWORD · DEMO button, white BACK TO RECOVERY button,
 * prototype guidance banner, Need help link, shared Footer. Responsive at
 * 320/375/390/768/1024/1440.
 */
export function AccountSetNewPassword() {
  const navigate = useNavigate()

  return (
    <div className="bg-aktibo-navy min-h-screen flex flex-col relative animate-page-fade">
      {/* Navigation — shared pre-signup Navbar */}

      {/* Account form workspace */}
      <main className="flex-1 flex items-center justify-center px-[72px] pt-6 pb-8">
        <CardForm>
          <CardFormIntro>
            <p className="font-display text-[32px] font-bold leading-tight text-aktibo-navy whitespace-nowrap whitespace-normal">
              Set a new password
            </p>
            <p className="mt-2 text-[12px] text-aktibo-muted">
              Choose a new password to regain access to your account.
            </p>
          </CardFormIntro>

          {/* New password fields */}
          <div className="mt-6 flex flex-col gap-4">
            <Input
              label="New password *"
              placeholder="Create new password"
              type="password"
              inputSize="auth"
            />
            <Input
              label="Confirm new password *"
              placeholder="Repeat new password"
              type="password"
              inputSize="auth"
            />
          </div>

          {/* Reset password preview controls */}
          <div className="mt-6 flex gap-3">
            <Button size="lg" fullWidth variant="ghost" onClick={() => {}}>
              Use sample details
            </Button>
            <Button size="lg" fullWidth variant="ghost" onClick={() => {}}>
              Show / hide passwords
            </Button>
          </div>

          {/* SET PASSWORD · DEMO button */}
          <Button
            size="lg"
            fullWidth
            variant="primary"
            className="mt-4"
            onClick={() => navigate('/account/password-updated')}
          >
            Set password · demo
          </Button>

          {/* BACK TO RECOVERY button */}
          <Button
            size="lg"
            fullWidth
            variant="ghost"
            className="mt-3"
            onClick={() => navigate('/forgot-password')}
          >
            Back to recovery
          </Button>

          {/* Prototype form guidance */}
          <div className="mt-6 p-4 rounded-control bg-aktibo-warning-bg border border-aktibo-warning-fg/30">
            <p className="text-[11px] text-aktibo-warning-fg">
              Use at least 8 characters. Sample values let you try matching and missing-password states.
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
