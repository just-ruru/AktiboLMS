import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card } from '../components/ui/Card'
import { PageIntro } from '../components/ui/PageIntro'

export function StudentEnrollCourse() {
  const navigate = useNavigate()
  const [enrollmentCode, setEnrollmentCode] = useState('')
  const [courseFound, setCourseFound] = useState(false)
  const [enrolling, setEnrolling] = useState(false)

  const handleEnroll = () => {
    setEnrolling(true)
    setTimeout(() => {
      setEnrolling(false)
      navigate('/student/courses')
    }, 800)
  }

  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative size-full animate-page-fade">

      {/* Page introduction — navy hero band */}
      <PageIntro
        breadcrumb="Students / Enroll"
        title="Enroll in a Course"
        metadata="Enter your enrollment code to join a course."
      />

      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        <Card variant="surface" padded className="max-w-[576px] w-full mx-auto">
          <div className="flex flex-col gap-4">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
              ENROLLMENT CODE
            </p>
            <p className="font-titling text-[22px] font-bold text-aktibo-navy-deep whitespace-nowrap whitespace-normal">
              Enter your enrollment code
            </p>
            <p className="text-[13px] text-aktibo-muted whitespace-normal">
              Ask your instructor for the enrollment code for the course you want to join.
            </p>

            <div className="flex flex-col gap-2">
              <Input
                id="enrollment-code"
                type="text"
                inputSize="lg"
                value={enrollmentCode}
                onChange={(e) => setEnrollmentCode(e.target.value)}
                placeholder="e.g. CS101-2025"
                containerClassName={courseFound ? 'bg-aktibo-success-bg border border-aktibo-success-fg/30' : ''}
              />
              {courseFound && (
                <p className="mt-1 text-[13px] font-display font-bold text-aktibo-success-fg whitespace-normal">
                  ✅ Course found: Introduction to Computer Science
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-col flex-row gap-3 w-full">
              <Button
                size="lg"
                fullWidth
                variant="primary"
                disabled={!enrollmentCode || !courseFound}
                onClick={handleEnroll}
                className="w-auto"
              >
                {enrolling ? 'Enrolling…' : 'ENROLL COURSE'}
              </Button>
              <Button
                size="lg"
                fullWidth
                variant="ghost"
                onClick={() => {
                  setEnrollmentCode('')
                  setCourseFound(false)
                }}
                disabled={!enrollmentCode}
                className="w-auto"
              >
                Try another code
              </Button>
            </div>
          </div>
        </Card>
      </main>

    </div>
  )
}
