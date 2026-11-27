import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";
import { SiteFooter } from "../components/ui/SiteFooter";

interface VerifyEmailState {
  email?: string;
}

/**
 * Email verification preview.
 *
 * The backend sends no email and has no verification endpoint, so the screen
 * reports the address it was given and explains that nothing was transmitted.
 */
export function VerifyEmail() {
  const location = useLocation();
  const state = (location.state ?? {}) as VerifyEmailState;
  const email = state.email?.trim() ?? "";
  const [status, setStatus] = useState("");

  function handleResend() {
    setStatus("No email is sent in this build — no verification service is connected. Use the demo verification link to continue.");
  }

  return (
    <div className="flex min-h-screen flex-col bg-aktif-navy animate-page-fade">
      <Navbar activePath="/login" />

      <main className="flex flex-1 items-center justify-center px-4">
        <section
          aria-labelledby="verify-email-title"
          className="flex min-h-[600px] w-full max-w-[680px] animate-fade-in-up flex-col gap-4 rounded-[24px] bg-surface-white p-6 sm:p-8"
        >
          <p className="font-display text-[10px] font-bold leading-[1.5] text-text-secondary">ONE MORE STEP</p>

          <header className="flex h-[100px] flex-col gap-2">
            <h1 id="verify-email-title" className="font-['Castoro_Titling'] text-[32px] leading-[1.5] text-aktif-navy">
              Verify your email
            </h1>
            <p className="font-display text-[12px] text-text-secondary">
              A verification link would be sent to the address you registered with.
            </p>
          </header>

          <p className="font-display text-[14px] font-bold leading-[1.5] text-aktif-navy">
            {email || "No email address was given"}
          </p>

          <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
            Use the demo verification link below to continue.
          </p>

          <Link
            to="/choose-role"
            className="flex h-11 items-center justify-center rounded-[9px] border border-aktif-navy bg-aktif-gold px-[10px] font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors duration-200 hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            VERIFY EMAIL · DEMO
          </Link>

          <button
            type="button"
            onClick={handleResend}
            className="flex h-11 items-center justify-center rounded-[9px] border border-[#dfe5f0] bg-surface-white px-[10px] font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors duration-200 hover:border-aktif-navy hover:bg-surface-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            RESEND VERIFICATION LINK
          </button>

          {status && (
            <p role="status" aria-live="polite" className="font-display text-[11px] leading-[1.5] text-text-secondary">
              {status}
            </p>
          )}

          <Link
            to="/login"
            className="flex h-11 items-center justify-center rounded-[9px] border border-[#dfe5f0] bg-surface-white px-[10px] font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors duration-200 hover:border-aktif-navy hover:bg-surface-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            BACK TO SIGN IN
          </Link>

          <div className="flex min-h-[76px] flex-col justify-center rounded-lg bg-[#fff4cd] p-[14px]">
            <p className="font-display text-[11px] leading-[1.5] text-text-secondary">
              No email is sent. The demo link previews verification and takes you to role selection.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
