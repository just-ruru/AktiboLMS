import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ForgotPassword } from './pages/ForgotPassword'
import { AccountProfile } from './pages/AccountProfile'
import { EditProfile } from './pages/EditProfile'
import { AccountSecurity } from './pages/AccountSecurity'
import { ChooseRole } from './pages/ChooseRole'
import { InstructorAccountProfile } from './pages/InstructorAccountProfile'
import { LandingPage } from './pages/LandingPage'
import { Pricing } from './pages/Pricing'
import { HelpSupport } from './pages/HelpSupport'
import { SupportRequestSent } from './pages/SupportRequestSent'
import { ResetLinkSent } from './pages/ResetLinkSent'
import { SetNewPassword } from './pages/SetNewPassword'
import { PasswordUpdated } from './pages/PasswordUpdated'
import { VerifyEmail } from './pages/VerifyEmail'
import { NotFound } from './pages/NotFound'
import { StudentCourses } from './pages/student/StudentCourses'
import { StudentSubjects } from './pages/student/StudentSubjects'
import { StudentModules } from './pages/student/StudentModules'
import { StudentEnrollCourse } from './pages/student/StudentEnrollCourse'
import { StudentInteractiveLesson } from './pages/student/StudentInteractiveLesson'
import { StudentMultimediaLesson } from './pages/student/StudentMultimediaLesson'
import { StudentPracticeFeedback } from './pages/student/StudentPracticeFeedback'
import { StudentModuleComplete } from './pages/student/StudentModuleComplete'
import { StudentProgress } from './pages/student/StudentProgress'
import { InstructorCourses } from './pages/instructor/InstructorCourses'
import { InstructorSubjects } from './pages/instructor/InstructorSubjects'
import { InstructorModules } from './pages/instructor/InstructorModules'
import { InstructorCreateCourse } from './pages/instructor/InstructorCreateCourse'
import { InstructorLessonEditor } from './pages/instructor/InstructorLessonEditor'
import { InstructorPracticeEditor } from './pages/instructor/InstructorPracticeEditor'
import { InstructorPublishReview } from './pages/instructor/InstructorPublishReview'
import { InstructorCourseAnalytics } from './pages/instructor/InstructorCourseAnalytics'
import { InstructorLearnerProgress } from './pages/instructor/InstructorLearnerProgress'
import { PrototypeFinalPractice } from './pages/prototype/PrototypeFinalPractice'
import { PrototypeQuickCheckResults } from './pages/prototype/PrototypeQuickCheckResults'
import { PrototypeLoopsIteration } from './pages/prototype/PrototypeLoopsIteration'
import { PrototypeEnrollmentConfirmed } from './pages/prototype/PrototypeEnrollmentConfirmed'
import { OverlayPreview } from './pages/overlays/OverlayPreview'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password/sent" element={<ResetLinkSent />} />
        <Route path="/reset-password" element={<SetNewPassword />} />
        <Route path="/reset-password/updated" element={<PasswordUpdated />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/choose-role" element={<ChooseRole />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/help" element={<HelpSupport />} />
        <Route path="/help/request-sent" element={<SupportRequestSent />} />
        <Route path="/account-profile" element={<AccountProfile />} />
        <Route path="/account-profile/edit" element={<EditProfile />} />
        <Route path="/account/security" element={<AccountSecurity />} />
        <Route path="/account/instructor-profile" element={<InstructorAccountProfile />} />

        <Route path="/courses" element={<StudentCourses />} />
        <Route path="/courses/subjects" element={<StudentSubjects />} />
        <Route path="/courses/subjects/modules" element={<StudentModules />} />
        <Route path="/courses/enroll" element={<StudentEnrollCourse />} />
        <Route path="/courses/lessons" element={<StudentInteractiveLesson />} />
        <Route path="/courses/lessons/multimedia" element={<StudentMultimediaLesson />} />
        <Route path="/courses/practice/feedback" element={<StudentPracticeFeedback />} />
        <Route path="/courses/modules/complete" element={<StudentModuleComplete />} />
        <Route path="/courses/progress" element={<StudentProgress />} />

        <Route path="/instructor/courses" element={<InstructorCourses />} />
        <Route path="/instructor/courses/subjects" element={<InstructorSubjects />} />
        <Route path="/instructor/courses/modules" element={<InstructorModules />} />
        <Route path="/instructor/courses/new" element={<InstructorCreateCourse />} />
        <Route path="/instructor/lessons/edit" element={<InstructorLessonEditor />} />
        <Route path="/instructor/practice/edit" element={<InstructorPracticeEditor />} />
        <Route path="/instructor/publish/review" element={<InstructorPublishReview />} />
        <Route path="/instructor/analytics" element={<InstructorCourseAnalytics />} />
        <Route path="/instructor/progress" element={<InstructorLearnerProgress />} />

        <Route path="/practice/final-question" element={<PrototypeFinalPractice />} />
        <Route path="/practice/quick-check-results" element={<PrototypeQuickCheckResults />} />
        <Route path="/practice/loops" element={<PrototypeLoopsIteration />} />
        <Route path="/enrollment/confirmed" element={<PrototypeEnrollmentConfirmed />} />
        <Route path="/overlays" element={<OverlayPreview />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
