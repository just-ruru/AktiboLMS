import { Link } from 'react-router-dom'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageIntro } from '../components/ui/PageIntro'

export function AccountEditProfile() {
  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative animate-page-fade">
      {/* Page intro band — navy */}
      <PageIntro
        breadcrumb="My account / Edit profile"
        title="Edit your profile"
        metadata="Keep your personal and contact information up to date."
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
                  Make it yours
                </p>
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <Link to="/account-profile">
                  <Button size="lg" fullWidth variant="ghost">
                    Account overview
                  </Button>
                </Link>
                <Button size="lg" fullWidth variant="primary">
                  Edit profile
                </Button>
                <Link to="/security">
                  <Button size="lg" fullWidth variant="ghost">
                    Password & security
                  </Button>
                </Link>
                <Link to="/help-support">
                  <Button size="lg" fullWidth variant="ghost">
                    Help & support
                  </Button>
                </Link>
              </div>
              <Card variant="surface" padded className="mt-5 p-4 bg-aktibo-canvas border-aktibo-border-strong">
                <div className="flex flex-col gap-1">
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted">
                    Your changes, your choice
                  </p>
                  <p className="font-sans text-[12px] text-aktibo-muted">
                    Changes are applied only when you save. Cancel returns to your profile without changing saved information.
                  </p>
                </div>
              </Card>
            </Card>
          </aside>

          {/* Right panel — profile edit form */}
          <Card variant="surface" padded className="p-8">
            <div className="flex flex-col gap-2">
              <p className="font-sans text-[20px] font-bold text-aktibo-navy-deep whitespace-nowrap">
                Personal and contact information
              </p>
              <p className="font-sans text-[12px] text-aktibo-muted">
                Your profile details stay separate from your student or instructor role.
              </p>

              {/* Profile fields */}
              <div className="mt-6 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-sans text-[12px] font-bold uppercase tracking-[0.08em] text-aktibo-navy-deep">
                    Display name *
                  </label>
                  <Input placeholder="Hoshimi Miyabi" inputSize="md" />
                </div>

                <div className="grid gap-4 grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-[12px] font-bold uppercase tracking-[0.08em] text-aktibo-navy-deep">
                      First name *
                    </label>
                    <Input placeholder="Miyabi" inputSize="md" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-[12px] font-bold uppercase tracking-[0.08em] text-aktibo-navy-deep">
                      Last name *
                    </label>
                    <Input placeholder="Hoshimi" inputSize="md" />
                  </div>
                </div>

                <div className="grid gap-4 grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-[12px] font-bold uppercase tracking-[0.08em] text-aktibo-navy-deep">
                      Email address *
                    </label>
                    <Input type="email" placeholder="alexsmith.mobbin@gmail.com" inputSize="md" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-[12px] font-bold uppercase tracking-[0.08em] text-aktibo-navy-deep">
                      Mobile number
                    </label>
                    <Input placeholder="+1 650-213-7390" inputSize="md" />
                  </div>
                </div>

                <div className="grid gap-4 grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-[12px] font-bold uppercase tracking-[0.08em] text-aktibo-navy-deep">
                      Date of birth
                    </label>
                    <div className="flex items-center gap-2 rounded-control border border-aktibo-border bg-aktibo-surface p-3 cursor-pointer">
                      <span className="font-sans text-[12px] text-aktibo-muted">Not provided</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-sans text-[12px] font-bold uppercase tracking-[0.08em] text-aktibo-navy-deep">
                      Gender
                    </label>
                    <div className="flex items-center gap-2 rounded-control border border-aktibo-border bg-aktibo-surface p-3 cursor-pointer">
                      <span className="font-sans text-[12px] text-aktibo-muted">Not specified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sample edit tip box */}
              <div className="mt-6 p-4 rounded-control bg-aktibo-warning-bg border border-aktibo-warning-fg/30">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-warning-fg">
                  Try a sample edit
                </p>
                <p className="font-sans text-[12px] text-aktibo-muted">
                  Use sample changes to preview an updated phone number, birthday, and gender preference. Nothing is applied until you save.
                </p>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex flex-col flex-row gap-3 justify-end">
                <Button size="lg" variant="ghost">
                  Use sample changes
                </Button>
                <Button size="lg" variant="ghost">
                  Cancel
                </Button>
                <Button size="lg" variant="primary">
                  Save changes
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
