# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**AktiboLMS** — Interactive Learning Management System replacing static "walls of text" with rich content + embedded activities (Monaco code editor, instant-feedback quizzes). Progress tracked per-activity for actionable instructor analytics.

**Stack**: React 18 + Vite + TypeScript (frontend) | Spring Boot 3.2 + Maven (backend) | PostgreSQL (Supabase) | TanStack Query | Monaco Editor | TipTap | Tailwind CSS | Flyway migrations | JWT auth (Spring Security) | Piston API (code execution)

**Deploy**: Vercel (FE) + Render (BE) + Supabase (DB/Auth/Realtime)

---

## Common Development Commands

### Frontend (from `AktiboLMS/frontend/` directory)
```bash
npm run dev          # Start Vite dev server (port 3000, proxies /api to backend:8080)
npm run build        # Production build (tsc + vite build) → dist/
npm run preview      # Preview production build
npm run test         # Run Vitest
npm run typecheck    # TypeScript check (tsc --noEmit)
npm run lint         # ESLint (ts/tsx, max-warnings 0)
```

### Backend (from `AktiboLMS/backend/` directory)
```bash
./mvnw spring-boot:run           # Start dev server (port 8080, context-path /api)
./mvnw test                      # Run tests (JUnit + Testcontainers)
./mvnw flyway:migrate            # Run Flyway migrations (uses active Maven profile)
./mvnw flyway:clean flyway:migrate  # Reset DB + rerun migrations
./mvnw clean package -DskipTests # Build JAR
```

### Database (Supabase CLI)
```bash
supabase db push            # Push migrations to Supabase
supabase db pull            # Pull schema changes
supabase migration new <name>  # Create new migration file
supabase start              # Start local Supabase stack
```

