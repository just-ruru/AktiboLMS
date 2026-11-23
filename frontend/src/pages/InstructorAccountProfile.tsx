import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageIntro } from '../components/ui/PageIntro'

export function InstructorAccountProfile() {
  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative size-full animate-page-fade">

      {/* Page introduction — navy hero band */}
      <PageIntro
        breadcrumb="Instructor account / Profile"
        title="Your instructor profile"
        metadata="Manage your teaching presence and account details."
      />

      {/* Profile workspace — responsive grid */}
      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        <div className="grid gap-6 grid-cols-[288px_1fr] items-start">
          {/* Left column — instructor menu */}
          <aside className="flex flex-col gap-4">
            <Card variant="surface" padded className="p-6">
              <div className="flex flex-col gap-2">
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                  INSTRUCTOR MENU
                </p>
                <p className="font-titling text-[19px] font-bold text-aktibo-navy-deep whitespace-nowrap whitespace-normal">
                  Manage your teaching account
                </p>
              </div>
              <div className="mt-4 flex flex-col gap-2">
                <Link to="/instructor/account-profile">
                  <Button size="lg" fullWidth variant="primary" className="text-left pl-4">
                    Account details
                  </Button>
                </Link>
                <Link to="/instructor/courses">
                  <Button size="lg" fullWidth variant="ghost" className="text-left pl-4">
                    My courses
                  </Button>
                </Link>
                <Link to="/help-support">
                  <Button size="lg" fullWidth variant="ghost" className="text-left pl-4">
                    Help & support
                  </Button>
                </Link>
              </div>
            </Card>

            <Card variant="surface" padded className="p-6">
              <div className="flex items-start gap-4">
                <div className="relative size-[64px] shrink-0">
                  <img
                    src="/assets/aktibo-symbol.png"
                    alt="Instructor"
                    className="absolute inset-0 max-w-none size-full object-cover rounded-control"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-titling text-[16px] font-bold text-aktibo-navy-deep">
                    Instructor
                  </p>
                  <p className="font-sans text-[12px] text-aktibo-muted whitespace-nowrap">
                    Your teaching profile
                  </p>
                  <p className="font-sans text-[11px] text-aktibo-muted whitespace-nowrap">
                    Active since today
                  </p>
                </div>
              </div>
            </Card>
          </aside>

          {/* Right column — account details */}
          <Card variant="surface" padded className="p-8">
            <div className="flex flex-col gap-2">
              <p className="font-titling text-[20px] font-bold text-aktibo-navy-deep whitespace-nowrap whitespace-normal">
                Account details
              </p>
              <p className="font-sans text-[12px] text-aktibo-muted whitespace-nowrap whitespace-normal">
                Keep your instructor account information up to date so learners know who you are.
              </p>
            </div>

            <div className="mt-6 flex flex-col flex-row gap-16 items-start">
              <div className="flex flex-col gap-4 w-full max-w-[624px]">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <p className="font-sans text-[12px] font-bold text-aktibo-ink whitespace-nowrap">
                      Instructor name *
                    </p>
                    <div className="bg-aktibo-surface border border-aktibo-border rounded-control p-3">
                      <p className="font-sans text-[12px] text-aktibo-muted">
                        Hoshimi Miyabi
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-sans text-[12px] font-bold text-aktibo-ink whitespace-nowrap">
                      Email address *
                    </p>
                    <div className="bg-aktibo-surface border border-aktibo-border rounded-control p-3">
                      <p className="font-sans text-[12px] text-aktibo-muted">
                        instructor@example.com
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-sans text-[12px] font-bold text-aktibo-ink whitespace-nowrap">
                      Teaching focus
                    </p>
                    <div className="bg-aktibo-surface border border-aktibo-border rounded-control p-3 cursor-pointer">
                      <p className="font-sans text-[12px] text-aktibo-muted">
                        Programming
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="w-auto"
                    onClick={() => {}}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="lg"
                    variant="primary"
                    className="w-auto"
                    onClick={() => {}}
                  >
                    Edit account details
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>

    </div>
  )
}
