---
name: remaining-student-instructor-pages-match-figma
description: StudentView, InstructorView, InstructorProfile, and all four create/update pages matched to Figma layout with signed-in navbar; build green
metadata:
  type: project
  originSessionId: 65f95f45-cfe4-432a-bfa2-5e55538e130f
modified: 2026-11-18
---

All remaining student/instructor pages now match Figma layout with signed-in navbar:

- `frontend/src/pages/StudentView.tsx` — page bg #f4f6fa (was navy), `<Navbar className="w-full" signedIn />`, navy intro band h-[176px] STUDENT WORKSPACE / Courses / ENROLL COURSE button, ALL COURSES / MY LEARNING pills, search/filter/sort row, course grid, role-switch button removed. Build green.
- `frontend/src/pages/InstructorView.tsx` — same as StudentView but INSTRUCTOR WORKSPACE / Courses / CREATE COURSE button, ALL COURSES / MY COURSES pills, isInstructor on CourseCard. Build green.
- `frontend/src/pages/InstructorProfile.tsx` — rewritten to match verified Figma profile layout pattern (page bg #f4f6fa, signedIn navbar, navy intro band h-[208px] YOUR ACCOUNT / Instructor profile, left col 312px profile summary + Account access Log out, right col 952px Instructor Details card), deactivate button removed, `deactivateInstructor` import removed. Build green.
- `frontend/src/pages/StudentCreate.tsx`, `StudentUpdate.tsx`, `InstructorCreate.tsx`, `InstructorUpdate.tsx` — page bg changed #000e53 → #f4f6fa to match Figma pattern; all already had `<Navbar signedIn />`. Build green.
- `frontend/src/components/ui/Navbar.tsx` — enhanced with POST_SIGNUP_LINKS including PRICING, Courses active on both /student/courses and /instructor/courses, signed-in user pill "Hoshimi Miyabi", mobile toggle. PRE_SIGNUP_LINKS unchanged (Home/Courses/Log in/Register — no student/instructor links pre-signup).
- `frontend/src/pages/StudentList.tsx` and `InstructorList.tsx` — already used `<Navbar ... signedIn />` and matched Figma; no change needed.

**Why:** user requested all pages match Figma layout with intuitive pre-signup flow (student/instructor not exposed before signup).
**Verification:** `npm run build` (`tsc -b && vite build`) green — no TS errors, build succeeds.

**How to apply:** navigate to /student/courses, /instructor/courses, /instructors/profile/:id to confirm signed-in navbar + Figma layout; pre-signup pages (/, /login, /register) show only Home/Courses/Log in/Register.
