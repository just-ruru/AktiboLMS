import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageIntro } from '../components/ui/PageIntro'
import { Input } from '../components/ui/Input'

const TEXTAREA_CLASS =
  'w-full rounded-field border bg-aktibo-surface font-sans text-aktibo-ink placeholder:text-aktibo-muted/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-aktibo-gold focus:ring-offset-1 border-aktibo-border hover:border-aktibo-border-strong focus:border-aktibo-gold px-4 py-3 text-[15px]'

export function InstructorPracticeEditor() {
  const navigate = useNavigate()

  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative size-full animate-page-fade">
      {/* Page introduction — navy hero band */}
      <PageIntro
        breadcrumb="Practice Editor"
        title="Create a Practice Exercise"
        metadata="Introduction to Computer Science • Module 1: Getting Started"
      />

      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        <Card variant="surface" padded className="max-w-[768px] w-full mx-auto">
          <div className="flex flex-col gap-5">
            <Input
              label="PRACTICE TITLE"
              placeholder="e.g. Loop Practice Exercise"
              inputSize="lg"
            />

            <div className="flex flex-col gap-2">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                QUESTION
              </p>
              <textarea
                rows={3}
                className={`${TEXTAREA_CLASS} h-[96px]`}
                placeholder="Write the practice question here..."
              />
            </div>

            <Input
              label="CORRECT ANSWER"
              placeholder="Enter the correct answer"
              inputSize="lg"
            />

            <div className="flex flex-col gap-2">
              <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                FEEDBACK (OPTIONAL)
              </p>
              <textarea
                rows={3}
                className={`${TEXTAREA_CLASS} h-[96px]`}
                placeholder="Explanation shown after submission"
              />
            </div>

            <div className="mt-2 flex flex-col flex-row gap-3 w-full justify-end">
              <Button
                size="lg"
                fullWidth
                variant="outline"
                onClick={() => navigate('/instructor/courses')}
                className="w-auto"
              >
                CANCEL
              </Button>
              <Button
                size="lg"
                fullWidth
                variant="primary"
                onClick={() => navigate('/instructor/courses')}
                className="w-auto"
              >
                SAVE PRACTICE
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
