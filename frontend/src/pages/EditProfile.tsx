import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { AccountSidebar } from "../components/account/AccountSidebar";
import { Navbar } from "../components/ui/Navbar";
import { SiteFooter } from "../components/ui/SiteFooter";
import {
  backend,
  BackendRequestError,
  USE_MOCK_DATA,
  type Profile,
} from "../lib/backendAdapter";

type FieldName = "firstName" | "lastName" | "email" | "password";

type FieldErrors = Partial<Record<FieldName, string>>;

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const EMPTY_VALUES: FormValues = { firstName: "", lastName: "", email: "", password: "" };

/** Test-only values used by the "USE SAMPLE CHANGES" preview helper. */
const SAMPLE_VALUES: FormValues = {
  firstName: "Sample",
  lastName: "Learner",
  email: "sample.learner@example.invalid",
  password: "SamplePass123",
};

const MOCK_NOTICE =
  "TEST DATA — this temporary local profile is shown for UI review only. Set VITE_ENABLE_MOCK_DATA to false to use backend data.";

const DISCONNECTED_NOTICE =
  "Profile editing is not connected to the backend yet — there is no current-user session endpoint, so there is nothing to load or save.";

const GUIDANCE = {
  title: "YOUR CHANGES, YOUR CHOICE",
  body: "Changes are applied only when you save. Cancel returns to your profile without changing saved information.",
};

const SAMPLE_GUIDANCE = {
  title: "TRY A SAMPLE EDIT",
  body: "Use sample changes to preview an updated name, email address, and password. Sample values are test data only — nothing is applied until you select Save changes.",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.firstName.trim()) errors.firstName = "First name is required.";
  else if (values.firstName.trim().length > 100) errors.firstName = "First name must not exceed 100 characters.";

  if (!values.lastName.trim()) errors.lastName = "Last name is required.";
  else if (values.lastName.trim().length > 100) errors.lastName = "Last name must not exceed 100 characters.";

  if (!values.email.trim()) errors.email = "Email address is required.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Email address should be valid.";
  else if (values.email.trim().length > 255) errors.email = "Email address must not exceed 255 characters.";

  if (!values.password) errors.password = "Password is required.";
  else if (values.password.length < 6 || values.password.length > 255) {
    errors.password = "Password must be between 6 and 255 characters.";
  }

  return errors;
}

