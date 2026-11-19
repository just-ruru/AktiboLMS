import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ForgotPassword } from './pages/ForgotPassword'
import { AccountProfile } from './pages/AccountProfile'
import { LandingPage } from './pages/LandingPage'
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
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/account-profile" element={<AccountProfile />} />

        {/* Student views */}
        <Route path="/student/courses" element={<StudentView />} />
        <Route path="/student/courses/:courseId/subjects" element={<StudentSubjects />} />
        <Route path="/student/courses/:courseId/subjects/:subjectId/modules" element={<StudentModules />} />
        <Route path="/student/progress" element={<StudentProgress />} />
        <Route path="/students/list" element={<StudentList />} />
        <Route path="/students/create" element={<StudentCreate />} />
        <Route path="/students/profile/:id" element={<StudentProfile />} />
        <Route path="/students/update/:id" element={<StudentUpdate />} />

        {/* Instructor views */}
        <Route path="/instructor/courses" element={<InstructorView />} />
        <Route path="/instructor/courses/:courseId/subjects" element={<InstructorSubjects />} />
        <Route path="/instructor/courses/:courseId/subjects/:subjectId/modules" element={<InstructorModules />} />
        <Route path="/instructors/list" element={<InstructorList />} />
        <Route path="/instructors/create" element={<InstructorCreate />} />
        <Route path="/instructors/profile/:id" element={<InstructorProfile />} />
        <Route path="/instructors/update/:id" element={<InstructorUpdate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
