import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageIntro } from '../components/ui/PageIntro'
import { TabsBar } from '../components/ui/TabsBar'
import { SubjectCard } from '../components/ui/SubjectCard'
import { StatCard } from '../components/ui/StatCard'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'

const SUBJECTS = [
  {
    number: 'SUBJECT 01',
    title: 'Programming Fundamentals',
    description: 'Variables, control flow, functions, and your first working program.',
    progress: 100,
  },
  {
    number: 'SUBJECT 02',
    title: 'Computer Systems',
    description: 'How hardware, operating systems, and networks fit together.',
    progress: 60,
  },
  {
    number: 'SUBJECT 03',
    title: 'Digital Citizenship',
    description: 'Safe, responsible, and critical use of online tools and data.',
    progress: 0,
  },
]

const TABS = [
  { id: 'subjects', label: 'Subjects · 3' },
  { id: 'modules', label: 'Modules · 12' },
  { id: 'activity', label: 'Activity' },
]

export function InstructorSubjects() {
  const [activeTab, setActiveTab] = useState('subjects')
  const navigate = useNavigate()

  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative size-full animate-page-fade">

      <PageIntro
        breadcrumb="Courses / CS101"
        title="Introduction to Computer Science"
        metadata="5 modules · 18 lessons · 24 enrolled learners"
        action={
          <Button
            size="lg"
            fullWidth
            variant="primary"
            onClick={() => navigate('/instructor/courses/CS101/edit')}
            className="w-auto"
          >
            EDIT COURSE
          </Button>
        }
      />

      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        <TabsBar tabs={TABS} activeId={activeTab} onChange={setActiveTab} />

        {/* Teaching summary strip */}
        <div className="mt-6 grid grid-cols-2 gap-4 rounded-card border border-aktibo-border bg-aktibo-surface p-4 p-6 shadow-card grid-cols-[repeat(4,1fr)_auto] items-center">
          <StatCard value="24" label="Enrolled" className="border-0 bg-transparent px-2 py-1 shadow-none" />
          <StatCard value="18" label="Lessons" className="border-0 bg-transparent px-2 py-1 shadow-none" />
          <StatCard value="86%" label="Avg. progress" className="border-0 bg-transparent px-2 py-1 shadow-none" />
          <StatCard value="12" label="Activities" className="border-0 bg-transparent px-2 py-1 shadow-none" />
          <Badge tone="success" className="justify-self-start justify-self-end">
            Published
          </Badge>
        </div>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-[22px] font-bold text-aktibo-navy-deep">Subjects</h2>
            <p className="mt-1 text-[13px] text-aktibo-muted">
              Organize this course into subjects, then modules.
            </p>
          </div>
          <Button size="sm" variant="primary">
            ADD SUBJECT
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 grid-cols-2 grid-cols-3">
          {SUBJECTS.map((subject) => (
            <SubjectCard
              key={subject.title}
              number={subject.number}
              title={subject.title}
              description={subject.description}
              progress={subject.progress}
              actionLabel="MANAGE MODULES"
              onAction={() => navigate('/instructor/courses/CS101/subjects/1/modules')}
            />
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 grid-cols-[1fr_416px]">
          <section className="rounded-card border border-aktibo-border bg-aktibo-surface p-6 p-8 shadow-card">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted">
              LATEST COURSE UPDATE
            </p>
            <h3 className="mt-2 font-display text-[16px] font-bold text-aktibo-navy-deep">
              Module 03 practice set published
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-aktibo-muted">
              Learners can now attempt the loops and iteration practice activity.
            </p>
            <p className="mt-3 text-[11px] text-aktibo-muted">Posted by you · 2 days ago</p>
          </section>

          <section className="rounded-card border border-aktibo-border bg-aktibo-surface p-6 p-8 shadow-card">
            <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted">
              ENROLLMENT ACCESS
            </p>
            <h3 className="mt-2 font-display text-[16px] font-bold text-aktibo-navy-deep">
              Open to enroll
            </h3>
            <p className="mt-2 text-[13px] text-aktibo-muted">New learners can join this course.</p>
            <p className="mt-3 text-[11px] text-aktibo-muted">24 learners enrolled</p>
          </section>
        </div>
      </main>

    </div>
  )
}
