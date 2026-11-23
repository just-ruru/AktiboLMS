import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'

/**
 * Public · Support request sent — shared pre-signup Navbar, centered white confirmation
 * card, "REQUEST PREVIEW COMPLETE" label, "Your request is ready" heading, email
 * address, request summary box, gold BACK TO HELP button + white HOME button,
 * fine print, Need help link, shared Footer. Responsive at 320/375/390/768/1024/1440.
 */
export function SupportRequestSent() {
  const navigate = useNavigate()

  return (
    <div className="bg-aktibo-navy min-h-screen flex flex-col relative animate-page-fade">
      {/* Navigation — shared pre-signup Navbar */}

      {/* Confirmation workspace */}
      <main className="flex-1 flex items-center justify-center px-[72px] pt-6 pb-8">
        <CardForm>
          <CardFormIntro>
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
              REQUEST PREVIEW COMPLETE
            </p>
            <p className="font-display text-[32px] font-bold leading-tight text-aktibo-navy whitespace-nowrap whitespace-normal">
              Your request is ready
            </p>
            <p className="mt-2 text-[12px] text-aktibo-muted">
              This is the confirmation state for your support request.
            </p>
          </CardFormIntro>

          {/* Email address */}
          <p className="mt-6 font-display text-[13px] font-bold text-aktibo-navy whitespace-nowrap whitespace-normal">
            name@example.com
          </p>

          {/* Request summary box */}
          <div className="mt-4 p-4 rounded-control bg-aktibo-canvas border border-aktibo-border-strong">
            <p className="text-[12px] text-aktibo-muted">
              A copy of your request would be sent to this email address.
            </p>
            <p className="mt-1 text-[11px] text-aktibo-muted">
              Prototype preview · No message has actually been submitted.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col flex-row gap-3 justify-center">
            <Button
              size="lg"
              fullWidth
              variant="primary"
              className="w-auto"
              onClick={() => navigate('/help-support')}
            >
              Back to help
            </Button>
            <Button
              size="lg"
              fullWidth
              variant="ghost"
              className="w-auto"
              onClick={() => navigate('/')}
            >
              Home
            </Button>
          </div>

          {/* Fine print */}
          <p className="mt-6 text-[11px] text-aktibo-muted text-center">
            You can return to Help & support to review another topic.
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

/** Centered white card for auth/utility pages. */
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
