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

  const avgScore = useMemo(() => {
    // This would require fetching activity progress data
    // For now, return a placeholder
    return 0
  }, [courses])

  // Recent activity would need a separate API call
  // For now, we'll show empty state

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Unable to load progress</h3>
          <p className="text-gray-500 mt-1">Please try again later</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Your Progress</h1>
        <p className="text-gray-500 mt-1">Track your learning journey</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Courses</p>
                <p className="text-3xl font-bold text-gray-900">{totalActiveCourses}</p>
              </div>
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Lessons Completed</p>
                <p className="text-3xl font-bold text-gray-900">{totalLessonsCompleted}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Progress</p>
                <p className="text-3xl font-bold text-gray-900">{avgProgress}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <BarChart2 className="w-5 h-5" />
              Course Progress
            </h2>
          </CardHeader>
          <CardBody>
            {courses.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No courses yet</h3>
                <p className="text-gray-500 mt-1">Enroll in courses to track your progress</p>
              </div>
            ) : (
              <div className="space-y-6">
                {courses.map((course) => (
                  <div key={course.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{course.title}</p>
                          <p className="text-sm text-gray-500">{course.moduleCount || 0} modules</p>
                        </div>
                      </div>
                      <Badge variant={course.progress > 50 ? 'success' : course.progress > 25 ? 'primary' : 'warning'}>
                        {course.progress || 0}%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${course.progress || 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activity
            </h2>
          </CardHeader>
          <CardBody>
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Activity tracking coming soon</h3>
              <p className="text-gray-500 mt-1">Your recent activity will appear here once you start completing lessons and activities.</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}