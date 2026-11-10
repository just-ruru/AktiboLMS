# AktiboLMS Backend

Spring Boot 3.x + MySQL backend for the AktiboLMS project (Interactive Learning Management System).

## Stack

| Layer | Technology |
|-------|------------|
| Language | Java 17+ |
| Framework | Spring Boot 3.4.0 |
| Data | Spring Data JPA + Hibernate |
| Database | MySQL 8.x |
| Build | Maven |
| Password hashing | BCrypt (Spring Security Crypto only) |
| CORS | Configured for `http://localhost:5173` (Vite dev server) |

## Quick start

```powershell
# Prerequisites: Java 17+, Maven 3.9+, MySQL 8+

# 1. Create the database
mysql -u root -p
> CREATE DATABASE aktibolms_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
> EXIT;

# 2. (Optional) Update DB credentials in backend/src/main/resources/application.properties

# 3. Build
cd backend
mvn clean install -DskipTests

# 4. Run
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`.

## API endpoints

### Students (`/api/students`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/students` | Create student account |
| GET | `/api/students/{id}` | Get student profile by ID |
| GET | `/api/students` | List all active students |
| PUT | `/api/students/{id}` | Update student profile |
| DELETE | `/api/students/{id}` | Deactivate student account (soft delete) |

### Instructors (`/api/instructors`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/instructors` | Create instructor profile |
| GET | `/api/instructors/{id}` | Get instructor profile by ID |
| GET | `/api/instructors` | List all active instructors |
| PUT | `/api/instructors/{id}` | Update instructor profile |
| DELETE | `/api/instructors/{id}` | Deactivate instructor account (soft delete) |

### Courses (`/api/courses`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/courses` | Create a course |
| GET | `/api/courses/{courseId}` | Get a course |
| GET | `/api/courses` | List non-archived courses (paginated) |
| PUT | `/api/courses/{courseId}` | Update course details and status |
| DELETE | `/api/courses/{courseId}` | Archive a course |
| POST | `/api/courses/{courseId}/assignments` | Assign an instructor for a semester and academic year |
| GET | `/api/courses/{courseId}/assignments` | List active instructor assignments |
| DELETE | `/api/courses/{courseId}/assignments/{assignmentId}` | Remove an instructor assignment |

Course JSON uses `courseCode`, `courseTitle`, `description`, `units`, and `status` (`DRAFT`, `PUBLISHED`, or `ARCHIVED`). Assignment JSON uses the database `instructorId`, `semester`, `academicYear`, and `role`.

### Modules (`/api/courses/{courseId}/modules`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/courses/{courseId}/modules` | Create a module |
| GET | `/api/courses/{courseId}/modules` | List non-archived modules in sequence order |
| GET | `/api/courses/{courseId}/modules/{moduleId}` | Get a module |
| PUT | `/api/courses/{courseId}/modules/{moduleId}` | Update a module |
| DELETE | `/api/courses/{courseId}/modules/{moduleId}` | Unpublish and archive a module |

Module JSON uses `moduleTitle`, `sequenceOrder`, and `published`. Sequence order must be unique within its course.

See `SETUP.md` for full Postman examples and teammate onboarding instructions.

## Postman

Yes — all endpoints are standard HTTP REST and work in Postman. Base URL:
`http://localhost:8080`. Passwords are hashed (BCrypt) and never returned in responses.

Import [`postman/AktiboLMS CRUD.postman_collection.json`](./postman/AktiboLMS%20CRUD.postman_collection.json) in Postman, start the backend, then use **Run collection** to run its requests in order. It creates unique instructor/student/course records, captures returned IDs, exercises CRUD/assignment/archive operations, and checks expected status codes. The collection covers implemented entities only; enrollment, lesson content blocks, quizzes, and student progress APIs are not implemented yet.

## Notes

- Spring Security's web starter is not included, so endpoints currently have no login or authorization. BCrypt hashing is retained through the crypto-only library. Add authentication and role-based authorization before exposing the API beyond trusted local development; course assignments are not yet used to authorize instructor access, and published content is not yet restricted to enrolled students.
- Courses and modules are archived rather than hard-deleted, preserving their IDs for future enrollment and progress records.
- Module content blocks, enrollments, quizzes, and student progress/submissions remain separate follow-up work.
