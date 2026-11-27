import { Link } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";
import { SiteFooter } from "../components/ui/SiteFooter";

/**
 * Fallback for an unknown address. It keeps the site's shell so a mistyped
 * link still lands somewhere useful instead of a blank page.
 */
export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-aktif-navy animate-page-fade">
      <Navbar activePath="" />

      <main className="flex flex-1 items-center justify-center px-4">
        <section
          aria-labelledby="not-found-title"
          className="flex min-h-[480px] w-full max-w-[680px] animate-fade-in-up flex-col items-start gap-4 rounded-[24px] bg-surface-white p-6 sm:p-8"
        >
          <p className="font-display text-[10px] font-bold leading-[1.5] text-text-secondary">PAGE NOT FOUND</p>

          <header className="flex h-[100px] flex-col gap-2">
            <h1 id="not-found-title" className="font-['Castoro_Titling'] text-[32px] leading-[1.5] text-aktif-navy">
              This page is not here
            </h1>
            <p className="font-display text-[12px] text-text-secondary">
              The address you opened does not match a screen in AKTIBO LMS.
            </p>
          </header>

          <div className="flex min-h-[90px] flex-col justify-center rounded-lg bg-surface-light p-5">
            <p className="font-display text-[13px] leading-[1.5] text-text-secondary">
              Use the navigation above, or head back to the home page to pick a workspace.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/"
              className="flex h-11 flex-1 items-center justify-center rounded-[9px] border border-aktif-navy bg-aktif-gold px-[10px] font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors duration-200 hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              HOME
            </Link>
            <Link
              to="/help"
              className="flex h-11 flex-1 items-center justify-center rounded-[9px] border border-[#dfe5f0] bg-surface-white px-[10px] font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors duration-200 hover:border-aktif-navy hover:bg-surface-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              HELP & SUPPORT
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
