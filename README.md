# AktiboLMS

## Group Name:
Nnyl Jake G. Rayos
Jhon Kyle Po
Johnler Cabo

---

## AktiboLMS: Interactive Learning, Made Active


## Pain Point:
	Traditional Learning Management System (LMS) materials rely heavily on static, text-dense modules, leading to cognitive overload. This 'wall of text' approach forces passive consumption, causing students to quickly become fatigued and disengaged.
	

## Proposed Solution: 
	Our solution modernizes the LMS experience by replacing static digital textbooks with an interactive, rich-media content delivery system. By integrating embedded coding environments directly into the reading materials and deploying rapid practice questions immediately after non-technical lessons, we eliminate user friction and boredom. This transition not only caters to the habits of digitally-native modern learners by allowing them to instantly apply what they read, but it also translates directly into higher course completion rates and measurable increases in active user engagement.


## Description of the Proposed Solution:
    AktiboLMS is an interactive Learning Management System designed to make digital learning more engaging, practical, and learner-centered. Instead of presenting lessons as long, static blocks of text, the platform combines structured reading materials with multimedia content, interactive activities, practice questions, and embedded coding environments.

    For technical subjects, students can read a concept and immediately write, execute, and test code without leaving the lesson. For non-technical subjects, short quizzes and practice questions can appear after key sections to reinforce understanding while the information is still fresh. The platform can also track learner interactions, quiz performance, and lesson progress, providing measurable engagement data that can help instructors identify areas where students may be struggling or disengaging.


## Functional Requirements:

### Must-have:
    The system must allow instructors to create, organize, and publish interactive lessons containing text, images, videos, and other learning materials. It must provide embedded coding environments for programming-related lessons, allowing students to write and execute code directly within the LMS. The system must also support short quizzes and practice questions that students can answer immediately after relevant lessons. Student progress, completed lessons, and quiz results must be recorded and accessible through the system.
		

### Should-have:
    The system should provide interactive lesson elements such as expandable sections, clickable content, and multimedia activities to make lessons less text-heavy. It should provide immediate feedback after students answer practice questions or complete coding activities. Instructors should be able to review student performance and identify lessons or activities where students commonly encounter difficulties. The platform should also provide a progress dashboard showing completion rates, activity history, and learning performance.

### Nice-to-have:
    The system may include gamification features such as points, badges, streaks, or achievement milestones to encourage continued participation. It may provide personalized recommendations based on a student's progress, quiz performance, and previously completed activities. The platform could also support collaborative learning features such as discussion threads, peer activities, or shared coding exercises. Additional analytics could be implemented to visualize learner engagement patterns and help instructors improve their course materials.


---

# Design Document & Implementation Plan

## 1. Intent & Why

**Problem**: Traditional LMS platforms present content as static "walls of text" leading to cognitive overload and disengagement.

**Solution**: An interactive LMS where lessons combine rich content (text, video, images) with **embedded activities** — Monaco code editors for programming, instant-feedback quizzes for concepts — all within the same view. Progress is tracked per-activity, giving instructors actionable analytics.

**Why this approach**: Students learn by doing. Immediate application (code execution, quiz feedback) within the lesson eliminates context switching and reinforces learning while context is fresh.

---

## 2. Goals, Non-Goals, Anti-Goals

### Goals (Must-Have for v1)
- [ ] Instructor can create courses with modules/lessons containing rich content blocks
- [ ] Lessons support: text, images, videos, code editor blocks, quiz blocks
- [ ] Students can write/run code in Monaco editor (via Piston API)
- [ ] Students can answer quizzes with immediate feedback
- [ ] Progress tracked per activity (lesson completion, quiz scores, code submissions)
- [ ] Student dashboard: progress overview, continue learning
- [ ] Instructor dashboard: course analytics, student performance
- [ ] Authentication: register/login, role-based access (instructor/student)
- [ ] Deployed and accessible via public URLs

### Non-Goals (Explicitly Out of Scope for v1)
- Collaborative editing (multi-user code editing)
- Discussion forums / peer review
- Gamification (badges, streaks, points)
- AI-powered recommendations
- Mobile app
- Offline support
- Multi-language UI (English only for v1)
- Video hosting (embed YouTube/Vimeo URLs only)
- Custom code runner infrastructure (use Piston API)

### Anti-Goals (What Would Make This a Failure)
- Requiring students to leave the lesson page to write code or take quizzes
- Instructor cannot see which activities students struggle with
- Code execution takes >10 seconds or frequently fails
- Progress data is not queryable for analytics
- Deployment requires paid services or complex DevOps

