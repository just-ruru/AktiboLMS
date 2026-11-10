# AktiboLMS Backend — Teammate Setup Guide

This guide walks you through getting the Spring Boot backend running on your machine after you clone/pull the repo. It assumes you're joining the **Student / Instructor profile** portion of the app (Subjects & Modules are being built by a separate teammate).

**Stack:** Spring Boot 4.1.2 + Java 25 + Maven + MySQL.

---

## 1. Prerequisites

Install these before anything else:

| Tool | Version | How to verify |
|------|---------|---------------|
| **JDK** | 25 — the project targets Java 25 | `java -version` |
| **Maven** | 3.9.x+ | `mvn -version` |
| **MySQL** | 8.0+ | `mysql --version` |
| **Git** | any recent | `git --version` |

> The `pom.xml` sets `<java.version>25</java.version>`. If you have an older JDK (e.g. 17 or 21), install JDK 25 — Maven will compile Java 25 bytecode.

### If you don't have MySQL installed

Download the MySQL Community Server installer from https://dev.mysql.com/downloads/mysql/ and install it. During setup you'll set a `root` password — remember it, you'll need it to create the app database/user.

---

## 2. Clone the repository

```bash
git clone <repo-url>
cd AktiboLMS/AktiboLMS/backend
```

> Note: the repo has a nested `AktiboLMS/` folder — `cd` into the **inner** one that contains `backend/` and `frontend/`, then into `backend/`.

---

## 3. Set up the MySQL database

Log into MySQL as root (enter your root password when prompted):

```bash
mysql -u root -p
```

Then run these SQL statements inside the MySQL client:

```sql
CREATE DATABASE IF NOT EXISTS aktibolms_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'aktibolms_app'@'localhost'
  IDENTIFIED BY 'aktibolms_dev';

GRANT ALL PRIVILEGES ON aktibolms_db.* TO 'aktibolms_app'@'localhost';
FLUSH PRIVILEGES;

EXIT;
```

This creates:
- Database: `aktibolms_db`
- App user: `aktibolms_app` / `aktibolms_dev`
- Grants the app user full access to the database

If you'd rather use a different username/password, edit `src/main/resources/application.properties` accordingly (see step 5).

---

## 4. Review / adjust `application.properties`

Open `src/main/resources/application.properties`. The database section looks like this:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/aktibolms_db?createDatabaseIfNotExist=true
spring.datasource.username=aktibolms_app
spring.datasource.password=aktibolms_dev
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

Change `username` / `password` if you used different MySQL credentials. Leave everything else as-is unless you need a different port.

Other notable defaults:
- `server.port=8080` — backend HTTP port
- `spring.jpa.hibernate.ddl-auto=update` — Hibernate auto-creates/updates tables on startup (safe for local dev)
- CORS allows `http://localhost:5173` (the Vite dev server) — see `src/main/java/com/aktibolms/backend/config/WebConfig.java` if your frontend runs elsewhere.

---

## 5. Build the project

From the `backend/` directory:

```bash
mvn clean compile
```

Expected output: **BUILD SUCCESS**. The first run downloads dependencies (~100–200 MB), so it may take a minute or two.

### Running tests

There are two test suites — no MySQL instance is needed:

| Suite | Tests | How it works |
|-------|-------|--------------|
| **Service tests** (`StudentServiceTest`, `InstructorServiceTest`) | 10 each | Runs against an embedded **H2** in-memory database (see `src/test/resources/application-test.properties`). Each test method is wrapped in `@Transactional` so the DB is rolled back after every test — tests are independent and can run in any order. |
| **Controller tests** (`StudentControllerTest`, `InstructorControllerTest`) | 5 each | Standalone `MockMvc` with Mockito-mocked services. No database required. |

Run all tests:

```bash
mvn test
```

Run only service tests:

```bash
mvn test -Dtest='*ServiceTest'
```

Run only controller tests:

```bash
mvn test -Dtest='*ControllerTest'
```

Expected output: **BUILD SUCCESS** with **Tests run: 30, Failures: 0, Errors: 0**.

> Note on Spring Boot 4.1.2: `@WebMvcTest`, `@DataJpaTest`, and `@MockBean` are **not available** in Spring Boot 4.1.2 (they were removed from `spring-boot-test-autoconfigure`). Service tests use `@SpringBootTest(webEnvironment = NONE)` + `@ActiveProfiles("test")` with H2 instead; controller tests use standalone `MockMvcBuilders.standaloneSetup()` + Mockito mocks injected via `ReflectionTestUtils`.

To package a runnable jar:

```bash
mvn clean package -DskipTests
```

The artifact lands in `target/backend-1.0.0.jar`.

---

## 6. Run the backend

Option A — via Maven (quickest for dev):

```bash
mvn spring-boot:run
```

Option B — run the packaged jar:

```bash
java -jar target/backend-1.0.0.jar
```

You should see Spring Boot startup logs ending with something like:

```
Started AktiboLmsBackendApplication in X.XXX seconds
```

The API is now live at `http://localhost:8080`.

---

## 7. Verify the endpoints (Postman / curl / browser)

All API endpoints are currently **open** with no authentication. The Spring Security web starter is not included; only its crypto library is used to preserve BCrypt password hashing.

### Base URL

```
http://localhost:8080
```

### Student — `/api/students`

| Action | Method | Endpoint | Body (JSON) |
|--------|--------|----------|-------------|
| Create account | POST | `/api/students` | `{ "studentId": "S2024-001", "firstName": "Juan", "lastName": "Dela Cruz", "email": "juan@example.com", "password": "password123", "description": "BSIT student" }` |
| Get profile by ID | GET | `/api/students/{id}` | — |
| List all active students | GET | `/api/students` | — |
| Update profile | PUT | `/api/students/{id}` | same fields as create (password optional) |
| Deactivate account | DELETE | `/api/students/{id}` | — |

