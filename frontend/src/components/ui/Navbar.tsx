import { Link, NavLink, useLocation } from "react-router-dom";
import type { HTMLAttributes } from "react";
import { useState } from "react";

interface NavbarProps extends HTMLAttributes<HTMLDivElement> {}

const NAV_LINKS = [
  { to: "/", label: "HOME" },
  { to: "/courses", label: "COURSES" },
  { to: "/pricing", label: "PRICING" },
];

const ACCOUNT_LINKS = [
  { to: "/login", label: "LOG IN" },
  { to: "/register", label: "REGISTER" },
];

export function Navbar({ className = "", ...props }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname === to;
  };

  return (
    <nav
      className={[
        "flex gap-[10px] h-[80px] items-center justify-between overflow-clip px-[72px] relative shrink-0 bg-[#000e53] w-[1440px] sticky top-0 z-[50]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {/* Logo + Brand */}
      <div className="content-stretch flex gap-[12px] h-[56px] items-center overflow-clip relative shrink-0 w-[256px]">
        <div className="relative shrink-0 size-[52px]">
          <img
            src="/assets/aktibo-symbol.png"
            alt="AKTIBO symbol"
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          />
        </div>
        <p className="font-display font-normal leading-[normal] relative shrink-0 text-[20px] text-white whitespace-nowrap">
          AKTIBO LMS
        </p>
      </div>

      {/* Desktop Primary navigation */}
      <div
        className={[
          "content-stretch flex gap-[16px] h-[48px] items-center overflow-clip relative shrink-0 w-[400px] hidden md:flex",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {NAV_LINKS.map((link) => {
          const active = isActive(link.to);
          const isLink = link.to === "/";
          return (
            <div
              key={link.label}
              className={[
                "content-stretch flex h-[48px] items-center justify-center overflow-clip relative rounded-[9px] shrink-0 transition-all duration-300 ease-out hover:scale-[1.02]",
                link.label === "HOME" ? "w-[96px]" : link.label === "COURSES" ? "w-[144px]" : "w-[128px]",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {isLink ? (
                <NavLink
                  to={link.to}
                  end
                  className={({ isActive: navActive }) => [
                    "font-display font-normal leading-[24px] relative shrink-0 text-[16px] whitespace-nowrap transition-colors duration-200",
                    navActive ? "text-[#ffb700]" : "text-white",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {link.label}
                </NavLink>
              ) : (
                <p
                  className={[
                    "font-display font-normal leading-[24px] relative shrink-0 text-[16px] whitespace-nowrap transition-colors duration-200",
                    active ? "text-[#ffb700]" : "text-white",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {link.label}
                </p>
              )}
              {active && link.label === "HOME" && (
                <div className="absolute bg-[#ffb700] h-[3px] left-[16px] top-[45px] w-[64px] transition-all duration-300 ease-out" />
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop Account actions */}
      <div
        className={[
          "content-stretch flex gap-[16px] h-[48px] items-center overflow-clip relative shrink-0 w-[336px] hidden md:flex",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {ACCOUNT_LINKS.map((link) => {
          const active = isActive(link.to);
          if (link.label === "LOG IN") {
            return (
              <NavLink
                key={link.label}
                to={link.to}
                className="content-stretch flex h-[48px] items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[160px] transition-all duration-300 ease-out hover:scale-[1.02]"
              >
                <p
                  className={[
                    "font-display font-normal leading-[24px] relative shrink-0 text-[16px] whitespace-nowrap transition-colors duration-200",
                    active ? "text-[#ffb700]" : "text-white",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {link.label}
                </p>
                {active && (
                  <div className="absolute bg-[#ffb700] h-[3px] left-[16px] top-[45px] w-[128px] transition-all duration-300 ease-out" />
                )}
              </NavLink>
            );
          }
          return (
            <Link
              key={link.label}
              to={link.to}
              className={[
                "bg-[#ffb700] border border-black border-solid content-stretch flex h-[48px] items-center justify-center overflow-clip relative rounded-[9px] shrink-0 w-[160px] transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-[0_8px_16px_rgba(255,183,0,0.35)]",
                className,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <p className="font-display font-bold leading-[24px] relative shrink-0 text-[16px] text-black whitespace-nowrap">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Header divider */}
      <div className="absolute bg-[#304074] h-px left-[72px] top-[77px] w-[1296px]" />

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white hover:text-[#ffb700] transition-colors duration-200 p-2 rounded-[9px] focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Nav Links (slide-down menu) */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#000e53] flex flex-col gap-[16px] items-center justify-center px-[72px] py-[48px] text-[16px] text-white border-t border-[#304074] animate-slide-down">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-[#ffb700] transition-colors duration-200 whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
          {ACCOUNT_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-[#ffb700] transition-colors duration-200 whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
