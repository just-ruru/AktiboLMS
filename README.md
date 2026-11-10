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

| Constraint                     | Value                                     |
| ------------------------------ | ----------------------------------------- |
| **Team**                       | 3 third-year IT students                  |
| **Timeline**                   | ~4 weeks (1 month)                        |
| **Budget**                     | $0 (free tiers only)                      |
| **Frontend**                   | React 18 + Vite + TypeScript              |
| **Backend**                    | Spring Boot 3.x + Maven                   |
| **State Management**           | TanStack Query (React Query)              |
| **Database**                   | PostgreSQL (Supabase free tier)           |
| **Migrations**                 | Flyway                                    |
| **Code Editor**                | Monaco Editor                             |
| **Code Execution**             | Piston API (piston.rs)                    |
| **Auth**                       | Spring Security + JWT (users in Supabase) |
| **Realtime**                   | Supabase Realtime (Postgres changes)      |
| **Hosting (FE)**               | Vercel                                    |
| **Hosting (BE)**               | Render                                    |
| **Hosting (DB/Auth/Realtime)** | Supabase                                  |

---
