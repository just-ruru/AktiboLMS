import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import type { HTMLAttributes } from "react";

interface NavbarProps extends HTMLAttributes<HTMLElement> {
  signedIn?: boolean;
  userName?: string;
}

const PRE_SIGNUP_LINKS = [
  { to: "/", label: "HOME", end: true },
  { to: "/student/courses", label: "COURSES" },
  { to: "/pricing", label: "PRICING" },
];

const PRE_SIGNUP_ACTIONS = [
  { to: "/login", label: "LOG IN", end: true },
  { to: "/register", label: "REGISTER" },
];

const POST_SIGNUP_LINKS = [
  { to: "/", label: "HOME", end: true },
  { to: "/student/courses", label: "COURSES" },
  { to: "/pricing", label: "PRICING" },
];

const POST_SIGNUP_ACTIONS = [
  { to: "/account-profile", label: "MY ACCOUNT", end: true },
  { to: "/account/confirm-logout", label: "LOGOUT", end: true },
];

const COURSES_PATHS = ["/student/courses", "/instructor/courses"];

const isLinkActive = (to: string, pathname: string) => {
  if (to === "/") return pathname === "/";
  if (to === "/student/courses") return COURSES_PATHS.includes(pathname);
  return pathname === to;
};

export function Navbar({
  className = "",
  signedIn = false,
  userName = "Hoshimi Miyabi",
  ...props
}: NavbarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const links = signedIn ? POST_SIGNUP_LINKS : PRE_SIGNUP_LINKS;
  const actions = signedIn ? POST_SIGNUP_ACTIONS : PRE_SIGNUP_ACTIONS;

  const handleActionClick = (to: string, label: string) => {
    if (label === "LOGOUT") {
      navigate(to);
    } else if (label === "REGISTER") {
      (window as unknown as { location: Location }).location.href = to;
    } else {
      navigate(to);
    }
  };

  return (
    <nav
      className={`bg-aktibo-navy sticky top-0 z-[50] border-b border-aktibo-border-strong ${className}`}
      aria-label="Main navigation"
      {...props}
    >
      <div className="mx-auto w-full max-w-[1296px] px-[72px]">
        <div className="flex flex-nowrap items-center justify-between gap-3 py-[20px] relative">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="Aktibo LMS home"
          >
            <img
              src="/assets/aktibo-symbol.png"
              alt=""
              className="size-[56px] object-contain"
            />
            <span className="font-display font-semibold text-[24px] text-white whitespace-nowrap">
              AKTIBO LMS
            </span>
          </Link>

          {/* Desktop links */}
          <div className="flex items-center gap-4">
            {links.map(({ to, label }) => {
              return (
                <NavLink
                  key={to}
                  to={to}
                  end={label === "HOME"}
                  className={({ isActive }) => `
                    flex items-center justify-center rounded-control px-4 py-2 text-[18px] font-display font-medium whitespace-nowrap transition-colors
                    border border-transparent
                    ${isActive ? "bg-aktibo-gold text-aktibo-ink border-aktibo-navy" : "text-aktibo-white hover:text-aktibo-gold hover:bg-aktibo-navy/20"}
                  `}
                >
                  {label}
                </NavLink>
              );
            })}
          </div>

          {/* Desktop actions */}
          <div className="flex items-center gap-2">
            {actions.map(({ to, label }) => {
              const active = isLinkActive(to, location.pathname);
              const isRegister = label === "REGISTER";
              return (
                <button
                  key={to}
                  type="button"
                  onClick={() => handleActionClick(to, label)}
                  className={`
                    flex items-center justify-center rounded-control px-4 py-2 text-[18px] font-display font-medium whitespace-nowrap transition-colors border
                    ${
                      isRegister
                        ? "bg-aktibo-gold text-aktibo-ink border-aktibo-navy hover:bg-aktibo-gold-hover"
                        : active
                          ? "bg-aktibo-gold text-aktibo-ink border-aktibo-navy"
                          : "text-aktibo-white border-transparent hover:text-aktibo-gold hover:bg-aktibo-navy/20"
                    }
                  `}
                >
                  {label}
                </button>
              );
            })}
            {signedIn && (
              <div className="flex items-center justify-center rounded-control px-4 py-2 text-[18px] font-display font-medium whitespace-nowrap border border-aktibo-white/30 text-aktibo-muted-on-navy">
                {userName}
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
