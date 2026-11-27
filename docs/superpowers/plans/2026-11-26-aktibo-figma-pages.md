# AKTIBOLMS Figma Pages Implementation Plan

> **For agentic workers:** Execute screens one at a time. Do not start the next screen until the current screen passes its Figma, backend-readiness, interaction, accessibility, and verification checks.

**Goal:** Implement and organize every remaining AKTIBOLMS Figma screen as a polished, responsive, frontend-only experience that can connect to the backend-only branch without invented product data.

**Architecture:** Keep page-specific views in React route components and reuse the existing shared navigation, footer, design tokens, and small UI primitives. Add or extend API adapter methods only from verified backend endpoints and DTOs; use explicit loading, empty, unavailable, error, and success states where supported. Track the screen inventory and verification evidence in `docs/frontend-implementation.md`.

**Tech Stack:** React, TypeScript, Vite, React Router DOM, Tailwind CSS, oxlint, and the installed Playwright test dependency.

**Spec:** User direction in this session; Figma file `pbwH8HfRI2LyN2nJI9IKID`; per-screen frames are listed below and in `docs/frontend-implementation.md`.

## Global Constraints

- Work desktop-first; match the Figma desktop composition and adapt to narrow widths without horizontal page overflow.
- Complete one screen before moving to another.
- Never present hardcoded Figma sample values as backend values.
- Do not invent API routes, DTO fields, course/role options, authentication success, email delivery, support submission, or profile identity.
- Temporary mock profile data remains behind `VITE_ENABLE_MOCK_DATA`; `.env.example` keeps the documented default `false` and the profile page must label enabled mock data.
- Reuse existing design tokens, shared header/footer, components, and local assets where they match Figma.
- Motion and transitions must be restrained, interruptible, and respect `prefers-reduced-motion`.
- Each visible control must have intentional, accessible behavior; disabled/unavailable actions must explain their state.
- Update `docs/frontend-implementation.md` with contract decisions, changed files, verification, and remaining blockers.

## Review Focus

- Missing authentication/course/session endpoints: the visible UI must not simulate a successful backend action; add a contract-state test to the owning auth or registration task.
- Empty or unavailable student identity: profile screens must not guess a student ID; add a test for no current-user identity to the profile task.
- Missing/empty server-sourced course or role lists: the form must not insert fake options; add an empty-options test to the owning selection screen.
- Invalid, mismatched, or incomplete credentials: preserve entered values where safe, expose accessible field-level feedback, and avoid a fake success state; test invalid email, minimum password, and password mismatch in registration/reset tasks.
- Narrow viewport and reduced-motion preference: no horizontal overflow and no essential information hidden by animation; test responsive widths and reduced-motion behavior as part of each page task.

---

### Task 1: Establish the screen and contract ledger

**Files:**
- Modify: `docs/frontend-implementation.md`
- Inspect: backend-only branch, Figma frames, `frontend/src/App.tsx`, `frontend/src/lib/backendAdapter.ts`

**Interfaces:**
- Produces: verified screen/frame inventory, verified API/DTO notes, and per-screen acceptance status in `docs/frontend-implementation.md`.

- [x] Capture the existing route table, profile DTO, mock-data switch, and known Figma desktop frame IDs.
- [x] Record the Login screenshot and measured frame geometry; record Registration current-vs-target geometry.
- [x] Verify registration/course/auth contracts from the backend-only branch; record missing role, email verification/reset, profile identity/session, and support contracts explicitly.

### Task 2: Finish Registration (`25:44`)

**Files:**
- Modify: `frontend/src/pages/Register.tsx`
- Modify only if confirmed by Task 1: `frontend/src/lib/backendAdapter.ts` and `frontend/src/lib/*` for registration/course client methods
- Test: `frontend/tests/register.spec.ts` (add Playwright configuration/script only if needed)
- Modify: `docs/frontend-implementation.md`

**Interfaces:**
- Consumes: `POST /api/students` with `StudentRequest` (`studentId`, `firstName`, `lastName`, `email`, `password`, optional `description`); response is `201 StudentResponse`. `GET /api/courses` is catalog-only and does not save enrollment. No phone, course-enrollment, login, or auth-session fields/endpoints are supported.
- Produces: a Figma-proportioned, responsive registration route with blank controlled values, required Student ID, first/last name, email, password and confirmation; optional description; API-backed create behavior with accurate no-auth/email notice.

