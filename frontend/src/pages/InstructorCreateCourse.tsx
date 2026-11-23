import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card } from '../components/ui/Card'
import { PageIntro } from '../components/ui/PageIntro'

const CATEGORIES = [
  'Computer Science',
  'Web Development',
  'Science',
  'Data Science',
  'Design',
]

function SelectField({
  label,
  value,
  onChange,
  children,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  children: React.ReactNode
}) {
  return (
    <div className="w-full">
      <p className="mb-1.5 block font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
        {label}
      </p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-12 rounded-field border bg-aktibo-surface font-sans text-aktibo-ink placeholder:text-aktibo-muted/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-aktibo-gold focus:ring-offset-1 border-aktibo-border hover:border-aktibo-border-strong focus:border-aktibo-gold appearance-none px-4 text-[15px] cursor-pointer"
      >
        {children}
      </select>
    </div>
  )
}

export function InstructorCreateCourse() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !category) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      navigate('/instructor/courses')
    }, 600)
  }

  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative size-full animate-page-fade">

      {/* Page introduction — navy hero band */}
      <PageIntro
        breadcrumb="Instructors / Create"
        title="Create a New Course"
        metadata="Set up your course structure and add lessons."
      />

      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        <form onSubmit={handleSubmit} className="max-w-[768px] w-full mx-auto">
          <Card variant="surface" padded className="w-full">
            <div className="flex flex-col gap-5">
              <div className="grid gap-5 grid-cols-2">
                <div className="flex flex-col gap-2">
                  <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                    COURSE TITLE
                  </p>
                  <Input
                    id="course-title"
                    type="text"
                    inputSize="lg"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Introduction to Computer Science"
                  />
                </div>
                <SelectField
                  label="CATEGORY"
                  value={category}
                  onChange={setCategory}
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </SelectField>
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-display text-[10px] font-bold uppercase tracking-[0.08em] text-aktibo-muted whitespace-nowrap">
                  DESCRIPTION
                </p>
                <textarea
                  id="course-description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what students will learn in this course..."
                  className="w-full h-32 rounded-field border bg-aktibo-surface font-sans text-aktibo-ink placeholder:text-aktibo-muted/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-aktibo-gold focus:ring-offset-1 border-aktibo-border hover:border-aktibo-border-strong focus:border-aktibo-gold px-4 py-3 text-[15px]"
                />
              </div>

              <div className="mt-4 flex flex-col flex-row gap-3 w-full">
                <Button
                  size="lg"
                  fullWidth
                  variant="primary"
                  type="submit"
                  disabled={!title || !category || submitting}
                  onClick={(e) => {
                    e.preventDefault()
                    handleSubmit(e)
                  }}
                  className="w-auto"
                >
                  {submitting ? 'Creating…' : 'CREATE COURSE'}
                </Button>
                <Button
                  size="lg"
                  fullWidth
                  variant="outline"
                  type="button"
                  onClick={() => navigate('/instructor/courses')}
                  className="w-auto"
                >
                  CANCEL
                </Button>
              </div>
            </div>
          </Card>
        </form>
      </main>

    </div>
  )
}
