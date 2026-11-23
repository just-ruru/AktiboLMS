import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Label } from '../components/ui/Label'
import { Card } from '../components/ui/Card'
import { PageIntro } from '../components/ui/PageIntro'
import { getStudentById, updateStudent, type Student } from '../services/api'

export function StudentUpdate() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [student, setStudent] = useState<Student | null>(null)
  const [form, setForm] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    description: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      navigate('/students/list')
      return
    }
    getStudentById(Number(id))
      .then((s) => {
        setStudent(s)
        setForm({
          studentId: s.studentId,
          firstName: s.firstName,
          lastName: s.lastName,
          email: s.email,
          password: '',
          description: s.description || '',
        })
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        navigate('/students/list')
      })
  }, [id, navigate])

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!form.studentId.trim()) newErrors.studentId = 'Student ID is required'
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Email should be valid'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!student || !id) return
    if (!validate()) return
    setSubmitting(true)
    try {
      await updateStudent(Number(id), form)
      navigate(`/students/profile/${id}`)
    } catch (err: any) {
      setErrors({ _submit: err.message || 'Failed to update student' })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="bg-aktibo-navy flex flex-col items-center justify-center min-h-screen p-6">
        <p className="text-aktibo-white text-[24px] font-display">
          Loading student…
        </p>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="bg-aktibo-navy min-h-screen flex flex-col relative animate-page-fade">
        <main className="flex-1 flex items-center justify-center px-[72px] pb-8">
          <Card variant="surface" padded className="p-8 max-w-md w-full">
            <div className="flex flex-col gap-3 text-center">
              <p className="font-display text-[18px] font-bold text-aktibo-navy-deep whitespace-nowrap whitespace-normal">
                Student not found.
              </p>
              <Button
                size="lg"
                fullWidth
                variant="primary"
                onClick={() => navigate('/students/list')}
              >
                Back to Student List
              </Button>
            </div>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative size-full animate-page-fade">

      {/* Page introduction */}
      <PageIntro
        breadcrumb="Students / Update"
        title="Update student"
        metadata="Keep student details current so their learning record stays accurate."
      />

      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        <Card variant="surface" padded className="p-8 p-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            {errors._submit && (
              <p className="mt-1 text-[11px] font-display text-aktibo-danger-fg">
                {errors._submit}
              </p>
            )}

            <div className="grid gap-6 grid-cols-2 w-full">
              {/* Left column */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="studentId">Student ID *</Label>
                  <Input
                    id="studentId"
                    type="text"
                    inputSize="md"
                    value={form.studentId}
                    onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                    placeholder="e.g. STU2025001"
                    error={errors.studentId}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    inputSize="md"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    placeholder="First Name"
                    error={errors.firstName}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    inputSize="md"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    placeholder="Last Name"
                    error={errors.lastName}
                  />
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    inputSize="md"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="example@cit.edu"
                    error={errors.email}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="password">
                    New Password (leave blank to keep current)
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    inputSize="md"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    inputSize="md"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Brief description…"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3 justify-end">
              <Link to={`/students/profile/${student.id}`}>
                <Button size="lg" variant="ghost" className="w-auto">
                  Cancel
                </Button>
              </Link>
              <Button
                size="lg"
               
                variant="primary"
                className="w-auto"
                disabled={submitting}
                onClick={(e) => {
                  e.preventDefault()
                  handleSubmit(e as React.FormEvent)
                }}
              >
                {submitting ? 'Updating…' : 'Save changes'}
              </Button>
            </div>
          </form>
        </Card>
      </main>

    </div>
  )
}