### Environment Setup
- Backend: Copy `.env.example` → `.env` with `DATABASE_URL`, `JWT_SECRET`, `SUPABASE_*`, `PISTON_API_URL`
- Frontend: `.env.example` has `VITE_API_URL` (defaults to `/api` via Vite proxy)

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        ARCHITECTURE                             │
├─────────────────────────────────────────────────────────────────┤
│  Frontend (Vercel)          Backend (Render)         Supabase   │
│  ┌──────────────────┐       ┌──────────────────┐   ┌─────────┐  │
│  │ React 18 + Vite  │◄─────►│ Spring Boot 3    │◄─►│PostgreSQL│  │
│  │ TypeScript       │ REST  │ Maven            │   │  Auth    │  │
│  │ TanStack Query   │       │ Spring Security  │   │ Realtime │  │
│  │ Monaco Editor    │       │ Spring Data JPA  │   │ Storage  │  │
│  │ TipTap (rich text)│       │ Flyway           │   └─────────┘  │
│  │ Tailwind CSS     │       │                  │       │        │
│  └──────────────────┘       └──────────────────┘       │        │
│         │                           │                   │        │
│         │                    ┌──────┴──────┐            │        │
│         │                    │ Piston API  │            │        │
│         └───────────────────►│ (Code Exec) │            │        │
│                              └─────────────┘            │        │
└─────────────────────────────────────────────────────────────────┘
```

### Frontend Structure (`AktiboLMS/frontend/src/`)
```
src/
├── components/
│   ├── ui/                 # Button, Card, Input, Modal, Badge, etc.
│   ├── editor/             # CodeEditor (Monaco), RichTextEditor (TipTap)
│   ├── lesson/             # LessonViewer, ContentBlock, ActivityBlock
│   ├── layout/             # Layout, Navbar
│   └── auth/               # PrivateRoute
├── pages/
│   ├── auth/               # Login, Register
│   ├── student/            # Dashboard, CourseView, LessonView, Progress
│   └── instructor/         # Dashboard, CourseBuilder, Analytics
├── hooks/
│   ├── useAuth.ts          # Auth context + JWT management
│   ├── useCourses.ts       # Course/module/lesson queries
│   ├── useLesson.ts        # Lesson content + progress
│   ├── useCodeExecution.ts # Piston API integration
│   └── useRealtime.ts      # Supabase Realtime subscriptions
├── services/
│   ├── api.ts              # Axios instance + interceptors
│   ├── auth.ts             # Auth API calls
│   └── supabase.ts         # Realtime client
├── types/                  # Shared TypeScript interfaces
└── utils/
```

### Backend Structure (`AktiboLMS/backend/src/main/java/com/aktibolms/`)
```
├── config/                 # SecurityConfig, AuthRateLimitFilter, CorsConfig
├── controller/             # REST endpoints (Auth, Course, Module, Lesson, ContentBlock, Activity, Progress, CodeExecution, InstructorAnalytics)
├── service/                # Business logic (CourseService, LessonService, ActivityService, ProgressService, CodeExecutionService, UserService)
├── repository/             # JPA repositories (Course, Module, Lesson, ContentBlock, Activity, ActivityProgress, CodeSubmission, QuizAttempt, Enrollment, User)
├── entity/                 # JPA entities matching DB schema
├── dto/
│   ├── request/            # DTOs for incoming requests
│   └── response/           # DTOs for API responses
├── security/
│   ├── JwtFilter.java      # JWT validation filter
│   ├── JwtUtil.java        # Token generation/validation
│   ├── CustomUserDetails.java
│   └── CustomUserDetailsService.java
└── exception/              # GlobalExceptionHandler, ApiException
```

### Database Schema (Key Tables)
- `users` — synced with Supabase auth; role: STUDENT | INSTRUCTOR
- `courses` → `modules` → `lessons` (hierarchical, ordered via `order_index`)
- `content_blocks` — static content per lesson (TEXT, VIDEO, IMAGE, CODE_SNIPPET) with JSONB `content`
- `activities` — interactive per lesson (CODE_EXERCISE, QUIZ) with JSONB `config`
- `activity_progress` — per-user per-activity status + score (NOT_STARTED → IN_PROGRESS → SUBMITTED → COMPLETED)
- `code_submissions` — code execution history
- `quiz_attempts` — quiz answers + grading
- `enrollments` — student ↔ course

---

## Key API Endpoints (Base: `/api/v1`)

### Auth
- `POST /auth/register` — Register (returns JWT)
- `POST /auth/login` — Login (returns JWT)
- `GET /auth/me` — Current user
- `POST /auth/refresh` — Refresh access token

### Courses (Instructor)
- `GET /courses` — List my courses
- `POST /courses` — Create course
- `GET /courses/:id` — Get with modules/lessons
- `PUT /courses/:id` — Update
- `DELETE /courses/:id` — Delete
- `POST /courses/:id/publish` — Publish

### Courses (Student)
- `GET /catalog/courses` — Browse published
- `POST /courses/:id/enroll` — Enroll
- `GET /my-courses` — Enrolled courses with progress

### Content & Activities
- `POST /lessons/:lessonId/content-blocks` — Add content block
- `POST /lessons/:lessonId/activities` — Create activity
- `GET /activities/:id` — Student view (no solution)
- `GET /activities/:id/instructor` — Instructor view (with solution)

### Progress & Execution
- `GET /progress/course/:courseId` — Student progress
- `POST /activities/:id/code/submit` — Submit code (proxies to Piston)
- `POST /activities/:id/quiz/submit` — Submit quiz
- `GET /instructor/courses/:courseId/analytics` — Course analytics

---

## Authentication Flow

1. **Login/Register** → Backend validates credentials, returns `{ accessToken, refreshToken, user }`
2. **Frontend** stores tokens in memory (access) + httpOnly cookie (refresh via `useAuth`)
3. **Axios interceptor** attaches `Authorization: Bearer <accessToken>` to all requests
4. **401 response** → Auto-refresh via `/auth/refresh`, retry original request
5. **Spring Security** validates JWT (HS256, secret from `jwt.secret`), sets `CustomUserDetails` in context
6. **Role-based access** via `@PreAuthorize("hasRole('INSTRUCTOR')")` or `PrivateRoute` on frontend

---

## Code Execution (Piston API)

- **Backend proxy**: `POST /code/execute` → forwards to Piston (`https://emkc.org/api/v2/piston/execute`)
- **Supported languages**: Configurable via Piston runtimes endpoint
- **Frontend**: `useCodeExecution.ts` hook + `CodeEditor` component (Monaco)
- **Timeout**: 30s (configurable via `piston.timeout`)

