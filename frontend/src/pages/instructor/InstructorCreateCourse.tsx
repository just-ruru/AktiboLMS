import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/ui/Navbar";
import { SiteFooter } from "../../components/ui/SiteFooter";
import { FormValidationOverlay } from "../../components/overlays/FormValidationOverlay";
import { backend, type CourseRequest, BackendRequestError } from "../../lib/backendAdapter";

export function InstructorCreateCourse() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationOpen, setValidationOpen] = useState(false);
  const [form, setForm] = useState<CourseRequest>({
    courseCode: "",
    courseTitle: "",
    description: "",
    units: 0,
    status: "DRAFT",
  });

  const handleChange = (field: keyof CourseRequest, value: string) => {
    setError(null);
    setForm((prev) => {
      if (field === "units") {
        return { ...prev, units: parseInt(value, 10) || 0 };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!form.courseCode.trim() || !form.courseTitle.trim() || form.units <= 0) {
      setError("Please fill in all required fields.");
      setValidationOpen(true);
      return;
    }

    setLoading(true);

    try {
      await backend.createCourse({ ...form });
      navigate("/instructor/courses");
    } catch (err) {
      if (err instanceof BackendRequestError) {
        if (err.fieldErrors && Object.keys(err.fieldErrors).length > 0) {
          const first = Object.values(err.fieldErrors)[0];
          setError(first);
        } else {
          setError(err.message);
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("We couldn't create that course. Please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar activePath="/instructor/courses/new" navIndicator="full" />

      <section className="flex min-h-[176px] flex-col gap-2 bg-aktif-navy px-6 pb-5 pt-[22px] lg:px-[72px]">
        <p className="font-display text-[10px] font-bold text-aktif-gold">INSTRUCTOR WORKSPACE</p>
        <div className="flex min-h-[60px] items-start justify-between shrink-0 w-full gap-4 flex-wrap sm:flex-nowrap">
          <h1 className="font-['Castoro_Titling'] text-[40px] leading-[1.5] text-text-inverse">Create course</h1>
        </div>
        <p className="font-display text-[14px] text-[#d1d8ee]">Create a new course and begin adding subjects and modules for your learners.</p>
      </section>

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-start gap-6 px-6 pt-[32px] lg:px-[72px]">
        {error && (
          <p className="font-display text-[12px] leading-[1.5] text-state-danger">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6 rounded-lg border border-[#dee4ee] border-solid bg-surface-white p-6 lg:p-10">
          <div className="flex flex-col gap-3">
            <label htmlFor="courseCode" className="font-display text-[12px] font-bold text-text-primary">Course code</label>
            <input
              id="courseCode"
              name="courseCode"
              value={form.courseCode}
              onChange={(e) => handleChange("courseCode", e.target.value)}
              className="flex w-full h-[44px] rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] font-display text-[12px] text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              placeholder="e.g. CS-301"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="courseTitle" className="font-display text-[12px] font-bold text-text-primary">Course title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              value={form.courseTitle}
              onChange={(e) => handleChange("courseTitle", e.target.value)}
              className="flex w-full h-[44px] rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] font-display text-[12px] text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              placeholder="e.g. Data Structures"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="description" className="font-display text-[12px] font-bold text-text-primary">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="flex w-full min-h-[120px] rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] font-display text-[12px] text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              placeholder="Describe what this course covers…"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="units" className="font-display text-[12px] font-bold text-text-primary">Units</label>
            <input
              id="units"
              name="units"
              type="number"
              min="1"
              value={form.units}
              onChange={(e) => handleChange("units", e.target.value)}
              className="flex w-full h-[44px] rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] font-display text-[12px] text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              placeholder="e.g. 3"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="status" className="font-display text-[12px] font-bold text-text-primary">Status</label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={(e) => handleChange("status", e.target.value)}
              className="flex w-full h-[44px] rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] font-display text-[12px] text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex h-[48px] w-[264px] items-center justify-center rounded-[9px] border border-black border-solid bg-aktif-gold px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-black transition-colors hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating…" : "Create course"}
            </button>
            <Link
              to="/instructor/courses"
              className="flex h-[48px] w-[264px] items-center justify-center rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:border-[#000e53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>

      <FormValidationOverlay
        open={validationOpen}
        onClose={() => setValidationOpen(false)}
        title="Check your details"
        message="Course code, course title and units are required before a course can be created."
      />

      <div className="pt-8">
        <SiteFooter />
      </div>
    </div>
  );
}
