import { useAuth } from '../../hooks/useAuth'
import { useEnrolledCourses } from '../../hooks/useCourses'
import { Button } from '../../components/ui/Button'
import { Card, CardBody } from '../../components/ui/Card'
import { BookOpen, ArrowRight, TrendingUp, Clock, CheckCircle, Loader2, Sparkles, GraduationCap, Rocket } from 'lucide-react'
import { Link } from 'react-router-dom'

export function StudentDashboard() {
  const { user } = useAuth()
  const { data: enrolledCourses, isLoading, error } = useEnrolledCourses()

  const courses = enrolledCourses || []
  const totalCourses = courses.length
  const totalLessonsCompleted = courses.reduce((sum, course) => {
    // We'll estimate based on progress - this is a rough calculation
    return sum + Math.round((course.progress || 0) / 100 * 10) // rough estimate
  }, 0)
  const avgProgress = courses.length > 0
    ? Math.round(courses.reduce((sum, c) => sum + (c.progress || 0), 0) / courses.length)
    : 0

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
          <h3 className="text-lg font-medium text-gray-900">Unable to load courses</h3>
          <p className="text-gray-500 mt-1">Please try again later</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.fullName?.split(' ')[0]}!</h1>
        <p className="text-gray-500 mt-1">Continue your learning journey</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Courses Enrolled</p>
                <p className="text-3xl font-bold text-gray-900">{totalCourses}</p>
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
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {courses.length === 0 && (
        // Get Started Section - Prominent CTA for new users
        <Card className="bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200">
          <CardBody className="p-8 md:p-12 text-center">
            <div className="mx-auto mb-6 w-20 h-20 bg-primary-600 rounded-2xl flex items-center justify-center">
              <Rocket className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to start learning?</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              It looks like you don&apos;t have any courses yet. Browse our catalog to find courses that match your interests and start building new skills today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2">
                <Link to="/catalog">
                  <Sparkles className="w-5 h-5" />
                  Get Started &rarr; Browse Courses
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                <Link to="/my-courses">
                  <GraduationCap className="w-5 h-5" />
                  View My Courses
                </Link>
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Courses are created by instructors and published to the catalog. Once enrolled, they&apos;ll appear here with your progress tracking.
            </p>
          </CardBody>
        </Card>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Continue Learning</h2>
          <Link to="/my-courses" className="text-sm text-primary-600 hover:text-primary-500 font-medium">
            View all courses <ArrowRight className="w-4 h-4 inline ml-1" />
          </Link>
        </div>
        {courses.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <Link key={course.id} to={`/courses/${course.id}`} className="block">
                <Card className="hover:shadow-md transition-shadow h-full">
                  <CardBody className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>{course.moduleCount || 0} modules</span>
                      <span className="font-medium text-primary-600">{course.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${course.progress || 0}%` }}
                      />
                    </div>
                    <Button variant="primary" className="w-full mt-4" size="sm">
                      Continue <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="pt-8 border-t border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
            <Link to="/catalog">
              <BookOpen className="w-8 h-8 text-gray-400" />
              <span className="font-medium text-gray-700">Browse Courses</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
            <Link to="/progress">
              <TrendingUp className="w-8 h-8 text-gray-400" />
              <span className="font-medium text-gray-700">View Progress</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2">
            <Link to="/settings">
              <Clock className="w-8 h-8 text-gray-400" />
              <span className="font-medium text-gray-700">Settings</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}