---

## Testing

### Frontend
```bash
npm run test              # All tests (Vitest + Testing Library + jsdom)
npm run test -- --run     # CI mode (no watch)
npm run test <file>       # Single test file
```

### Backend
```bash
./mvnw test               # All tests (JUnit + Mockito + Testcontainers)
./mvnw test -Dtest=*ServiceTest  # Single test class
./mvnw test -Dtest=CourseServiceTest#testCreateCourse  # Single test method
```

---

## Important Conventions

1. **UUIDs everywhere** — All entity IDs are UUIDs (generated by DB via `uuid-ossp`)
2. **Ordering via `order_index`** — Modules, lessons, content blocks, activities all use integer ordering
3. **JSONB for flexible content** — `content_blocks.content` and `activities.config` store structured JSON
4. **Optimistic UI updates** — TanStack Query mutations with `onMutate`/`onError`/`onSettled` for progress
5. **RLS-ready schema** — Tables designed for Supabase Row Level Security (not yet fully enabled in V1)
6. **Lazy-load Monaco** — Editor chunk loaded only on lesson view with code activity
7. **Flyway migrations only** — `ddl-auto: validate`; never `update` or `create-drop`

---

## Common Tasks

### Add a new content block type
1. Update `ContentBlock` entity `type` CHECK constraint (V1 migration + new migration)
2. Add case in `ContentBlock.tsx` renderer
3. Add editor UI in `CourseBuilder`/`LessonEditor`

### Add a new activity type
1. Add type to `activities.type` CHECK constraint
2. Define `config_json` structure in README/docs
3. Create `ActivityBlock` variant component
4. Add submission handling in `ProgressService` + controller

### Run a single backend test with Testcontainers
```bash
./mvnw test -Dtest=CourseServiceTest -DfailIfNoTests=false
```

### Debug Flyway migration issues
```bash
./mvnw flyway:info          # Show migration status
./mvnw flyway:repair        # Repair checksums
./mvnw flyway:clean flyway:migrate -Plocal  # Full reset (local profile)
```

---

## Environment Variables (Backend)

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL JDBC URL | `jdbc:postgresql://localhost:5432/aktibolms` |
| `DATABASE_USER` | DB username | `postgres` |
| `DATABASE_PASSWORD` | DB password | `postgres` |
| `JWT_SECRET` | HS256 signing key (256+ bits) | **required in prod** |
| `SUPABASE_URL` | Supabase project URL | — |
| `SUPABASE_ANON_KEY` | Supabase anon key | — |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | — |
| `SUPABASE_JWT_SECRET` | Supabase JWT secret (for JWKS) | — |
| `PISTON_API_URL` | Piston API base URL | `https://emkc.org/api/v2/piston` |
| `CORS_ALLOWED_ORIGINS` | Comma-separated origins | `http://localhost:3000,http://localhost:5173` |

---

## Git Workflow

- **Main branch**: `main` (protected)
- **Feature branches**: `feat/<short-name>`, `fix/<short-name>`
- **Commit style**: Conventional Commits (`feat:`, `fix:`, `refactor:`, `docs:`, `test:`)
- **PRs**: Required for all changes to `main`

---

## Useful Files to Reference

- `README.md` — Full design doc with architecture decisions, API spec, DB schema, implementation plan
- `AktiboLMS/frontend/vite.config.ts` — Vite config (proxy, aliases, build)
- `AktiboLMS/backend/pom.xml` — Maven dependencies, profiles (local/supabase), Flyway config
- `AktiboLMS/backend/src/main/resources/application.yml` — All Spring configuration
- `AktiboLMS/backend/src/main/resources/db/migration/V1__initial_schema.sql` — Canonical DB schema
- `AktiboLMS/frontend/src/services/api.ts` — Axios instance + auth interceptor
- `AktiboLMS/frontend/src/hooks/useAuth.tsx` — Auth context + token management