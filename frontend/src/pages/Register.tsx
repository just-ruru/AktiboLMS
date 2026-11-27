import { useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { Navbar } from "../components/ui/Navbar"
import { SiteFooter } from "../components/ui/SiteFooter"
import { BackendRequestError, backend, type StudentRegistrationRequest } from "../lib/backendAdapter"

interface RegistrationForm extends Omit<StudentRegistrationRequest, "description"> {
  description: string
  confirmPassword: string
}

type RegistrationField = keyof RegistrationForm

const INITIAL_FORM: RegistrationForm = {
  studentId: "",
  firstName: "",
  lastName: "",
  email: "",
  description: "",
  password: "",
  confirmPassword: "",
}

const fieldClass = "mt-2 h-12 w-full rounded-[8px] border border-[#dfe5f0] bg-white px-3 font-display text-[12px] font-normal text-text-primary placeholder:text-text-secondary focus:border-aktif-navy focus:outline-none focus:ring-2 focus:ring-border-focus"
const labelClass = "block font-display text-[12px] font-bold leading-[18px] text-[#15203a]"

const fields: Array<{
  key: RegistrationField
  label: string
  placeholder: string
  type?: "text" | "email" | "password"
  required?: boolean
  maxLength: number
  minLength?: number
  autoComplete?: string
}> = [
  { key: "firstName", label: "First name *", placeholder: "First name", required: true, maxLength: 100, autoComplete: "given-name" },
  { key: "lastName", label: "Last name *", placeholder: "Last name", required: true, maxLength: 100, autoComplete: "family-name" },
  { key: "studentId", label: "Student ID *", placeholder: "Enter student ID", required: true, maxLength: 50, autoComplete: "off" },
  { key: "email", label: "Email *", placeholder: "name@example.com", type: "email", required: true, maxLength: 255, autoComplete: "email" },
  { key: "password", label: "Password *", placeholder: "Create password", type: "password", required: true, minLength: 6, maxLength: 255, autoComplete: "new-password" },
  { key: "confirmPassword", label: "Re-enter password *", placeholder: "Repeat password", type: "password", required: true, minLength: 6, maxLength: 255, autoComplete: "new-password" },
  { key: "description", label: "Description", placeholder: "Optional", maxLength: 1000 },
]

export function Register() {
  const [form, setForm] = useState<RegistrationForm>(INITIAL_FORM)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<RegistrationField, string>>>({})
  const [formError, setFormError] = useState("")
  const [status, setStatus] = useState("")
  const [registeredEmail, setRegisteredEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  function updateField(key: RegistrationField, value: string) {
    setForm((current) => ({ ...current, [key]: value }))
    setFieldErrors((current) => {
      if (!current[key]) return current
      const next = { ...current }
      delete next[key]
      return next
    })
    setFormError("")
    setStatus("")
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFieldErrors({})
    setFormError("")
    setStatus("")
    setRegisteredEmail("")

    if (form.password !== form.confirmPassword) {
      const message = "Passwords must match."
      setFieldErrors({ confirmPassword: message })
      setFormError(message)
      return
    }

    setIsSubmitting(true)
    const request: StudentRegistrationRequest = {
      studentId: form.studentId.trim(),
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      password: form.password,
      ...(form.description.trim() ? { description: form.description.trim() } : {}),
    }

    try {
      const created = await backend.registerStudent(request)
      // The address comes back from the service, so the verification preview
      // shows the registered account rather than the typed value.
      setRegisteredEmail(created.email?.trim() || request.email)
      setStatus("Student profile created. Sign-in and email verification are not available yet.")
      setForm(INITIAL_FORM)
    } catch (error) {
      if (error instanceof BackendRequestError) {
        setFieldErrors(error.fieldErrors as Partial<Record<RegistrationField, string>>)
        setFormError(Object.values(error.fieldErrors).filter(Boolean).join(" ") || error.message)
      } else {
        setFormError("We couldn’t create your student profile. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-aktif-navy animate-page-fade">
      <Navbar className="mx-auto" />
      <main className="flex flex-1 items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          aria-labelledby="register-title"
          className="flex min-h-[720px] w-full max-w-[1180px] flex-col gap-4 rounded-[24px] bg-surface-white p-6 text-text-primary sm:p-8"
        >
          <header className="flex min-h-[82px] flex-col gap-2">
            <h1 id="register-title" className="font-['Castoro_Titling'] text-[32px] leading-[1.5] text-aktif-navy">Create your account</h1>
            <p className="font-display text-[12px] text-text-secondary">Create your student profile with the details below.</p>
          </header>

          <div className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
            {fields.map(({ key, label, placeholder, type = "text", required, maxLength, minLength, autoComplete }) => {
              const errorId = `${key}-error`
              const value = form[key]
              return (
                <label key={key} className={labelClass} htmlFor={key}>
                  {label}
                  <input
                    id={key}
                    name={key}
                    className={`${fieldClass} ${fieldErrors[key] ? "border-state-danger focus:ring-state-danger" : ""}`}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    minLength={minLength}
                    maxLength={maxLength}
                    autoComplete={autoComplete}
                    value={value}
                    aria-invalid={Boolean(fieldErrors[key])}
                    aria-describedby={fieldErrors[key] ? errorId : undefined}
                    onChange={(event) => updateField(key, event.target.value)}
                  />
                  {fieldErrors[key] && <span id={errorId} className="mt-1 block font-display text-[11px] font-normal text-state-danger">{fieldErrors[key]}</span>}
                </label>
              )
            })}
          </div>

          <div className="flex h-11 items-center justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full max-w-[689px] rounded-[9px] border border-aktif-navy bg-aktif-gold px-3 font-display text-[11px] font-bold text-aktif-navy transition-colors hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:cursor-wait disabled:opacity-70"
            >
              {isSubmitting ? "CREATING ACCOUNT…" : "CREATE ACCOUNT"}
            </button>
          </div>

          {formError && <p role="alert" className="rounded-lg bg-red-50 p-3 font-display text-[12px] text-state-danger">{formError}</p>}
          {status && <p role="status" aria-live="polite" className="rounded-lg bg-[#fff4cd] p-3 font-display text-[12px] text-text-primary">{status}</p>}
          {registeredEmail && (
            <Link
              to="/verify-email"
              state={{ email: registeredEmail }}
              className="mx-auto flex h-11 w-full max-w-[689px] items-center justify-center rounded-[9px] border border-aktif-navy bg-aktif-gold px-3 font-display text-[11px] font-bold text-aktif-navy transition-colors hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              CONTINUE TO VERIFICATION PREVIEW
            </Link>
          )}

          <div className="grid grid-cols-2 gap-4 text-center font-display text-[11px] font-bold text-black">
            <Link to="/login" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus">Already have an account? Sign in</Link>
            <Link to="/forgot-password" className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus">Forgot Password?</Link>
          </div>
          <Link to="/help" className="block text-center font-display text-[11px] font-bold text-aktif-navy underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus">Need help? Visit Help &amp; support</Link>
        </form>
      </main>
      <SiteFooter />
    </div>
  )
}
