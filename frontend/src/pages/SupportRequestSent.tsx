import { Link, useLocation } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";
import { SiteFooter } from "../components/ui/SiteFooter";

interface SupportRequestState {
  email?: string;
}

/**
 * Confirmation state for a support request.
 *
 * The backend exposes no support endpoint, so nothing was transmitted. The
 * screen says so plainly and only reports the address the visitor typed.
 */
export function SupportRequestSent() {
  const location = useLocation();
  const state = (location.state ?? {}) as SupportRequestState;
  const email = state.email?.trim() ?? "";

  return (
    <div className="flex min-h-screen flex-col bg-aktif-navy animate-page-fade">
      <Navbar activePath="/login" />

      <main className="flex flex-1 items-center justify-center px-4">
        <section
          aria-labelledby="request-sent-title"
          className="flex w-full max-w-[680px] flex-col gap-4 rounded-[24px] bg-surface-white p-6 sm:p-8"
        >
          <p className="font-display text-[10px] font-bold text-[#236543]">REQUEST PREVIEW COMPLETE</p>

          <header className="flex flex-col gap-2">
            <h1 id="request-sent-title" className="font-['Castoro_Titling'] text-[32px] leading-[1.5] text-aktif-navy">
              Your request is ready
            </h1>
            <p className="font-display text-[12px] text-text-secondary">
              This is the preview state for your support request.
            </p>
          </header>

          <p className="font-display text-[13px] font-bold text-aktif-navy">{email || "No email address was given"}</p>

          <div className="flex min-h-[86px] flex-col gap-2 rounded-lg bg-surface-light p-4">
            <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
              {email
                ? "A copy of your request would be sent to this email address."
                : "Add an email address on the help screen so the request has somewhere to go."}
            </p>
            <p className="font-display text-[11px] leading-[1.5] text-text-secondary">
              Support submission is not connected yet, so no message has been sent.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/help"
              className="flex h-11 flex-1 items-center justify-center rounded-[9px] border border-aktif-navy bg-aktif-gold px-[10px] font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors duration-200 hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              BACK TO HELP
            </Link>
            <Link
              to="/"
              className="flex h-11 flex-1 items-center justify-center rounded-[9px] border border-[#dfe5f0] bg-surface-white px-[10px] font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors duration-200 hover:border-aktif-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              HOME
            </Link>
          </div>

          <p className="font-display text-[11px] text-text-secondary">
            You can return to Help & support to review another topic.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
