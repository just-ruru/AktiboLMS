import profilePicPlaceholder from '../assets/profile_pic_placeholder.jpg'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageIntro } from '../components/ui/PageIntro'

export function AccountProfile() {
  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative size-full animate-page-fade">
      {/* Page introduction — navy band */}
      <PageIntro
        breadcrumb="My account"
        title="Account profile"
        metadata="Manage your personal information and account details."
      />

      {/* Profile workspace — responsive grid */}
      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        <div className="grid gap-6 grid-cols-[312px_1fr] items-start">
          {/* Left column — profile summary + session actions */}
          <div className="flex flex-col gap-6">
            <Card variant="surface" padded className="p-6">
              <div className="flex flex-col items-center gap-3">
                <div className="bg-aktibo-gold h-[4px] w-[40px] rounded-[2px]" />
                <div className="relative size-[219px]">
                  <img
                    src={profilePicPlaceholder}
                    alt="Avatar"
                    className="absolute block inset-0 max-w-none size-full rounded-full object-cover"
                  />
                </div>
                <p className="font-sans text-[12px] font-bold uppercase tracking-[0.08em] text-aktibo-muted">
                  Account holder
                </p>
                <p className="font-sans text-[28px] font-bold text-aktibo-navy-deep whitespace-nowrap">
                  Hoshimi Miyabi
                </p>
                <p className="font-sans text-[14px] text-aktibo-muted">
                  miyabi.hoshimi@hand.org
                </p>
                <hr className="w-full border-aktibo-border my-4" />
                <Link to="/edit-profile">
                  <Button size="lg" fullWidth variant="primary">
                    Edit basic info
                  </Button>
                </Link>
              </div>
            </Card>

            <div className="flex flex-col gap-3">
              <p className="font-sans text-[16px] font-bold text-aktibo-navy-deep whitespace-nowrap">
                Account access
              </p>
              <p className="font-sans text-[14px] text-aktibo-muted whitespace-nowrap">
                Finished learning for now?
              </p>
              <Card variant="surface" padded className="p-0">
                <Button
                  size="lg"
                  fullWidth
                  variant="danger"
                  className="justify-start pl-4 text-left text-aktibo-danger-fg font-bold"
                >
                  Log out
                </Button>
              </Card>
            </div>
          </div>

          {/* Right column — Account details card */}
          <Card variant="surface" padded className="p-8">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col flex-row items-center gap-6">
                <div className="flex flex-col gap-1">
                  <p className="font-sans text-[26px] font-bold text-aktibo-navy-deep whitespace-nowrap">
                    Account details
                  </p>
                  <p className="font-sans text-[15px] text-aktibo-muted">
                    Your personal and contact information.
                  </p>
                </div>
                <Link to="/edit-profile">
                  <Button size="lg" variant="primary">
                    Edit account details
                  </Button>
                </Link>
              </div>

              <div className="mt-6 grid gap-3 grid-cols-2">
                <div className="flex flex-col gap-2 pt-1">
                  <p className="font-sans text-[14px] text-aktibo-muted whitespace-nowrap">
                    First name
                  </p>
                  <p className="font-sans text-[18px] text-aktibo-navy-deep">
                    Hoshimi
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <p className="font-sans text-[14px] text-aktibo-muted whitespace-nowrap">
                    Last name
                  </p>
                  <p className="font-sans text-[18px] text-aktibo-navy-deep">
                    Miyabi
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <p className="font-sans text-[14px] text-aktibo-muted whitespace-nowrap">
                    Mobile number
                  </p>
                  <p className="font-sans text-[18px] text-aktibo-navy-deep">
                    +1 XXX-XXX-XXXX
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <p className="font-sans text-[14px] text-aktibo-muted whitespace-nowrap">
                    Email address
                  </p>
                  <p className="font-sans text-[18px] text-aktibo-navy-deep">
                    miyabi.hoshimi@hand.org
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 pt-4">
                <div className="flex items-center gap-8">
                  <div className="flex flex-col gap-2">
                    <p className="font-sans text-[14px] text-aktibo-muted whitespace-nowrap">
                      Date of birth
                    </p>
                    <button
                      type="button"
                      className="font-sans text-[18px] font-bold text-aktibo-navy underline underline-offset-4"
                    >
                      + Add
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-sans text-[14px] text-aktibo-muted whitespace-nowrap">
                      Gender
                    </p>
                    <button
                      type="button"
                      className="font-sans text-[18px] font-bold text-aktibo-navy underline underline-offset-4"
                    >
                      + Add
                    </button>
                  </div>
                </div>
                <p className="font-sans text-[15px] text-aktibo-muted whitespace-nowrap">
                  Keep your contact information up to date.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
