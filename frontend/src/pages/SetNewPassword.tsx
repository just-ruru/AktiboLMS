import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";
import { SiteFooter } from "../components/ui/SiteFooter";
import { BackendRequestError, backend, type Profile } from "../lib/backendAdapter";

const MIN_PASSWORD_LENGTH = 8;
const SAMPLE_PASSWORD = "sample-password-2026";

const inputClass =
  "h-12 w-full rounded-[8px] border border-[#dfe5f0] bg-white px-3 font-display text-[12px] font-normal text-text-primary placeholder:text-text-secondary focus:border-aktif-navy focus:outline-none focus:ring-2 focus-visible:ring-2 focus-visible:ring-border-focus";

/**
 * New-password form for the recovery flow.
 *
 * The backend has no dedicated password-reset endpoint: it replaces the whole
 * student record through `PUT /api/students/{id}`, which needs a signed-in
 * profile. When no profile is available the form reports that recovery is not
 * connected and sends nothing.
 */
export function SetNewPassword() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isConnected = profile !== undefined && profile !== null;

  useEffect(() => {
    let active = true;
    backend.getProfile().then((loaded) => {
      if (active) setProfile(loaded);
    });
    return () => {
      active = false;
    };
  }, []);

  function fillSampleDetails() {
    setPassword(SAMPLE_PASSWORD);
    setConfirmation(SAMPLE_PASSWORD);
    setStatus("TEST-ONLY sample password filled. It is not a real credential.");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");

    if (!password || !confirmation) {
      setStatus("Enter a new password and confirm it.");
      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setStatus(`Use at least ${MIN_PASSWORD_LENGTH} characters for your new password.`);
      return;
    }
    if (password !== confirmation) {
      setStatus("The two passwords do not match.");
      return;
    }
    if (!profile) {
      setStatus("Password recovery is not connected yet, so no password was changed.");
      return;
    }

    setIsSubmitting(true);
    try {
      await backend.changePassword(profile, password);
      navigate("/reset-password/updated", { state: { real: false } });
    } catch (error) {
      setStatus(
        error instanceof BackendRequestError
          ? error.message
          : "We couldn’t update your password. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-aktif-navy animate-page-fade">
      <Navbar activePath="/login" />

      <main className="flex flex-1 items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          aria-labelledby="set-password-title"
          className="flex min-h-[700px] w-full max-w-[620px] animate-fade-in-up flex-col gap-4 rounded-[24px] bg-surface-white p-6 sm:p-8"
        >
          <header className="flex h-[100px] flex-col gap-2">
            <h1 id="set-password-title" className="font-['Castoro_Titling'] text-[32px] leading-[1.5] text-aktif-navy">
              Set a new password
            </h1>
            <p className="font-display text-[12px] text-text-secondary">
              Choose a new password to regain access to your account.
            </p>
          </header>

          <div className="flex h-[160px] flex-col gap-3">
            <label className="flex flex-col gap-2 font-display text-[12px] font-bold leading-[1.5] text-[#15203a]" htmlFor="new-password">
              New password <span aria-hidden="true">*</span>
              <input
                id="new-password"
                name="password"
                type={showPasswords ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setStatus("");
                }}
                placeholder="New password"
                className={inputClass}
              />
            </label>

            <label className="flex flex-col gap-2 font-display text-[12px] font-bold leading-[1.5] text-[#15203a]" htmlFor="confirm-password">
              Confirm new password <span aria-hidden="true">*</span>
              <input
                id="confirm-password"
                name="confirmation"
                type={showPasswords ? "text" : "password"}
                autoComplete="new-password"
                value={confirmation}
                onChange={(event) => {
                  setConfirmation(event.target.value);
                  setStatus("");
                }}
                placeholder="Repeat new password"
                className={inputClass}
              />
            </label>
          </div>

          <div className="flex h-11 gap-4">
            <button
              type="button"
              onClick={fillSampleDetails}
              disabled={!isConnected}
              className="flex h-11 flex-1 items-center justify-center rounded-[9px] border border-[#dfe5f0] bg-surface-white px-[10px] font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors duration-200 hover:border-aktif-navy hover:bg-surface-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-[#dfe5f0] disabled:hover:bg-surface-white"
            >
              USE SAMPLE DETAILS
            </button>
            <button
              type="button"
              onClick={() => setShowPasswords((visible) => !visible)}
              aria-pressed={showPasswords}
              className="flex h-11 flex-1 items-center justify-center rounded-[9px] border border-[#dfe5f0] bg-surface-white px-[10px] font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors duration-200 hover:border-aktif-navy hover:bg-surface-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              SHOW / HIDE PASSWORDS
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || profile === undefined}
            className="flex h-11 items-center justify-center rounded-[9px] border border-aktif-navy bg-aktif-gold px-[10px] font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors duration-200 hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? "UPDATING PASSWORD…" : "RESET PASSWORD"}
          </button>

          <p role="status" aria-live="polite" className="min-h-[18px] font-display text-[11px] leading-[1.5] text-text-secondary">
            {status}
          </p>

          <Link
            to="/forgot-password"
            className="flex h-11 items-center justify-center rounded-[9px] border border-[#dfe5f0] bg-surface-white px-[10px] font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors duration-200 hover:border-aktif-navy hover:bg-surface-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            BACK TO RECOVERY
          </Link>

          <div className="flex min-h-[76px] flex-col justify-center rounded-lg bg-[#fff4cd] p-[14px]">
            <p className="font-display text-[11px] leading-[1.5] text-text-secondary">
              {isConnected
                ? "Use at least 8 characters. Sample values let you try matching and missing-password states."
                : "Password recovery is not connected yet, so no password can be changed. This form previews the flow only."}
            </p>
          </div>

          <Link
            to="/help"
            className="block text-center font-display text-[11px] font-bold text-aktif-navy underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            Need help? Visit Help & support
          </Link>
        </form>
      </main>

      <SiteFooter />
    </div>
  );
}
