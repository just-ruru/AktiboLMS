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
| Password hashing | BCrypt (Spring Security) |
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

See `SETUP.md` for full Postman examples and teammate onboarding instructions.

## Postman

Yes — all endpoints are standard HTTP REST and work in Postman. Base URL:
`http://localhost:8080`. Passwords are hashed (BCrypt) and never returned in responses.

## Notes

- Course and Module entities/CRUD are handled by a separate teammate and are not in this backend yet.
- Full Spring Security + JWT auth is planned as a follow-up. Currently endpoints are open for local development.
- Soft delete: `DELETE` sets `is_active = false` rather than hard-deleting rows.
