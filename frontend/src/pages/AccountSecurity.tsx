import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AccountSidebar } from "../components/account/AccountSidebar";
import { Navbar } from "../components/ui/Navbar";
import { SiteFooter } from "../components/ui/SiteFooter";
import {
  backend,
  BackendRequestError,
  USE_MOCK_DATA,
  type Profile,
} from "../lib/backendAdapter";

type FieldName = "currentPassword" | "newPassword" | "confirmPassword";

type FieldErrors = Partial<Record<FieldName, string>>;

interface PasswordValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const EMPTY_VALUES: PasswordValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

/** Test-only credentials used by the "USE SAMPLE DETAILS" preview helper. */
const SAMPLE_VALUES: PasswordValues = {
  currentPassword: "CurrentSamplePass123",
  newPassword: "NewSamplePass123",
  confirmPassword: "NewSamplePass123",
};

/**
 * The account service accepts 6 to 255 characters; this screen asks for 8 or
 * more because the field sets a new password rather than restating a stored
 * one.
 */
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 255;

const MOCK_NOTICE =
  "TEST DATA — this temporary local profile is shown for UI review only. Set VITE_ENABLE_MOCK_DATA to false to use backend data.";

const DISCONNECTED_NOTICE =
  "Password changes are not connected to the backend yet — there is no current-user session endpoint, so there is no account record to update.";

const GUIDANCE = {
  title: "A STRONGER PASSWORD",
  body: "Long passwords that mix letters, numbers, and symbols are harder to guess. Change your password whenever you think it has been shared.",
};

const LENGTH_GUIDANCE =
  `Use at least ${MIN_PASSWORD_LENGTH} characters. The sample helper fills test values only — nothing is saved until you select Update password.`;

const CURRENT_PASSWORD_HELPER =
  "Your current password stays on this device — only the new password is sent to the account service.";

const SERVICE_NOTE =
  "The account service replaces your password when it saves and does not verify the current one yet. Sign-in is not connected, so there is no session to refresh after a change.";

function validate(values: PasswordValues): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.currentPassword) {
    errors.currentPassword = "Enter your current password to continue.";
  }

  if (!values.newPassword) {
    errors.newPassword = "Enter a new password.";
  } else if (values.newPassword.length < MIN_PASSWORD_LENGTH) {
    errors.newPassword = `Use at least ${MIN_PASSWORD_LENGTH} characters for the new password.`;
  } else if (values.newPassword.length > MAX_PASSWORD_LENGTH) {
    errors.newPassword = `The new password must not exceed ${MAX_PASSWORD_LENGTH} characters.`;
  } else if (values.currentPassword && values.newPassword === values.currentPassword) {
    errors.newPassword = "Choose a new password that is different from your current one.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Repeat the new password.";
  } else if (values.newPassword && values.confirmPassword !== values.newPassword) {
    errors.confirmPassword = "The new passwords do not match.";
  }

  return errors;
}

