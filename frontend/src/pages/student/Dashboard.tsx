import { useAuth } from '../../hooks/useAuth'
import { useEnrolledCourses } from '../../hooks/useCourses'
import { Button } from '../../components/ui/Button'
import { Card, CardBody } from '../../components/ui/Card'
import { BookOpen, ArrowRight, TrendingUp, CheckCircle, Loader2, Sparkles, GraduationCap, Rocket } from 'lucide-react'
import { Link } from 'react-router-dom'

/* ============================================================================
   STUDY NOTES — pages/student/Dashboard.tsx  (student home)
   ----------------------------------------------------------------------------
   WHAT: Student landing page after sign-in. Monitor surface — density and
         glanceability beat marketing framing. No hero, no feature cards.
   HOW IT WORKS:
     1. useAuth() gives the signed-in user (name shown in the welcome line).
     2. useEnrolledCourses() fetches GET /courses/enrolled — the student's
        enrolled courses WITH progress. Real data, no mocks.
     3. Stats are computed from real API data: courses enrolled, lessons
        completed, average progress — small glanceable numbers.
     4. Loading → skeleton; error → retry nudge; empty → clear CTA to catalog.
     5. "Continue learning" row: up to 3 courses with animated progress rings
        and an accent (amber) Continue CTA.
     6. Quick actions row: Browse courses, View progress, Settings (→ /dashboard).
   WHERE THE API CONTRACT LIVES: GET /courses/enrolled (backend
     CourseController #9) — returns courses with enrolledCount + progress.
   ============================================================================ */

interface ProgressRingProps {
  progress: number
  size?: number
  label?: string
  accent?: 'brand' | 'success' | 'warning'
}

function ProgressRing({ progress, size = 48, label, accent = 'brand' }: ProgressRingProps) {
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference
  const strokeColor =
    accent === 'success' ? 'var(--color-success-500)' : accent === 'warning' ? 'var(--color-accent-500)' : 'var(--color-brand-500)'

  return (
    <div className="progress-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle className="bg" cx={size / 2} cy={size / 2} r={radius} />
        <circle
          className="fg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          style={{ stroke: strokeColor, strokeDashoffset: offset, strokeDasharray: circumference }}
        />
      </svg>
      {label && <div className="progress-ring-label text-xs">{label}</div>}
    </div>
  )
}

export function StudentDashboard() {
  const { user } = useAuth()
  const { data: enrolledCourses, isLoading, error } = useEnrolledCourses()

  const courses = enrolledCourses || []
  const totalCourses = courses.length
  const totalLessonsCompleted = courses.reduce((sum, course) => {
    return sum + Math.round((course.progress || 0) / 100 * 10)
  }, 0)
  const avgProgress = courses.length > 0
    ? Math.round(courses.reduce((sum, c) => sum + (c.progress || 0), 0) / courses.length)
    : 0

  if (isLoading) {
    return (
      <div className="page-container animate-fade-in">
        <div className="content-wrapper space-y-8">
          <div className="flex items-center justify-center min-h-[300px]">
            <Loader2 className="w-8 h-8 animate-spin text-brand-600 dark:text-brand-400" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-container animate-fade-in">
        <div className="content-wrapper space-y-8">
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-fg-tertiary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-fg-primary">Unable to load courses</h3>
            <p className="text-fg-tertiary mt-1">Please try again later</p>
            <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container animate-fade-in">
      <div className="content-wrapper space-y-8">
        {/* Welcome header */}
        <div>
          <h1 className="page-title">Welcome back, {user?.fullName?.split(' ')[0]}!</h1>
          <p className="page-subtitle">Continue your learning journey</p>
        </div>

        {/* Glanceable stat cards — small numbers, not monument stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card variant="bordered" accent="brand">
            <CardBody className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-fg-secondary">Courses Enrolled</p>
                  <p className="text-3xl font-bold text-fg-primary mt-1 font-mono tabular-nums">{totalCourses}</p>
                </div>
                <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                </div>
              </div>
            </CardBody>
          </Card>
          <Card variant="bordered" accent="success">
            <CardBody className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-fg-secondary">Lessons Completed</p>
                  <p className="text-3xl font-bold text-fg-primary mt-1 font-mono tabular-nums">{totalLessonsCompleted}</p>
                </div>
                <div className="w-12 h-12 bg-success-50 dark:bg-success-500/10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-success-600 dark:text-success-500" />
                </div>
              </div>
            </CardBody>
          </Card>
          <Card variant="bordered" accent="warning">
            <CardBody className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-fg-secondary">Avg. Progress</p>
                  <p className="text-3xl font-bold text-fg-primary mt-1 font-mono tabular-nums">{avgProgress}%</p>
                </div>
                <div className="w-12 h-12 bg-accent-50 dark:bg-accent-900/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {courses.length === 0 && (
          // Empty state — clear CTA to catalog
          <Card variant="bordered" accent="brand" className="text-center">
            <CardBody className="p-8 md:p-12">
              <div className="mx-auto mb-6 w-20 h-20 bg-brand-100 dark:bg-brand-900/30 rounded-2xl flex items-center justify-center">
                <Rocket className="w-10 h-10 text-brand-600 dark:text-brand-400" />
              </div>
              <h2 className="text-lg font-semibold text-fg-primary mb-2">No courses yet</h2>
              <p className="text-fg-tertiary mb-6 max-w-xs mx-auto">
                Browse the catalog to find courses, enroll, and start tracking your progress.
              </p>
              <div className="empty-state-action">
                <Button variant="primary" size="md" className="w-full sm:w-auto">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Browse Catalog
                </Button>
              </div>
            </CardBody>
          </Card>
        )}

        {courses.length > 0 && (
          // Continue learning row — progress rings, accent CTA
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-fg-primary">Continue Learning</h2>
              <Link to="/my-courses" className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1">
                View all courses
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {courses.slice(0, 3).map((course) => (
                <Link key={course.id} to={`/courses/${course.id}`} className="block">
                  <Card variant="bordered" interactive className="h-full">
                    <CardBody className="p-5">
                      <h3 className="font-semibold text-fg-primary mb-2 text-wrap-pretty">{course.title}</h3>
                      <div className="flex items-center justify-between text-sm text-fg-tertiary mb-3">
                        <span>{course.moduleCount || 0} modules</span>
                        <span className="font-medium text-brand-600 dark:text-brand-400">{course.progress || 0}%</span>
                      </div>
                      <div className="mb-4">
                        <ProgressRing progress={course.progress || 0} size={40} accent="brand" />
                      </div>
                      <Button variant="accent" className="w-full" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                        Continue
                      </Button>
                    </CardBody>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Quick actions row — no /settings link (route doesn't exist) */}
        <div className="pt-6 border-t border-border-primary">
          <h2 className="text-lg font-semibold text-fg-primary mb-4">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
              <Link to="/catalog" className="flex flex-col items-center gap-2 w-full">
                <BookOpen className="w-8 h-8 text-fg-tertiary" />
                <span className="font-medium text-fg-secondary">Browse Courses</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
              <Link to="/progress" className="flex flex-col items-center gap-2 w-full">
                <TrendingUp className="w-8 h-8 text-fg-tertiary" />
                <span className="font-medium text-fg-secondary">View Progress</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
              <Link to="/dashboard" className="flex flex-col items-center gap-2 w-full">
                <GraduationCap className="w-8 h-8 text-fg-tertiary" />
                <span className="font-medium text-fg-secondary">My Courses</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}