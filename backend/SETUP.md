# AktiboLMS Backend — Teammate Setup Guide

This guide walks you through setting up the **AktiboLMS Spring Boot + MySQL backend**
on your machine after pulling the repository. It is written for the three of us
(Nnyl Jake G. Rayos, Jhon Kyle Po, Johnler Cabo) so we can all run the same
backend locally.

---

## 1. Prerequisites

You need the following installed on your machine:

| Tool | Version | Install check |
|------|---------|---------------|
| **Java (JDK)** | 17 or 21 (JDK 25 also works) | `java -version` |
| **Maven** | 3.9+ | `mvn -version` |
| **MySQL Server** | 8.0+ | `mysql --version` |
| **Git** | any recent | `git --version` |

### If you're on Windows and missing Maven or MySQL

Using **winget** (built into Windows 11):

```powershell
# Install Maven
winget install Apache.Maven

# Install MySQL (Community Installer, or use the MySQL Installer for Windows)
winget install Oracle.MySQL
```

After installing, **restart your terminal** so the new commands are on your PATH.

Verify everything:

```powershell
java -version
mvn -version
mysql --version
```

---

## 2. Clone the repository

```powershell
git clone <repo-url>
cd AktiboLMS/AktiboLMS
```

> The backend lives in the `backend/` folder at the repo root.

---

## 3. Set up the MySQL database

### Option A: MySQL is already installed and running

1. Open a terminal and log into MySQL as root:

   ```powershell
   mysql -u root -p
   ```

   (Enter your root password when prompted. If you set no password, just run `mysql -u root`.)

2. Create the database:

   ```sql
   CREATE DATABASE aktibolms_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   EXIT;
   ```

3. Update `backend/src/main/resources/application.properties` if your MySQL username/password differ:

   ```properties
   spring.datasource.username=your_mysql_username
   spring.datasource.password=your_mysql_password
   ```

### Option B: You don't have MySQL yet (Windows)

Install via winget:

```powershell
winget install Oracle.MySQL
```

During installation:
- Choose **Server Only** or **Full** (Full includes Workbench, which is helpful for browsing tables).
- Set a root password you'll remember, or choose **no password** for local dev.
- Choose **MySQL 8.0**.
- Enable **legacy authentication** if prompted (optional).

After installation, start the MySQL service:

```powershell
# If installed as a Windows service, it starts automatically. Otherwise:
net start mysql80   # service name may vary
```

Then create the database as shown in Option A.

---

## 4. Build the backend

Open a terminal in the `backend/` folder:

```powershell
cd backend
mvn clean install -DskipTests
```

What this does:
- Downloads all dependencies (Spring Boot, Hibernate, MySQL connector, etc.)
- Compiles the Java source
- Packages a runnable JAR in `backend/target/`

If the build is green, you're ready to run.

---

## 5. Run the backend

From the `backend/` folder:

```powershell
mvn spring-boot:run
```

Or run the packaged JAR directly:

```powershell
java -jar target/backend-1.0.0.jar
```

You should see logs ending with something like:

```
Started AktiboLmsBackendApplication in X.XXX seconds
```

The backend is now live at:

```
http://localhost:8080
```

---

## 6. Verify it works (Postman)

**Yes — this backend is fully accessible via Postman.** It exposes HTTP REST endpoints,
so you can test every CRUD operation without the frontend.

Import this collection or create requests manually:

| Method | Endpoint | Body (JSON) | Purpose |
|--------|----------|-------------|---------|
| `POST` | `/api/students` | `{ "studentId": "S001", "firstName": "Juan", "lastName": "Dela Cruz", "email": "juan@school.edu", "password": "password123", "description": "BSIT student" }` | Create student account |
| `GET` | `/api/students/1` | — | Get student profile by ID |
| `GET` | `/api/students` | — | List all active students |
| `PUT` | `/api/students/1` | `{ "firstName": "Juanita", ... }` | Update student profile |
| `DELETE` | `/api/students/1` | — | Deactivate student account |
| `POST` | `/api/instructors` | `{ "instructorId": "I001", "firstName": "Maria", "lastName": "Santos", "email": "maria@school.edu", "password": "password123", "description": "Instructor" }` | Create instructor profile |
| `GET` | `/api/instructors/1` | — | Get instructor profile by ID |
| `GET` | `/api/instructors` | — | List all active instructors |
| `PUT` | `/api/instructors/1` | `{ "description": "Senior Instructor" }` | Update instructor profile |
| `DELETE` | `/api/instructors/1` | — | Deactivate instructor account |

