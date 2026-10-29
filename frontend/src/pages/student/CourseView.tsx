import { useAuth } from '../../hooks/useAuth'
import { Card, CardBody } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { BookOpen, Search, Filter } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export function StudentCourseView() {
  const { user } = useAuth()
  const [search, setSearch] = useState('')

  const mockCourses = [
    { id: '1', title: 'Introduction to Programming', description: 'Learn the basics of programming with Python', instructor: 'Dr. Smith', lessons: 12, enrolled: 1250, thumbnail: null },
    { id: '2', title: 'Web Development Fundamentals', description: 'HTML, CSS, and JavaScript basics', instructor: 'Prof. Johnson', lessons: 8, enrolled: 890, thumbnail: null },
    { id: '3', title: 'Data Structures & Algorithms', description: 'Core CS concepts for problem solving', instructor: 'Dr. Lee', lessons: 15, enrolled: 567, thumbnail: null },
    { id: '4', title: 'Database Design', description: 'SQL and relational database modeling', instructor: 'Prof. Chen', lessons: 10, enrolled: 432, thumbnail: null },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Catalog</h1>
          <p className="text-gray-500">Browse available courses and enroll</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockCourses
          .filter(course =>
            course.title.toLowerCase().includes(search.toLowerCase()) ||
            course.description.toLowerCase().includes(search.toLowerCase())
          )
          .map((course) => (
            <Link key={course.id} to={`/courses/${course.id}`} className="block">
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-gray-300" />
                  </div>
                </div>
                <CardBody className="p-5">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{course.title}</h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1">{course.instructor}</span>
                    <span className="flex items-center gap-1">{course.lessons} lessons</span>
                    <span className="flex items-center gap-1">{course.enrolled} students</span>
                  </div>
                  <Button variant="primary" className="w-full" size="sm">
                    View Course
                  </Button>
                </CardBody>
              </Card>
            </Link>
          ))}
      </div>

      {mockCourses.length === 0 && (
        <Card>
          <CardBody className="py-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
          </CardBody>
        </Card>
      )}
    </div>
  )
}