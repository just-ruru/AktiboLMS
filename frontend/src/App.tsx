<<<<<<< HEAD
/* ============================================================================
   STUDY NOTES — App.tsx  (routing shell)
   ----------------------------------------------------------------------------
   WHAT: React Router v6 route map. This is the single source of truth for
         which URL renders which page, and which routes are protected.
   HOW IT WORKS:
     1. Public routes (/login, /register) render directly — no auth required.
     2. Everything else sits inside <Layout /> so the navbar/shell persists.
     3. <PrivateRoute allowedRoles={['student'|'instructor']}> checks the
        AuthContext user object and redirects to /login when missing or to / 
        when the role doesn't match.
     4. "*" catches 404s and sends the user home.
   WHERE THE API CONTRACT LIVES: none here — App.tsx only handles navigation.
   Data fetching happens in page components via hooks (useAuth, useCourses,
   useLesson, …) which call services/api.ts.
   WHAT TO CHANGE FOR THE NEW UI:
     • Add a public landing page at "/" (see UI-UX-CONCEPT.md §4-A). Put it
       OUTSIDE the <Layout /> group so it can be full-bleed (no navbar).
     • Keep /login and /register public; keep /dashboard and /instructor
       role-guarded.
     • Consider adding a route guard that also checks "course published +
       enrollment" for /courses/:courseId (backend secures this too — see
       ENDPOINT-AUDIT.md #10).
   QA LINK: qa-report.json HIGH — useAuth called inside PrivateRoute causes
            per-route re-renders (minor; fine for v1, revisit later).
   ============================================================================ */
