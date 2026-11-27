import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import type { HTMLAttributes } from "react";

interface NavbarProps extends HTMLAttributes<HTMLElement> {
  accountName?: string;
  /** Route treated as the current page when it differs from the browser location (e.g. a sign-in flow step). */
  activePath?: string;
  /** Destination of the "MY ACCOUNT" item when a signed-in user box is shown. */
  accountPath?: string;
  /** Style of the active marker under a primary navigation item. */
  navIndicator?: "bar" | "full";
}

const NAV_LINKS = [
  { to: "/", label: "HOME", width: "w-[96px]" },
  { to: "/courses", label: "COURSES", width: "w-[144px]" },
  { to: "/pricing", label: "PRICING", width: "w-[128px]" },
];

export function Navbar({ className = "", accountName, activePath, accountPath = "/account-profile", navIndicator = "bar", ...props }: NavbarProps) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath = activePath ?? location.pathname;
  const active = (to: string) => to === "/" ? currentPath === "/" : currentPath === to;

  return (
    <header {...props} className={`relative z-10 w-full bg-aktif-navy ${className}`}>
      <nav aria-label="Main navigation" className="mx-auto flex h-[104px] w-full max-w-page items-center justify-between gap-4 px-6 md:px-[72px]">
        <Link to="/" className="flex h-14 w-[224px] shrink-0 items-center gap-3 sm:w-[256px]">
          <img src="/assets/aktibo-symbol.png" alt="" className="size-[52px] object-contain" />
          <span className="whitespace-nowrap font-display text-[20px] text-text-inverse">AKTIBO LMS</span>
        </Link>
        <div className="hidden h-12 items-center gap-4 xl:flex">
          {NAV_LINKS.map(({ to, label, width }) => (
            <NavLink key={to} to={to} end={to === "/"} className={`${width} relative flex h-12 items-center justify-center rounded-[9px] font-display text-[16px] ${active(to) ? "text-aktif-gold" : "text-text-inverse"}`}>
              {label}{active(to) && (navIndicator === "full"
                ? <span className="absolute bottom-0 left-0 h-[2px] w-full bg-aktif-gold" />
                : <span className="absolute bottom-[3px] left-4 h-[3px] w-16 bg-aktif-gold" />)}
            </NavLink>
          ))}
        </div>
        <div className="hidden items-center gap-4 xl:flex">
          {accountName ? <>
            <Link
              to={accountPath}
              aria-current={active(accountPath) ? "page" : undefined}
              className={`relative flex h-12 w-40 items-center justify-center rounded-[9px] font-display text-[16px] ${active(accountPath) ? "text-aktif-gold" : "text-text-inverse"}`}
            >
              MY ACCOUNT{active(accountPath) && <span className="absolute bottom-0 left-0 h-[2px] w-full bg-aktif-gold" />}
            </Link>
            <span className="flex h-12 w-40 items-center justify-center truncate rounded-[9px] border border-white/40 px-3 font-display text-[12px] uppercase text-text-inverse">{accountName}</span>
          </> : <>
            <NavLink to="/login" className={({ isActive }) => `relative flex h-12 w-40 items-center justify-center rounded-[9px] font-display text-[16px] ${isActive ? "text-aktif-gold" : "text-text-inverse"}`}>LOG IN{active("/login") && <span className="absolute bottom-[3px] left-4 h-[3px] w-32 bg-aktif-gold" />}</NavLink>
            <Link to="/register" className="flex h-12 w-40 items-center justify-center rounded-[9px] border border-black bg-aktif-gold font-display text-[16px] font-bold text-black">REGISTER</Link>
          </>}
        </div>
        <button type="button" aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen((open) => !open)} className="rounded p-2 text-text-inverse focus-visible:ring-2 focus-visible:ring-border-focus xl:hidden">{menuOpen ? "×" : "☰"}</button>
      </nav>
      <div className="absolute bottom-0 left-1/2 hidden h-px w-[calc(100%-48px)] max-w-[1296px] -translate-x-1/2 bg-border-divider xl:block" />
      {menuOpen && <nav aria-label="Mobile navigation" className="absolute inset-x-0 top-full flex flex-col gap-2 bg-aktif-navy p-4 shadow-lg xl:hidden">
        {[...NAV_LINKS, { to: "/login", label: "LOG IN", width: "" }, { to: "/register", label: "REGISTER", width: "" }].map(({ to, label }) => <Link key={to} onClick={() => setMenuOpen(false)} to={to} className="rounded px-4 py-3 font-display text-text-inverse hover:bg-white/10">{label}</Link>)}
      </nav>}
    </header>
  );
}
