import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageIntro } from '../components/ui/PageIntro'
import { TabsBar } from '../components/ui/TabsBar'
import { ProgressSummary } from '../components/ui/ProgressSummary'
import { SubjectCard } from '../components/ui/SubjectCard'
import { Button } from '../components/ui/Button'

const SUBJECTS = [
  {
    number: 'SUBJECT 01',
    title: 'Programming Fundamentals',
    description: 'Variables, control flow, functions, and your first working program.',
    progress: 50,
  },
  {
    number: 'SUBJECT 02',
    title: 'Computer Systems',
    description: 'How hardware, operating systems, and networks fit together.',
    progress: 25,
  },
  {
    number: 'SUBJECT 03',
    title: 'Digital Citizenship',
    description: 'Safe, responsible, and critical use of online tools and data.',
    progress: 25,
  },
]

const TABS = [
  { id: 'subjects', label: 'Subjects · 3' },
  { id: 'modules', label: 'Modules · 12' },
  { id: 'activity', label: 'Activity' },
]

export function StudentSubjects() {
  const [activeTab, setActiveTab] = useState('subjects')
  const navigate = useNavigate()

  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative size-full animate-page-fade">

      <PageIntro
        breadcrumb="Courses / CS101"
        title="Introduction to Computer Science"
        metadata="5 modules · 18 lessons · Instructor: Dr. Sarah Chen"
        action={
          <Button
            size="lg"
            fullWidth
            variant="primary"
            onClick={() => navigate('/student/courses/CS101/modules')}
            className="w-auto"
          >
            RESUME LEARNING
          </Button>
        }
      />

      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        <TabsBar tabs={TABS} activeId={activeTab} onChange={setActiveTab} />

        <ProgressSummary
          className="mt-6"
          title="Course progress"
          detail="6 of 18 lessons completed"
          percent={33}
        />

        <div className="mt-10">
          <h2 className="font-display text-[22px] font-bold text-aktibo-navy-deep">Subjects</h2>
          <p className="mt-1 text-[13px] text-aktibo-muted">
            Pick a subject and keep moving through its modules.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 grid-cols-2 grid-cols-3">
          {SUBJECTS.map((subject) => (
            <SubjectCard
              key={subject.title}
              number={subject.number}
              title={subject.title}
              description={subject.description}
              progress={subject.progress}
              actionLabel="VIEW MODULES"
              onAction={() => navigate('/student/courses/CS101/subjects/1/modules')}
            />
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 grid-cols-[1fr_416px]">
          <section className="rounded-card border border-aktibo-border bg-aktibo-surface p-6 p-8 shadow-card">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted">
              LATEST COURSE UPDATE
            </p>
            <h3 className="mt-2 font-display text-[16px] font-bold text-aktibo-navy-deep">
              New practice set added to Module 03
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-aktibo-muted">
              Five new interactive questions on loops and iteration, with instant feedback.
            </p>
            <p className="mt-3 text-[11px] text-aktibo-muted">Posted by Dr. Sarah Chen · 2 days ago</p>
          </section>

          <section className="rounded-card border border-aktibo-border bg-aktibo-surface p-6 p-8 shadow-card">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted">
              NEXT LEARNING STEP
            </p>
            <h3 className="mt-2 font-display text-[16px] font-bold text-aktibo-navy-deep">
              Loops and iteration
            </h3>
            <p className="mt-2 text-[13px] text-aktibo-muted">Interactive lesson · Practice activity</p>
            <p className="mt-3 text-[11px] text-aktibo-muted">Estimated 25 minutes</p>
          </section>
        </div>
      </main>

    </div>
  )
}
