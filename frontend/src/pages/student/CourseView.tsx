import { useCourses } from '../../hooks/useCourses'
import { useEnrollCourse } from '../../hooks/useCourses'
import { Card, CardBody } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { BookOpen, Search, Filter, UserPlus, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export function StudentCourseView() {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const pageSize = 12

  const { data: paginatedCourses, isLoading, error, refetch } = useCourses({
    page: currentPage,
    size: pageSize,
    search: search || undefined,
  })

  const courses = paginatedCourses?.content || []
  const totalPages = paginatedCourses?.totalPages || 0
  const totalElements = paginatedCourses?.totalElements || 0

  const enrollMutation = useEnrollCourse()

  const handleEnroll = async (courseId: string) => {
    try {
      await enrollMutation.mutateAsync(courseId)
      alert('Successfully enrolled in course!')
      refetch()
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to enroll in course'
      alert(message)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(0)
  }

  if (isLoading && courses.length === 0) {
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Catalog</h1>
          <p className="text-gray-500">Browse available courses and enroll</p>
        </div>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <Button type="submit" variant="outline">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
        </form>
      </div>

      {courses.length === 0 ? (
        <Card>
          <CardBody className="py-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">
              {search ? 'No courses found' : 'No courses available'}
            </h3>
            <p className="text-gray-500 mt-1">
              {search
                ? 'Try adjusting your search or filters'
                : 'Check back later for new courses'}
            </p>
          </CardBody>
        </Card>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Link key={course.id} to={`/courses/${course.id}`} className="block">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-100 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-gray-300" />
                    </div>
                  </div>
                  <CardBody className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{course.title}</h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.description || 'No description'}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">{course.instructorName || 'Unknown Instructor'}</span>
                      <span className="flex items-center gap-1">{course.moduleCount || 0} lessons</span>
                      {course.enrolledCount !== undefined && (
                        <span className="flex items-center gap-1">
                          <UserPlus className="w-3 h-3" />
                          {course.enrolledCount} students
                        </span>
                      )}
                    </div>
                    <Button variant="primary" className="w-full" size="sm" onClick={(e) => {
                      e.preventDefault()
                      handleEnroll(course.id)
                    }} disabled={enrollMutation.isPending}>
                      {enrollMutation.isPending ? 'Enrolling...' : 'Enroll Now'}
                    </Button>
                  </CardBody>
                </Card>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                disabled={currentPage === 0}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page {currentPage + 1} of {totalPages} ({totalElements} courses)
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={currentPage >= totalPages - 1}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}