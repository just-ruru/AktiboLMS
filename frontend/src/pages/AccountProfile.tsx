import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";
import { SiteFooter } from "../components/ui/SiteFooter";
import { ConfirmLogoutDialog } from "../components/overlays/ConfirmLogoutDialog";
import { backend, USE_MOCK_DATA, type Profile } from "../lib/backendAdapter";

const UNAVAILABLE = "Not available";

const OPTIONAL_FIELDS = [
  { label: "Date of birth", add: "+ Add Date of birth" },
  { label: "Gender", add: "+ Add Gender" },
];

const MOCK_NOTICE =
  "TEST DATA — this temporary local profile is shown for UI review only. Set VITE_ENABLE_MOCK_DATA to false to use backend data.";

const DISCONNECTED_NOTICE =
  "Student profile is not connected to the backend yet — there is no current-user session endpoint, so account details cannot be loaded.";

export function AccountProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const loadProfile = useCallback(() => {
    return backend.getProfile().then(
      (nextProfile) => {
        setProfile(nextProfile);
        setError(null);
        setLoading(false);
      },
      () => {
        setError("We couldn’t load your account details. Please try again.");
        setLoading(false);
      },
    );
  }, []);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const fullName = profile ? `${profile.firstName} ${profile.lastName}`.trim() : "";
  const notice = USE_MOCK_DATA ? MOCK_NOTICE : DISCONNECTED_NOTICE;

  const details = [
    { label: "First name", value: profile?.firstName },
    { label: "Last name", value: profile?.lastName },
    { label: "Mobile number", value: undefined },
    { label: "Email address", value: profile?.email },
    { label: "Student ID", value: profile?.studentId },
    { label: "Description", value: profile?.description ?? undefined },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar accountName={fullName || "Student account"} />

      <section className="flex flex-col items-start gap-[10px] bg-aktif-navy px-6 pb-[33px] pt-[27px] lg:h-[208px] lg:overflow-hidden lg:px-[72px]">
        <p className="font-['Inter'] text-[12px] font-bold text-aktif-gold">YOUR ACCOUNT</p>
        <h1 className="font-['Inter'] text-[40px] font-semibold leading-[1.4] text-text-inverse">Account profile</h1>
        <p className="font-['Inter'] text-[18px] text-[#cdd5f0]">Manage your personal information and account details.</p>
        <p role="status" className={`font-['Inter'] text-[14px] leading-[1.4] ${USE_MOCK_DATA ? "text-aktif-gold" : "text-[#cdd5f0]"}`}>{notice}</p>
      </section>

      <main className="mx-auto flex w-full max-w-[1296px] flex-1 flex-col items-start gap-8 px-6 py-10 lg:flex-row lg:px-0">
        <aside className="flex w-full flex-col gap-10 py-1 lg:w-[312px] lg:shrink-0">
          <section className="flex w-full flex-col items-center gap-4 rounded-2xl border border-border-light bg-white px-7 py-4 text-center">
            <span className="h-1 w-10 rounded-full bg-aktif-gold" />
            <img src="/assets/avatar.svg" alt="" className="shrink-0" />
            <p className="font-['Inter'] text-[12px] font-semibold text-text-secondary">ACCOUNT HOLDER</p>
            <p className="font-['Inter'] text-[28px] font-semibold leading-[1.4] text-text-secondary">
              {loading ? "Loading profile" : fullName || "Not connected"}
            </p>
            {profile?.email ? (
              <p className="break-all font-['Inter'] text-[14px] text-text-secondary">{profile.email}</p>
            ) : (
              <p className="font-['Inter'] text-[14px] text-text-secondary">Profile service unavailable</p>
            )}
            <div className="h-px w-full bg-border-light" />
            <button
              type="button"
              onClick={() => navigate("/account-profile/edit")}
              className="h-12 w-full rounded-lg border border-border-light font-['Inter'] text-[16px] font-semibold text-aktif-navy transition-colors hover:bg-surface-light"
            >
              Edit basic info
            </button>
          </section>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => navigate("/account/security")}
              className="text-left font-['Inter'] text-[16px] font-semibold text-text-primary underline"
            >
              Password & security
            </button>
            <p className="font-['Inter'] text-[14px] text-text-secondary">Finished learning for now?</p>
            <button
              type="button"
              onClick={() => setLogoutOpen(true)}
              className="h-11 w-full rounded-lg border border-border-light bg-white font-['Inter'] text-[16px] font-semibold text-state-danger transition-colors hover:bg-red-50"
            >
              Log out
            </button>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col gap-6 rounded-2xl border border-border-light bg-white px-8 pb-[78px] pt-7">
          <div className="flex min-h-[72px] flex-col gap-6 border-b border-border-light pb-[9px] sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="font-['Inter'] text-[26px] font-semibold text-text-primary">Account Details</h2>
              <p className="mt-1 font-['Inter'] text-[15px] text-text-secondary">Your personal and contact information.</p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/account-profile/edit")}
              className="h-12 shrink-0 rounded-lg bg-aktif-gold px-6 font-['Inter'] text-[16px] font-semibold text-aktif-navy transition-colors hover:bg-amber-400"
            >
              Edit Account Details
            </button>
          </div>

          {loading ? (
            <p className="font-['Inter'] text-[14px] text-text-secondary">Loading account details…</p>
          ) : error ? (
            <div role="alert" className="flex flex-wrap items-center gap-3">
              <p className="font-['Inter'] text-[14px] text-state-danger">{error}</p>
              <button
                type="button"
                onClick={() => {
                  setLoading(true);
                  void loadProfile();
                }}
                className="font-['Inter'] text-[14px] font-semibold text-aktif-navy underline"
              >
                Try again
              </button>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="grid grid-cols-1 gap-8 border-b border-border-light md:grid-cols-2">
                {details.slice(0, 4).map(({ label, value }) => (
                  <div key={label} className="min-h-[112px] pt-5">
                    <p className="font-['Inter'] text-[14px] font-medium text-text-secondary">{label}</p>
                    <p className="mt-2 font-['Inter'] text-[18px] text-text-secondary">
                      {value || UNAVAILABLE}
                    </p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-8 border-b border-border-light md:grid-cols-2">
                {OPTIONAL_FIELDS.map(({ label, add }) => (
                  <div key={label} className="min-h-[112px] pt-5">
                    <p className="font-['Inter'] text-[14px] font-medium text-text-secondary">{label}</p>
                    <button
                      type="button"
                      onClick={() => navigate("/account-profile/edit")}
                      className="mt-2 flex h-14 w-full items-center gap-3 rounded-md border border-[#5d6994] bg-surface-light px-4 text-left transition-colors hover:border-aktif-navy"
                    >
                      <span aria-hidden="true" className="flex size-6 items-center justify-center text-[18px] text-[#5d6994]">+</span>
                      <span className="flex flex-col">
                        <span className="font-['Inter'] text-[14px] text-[#5d6994]">{add}</span>
                        <span className="font-['Inter'] text-[11px] text-[#8c94a6]">Optional — can be added later</span>
                      </span>
                    </button>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 gap-8 border-b border-border-light md:grid-cols-2">
                {details.slice(4).map(({ label, value }) => (
                  <div key={label} className="min-h-[112px] pt-5">
                    <p className="font-['Inter'] text-[14px] font-medium text-text-secondary">{label}</p>
                    <p className="mt-2 font-['Inter'] text-[18px] text-text-secondary">
                      {value || UNAVAILABLE}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="pt-[30px] font-['Inter'] text-[15px] text-text-secondary">Keep your contact information up to date.</p>
        </section>
      </main>

      <ConfirmLogoutDialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onLogout={() => {
          setLogoutOpen(false);
          navigate("/login");
        }}
      />

      <div className="pt-6">
        <SiteFooter accountLabel="My account" accountPath="/account-profile" />
      </div>
    </div>
  );
}
