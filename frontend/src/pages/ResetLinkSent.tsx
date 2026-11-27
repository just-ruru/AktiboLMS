import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";
import { SiteFooter } from "../components/ui/SiteFooter";

interface ResetLinkSentState {
  email?: string;
}

/**
 * Confirmation state for a password recovery request.
 *
 * The backend exposes no password-reset request endpoint, so no email is
 * transmitted. The screen says so plainly and only reports the address the
 * visitor typed. The demo reset link continues the flow without pretending a
 * message was sent.
 */
export function ResetLinkSent() {
  const location = useLocation();
  const state = (location.state ?? {}) as ResetLinkSentState;
  const email = state.email?.trim() ?? "";
  const [status, setStatus] = useState("");

  function handleResend() {
    setStatus("No email is sent in this build — no reset service is connected. Use the demo reset link to continue.");
  }

  return (
    <div className="flex min-h-screen flex-col bg-aktif-navy animate-page-fade">
      <Navbar activePath="/login" />

      <main className="flex flex-1 items-center justify-center px-4">
        <section
          aria-labelledby="reset-sent-title"
          className="flex min-h-[620px] w-full max-w-[680px] animate-fade-in-up flex-col gap-4 rounded-[24px] bg-surface-white p-6 sm:p-8"
        >
          <header className="flex h-[100px] flex-col gap-2">
            <h1 id="reset-sent-title" className="font-['Castoro_Titling'] text-[32px] leading-[1.5] text-aktif-navy">
              Check your email
            </h1>
            <p className="font-display text-[12px] text-text-secondary">
              If an account exists for this address, a password reset link would be sent.
            </p>
          </header>

          <p className="font-display text-[14px] font-bold leading-[1.5] text-aktif-navy">
            {email || "No email address was given"}
          </p>

          <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
            This build does not send email. Use the demo reset link below.
          </p>

          <Link
            to="/reset-password"
            className="flex h-11 items-center justify-center rounded-[9px] border border-aktif-navy bg-aktif-gold px-[10px] font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors duration-200 hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            OPEN DEMO RESET LINK
          </Link>

          <button
            type="button"
            onClick={handleResend}
            className="flex h-11 items-center justify-center rounded-[9px] border border-[#dfe5f0] bg-surface-white px-[10px] font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors duration-200 hover:border-aktif-navy hover:bg-surface-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            RESEND RESET LINK
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
            BACK TO LOG IN
          </Link>

          <div className="flex min-h-[72px] flex-col justify-center rounded-lg bg-[#fff4cd] p-[14px]">
            <p className="font-display text-[11px] leading-[1.5] text-text-secondary">
              No email is sent. The demo reset link lets you explore the next step without opening an inbox.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
