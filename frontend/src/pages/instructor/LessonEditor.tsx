import { Card, CardBody, CardHeader } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Plus, ArrowLeft, Trash2, GripVertical, Loader2, AlertCircle, Type, Video, Image, Code, Terminal, HelpCircle } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useLesson } from '../../hooks/useLesson'
import { useContentBlocks, useCreateContentBlock, useUpdateContentBlock, useDeleteContentBlock, useReorderContentBlocks } from '../../hooks/useContentBlocks'
import { useActivities, useCreateActivity, useUpdateActivity, useDeleteActivity, useReorderActivities } from '../../hooks/useActivities'
import { ContentBlock, Activity, ContentBlockContent, ActivityConfig, TestCase, QuizQuestion } from '../../types'
import { RichTextEditor } from '../../components/editor/RichTextEditor'
import { CodeEditor } from '../../components/editor/CodeEditor'

interface ContentBlockFormData {
  type: ContentBlock['type']
  content: ContentBlockContent
  orderIndex: number
}

interface ActivityFormData {
  type: Activity['type']
  config: ActivityConfig
  orderIndex: number
  points: number
}

export function InstructorLessonEditor() {
  const navigate = useNavigate()
  const { lessonId } = useParams<{ lessonId: string }>()
  const [activeTab, setActiveTab] = useState<'content' | 'activities'>('content')
  const [error, setError] = useState<string | null>(null)
  const [showContentModal, setShowContentModal] = useState<ContentBlock | null>(null)
  const [showActivityModal, setShowActivityModal] = useState<Activity | null>(null)

  // Lesson data
  const { data: lesson, isLoading: loadingLesson } = useLesson(lessonId || '')

  // Content blocks
  const { data: contentBlocks, isLoading: loadingContentBlocks, refetch: refetchContentBlocks } = useContentBlocks(lessonId || '')
  const createContentBlock = useCreateContentBlock()
  const updateContentBlock = useUpdateContentBlock()
  const deleteContentBlock = useDeleteContentBlock()
  const reorderContentBlocks = useReorderContentBlocks()

  // Activities
  const { data: activities, isLoading: loadingActivities, refetch: refetchActivities } = useActivities(lessonId || '')
  const createActivity = useCreateActivity()
  const updateActivity = useUpdateActivity()
  const deleteActivity = useDeleteActivity()
  const reorderActivities = useReorderActivities()

  const sortedContentBlocks = contentBlocks?.slice().sort((a, b) => a.orderIndex - b.orderIndex) || []
  const sortedActivities = activities?.slice().sort((a, b) => a.orderIndex - b.orderIndex) || []

  // Content block form state
  const [contentForm, setContentForm] = useState<ContentBlockFormData>({
    type: 'text',
    content: { text: '' },
    orderIndex: sortedContentBlocks.length,
  })

  // Activity form state
  const [activityForm, setActivityForm] = useState<ActivityFormData>({
    type: 'code_exercise',
    config: { language: 'python', starterCode: '', solutionCode: '', testCases: [] },
    orderIndex: sortedActivities.length,
    points: 10,
  })

  const handleSaveContentBlock = async () => {
    if (!lessonId) return
    try {
      const contentJson = JSON.stringify(contentForm.content)
      if (showContentModal) {
        await updateContentBlock.mutateAsync({
          id: showContentModal.id,
          data: { type: contentForm.type, content: contentJson, orderIndex: contentForm.orderIndex }
        })
      } else {
        await createContentBlock.mutateAsync({ lessonId, data: { type: contentForm.type, content: contentJson, orderIndex: contentForm.orderIndex } })
      }
      setShowContentModal(null)
      resetContentForm()
      refetchContentBlocks()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save content block')
    }
  }

  const handleSaveActivity = async () => {
    if (!lessonId) return
    try {
      const configJson = JSON.stringify(activityForm.config)
      if (showActivityModal) {
        await updateActivity.mutateAsync({
          id: showActivityModal.id,
          data: { type: activityForm.type, config: configJson, orderIndex: activityForm.orderIndex, points: activityForm.points }
        })
      } else {
        await createActivity.mutateAsync({ lessonId, data: { type: activityForm.type, config: configJson, orderIndex: activityForm.orderIndex, points: activityForm.points } })
      }
      setShowActivityModal(null)
      resetActivityForm()
      refetchActivities()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save activity')
    }
  }

  const handleDeleteContentBlock = async (id: string) => {
    if (!confirm('Delete this content block?')) return
    try {
      await deleteContentBlock.mutateAsync(id)
      refetchContentBlocks()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete content block')
    }
  }

  const handleDeleteActivity = async (id: string) => {
    if (!confirm('Delete this activity?')) return
    try {
      await deleteActivity.mutateAsync(id)
      refetchActivities()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete activity')
    }
  }

  const handleEditContentBlock = (block: ContentBlock) => {
    const parsedContent = JSON.parse(block.content) as ContentBlockContent
    setContentForm({
      type: block.type,
      content: parsedContent,
      orderIndex: block.orderIndex,
    })
    setShowContentModal(block)
  }

  const handleEditActivity = (activity: Activity) => {
    const parsedConfig = JSON.parse(activity.config) as ActivityConfig
    setActivityForm({
      type: activity.type,
      config: parsedConfig,
      orderIndex: activity.orderIndex,
      points: activity.points,
    })
    setShowActivityModal(activity)
  }

  const handleReorderContentBlocks = async (newOrder: { id: string; orderIndex: number }[]) => {
    try {
      await reorderContentBlocks.mutateAsync(newOrder)
      refetchContentBlocks()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reorder content blocks')
    }
  }

  const handleReorderActivities = async (newOrder: { id: string; orderIndex: number }[]) => {
    try {
      await reorderActivities.mutateAsync(newOrder)
      refetchActivities()
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to reorder activities')
    }
  }

  const resetContentForm = () => {
    setContentForm({ type: 'text', content: { text: '' }, orderIndex: sortedContentBlocks.length })
  }

  const resetActivityForm = () => {
    setActivityForm({ type: 'code_exercise', config: { language: 'python', starterCode: '', solutionCode: '', testCases: [] }, orderIndex: sortedActivities.length, points: 10 })
  }

  const handleContentTypeChange = (type: ContentBlock['type']) => {
    setContentForm(prev => ({
      ...prev,
      type,
      content: type === 'text' ? { text: '' } : type === 'video' ? { videoUrl: '' } : type === 'image' ? { imageUrl: '' } : { language: 'python', code: '' }
    }))
  }

  const handleActivityTypeChange = (type: Activity['type']) => {
    setActivityForm(prev => ({
      ...prev,
      type,
      config: type === 'code_exercise' ? { language: 'python', starterCode: '', solutionCode: '', testCases: [] } : { questions: [] }
    }))
  }

  if (loadingLesson) {
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
          Back to Course Builder
        </Button>
        <h1 className="text-xl font-semibold text-gray-900">{lesson?.title || 'Lesson Editor'}</h1>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
          <Button variant="ghost" size="sm" onClick={() => setError(null)}>Dismiss</Button>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-8" aria-label="Lesson editor tabs">
          <Button
            variant={activeTab === 'content' ? 'primary' : 'ghost'}
            onClick={() => setActiveTab('content')}
            className="border-b-2 border-primary-500"
          >
            <Type className="w-4 h-4 mr-1" />
            Content Blocks ({sortedContentBlocks.length})
          </Button>
          <Button
            variant={activeTab === 'activities' ? 'primary' : 'ghost'}
            onClick={() => setActiveTab('activities')}
            className="border-b-2 border-primary-500"
          >
            <Terminal className="w-4 h-4 mr-1" />
            Activities ({sortedActivities.length})
          </Button>
        </nav>
      </div>

      {/* Content Blocks Tab */}
      {activeTab === 'content' && (
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Content Blocks</h2>
            <Button onClick={() => { resetContentForm(); setShowContentModal(null); }} variant="primary">
              <Plus className="w-4 h-4 mr-1" />
              Add Content Block
            </Button>
          </CardHeader>
          <CardBody>
            {loadingContentBlocks ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
              </div>
            ) : sortedContentBlocks.length === 0 ? (
              <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                <Type className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <p className="mb-2">No content blocks yet</p>
                <Button variant="outline" onClick={() => { resetContentForm(); setShowContentModal(null); }}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Your First Content Block
                </Button>
              </div>
            ) : (
              <DraggableList
                items={sortedContentBlocks}
                renderItem={(block) => (
                  <ContentBlockPreview
                    key={block.id}
                    block={block}
                    onEdit={() => handleEditContentBlock(block)}
                    onDelete={() => handleDeleteContentBlock(block.id)}
                  />
                )}
                onReorder={handleReorderContentBlocks}
                draggingClassName="border-primary-300 bg-primary-50 opacity-75"
              />
            )}
          </CardBody>
        </Card>
      )}

      {/* Activities Tab */}
      {activeTab === 'activities' && (
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Activities</h2>
            <Button onClick={() => { resetActivityForm(); setShowActivityModal(null); }} variant="primary">
              <Plus className="w-4 h-4 mr-1" />
              Add Activity
            </Button>
          </CardHeader>
          <CardBody>
            {loadingActivities ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
              </div>
            ) : sortedActivities.length === 0 ? (
              <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                <Terminal className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                <p className="mb-2">No activities yet</p>
                <Button variant="outline" onClick={() => { resetActivityForm(); setShowActivityModal(null); }}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Your First Activity
                </Button>
              </div>
            ) : (
              <DraggableList
                items={sortedActivities}
                renderItem={(activity) => (
                  <ActivityPreview
                    key={activity.id}
                    activity={activity}
                    onEdit={() => handleEditActivity(activity)}
                    onDelete={() => handleDeleteActivity(activity.id)}
                  />
                )}
                onReorder={handleReorderActivities}
                draggingClassName="border-primary-300 bg-primary-50 opacity-75"
              />
            )}
          </CardBody>
        </Card>
      )}

      {/* Content Block Modal */}
      {showContentModal !== null && (
        <ContentBlockModal
          block={showContentModal}
          form={contentForm}
          onFormChange={setContentForm}
          onClose={() => { setShowContentModal(null); resetContentForm(); }}
          onSave={handleSaveContentBlock}
          onTypeChange={handleContentTypeChange}
          saving={createContentBlock.isPending || updateContentBlock.isPending}
        />
      )}

      {/* Activity Modal */}
      {showActivityModal !== null && (
        <ActivityModal
          activity={showActivityModal}
          form={activityForm}
          onFormChange={setActivityForm}
          onClose={() => { setShowActivityModal(null); resetActivityForm(); }}
          onSave={handleSaveActivity}
          onTypeChange={handleActivityTypeChange}
          saving={createActivity.isPending || updateActivity.isPending}
        />
      )}
    </div>
  )
}

