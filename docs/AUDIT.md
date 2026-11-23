# AktiboLMS — Full Project Audit

Prepared as the foundation for a full UI/UX overhaul (landing page → login → dashboard).
Every finding below comes from direct inspection of the repository files and verified baseline builds:

- Backend: `mvn compile` → exit 0 (Spring Boot 3.2, Java 17, Maven)
- Frontend: `npx tsc --noEmit` → exit 0 (React 18 + Vite + TypeScript + Tailwind)

Repository root for this audit: `E:/KAiRU/00 - Brain/Programming/AktiboLMS/AktiboLMS/`

---

## 1. Project Overview

**Product**: AktiboLMS — Interactive Learning Management System. Tagline: "Interactive Learning, Made Active."

**Team**: 3 third-year IT students (Nnyl Jake G. Rayos, Jhon Kyle Po, Johnler Cabo). Timeline: ~4 weeks. Budget: $0 (free tiers only).

**Problem (from README)**: Traditional LMS materials are static, text-dense modules → cognitive overload, passive consumption, student fatigue and disengagement.

**Proposed solution**: Lessons combine rich content blocks (text, video, image, code snippet) with embedded interactive activities (code exercises via Monaco Editor + Piston API; quizzes with instant feedback). Progress tracked per activity, giving instructors analytics on where students struggle.

**Stack**:
- Frontend: React 18, Vite, TypeScript, Tailwind CSS, TanStack Query (React Query), Monaco Editor, TipTap (rich text), lucide-react, zod, axios, @dnd-kit (drag-drop), @supabase/supabase-js (realtime)
- Backend: Spring Boot 3.2.0, Java 17, Maven, Spring Security + JWT (jjwt 0.12.3), Spring Data JPA/Hibernate 6, Flyway migrations, PostgreSQL (Supabase), httpclient5 (Piston API proxy), MapStruct (declared, unused), Lombok, Testcontainers + JUnit (declared, no tests written)
- Infrastructure: Vercel (FE), Render (BE), Supabase (DB/Auth/Realtime), Piston API (code execution)
- Auth model: Users table with bcrypt passwords + Spring Security JWT; design doc also mentions Supabase auth.users sync (contradiction — see §10)

**Context-path**: `/api` (backend `application.yml: server.servlet.context-path=/api`). No `/api/v1` versioning in code despite README specifying it.

---

## 2. Repository Layout

```
AktiboLMS/                          (project root)
├── README.md                       (full design doc: architecture, API spec, DB schema, 4-week plan)
├── CLAUDE.md                       (agent guidance: commands, conventions, endpoint list)
├── backend/                        (Spring Boot app)
│   ├── pom.xml
│   ├── src/main/resources/application.yml
│   ├── src/main/resources/db/migration/V1__initial_schema.sql
│   └── src/main/java/com/aktibolms/
│       ├── config/                 AuthRateLimitFilter
│       ├── controller/             9 controllers (Auth, Course, Module, Lesson, ContentBlock, Activity, Progress, CodeExecution, InstructorAnalytics)
│       ├── service/                7 services
│       ├── repository/             10 JPA repositories
│       ├── entity/                 11 JPA entities
│       ├── dto/request/            11 request DTOs
│       ├── dto/response/           10 response DTOs
│       ├── security/               JwtUtil, JwtAuthenticationFilter, CustomUserDetails, CustomUserDetailsService
│       └── exception/              ApiException, GlobalExceptionHandler
│   └── src/test/                   MISSING (no tests exist despite test deps in pom.xml)
├── frontend/                       (Vite React TS app)
│   ├── vite.config.ts              (port 3000, /api proxy → localhost:8080, @ alias)
│   ├── tailwind.config.js
│   ├── index.html
│   └── src/
│       ├── main.tsx                (QueryClient + BrowserRouter + AuthProvider + App)
│       ├── App.tsx                 (React Router v6 routes)
│       ├── services/api.ts         (axios instance, auth + 401 refresh interceptors)
│       ├── hooks/                  useAuth, useCourses, useModules, useLesson, useContentBlocks, useActivities, useCodeExecution, useRealtime
│       ├── types/index.ts          (shared TS interfaces)
│       ├── components/ui/          Button, Input, Card, Badge, Modal (design system)
│       ├── components/layout/      Layout, Navbar
│       ├── components/editor/      CodeEditor (Monaco), RichTextEditor (TipTap)
│       ├── components/lesson/      ContentBlock, ActivityBlock
│       ├── components/auth/        PrivateRoute
│       ├── pages/auth/             Login, Register
│       ├── pages/student/          Dashboard, Catalog, MyCourses, CourseView, LessonView, Progress
│       └── pages/instructor/       Dashboard, CourseBuilder, Analytics, LessonEditor
├── .claude/worktrees/aktibolms-ui-design/  (prior UI design worktree — existing design system)
│   ├── frontend/src/index.css      (design tokens: teal brand + amber accent, dark mode, animations)
│   ├── frontend/src/components/layout/Layout.tsx, Navbar.tsx
│   ├── frontend/src/pages/auth/Login.tsx
│   ├── frontend/src/context/ThemeContext.tsx (light/dark/system)
│   └── frontend/tailwind.config.js
└── qa-report.json / qa-review-report.json  (third-party QA findings at repo root)
```

