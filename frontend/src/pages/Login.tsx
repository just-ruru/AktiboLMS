import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'
import { Footer } from '../components/ui/Footer'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

/**
 * Login — navy bg, shared pre-signup Navbar, centered white sign-in form,
 * shared Footer. Responsive at 320/375/390/768/1024/1440.
 */
export function Login() {
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
              Welcome back
            </p>
            <p className="mt-2 text-[12px] text-aktibo-muted">
              Sign in to return to your learning or teaching workspace.
            </p>
          </CardFormIntro>

          {/* Sign-in fields */}
          <div className="mt-6 flex flex-col gap-4">
            <Input
              label="Username or email *"
              placeholder="Enter username or email"
              inputSize="md"
            />
            <Input
              label="Password *"
              placeholder="Enter password"
              type="password"
              inputSize="md"
            />
          </div>

          {/* Sign-in preview controls */}
          <div className="mt-6 flex gap-3">
            <Button size="lg" variant="ghost" onClick={() => {}}>
              Use sample details
            </Button>
            <Button size="lg" variant="ghost" onClick={() => {}}>
              Show / hide passwords
            </Button>
          </div>

          {/* SIGN IN button */}
          <Button
            size="lg"
            fullWidth
            variant="primary"
            className="mt-4 w-auto"
            onClick={() => navigate('/account-profile')}
          >
            Sign in
          </Button>

          {/* Form secondary links */}
          <div className="mt-6 flex gap-4 justify-center">
            <Link to="/register" className="text-[12px] font-medium text-aktibo-navy underline underline-offset-4">
              Don’t have an account?
            </Link>
            <Link to="/forgot-password" className="text-[12px] font-medium text-aktibo-navy underline underline-offset-4">
              Forgot password
            </Link>
          </div>

          {/* Prototype form guidance */}
          <div className="mt-6 p-4 rounded-control bg-aktibo-warning-bg border border-aktibo-warning-fg/30">
            <p className="text-[11px] text-aktibo-warning-fg">
              Prototype preview: click a field to fill an example, or use sample details. No real sign-in occurs.
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