---

## 3. Constraints

| Constraint | Value |
|------------|-------|
| **Team** | 3 third-year IT students |
| **Timeline** | ~4 weeks (1 month) |
| **Budget** | $0 (free tiers only) |
| **Frontend** | React 18 + Vite + TypeScript |
| **Backend** | Spring Boot 3.x + Maven |
| **State Management** | TanStack Query (React Query) |
| **Database** | PostgreSQL (Supabase free tier) |
| **Migrations** | Flyway |
| **Code Editor** | Monaco Editor |
| **Code Execution** | Piston API (piston.rs) |
| **Auth** | Spring Security + JWT (users in Supabase) |
| **Realtime** | Supabase Realtime (Postgres changes) |
| **Hosting (FE)** | Vercel |
| **Hosting (BE)** | Render |
| **Hosting (DB/Auth/Realtime)** | Supabase |

---

## 4. Architecture Decisions & Tradeoffs

### 4.1 Code Execution: Piston API
**Alternatives considered**: Judge0 (self-hosted), Docker containers, WASM (Pyodide)

| Approach | Pros | Cons | Decision |
|----------|------|------|----------|
| **Piston API** | Zero setup, free, 20+ languages, simple REST | Rate limited, no persistence, external dependency | ✅ **Chosen** |
| Judge0 | Full control, webhooks, queues | Need Docker hosting, more complex | Later migration |
| Docker containers | Complete isolation | Complex orchestration, security risks | ❌ Too complex |
| WASM | Runs in browser | Limited languages (Python/JS) | ❌ Not enough languages |

**Rationale**: Piston lets us ship code execution in hours, not days. Migration path to Judge0 is trivial (same API shape).

### 4.2 Hosting: Vercel + Render + Supabase
**Alternatives considered**: Netlify, Railway, Fly.io, Neon, Oracle Cloud

| Component | Chosen | Why |
|-----------|--------|-----|
| Frontend | **Vercel** | Best React/Vite DX, auto-deploy, custom domains free |
| Backend | **Render** | Detects Spring Boot/Maven auto, zero config, free tier |
| Database | **Supabase** | PostgreSQL + Auth + Realtime + Storage in one free tier |

**Rationale**: All three have generous free tiers, GitHub push-to-deploy, minimal config. Supabase replaces separate Auth + DB + Realtime services.

### 4.3 Authentication: Spring Security + JWT (Supabase as User Store)
**Alternatives considered**: Supabase Auth only

| Approach | Pros | Cons | Decision |
|----------|------|------|----------|
| **Spring Security + JWT** | Full control, portable, valuable learning, industry standard | More code to write | ✅ **Chosen** |
| Supabase Auth only | Zero auth code, RLS, social login | Vendor lock-in, less learning value | ❌ |

**Hybrid**: Users stored in Supabase `auth.users`, Spring Boot validates JWTs via Supabase JWKS endpoint. Spring Boot owns authorization logic.

### 4.4 Real-time: Supabase Realtime (No Custom WebSocket Server)
**Alternatives considered**: Spring WebSocket/STOMP

| Feature | Implementation |
|---------|----------------|
| Live quiz results → instructor dashboard | Supabase Realtime (Postgres `INSERT` on `quiz_attempts`) |
| Progress sync across tabs | Supabase Realtime |
| Notifications | Supabase Realtime |
| Collaborative editing | ❌ Deferred (needs CRDTs/OT) |

**Rationale**: Supabase Realtime is built-in, works with RLS, no separate WebSocket server to maintain. STOMP adds complexity not needed for v1 features.

### 4.5 Lesson Content Structure: Section-Based (Hierarchical)
**Alternatives considered**: Block-based (Notion-style), Document + Activities

| Model | Structure | Verdict |
|-------|-----------|---------|
| **Section-based** | Course → Module → Lesson → [Content Blocks + Activities] | ✅ **Chosen** |
| Block-based | Array of flexible blocks | Too complex editor for 1 month |
| Document + Activities | MDX content + separate refs | Less flexible layout |

**Structure**:
```
Course
  └── Module (ordered)
        └── Lesson (ordered)
              ├── Content Blocks: text, video, image, code_snippet (read-only)
              └── Activities: code_exercise, quiz (interactive, tracked)
```

Progress tracked at **Activity** level (not lesson). Each activity = one row in `activity_progress`.

