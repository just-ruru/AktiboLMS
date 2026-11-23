import { useNavigate } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

/**
 * Account · Choose your role — shared pre-signup Navbar, centered white role-selection
 * card, "WELCOME TO AKTIBO LMS" label, "How will you use Aktibo?" heading, student +
 * instructor choice cards, BACK TO SIGN IN button, prototype note, shared Footer.
 * Responsive at 320/375/390/768/1024/1440.
 */
export function ChooseRole() {
  const navigate = useNavigate()

  return (
    <div className="bg-aktibo-navy min-h-screen flex flex-col relative animate-page-fade">
      {/* Navigation — shared pre-signup Navbar */}

      {/* Role selection workspace */}
      <main className="flex-1 flex items-center justify-center px-[72px] pt-6 pb-8">
        <CardForm>
          <CardFormIntro>
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
              WELCOME TO AKTIBO LMS
            </p>
            <p className="font-display text-[32px] font-bold leading-tight text-aktibo-navy whitespace-nowrap whitespace-normal">
              How will you use Aktibo?
            </p>
            <p className="mt-2 text-[12px] text-aktibo-muted">
              Choose your role to open the right workspace for you.
            </p>
          </CardFormIntro>

          {/* Student and instructor choices */}
          <div className="mt-6 grid gap-5 grid-cols-2">
            <Card variant="surface" padded className="p-6">
              <div className="flex flex-col gap-3">
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                  FOR YOUR LEARNING JOURNEY
                </p>
                <p className="font-display text-[20px] font-bold text-aktibo-navy whitespace-nowrap whitespace-normal">
                  I am a student
                </p>
                <p className="text-[12px] text-aktibo-muted leading-relaxed">
                  Join courses, work through interactive lessons, and keep track of your
                  progress.
                </p>
                <Button
                  size="lg"
                  fullWidth
                  variant="primary"
                  className="mt-4"
                  onClick={() => navigate('/student/courses')}
                >
                  Continue as student
                </Button>
              </div>
            </Card>

            <Card variant="surface" padded className="p-6">
              <div className="flex flex-col gap-3">
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                  FOR YOUR CLASSROOM
                </p>
                <p className="font-display text-[20px] font-bold text-aktibo-navy whitespace-nowrap whitespace-normal">
                  I am an instructor
                </p>
                <p className="text-[12px] text-aktibo-muted leading-relaxed">
                  Create interactive lessons, manage your courses, and support your learners.
                </p>
                <Button
                  size="lg"
                  fullWidth
                  variant="primary"
                  className="mt-4"
                  onClick={() => navigate('/instructor/courses')}
                >
                  Continue as instructor
                </Button>
              </div>
            </Card>
          </div>

          {/* Account navigation */}
          <Button
            size="lg"
            fullWidth
            variant="ghost"
            className="mt-8"
            onClick={() => navigate('/login')}
          >
            Back to sign in
          </Button>

          <p className="mt-6 text-[11px] text-aktibo-muted text-center">
            Your choice opens the matching learning or teaching workspace.
          </p>
        </CardForm>
      </main>

    </div>
  )
}

/** Centered white card for auth pages. */
function CardForm({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-aktibo-surface flex flex-col gap-5 p-6 p-8 rounded-panel shadow-panel w-full max-w-[560px] max-w-[720px]">
      {children}
    </div>
  )
}

/** Form intro heading block inside an auth card. */
function CardFormIntro({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>
}
