import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Card } from '../components/ui/Card'
import { PageIntro } from '../components/ui/PageIntro'
import { SelectField } from '../components/ui/SelectField'
import { getAllStudents, type Student } from '../services/api'

const FILTERS = ['All', 'Active', 'Inactive']
const SORTS = ['Recently updated', 'Name (A-Z)', 'Student ID']

export function StudentList() {
  const navigate = useNavigate()
  const [students, setStudents] = useState<Student[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [sort, setSort] = useState('Recently updated')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getAllStudents(page, 20)
      .then((res) => {
        setStudents(res.content)
        setTotalPages(res.totalPages)
        setError(null)
      })
      .catch((err) => {
        console.error(err)
        setError('Failed to load students. Please try again.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [page])

  const handleCreate = () => navigate('/students/create')
  const handleView = (id: number) => navigate(`/students/profile/${id}`)
  const handleEdit = (id: number) => navigate(`/students/update/${id}`)

  const filtered = students.filter((s) => {
    const query = search.trim().toLowerCase()
    if (
      query &&
      !s.firstName.toLowerCase().includes(query) &&
      !s.lastName.toLowerCase().includes(query) &&
      !s.email.toLowerCase().includes(query) &&
      !s.studentId.toLowerCase().includes(query)
    )
      return false
    if (filter !== 'All') {
      return filter === 'Active' ? s.isActive : !s.isActive
    }
    return true
  }).sort((a, b) => {
    if (sort === 'Name (A-Z)') return a.firstName.localeCompare(b.firstName)
    if (sort === 'Student ID') return a.studentId.localeCompare(b.studentId)
    return 0
  })

  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative size-full animate-page-fade">

      {/* Page introduction */}
      <PageIntro
        breadcrumb="Students / List"
        title="Students"
        metadata="Manage student accounts, view profiles, and keep records up to date."
      />

      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        {/* Actions row — filter pills + add button */}
        <div className="flex flex-col flex-row gap-4 items-start w-full">
          <div className="flex gap-3 flex-wrap w-full">
            <TabPill
              active={filter === 'All'}
              label={`ALL STUDENTS ${students.length}`}
              onClick={() => setFilter('All')}
            />
            <TabPill
              active={filter === 'Active'}
              label={`ACTIVE ${students.filter((s) => s.isActive).length}`}
              onClick={() => setFilter('Active')}
            />
            <TabPill
              active={filter === 'Inactive'}
              label={`INACTIVE ${students.filter((s) => !s.isActive).length}`}
              onClick={() => setFilter('Inactive')}
            />
          </div>
          <Button size="lg" variant="primary" onClick={handleCreate} className="w-auto">
            Add student
          </Button>
        </div>

        {/* Search / filter / sort row */}
        <div className="mt-5 flex flex-row gap-4 w-full items-start">
          <div className="flex-1 min-w-[320px]">
            <Input
              label="Search students"
              placeholder="Search by name, ID, or email"
              inputSize="md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-[260px]">
            <SelectField label="Filter" value={filter} onChange={setFilter}>
              {FILTERS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </SelectField>
          </div>
          <div className="w-[300px]">
            <SelectField label="Sort" value={sort} onChange={setSort}>
              {SORTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </SelectField>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="mt-8 flex flex-col items-center justify-center py-20 text-aktibo-muted text-[15px] w-full">
            <div className="animate-pulse rounded-full bg-aktibo-border h-8 w-8 mb-3" />
            Loading students…
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="mt-8 flex flex-col items-center justify-center py-20 text-aktibo-danger-fg text-[15px] w-full">
            <p className="mb-3">{error}</p>
            <Button size="md" variant="outline" onClick={() => setPage(page)}>
              Try again
            </Button>
          </div>
        )}

        {/* Result count */}
        {!loading && !error && (
          <>
            <p className="mt-3 text-[12px] text-aktibo-muted">
              {filtered.length} students
            </p>

        {/* Student grid */}
        <div className="mt-5 grid gap-5 grid-cols-2 grid-cols-4 w-full">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-aktibo-muted text-[15px] w-full col-span-full">
              No students found.
            </div>
          ) : (
            filtered.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                onView={() => handleView(student.id)}
                onEdit={() => handleEdit(student.id)}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex gap-3 items-center justify-between">
          <Button
            size="lg"
           
            variant="outline"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="w-auto"
          >
            Prev
          </Button>
          <p className="text-[13px] text-aktibo-muted whitespace-nowrap">
            Page {page + 1} of {totalPages}
          </p>
          <Button
            size="lg"
           
            variant="outline"
            disabled={page >= totalPages - 1}
            onClick={() => setPage(page + 1)}
            className="w-auto"
          >
            Next
          </Button>
        </div>
          </>
        )}
      </main>

    </div>
  )
}

function TabPill({
  active,
  label,
  onClick,
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <Button
      size="lg"
      variant={active ? 'primary' : 'ghost'}
      onClick={onClick}
      className={active ? '' : 'text-aktibo-navy border-aktibo-border hover:bg-aktibo-navy/5'}
    >
      {label}
    </Button>
  )
}

function StudentCard({
  student,
  onView,
  onEdit,
}: {
  student: Student
  onView: () => void
  onEdit: () => void
}) {
  return (
    <Card variant="surface" padded className="p-6 flex flex-col h-full">
      <div className="flex gap-4 items-start w-full mb-4">
        <div
          className="bg-aktibo-canvas flex items-center justify-center rounded-control px-3 py-1"
        >
          <p className="font-display text-[10px] text-aktibo-navy-deep whitespace-nowrap">
            {student.studentId}
          </p>
        </div>
        <div
          className={`flex items-center justify-center rounded-control px-3 py-1 ${
            student.isActive
              ? 'bg-aktibo-success-bg text-aktibo-success-fg'
              : 'bg-aktibo-canvas text-aktibo-muted'
          }`}
        >
          <p className="font-display text-[10px] whitespace-nowrap">
            {student.isActive ? 'Active' : 'Inactive'}
          </p>
        </div>
      </div>
      <p className="font-titling text-[18px] font-bold text-aktibo-navy-deep leading-snug mb-1">
        {student.firstName} {student.lastName}
      </p>
      <p className="text-[12px] text-aktibo-muted mb-4">{student.email}</p>
      <p className="text-[11px] text-aktibo-muted mb-4">
        {student.description || 'No description'}
      </p>
      <p className="text-[11px] text-aktibo-muted mb-4">
        Joined{' '}
        {new Date(student.createdAt).toLocaleDateString()}
      </p>
      <div className="mt-auto flex gap-3">
        <Button size="sm" fullWidth variant="outline" onClick={onView}>
          View
        </Button>
        <Button size="sm" fullWidth variant="primary" onClick={onEdit}>
          Edit
        </Button>
      </div>
    </Card>
  )
}