import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { LandingPage } from './pages/landing/LandingPage'
import { StudentDashboard } from './pages/student/Dashboard'
import { StudentCourseView } from './pages/student/CourseView'
import { StudentLessonView } from './pages/student/LessonView'
import { StudentProgress } from './pages/student/Progress'
import { StudentMyCourses } from './pages/student/MyCourses'
import { StudentCatalog } from './pages/student/Catalog'
import { InstructorDashboard } from './pages/instructor/Dashboard'
import { InstructorCourses } from './pages/instructor/InstructorCourses'
import { InstructorCourseBuilder } from './pages/instructor/CourseBuilder'
import { InstructorAnalytics } from './pages/instructor/Analytics'
import { PrivateRoute } from './components/auth/PrivateRoute'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes with layout */}
      <Route element={<Layout />}>
        {/* Student routes - protected with student role */}
        <Route element={<PrivateRoute allowedRoles={['student']} />}>
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/catalog" element={<StudentCatalog />} />
          <Route path="/my-courses" element={<StudentMyCourses />} />
          <Route path="/courses/:courseId" element={<StudentCourseView />} />
          <Route path="/courses/:courseId/lessons/:lessonId" element={<StudentLessonView />} />
          <Route path="/progress" element={<StudentProgress />} />
        </Route>

        {/* Instructor routes - protected with instructor role */}
        <Route element={<PrivateRoute allowedRoles={['instructor']} />}>
          <Route path="/instructor" element={<InstructorDashboard />} />
          <Route path="/instructor/courses" element={<InstructorCourses />} />
          <Route path="/instructor/courses/new" element={<InstructorCourseBuilder />} />
          <Route path="/instructor/courses/:courseId/edit" element={<InstructorCourseBuilder />} />
          <Route path="/instructor/courses/:courseId/analytics" element={<InstructorAnalytics />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
=======
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ForgotPassword } from './pages/ForgotPassword'
import { AccountProfile } from './pages/AccountProfile'
import { LandingPage } from './pages/LandingPage'
import { ChooseRole } from './pages/ChooseRole'
import { PublicPricingAndAccess } from './pages/PublicPricingAndAccess'
import { PublicHelpAndSupport } from './pages/PublicHelpAndSupport'
import { AccountEditProfile } from './pages/AccountEditProfile'
import { AccountSecurity } from './pages/AccountSecurity'
import { AccountVerifyEmail } from './pages/AccountVerifyEmail'
import { InstructorAccountProfile } from './pages/InstructorAccountProfile'
import { StudentEnrollCourse } from './pages/StudentEnrollCourse'
import { StudentInteractiveLesson } from './pages/StudentInteractiveLesson'
import { StudentMultimediaLesson } from './pages/StudentMultimediaLesson'
import { StudentPracticeFeedback } from './pages/StudentPracticeFeedback'
import { StudentFinalPracticeQuestion } from './pages/StudentFinalPracticeQuestion'
import { StudentQuickCheckResults } from './pages/StudentQuickCheckResults'
import { StudentLoopsIteration } from './pages/StudentLoopsIteration'
import { InstructorCreateCourse } from './pages/InstructorCreateCourse'
import { InstructorLessonEditor } from './pages/InstructorLessonEditor'
import { InstructorPracticeEditor } from './pages/InstructorPracticeEditor'
import { InstructorPublishReview } from './pages/InstructorPublishReview'
import { InstructorCourseAnalytics } from './pages/InstructorCourseAnalytics'
import { InstructorLearnerProgress } from './pages/InstructorLearnerProgress'
import { AccountResetLinkSent } from './pages/AccountResetLinkSent'
import { AccountSetNewPassword } from './pages/AccountSetNewPassword'
import { AccountPasswordUpdated } from './pages/AccountPasswordUpdated'
import { SupportRequestSent } from './pages/SupportRequestSent'
import { StudentModuleComplete } from './pages/StudentModuleComplete'
import { OverlayConfirmLogout } from './components/ui/OverlayConfirmLogout'
import { OverlayFormValidation } from './components/ui/OverlayFormValidation'
import { OverlaySelectOption } from './components/ui/OverlaySelectOption'
import { StudentList } from './pages/StudentList'
import { StudentCreate } from './pages/StudentCreate'
import { StudentProfile } from './pages/StudentProfile'
import { StudentUpdate } from './pages/StudentUpdate'
import { StudentView } from './pages/StudentView'
import { StudentSubjects } from './pages/StudentSubjects'
import { StudentModules } from './pages/StudentModules'
import { StudentProgress } from './pages/StudentProgress'
import { InstructorList } from './pages/InstructorList'
import { InstructorCreate } from './pages/InstructorCreate'
import { InstructorProfile } from './pages/InstructorProfile'
import { InstructorUpdate } from './pages/InstructorUpdate'
import { InstructorView } from './pages/InstructorView'
import { InstructorSubjects } from './pages/InstructorSubjects'
import { InstructorModules } from './pages/InstructorModules'
import { NotFound } from './pages/NotFound'
import { MainLayout } from './layouts/MainLayout'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PublicPricingAndAccess />} />
        <Route path="/help-support" element={<PublicHelpAndSupport />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<MainLayout />}>
          <Route path="/choose-role" element={<ChooseRole />} />
          <Route path="/student/enroll" element={<StudentEnrollCourse />} />
          <Route path="/student/lesson" element={<StudentInteractiveLesson />} />
          <Route path="/student/multimedia-lesson" element={<StudentMultimediaLesson />} />
          <Route path="/student/practice-feedback" element={<StudentPracticeFeedback />} />
          <Route path="/student/final-practice" element={<StudentFinalPracticeQuestion />} />
          <Route path="/student/quick-check" element={<StudentQuickCheckResults />} />
          <Route path="/student/loops-iteration" element={<StudentLoopsIteration />} />
          <Route path="/account-profile" element={<AccountProfile />} />
          <Route path="/edit-profile" element={<AccountEditProfile />} />
          <Route path="/security" element={<AccountSecurity />} />
          <Route path="/verify-email" element={<AccountVerifyEmail />} />
          <Route path="/account/set-new-password" element={<AccountSetNewPassword />} />
          <Route path="/account/password-updated" element={<AccountPasswordUpdated />} />
          <Route path="/support-request-sent" element={<SupportRequestSent />} />
          <Route path="/instructor/account-profile" element={<InstructorAccountProfile />} />
          <Route path="/account/reset-link-sent" element={<AccountResetLinkSent />} />
          <Route path="/account/confirm-logout" element={<OverlayConfirmLogout />} />
          <Route path="/account/form-validation" element={<OverlayFormValidation />} />
          <Route path="/account/select-option" element={<OverlaySelectOption />} />

          {/* Student views */}
          <Route path="/student/courses" element={<StudentView />} />
          <Route path="/student/courses/:courseId/subjects" element={<StudentSubjects />} />
          <Route path="/student/courses/:courseId/subjects/:subjectId/modules" element={<StudentModules />} />
          <Route path="/student/progress" element={<StudentProgress />} />
          <Route path="/student/module-complete" element={<StudentModuleComplete />} />
          <Route path="/students/list" element={<StudentList />} />
          <Route path="/students/create" element={<StudentCreate />} />
          <Route path="/students/profile/:id" element={<StudentProfile />} />
          <Route path="/students/update/:id" element={<StudentUpdate />} />

          {/* Instructor views */}
          <Route path="/instructor/courses" element={<InstructorView />} />
          <Route path="/instructor/create-course" element={<InstructorCreateCourse />} />
          <Route path="/instructor/lesson-editor" element={<InstructorLessonEditor />} />
          <Route path="/instructor/practice-editor" element={<InstructorPracticeEditor />} />
          <Route path="/instructor/publish-review" element={<InstructorPublishReview />} />
          <Route path="/instructor/course-analytics" element={<InstructorCourseAnalytics />} />
          <Route path="/instructor/learner-progress" element={<InstructorLearnerProgress />} />
          <Route path="/instructor/courses/:courseId/subjects" element={<InstructorSubjects />} />
          <Route path="/instructor/courses/:courseId/subjects/:subjectId/modules" element={<InstructorModules />} />
          <Route path="/instructors/list" element={<InstructorList />} />
          <Route path="/instructors/create" element={<InstructorCreate />} />
          <Route path="/instructors/profile/:id" element={<InstructorProfile />} />
          <Route path="/instructors/update/:id" element={<InstructorUpdate />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
>>>>>>> frontend
  )
}

export default App