**Baseline verification**: backend compiles cleanly; frontend typechecks cleanly. Both are safe starting points for the overhaul.

---

## 3. Backend Architecture

### Controllers (all under `/api`)
| Controller | Base mapping | Key responsibilities |
|---|---|---|
| `AuthController` | `/auth` | register, login, refresh, me |
| `CourseController` | `/courses` | CRUD courses, publish, enroll, list published, my/enrolled, get lesson |
| `ModuleController` | `/courses/{courseId}/modules` | module CRUD + reorder |
| `LessonController` | `/modules/{moduleId}/lessons` | lesson CRUD + reorder |
| `ContentBlockController` | `/lessons/{lessonId}/content-blocks` | content block CRUD + reorder |
| `ActivityController` | `/lessons/{lessonId}/activities` | activity CRUD, get activity (student strips solution) |
| `ProgressController` | `/activities` | code submit, quiz submit, lesson/course progress |
| `CodeExecutionController` | `/code` | execute code (Piston proxy), list runtimes |
| `InstructorAnalyticsController` | `/instructor` | course analytics, activity submissions (stub) |

### Security
- Spring Security, stateless sessions, CSRF disabled, CORS configured.
- `JwtAuthenticationFilter` (before `UsernamePasswordAuthenticationFilter`) validates JWT, loads user from DB, sets `SecurityContext`, and calls `request.setAttribute("userId", userId)`.
- `AuthRateLimitFilter` (before JWT filter) — rate limiting skeleton.
- `permitAll`: `/auth/register`, `/auth/login`, `/auth/refresh`, `/actuator/**`, `/courses/public/**`.
- Everything else: authenticated. Role guards via `@PreAuthorize("hasRole('INSTRUCTOR')")` / `"hasRole('STUDENT')"`.
- JWT: HS256, secret must be ≥32 bytes (JwtUtil validates at init and warns on default secret), access 15 min, refresh 7 days, refresh-token rotation with revocation + hash storage.

### Database (Flyway V1__initial_schema.sql)
`users` → `courses` → `modules` → `lessons` → (`content_blocks` JSONB, `activities` JSONB). `activity_progress` (status, score, per user+activity unique), `code_submissions`, `quiz_attempts`, `enrollments`. `uuid-ossp` extension. CHECK constraints on `role`, `type`, `status`. Indexes on FKs and `courses(instructor_id, published)`.

**Contradiction to resolve**: `users` table stores passwords + Spring Security bcrypt, but README design doc says users are synced from Supabase `auth.users` and Spring Boot validates via Supabase JWKS. The code implements local username/password auth, not Supabase JWKS.

---

## 4. Frontend Architecture

