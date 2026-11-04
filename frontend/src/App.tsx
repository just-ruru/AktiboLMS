import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { StudentDashboard } from './pages/student/Dashboard'
import { StudentCourseView } from './pages/student/CourseView'
import { StudentLessonView } from './pages/student/LessonView'
import { StudentProgress } from './pages/student/Progress'
import { StudentMyCourses } from './pages/student/MyCourses'
import { InstructorDashboard } from './pages/instructor/Dashboard'
import { InstructorCourseBuilder } from './pages/instructor/CourseBuilder'
import { InstructorAnalytics } from './pages/instructor/Analytics'
import { PrivateRoute } from './components/auth/PrivateRoute'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes with layout */}
      <Route element={<Layout />}>
        {/* Public home redirect */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        {/* Student routes - protected with student role */}
        <Route element={<PrivateRoute allowedRoles={['student']} />}>
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/my-courses" element={<StudentMyCourses />} />
          <Route path="/courses/:courseId" element={<StudentCourseView />} />
          <Route path="/courses/:courseId/lessons/:lessonId" element={<StudentLessonView />} />
          <Route path="/progress" element={<StudentProgress />} />
        </Route>

        {/* Instructor routes - protected with instructor role */}
        <Route element={<PrivateRoute allowedRoles={['instructor']} />}>
          <Route path="/instructor" element={<InstructorDashboard />} />
          <Route path="/instructor/courses/:courseId/edit" element={<InstructorCourseBuilder />} />
          <Route path="/instructor/courses/:courseId/analytics" element={<InstructorAnalytics />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App