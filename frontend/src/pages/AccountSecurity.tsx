import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageIntro } from '../components/ui/PageIntro'

export function AccountSecurity() {
  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative animate-page-fade">
      {/* Page intro band — navy */}
      <PageIntro
        breadcrumb="My account / Password & security"
        title="Keep your account secure"
        metadata="Change your password and review your active sessions."
      />

      {/* Main content area */}
      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        <div className="grid gap-6 grid-cols-[288px_1fr] items-start">
          {/* Left sidebar — account navigation */}
          <aside className="flex flex-col gap-4">
            <Card variant="surface" padded className="p-5">
              <div className="flex flex-col gap-1">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted">
                  Your account
                </p>
                <p className="font-sans text-[20px] font-bold text-aktibo-navy-deep whitespace-nowrap">
                  Security center
                </p>
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <Link to="/account-profile">
                  <Button size="lg" fullWidth variant="ghost">
                    Account overview
                  </Button>
                </Link>
                <Link to="/edit-profile">
                  <Button size="lg" fullWidth variant="ghost">
                    Edit profile
                  </Button>
                </Link>
                <Button size="lg" fullWidth variant="primary">
                  Password & security
                </Button>
                <Link to="/help-support">
                  <Button size="lg" fullWidth variant="ghost">
                    Help & support
                  </Button>
                </Link>
              </div>
              <Card variant="surface" padded className="mt-5 p-4 bg-aktibo-canvas border-aktibo-border-strong">
                <div className="flex flex-col gap-1">
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted">
                    Keep it secure
                  </p>
                  <p className="font-sans text-[12px] text-aktibo-muted">
                    Change your password when you need it. Sessions you start now stay active until you sign out.
                  </p>
                </div>
              </Card>
            </Card>
          </aside>

          {/* Right panel — change password form */}
          <Card variant="surface" padded className="p-8">
            <div className="flex flex-col gap-2">
              <p className="font-sans text-[20px] font-bold text-aktibo-navy-deep whitespace-nowrap">
                Change your password
              </p>
              <p className="font-sans text-[12px] text-aktibo-muted">
                All fields are required to confirm your new password.
              </p>

              {/* Password fields */}
              <div className="mt-6 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-sans text-[12px] font-bold uppercase tracking-[0.08em] text-aktibo-navy-deep">
                    Current password *
                  </label>
                  <div className="rounded-control border border-aktibo-border bg-aktibo-surface p-3">
                    <span className="font-sans text-[12px] text-aktibo-muted">••••••••</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-sans text-[12px] font-bold uppercase tracking-[0.08em] text-aktibo-navy-deep">
                    New password *
                  </label>
                  <div className="rounded-control border border-aktibo-border bg-aktibo-surface p-3">
                    <span className="font-sans text-[12px] text-aktibo-muted">••••••••</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-sans text-[12px] font-bold uppercase tracking-[0.08em] text-aktibo-navy-deep">
                    Confirm new password *
                  </label>
                  <div className="rounded-control border border-aktibo-border bg-aktibo-surface p-3">
                    <span className="font-sans text-[12px] text-aktibo-muted">••••••••</span>
                  </div>
                </div>
              </div>

              {/* After password change info */}
              <div className="mt-6 flex flex-col gap-2">
                <p className="font-sans text-[16px] font-bold text-aktibo-navy-deep whitespace-nowrap">
                  After you change your password
                </p>
                <p className="font-sans text-[12px] text-aktibo-muted">
                  Your current session stays active. Sign in again on any other device where you were signed in with the old password.
                </p>
                <div className="mt-3 p-3 rounded-control bg-aktibo-info-bg border border-aktibo-info-fg/30">
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-info-fg">
                    Security tip
                  </p>
                  <p className="font-sans text-[12px] text-aktibo-muted">
                    Use a strong mix of letters, numbers, and symbols — and don’t reuse passwords across services.
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex flex-col flex-row gap-3 justify-end">
                <Button size="lg" variant="ghost">
                  Cancel
                </Button>
                <Button size="lg" variant="primary">
                  Update password
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
