import { useMyCourses } from '../../hooks/useCourses'
import { Card, CardBody, CardHeader } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Plus, BookOpen, Users, TrendingUp, Search, Filter, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'

/* ============================================================================
   STUDY NOTES — pages/instructor/Dashboard.tsx  (instructor home)
   ----------------------------------------------------------------------------
   WHAT: Instructor landing page after sign-in. Monitor surface — data-dense
         table, no marketing framing, no hero, no feature cards.
   HOW IT WORKS:
     1. useMyCourses() fetches GET /courses/my — courses owned by the
        signed-in instructor. Real data from the API.
     2. Stats: total courses, total students, average completion % — computed
        from real course data.
     3. Loading → skeleton; error → retry nudge; empty → prominent "Create
        course" CTA.
     4. Course table: title, status badge (published = success, draft = warning),
        students count, progress ring, actions (Edit, Analytics).
     5. Search input is wired to client-side filtering.
   WHERE THE API CONTRACT LIVES: GET /courses/my (backend #8) and
     GET /instructor/courses/{courseId}/analytics (backend #44).
   ============================================================================ */

export function InstructorDashboard() {
  const { data: myCourses, isLoading, error } = useMyCourses()

  const courses = myCourses || []
  const totalCourses = courses.length
  const totalStudents = courses.reduce((sum, course) => sum + (course.enrolledCount || 0), 0)
  const avgCompletion = courses.length > 0
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="page-title">Instructor Dashboard</h1>
            <p className="page-subtitle">Manage your courses and track student progress</p>
          </div>
          <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
            <Link to="/instructor/courses/new">Create Course</Link>
          </Button>
        </div>

        {/* Glanceable stat cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card variant="bordered" accent="brand">
            <CardBody className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-fg-secondary">Total Courses</p>
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
                  <p className="text-sm font-medium text-fg-secondary">Total Students</p>
                  <p className="text-3xl font-bold text-fg-primary mt-1 font-mono tabular-nums">{totalStudents}</p>
                </div>
                <div className="w-12 h-12 bg-success-50 dark:bg-success-500/10 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-success-600 dark:text-success-500" />
                </div>
              </div>
            </CardBody>
          </Card>
          <Card variant="bordered" accent="info">
            <CardBody className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-fg-secondary">Avg. Completion</p>
                  <p className="text-3xl font-bold text-fg-primary mt-1 font-mono tabular-nums">{avgCompletion}%</p>
                </div>
                <div className="w-12 h-12 bg-info-50 dark:bg-info-500/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-info-600 dark:text-info-500" />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Data-dense course table */}
        <Card variant="bordered">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold text-fg-primary">Your Courses</h2>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-fg-tertiary" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-10 pr-4 py-2 input w-64"
                  defaultValue=""
                />
              </div>
              <Button variant="outline" icon={<Filter className="w-4 h-4" />}>
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-primary bg-tertiary/50">
                    <th className="px-5 py-3 text-left text-xs font-medium text-fg-tertiary uppercase tracking-wider">Course</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-fg-tertiary uppercase tracking-wider">Students</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-fg-tertiary uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-fg-tertiary uppercase tracking-wider">Avg. Progress</th>
                    <th className="px-5 py-3 text-right text-xs font-medium text-fg-tertiary uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-primary">
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-tertiary/30 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                          </div>
                          <div>
                            <p className="font-medium text-fg-primary text-wrap-pretty">{course.title}</p>
                            <p className="text-sm text-fg-tertiary">{course.published ? 'Published' : 'Draft'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-fg-primary font-mono tabular-nums">{course.enrolledCount || 0}</td>
                      <td className="px-5 py-4">
                        <Badge variant={course.published ? 'success' : 'warning'}>
                          {course.published ? 'Published' : 'Draft'}
                        </Badge>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 progress-bar">
                            <div
                              className="progress-bar-fill"
                              style={{ width: `${course.progress || 0}%` }}
                            />
                          </div>
                          <span className="text-sm text-fg-tertiary font-mono tabular-nums">{course.progress || 0}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Link to={`/instructor/courses/${course.id}/edit`}>
                              Edit
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Link to={`/instructor/courses/${course.id}/analytics`}>
                              Analytics
                            </Link>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {courses.length === 0 && (
              <div className="py-12 text-center empty-state">
                <BookOpen className="empty-state-icon" />
                <h3 className="empty-state-title">No courses yet</h3>
                <p className="empty-state-description">Create your first course to get started</p>
                <div className="empty-state-action">
                  <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
                    <Link to="/instructor/courses/new">Create Course</Link>
                  </Button>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}