---

## 5. Tech Stack Summary

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

**Key Libraries**:
- Frontend: `react`, `react-router`, `@tanstack/react-query`, `@monaco-editor/react`, `@tiptap/react`, `tailwindcss`, `axios`, `zod`
- Backend: `spring-boot-starter-web`, `spring-boot-starter-security`, `spring-boot-starter-data-jpa`, `spring-boot-starter-validation`, `flyway-core`, `postgresql`, `jjwt`, `webjars-locator`

---

## 6. Database Schema (High-Level)

```sql
-- Users (synced from Supabase auth.users via trigger or API)
users (id, email, full_name, role, avatar_url, created_at)

-- Course hierarchy
courses (id, title, description, thumbnail_url, instructor_id, published, created_at)
modules (id, course_id, title, description, order_index, created_at)
lessons (id, module_id, title, description, order_index, created_at)

-- Content blocks (static content within a lesson)
content_blocks (id, lesson_id, type, content_json, order_index)
-- type: 'text' | 'video' | 'image' | 'code_snippet'
-- content_json: { text: "...", video_url: "...", image_url: "...", language: "java", code: "..." }

-- Activities (interactive, tracked)
activities (id, lesson_id, type, config_json, order_index, points)
-- type: 'code_exercise' | 'quiz'
-- code_exercise config: { language, starter_code, solution_code, test_cases }
-- quiz config: { questions: [{ question, options, correct_index, explanation }] }

-- Progress tracking
activity_progress (id, user_id, activity_id, status, score, submitted_at, completed_at)
-- status: 'not_started' | 'in_progress' | 'submitted' | 'completed'

code_submissions (id, user_id, activity_id, code, language, output, passed, execution_time_ms, created_at)
quiz_attempts (id, user_id, activity_id, answers_json, score, passed, created_at)

-- Enrollment
enrollments (id, user_id, course_id, enrolled_at, completed_at)
```

**Indexes**: `(user_id, activity_id)` on `activity_progress`, `(course_id, published)` on `courses`, `(lesson_id, order_index)` on `content_blocks` and `activities`.

**RLS Policies**: Enabled on all tables. Students see only their progress + enrolled courses. Instructors see their courses + all student progress for their courses.

---

## 7. API Design (REST)

### Versioning: `/api/v1/`

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register (returns JWT) |
| POST | `/auth/login` | Login (returns JWT) |
| GET | `/auth/me` | Get current user |
| POST | `/auth/refresh` | Refresh access token |

### Courses (Instructor)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/courses` | List my courses (paginated) |
| POST | `/courses` | Create course |
| GET | `/courses/:id` | Get course with modules/lessons |
| PUT | `/courses/:id` | Update course |
| DELETE | `/courses/:id` | Delete course |
| POST | `/courses/:id/publish` | Publish course |

### Courses (Student)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/catalog/courses` | Browse published courses |
| POST | `/courses/:id/enroll` | Enroll in course |
| GET | `/my-courses` | List enrolled courses with progress |

### Modules & Lessons
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/courses/:courseId/modules` | Create module |
| PUT | `/modules/:id` | Update module |
| DELETE | `/modules/:id` | Delete module |
| POST | `/modules/:moduleId/lessons` | Create lesson |
| PUT | `/lessons/:id` | Update lesson |
| DELETE | `/lessons/:id` | Delete lesson |
| PUT | `/modules/reorder` | Reorder modules |
| PUT | `/lessons/reorder` | Reorder lessons |

### Content Blocks
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/lessons/:lessonId/content-blocks` | Add content block |
| PUT | `/content-blocks/:id` | Update content block |
| DELETE | `/content-blocks/:id` | Delete content block |
| PUT | `/content-blocks/reorder` | Reorder blocks |

### Activities
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/lessons/:lessonId/activities` | Create activity |
| PUT | `/activities/:id` | Update activity |
| DELETE | `/activities/:id` | Delete activity |
| GET | `/activities/:id` | Get activity (student view - no solution) |
| GET | `/activities/:id/instructor` | Get activity (instructor view - with solution) |

### Progress & Submissions
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/progress/course/:courseId` | Student progress for course |
| GET | `/progress/lesson/:lessonId` | Student progress for lesson |
| POST | `/activities/:id/code/submit` | Submit code execution |
| POST | `/activities/:id/quiz/submit` | Submit quiz answers |
| GET | `/instructor/courses/:courseId/analytics` | Course analytics |
| GET | `/instructor/activities/:id/submissions` | All submissions for activity |

