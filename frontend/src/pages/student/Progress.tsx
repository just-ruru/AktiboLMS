import { Card, CardBody, CardHeader } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { TrendingUp, BookOpen, CheckCircle, Clock, BarChart2 } from 'lucide-react'

export function StudentProgress() {
  const mockProgress = [
    { course: 'Introduction to Programming', progress: 45, completed: 5, total: 12, lastAccessed: '2 hours ago' },
    { course: 'Web Development Fundamentals', progress: 78, completed: 6, total: 8, lastAccessed: '1 day ago' },
    { course: 'Data Structures & Algorithms', progress: 12, completed: 2, total: 15, lastAccessed: '1 week ago' },
  ]

  const mockActivityHistory = [
    { activity: 'Variables Quiz', course: 'Intro to Programming', type: 'quiz', score: 85, date: '2 hours ago', status: 'completed' },
    { activity: 'Hello World Exercise', course: 'Intro to Programming', type: 'code', score: 100, date: '1 day ago', status: 'completed' },
    { activity: 'Data Types Quiz', course: 'Intro to Programming', type: 'quiz', score: 70, date: '2 days ago', status: 'completed' },
    { activity: 'HTML Basics Exercise', course: 'Web Dev Fundamentals', type: 'code', score: 90, date: '3 days ago', status: 'completed' },
  ]

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
                <p className="text-3xl font-bold text-gray-900">3</p>
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
                <p className="text-sm font-medium text-gray-500">Activities Completed</p>
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
                <p className="text-sm font-medium text-gray-500">Avg. Score</p>
                <p className="text-3xl font-bold text-gray-900">86%</p>
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
            <div className="space-y-6">
              {mockProgress.map((course) => (
                <div key={course.course}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{course.course}</p>
                        <p className="text-sm text-gray-500">{course.completed}/{course.total} lessons • {course.lastAccessed}</p>
                      </div>
                    </div>
                    <Badge variant={course.progress > 50 ? 'success' : course.progress > 25 ? 'primary' : 'warning'}>
                      {course.progress}%
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
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
            <div className="space-y-4">
              {mockActivityHistory.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: activity.type === 'code' ? '#e0f2fe' : '#fef3c7',
                    }}
                  >
                    {activity.type === 'code' ? (
                      <BarChart2 className="w-5 h-5 text-primary-600" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{activity.activity}</p>
                    <p className="text-sm text-gray-500">{activity.course} • {activity.date}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={activity.score >= 80 ? 'success' : activity.score >= 60 ? 'warning' : 'danger'}>
                      {activity.score}%
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1 capitalize">{activity.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}