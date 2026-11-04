import { useEnrolledCourses } from '../../hooks/useCourses'
import { Card, CardBody } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { BookOpen, Search, Filter, ArrowRight, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export function StudentMyCourses() {
  const [search, setSearch] = useState('')
  const { data: enrolledCourses, isLoading, error } = useEnrolledCourses()

  const courses = enrolledCourses || []

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Unable to load courses</h3>
          <p className="text-gray-500 mt-1">Please try again later</p>
        </div>
      </div>
    )
  }

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase()) ||
    course.description?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-500">Continue learning where you left off</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search my courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <Card>
          <CardBody className="py-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              {search ? 'No courses found' : 'No courses yet'}
            </h3>
            <p className="text-gray-500 mt-1">
              {search
                ? 'Try adjusting your search'
                : 'Enroll in a course to get started'}
            </p>
            {!search && (
              <Button variant="primary" className="mt-4">
                <Link to="/catalog">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Courses
                </Link>
              </Button>
            )}
          </CardBody>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Link key={course.id} to={`/courses/${course.id}`} className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-gray-300" />
                  </div>
                  {course.progress !== undefined && course.progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                      <div
                        className="h-full bg-primary-600 transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                <CardBody className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{course.title}</h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.description || 'No description'}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1">{course.moduleCount || 0} modules</span>
                    {course.progress !== undefined && (
                      <span className="flex items-center gap-1 font-medium text-primary-600">
                        {course.progress}% complete
                      </span>
                    )}
                  </div>
                  <Button variant="primary" className="w-full" size="sm">
                    Continue <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}