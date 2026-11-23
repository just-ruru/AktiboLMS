/* ============================================================================
   STUDY NOTES — pages/auth/Register.tsx  (sign-up page)
   ----------------------------------------------------------------------------
   WHAT: Registration form. Public route (/register). Collects full name,
         email, password, confirm password, and role (student/instructor).
   HOW IT WORKS:
     1. Controlled form via handleChange (single handler for all fields using
        e.target.name).
     2. Client validation: passwords match, password ≥ 8 chars.
     3. Calls useAuth().register(data) → POST /auth/register with
        { email, password, fullName, role }.
     4. On success: role-based redirect (instructor → /instructor, student →
        /dashboard).
     5. Error extraction uses a complex ternary (QA LOW finding — simplify
       with optional chaining when you touch this file).
   WHERE THE API CONTRACT LIVES: POST /auth/register (backend AuthController),
     response shape = AuthResponse { accessToken, refreshToken, user }.
   WHAT TO CHANGE FOR THE NEW UI:
     • Keep the logic; restyle to the new design system (centered card,
       segmented role control instead of a plain <select>, inline validation).
     • QA LOW: replace the err.message extraction ternary with:
         const message = err.response?.data?.message ?? 'Registration failed. Please try again.'
   ============================================================================ */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Card, CardBody, CardHeader } from '../../components/ui/Card'
import { BookOpen, AlertCircle } from 'lucide-react'

export function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: 'student' as 'student' | 'instructor',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    try {
      const user = await register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        role: formData.role,
      })
      // Redirect based on registered role
      if (user?.role === 'instructor') {
        navigate('/instructor')
      } else {
        navigate('/dashboard')
      }
    } catch (err: any) {
      const data = err.response?.data
      const message = (data?.message
        ?? (data != null && typeof data === 'object' && !Array.isArray(data)
          ? Object.values(data).filter(Boolean).join(' ')
          : null))
        || 'Registration failed. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center page-container px-4 py-12">
      <Card variant="elevated" className="w-full max-w-md">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 w-12 h-12 gradient-brand rounded-lg flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-fg-primary">Create an account</h1>
          <p className="text-fg-secondary mt-1">Join AktiboLMS and start learning</p>
        </CardHeader>
        <CardBody className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg animate-slide-down bg-error-50 border border-error-500/20 text-error-600 dark:bg-error-500/10 dark:border-error-500/30 dark:text-error-400 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Input
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              hint="At least 8 characters"
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            <div className="input-wrapper">
              <label className="label">I am a</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input appearance-none"
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>

            <Button type="submit" className="w-full" size="md" loading={loading}>
              Create account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-fg-tertiary">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-brand-600 dark:text-brand-400 hover:underline">
              Sign in
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  )
}