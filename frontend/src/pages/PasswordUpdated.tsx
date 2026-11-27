import { Link, useLocation } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";
import { SiteFooter } from "../components/ui/SiteFooter";

interface PasswordUpdatedState {
  /** True only when a real backend update confirmed the change. */
  real?: boolean;
}

/**
 * Confirmation state after a password change.
 *
 * The success copy is only reached through a confirmed update. The prototype
 * line keeps the screen honest about what the local fixture did.
 */
export function PasswordUpdated() {
  const location = useLocation();
  const state = (location.state ?? {}) as PasswordUpdatedState;
  const isRealUpdate = state.real === true;

  return (
    <div className="flex min-h-screen flex-col bg-aktif-navy animate-page-fade">
      <Navbar activePath="/login" />

      <main className="flex flex-1 items-center justify-center px-4">
        <section
          aria-labelledby="password-updated-title"
          className="flex min-h-[480px] w-full max-w-[680px] animate-fade-in-up flex-col gap-4 rounded-[24px] bg-surface-white p-6 sm:p-8"
        >
          <p className="font-display text-[10px] font-bold leading-[1.5] text-[#236543]">PASSWORD UPDATED</p>

          <header className="flex h-[100px] flex-col gap-2">
            <h1 id="password-updated-title" className="font-['Castoro_Titling'] text-[32px] leading-[1.5] text-aktif-navy">
              A fresh start
            </h1>
            <p className="font-display text-[12px] text-text-secondary">
              {isRealUpdate
                ? "Your password has been updated."
                : "Your password has been updated in this prototype flow."}
            </p>
          </header>

          <div className="flex min-h-[90px] flex-col justify-center rounded-lg bg-[#e8f4ef] p-5">
            <p className="font-display text-[13px] leading-[1.5] text-[#236543]">
              {isRealUpdate
                ? "Sign in with your new password to continue to your workspace."
                : "Return to sign-in and use the sample details to continue to your workspace."}
            </p>
          </div>

          <Link
            to="/login"
            className="flex h-11 items-center justify-center rounded-[9px] border border-aktif-navy bg-aktif-gold px-[10px] font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors duration-200 hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            BACK TO SIGN IN
          </Link>

          <p className="font-display text-[11px] leading-[1.5] text-text-secondary">
            {isRealUpdate
              ? "Your new password is active on this account."
              : "Prototype only · No real password has been changed."}
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