### Routing (`App.tsx`)
- Public: `/login`, `/register`
- Layout-wrapped protected routes:
  - `/` → redirects to `/dashboard`
  - Student (`PrivateRoute allowedRoles=['student']`): `/dashboard`, `/catalog`, `/my-courses`, `/courses/:courseId`, `/courses/:courseId/lessons/:lessonId`, `/progress`
  - Instructor (`PrivateRoute allowedRoles=['instructor']`): `/instructor`, `/instructor/courses/new`, `/instructor/courses/:courseId/edit`, `/instructor/courses/:courseId/analytics`
  - `*` → `/`
- Note: Navbar links to `/my-courses` but no route exists for it (QA low finding).

### Data layer
- `services/api.ts`: axios baseURL `/api` (or `VITE_API_URL`). Request interceptor attaches `Bearer <accessToken>` from `localStorage`. Response interceptor: on 401, calls `/auth/refresh`, retries; on refresh failure, removes tokens and dispatches `window` event `auth:logout`.
- `hooks/useAuth.tsx`: `AuthContext` with `user`, `loading`, `login`, `register`, `logout`, `refreshUser`. Tokens stored in `localStorage` (`accessToken`, `refreshToken`). `refreshUser` calls `GET /auth/me`. On mount with a token, auto-refreshes user. Listens to `auth:logout` event.
- TanStack Query `QueryClient` (staleTime 5 min, retry 1, `refetchOnWindowFocus: false`) created at module level in `main.tsx`, wrapped in `QueryClientProvider` + `AuthProvider` + `BrowserRouter`.

### Components
- UI design system: `Button` (variants primary/secondary/outline/danger/ghost, sizes sm/md/lg, loading state), `Input` (label, error, helperText, icon), `Card` (+Header/Body/Footer), `Badge` (memoized), `Modal` (dialog, sizes sm–full).
- Layout: `Layout` (Navbar + main + content-wrapper + Outlet), `Navbar` (role-aware links, theme toggle, user dropdown, mobile menu).
- Editors: `CodeEditor` (Monaco, lazy), `RichTextEditor` (TipTap).
- Lesson: `ContentBlock`, `ActivityBlock` (handles code_exercise + quiz in one component).
- Pages: auth (Login, Register); student (Dashboard, Catalog, MyCourses, CourseView, LessonView, Progress); instructor (Dashboard, CourseBuilder, Analytics, LessonEditor).

### Types (`types/index.ts`)
`User`, `Course`, `Module`, `Lesson`, `ContentBlock`, `ContentBlockContent`, `Activity`, `ActivityConfig`, `TestCase`, `QuizQuestion`, `ActivityProgress`, `CodeSubmission`, `QuizAttempt`, `Enrollment`, `CourseAnalytics`, `ActivityAnalytics`, `PaginatedResponse<T>`, `ApiError`.

**Note**: `User` is duplicated in `hooks/useAuth.tsx` (missing `avatarUrl?`, `createdAt`, different field naming) — QA high finding.

---

## 5. Existing Design System (UI design worktree)

`.claude/worktrees/aktibolms-ui-design/` contains a completed design system that the main frontend does NOT yet use:
- `frontend/src/index.css`: full design-token layer (CSS custom properties) — teal brand (`--color-brand-600: #0d9488`), amber accent, light/dark themes, buttons/inputs/cards/progress-rings/lesson content/Monaco/TipTap styling, nav, sidebar, modal, toast, empty-state, skeleton, keyframe animations (fadeIn, slideUp, slideDown, scaleIn, shimmer).
- `tailwind.config.js`: matching token map (`brand`, `accent`, `success`, `warning`, `error`, `info` color scales; custom spacing, radius, shadows, animations, keyframes).
- `ThemeContext.tsx`: light/dark/system theme with `localStorage` persistence.
- `Navbar.tsx`, `Layout.tsx`, `Login.tsx`: role-aware nav, theme toggle, user avatar dropdown.

**Relevance to overhaul**: This is the current "generic" design to replace. The token system and animation primitives are reusable building blocks, but the visual direction needs to change per the user's request (modern, smooth-animation, non-generic).

---

## 6. Backend Endpoint Inventory

Base path: `/api` (context-path set in `application.yml`). Total: 45 controller mappings + actuator.

