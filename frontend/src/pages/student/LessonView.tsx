import { useState, useEffect } from 'react'
import { Card, CardBody } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { ContentBlock } from '../../components/lesson/ContentBlock'
import { ActivityBlock } from '../../components/lesson/ActivityBlock'
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useLesson } from '../../hooks/useLesson'
import { Lesson } from '../../types'

export function StudentLessonView() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>()
  const [activeBlock, setActiveBlock] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const { data: lesson, isLoading, error: lessonError } = useLesson(courseId!, lessonId!)

  useEffect(() => {
    if (lessonError) {
      setError('Failed to load lesson. Please try again.')
    }
  }, [lessonError])

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        </div>
      </div>
    )
  }

  if (error || !lesson) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Unable to load lesson</h3>
          <p className="text-gray-500 mt-1">{error || 'Please try again later'}</p>
          <Button variant="primary" className="mt-4" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    )
  }

  // Combine content blocks and activities, sorted by orderIndex
  const allBlocks = [
    ...(lesson.contentBlocks || []).map((b, i) => ({ ...b, kind: 'content' as const, index: i })),
    ...(lesson.activities || []).map((a, i) => ({ ...a, kind: 'activity' as const, index: i })),
  ].sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0))

  const currentBlock = allBlocks[activeBlock]
  const isFirst = activeBlock === 0
  const isLast = activeBlock === allBlocks.length - 1

  const handleNext = () => {
    if (!isLast) setActiveBlock(activeBlock + 1)
  }

  const handlePrev = () => {
    if (!isFirst) setActiveBlock(activeBlock - 1)
  }

  const handleSubmit = async (activityId: string, data: any) => {
    console.log('Submit activity', activityId, data)
    // TODO: Implement activity submission
    alert('Submitted! (Backend integration pending)')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link to={`/courses/${courseId}`} className="text-sm text-primary-600 hover:underline mb-2 inline-block">
            ← Back to Course
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
          <p className="text-gray-500 mt-1">{lesson.description || ''}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{activeBlock + 1} / {allBlocks.length}</span>
        </div>
      </div>

      <Card>
        <CardBody className="p-0">
          {currentBlock?.kind === 'content' && (
            <ContentBlock block={currentBlock as any} readOnly={true} />
          )}
          {currentBlock?.kind === 'activity' && (
            <ActivityBlock
              activity={currentBlock as any}
              progress={undefined}
              onSubmit={handleSubmit}
              readOnly={false}
            />
          )}
          {allBlocks.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No content in this lesson yet
            </div>
          )}
        </CardBody>
      </Card>

      {allBlocks.length > 0 && (
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handlePrev} disabled={isFirst}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <div className="flex gap-2">
            {allBlocks.map((block, index) => (
              <button
                key={block.id}
                onClick={() => setActiveBlock(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === activeBlock
                    ? 'bg-primary-600'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
          <Button onClick={handleNext} disabled={isLast}>
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  )
}