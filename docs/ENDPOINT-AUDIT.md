# AktiboLMS — Backend Endpoint Audit

Companion to `AUDIT.md`. Base path: `/api` (set via `server.servlet.context-path=/api` in `application.yml`).
Read directly from all 9 controller source files. Verdict column = action for the UI/UX overhaul.

**Recommended end state**: add `/api/v1` versioning prefix to every path below; remove endpoints marked REMOVE; implement stubs marked IMPLEMENT; secure endpoints marked SECURE.

## Auth

| # | Method | Path | Auth | Purpose | Verdict |
|---|---|---|---|---|---|
| 1 | POST | `/auth/register` | permitAll | Register; issue access + refresh JWT | KEEP |
| 2 | POST | `/auth/login` | permitAll | Login; issue access + refresh JWT | KEEP |
| 3 | POST | `/auth/refresh` | permitAll | Refresh access token (rotation + revoke old) | KEEP |
| 4 | GET | `/auth/me` | authenticated | Current user profile | KEEP |

## Courses

| # | Method | Path | Auth | Purpose | Verdict |
|---|---|---|---|---|---|
| 5 | POST | `/courses` | INSTRUCTOR | Create course | KEEP |
| 6 | GET | `/courses/public` | permitAll | List published courses (paginated) | KEEP |
| 7 | GET | `/courses/public/search` | permitAll | Search published courses | KEEP |
| 8 | GET | `/courses/my` | INSTRUCTOR | Instructor's own courses | KEEP |
| 9 | GET | `/courses/enrolled` | STUDENT | Student's enrolled courses w/ progress | KEEP |
| 10 | GET | `/courses/{id}` | (none) | Get course w/ modules/lessons | SECURE — add enrollment/publish check |
| 11 | GET | `/courses/{courseId}/lessons/{lessonId}` | (none) | Get lesson | REMOVE — duplicates LessonController endpoint |
| 12 | PUT | `/courses/{id}` | INSTRUCTOR | Update course | KEEP |
| 13 | DELETE | `/courses/{id}` | INSTRUCTOR | Delete course | KEEP |
| 14 | POST | `/courses/{id}/publish` | INSTRUCTOR | Publish course | KEEP — add `/unpublish` for symmetry |
| 15 | POST | `/courses/{id}/enroll` | STUDENT | Enroll in course | KEEP |

## Modules

| # | Method | Path | Auth | Purpose | Verdict |
|---|---|---|---|---|---|
| 16 | GET | `/courses/{courseId}/modules` | (none) | List modules of a course | SECURE — scope to published/enrolled |
| 17 | GET | `/courses/{courseId}/modules/{moduleId}` | (none) | Get a module | SECURE — scope to published/enrolled |
| 18 | POST | `/courses/{courseId}/modules` | INSTRUCTOR | Create module | KEEP |
| 19 | PUT | `/courses/{courseId}/modules/{moduleId}` | INSTRUCTOR | Update module | KEEP |
| 20 | DELETE | `/courses/{courseId}/modules/{moduleId}` | INSTRUCTOR | Delete module | KEEP |
| 21 | PUT | `/courses/{courseId}/modules/reorder` | INSTRUCTOR | Reorder modules | KEEP |

## Lessons

| # | Method | Path | Auth | Purpose | Verdict |
|---|---|---|---|---|---|
| 22 | GET | `/modules/{moduleId}/lessons` | (none) | List lessons of a module | SECURE — scope to published/enrolled |
| 23 | GET | `/modules/{moduleId}/lessons/{lessonId}` | (none) | Get lesson w/ blocks + activities | KEEP — canonical lesson endpoint |
| 24 | POST | `/modules/{moduleId}/lessons` | INSTRUCTOR | Create lesson | KEEP |
| 25 | PUT | `/modules/{moduleId}/lessons/{lessonId}` | INSTRUCTOR | Update lesson | KEEP |
| 26 | DELETE | `/modules/{moduleId}/lessons/{lessonId}` | INSTRUCTOR | Delete lesson | KEEP |
| 27 | PUT | `/modules/{moduleId}/lessons/reorder` | INSTRUCTOR | Reorder lessons | KEEP |