### Code Execution (Proxy to Piston)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/code/execute` | Execute code (proxies to Piston) |
| GET | `/code/runtimes` | List supported languages |

---

## 8. Frontend Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/                 # Button, Card, Input, Modal, etc.
│   │   ├── editor/             # CodeEditor (Monaco), RichTextEditor (TipTap)
│   │   ├── lesson/             # LessonViewer, ContentBlock, ActivityBlock
│   │   ├── dashboard/          # ProgressChart, ActivityList, CourseCard
│   │   └── layout/             # Navbar, Sidebar, Footer
│   ├── pages/
│   │   ├── auth/               # Login, Register
│   │   ├── student/            # Dashboard, CourseView, LessonView, Progress
│   │   └── instructor/         # Dashboard, CourseBuilder, Analytics, StudentList
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useCourses.ts
│   │   ├── useLesson.ts
│   │   ├── useCodeExecution.ts
│   │   └── useRealtime.ts
│   ├── services/
│   │   ├── api.ts              # Axios instance + interceptors
│   │   ├── auth.ts
│   │   └── supabase.ts         # Realtime subscriptions
│   ├── types/                  # Shared TypeScript interfaces
│   ├── utils/
│   └── main.tsx
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## 9. Backend Structure

```
backend/
├── src/main/java/com/aktibolms/
│   ├── config/
│   │   ├── SecurityConfig.java
│   │   ├── WebConfig.java
│   │   ├── CorsConfig.java
│   │   └── SupabaseConfig.java
│   ├── controller/
│   │   ├── AuthController.java
│   │   ├── CourseController.java
│   │   ├── ModuleController.java
│   │   ├── LessonController.java
│   │   ├── ContentBlockController.java
│   │   ├── ActivityController.java
│   │   ├── ProgressController.java
│   │   ├── CodeExecutionController.java
│   │   └── InstructorAnalyticsController.java
│   ├── service/
│   │   ├── CourseService.java
│   │   ├── LessonService.java
│   │   ├── ActivityService.java
│   │   ├── ProgressService.java
│   │   ├── CodeExecutionService.java
│   │   └── UserService.java
│   ├── repository/
│   │   ├── CourseRepository.java
│   │   ├── ModuleRepository.java
│   │   ├── LessonRepository.java
│   │   ├── ContentBlockRepository.java
│   │   ├── ActivityRepository.java
│   │   ├── ActivityProgressRepository.java
│   │   ├── CodeSubmissionRepository.java
│   │   ├── QuizAttemptRepository.java
│   │   └── EnrollmentRepository.java
│   ├── entity/
│   │   ├── User.java
│   │   ├── Course.java
│   │   ├── Module.java
│   │   ├── Lesson.java
│   │   ├── ContentBlock.java
│   │   ├── Activity.java
│   │   ├── ActivityProgress.java
│   │   ├── CodeSubmission.java
│   │   ├── QuizAttempt.java
│   │   └── Enrollment.java
│   ├── dto/
│   │   ├── request/
│   │   └── response/
│   ├── security/
│   │   ├── JwtFilter.java
│   │   ├── JwtUtil.java
│   │   ├── CustomUserDetails.java
│   │   └── CustomUserDetailsService.java
│   └── exception/
│       ├── GlobalExceptionHandler.java
│       └── ApiException.java
├── src/main/resources/
│   ├── application.yml
│   └── db/migration/
│       ├── V1__init_schema.sql
│       ├── V2__add_rls_policies.sql
│       └── V3__add_indexes.sql
└── pom.xml
```

---

## 10. Implementation Plan (4 Weeks)

### Week 1: Foundation & Auth
| Day | Task | Deliverable |
|-----|------|-------------|
| 1-2 | **Project Setup**: Init Spring Boot (Maven), React+Vite+TS, Tailwind, ESLint/Prettier | Both repos build & run locally |
| 2-3 | **Database**: Supabase project, run Flyway migration V1 (schema), configure `application.yml` | PostgreSQL schema deployed |
| 3-4 | **Auth Backend**: Spring Security + JWT, register/login/me endpoints, Supabase JWKS validation | `POST /auth/register`, `/auth/login` work |
| 4-5 | **Auth Frontend**: Login/Register pages, `useAuth` hook, Axios interceptor with JWT, protected routes | User can sign up, log in, stay logged in |
| 5 | **Integration Test**: FE ↔ BE auth flow, deploy to Render + Vercel (staging) | Live auth demo |