export function AccountSecurity() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [values, setValues] = useState<PasswordValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [visible, setVisible] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadProfile = useCallback(() => {
    return backend.getProfile().then(
      (nextProfile) => {
        setProfile(nextProfile);
        setLoading(false);
      },
      () => {
        setFailure("We couldn’t load your account details. Please try again.");
        setLoading(false);
      },
    );
  }, []);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  const update = (field: FieldName, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSuccess(null);
    setFailure(null);
  };

  const applySampleDetails = () => {
    setValues({ ...SAMPLE_VALUES });
    setErrors({});
    setFailure(null);
    setSuccess("Sample credentials applied — these are test values and nothing is saved yet.");
  };

  const updatePassword = async () => {
    setSuccess(null);
    setFailure(null);

    if (!profile) {
      setFailure("Changing your password isn’t available until the account service is connected.");
      return;
    }

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0];
      setFailure(`We couldn’t update your password. ${nextErrors[firstInvalid]}`);
      document.getElementById(`security-${firstInvalid}`)?.focus();
      return;
    }

    setSaving(true);
    try {
      const saved = await backend.changePassword(profile, values.newPassword);
      setProfile(saved);
      setValues(EMPTY_VALUES);
      setSuccess(
        USE_MOCK_DATA
          ? "Your password was changed in the local test profile."
          : "Your password has been changed.",
      );
    } catch (error) {
      if (error instanceof BackendRequestError) {
        const passwordError = error.fieldErrors.password;
        if (passwordError) setErrors({ newPassword: passwordError });
      }
      setFailure(
        error instanceof Error
          ? error.message
          : "We couldn’t update your password. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const fieldProps = (field: FieldName) => ({
    id: `security-${field}`,
    name: field,
    value: values[field],
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `security-${field}-error` : undefined,
    onChange: (event: ChangeEvent<HTMLInputElement>) =>
      update(field, event.target.value),
  });

  const fieldClass =
    "h-12 w-full rounded-lg border border-[#dfe5f0] bg-surface-white px-3 py-3 font-display text-[12px] leading-[1.5] text-text-primary placeholder:text-text-secondary focus:border-aktif-navy";

  const secondaryButton =
    "h-11 w-full rounded-[9px] border border-[#dfe5f0] bg-surface-white px-[10px] py-[10px] font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:border-[#000e53] disabled:cursor-not-allowed disabled:text-text-muted sm:w-auto";

  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar accountName="MY PROFILE" activePath="/account-profile" />

      <section className="flex min-h-[176px] flex-col gap-2 bg-aktif-navy px-6 pb-5 pt-[22px] lg:px-[72px]">
        <p className="font-display text-[10px] font-bold text-aktif-gold">MY ACCOUNT / SECURITY</p>
        <h1 className="font-['Castoro_Titling'] text-[36px] leading-[1.2] text-text-inverse">
          Account security
        </h1>
        <p className="font-display text-[13px] text-[#d1d8ee]">
          Manage your password and keep access to your account secure.
        </p>
        <p role="note" className="font-display text-[11px] leading-[1.5] text-[#d1d8ee]">
          {USE_MOCK_DATA ? MOCK_NOTICE : DISCONNECTED_NOTICE}
        </p>
      </section>

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-start gap-6 px-6 pt-8 lg:flex-row lg:items-stretch lg:px-[72px]">
        <AccountSidebar active="security" guidance={GUIDANCE} />

        <div className="flex w-full min-w-0 flex-col gap-6 lg:w-[984px]">
          <section className="flex w-full min-w-0 flex-col gap-4 rounded-lg border border-[#dfe5f0] bg-surface-white p-6 lg:min-h-[480px]">
            <h2 className="font-display text-[20px] font-bold leading-[1.5] text-aktif-navy">
              Change your password
            </h2>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="security-currentPassword" className="font-display text-[12px] font-bold leading-[1.5] text-text-primary">
                  Current password *
                </label>
                <input
                  {...fieldProps("currentPassword")}
                  type={visible ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Current password"
                  className={fieldClass}
                />
                {errors.currentPassword && (
                  <p id="security-currentPassword-error" className="font-display text-[11px] text-state-danger">
                    {errors.currentPassword}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="security-newPassword" className="font-display text-[12px] font-bold leading-[1.5] text-text-primary">
                  New password *
                </label>
                <input
                  {...fieldProps("newPassword")}
                  type={visible ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="New password"
                  className={fieldClass}
                />
                {errors.newPassword && (
                  <p id="security-newPassword-error" className="font-display text-[11px] text-state-danger">
                    {errors.newPassword}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="security-confirmPassword" className="font-display text-[12px] font-bold leading-[1.5] text-text-primary">
                  Confirm new password *
                </label>
                <input
                  {...fieldProps("confirmPassword")}
                  type={visible ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Repeat new password"
                  className={fieldClass}
                />
                {errors.confirmPassword && (
                  <p id="security-confirmPassword-error" className="font-display text-[11px] text-state-danger">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={applySampleDetails}
                disabled={!USE_MOCK_DATA}
                className={`${secondaryButton} sm:w-[260px]`}
              >
                USE SAMPLE DETAILS
              </button>
              <button
                type="button"
                aria-pressed={visible}
                onClick={() => setVisible((current) => !current)}
                className={`${secondaryButton} sm:w-[240px]`}
              >
                SHOW / HIDE PASSWORDS
              </button>
              <button
                type="button"
                onClick={() => void updatePassword()}
                disabled={saving || loading}
                className="h-11 w-full rounded-[9px] border border-[#000e53] bg-aktif-gold px-[10px] py-[10px] font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-surface-light disabled:text-text-muted sm:w-[300px]"
              >
                {saving ? "UPDATING…" : "UPDATE PASSWORD"}
              </button>
            </div>

            {success && (
              <p role="status" className="font-display text-[12px] leading-[1.5] text-aktif-navy">
                {success}
              </p>
            )}
            {failure && (
              <p role="alert" className="font-display text-[12px] leading-[1.5] text-state-danger">
                {failure}
              </p>
            )}

            <p className="font-display text-[11px] leading-[1.5] text-text-secondary">
              {LENGTH_GUIDANCE}
            </p>
          </section>

          <section className="flex w-full min-w-0 flex-col gap-4 rounded-lg border border-[#dfe5f0] bg-surface-white p-6 lg:min-h-[244px]">
            <h2 className="font-display text-[19px] font-bold leading-[1.5] text-aktif-navy">
              Keep your account secure
            </h2>
            <p className="font-display text-[13px] leading-[1.5] text-text-secondary">
              Use a unique password and avoid sharing it. {CURRENT_PASSWORD_HELPER}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/forgot-password"
                className={`${secondaryButton} inline-flex items-center justify-center sm:w-[330px]`}
              >
                FORGOT CURRENT PASSWORD?
              </Link>
              <button
                type="button"
                onClick={() => navigate("/account-profile")}
                className={`${secondaryButton} sm:w-[260px]`}
              >
                BACK TO ACCOUNT
              </button>
            </div>

            <p className="font-display text-[11px] leading-[1.5] text-text-secondary">
              {SERVICE_NOTE}
            </p>
          </section>
        </div>
      </main>

      <div className="pt-8">
        <SiteFooter accountLabel="My account" accountPath="/account-profile" />
      </div>
    </div>
  );
}