- [x] Add browser coverage for the backend-supported field set, blank initial values, and 1440 × 1024 card geometry (target 1180 × 720px at x=130, y=140).
- [x] Add tests that password mismatch is blocked, course/phone are not presented as persisted values, and success follows only HTTP `201`; cover `400` field validation, `409` duplicate conflicts, and network failure.
- [x] Implement the backend-supported fields and 1180 × 720px desktop card. Preserve the Figma's two-column layout; omit Course/Phone because the backend cannot persist them, and do not claim email verification or login when the student record is created.
- [x] Verify desktop screenshot/runtime geometry, narrow viewport overflow, validation and network states, `npm run build`, and `npm run lint`; update the tracker before proceeding. Lint reports the unrelated existing AccountProfile warning at line 24.

### Task 3: Complete authentication and recovery screens

**Frames:** Login `24:7` (implemented; retain and re-verify after shared changes), Password Recovery `34:143`, Reset link sent `142:333`, Verify email `174:942`, Set new password `174:824`, Password updated `174:883`.

**Files:** `frontend/src/pages/Login.tsx`, `ForgotPassword.tsx`, new route components as needed, `frontend/src/App.tsx`, auth API adapter only when backend contracts are confirmed, tests, and the tracker.

- [x] Finish one frame/state at a time, matching Figma content/layout and mapping only to confirmed auth endpoints.
- [x] For absent endpoints, show a clear unavailable state rather than claiming an email or password change succeeded.
- [x] Test blank form, visibility controls, invalid input, pending/error states, successful response behavior only when a real contract exists, and navigation links.
- [x] Password Recovery `34:143` complete: Figma geometry, blank email field, test-only sample helper, no-request/no-success state, keyboard order, and 320–1440px widths verified by five Playwright cases.
- [x] Verify each frame at desktop and narrow viewport; update the tracker after each individual screen is complete. Login `24:7`, Reset link sent `142:333`, Verify email `174:942`, Set new password `174:824`, and Password updated `174:883` are all implemented, with `tests/recovery-flow.spec.ts` (14/14) and `tests/recovery-flow.disconnected.spec.ts` (4/4) covering the no-email, no-reset-service states.

### Task 4: Complete role and account screens

**Frames:** Choose your role `149:2`, student Account Profile `92:49`, instructor Account Profile `142:478`, Edit profile `174:450`, Security `174:637`.

**Files:** `frontend/src/pages/AccountProfile.tsx`, new page components as needed, `frontend/src/App.tsx`, `frontend/src/lib/backendAdapter.ts`, tests, and the tracker.

