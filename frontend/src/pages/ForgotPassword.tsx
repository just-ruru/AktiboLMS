import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Navbar } from "../components/ui/Navbar"
import { SiteFooter } from "../components/ui/SiteFooter"

const SAMPLE_EMAIL = "student@example.invalid"
const PROTOTYPE_NOTICE = "If an account exists, a reset link would be sent. No email is sent in this prototype."

export function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [notice, setNotice] = useState(PROTOTYPE_NOTICE)
  const [noticeIsLive, setNoticeIsLive] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // The backend has no reset-request endpoint, so nothing is transmitted.
    // The confirmation screen states that plainly.
    navigate("/forgot-password/sent", { state: { email: email.trim() } })
  }

  function fillSampleEmail() {
    setEmail(SAMPLE_EMAIL)
    setNotice("TEST-ONLY sample address filled. It cannot receive email.")
    setNoticeIsLive(true)
  }

  function updateEmail(value: string) {
    setEmail(value)
    setNotice(PROTOTYPE_NOTICE)
    setNoticeIsLive(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-aktif-navy animate-page-fade">
      <Navbar className="mx-auto" />
      <main className="flex flex-1 items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          aria-labelledby="recovery-title"
          className="flex h-[560px] w-full max-w-[620px] flex-col gap-4 rounded-[24px] bg-surface-white p-6 text-text-primary sm:p-8"
        >
          <header className="flex h-[100px] flex-col gap-2">
            <h1 id="recovery-title" className="font-['Castoro_Titling'] text-[32px] leading-[1.5] text-aktif-navy">Forgot password?</h1>
            <p className="font-display text-[12px] text-text-secondary">Enter the email address associated with your account.</p>
          </header>

          <label className="block h-[74px] font-display text-[12px] font-bold text-[#15203a]" htmlFor="recovery-email">
            Email address <span aria-hidden="true">*</span>
            <input
              id="recovery-email"
              name="email"
              autoComplete="email"
              required
              type="email"
              value={email}
              onChange={(event) => updateEmail(event.target.value)}
              placeholder="name@example.com"
              className="mt-2 h-12 w-full rounded-lg border border-[#dfe5f0] bg-white px-3 font-display text-[12px] font-normal text-text-primary placeholder:text-text-secondary focus:border-aktif-navy focus:outline-none focus:ring-2 focus:ring-border-focus"
            />
          </label>

          <button
            type="button"
            onClick={fillSampleEmail}
            className="h-11 w-full rounded-[9px] border border-border-light bg-white font-display text-[11px] font-bold text-aktif-navy transition-colors hover:bg-surface-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            USE SAMPLE EMAIL
          </button>
          <button
            type="submit"
            className="h-11 w-full rounded-[9px] border border-aktif-navy bg-aktif-gold font-display text-[11px] font-bold text-aktif-navy transition-colors hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            SEND RESET LINK
          </button>

          <Link to="/login" className="flex h-7 items-center justify-center font-display text-[11px] font-bold text-text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus">Log in</Link>

          <p role={noticeIsLive ? "status" : undefined} aria-live={noticeIsLive ? "polite" : undefined} className="flex h-[72px] items-center rounded-lg bg-[#fff4cd] p-[14px] font-display text-[11px] text-text-secondary">
            {notice}
          </p>

          <Link to="/help" className="block text-center font-display text-[11px] font-bold text-aktif-navy underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus">Need help? Visit Help &amp; support</Link>
        </form>
      </main>
      <SiteFooter />
    </div>
  )
}
