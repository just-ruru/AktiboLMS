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
          <Loader2 className="w-8 h-8 animate-spin text-brand-600 dark:text-brand-400" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-fg-tertiary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-fg-primary">Unable to load courses</h3>
          <p className="text-fg-tertiary mt-1">Please try again later</p>
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
          <h1 className="text-2xl font-bold text-fg-primary">My Courses</h1>
          <p className="text-fg-secondary">Continue learning where you left off</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-fg-tertiary" />
            <input
              type="text"
              placeholder="Search my courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 input w-64"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <Card variant="bordered">
          <CardBody className="py-12 text-center">
            <BookOpen className="w-12 h-12 text-fg-tertiary mx-auto mb-4" />
            <h3 className="text-lg font-medium text-fg-primary">
              {search ? 'No courses found' : 'No courses yet'}
            </h3>
            <p className="text-fg-tertiary mt-1">
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
              <Card variant="bordered" className="h-full hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-tertiary relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-fg-tertiary" />
                  </div>
                  {course.progress !== undefined && course.progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-border-primary">
                      <div
                        className="h-full bg-brand-600 transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                <CardBody className="p-5">
                  <h3 className="font-semibold text-fg-primary mb-1 line-clamp-1">{course.title}</h3>
                  <p className="text-sm text-fg-tertiary mb-3 line-clamp-2">{course.description || 'No description'}</p>
                  <div className="flex items-center gap-4 text-xs text-fg-tertiary mb-3">
                    <span className="flex items-center gap-1">{course.moduleCount || 0} modules</span>
                    {course.progress !== undefined && (
                      <span className="flex items-center gap-1 font-medium text-brand-600 dark:text-brand-400">
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