import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/ui/Navbar'
import { PageIntro } from '../components/ui/PageIntro'
import { TabsBar } from '../components/ui/TabsBar'
import { ProgressSummary } from '../components/ui/ProgressSummary'
import { SubjectCard } from '../components/ui/SubjectCard'
import { Button } from '../components/ui/Button'
import { Footer } from '../components/ui/Footer'

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
    <div className="flex min-h-screen w-full flex-col bg-aktibo-canvas">
      <Navbar className="w-full" signedIn />

      <PageIntro
        breadcrumb="Courses / CS101"
        title="Introduction to Computer Science"
        metadata="5 modules · 18 lessons · Instructor: Dr. Sarah Chen"
        action={
          <Button
            variant="primary"
            className="h-[48px] w-full rounded-[9px] bg-aktibo-gold text-[12px] text-aktibo-ink-on-gold sm:w-[264px]"
            onClick={() => navigate('/student/courses/CS101/modules')}
          >
            RESUME LEARNING
          </Button>
        }
      />

      <main className="mx-auto w-full max-w-[1296px] flex-1 px-6 py-8 sm:px-10 lg:px-[72px]">
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

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
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

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_416px]">
          <section className="rounded-[16px] border border-aktibo-border bg-aktibo-surface p-6 shadow-card">
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

          <section className="rounded-[16px] border border-aktibo-border bg-aktibo-surface p-6 shadow-card">
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

      <Footer signedIn className="mt-12" />
    </div>
  )
}
