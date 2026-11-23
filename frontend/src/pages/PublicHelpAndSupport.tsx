import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'
import { Footer } from '../components/ui/Footer'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

/**
 * Public · Help & support — shared pre-signup Navbar, navy hero band, centered white
 * content card with two columns ("Find a quick answer" FAQ + "Still need a hand?"
 * support form), shared Footer. Responsive at 320/375/390/768/1024/1440.
 */
export function PublicHelpAndSupport() {
  const navigate = useNavigate()

  const FAQS = [
    'How do I join a course?',
    'Which role should I choose?',
    'How do I reset my password?',
    "Why can't I run an activity?",
  ]

  return (
    <div className="bg-aktibo-navy min-h-screen flex flex-col relative animate-page-fade">
      {/* Navigation — shared pre-signup Navbar */}
      <Navbar signedIn={false} />

      {/* Hero band */}
      <header className="bg-aktibo-navy px-[72px] py-6">
        <div className="max-w-[1296px] mx-auto">
          <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-gold whitespace-nowrap">
            HELP & SUPPORT
          </p>
          <h1 className="font-display text-[36px] font-bold text-white leading-tight">
            A little help, right here
          </h1>
          <p className="mt-2 text-[13px] text-aktibo-muted-on-navy">
            Find an answer or prepare a support request without leaving your workspace.
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-[72px] pb-8">
        <CardForm>
          <div className="grid gap-6 grid-cols-2">
            {/* Left — quick answers */}
            <div className="flex flex-col gap-4">
              <p className="font-display text-[20px] font-bold text-aktibo-navy whitespace-nowrap whitespace-normal">
                Find a quick answer
              </p>
              <div className="mt-3 flex flex-col gap-3">
                {FAQS.map((question) => (
                  <Button
                    key={question}
                    size="lg"
                    fullWidth
                    variant="ghost"
                    onClick={() => {}}
                  >
                    {question}
                  </Button>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-control bg-aktibo-canvas border border-aktibo-border-strong">
                <p className="font-display text-[17px] font-bold text-aktibo-navy whitespace-nowrap whitespace-normal">
                  How do I join a course?
                </p>
                <p className="mt-2 text-[13px] text-aktibo-muted leading-relaxed">
                  Open Courses, choose Enroll course, and enter the code shared by your
                  instructor. Check the course preview before confirming.
                </p>
              </div>
              <Link
                to="/forgot-password"
                className="mt-5 block text-[12px] font-medium text-aktibo-navy underline underline-offset-4 text-center w-auto mx-0"
              >
                Go to password recovery
              </Link>
            </div>

            {/* Right — support form */}
            <div className="flex flex-col gap-4">
              <p className="font-display text-[20px] font-bold text-aktibo-navy whitespace-nowrap whitespace-normal">
                Still need a hand?
              </p>
              <p className="text-[12px] text-aktibo-muted leading-relaxed">
                Describe what happened so the support team has the context they need.
              </p>

              <div className="mt-4 flex flex-col gap-4">
                <Input label="Name *" placeholder="Your name" inputSize="md" />
                <Input
                  label="Email *"
                  placeholder="name@example.com"
                  type="email"
                  inputSize="md"
                />
                <Input
                  label="What do you need help with? *"
                  placeholder="How can we help?"
                  inputSize="md"
                />
              </div>

              <div className="mt-4 flex flex-col flex-row gap-3 justify-end">
                <Button
                  size="lg"
                  fullWidth
                  variant="ghost"
                  className="w-auto"
                  onClick={() => {}}
                >
                  Use sample details
                </Button>
                <Button
                  size="lg"
                  fullWidth
                  variant="primary"
                  className="w-auto"
                  onClick={() => navigate('/support-request-sent')}
                >
                  Send request
                </Button>
              </div>

              <div className="mt-4 p-4 rounded-control bg-aktibo-warning-bg border border-aktibo-warning-fg/30">
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-warning-fg whitespace-nowrap">
                  TRY THE FLOW
                </p>
                <p className="mt-1 text-[11px] text-aktibo-warning-fg leading-relaxed">
                  Click a field to fill an example, or use sample details. No real support
                  request is sent from this prototype.
                </p>
              </div>
            </div>
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