- [x] Resolve role and session identity from confirmed backend contracts; do not assume a role or student ID.
- [x] Keep student profile DTO fields aligned to the backend (`id`, `studentId`, `firstName`, `lastName`, `email`, optional `description`, `isActive`, `createdAt`, `updatedAt`); do not display unsupported fields as real data.
- [x] Implement edit/security actions only when confirmed API contracts exist; otherwise provide accurate unavailable states.
- [x] Test empty identity, missing optional fields, backend errors, valid updates, and no fabricated profile data.
- [x] Complete visual and accessibility verification per screen before moving on.
- [x] Choose your role `149:2` complete: 1080 × 600px panel at x=180, y=161.5, both role cards and buttons, `BACK TO SIGN IN` link, and the closing note. Choices route to the two workspaces, make no API call, and the screen states that roles are not saved yet. Five Playwright cases pass.
- [x] Instructor Account Profile `142:478` complete: 208px introduction band, 312px sidebar, 952 × 613px details card at x=416, y=352. The Figma sample identity is never shown; identity fields render as unavailable and edit/security actions report the missing instructor endpoints. Six Playwright cases pass.
- [x] Student Account Profile `92:49` complete: rewritten for Figma parity — 208px introduction band, 312px sidebar, 952px details card at x=416, y=352, 219 × 219px `/assets/avatar.svg`. Values come from the loaded record and fall back to `Not available`; the Figma sample identity is never shown; the gold `TEST DATA` notice marks the local fixture. Deviation from the frame: a fourth grid row carries the backend-only Student ID and Description fields. Six Playwright cases pass, and the pre-existing `react(set-state-in-effect)` lint warning is resolved — lint is now clean.
- [x] Edit profile `174:450` complete: 176px introduction band, 288px account sidebar, 984px form card at x=384, y=312. Documented deviations, all forced by the confirmed `PUT /api/students/{id}` contract: a `Password` row is added because the endpoint validates `password` as required; Mobile number / Date of birth / Gender render as disabled inputs reading "Not stored by the backend yet"; `Display name` is read-only and derived; `USE SAMPLE CHANGES` fills the storable fields with invalid test values instead of the frame's phone/birthday/gender sample. The adapter now performs the confirmed PUT (preserving `studentId` and `description`), though the live call waits on a current-user/session endpoint. Ten Playwright cases pass plus three disconnected-state cases against a fixture-free server (`npm run test:e2e:disconnected`).
- [x] Security `174:637` complete: 176px introduction band, 288px account sidebar, 984 × 480px change-password card at x=384, y=312, 984 × 244px guidance card at y=816. The adapter gained `changePassword(profile, newPassword)` — the confirmed `PUT /api/students/{id}` is the only password write path, and the current password is deliberately never sent because the endpoint has no field for it. Documented deviations: the frame's "Prototype preview only" note is replaced with accurate service copy; the sidebar advisory is security-specific because the frame's text describes a cancel action this screen lacks; the sample helper is offered only against the local fixture so known test credentials can never be submitted to a real account service; the screen asks for 8 characters while the service accepts 6. Eleven Playwright cases pass plus three disconnected-state cases (`npm run test:e2e:disconnected`).

### Task 5: Complete pricing and support screens

**Frames:** Pricing and access `174:2`, Help and support `174:226`, Support request sent `174:1001`.

**Files:** new page components as needed, `frontend/src/App.tsx`, confirmed service adapter only when an endpoint exists, tests, and the tracker.

- [x] Source displayed prices/plans and help/support actions only from confirmed project requirements or backend data; do not invent prices or imply unimplemented purchases.
- [x] Submit support requests only to a confirmed endpoint; show the sent state only after a confirmed response.
- [x] Verify links, form behavior, responsive layout, keyboard use, reduced motion, and error/unavailable states. Pricing `174:2` lists three access tiers with no monetary price and an explicit "monetary pricing has not been defined for this project" notice; Help and support `174:226` and Support request sent `174:1001` state that no support endpoint is connected. Seven pricing cases and eight help/support cases pass.

### Task 6: Organize routes, overlays, and final verification

**Files:** `frontend/src/App.tsx`, shared UI components only where evidence calls for changes, `frontend/tests/*`, `docs/frontend-implementation.md`.

- [x] Inventory all remaining Figma overlays/variants and attach each to its owning completed screen; do not create orphaned or dead-end navigation. The three overlays are attached from design evidence: `ConfirmLogoutDialog` to both account profiles (the "Session actions → Log out" block in `92:49`), `FormValidationOverlay` to the create-course form, `SelectOptionOverlay` to the enrol screen's ENROLL COURSE action. Each is props-driven and renders an explicit empty state.
- [x] Add route handling for every implemented page and a not-found route; verify shared navigation/footer links resolve to implemented destinations or clearly marked unavailable destinations. 40 routes resolve, unknown addresses render `NotFound`, and the `stubStudentPages` stubs are removed.
- [x] Run the complete browser suite and fresh `npm run build` and `npm run lint`; resolve in-scope failures and report any pre-existing warning by file/line. `npm run test:e2e` = 180/180, `npm run test:e2e:disconnected` = 10/10, `npm run build` = exit 0 (Vite chunk-size advisory only), `npm run lint` = exit 0 with no warnings.
- [ ] Recheck every ledger entry against its Figma frame, evidence, backend contract, responsive behavior, and interaction states. Keep the mission open until every remaining Figma screen is done or a backend/design blocker is explicitly documented. Ledger entries are rechecked and recorded in `docs/frontend-implementation.md`; the remaining item is the frame-by-frame visual comparison of the 25 captured screenshots against their Figma renders.
