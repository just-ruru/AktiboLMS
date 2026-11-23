import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageIntro } from '../components/ui/PageIntro'

export function StudentEnrollmentConfirmed() {
  const navigate = useNavigate()

  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative size-full animate-page-fade">

      {/* Page introduction — navy hero band */}
      <PageIntro
        breadcrumb="Students / Enrollment"
        title="You're enrolled!"
        metadata="You've successfully enrolled in Introduction to Computer Science."
      />

      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        <Card variant="surface" padded className="p-8 p-12 max-w-[576px] w-full">
          <div className="flex flex-col gap-4">
            <div className="bg-aktibo-success-bg border border-aktibo-success-fg/30 rounded-control p-3">
              <p className="font-display text-[18px] font-bold text-aktibo-success-fg whitespace-nowrap whitespace-normal">
                ✅ Enrollment Confirmed
              </p>
            </div>

            <p className="font-titling text-[22px] font-bold text-aktibo-navy-deep whitespace-nowrap whitespace-normal">
              Introduction to Computer Science
            </p>
            <p className="text-[14px] text-aktibo-muted whitespace-normal">
              Instructor: Dr. Sarah Chen
            </p>
            <p className="text-[14px] text-aktibo-muted whitespace-normal">
              5 modules • 18 lessons • Starts today
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <Button
                size="lg"
                fullWidth
                variant="primary"
                onClick={() => navigate('/student/courses')}
              >
                Go to course
              </Button>
              <Button
                size="lg"
                fullWidth
                variant="ghost"
                onClick={() => navigate('/student/courses')}
              >
                View all courses
              </Button>
            </div>
          </div>
        </Card>
      </main>

    </div>
  )
}