// Draggable List Component
function DraggableList<T extends { id: string }>({
  items,
  renderItem,
  onReorder,
  draggingClassName,
}: {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  onReorder: (newOrder: { id: string; orderIndex: number }[]) => void
  draggingClassName: string
}) {
  const [draggingId, setDraggingId] = useState<string | null>(null)

  const handleDragStart = (id: string) => setDraggingId(id)
  const handleDragOver = (e: React.DragEvent) => e.preventDefault()
  const handleDrop = (targetId: string) => {
    if (!draggingId || draggingId === targetId) return
    const dragIndex = items.findIndex(item => item.id === draggingId)
    const targetIndex = items.findIndex(item => item.id === targetId)
    const newItems = [...items]
    const [dragged] = newItems.splice(dragIndex, 1)
    newItems.splice(targetIndex, 0, dragged)
    const reordered = newItems.map((item, i) => ({ id: item.id, orderIndex: i }))
    onReorder(reordered)
    setDraggingId(null)
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={() => handleDragStart(item.id)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(item.id)}
          className={`flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg transition-colors ${
            draggingId === item.id ? draggingClassName : 'hover:border-primary-300'
          }`}
        >
          <GripVertical className="w-6 h-6 bg-gray-100 text-gray-400 rounded flex items-center justify-center text-sm cursor-grab active:cursor-grabbing" />
          <span className="w-6 h-6 bg-gray-100 text-gray-600 rounded flex items-center justify-center text-sm font-medium">
            {index + 1}
          </span>
          <div className="flex-1 min-w-0">
            {renderItem(item, index)}
          </div>
        </div>
      ))}
    </div>
  )
}

