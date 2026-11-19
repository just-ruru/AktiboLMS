# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# AktiboLMS

An interactive Learning Management System ("Interactive Learning, Made Active") — a third-year IT
group project (3 students, ~4-week plan, $0 budget). The full product/design doc lives in
[`README.md`](README.md): pain points, goals/non-goals, architecture decisions, target database
schema, the REST API surface, and the week-by-week implementation plan. Read it before designing
anything new; it is the source of truth for intended behaviour, and the running code is currently
well behind it.

## Repository layout

This directory (`AktiboLMS/`) is the git repo root.

| Path | State |
|------|-------|
| `frontend/` | The only runnable code. React 19 + Vite 8 + TypeScript + Tailwind CSS. |
| `backend/` | **Spring Boot backend source is missing from the working tree.** Only `backend/target/test-classes/*.class` build artifacts remain — no `src/`, no `pom.xml`. |
| `README.md` | Design doc (25 KB): architecture, schema, API contract, 4-week plan, risk table. |

### Backend (source currently absent)

`backend/` contains only compiled test classes. Their paths reveal the intended packages:

- `com.aktibolms.backend.controller` — `StudentControllerTest`, `InstructorControllerTest`
- `com.aktibolms.backend.service` — `StudentServiceTest`, `InstructorServiceTest`, `CourseModuleServiceTest`
- `com.aktibolms.service` — `AuthServiceTest`, `CourseServiceTest`