### Instructor — `/api/instructors`

| Action | Method | Endpoint | Body (JSON) |
|--------|--------|----------|-------------|
| Create profile | POST | `/api/instructors` | `{ "instructorId": "I2024-001", "firstName": "Maria", "lastName": "Santos", "email": "maria@example.com", "password": "password123", "description": "BSIT instructor" }` |
| Get profile by ID | GET | `/api/instructors/{id}` | — |
| List all active instructors | GET | `/api/instructors` | — |
| Update profile | PUT | `/api/instructors/{id}` | same fields as create (password optional) |
| Deactivate account | DELETE | `/api/instructors/{id}` | — |

**Example curl (create a student):**

```bash
curl -X POST http://localhost:8080/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "S2024-001",
    "firstName": "Juan",
    "lastName": "Dela Cruz",
    "email": "juan@example.com",
    "password": "password123",
    "description": "BSIT student"
  }'
```

Passwords are hashed with BCrypt before storage and are **never returned** in responses.

---

## 8. Project structure (where things live)

```
backend/
├── pom.xml                              # Maven build + dependencies
├── src/main/resources/
│   └── application.properties           # DB, server, JPA, logging config
└── src/main/java/com/aktibolms/backend/
    ├── AktiboLmsBackendApplication.java # Spring Boot entry point
    ├── config/
    │   └── WebConfig.java               # CORS (allows React on :5173)
    ├── security/
    │   └── SecurityConfig.java          # BCryptPasswordEncoder bean (crypto only)
    ├── exception/
    │   ├── ResourceNotFoundException.java
    │   └── GlobalExceptionHandler.java  # Consistent JSON error responses
    ├── entity/
    │   ├── Student.java                 # students table
    │   └── Instructor.java              # instructors table
    ├── repository/
    │   ├── StudentRepository.java       # JpaRepository for Student
    │   └── InstructorRepository.java    # JpaRepository for Instructor
    ├── dto/
    │   ├── request/
    │   │   ├── StudentRequest.java      # create/update payload (validated)
    │   │   └── InstructorRequest.java   # create/update payload (validated)
    │   └── response/
    │       ├── StudentResponse.java     # payload sent to client (no password)
    │       └── InstructorResponse.java  # payload sent to client (no password)
    ├── service/
    │   ├── StudentService.java          # create, get, list, update, deactivate
    │   └── InstructorService.java       # create, get, list, update, deactivate
    └── controller/
        ├── StudentController.java       # POST/GET/PUT/DELETE /api/students
        └── InstructorController.java    # POST/GET/PUT/DELETE /api/instructors
```

### Layer responsibilities

| Layer | Job |
|-------|-----|
| `Controller` | Receives HTTP requests, calls the Service, returns `ResponseEntity` |
| `Service` | Business logic, validation (duplicate email/studentId), password hashing, soft-delete |
| `Repository` | Spring Data JPA — auto-generated CRUD + custom lookups by `studentId`/`instructorId`/`email` |
| `Entity` | JPA-mapped DB tables (`students`, `instructors`) with `createdAt`/`updatedAt` auditing |
| `DTO` (request/response) | Request validation (`@NotBlank`, `@Email`, `@Size`); responses exclude passwords |

---

## 9. What your teammate is building (do NOT touch yet)

**Subjects & Modules** — Create/Read/Update/Delete for subjects and modules owned by an instructor — are assigned to a separate teammate. They will live under their own package/controller when ready. Do not create `Subject` or `Module` entities here; doing so will cause merge conflicts.

If you need to prepare for it, the plan is:
- `Subject` entity (instructor-owned, title, description, etc.)
- `Module` entity (belongs to a Subject)
- `SubjectController` / `ModuleController` under `/api/instructors/{instructorId}/subjects` and `.../modules`

---

## 10. Troubleshooting

| Problem | Fix |
|---------|-----|
| `Access denied for user 'aktibolms_app'@'localhost'` | Re-run the MySQL GRANT statements in step 3; double-check `application.properties` username/password |
| `Unknown database 'aktibolms_db'` | Make sure you created the database in step 3 (note: `createDatabaseIfNotExist=true` in the URL usually handles this, but the user still needs privileges) |
| `Could not resolve dependencies` / `Failure to transfer` | Check your internet connection; run `mvn dependency:purge-local-repository` then rebuild if the local repo is corrupt |
| `Unsupported class file version` | You're compiling with a JDK older than 25 — install JDK 25+ |
| Port 8080 already in use | Change `server.port` in `application.properties` or kill the process on 8080 |
| CORS error from frontend | Confirm frontend is on `http://localhost:5173`; otherwise update `WebConfig.java` `allowedOrigins` |

---

## 11. Quick checklist before you start coding

- [ ] JDK 25 installed (`java -version`)
- [ ] Maven installed (`mvn -version`)
- [ ] MySQL 8+ running
- [ ] `aktibolms_db` database created
- [ ] `aktibolms_app` user created with privileges
- [ ] `application.properties` DB credentials match your MySQL setup
- [ ] `mvn clean compile` → BUILD SUCCESS
- [ ] `mvn test` → **Tests run: 30, Failures: 0, Errors: 0**
- [ ] `mvn spring-boot:run` → app starts on `http://localhost:8080`
- [ ] `POST /api/students` returns 201 with a `StudentResponse` (no password field)

Once all checkboxes are green, you're ready to build on top of the Student/Instructor CRUD. Ask the repo owner (or the teammate handling Subjects & Modules) before touching anything outside the `student`/`instructor` packages to avoid stepping on their work.