// Content Block Preview
function ContentBlockPreview({ block, onEdit, onDelete }: { block: ContentBlock; onEdit: () => void; onDelete: () => void }) {
  const content = JSON.parse(block.content)
  const typeIcons = { text: Type, video: Video, image: Image, code_snippet: Code }
  const Icon = typeIcons[block.type]

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-gray-400" />
        <span className="font-medium text-gray-900 capitalize">{block.type.replace('_', ' ')}</span>
        <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">Order: {block.orderIndex}</span>
      </div>
      <p className="text-sm text-gray-500 mt-1 truncate">
        {block.type === 'text' ? (content.text ? content.text.replace(/<[^>]*>/g, '').slice(0, 100) : 'Empty text block')
          : block.type === 'video' ? `Video: ${content.videoUrl || 'No URL'}`
          : block.type === 'image' ? `Image: ${content.imageUrl || 'No URL'}`
          : `Code (${content.language || 'plaintext'})`}
      </p>
      <div className="flex items-center gap-2 mt-2">
        <Button variant="ghost" size="sm" onClick={onEdit}>Edit</Button>
        <Button variant="ghost" size="sm" onClick={onDelete} className="text-red-600 hover:text-red-700">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

// Activity Preview
function ActivityPreview({ activity, onEdit, onDelete }: { activity: Activity; onEdit: () => void; onDelete: () => void }) {
  const config = JSON.parse(activity.config)
  const typeLabels = { code_exercise: 'Code Exercise', quiz: 'Quiz' }
  const ActivityIcon = activity.type === 'code_exercise' ? Terminal : HelpCircle

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <ActivityIcon className="w-4 h-4 text-gray-400" />
        <span className="font-medium text-gray-900">{typeLabels[activity.type]}</span>
        <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">Order: {activity.orderIndex}</span>
        <span className="px-2 py-0.5 text-xs bg-purple-100 text-purple-700 rounded">{activity.points} pts</span>
      </div>
      <p className="text-sm text-gray-500 mt-1 truncate">
        {activity.type === 'code_exercise'
          ? `${config.language || 'python'} - ${config.starterCode?.slice(0, 50) || 'No starter code'}...`
          : `${config.questions?.length || 0} questions`}
      </p>
      <div className="flex items-center gap-2 mt-2">
        <Button variant="ghost" size="sm" onClick={onEdit}>Edit</Button>
        <Button variant="ghost" size="sm" onClick={onDelete} className="text-red-600 hover:text-red-700">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

// Content Block Modal
function ContentBlockModal({
  block,
  form,
  onFormChange,
  onClose,
  onSave,
  onTypeChange,
  saving,
}: { block: ContentBlock; form: ContentBlockFormData; onFormChange: (form: ContentBlockFormData) => void; onClose: () => void; onSave: () => void; onTypeChange: (type: ContentBlock['type']) => void; saving: boolean }) {

  const handleContentChange = (key: string, value: any) => {
    onFormChange({ ...form, content: { ...form.content, [key]: value } })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{block ? 'Edit Content Block' : 'Add Content Block'}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
        </div>
        <div className="p-4 space-y-4">
          {/* Type Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <div className="flex gap-2 flex-wrap">
              {(['text', 'video', 'image', 'code_snippet'] as ContentBlock['type'][]).map(type => (
                <Button
                  key={type}
                  variant={form.type === type ? 'primary' : 'outline'}
                  onClick={() => onTypeChange(type)}
                  className="capitalize"
                >
                  {type.replace('_', ' ')}
                </Button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {form.type === 'text' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <RichTextEditor
                  content={form.content.text || ''}
                  onChange={(text) => handleContentChange('text', text)}
                  placeholder="Write your lesson content here..."
                  editable={true}
                />
              </div>
            )}

            {form.type === 'video' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (YouTube, Vimeo, etc.)</label>
                <Input
                  value={form.content.videoUrl || ''}
                  onChange={(e) => handleContentChange('videoUrl', e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>
            )}

            {form.type === 'image' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <Input
                  value={form.content.imageUrl || ''}
                  onChange={(e) => handleContentChange('imageUrl', e.target.value)}
                  placeholder="https://example.com/image.png"
                />
              </div>
            )}

            {form.type === 'code_snippet' && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select
                      value={form.content.language || 'plaintext'}
                      onChange={(e) => handleContentChange('language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="plaintext">Plain Text</option>
                      <option value="python">Python</option>
                      <option value="javascript">JavaScript</option>
                      <option value="typescript">TypeScript</option>
                      <option value="java">Java</option>
                      <option value="cpp">C++</option>
                      <option value="c">C</option>
                      <option value="go">Go</option>
                      <option value="rust">Rust</option>
                      <option value="php">PHP</option>
                      <option value="ruby">Ruby</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                  <CodeEditor
                    value={form.content.code || ''}
                    onChange={(code) => handleContentChange('code', code)}
                    language={form.content.language || 'plaintext'}
                    readOnly={false}
                    theme="vs"
                    height="300px"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Index</label>
              <Input
                type="number"
                value={form.orderIndex}
                onChange={(e) => onFormChange({ ...form, orderIndex: parseInt(e.target.value) || 0 })}
                min={0}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={onSave} loading={saving}>
              {block ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Activity Modal
function ActivityModal({
  activity,
  form,
  onFormChange,
  onClose,
  onSave,
  onTypeChange,
  saving,
}: { activity: Activity; form: ActivityFormData; onFormChange: (form: ActivityFormData) => void; onClose: () => void; onSave: () => void; onTypeChange: (type: Activity['type']) => void; saving: boolean }) {

  const handleConfigChange = (key: string, value: any) => {
    onFormChange({ ...form, config: { ...form.config, [key]: value } })
  }

  const addTestCase = () => {
    const testCases = [...(form.config.testCases || []), { input: '', expectedOutput: '', hidden: false }]
    handleConfigChange('testCases', testCases)
  }

  const removeTestCase = (index: number) => {
    const testCases = [...(form.config.testCases || [])]
    testCases.splice(index, 1)
    handleConfigChange('testCases', testCases)
  }

  const updateTestCase = (index: number, field: 'input' | 'expectedOutput' | 'hidden', value: any) => {
    const testCases = [...(form.config.testCases || [])]
    testCases[index] = { ...testCases[index], [field]: value }
    handleConfigChange('testCases', testCases)
  }

  const addQuestion = () => {
    const questions = [...(form.config.questions || []), { id: crypto.randomUUID(), question: '', options: ['', '', '', ''], correctIndex: 0, explanation: '' }]
    handleConfigChange('questions', questions)
  }

  const removeQuestion = (index: number) => {
    const questions = [...(form.config.questions || [])]
    questions.splice(index, 1)
    handleConfigChange('questions', questions)
  }

  const updateQuestion = (index: number, field: string, value: any) => {
    const questions = [...(form.config.questions || [])]
    questions[index] = { ...questions[index], [field]: value }
    handleConfigChange('questions', questions)
  }

  const updateOption = (qIndex: number, oIndex: number, value: string) => {
    const questions = [...(form.config.questions || [])]
    const options = [...questions[qIndex].options]
    options[oIndex] = value
    questions[qIndex] = { ...questions[qIndex], options }
    handleConfigChange('questions', questions)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{activity ? 'Edit Activity' : 'Add Activity'}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
        </div>
        <div className="p-4 space-y-6">
          {/* Type Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <div className="flex gap-2">
              {(['code_exercise', 'quiz'] as Activity['type'][]).map(type => (
                <Button
                  key={type}
                  variant={form.type === type ? 'primary' : 'outline'}
                  onClick={() => onTypeChange(type)}
                  className="capitalize flex-1"
                >
                  {type === 'code_exercise' ? 'Code Exercise' : 'Quiz'}
                </Button>
              ))}
            </div>
          </div>

          {/* Points */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
            <Input
              type="number"
              value={form.points}
              onChange={(e) => onFormChange({ ...form, points: parseInt(e.target.value) || 0 })}
              min={1}
              max={100}
            />
          </div>

          {/* Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order Index</label>
            <Input
              type="number"
              value={form.orderIndex}
              onChange={(e) => onFormChange({ ...form, orderIndex: parseInt(e.target.value) || 0 })}
              min={0}
            />
          </div>

          {/* Code Exercise Form */}
          {form.type === 'code_exercise' && (
            <div className="space-y-4 border-t border-gray-100 pt-4">
              <h3 className="text-md font-medium text-gray-900">Code Exercise Configuration</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select
                  value={form.config.language || 'python'}
                  onChange={(e) => handleConfigChange('language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="typescript">TypeScript</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                  <option value="c">C</option>
                  <option value="go">Go</option>
                  <option value="rust">Rust</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Starter Code</label>
                <CodeEditor
                  value={form.config.starterCode || ''}
                  onChange={(code) => handleConfigChange('starterCode', code)}
                  language={form.config.language || 'python'}
                  readOnly={false}
                  theme="vs"
                  height="200px"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Solution Code (for instructor reference)</label>
                <CodeEditor
                  value={form.config.solutionCode || ''}
                  onChange={(code) => handleConfigChange('solutionCode', code)}
                  language={form.config.language || 'python'}
                  readOnly={false}
                  theme="vs"
                  height="200px"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Test Cases</label>
                <div className="space-y-3">
                  {(form.config.testCases || []).map((tc: TestCase, i: number) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-700">Test Case {i + 1}</span>
                        <Button variant="ghost" size="sm" onClick={() => removeTestCase(i)} className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Input</label>
                          <Input
                            value={tc.input}
                            onChange={(e) => updateTestCase(i, 'input', e.target.value)}
                            placeholder="Input data"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Expected Output</label>
                          <Input
                            value={tc.expectedOutput}
                            onChange={(e) => updateTestCase(i, 'expectedOutput', e.target.value)}
                            placeholder="Expected output"
                          />
                        </div>
                        <div className="md:col-span-2 flex items-center gap-3">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={tc.hidden}
                              onChange={(e) => updateTestCase(i, 'hidden', e.target.checked)}
                              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <span className="text-sm text-gray-700">Hidden test case</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addTestCase} className="w-full">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Test Case
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Quiz Form */}
          {form.type === 'quiz' && (
            <div className="space-y-4 border-t border-gray-100 pt-4">
              <h3 className="text-md font-medium text-gray-900">Quiz Configuration</h3>
              <div className="space-y-4">
                {(form.config.questions || []).map((q: QuizQuestion, i: number) => (
                  <div key={q.id || i} className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-700">Question {i + 1}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeQuestion(i)} className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                      <Input
                        value={q.question}
                        onChange={(e) => updateQuestion(i, 'question', e.target.value)}
                        placeholder="Enter your question"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
                      {q.options.map((opt, oi) => (
                        <div key={oi} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`correct-${i}`}
                            checked={q.correctIndex === oi}
                            onChange={() => updateQuestion(i, 'correctIndex', oi)}
                            className="w-4 h-4 text-primary-600"
                          />
                          <Input
                            value={opt}
                            onChange={(e) => updateOption(i, oi, e.target.value)}
                            placeholder={`Option ${oi + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Explanation (optional)</label>
                      <Input
                        value={q.explanation || ''}
                        onChange={(e) => updateQuestion(i, 'explanation', e.target.value)}
                        placeholder="Why is this answer correct?"
                      />
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addQuestion} className="w-full">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Question
                </Button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={onSave} loading={saving}>
              {activity ? 'Update' : 'Create'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}