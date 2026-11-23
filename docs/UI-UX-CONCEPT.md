# AktiboLMS — New UI/UX Concept

Design direction for the full overhaul: **landing page → login → dashboard**.
Built from the project audit (`AUDIT.md`, `ENDPOINT-AUDIT.md`) and the existing design-system worktree (`.claude/worktrees/aktibolms-ui-design/`).

Method notes: applies the `claude-design` surface-first rule and the `popular-web-designs` visual vocabulary (Linear/Vercel/Stripe-style precision, not clone). Coded prototype at `docs/prototypes/landing.html`.

---

## 1. Design Brief

**Goal**: Replace the generic, corporate-feeling LMS UI with a modern, active, learning-first interface: smooth motion, clear affordances, immediate feedback, calm for long study sessions, distinctive (not Bootstrap-generic).

**Audience**: students (learn by doing) and instructors (build courses, see where students struggle).

**Surface assignments (per claude-design)**:
- **Landing page** = Decide/Learn surface. One idea per section; hero is correct here.
- **Login/Register** = Configure surface. Progressive disclosure, clear validation states, low decoration.
- **Dashboards** = Monitor surface. Density and glanceability beat marketing framing. No hero, no feature cards.
- **Lesson view** = Operate surface. The student is acting on content (read, code, quiz). Action affordances dominate.
- **Course Builder** = Configure surface. Instructor sets up modules/lessons/blocks; progressive disclosure.

---

## 2. Design Philosophy

1. **Active, not static**: micro-motion on state changes (progress rings filling, buttons depressing, toast slides), immediate feedback after quiz/code submit.
2. **Calm tech**: easy on the eyes for long sessions. Dark mode first (study-friendly), high legibility, restrained accent use.
3. **One accent**: brand teal for trust/interactive, amber only for "active" moments (continue, resume, in-progress). No rainbow palette.
4. **Content first**: typography and spacing carry hierarchy before boxes, icons, or color.
5. **Respect reduced motion**: all non-trivial animation gated on `prefers-reduced-motion: reduce`.

---

## 3. Design Tokens (extend the existing worktree tokens)

Colors (CSS custom properties, light + dark):
- `--color-brand` teal: primary actions, interactive elements, links
- `--color-accent` amber: progress, "continue/resume", active states, CTAs
- `--color-success` emerald: completed, passed
- `--color-warning` amber: in-progress, draft
- `--color-error` rose: failed, invalid
- `--color-info` sky: hints, notifications
- Surface: `--bg-primary` (page), `--bg-secondary` (cards), `--bg-tertiary` (hover areas)
- Foreground: `--fg-primary` (headings), `--fg-secondary` (body), `--fg-tertiary` (muted), `--fg-muted` (captions)
- Borders: `--border-primary`, `--border-focus` (brand)
- Shadows: `--shadow-sm/md/lg/xl` per theme

Type:
- Sans: Inter (headings + body), humanist, `text-wrap: pretty` for headings
- Mono: JetBrains Mono (code, numbers, stats, lesson line numbers)
- Scale: xs 0.75rem → 4xl 2.25rem; leading snug for headings, relaxed for body

Motion posture:
- Fast 120ms: button press, focus ring, toast slide
- Base 200ms: page fade-in, dropdown, modal open
- Slow 300–500ms: progress ring fill, section reveal on scroll, drawer slide
- Easing: ease-out for exits, cubic-bezier(0.4, 0, 0.2, 1) for entrances

---

## 4. Page Specs

### A. Landing page (`/`) — Decide/Learn surface
No existing route (App.tsx redirects `/` → `/dashboard`). New public page.

Sections (one idea each):
1. **Nav** — logo (left), "Start learning" / "Teach" (right), theme toggle. Sticky, blur background.
2. **Hero** — bold statement of the active-learning promise + primary CTA ("Start a course" student / "Build a course" instructor) + secondary ("Log in"). One H1, one line of subcopy. No stock illustration; typography + one geometric accent shape.
3. **How it works** — 3 staggered steps (Read → Practice → Progress), not equal feature cards. Numbers lead.
4. **For students** — catalog preview: course cards with progress bar, instructor badge, "Start lesson".
5. **For instructors** — course builder preview: module/lesson hierarchy, activity creation, analytics glance.
6. **Footer** — links, copyright, no fake testimonials or decorative metrics.

Key interactions:
- Hover lift on cards (2px), brand accent underline on links.
- Scroll-reveal fade-in-up (Intersection Observer), staggered per section.
- `prefers-reduced-motion` → reveal disabled, instant opacity.

### B. Login (`/login`) — Configure surface
Centered card (max 440px), full-bleed dark background with subtle brand gradient glow (decorative, minimal).

Fields: email, password. Password toggle visibility. Inline validation (empty, format). Role is NOT chosen at login (role comes from account). Error toast/banner below button.

Actions:
- Primary "Sign in" (brand, loading state with spinner).
- Secondary "Create account" → `/register`.
- Role-based redirect after success: instructor → `/instructor`, student → `/dashboard` (existing Login.tsx already does this; keep).

### C. Register (`/register`) — Configure surface
Same card pattern as login. Fields: full name, email, password, confirm password, role (student/instructor selector — segmented control, not dropdown).

Validation:
- Passwords match, ≥8 chars (enforce complexity per QA password finding — note for backend too).
- Real-time inline errors, not only on submit.

Post-register: auto-login, role-based redirect.

### D. Student Dashboard (`/dashboard`) — Monitor surface
Current Dashboard.tsx uses hardcoded mock data → replace with real hooks (`useEnrolledCourses`).

