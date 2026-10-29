import { useAuth } from '../../hooks/useAuth'
import { Button } from '../../components/ui/Button'
import { Card, CardBody, CardHeader } from '../../components/ui/Card'
import { BookOpen, ArrowRight, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { clsx } from 'clsx'

export function StudentDashboard() {
  const { user } = useAuth()

  const mockCourses = [
    { id: '1', title: 'Introduction to Programming', progress: 45, lessons: 12, completed: 5 },
    { id: '2', title: 'Web Development Fundamentals', progress: 78, lessons: 8, completed: 6 },
    { id: '3', title: 'Data Structures & Algorithms', progress: 12, lessons: 15, completed: 2 },
  ]

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
                <p className="text-3xl font-bold text-gray-900">{mockCourses.length}</p>
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
                <p className="text-3xl font-bold text-gray-900">13</p>
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
                <p className="text-3xl font-bold text-gray-900">45%</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Continue Learning</h2>
          <Link to="/my-courses" className="text-sm text-primary-600 hover:text-primary-500 font-medium">
            View all courses <ArrowRight className="w-4 h-4 inline ml-1" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockCourses.map((course) => (
            <Link key={course.id} to={`/courses/${course.id}`} className="block">
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardBody className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{course.completed}/{course.lessons} lessons</span>
                    <span className="font-medium text-primary-600">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
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
      </div>

      <div className="pt-8 border-t border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" asChild>
            <Link to="/catalog">
              <BookOpen className="w-8 h-8 text-gray-400" />
              <span className="font-medium text-gray-700">Browse Courses</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" asChild>
            <Link to="/progress">
              <TrendingUp className="w-8 h-8 text-gray-400" />
              <span className="font-medium text-gray-700">View Progress</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2" asChild>
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