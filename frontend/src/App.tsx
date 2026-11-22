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
  )
}

export default App
