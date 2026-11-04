import { Card, CardBody, CardHeader } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Plus, ArrowLeft, Save, Eye, Trash2, GripVertical, Loader2, AlertCircle } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { ContentBlock, Activity } from '../../types'
import { useCourse, useCreateCourse, useUpdateCourse, usePublishCourse } from '../../hooks/useCourses'
import { useModules, useCreateModule, useUpdateModule, useDeleteModule } from '../../hooks/useModules'
import { useCreateLesson, useUpdateLesson, useDeleteLesson, useReorderLessons } from '../../hooks/useLesson'

interface ModuleWithLessons {
  id: string
  title: string
  description?: string
  orderIndex: number
  lessons: LessonWithContent[]
}

interface LessonWithContent {
  id: string
  title: string
  description?: string
  orderIndex: number
  contentBlocks: ContentBlock[]
  activities: Activity[]
}

export function InstructorCourseBuilder() {
  const navigate = useNavigate()
  const { courseId } = useParams<{ courseId: string }>()
  const isEditing = !!courseId

  const [courseTitle, setCourseTitle] = useState('')
  const [courseDescription, setCourseDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Course hooks
    const { isLoading: loadingCourse } = useCourse(courseId || '')
    const createCourse = useCreateCourse()
    const updateCourse = useUpdateCourse()
    const publishCourse = usePublishCourse()

    // Module hooks
    const { data: modules, isLoading: loadingModules, refetch: refetchModules } = useModules(courseId || '')
    const createModule = useCreateModule()
    const updateModule = useUpdateModule()
    const deleteModule = useDeleteModule()

    // Lesson hooks
    const createLesson = useCreateLesson()
    const updateLesson = useUpdateLesson()
    const deleteLesson = useDeleteLesson()
    const reorderLessons = useReorderLessons()

  const handleSaveCourse = async () => {
    if (!courseTitle.trim()) {
      setError('Course title is required')
      return
    }

    setSaving(true)
    setError(null)

    try {
      if (isEditing) {
        await updateCourse.mutateAsync({ id: courseId!, data: { title: courseTitle, description: courseDescription } })
      } else {
        const newCourse = await createCourse.mutateAsync({ title: courseTitle, description: courseDescription })
        navigate(`/instructor/courses/${newCourse.id}/edit`)
      }
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string } } }
      const errorMessage = axiosError.response?.data?.message || (err instanceof Error ? err.message : 'Failed to save course')
      setError(errorMessage)
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    if (!courseId) return
    try {
      await publishCourse.mutateAsync(courseId)
      alert('Course published!')
    } catch (err) {
      setError((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to publish course')
    }
  }

  const handleAddModule = async () => {
    if (!courseId) return
    const title = prompt('Module title:')
    if (!title?.trim()) return

    try {
      await createModule.mutateAsync({ courseId, data: { title, description: '', orderIndex: (modules?.length || 0) } })
      refetchModules()
    } catch (err) {
      setError((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to create module')
    }
  }

  const handleUpdateModule = async (moduleId: string, title: string) => {
    try {
      await updateModule.mutateAsync({ id: moduleId, data: { title } })
      refetchModules()
    } catch (err) {
      setError((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to update module')
    }
  }

  const handleDeleteModule = async (moduleId: string) => {
    if (!confirm('Delete this module and all its lessons?')) return
    try {
      await deleteModule.mutateAsync(moduleId)
      refetchModules()
    } catch (err) {
      setError((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to delete module')
    }
  }

  const handleAddLesson = async (moduleId: string) => {
    const title = prompt('Lesson title:')
    if (!title?.trim()) return

    const module = modules?.find(m => m.id === moduleId)
    const orderIndex = (module?.lessons?.length || 0)

    try {
      await createLesson.mutateAsync({ moduleId, data: { title, description: '', orderIndex } })
      refetchModules()
    } catch (err) {
      setError((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to create lesson')
    }
  }

  const handleUpdateLesson = async (lessonId: string, title: string) => {
    try {
      await updateLesson.mutateAsync({ id: lessonId, data: { title } })
      refetchModules()
    } catch (err) {
      setError((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to update lesson')
    }
  }

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm('Delete this lesson?')) return
    try {
      await deleteLesson.mutateAsync(lessonId)
      refetchModules()
    } catch (err) {
      setError((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to delete lesson')
    }
  }

    const handleReorderLessons = async (newOrder: { id: string; orderIndex: number }[]) => {
        try {
          await reorderLessons.mutateAsync(newOrder)
          refetchModules()
        } catch (err) {
          setError((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Failed to reorder lessons')
        }
      }

  const sortedModules = modules?.slice().sort((a, b) => a.orderIndex - b.orderIndex) || []

  if (isEditing && loadingCourse) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    )
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
          {isEditing && (
            <Button variant="secondary" onClick={handlePublish} disabled={publishCourse.isPending}>
              Publish
            </Button>
          )}
          <Button variant="primary" onClick={handleSaveCourse} loading={saving || createCourse.isPending || updateCourse.isPending}>
            <Save className="w-4 h-4 mr-1" />
            {isEditing ? 'Save Changes' : 'Create Course'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
          <Button variant="ghost" size="sm" onClick={() => setError(null)}>Dismiss</Button>
        </div>
      )}

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
            error={error?.includes('title') ? error : undefined}
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
          {courseId && (
            <Button variant="outline" size="sm" onClick={handleAddModule} disabled={createModule.isPending}>
              <Plus className="w-4 h-4 mr-1" />
              Add Module
            </Button>
          )}
        </CardHeader>
        <CardBody>
          {loadingModules ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            </div>
          ) : sortedModules.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="mb-2">No modules yet</p>
              {courseId && (
                <Button variant="outline" size="sm" onClick={handleAddModule}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Your First Module
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {sortedModules.map((module) => (
                              <ModuleCard
                                key={module.id}
                                module={module}
                                isActive={activeModuleId === module.id}
                                onToggle={() => setActiveModuleId(activeModuleId === module.id ? null : module.id)}
                                onUpdateTitle={(title) => handleUpdateModule(module.id, title)}
                                onDelete={() => handleDeleteModule(module.id)}
                                onAddLesson={() => handleAddLesson(module.id)}
                                onUpdateLesson={(lessonId, title) => handleUpdateLesson(lessonId, title)}
                                onDeleteLesson={(lessonId) => handleDeleteLesson(lessonId)}
                                onReorderLessons={(lessons) => handleReorderLessons(lessons)}
                                creatingLesson={createLesson.isPending}
                                deletingModule={deleteModule.isPending}
                              />
                            ))}
            </div>
          )}
        </CardBody>
      </Card>

      {!courseId && (
        <div className="text-center text-gray-500 text-sm">
          Save the course first to add modules and lessons
        </div>
      )}
    </div>
  )
}

function ModuleCard({
  module,
  isActive,
  onToggle,
  onUpdateTitle,
  onDelete,
  onAddLesson,
  onUpdateLesson,
  onDeleteLesson,
  onReorderLessons,
  creatingLesson,
  deletingModule,
}: {
    module: ModuleWithLessons
    isActive: boolean
    onToggle: () => void
    onUpdateTitle: (title: string) => void
    onDelete: () => void
    onAddLesson: () => void
    onUpdateLesson: (lessonId: string, title: string) => void
    onDeleteLesson: (lessonId: string) => void
    onReorderLessons: (lessons: { id: string; orderIndex: number }[]) => void
    creatingLesson: boolean
    deletingModule: boolean
  }) {
  const [editTitle, setEditTitle] = useState(module.title)
  const [savingTitle, setSavingTitle] = useState(false)
  const [lessons, setLessons] = useState<LessonWithContent[]>(module.lessons || [])
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const handleTitleBlur = () => {
      if (editTitle.trim() && editTitle !== module.title) {
        setSavingTitle(true)
        onUpdateTitle(editTitle.trim())
        setSavingTitle(false)
      } else {
        setEditTitle(module.title)
      }
    }

  const handleLessonTitleBlur = (lessonId: string, title: string) => {
    if (title.trim() && title !== lessons.find(l => l.id === lessonId)?.title) {
      onUpdateLesson(lessonId, title.trim())
    }
  }

  const handleDragStart = (id: string) => setDraggingId(id)
  const handleDragOver = (e: React.DragEvent) => e.preventDefault()
  const handleDrop = (targetId: string) => {
    if (!draggingId || draggingId === targetId) return
    const dragIndex = lessons.findIndex(l => l.id === draggingId)
    const targetIndex = lessons.findIndex(l => l.id === targetId)
    const newLessons = [...lessons]
    const [dragged] = newLessons.splice(dragIndex, 1)
    newLessons.splice(targetIndex, 0, dragged)
    const reordered = newLessons.map((l, i) => ({ id: l.id, orderIndex: i }))
    onReorderLessons(reordered)
    setLessons(newLessons)
    setDraggingId(null)
  }

  const sortedLessons = lessons.slice().sort((a, b) => a.orderIndex - b.orderIndex)

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 bg-primary-100 text-primary-700 rounded-lg flex items-center justify-center font-medium cursor-pointer"
                onClick={onToggle}>
            {isActive ? '−' : '+'}
          </span>
          <div>
            {savingTitle ? (
              <Loader2 className="w-4 h-4 animate-spin text-primary-500 inline-block" />
            ) : (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={handleTitleBlur}
                onKeyDown={(e) => e.key === 'Enter' && handleTitleBlur()}
                autoFocus
                className="font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-1"
              />
            )}
            <p className="text-sm text-gray-500">{sortedLessons.length} lessons</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onAddLesson} disabled={creatingLesson}>
            <Plus className="w-4 h-4" />
            Add Lesson
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete} disabled={deletingModule} className="text-red-600 hover:text-red-700">
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {isActive && (
        <div className="p-4 space-y-3">
          {sortedLessons.length === 0 ? (
            <div className="text-center py-6 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
              <p className="mb-2">No lessons in this module</p>
              <Button variant="outline" size="sm" onClick={onAddLesson}>
                <Plus className="w-4 h-4 mr-1" />
                Add Lesson
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {sortedLessons.map((lesson, lIndex) => (
                <LessonRow
                  key={lesson.id}
                  lesson={lesson}
                  index={lIndex}
                  draggingId={draggingId}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onUpdateTitle={handleLessonTitleBlur}
                  onDelete={onDeleteLesson}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function LessonRow({
  lesson,
  index,
  draggingId,
  onDragStart,
  onDragOver,
  onDrop,
  onUpdateTitle,
  onDelete,
}: {
  lesson: LessonWithContent
  index: number
  draggingId: string | null
  onDragStart: (id: string) => void
  onDragOver: (e: React.DragEvent) => void
  onDrop: (targetId: string) => void
  onUpdateTitle: (lessonId: string, title: string) => void
  onDelete: (lessonId: string) => void
}) {
  const [editTitle, setEditTitle] = useState(lesson.title)
  const isDragging = draggingId === lesson.id

  return (
    <div
      draggable
      onDragStart={() => onDragStart(lesson.id)}
      onDragOver={onDragOver}
      onDrop={() => onDrop(lesson.id)}
      className={`flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg transition-colors ${
        isDragging ? 'border-primary-300 bg-primary-50 opacity-75' : 'hover:border-primary-300'
      }`}
    >
      <GripVertical className="w-6 h-6 bg-gray-100 text-gray-400 rounded flex items-center justify-center text-sm cursor-grab active:cursor-grabbing" />
      <span className="w-6 h-6 bg-gray-100 text-gray-600 rounded flex items-center justify-center text-sm font-medium">
        {index + 1}
      </span>
      <input
        type="text"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        onBlur={() => onUpdateTitle(lesson.id, editTitle)}
        onKeyDown={(e) => e.key === 'Enter' && onUpdateTitle(lesson.id, editTitle)}
        className="flex-1 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-primary-500 rounded"
      />
      <Button variant="ghost" size="sm" onClick={() => onDelete(lesson.id)} className="text-red-600 hover:text-red-700">
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
}