The backend existed in git history (commit `f3da6b5c` "Backend and frontend changes including
security config, entities, repositories, services, and UI components"). To restore it:
`git checkout f3da6b5c -- backend`. Otherwise, expect the frontend's API calls to fail — the
frontend targets `http://localhost:8080/api`.

Once restored, the project is Maven-based; the README specifies `./mvnw spring-boot:run`,
`./mvnw test`, and `./mvnw flyway:migrate`. Spring Boot 3 + Spring Security/JWT + JPA + Flyway +
PostgreSQL (Supabase).

## Commands

All frontend commands run from `frontend/`:

```bash
npm run dev        # Vite dev server (HMR)
npm run build      # tsc -b && vite build  — typecheck + bundle; run after every change
npm run lint       # oxlint
npm run preview    # serve the production build
```

There is **no test script** — Vitest was planned but never set up, and no test files exist.
`@playwright/test` is installed as a devDependency but there is no `tests/` or `e2e/` directory
yet. If you add frontend tests, you must also add the runner script to `package.json`.

For the backend (once source is restored): `./mvnw spring-boot:run`, `./mvnw test`.
Postman CLI is available on this machine for API work.

## Frontend architecture

**Stack**: React 19, Vite 8, TypeScript (strict, project references via `tsconfig.app.json`),
react-router-dom v7, Tailwind CSS 3.4, oxlint. No state-management library and no TanStack Query
yet, despite both being in the README's plan.

**Routing** — all routes are declared flat in [`frontend/src/App.tsx`](frontend/src/App.tsx); there
are no nested layouts or route guards:

| Path | Component |
|------|-----------|
| `/` | `LandingPage` |
| `/login`, `/register`, `/forgot-password` | auth pages |
| `/account-profile` | `AccountProfile` |
| `/student/courses` | `StudentView` (course catalogue) |
| `/students/list\|create\|profile/:id\|update/:id` | student CRUD screens |
| `/instructor/courses` | `InstructorView` (course catalogue) |
| `/instructors/list\|create\|profile/:id\|update/:id` | instructor CRUD screens |
| `*` | `NotFound` |

**Pages** live flat in `frontend/src/pages/*.tsx`, one component per file, no per-feature folders
(the README's `pages/auth/`, `pages/student/`, `pages/instructor/` split was not adopted).

**Shared UI** in `frontend/src/components/ui/`: `Button` (variants `primary`/`secondary`/`danger`,
plus `fullWidth`), `Card`, `CourseCard`, `Input`, `Label`, `Navbar`.
`Navbar` takes a `signedIn` prop that switches the whole link set: pre-signup shows
Home/Courses/Log in/Register; post-signup shows Home/Courses/Pricing/My account plus a signed-in
user pill (`userName`, defaults to "Hoshimi Miyabi"). It is `sticky top-0 z-[50]`.

**API client** — [`frontend/src/services/api.ts`](frontend/src/services/api.ts) is a hand-rolled
`fetch` wrapper (no axios yet): `API_BASE = "http://localhost:8080/api"`, JSON content type,
throws an `Error` carrying the raw response body on non-2xx. It exports Student/Instructor CRUD
(`createStudent`, `getStudentById`, `getAllStudents(page, size)`, `updateStudent`,
`deactivateStudent`, and the instructor equivalents) returning a `PageResponse<T>` shape. Types
for the entities live in this same file.

**Styling** — two parallel systems, so check both before adding styles:

- Tailwind utilities, with brand colours under the **`aktibo`** namespace in
  `frontend/tailwind.config.js`: `aktibo-navy` `#000e53`, `aktibo-gold` `#ffb700`, `aktibo-white`.
  Fonts: `font-sans` (Inter), `font-display` (Lexend Exa). Arbitrary values such as
  `rounded-[9px]`, `text-[16px]`, `px-[72px]` are used heavily for Figma-exact sizing.
- `frontend/src/App.css` (~1.5k lines) holds most real component styling in BEM-ish classes
  (`.site-nav__link`, `.site-nav__my-account`, …). `frontend/src/index.css` holds the Tailwind
  directives, shared keyframes/animations (`.animate-fade-in-up`, `.animate-page-fade`, etc.), the
  navy `body`/`#root` background, and the gold `:focus-visible` outline.

**Assets** — two different locations with different rules:

- `frontend/public/assets/*` → served verbatim at `/assets/...` (e.g. `logo.png`,
  `aktibo-symbol.png`, `avatar.svg`, `favicon.svg`). Reference by absolute path string.
- `frontend/src/assets/*` (`hero.png`, `profile_pic_placeholder.jpg`) → **must be imported as a Vite
  module** (`import pic from '../assets/profile_pic_placeholder.jpg'`). Referencing them as
  `/assets/...` 404s, because they are not in `public/`.

## UI status: still a work in progress

**The overall UI is not properly finished yet — this is the current focus of the project.**
The latest commit (`f5d09ebd`) is titled *"fix attempt for the ui, still need to change some
styling as other pages are still not properly layouted"*. Work continues page-by-page, matching
each screen to the Figma design.

Reference material: `frontend/public/figma-reference.png` and `figma-screenshot.png` in the
workspace directory one level above the repo root.

Already matched to Figma: `LandingPage` (frame 6:11), `AccountProfile` (frame 92:49),
`StudentProfile`, and the Student/Instructor `View`, `Profile`, `List`, `Create`, and `Update`
screens. `Login`, `Register`, and `ForgotPassword` exist with the shared navbar treatment.

### Known class-name bug (silently breaks styling)

Thirteen files use `bg-aktif-gold` / `bg-aktif-white`-style utilities, but the Tailwind config
only defines the **`aktibo`** namespace — there is no `aktif` colour scale. Those classes compile
to nothing, so the affected elements render unstyled (e.g. the primary button in
`components/ui/Button.tsx` has no gold background). Affected: `Button.tsx`, `Input.tsx`, and the
Login/Register/ForgotPassword plus all Student/Instructor CRUD pages. When restyling, use
`bg-aktibo-gold` / `bg-aktibo-white` or an arbitrary hex value (`#ffb700`, `#000e53`).

### Other known rough edges

- Navbar's post-signup `Pricing` link points at `/pricing`, which has no route → falls through to
  `NotFound`.
- There is no auth. Every page is reachable without login; `signedIn` is a hardcoded prop, and the
  signed-in user name is a literal.
- Pages carry placeholder data inline (e.g. `COURSES` in `StudentView.tsx`) instead of fetching.
- `Login`/`Register`/`ForgotPassword` are visually much simpler than the Figma-matched pages.

## Working conventions

- After **any** frontend change, run `npm run build` in `frontend/` — it runs `tsc -b` first, so it
  catches type errors as well as bundling problems. `npm run lint` is cheap and worth running too.
- UI changes are verified against the Figma frames, so compare visually (screenshot via the
  Playwright MCP tools or the dev server) rather than trusting that the JSX "looks right".
- Use `fetch` through `src/services/api.ts` for backend calls; keep request/response types next to
  the client functions, matching the existing `Student`/`Instructor`/`PageResponse<T>` pattern.
- Keep the `.tsx` + Tailwind-with-`App.css` mix consistent with neighbouring files: reuse
  `components/ui` primitives rather than re-styling buttons and inputs inline.
