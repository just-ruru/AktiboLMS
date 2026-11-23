import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { ProgressBar } from '../components/ui/ProgressBar'
import { Card } from '../components/ui/Card'
import { PageIntro } from '../components/ui/PageIntro'

export function StudentInteractiveLesson() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)

  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative size-full animate-page-fade">

      {/* Page introduction — navy hero band */}
      <PageIntro
        breadcrumb="Interactive Lesson"
        title="Introduction to Computer Science"
        metadata="Module 1: Getting Started • Lesson 3 of 18"
      />

      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        {/* Lesson header with progress */}
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
              LESSON PROGRESS
            </p>
            <p className="font-titling text-[22px] font-bold text-aktibo-navy-deep">
              Variables and Data Types
            </p>
          </div>
          <ProgressBar value={progress} label={`${progress}% complete`} />

          {/* Lesson content area */}
          <Card variant="surface" padded className="mt-4 w-full">
            <div className="flex flex-col gap-5">
              {/* Interactive content */}
              <div className="rounded-card border border-aktibo-border bg-aktibo-canvas p-6 p-8">
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                  INTERACTIVE EXERCISE
                </p>
                <p className="mt-2 font-display text-[20px] font-bold text-aktibo-navy-deep">
                  What is a variable?
                </p>
                <p className="mt-3 text-[14px] text-aktibo-muted leading-relaxed">
                  A variable is a container that stores data values. In JavaScript,
                  you declare variables using let, const, or var.
                </p>

                <div className="mt-6 flex flex-col gap-2">
                  <p className="font-display text-[11px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                    TYPE YOUR ANSWER
                  </p>
                  <textarea
                    rows={3}
                    className="w-full h-24 rounded-field border bg-aktibo-surface font-sans text-aktibo-ink placeholder:text-aktibo-muted/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-aktibo-gold focus:ring-offset-1 border-aktibo-border hover:border-aktibo-border-strong focus:border-aktibo-gold px-4 py-3 text-[15px]"
                    placeholder="Type your answer here..."
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-4 flex flex-col flex-row gap-3 w-full justify-end">
                <Button
                  size="lg"
                  fullWidth
                  variant="outline"
                  onClick={() => navigate('/student/courses')}
                  className="w-auto"
                >
                  BACK TO COURSES
                </Button>
                <Button
                  size="lg"
                  fullWidth
                  variant="primary"
                  onClick={() => setProgress(Math.min(100, progress + 25))}
                  disabled={progress >= 100}
                  className="w-auto"
                >
                  MARK COMPLETE
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>

    </div>
  )
}