**Postman tips:**
- Set `Content-Type: application/json` in the request headers (Postman does this automatically when you select the JSON body type).
- Base URL: `http://localhost:8080`
- Passwords are **never returned** in responses — they are hashed with BCrypt before storage.
- The backend currently has no login prompt because Spring Security's web starter is not included. Requests are unauthenticated; do not expose this API beyond trusted local development until authentication and authorization are implemented.

---

## 7. Project structure (backend/)

```
backend/
├── pom.xml                              # Maven build file (dependencies)
├── src/
│   ├── main/
│   │   ├── java/com/aktibolms/backend/
│   │   │   ├── AktiboLmsBackendApplication.java   # Main Spring Boot class
│   │   │   ├── config/
│   │   │   │   └── WebConfig.java                 # CORS config (frontend: localhost:5173)
│   │   │   ├── controller/
│   │   │   │   ├── StudentController.java         # /api/students CRUD
│   │   │   │   └── InstructorController.java      # /api/instructors CRUD
│   │   │   ├── entity/
│   │   │   │   ├── Student.java                   # JPA entity -> students table
│   │   │   │   └── Instructor.java                # JPA entity -> instructors table
│   │   │   ├── repository/
│   │   │   │   ├── StudentRepository.java         # Spring Data JPA repo
│   │   │   │   └── InstructorRepository.java      # Spring Data JPA repo
│   │   │   ├── service/
│   │   │   │   ├── StudentService.java            # Business logic (students)
│   │   │   │   └── InstructorService.java         # Business logic (instructors)
│   │   │   ├── security/
│   │   │   │   └── SecurityConfig.java            # BCrypt password encoder bean (crypto only)
│   │   │   ├── dto/request/
│   │   │   │   ├── StudentRequest.java
│   │   │   │   └── InstructorRequest.java
│   │   │   └── dto/response/
│   │   │       ├── StudentResponse.java           # Excludes password
│   │   │       └── InstructorResponse.java        # Excludes password
│   │   │   └── exception/
│   │   │       ├── ResourceNotFoundException.java
│   │   │       └── GlobalExceptionHandler.java
│   │   └── resources/
│   │       └── application.properties             # DB + server config
│   └── test/
├── SETUP.md                                 # This file
└── README.md                                # Backend overview
```

---

## 8. What's NOT included yet (teammate split)

Per our agreement:

| Item | Who | Status |
|------|-----|--------|
| Student CRUD | You (this backend) | ✅ Done |
| Instructor CRUD | You (this backend) | ✅ Done |
| Course entity + CRUD | Teammate | ⏳ Pending |
| Module/Subject entity + CRUD | Teammate | ⏳ Pending |
| Auth / JWT / login | Pending | ⏳ Pending (API currently has no authentication) |
| Enrollment / progress tracking | Pending | ⏳ Pending |

When your teammate adds Course/Module, they should follow the same package structure
(`entity/`, `repository/`, `service/`, `controller/`, `dto/`) so the codebase stays
consistent.

---

## 9. Common issues & fixes

| Problem | Likely cause | Fix |
|---------|--------------|-----|
| `mvn` not found | Maven not installed or not on PATH | `winget install Apache.Maven`, restart terminal |
| `CommunicationsException` / DB connection refused | MySQL not running, wrong port, or wrong credentials | Check MySQL service; verify `spring.datasource.*` in `application.properties` |
| `Access denied for user 'root'@'localhost'` | Wrong MySQL password | Update `spring.datasource.password` in `application.properties` |
| Table already exists / column mismatch | Hibernate `ddl-auto=update` schema drift | Drop and recreate `aktibolms_db`, or use `ddl-auto=create-drop` for a clean slate |
| Port 8080 already in use | Another app using 8080 | Change `server.port` in `application.properties` |
| CORS error from frontend | Frontend on different port than `localhost:5173` | Update `allowedOrigins` in `config/WebConfig.java` |

---

## 10. Next steps (after this backend is stable)

1. Add Spring Security filter chain + JWT authentication (`/api/auth/login`, `/api/auth/register`).
2. Add role-based access control (`STUDENT` vs `INSTRUCTOR` roles).
3. Add Course and Module entities (teammate's work).
4. Add enrollment + progress tracking entities.
5. Write unit + integration tests.

---

**Questions?** Reach out to whoever owns the backend branch, or open an issue in the repo.
