import { Link } from "react-router-dom";

export type AccountSection = "overview" | "edit" | "security" | "support";

interface AccountSidebarProps {
  /** Section the sidebar marks as the current one. */
  active: AccountSection;
  /** Short advisory shown at the bottom of the sidebar. */
  guidance?: { title: string; body: string };
}

const SECTIONS: { id: AccountSection; label: string; to: string }[] = [
  { id: "overview", label: "ACCOUNT OVERVIEW", to: "/account-profile" },
  { id: "edit", label: "EDIT PROFILE", to: "/account-profile/edit" },
  { id: "security", label: "PASSWORD & SECURITY", to: "/account/security" },
  { id: "support", label: "HELP & SUPPORT", to: "/help" },
];

export function AccountSidebar({ active, guidance }: AccountSidebarProps) {
  return (
    <aside className="flex w-full shrink-0 flex-col gap-4 rounded-lg border border-[#dfe5f0] bg-surface-white p-6 lg:h-[748px] lg:w-[288px]">
      <p className="font-display text-[10px] font-bold text-text-secondary">YOUR ACCOUNT</p>
      <h2 className="font-display text-[19px] font-bold text-aktif-navy">Make it yours</h2>

      <nav aria-label="Account sections" className="flex flex-col gap-4">
        {SECTIONS.map((section) => {
          const isActive = section.id === active;
          return (
            <Link
              key={section.id}
              to={section.to}
              aria-current={isActive ? "page" : undefined}
              className={`flex h-11 items-center justify-center rounded-[9px] border px-[10px] py-[10px] text-center font-display text-[11px] font-bold leading-[1.5] transition-colors ${
                isActive
                  ? "border-[#000e53] bg-[#fff4cd] text-aktif-navy"
                  : "border-[#dfe5f0] bg-surface-white text-aktif-navy hover:border-[#000e53]"
              }`}
            >
              {section.label}
            </Link>
          );
        })}
      </nav>

      {guidance && (
        <div className="flex flex-col gap-[10px] rounded-lg bg-surface-light p-4 text-text-secondary">
          <p className="font-display text-[10px] font-bold">{guidance.title}</p>
          <p className="font-display text-[12px] leading-[1.5]">{guidance.body}</p>
        </div>
      )}
    </aside>
  );
}