export function EditProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const loadProfile = useCallback(() => {
    return backend.getProfile().then(
      (nextProfile) => {
        setProfile(nextProfile);
        if (nextProfile) {
          setValues({
            firstName: nextProfile.firstName,
            lastName: nextProfile.lastName,
            email: nextProfile.email,
            password: "",
          });
        }
        setFailure(null);
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

  const disconnected = !loading && profile === null;
  const displayName = `${values.firstName} ${values.lastName}`.trim();

  const update = (field: FieldName, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSuccess(null);
    setFailure(null);
  };

  const applySampleChanges = () => {
    setValues({ ...SAMPLE_VALUES });
    setErrors({});
    setFailure(null);
    setSuccess("Sample changes applied — these are test values and nothing is saved yet.");
  };

  const saveChanges = async () => {
    setSuccess(null);
    setFailure(null);

    if (!profile) {
      setFailure("Saving changes isn’t available until the account service is connected.");
      return;
    }

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = (Object.keys(nextErrors) as FieldName[])[0];
      setFailure(`We couldn’t save your changes. ${nextErrors[firstInvalid]}`);
      document.getElementById(`edit-profile-${firstInvalid}`)?.focus();
      return;
    }

    setSaving(true);
    try {
      const saved = await backend.updateProfile(profile, {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        password: values.password,
      });
      setProfile(saved);
      setValues((current) => ({ ...current, password: "" }));
      setSuccess(
        USE_MOCK_DATA
          ? "Your changes were saved to the local test profile."
          : "Your changes have been saved.",
      );
    } catch (error) {
      if (error instanceof BackendRequestError) {
        setErrors({
          firstName: error.fieldErrors.firstName,
          lastName: error.fieldErrors.lastName,
          email: error.fieldErrors.email,
          password: error.fieldErrors.password,
        });
      }
      setFailure(
        error instanceof Error
          ? error.message
          : "We couldn’t save your changes. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const fieldProps = (field: FieldName) => ({
    id: `edit-profile-${field}`,
    name: field,
    value: values[field],
    disabled: disconnected || loading,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `edit-profile-${field}-error` : undefined,
    onChange: (event: ChangeEvent<HTMLInputElement>) =>
      update(field, event.target.value),
  });

  const fieldClass =
    "h-12 w-full rounded-lg border border-[#dfe5f0] bg-surface-white px-3 py-3 font-display text-[12px] leading-[1.5] text-text-secondary placeholder:text-text-secondary focus:border-aktif-navy disabled:cursor-not-allowed disabled:bg-surface-light disabled:text-text-muted";

  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar accountName="MY PROFILE" activePath="/account-profile" />

      <section className="flex min-h-[176px] flex-col gap-2 bg-aktif-navy px-6 pb-5 pt-[22px] lg:px-[72px]">
        <p className="font-display text-[10px] font-bold text-aktif-gold">MY ACCOUNT / EDIT PROFILE</p>
        <h1 className="font-['Castoro_Titling'] text-[36px] leading-[1.2] text-text-inverse">
          Edit your profile
        </h1>
        <p className="font-display text-[13px] text-[#d1d8ee]">
          Keep your personal and contact information up to date.
        </p>
        <p role="note" className="font-display text-[11px] leading-[1.5] text-[#d1d8ee]">
          {USE_MOCK_DATA ? MOCK_NOTICE : DISCONNECTED_NOTICE}
        </p>
      </section>

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-start gap-6 px-6 pt-8 lg:flex-row lg:items-stretch lg:px-[72px]">
        <AccountSidebar active="edit" guidance={GUIDANCE} />

        <section className="flex w-full min-w-0 flex-col gap-4 rounded-lg border border-[#dfe5f0] bg-surface-white p-6 lg:min-h-[748px] lg:w-[984px]">
          <h2 className="font-display text-[20px] font-bold leading-[1.5] text-aktif-navy">
            Personal and contact information
          </h2>
          <p className="font-display text-[12px] leading-[1.5] text-text-secondary">
            Your profile details stay separate from your student or instructor role.
          </p>

          <div className="grid grid-cols-1 gap-x-6 gap-y-3 md:grid-cols-2">
            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="edit-profile-display" className="font-display text-[12px] font-bold leading-[1.5] text-text-primary">
                Display name
              </label>
              <input
                id="edit-profile-display"
                name="displayName"
                type="text"
                readOnly
                value={displayName}
                disabled={disconnected || loading}
                aria-readonly="true"
                className={`${fieldClass} bg-surface-light`}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="edit-profile-firstName" className="font-display text-[12px] font-bold leading-[1.5] text-text-primary">
                First name *
              </label>
              <input {...fieldProps("firstName")} type="text" className={fieldClass} />
              {errors.firstName && (
                <p id="edit-profile-firstName-error" className="font-display text-[11px] text-state-danger">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="edit-profile-lastName" className="font-display text-[12px] font-bold leading-[1.5] text-text-primary">
                Last name *
              </label>
              <input {...fieldProps("lastName")} type="text" className={fieldClass} />
              {errors.lastName && (
                <p id="edit-profile-lastName-error" className="font-display text-[11px] text-state-danger">
                  {errors.lastName}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="edit-profile-email" className="font-display text-[12px] font-bold leading-[1.5] text-text-primary">
                Email address *
              </label>
              <input {...fieldProps("email")} type="email" className={fieldClass} />
              {errors.email && (
                <p id="edit-profile-email-error" className="font-display text-[11px] text-state-danger">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="edit-profile-mobile" className="font-display text-[12px] font-bold leading-[1.5] text-text-primary">
                Mobile number
              </label>
              <input
                id="edit-profile-mobile"
                name="mobileNumber"
                type="text"
                value=""
                placeholder="Not stored by the backend yet"
                disabled
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="edit-profile-dob" className="font-display text-[12px] font-bold leading-[1.5] text-text-primary">
                Date of birth
              </label>
              <input
                id="edit-profile-dob"
                name="dateOfBirth"
                type="text"
                value=""
                placeholder="Not stored by the backend yet"
                disabled
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="edit-profile-gender" className="font-display text-[12px] font-bold leading-[1.5] text-text-primary">
                Gender
              </label>
              <input
                id="edit-profile-gender"
                name="gender"
                type="text"
                value=""
                placeholder="Not stored by the backend yet"
                disabled
                className={fieldClass}
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="edit-profile-password" className="font-display text-[12px] font-bold leading-[1.5] text-text-primary">
                Password *
              </label>
              <input {...fieldProps("password")} type="password" className={fieldClass} />
              <p className="font-display text-[11px] leading-[1.5] text-text-secondary">
                The account service requires a password to save changes. Enter your current password — it is
                stored again unchanged.
              </p>
              {errors.password && (
                <p id="edit-profile-password-error" className="font-display text-[11px] text-state-danger">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-lg bg-[#fff4cd] p-4 text-text-secondary">
            <p className="font-display text-[10px] font-bold text-aktif-navy">{SAMPLE_GUIDANCE.title}</p>
            <p className="font-display text-[12px] leading-[1.5]">{SAMPLE_GUIDANCE.body}</p>
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

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={applySampleChanges}
              disabled={disconnected}
              className="h-11 w-full rounded-[9px] border border-[#dfe5f0] bg-surface-white px-[10px] py-[10px] font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:border-[#000e53] disabled:cursor-not-allowed disabled:text-text-muted sm:w-[300px]"
            >
              USE SAMPLE CHANGES
            </button>
            <button
              type="button"
              onClick={() => navigate("/account-profile")}
              className="h-11 w-full rounded-[9px] border border-[#dfe5f0] bg-surface-white px-[10px] py-[10px] font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:border-[#000e53] sm:w-[200px]"
            >
              CANCEL
            </button>
            <button
              type="button"
              onClick={() => void saveChanges()}
              disabled={saving}
              className="h-11 w-full rounded-[9px] border border-[#000e53] bg-aktif-gold px-[10px] py-[10px] font-display text-[11px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:bg-surface-light disabled:text-text-muted sm:w-[300px]"
            >
              {saving ? "SAVING…" : "SAVE CHANGES"}
            </button>
          </div>
        </section>
      </main>

      <div className="pt-8">
        <SiteFooter accountLabel="My account" accountPath="/account-profile" />
      </div>
    </div>
  );
}
