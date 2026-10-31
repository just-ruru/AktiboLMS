import { Card, CardBody, CardHeader } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Plus, ArrowLeft, Save, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export function InstructorCourseBuilder() {
  const navigate = useNavigate()
  const [courseTitle, setCourseTitle] = useState('')
  const [courseDescription, setCourseDescription] = useState('')
  const [saving, setSaving] = useState(false)

  const mockModules = [
    { id: '1', title: 'Module 1: Getting Started', lessons: [
      { id: '1', title: 'Welcome & Setup', order: 1 },
      { id: '2', title: 'Variables and Data Types', order: 2 },
      { id: '3', title: 'Basic Operations', order: 3 },
    ]},
    { id: '2', title: 'Module 2: Control Flow', lessons: [
      { id: '4', title: 'Conditionals', order: 1 },
      { id: '5', title: 'Loops', order: 2 },
    ]},
  ]

  const handleSave = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 1000))
    setSaving(false)
    alert('Course saved! (Mock)')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigate(-1)} className="gap-1">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
          <Button variant="primary" onClick={handleSave} loading={saving}>
            <Save className="w-4 h-4 mr-1" />
            Save Course
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Course Details</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          <Input
            label="Course Title"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Enter course title"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              placeholder="Describe what students will learn..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent min-h-[100px] resize-y"
              rows={4}
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Curriculum</h2>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Add Module
          </Button>
        </CardHeader>
        <CardBody>
          <div className="space-y-6">
            {mockModules.map((module, mIndex) => (
              <div key={module.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center font-medium">
                      {mIndex + 1}
                    </span>
                    <div>
                      <input
                        type="text"
                        value={module.title}
                        onChange={(e) => console.log(e.target.value)}
                        className="font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
                      />
                      <p className="text-sm text-gray-500">{module.lessons.length} lessons</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Plus className="w-4 h-4" />
                      Add Lesson
                    </Button>
                    <Button variant="ghost" size="sm">⋮⋮</Button>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {module.lessons.map((lesson, lIndex) => (
                    <div key={lesson.id} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                      <span className="w-6 h-6 bg-gray-100 text-gray-600 rounded flex items-center justify-center text-sm font-medium">
                        {lIndex + 1}
                      </span>
                      <input
                        type="text"
                        value={lesson.title}
                        onChange={(e) => console.log(e.target.value)}
                        className="flex-1 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
                      />
                      <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}