Layout:
- Header: "Welcome back, {first name}" + continue CTA.
- Stat cards (glanceable): courses enrolled, lessons completed, avg progress — small numbers, not monument stats.
- "Continue learning" row: up to 3 course cards with progress rings (animated fill), module count, resume button.
- Empty state: gentle CTA to catalog ("No courses yet — browse the catalog"), not an empty table.
- Quick actions row: Browse courses, View progress, Settings.

Motion:
- Cards fade in staggered on mount; progress rings animate to value over 600ms.

### E. Instructor Dashboard (`/instructor`) — Monitor surface
Current InstructorDashboard.tsx is table-driven; keep table but modernize.

Layout:
- Header: title + "Create course" primary button.
- Stat cards: total courses, total students, avg completion.
- Course table: title, status badge (published/draft), students count, progress bar, actions (Edit, Analytics).
- Empty state: "No courses yet — create your first course."

Analytics page (`/instructor/courses/:id/analytics`):
- Completion rate donut, per-activity bar chart (attempts vs completions), common failures list.
- Data-dense but no fake metrics; empty states when no attempts.

### F. Course Catalog (`/catalog`) — Explore surface
Published course grid, filter by category/level, search. Course card: thumbnail placeholder (typographic, not stock image), title, instructor, module count, enrolled count, free badge.

### G. Lesson View (`/courses/:courseId/lessons/:lessonId`) — Operate surface
Two-column (desktop): content column + activity rail (mobile: single column).

Content: blocks rendered in order (text, video, image, code snippet). Between blocks, activities appear inline — code exercise (Monaco editor + run button) or quiz (options, immediate feedback, explanation after answer).

Progress: activity status chip per activity (not started → in progress → completed), lesson progress bar.

### H. Course Builder (`/instructor/courses/:id/edit`) — Configure surface
Left: course outline (modules → lessons, drag-reorder via @dnd-kit already installed). Right: active editor for selected item (module title, lesson content blocks, activity config).

Progressive disclosure: show "Add content block" / "Add activity" only when a lesson is selected.

---

## 5. Navigation & Information Architecture

Top nav (signed out): logo, "For students", "For instructors", "Log in", "Sign up".
Top nav (signed in): logo, role-based links (student: Dashboard / My Courses / Catalog / Progress; instructor: Dashboard / Courses / Analytics), theme toggle, user avatar + dropdown (profile, sign out).

Routes after overhaul:
- `/` → Landing (public)
- `/login`, `/register` (public)
- `/dashboard` (student), `/catalog`, `/my-courses`, `/courses/:courseId`, `/courses/:courseId/lessons/:lessonId`, `/progress`
- `/instructor`, `/instructor/courses/new`, `/instructor/courses/:courseId/edit`, `/instructor/courses/:courseId/analytics`

---

## 6. Motion & Animation Spec

| Motion | When | Duration | Easing | Reduced motion |
|---|---|---|---|---|
| Page fade-in | route change | 200ms | ease-out | 20ms |
| Card hover lift | hover | 150ms | ease-out | none (transform off) |
| Button press | active | 100ms | ease-out | none |
| Progress ring fill | value change | 600ms | ease-out | instant fill |
| Scroll reveal | enter viewport | 500ms | cubic-bezier | instant opacity |
| Toast slide | appear/dismiss | 200ms | ease-out | 50ms |
| Modal open | click | 250ms | ease-out | 50ms |
| Dropdown | open | 120ms | ease-out | 20ms |

No looping background animations, no hero video autoplay with sound, no gradient mesh backgrounds.

---

## 7. Accessibility & Responsive

- All interactive targets ≥ 44px touch size.
- Real `:focus-visible` rings (brand color), never `outline: none` without replacement.
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<h1>` per page, `<label>` on inputs, `aria-*` on dropdowns/modals.
- Color contrast ≥ 4.5:1 for body text, 3:1 for large text (both themes).
- Responsive: single column ≤ 640px, two-column 640–1024px, three-column > 1024px. Nav collapses to drawer on mobile.
- `prefers-reduced-motion: reduce` globally disables non-essential animation.

---

## 8. Study-Note Mapping → Frontend Files

Study notes are embedded as comments in these frontend files:
- `frontend/src/App.tsx` — routing structure, how to add a route, role guarding
- `frontend/src/services/api.ts` — axios instance, auth interceptors, 401 refresh flow
- `frontend/src/hooks/useAuth.tsx` — auth context, token storage, login/register/logout
- `frontend/src/types/index.ts` — all shared TS interfaces (data model)
- `frontend/src/pages/auth/Login.tsx` — login flow, role-based redirect
- `frontend/src/pages/auth/Register.tsx` — registration, validation, role select
- `frontend/src/components/layout/Layout.tsx` + `Navbar.tsx` — app shell, nav
- `frontend/src/components/ui/Button.tsx`, `Input.tsx`, `Card.tsx`, `Badge.tsx`, `Modal.tsx` — design system components
- `frontend/src/pages/student/Dashboard.tsx` + `frontend/src/pages/instructor/Dashboard.tsx` — dashboard patterns to replace with real data
- `frontend/src/main.tsx` — provider composition (QueryClient + AuthProvider + BrowserRouter)

Each annotated file explains: what it does, how data flows through it, where the API contract lives, and what to change for the new UI.

---

## 9. Immediate Next Steps

1. Code review the landing prototype: `docs/prototypes/landing.html`.
2. Annotate frontend source files with study notes (see §8).
3. Implement new routes in `App.tsx` (`/` landing) while keeping existing auth routes.
4. Wire dashboard hooks to real API (`/courses/enrolled`, `/courses/my`, progress endpoints).
5. Apply endpoint verdicts from `ENDPOINT-AUDIT.md` before connecting new UI to backend.