| # | Method | Path | Controller | Auth | Purpose |
|---|---|---|---|---|---|
| 1 | POST | `/auth/register` | AuthController | permitAll | Register user, issue access + refresh JWT |
| 2 | POST | `/auth/login` | AuthController | permitAll | Login, issue access + refresh JWT |
| 3 | POST | `/auth/refresh` | AuthController | permitAll | Refresh access token (rotation + revoke old) |
| 4 | GET | `/auth/me` | AuthController | authenticated | Current user profile |
| 5 | POST | `/courses` | CourseController | INSTRUCTOR | Create course |
| 6 | GET | `/courses/public` | CourseController | permitAll | List published courses (paginated) |
| 7 | GET | `/courses/public/search` | CourseController | permitAll | Search published courses |
| 8 | GET | `/courses/my` | CourseController | INSTRUCTOR | Instructor's own courses |
| 9 | GET | `/courses/enrolled` | CourseController | STUDENT | Student's enrolled courses w/ progress |
| 10 | GET | `/courses/{id}` | CourseController | **(none!)** | Get course with modules/lessons |
| 11 | GET | `/courses/{courseId}/lessons/{lessonId}` | CourseController | **(none!)** | Get lesson (duplicates #23) |
| 12 | PUT | `/courses/{id}` | CourseController | INSTRUCTOR | Update course |
| 13 | DELETE | `/courses/{id}` | CourseController | INSTRUCTOR | Delete course |
| 14 | POST | `/courses/{id}/publish` | CourseController | INSTRUCTOR | Publish course (no unpublish counterpart) |
| 15 | POST | `/courses/{id}/enroll` | CourseController | STUDENT | Enroll in course |
| 16 | GET | `/courses/{courseId}/modules` | ModuleController | **(none!)** | List modules of a course |
| 17 | GET | `/courses/{courseId}/modules/{moduleId}` | ModuleController | **(none!)** | Get a module |
| 18 | POST | `/courses/{courseId}/modules` | ModuleController | INSTRUCTOR | Create module |
| 19 | PUT | `/courses/{courseId}/modules/{moduleId}` | ModuleController | INSTRUCTOR | Update module |
| 20 | DELETE | `/courses/{courseId}/modules/{moduleId}` | ModuleController | INSTRUCTOR | Delete module |
| 21 | PUT | `/courses/{courseId}/modules/reorder` | ModuleController | INSTRUCTOR | Reorder modules |
| 22 | GET | `/modules/{moduleId}/lessons` | LessonController | **(none!)** | List lessons of a module |
| 23 | GET | `/modules/{moduleId}/lessons/{lessonId}` | LessonController | **(none!)** | Get lesson with blocks + activities |
| 24 | POST | `/modules/{moduleId}/lessons` | LessonController | INSTRUCTOR | Create lesson |
| 25 | PUT | `/modules/{moduleId}/lessons/{lessonId}` | LessonController | INSTRUCTOR | Update lesson |
| 26 | DELETE | `/modules/{moduleId}/lessons/{lessonId}` | LessonController | INSTRUCTOR | Delete lesson |
| 27 | PUT | `/modules/{moduleId}/lessons/reorder` | LessonController | INSTRUCTOR | Reorder lessons |
| 28 | GET | `/lessons/{lessonId}/content-blocks` | ContentBlockController | **(none!)** | List content blocks |
| 29 | POST | `/lessons/{lessonId}/content-blocks` | ContentBlockController | INSTRUCTOR | Create content block |
| 30 | PUT | `/lessons/{lessonId}/content-blocks/{blockId}` | ContentBlockController | INSTRUCTOR | Update content block |
| 31 | DELETE | `/lessons/{lessonId}/content-blocks/{blockId}` | ContentBlockController | INSTRUCTOR | Delete content block |
| 32 | PUT | `/lessons/{lessonId}/content-blocks/reorder` | ContentBlockController | INSTRUCTOR | Reorder content blocks |
| 33 | GET | `/lessons/{lessonId}/activities` | ActivityController | **(none!)** | List activities |
| 34 | POST | `/lessons/{lessonId}/activities` | ActivityController | INSTRUCTOR | Create activity |
| 35 | PUT | `/lessons/{lessonId}/activities/{activityId}` | ActivityController | INSTRUCTOR | Update activity |
| 36 | DELETE | `/lessons/{lessonId}/activities/{activityId}` | ActivityController | INSTRUCTOR | Delete activity |
| 37 | GET | `/lessons/{lessonId}/activities/{activityId}` | ActivityController | authenticated | Get activity (student strips solution/test cases) |
| 38 | POST | `/activities/{activityId}/code/submit` | ProgressController | STUDENT | Execute code + save submission + update progress |
| 39 | POST | `/activities/{activityId}/quiz/submit` | ProgressController | STUDENT | Submit quiz answers |
| 40 | GET | `/activities/progress/lesson/{lessonId}` | ProgressController | STUDENT | Student progress for a lesson |
| 41 | GET | `/activities/progress/course/{courseId}` | ProgressController | STUDENT | Student progress for a course |
| 42 | POST | `/code/execute` | CodeExecutionController | **(none!)** | Execute arbitrary code via Piston (PUBLIC) |
| 43 | GET | `/code/runtimes` | CodeExecutionController | **(none!)** | Hardcoded list of Piston runtimes |
| 44 | GET | `/instructor/courses/{courseId}/analytics` | InstructorAnalyticsController | INSTRUCTOR | Course analytics |
| 45 | GET | `/instructor/activities/{activityId}/submissions` | InstructorAnalyticsController | INSTRUCTOR | **STUB** — returns empty 200, no data |
| 46 | GET | `/actuator/health` (also `/info`, `/metrics`) | Actuator | permitAll | Health/metrics |

---

## 7. Endpoint Redundancy & Cleanup Analysis

### REMOVE
| # | Endpoint | Reason |
|---|---|---|
| 42 | `POST /code/execute` | **Public (no auth)** — allows unauthenticated arbitrary code execution via Piston. Its logic (call Piston + return output) is already inside #38 (`/activities/{id}/code/submit`) which is authenticated and scoped to an activity. Standalone execution has no place in an LMS. Remove; keep execution only inside the activity-submit flow. |
| 11 | `GET /courses/{courseId}/lessons/{lessonId}` (CourseController) | Duplicates #23 `GET /modules/{moduleId}/lessons/{lessonId}` in LessonController (same data: lesson with content blocks + activities). Keep the LessonController path as canonical; remove the CourseController duplicate. |

### KEEP BUT FIX
| # | Endpoint | Required fix |
|---|---|---|
| 10 | `GET /courses/{id}` | No `@PreAuthorize` and no enrollment check → any user (or anonymous, since SecurityConfig only requires authenticated for non-listed paths... actually `anyRequest().authenticated()` applies) can fetch any course including unpublished ones. Add authorization: instructors own it; students only if enrolled + course published. |
| 16,17,22,23,28,33 | List/get modules/lessons/blocks/activities | No auth annotation. These are read-only and feed public catalog/lesson views, which is fine, BUT they leak content of unpublished courses. Scope them: public only for published courses; otherwise require enrollment/instructor role. |
| 14 | `POST /courses/{id}/publish` | Publish-only, no unpublish. Add `POST /courses/{id}/unpublish` for symmetry, or make it a toggle. |
| 43 | `GET /code/runtimes` | Hardcoded runtime list drifts from Piston. Either proxy Piston's `/runtimes` or remove if the frontend calls Pinton directly. Low priority. |
| 45 | `GET /instructor/activities/{activityId}/submissions` | TODO stub returning empty 200 OK — misleading to clients. Implement with `CodeSubmissionRepository` + `QuizAttemptRepository`, or remove until implemented. |
| All | Versioning | Code uses `/api` but README specifies `/api/v1`. Add versioned prefix (`/api/v1/...`) now before clients depend on unversioned paths. |

### KEEP (no change)
Auth endpoints (1–4), course CRUD (5, 12, 13, 15), publish (14 with fix above), module/lesson/block/activity CRUD & reorder (18–21, 24–27, 29–32, 34–36), activity get-with-solution-stripping (37), code/quiz submit (38, 39), progress (40, 41), course analytics (44), actuator (46).

### Net effect
45 → ~41 endpoints after removing #42 and #11; +1 unpublish endpoint; versioning prefix added to all.

---

## 8. QA Findings Summary

Two QA reports exist at the repo root (`qa-report.json` frontend, `qa-review-report.json` backend). Key findings:

**Frontend — Critical (4)**:
1. XSS in `RichTextEditor.tsx:204` — `dangerouslySetInnerHTML` without DOMPurify sanitization (dompurify is a root dependency but unused).
2. `useRealtime.ts` — extensive `any` types defeat TypeScript safety.
3. `LessonView.tsx:165` — `useState` imported at bottom of file (violates React hooks rules / ESLint).
4. `ContentBlock.tsx` — empty `onChange={}}` handlers + `readOnly` hardcoded `true` in `StudentLessonView`, making editors non-functional.

**Frontend — High (8)**: duplicate `User` interface (types vs useAuth); `ActivityBlock.onSubmit` typed `data: any`; `JSON.parse` without try/catch in `ActivityBlock`; inline `useCourse` hook in `CourseBuilder` duplicating `useCourses.ts`; `any[]` for nested arrays in `CourseBuilder`; tokens in `localStorage` (XSS theft risk); `useAuth` called inside `PrivateRoute` per-route (re-renders).

**Backend — Critical (5)**: no test coverage at all (`src/test` missing); hardcoded default JWT secret in `application.yml:49`; N+1 queries in `LessonController.toResponse()`; N+1 in `InstructorAnalyticsService.getActivityStats()`; inefficient `IN` subquery in `CourseRepository`.

**Backend — High (8)**: missing `@Valid` on Course/Module/Lesson/Activity request bodies; `getActivitySubmissions` returns empty 200; `CodeExecutionController.executeCode` publicly accessible (no auth/rate limit); refresh-token rotation discrepancy (QA claims missing; code shows revoke+reissue — verify); no rate limiting on login/register/refresh; `JwtAuthenticationFilter` swallows exceptions silently (invalid token → anonymous, no 401); duplicate auth checks in controller + service; error responses leak internal exception details.

---

## 9. Gaps vs Design Doc (README)

| Design doc claim | Actual code | Gap |
|---|---|---|
| config/: WebConfig, CorsConfig, SupabaseConfig | only SecurityConfig + AuthRateLimitFilter | Supabase JWKS validation not implemented |
| services/auth.ts, services/supabase.ts | only services/api.ts | Supabase realtime client not integrated as service |
| frontend components/dashboard/ (ProgressChart, ActivityList, CourseCard) | missing | dashboard components not built |
| instructor StudentList page | missing | not built |
| API versioning `/api/v1` | `/api` only | not implemented |
| RLS-enabled schema | not enabled | design doc says RLS-ready, not applied |
| Supabase auth.users sync | local `users` + bcrypt | auth model contradicts doc |
| TanStack Query optimistic updates | not implemented | used for plain fetching only |

---

## 10. Recommended Pre-Overhaul Cleanup (before touching UI)

1. Remove public `/code/execute`; move execution into authenticated activity-submit flow.
2. Add `@Valid` to all mutating controller endpoints; add enrollment/publish authorization checks.
3. Add `/api/v1` versioning prefix.
4. Implement or delete `/instructor/activities/{id}/submissions`; add `/courses/{id}/unpublish`.
5. Write backend tests (JUnit + Testcontainers are in pom.xml but unused).
6. Fix frontend criticals: DOMPurify sanitization, `any` types in useRealtime, hooks-rule import order, readOnly editor wiring.
7. Reconcile auth model (local JWT vs Supabase JWKS sync) before connecting new UI.

These are backend concerns; they do not block the UI/UX overhaul but the new frontend must consume the corrected endpoint set documented in `ENDPOINT-AUDIT.md`.

---

**Next document**: `UI-UX-CONCEPT.md` — the new design system and page specs for the overhaul. **Prototype**: `docs/prototypes/landing.html` — coded landing page.
