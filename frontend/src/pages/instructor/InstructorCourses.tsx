import { useMyCourses } from '../../hooks/useCourses'
import { Card, CardBody } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { BookOpen, Search, Loader2, Plus, AlertCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export function InstructorCourses() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const { data: myCourses, isLoading, error } = useMyCourses()

  const courses = myCourses || []

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
          <AlertCircle className="w-12 h-12 text-fg-tertiary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-fg-primary">Unable to load courses</h3>
          <p className="text-fg-tertiary mt-1">Please try again later</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            Retry
          </Button>
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
          <p className="text-fg-secondary">Manage your courses and content</p>
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
          <Button variant="primary" onClick={() => navigate('/instructor/courses/new')}>
            <Plus className="w-4 h-4 mr-2" />
            New Course
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
                : 'Create your first course to get started'}
            </p>
            {!search && (
              <Button variant="primary" className="mt-4" onClick={() => navigate('/instructor/courses/new')}>
                <Plus className="w-4 h-4 mr-2" />
                Create Course
              </Button>
            )}
          </CardBody>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Card key={course.id} variant="bordered" className="h-full hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-tertiary relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-fg-tertiary" />
                </div>
                <div className="absolute top-2 right-2">
                  {course.published ? (
                    <span className="px-2 py-1 text-xs font-medium text-success-700 dark:text-success-400 bg-success-50 dark:bg-success-500/10 rounded">
                      Published
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-medium text-warning-700 dark:text-warning-400 bg-warning-50 dark:bg-warning-500/10 rounded">
                      Draft
                    </span>
                  )}
                </div>
              </div>
              <CardBody className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <Link to={`/instructor/courses/${course.id}/edit`} className="font-semibold text-fg-primary hover:text-brand-600 dark:hover:text-brand-400 line-clamp-1">
                    {course.title}
                  </Link>
                  <Link to={`/instructor/courses/${course.id}/edit`} className="text-xs text-brand-600 dark:text-brand-400 hover:underline">
                    Edit
                  </Link>
                </div>
                <p className="text-sm text-fg-tertiary mb-3 line-clamp-2">{course.description || 'No description'}</p>
                <div className="flex items-center gap-4 text-xs text-fg-tertiary mb-4">
                  <span className="flex items-center gap-1">{course.moduleCount || 0} modules</span>
                </div>
                <Button variant="outline" className="w-full" size="sm" onClick={() => navigate(`/instructor/courses/${course.id}/edit`)}>
                  Open Course Builder
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}