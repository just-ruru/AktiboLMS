import { Link } from "react-router-dom";

interface SiteFooterProps {
  /** Label and destination of the last footer item. Signed-out pages link to Log in. */
  accountLabel?: string;
  accountPath?: string;
}

export function SiteFooter({ accountLabel = "Log in", accountPath = "/login" }: SiteFooterProps) {
  const links = [
    { label: "Home", to: "/" },
    { label: "Courses", to: "/courses" },
    { label: "Pricing", to: "/pricing" },
    { label: accountLabel, to: accountPath },
  ];

  return (
    <footer className="box-border min-h-[128px] w-full shrink-0 bg-aktif-navy px-6 pb-[19px] pt-0 text-text-inverse md:h-[128px] md:px-[72px]">
      <div className="mx-auto max-w-page border-t border-border-divider pt-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center gap-3 font-display text-[18px]">
            <img src="/assets/aktibo-symbol.png" alt="" className="size-10 object-contain" />
            <span>AKTIBO LMS</span>
          </Link>
          <nav aria-label="Footer" className="flex flex-wrap gap-2">
            {links.map(({ label, to }) => (
              <Link key={to} to={to} className="rounded-lg px-4 py-3 font-['Inter'] text-[14px] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus">
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-3 flex flex-col justify-between gap-2 font-['Inter'] text-[14px] text-text-muted sm:flex-row">
          <p>A more focused way to learn.</p>
          <p>Learning, with focus.</p>
        </div>
      </div>
    </footer>
  );
}
