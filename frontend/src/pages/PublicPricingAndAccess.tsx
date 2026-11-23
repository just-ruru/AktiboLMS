import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'
import { Footer } from '../components/ui/Footer'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

/**
 * Public · Pricing & access — shared pre-signup Navbar, navy hero band, access
 * options banner, three plan cards (Student / Instructor / Institution), two bottom
 * action boxes, shared Footer. Responsive at 320/375/390/768/1024/1440.
 */
export function PublicPricingAndAccess() {
  const navigate = useNavigate()

  return (
    <div className="bg-aktibo-navy min-h-screen flex flex-col relative animate-page-fade">
      {/* Navigation — shared pre-signup Navbar */}
      <Navbar signedIn={false} />

      {/* Hero band */}
      <header className="bg-aktibo-navy px-[72px] py-6">
        <div className="max-w-[1296px] mx-auto">
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-gold whitespace-nowrap">
            PRICING & ACCESS
          </p>
          <h1 className="font-display text-[36px] font-bold text-white leading-tight">
            Plans for active learning
          </h1>
          <p className="mt-2 text-[13px] text-aktibo-muted-on-navy">
            Explore the workspace that fits your learning or teaching needs.
          </p>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-[72px] pb-8">
        <CardForm>
          {/* Access options banner */}
          <div className="p-4 rounded-control bg-aktibo-warning-bg border border-aktibo-warning-fg/30">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-warning-fg whitespace-nowrap">
              ACCESS OPTIONS · PROTOTYPE PREVIEW
            </p>
            <p className="mt-1 text-[12px] text-aktibo-ink leading-relaxed">
              Monetary pricing has not been defined for this project. No payment is
              collected in this prototype.
            </p>
          </div>

          {/* Plan cards */}
          <div className="mt-6 grid gap-6 grid-cols-3">
            <Card variant="surface" padded className="p-6 flex flex-col h-full">
              <div className="flex flex-col gap-3">
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                  FOR LEARNERS
                </p>
                <p className="font-display text-[21px] font-bold text-aktibo-navy whitespace-nowrap whitespace-normal">
                  Student access
                </p>
                <p className="text-[13px] font-bold text-aktibo-navy-deep whitespace-nowrap whitespace-normal">
                  Your next learning step
                </p>
                <p className="mt-2 text-[12px] text-aktibo-muted leading-relaxed">
                  Join a course and turn concepts into practice.
                </p>
                <div className="mt-4 flex flex-col gap-2 text-[11px] text-aktibo-ink">
                  <p className="flex items-start gap-2">
                    <span className="shrink-0">•</span>
                    Interactive reading and video lessons
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="shrink-0">•</span>
                    In-lesson programming activities
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="shrink-0">•</span>
                    Quick checks with immediate feedback
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="shrink-0">•</span>
                    Personal progress and activity history
                  </p>
                </div>
                <Button
                  size="lg"
                  fullWidth
                  variant="primary"
                  className="mt-5"
                  onClick={() => navigate('/register')}
                >
                  Get started as a student
                </Button>
              </div>
            </Card>

            <Card variant="surface" padded className="p-6 flex flex-col h-full">
              <div className="flex flex-col gap-3">
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                  FOR EDUCATORS
                </p>
                <p className="font-display text-[21px] font-bold text-aktibo-navy whitespace-nowrap whitespace-normal">
                  Instructor access
                </p>
                <p className="text-[13px] font-bold text-aktibo-navy-deep whitespace-nowrap whitespace-normal">
                  Build an active classroom
                </p>
                <p className="mt-2 text-[12px] text-aktibo-muted leading-relaxed">
                  Create focused lessons and understand learner progress.
                </p>
                <div className="mt-4 flex flex-col gap-2 text-[11px] text-aktibo-ink">
                  <p className="flex items-start gap-2">
                    <span className="shrink-0">•</span>
                    Course, subject, and module authoring
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="shrink-0">•</span>
                    Rich-media and programming blocks
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="shrink-0">•</span>
                    Practice questions with explanations
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="shrink-0">•</span>
                    Learner progress and engagement data
                  </p>
                </div>
                <Button
                  size="lg"
                  fullWidth
                  variant="primary"
                  className="mt-5"
                  onClick={() => navigate('/register')}
                >
                  Get started as an instructor
                </Button>
              </div>
            </Card>

            <Card variant="surface" padded className="p-6 flex flex-col h-full">
              <div className="flex flex-col gap-3">
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                  FOR TEAMS
                </p>
                <p className="font-display text-[21px] font-bold text-aktibo-navy whitespace-nowrap whitespace-normal">
                  Institution access
                </p>
                <p className="text-[13px] font-bold text-aktibo-navy-deep whitespace-nowrap whitespace-normal">
                  Explore a shared rollout
                </p>
                <p className="mt-2 text-[12px] text-aktibo-muted leading-relaxed">
                  Discuss how AktiboLMS could support your learning community.
                </p>
                <div className="mt-4 flex flex-col gap-2 text-[11px] text-aktibo-ink">
                  <p className="flex items-start gap-2">
                    <span className="shrink-0">•</span>
                    Align learning and teaching workflows
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="shrink-0">•</span>
                    Plan course and enrollment access
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="shrink-0">•</span>
                    Discuss onboarding needs
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="shrink-0">•</span>
                    Review requirements with your team
                  </p>
                </div>
                <Button
                  size="lg"
                  fullWidth
                  variant="primary"
                  className="mt-5"
                  onClick={() => navigate('/help-support')}
                >
                  Discuss your needs
                </Button>
              </div>
            </Card>
          </div>

          {/* Bottom action boxes */}
          <div className="mt-8 grid gap-6 grid-cols-2">
            <Card variant="surface" padded className="p-6">
              <div className="flex flex-col gap-2">
                <p className="font-display text-[18px] font-bold text-aktibo-navy-deep whitespace-nowrap whitespace-normal">
                  Already have an account?
                </p>
                <p className="text-[12px] text-aktibo-muted leading-relaxed">
                  Sign in and choose your student or instructor workspace.
                </p>
                <Button
                  size="lg"
                  fullWidth
                  variant="ghost"
                  className="mt-4"
                  onClick={() => navigate('/login')}
                >
                  Log in
                </Button>
              </div>
            </Card>

            <Card variant="surface" padded className="p-6">
              <div className="flex flex-col gap-2">
                <p className="font-display text-[18px] font-bold text-aktibo-navy-deep whitespace-nowrap whitespace-normal">
                  Not sure where to start?
                </p>
                <p className="text-[12px] text-aktibo-muted leading-relaxed">
                  Find answers about enrollment, roles, and getting help.
                </p>
                <Button
                  size="lg"
                  fullWidth
                  variant="ghost"
                  className="mt-4"
                  onClick={() => navigate('/help-support')}
                >
                  Help & support
                </Button>
              </div>
            </Card>
          </div>
        </CardForm>
      </main>

      {/* Footer */}
      <Footer signedIn={false} />
    </div>
  )
}

/** Centered white content card. */
function CardForm({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-aktibo-surface flex flex-col gap-5 p-6 p-8 rounded-panel shadow-panel w-full max-w-[1296px]">
      {children}
    </div>
  )
}
