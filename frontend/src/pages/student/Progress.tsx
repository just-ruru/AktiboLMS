import { useEnrolledCourses } from '../../hooks/useCourses'
import { Card, CardBody, CardHeader } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { TrendingUp, BookOpen, CheckCircle, Clock, BarChart2, Loader2 } from 'lucide-react'
import { useMemo } from 'react'

export function StudentProgress() {
  const { data: enrolledCourses, isLoading, error } = useEnrolledCourses()

  const courses = enrolledCourses || []

  // Calculate overall stats
  const totalActiveCourses = courses.length
  const totalLessonsCompleted = useMemo(() => {
    return courses.reduce((sum, course) => {
      // We'll estimate based on progress - this is a rough calculation
      return sum + Math.round((course.progress || 0) / 100 * 10)
    }, 0)
  }, [courses])

  const avgProgress = courses.length > 0
    ? Math.round(courses.reduce((sum, c) => sum + (c.progress || 0), 0) / courses.length)
    : 0

  // Recent activity would need a separate API call
  // For now, we'll show empty state

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="w-8 h-8 animate-spin text-brand-600 dark:text-brand-400" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-fg-tertiary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-fg-primary">Unable to load progress</h3>
          <p className="text-fg-tertiary mt-1">Please try again later</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-fg-primary">Your Progress</h1>
        <p className="text-fg-secondary mt-1">Track your learning journey</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card variant="bordered" accent="brand">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-fg-secondary">Active Courses</p>
                <p className="text-3xl font-bold text-fg-primary">{totalActiveCourses}</p>
              </div>
              <div className="w-12 h-12 bg-brand-100 dark:bg-brand-900/30 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              </div>
            </div>
          </CardBody>
        </Card>
        <Card variant="bordered" accent="success">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-fg-secondary">Lessons Completed</p>
                <p className="text-3xl font-bold text-fg-primary">{totalLessonsCompleted}</p>
              </div>
              <div className="w-12 h-12 bg-success-50 dark:bg-success-500/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success-600 dark:text-success-500" />
              </div>
            </div>
          </CardBody>
        </Card>
        <Card variant="bordered" accent="info">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-fg-secondary">Avg. Progress</p>
                <p className="text-3xl font-bold text-fg-primary">{avgProgress}%</p>
              </div>
              <div className="w-12 h-12 bg-info-50 dark:bg-info-500/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-info-600 dark:text-info-500" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card variant="bordered">
          <CardHeader>
            <h2 className="text-lg font-semibold text-fg-primary flex items-center gap-2">
              <BarChart2 className="w-5 h-5" />
              Course Progress
            </h2>
          </CardHeader>
          <CardBody>
            {courses.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-fg-tertiary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-fg-primary">No courses yet</h3>
                <p className="text-fg-tertiary mt-1">Enroll in courses to track your progress</p>
              </div>
            ) : (
              <div className="space-y-6">
                {courses.map((course) => {
                  const progress = course.progress || 0
                  return (
                    <div key={course.id}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                          </div>
                          <div>
                            <p className="font-medium text-fg-primary">{course.title}</p>
                            <p className="text-sm text-fg-tertiary">{course.moduleCount || 0} modules</p>
                          </div>
                        </div>
                        <Badge variant={progress > 50 ? 'success' : progress > 25 ? 'primary' : 'warning'}>
                          {progress}%
                        </Badge>
                      </div>
                      <div className="w-full bg-border-primary rounded-full h-2">
                        <div
                          className="bg-brand-600 h-2 rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardBody>
        </Card>

        <Card variant="bordered">
          <CardHeader>
            <h2 className="text-lg font-semibold text-fg-primary flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activity
            </h2>
          </CardHeader>
          <CardBody>
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-fg-tertiary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-fg-primary">Activity tracking coming soon</h3>
              <p className="text-fg-tertiary mt-1">Your recent activity will appear here once you start completing lessons and activities.</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}