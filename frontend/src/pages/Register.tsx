import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'
import { Footer } from '../components/ui/Footer'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

/**
 * Register — navy bg, shared pre-signup Navbar, centered white registration form,
 * shared Footer. Responsive at 320/375/390/768/1024/1440.
 */
export function Register() {
  const navigate = useNavigate()

  return (
    <div className="bg-aktibo-navy min-h-screen flex flex-col relative animate-page-fade">
      {/* Navigation — shared pre-signup Navbar */}
      <Navbar signedIn={false} />

      {/* Account form workspace */}
      <main className="flex-1 flex items-center justify-center px-[72px] pt-6 pb-8">
        <CardForm>
          <CardFormIntro>
            <p className="font-display text-[32px] font-bold leading-tight text-aktibo-navy whitespace-nowrap whitespace-normal">
              Create your account
            </p>
            <p className="mt-2 text-[12px] text-aktibo-muted">
              Start with your details, then verify your email and choose your role.
            </p>
          </CardFormIntro>

          {/* Registration fields */}
          <div className="mt-6 flex flex-col gap-4">
            <div className="grid gap-4 grid-cols-2">
              <Input label="First name *" placeholder="First name" inputSize="md" />
              <Input label="Last name *" placeholder="Last name" inputSize="md" />
            </div>
            <div className="grid gap-4 grid-cols-2">
              <Input
                label="Email *"
                placeholder="name@example.com"
                type="email"
                inputSize="md"
              />
              <Input label="Course *" placeholder="Select a course" inputSize="md" />
            </div>
            <div className="grid gap-4 grid-cols-2">
              <Input
                label="Password *"
                placeholder="Create password"
                type="password"
                inputSize="md"
              />
              <Input
                label="Re-enter password *"
                placeholder="Repeat password"
                type="password"
                inputSize="md"
              />
            </div>
            <Input label="Phone number" placeholder="Optional" inputSize="md" />
          </div>

          {/* Registration actions */}
          <div className="mt-6 flex flex-col flex-row gap-3">
            <Button size="lg" fullWidth variant="ghost" onClick={() => {}}>
              Use sample details
            </Button>
            <Button size="lg" fullWidth variant="ghost" onClick={() => {}}>
              Show / hide passwords
            </Button>
            <Button
              size="lg"
              fullWidth
              variant="primary"
              onClick={() => navigate('/account-profile')}
            >
              Create account
            </Button>
          </div>

          {/* Form secondary links */}
          <div className="mt-6 flex gap-4 justify-center">
            <Link to="/login" className="text-[12px] font-medium text-aktibo-navy underline underline-offset-4">
              Already have an account? Sign in
            </Link>
            <Link to="/forgot-password" className="text-[12px] font-medium text-aktibo-navy underline underline-offset-4">
              Forgot password?
            </Link>
          </div>

          {/* Prototype form guidance */}
          <div className="mt-6 p-4 rounded-control bg-aktibo-warning-bg border border-aktibo-warning-fg/30">
            <p className="text-[11px] text-aktibo-warning-fg">
              Prototype preview: use sample details or click each field. Choose your course from the selector. Registration and verification are simulated.
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

      {/* Footer */}
      <Footer signedIn={false} />
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
