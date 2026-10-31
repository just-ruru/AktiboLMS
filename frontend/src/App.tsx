import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import { Layout } from './components/layout/Layout'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { StudentDashboard } from './pages/student/Dashboard'
import { StudentCourseView } from './pages/student/CourseView'
import { StudentLessonView } from './pages/student/LessonView'
import { StudentProgress } from './pages/student/Progress'
import { InstructorDashboard } from './pages/instructor/Dashboard'
import { InstructorCourseBuilder } from './pages/instructor/CourseBuilder'
import { InstructorAnalytics } from './pages/instructor/Analytics'

function PrivateRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes with layout */}
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Navigate to="/dashboard" replace />
            </PrivateRoute>
          }
        />

        {/* Student routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={['student']}>
              <StudentDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses/:courseId"
          element={
            <PrivateRoute allowedRoles={['student']}>
              <StudentCourseView />
            </PrivateRoute>
          }
        />
        <Route
          path="/courses/:courseId/lessons/:lessonId"
          element={
            <PrivateRoute allowedRoles={['student']}>
              <StudentLessonView />
            </PrivateRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <PrivateRoute allowedRoles={['student']}>
              <StudentProgress />
            </PrivateRoute>
          }
        />

        {/* Instructor routes */}
        <Route
          path="/instructor"
          element={
            <PrivateRoute allowedRoles={['instructor']}>
              <InstructorDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/instructor/courses/:courseId/edit"
          element={
            <PrivateRoute allowedRoles={['instructor']}>
              <InstructorCourseBuilder />
            </PrivateRoute>
          }
        />
        <Route
          path="/instructor/courses/:courseId/analytics"
          element={
            <PrivateRoute allowedRoles={['instructor']}>
              <InstructorAnalytics />
            </PrivateRoute>
          }
        />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App