## Content Blocks

| # | Method | Path | Auth | Purpose | Verdict |
|---|---|---|---|---|---|
| 28 | GET | `/lessons/{lessonId}/content-blocks` | (none) | List content blocks | SECURE — scope to published/enrolled |
| 29 | POST | `/lessons/{lessonId}/content-blocks` | INSTRUCTOR | Create content block | KEEP |
| 30 | PUT | `/lessons/{lessonId}/content-blocks/{blockId}` | INSTRUCTOR | Update content block | KEEP |
| 31 | DELETE | `/lessons/{lessonId}/content-blocks/{blockId}` | INSTRUCTOR | Delete content block | KEEP |
| 32 | PUT | `/lessons/{lessonId}/content-blocks/reorder` | INSTRUCTOR | Reorder content blocks | KEEP |

## Activities

| # | Method | Path | Auth | Purpose | Verdict |
|---|---|---|---|---|---|
| 33 | GET | `/lessons/{lessonId}/activities` | (none) | List activities | SECURE — scope to published/enrolled |
| 34 | POST | `/lessons/{lessonId}/activities` | INSTRUCTOR | Create activity | KEEP |
| 35 | PUT | `/lessons/{lessonId}/activities/{activityId}` | INSTRUCTOR | Update activity | KEEP |
| 36 | DELETE | `/lessons/{lessonId}/activities/{activityId}` | INSTRUCTOR | Delete activity | KEEP |
| 37 | GET | `/lessons/{lessonId}/activities/{activityId}` | authenticated | Get activity (student strips solution) | KEEP |

## Progress & Submissions

| # | Method | Path | Auth | Purpose | Verdict |
|---|---|---|---|---|---|
| 38 | POST | `/activities/{activityId}/code/submit` | STUDENT | Execute code via Piston + save submission + progress | KEEP |
| 39 | POST | `/activities/{activityId}/quiz/submit` | STUDENT | Submit quiz answers | KEEP |
| 40 | GET | `/activities/progress/lesson/{lessonId}` | STUDENT | Student progress for a lesson | KEEP |
| 41 | GET | `/activities/progress/course/{courseId}` | STUDENT | Student progress for a course | KEEP |

## Code Execution

| # | Method | Path | Auth | Purpose | Verdict |
|---|---|---|---|---|---|
| 42 | POST | `/code/execute` | (none) | Execute arbitrary code via Piston | REMOVE — public, dangerous, logic duplicated by #38 |
| 43 | GET | `/code/runtimes` | (none) | Hardcoded Piston runtimes list | KEEP — but proxy real Piston `/runtimes` or remove if FE calls Piston directly |

## Instructor Analytics

| # | Method | Path | Auth | Purpose | Verdict |
|---|---|---|---|---|---|
| 44 | GET | `/instructor/courses/{courseId}/analytics` | INSTRUCTOR | Course analytics | KEEP |
| 45 | GET | `/instructor/activities/{activityId}/submissions` | INSTRUCTOR | Activity submissions | IMPLEMENT — currently returns empty 200 (TODO stub) |

## Actuator

| # | Method | Path | Auth | Purpose | Verdict |
|---|---|---|---|---|---|
| 46 | GET | `/actuator/health` (`/info`, `/metrics`) | permitAll | Health/metrics | KEEP |

## Summary of changes

- **REMOVE (2)**: #42 `POST /code/execute`, #11 duplicate lesson endpoint.
- **IMPLEMENT (2)**: #45 submissions endpoint; `POST /courses/{id}/unpublish`.
- **SECURE (7)**: #10, #16, #17, #22, #23, #28, #33 — add enrollment/publish authorization so unpublished course content isn't publicly readable.
- **ADD (1)**: API versioning — prefix all paths with `/api/v1` (README specifies it; code currently uses unversioned `/api`).
- **Net**: 45 → ~41 endpoints, cleaner surface for the new frontend to consume.