### Week 2: Course Builder (Instructor) & Content
| Day | Task | Deliverable |
|-----|------|-------------|
| 6-7 | **Course/Module/Lesson CRUD**: Backend REST + FE instructor pages | Instructor creates course hierarchy |
| 7-8 | **Content Blocks**: Backend + FE (TipTap for text, URL inputs for video/image, read-only code snippet) | Rich lesson content authoring |
| 8-9 | **Drag-Drop Reorder**: Modules, lessons, content blocks (use `@dnd-kit` or native) | Reorderable curriculum |
| 9-10 | **Publish Flow**: Course publish toggle, student catalog view | Students see published courses |

### Week 3: Activities & Code Execution
| Day | Task | Deliverable |
|-----|------|-------------|
| 11-12 | **Activity Types**: Backend models for `code_exercise` + `quiz`, instructor UI to create both | Instructor adds interactive activities |
| 12-13 | **Code Execution**: Backend proxy to Piston API (`/code/execute`), FE Monaco editor integration | Student writes/runs code in lesson |
| 13-14 | **Quiz System**: Backend quiz submission + grading, FE quiz component with immediate feedback | Student takes quiz, sees score instantly |
| 14-15 | **Progress Tracking**: `activity_progress` writes on submit, student lesson view shows completion | Progress persists per activity |

### Week 4: Dashboards, Polish & Deploy
| Day | Task | Deliverable |
|-----|------|-------------|
| 16-17 | **Student Dashboard**: Enrolled courses, progress bars, continue learning, activity history | Student sees their journey |
| 17-18 | **Instructor Dashboard**: Course list, enrollment stats, activity analytics (completion rates, common failures) | Instructor sees class performance |
| 18-19 | **Realtime Updates**: Supabase Realtime for quiz submissions → instructor dashboard live updates | Live analytics without refresh |
| 19-20 | **Polish**: Loading states, error boundaries, empty states, responsive design, accessibility basics | Production-quality UX |
| 20-21 | **Deploy & Demo**: Production deploy (Vercel + Render + Supabase), seed data, record demo video | **Shipped v1** |

---

## 11. Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Piston API rate limits / downtime | Medium | High | Cache runtimes locally; add Judge0 as fallback later |
| Render cold starts (15s) | High | Medium | Keep service warm with cron ping; or use Fly.io if critical |
| Supabase free tier limits (500MB DB) | Low | Medium | Monitor usage; archive old submissions |
| Scope creep (nice-to-haves) | High | High | **Strictly enforce**: only must-haves in Weeks 1-3 |
| Team unfamiliar with Spring Security | Medium | High | Day 3-4 dedicated auth spike; pair program |
| Monaco editor bundle size | Low | Medium | Lazy-load editor chunk; use `monaco-editor-webpack-plugin` equivalent for Vite |

---

## 12. Definition of Done (per Task)

- [ ] Code compiles (TypeScript strict, Java 17+)
- [ ] Unit tests for service layer (JUnit + Mockito, Vitest + Testing Library)
- [ ] Integration test for API endpoints (Testcontainers for Spring, MSW for React)
- [ ] Lint/format passes (`npm run lint`, `mvn checkstyle:check`)
- [ ] Feature works on deployed staging (Render + Vercel preview)
- [ ] No console errors in browser
- [ ] Responsive on mobile (375px+)

---

## 13. Next Steps

1. **Approve this plan** → I'll create detailed task breakdown with test cases
2. **Initialize repos**: `frontend/` and `backend/` with chosen stack
3. **Set up Supabase project** and run first Flyway migration
4. **Begin Week 1** with project scaffolding

---

## 14. Useful Commands (To Be Populated)

```bash
# Frontend
cd frontend
npm run dev          # Start Vite dev server
npm run build        # Production build
npm run test         # Run Vitest
npm run lint         # ESLint + Prettier check
npm run typecheck    # tsc --noEmit

# Backend
cd backend
./mvnw spring-boot:run      # Start dev server
./mvnw test                 # Run tests
./mvnw flyway:migrate       # Run migrations
./mvnw checkstyle:check     # Code style check

# Database (Supabase CLI)
supabase db push            # Push migrations to Supabase
supabase db pull            # Pull schema changes
supabase migration new <name>  # Create new migration
```

---

*Last updated: 2025-01-29 | Design doc version 1.0*