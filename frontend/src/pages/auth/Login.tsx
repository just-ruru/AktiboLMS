/* ============================================================================
   STUDY NOTES — pages/auth/Login.tsx  (sign-in page)
   ----------------------------------------------------------------------------
   WHAT: Email/password login form. Public route (/login).
   HOW IT WORKS:
     1. Controlled form (email, password) submitted via handleSubmit.
     2. Calls useAuth().login(email, password) → POST /auth/login.
     3. On success: tokens stored by useAuth, then role-based redirect —
        instructor → /instructor, student → /dashboard.
     4. Errors: err.response?.data?.message shown in an inline alert box.
     5. loading state disables the button and shows a spinner (Button loading
       prop).
   WHERE THE API CONTRACT LIVES: POST /auth/login (backend AuthController),
     response shape = AuthResponse { accessToken, refreshToken, user }.
   WHAT TO CHANGE FOR THE NEW UI:
     • Keep the logic (login + role redirect). Replace the Card-based styling
       with the new design system (see UI-UX-CONCEPT.md §4-B: centered card,
       inline validation, visibility toggle for password).
     • The new landing page links here; consider adding a "Sign up" → /register
       link (already present) and keeping the form accessible (labels,
       aria-invalid).
   ============================================================================ */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card, CardBody, CardHeader } from '../../components/ui/Card'
import { BookOpen, AlertCircle, Mail, Eye, EyeOff, UserPlus } from 'lucide-react'

export function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await login(email, password)
      // Redirect based on user role
      if (user?.role === 'instructor') {
        navigate('/instructor')
      } else {
        navigate('/dashboard')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center page-container px-4">
      <Card variant="elevated" className="w-full max-w-md">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 w-12 h-12 gradient-brand rounded-lg flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-fg-primary">Welcome back</h1>
          <p className="text-fg-secondary mt-1">Sign in to your AktiboLMS account</p>
        </CardHeader>
        <CardBody className="space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg animate-slide-down bg-error-50 border border-error-500/20 text-error-600 dark:bg-error-500/10 dark:border-error-500/30 dark:text-error-400 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              icon={<Mail className="w-5 h-5" />}
              autoComplete="email"
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-fg-tertiary hover:text-fg-primary"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <Button type="submit" className="w-full" size="md" loading={loading}>
              Sign in
            </Button>
          </form>

          <div className="mt-6 space-y-3 pt-6 border-t border-border-primary">
            <Link to="/register">
              <Button variant="outline" className="w-full" icon={<UserPlus className="w-4 h-4 mr-2" />}>
                Create an account
              </Button>
            </Link>
            <p className="text-center text-sm text-fg-tertiary">
              Don't have an account? Sign up to get started
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}