import { Link, useNavigate } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'
import { Footer } from '../components/ui/Footer'
import { Button } from '../components/ui/Button'

/**
 * Not found — shared pre-signup Navbar, centered white panel with a large "404",
 * "Page not found" heading, description, Back to Home + Create an account actions,
 * shared Footer. Responsive at 320/375/390/768/1024/1440.
 */
export function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="bg-aktibo-navy min-h-screen flex flex-col relative animate-page-fade">
      {/* Navigation — shared pre-signup Navbar */}
      <Navbar signedIn={false} />

      {/* Not found panel */}
      <main className="flex-1 flex items-center justify-center px-[72px] pt-6 pb-8">
        <CardForm>
          <p className="font-display text-[96px] font-bold text-aktibo-gold whitespace-nowrap">
            404
          </p>
          <p className="mt-2 font-display text-[32px] font-bold text-aktibo-navy whitespace-nowrap whitespace-normal">
            Page not found
          </p>
          <p className="mt-3 text-[15px] text-aktibo-muted text-center max-w-[320px]">
            The page you're looking for doesn't exist yet.
          </p>

          <div className="mt-8 flex flex-col flex-row gap-3 justify-center">
            <Button
              size="lg"
              variant="primary"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
            <Link to="/register">
              <Button size="lg" variant="ghost">
                Create an account
              </Button>
            </Link>
          </div>
        </CardForm>
      </main>

      {/* Footer */}
      <Footer signedIn={false} />
    </div>
  )
}

/** Centered white card for auth/utility pages. */
function CardForm({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-aktibo-surface flex flex-col gap-5 p-8 p-[48px] rounded-panel shadow-panel w-full max-w-[480px] text-center">
      {children}
    </div>
  )
}
