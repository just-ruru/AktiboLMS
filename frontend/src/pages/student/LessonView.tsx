import { useState, useEffect } from 'react'
import { Card, CardBody } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { ContentBlock } from '../../components/lesson/ContentBlock'
import { ActivityBlock, SubmissionData } from '../../components/lesson/ActivityBlock'
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useLesson } from '../../hooks/useLesson'
import { api } from '../../services/api'
import { Activity } from '../../types'

/* ============================================================================
   STUDY NOTES — pages/student/LessonView.tsx  (student lesson view)
   ----------------------------------------------------------------------------
   WHAT: Student-facing lesson page. Renders content blocks and activities
         in orderIndex sequence, with prev/next navigation and step indicators.
   SURFACE (per claude-design): Operate — the student is acting on content
         (read, code, quiz). Action affordances dominate.
   HOW IT WORKS:
     1. Reads courseId + lessonId from URL params.
     2. Fetches lesson via useLesson() → GET /modules/{moduleId}/lessons/{lessonId}.
     3. Merges contentBlocks + activities into a single sorted array (allBlocks).
     4. Renders the current block: ContentBlock for static content,
        ActivityBlock for interactive activities (code exercise / quiz).
     5. Prev/Next buttons + step indicator dots for navigation.
   WHERE THE API CONTRACT LIVES:
     • GET /modules/{moduleId}/lessons/{lessonId} (backend #23) — returns lesson
       with content blocks and activities.
     • POST /activities/{id}/code/submit (backend #38) — code submission.
     • POST /activities/{id}/quiz/submit (backend #39) — quiz submission.
   WHAT TO CHANGE FOR THE NEW UI:
     • handleSubmit() is currently a TODO stub (console.log + alert). Wire it to
       the real API: POST /activities/{id}/code/submit for code exercises,
       POST /activities/{id}/quiz/submit for quizzes.
     • Replace `data: any` with a discriminated union type:
         type SubmissionData =
           | { type: 'code_exercise'; code: string; language: string }
           | { type: 'quiz'; answers: number[] }
     • Remove `as any` casts on ContentBlock/ActivityBlock props — type them
       properly against types/index.ts.
     • The readOnly={true} on ContentBlock (line 92) makes content display-only,
       which is correct for the student view. Keep it.
   QA LINK: qa-report.json — hooks-rule finding (useState at bottom of file)
            was already resolved; import is at line 1.
   ============================================================================ */

// import { Lesson } from '../../types'

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
          <Loader2 className="w-8 h-8 animate-spin text-brand-600 dark:text-brand-400" />
        </div>
      </div>
    )
  }

  if (error || !lesson) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-fg-tertiary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-fg-primary">Unable to load lesson</h3>
          <p className="text-fg-tertiary mt-1">{error || 'Please try again later'}</p>
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

  const handleSubmit = async (activityId: string, data: SubmissionData) => {
    setError(null)
    try {
      if ('code' in data) {
        // Code exercise → POST /activities/{id}/code/submit
        await api.post(`/activities/${activityId}/code/submit`, {
          code: data.code,
          language: data.language,
        })
      } else {
        // Quiz → POST /activities/{id}/quiz/submit
        await api.post(`/activities/${activityId}/quiz/submit`, {
          answers: data.answers,
        })
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Submission failed. Please try again.')
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link to={`/courses/${courseId}`} className="text-sm text-brand-600 dark:text-brand-400 hover:underline mb-2 inline-block">
            ← Back to Course
          </Link>
          <h1 className="text-2xl font-bold text-fg-primary">{lesson.title}</h1>
          <p className="text-fg-secondary mt-1">{lesson.description || ''}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-fg-tertiary">{activeBlock + 1} / {allBlocks.length}</span>
        </div>
      </div>

      <Card variant="bordered">
        <CardBody className="p-0">
          {currentBlock?.kind === 'content' && (
            <ContentBlock block={currentBlock as any} readOnly={true} />
          )}
          {currentBlock?.kind === 'activity' && (
            <ActivityBlock
              activity={currentBlock as unknown as Activity}
              progress={undefined}
              onSubmit={handleSubmit}
              readOnly={false}
            />
          )}
          {allBlocks.length === 0 && (
            <div className="p-8 text-center text-fg-tertiary">
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
                    ? 'bg-brand-600'
                    : 'bg-border-primary hover:bg-border-secondary'
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