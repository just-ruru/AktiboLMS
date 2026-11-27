import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/ui/Navbar";
import { SiteFooter } from "../../components/ui/SiteFooter";
import { backend, type Course } from "../../lib/backendAdapter";

export function InstructorCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    backend.getCourses().then(
      (next) => {
        if (!cancelled) {
          setCourses(next);
          setLoading(false);
        }
      },
      (err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "We couldn’t load the courses. Please try again.");
          setLoading(false);
        }
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  const allCount = courses.length;

  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar activePath="/instructor/courses" navIndicator="full" />

      <section className="flex min-h-[176px] flex-col gap-2 bg-aktif-navy px-6 pb-5 pt-[22px] lg:px-[72px]">
        <p className="font-display text-[10px] font-bold text-aktif-gold">INSTRUCTOR WORKSPACE</p>
        <div className="flex min-h-[60px] items-start justify-between shrink-0 w-full gap-4 flex-wrap sm:flex-nowrap">
          <h1 className="font-['Castoro_Titling'] text-[40px] leading-[1.5] text-text-inverse">Courses</h1>
          <Link
            to="/instructor/courses/new"
            className="flex h-[48px] w-[264px] items-center justify-center rounded-[9px] border border-black border-solid bg-aktif-gold px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-black transition-colors hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          >
            CREATE COURSE
          </Link>
        </div>
        <p className="font-display text-[14px] text-[#d1d8ee]">Create courses, organize subjects, and help your learners move forward.</p>
      </section>

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-start gap-6 px-6 pt-[32px] lg:px-[72px]">
        {loading ? (
          <p className="font-display text-[12px] leading-[1.5] text-text-secondary">Loading courses…</p>
        ) : error ? (
          <p className="font-display text-[12px] leading-[1.5] text-state-danger">{error}</p>
        ) : courses.length === 0 ? (
          <section className="flex w-full flex-col gap-4 rounded-lg border border-[#dee4ee] bg-surface-white p-6">
            <p className="font-display text-[12px] leading-[1.5] text-text-secondary">No courses found.</p>
            <p className="font-display text-[12px] leading-[1.5] text-text-secondary">Create your first course to get started.</p>
            <Link
              to="/instructor/courses/new"
              className="flex h-11 w-[264px] items-center justify-center rounded-[9px] border border-black border-solid bg-aktif-gold px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-black transition-colors hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
            >
              CREATE COURSE
            </Link>
          </section>
        ) : (
          <>
            <div className="flex gap-16 w-full items-start flex-wrap sm:flex-nowrap">
              <Link
                to="/instructor/courses"
                className="flex h-[44px] items-center justify-center rounded-[9px] border border-black border-solid bg-aktif-gold px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-black transition-colors hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                ALL COURSES {allCount}
              </Link>
              <Link
                to="/instructor/courses"
                className="flex h-[44px] items-center justify-center rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:border-[#000e53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                MY TEACHING
              </Link>
              <button
                type="button"
                className="flex h-[44px] items-center justify-center rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:border-[#000e53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                FILTERS
              </button>
            </div>

            <div className="flex flex-wrap gap-24 w-full items-start">
              <div className="max-w-[640px] w-full flex-col gap-9 rounded-lg border border-[#dee4ee] border-solid bg-surface-white overflow-clip pb-[17px] pl-4 pr-4 sm:pl-[20px] sm:pr-[312px] pt-[15px]">
                <p className="font-display text-[13px] leading-[1.5] text-text-secondary w-full">Search course title, code, or instructor</p>
              </div>
              <div className="max-w-[280px] w-full flex-col gap-12 rounded-lg border border-[#dee4ee] border-solid bg-surface-white overflow-clip pb-[15px] pl-[16px] pr-[26px] pt-[13px]">
                <div className="max-w-[110px] w-full items-start pt-[2px]">
                  <p className="font-display text-[13px] leading-[1.5] text-text-primary whitespace-nowrap">All categories</p>
                </div>
                <p className="font-display text-[16px] leading-[1.5] text-text-secondary">▾</p>
              </div>
              <div className="max-w-[328px] w-full flex-col gap-97px rounded-lg border border-[#dee4ee] border-solid bg-surface-white overflow-clip pb-[15px] pl-[16px] pr-[26px] pt-[13px]">
                <div className="max-w-[183px] w-full items-start pt-[2px]">
                  <p className="font-display text-[13px] leading-[1.5] text-text-primary whitespace-nowrap">Sort: Recently updated</p>
                </div>
                <p className="font-display text-[16px] leading-[1.5] text-text-secondary">▾</p>
              </div>
            </div>

            <p className="font-display text-[12px] leading-[1.5] text-text-secondary whitespace-pre">{allCount} courses</p>

            <div className="grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-24">
              {courses.map((course) => (
                <article
                  key={course.id}
                  className="flex flex-col gap-9 h-full items-start overflow-clip p-5 rounded-[16px] border border-[#dee4ee] border-solid bg-surface-white"
                >
                  <div className="flex h-[26px] items-start w-full justify-between sm:gap-[156px] gap-2">
                    <div className="flex h-full items-center justify-center overflow-clip rounded-[6px] w-[94px] bg-surface-light">
                      <p className="font-display text-[10px] leading-[1.5] text-aktif-navy whitespace-nowrap">{course.courseCode}</p>
                    </div>
                    <div
                      className="flex h-full items-center justify-center overflow-clip rounded-[6px] w-[126px]"
                      style={{
                        backgroundColor: course.status === "PUBLISHED" ? "#e9f5ef" : "#f4f6fa",
                        color: course.status === "PUBLISHED" ? "#236543" : "#596579",
                      }}
                    >
                      <p className="font-display text-[10px] leading-[1.5] whitespace-nowrap">{course.status}</p>
                    </div>
                  </div>

                  <div className="flex flex-col min-h-[59px] items-start pt-[5px] w-full">
                    <h2 className="font-['Lexend_Exa'] font-bold leading-[1.35] text-text-primary text-[18px]">{course.courseTitle}</h2>
                  </div>

                  <p className="font-display text-[12px] leading-[1.5] text-text-secondary whitespace-nowrap">
                    {course.units} units
                  </p>

                  <Link
                    to="/instructor/courses/modules"
                    className="flex h-[40px] w-[176px] items-center justify-center rounded-[9px] border border-[#dee4ee] border-solid bg-surface-white px-[10px] py-[10px] text-center font-display text-[12px] font-bold leading-[1.5] text-aktif-navy transition-colors hover:border-[#000e53] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                  >
                    VIEW COURSE
                  </Link>
                </article>
              ))}
            </div>
          </>
        )}
      </main>

      <div className="pt-8">
        <SiteFooter />
      </div>
    </div>
  );
}
