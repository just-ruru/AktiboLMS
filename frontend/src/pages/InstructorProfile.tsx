import profilePicPlaceholder from '../assets/profile_pic_placeholder.jpg'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { PageIntro } from '../components/ui/PageIntro'
import { getInstructorById } from '../services/api'

export function InstructorProfile() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [instructor, setInstructor] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) {
      setLoading(false)
      return
    }
    getInstructorById(Number(id))
      .then((i) => {
        setInstructor(i)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="bg-aktibo-navy flex flex-col items-center justify-center min-h-screen p-6">
        <p className="text-aktibo-white text-[24px] font-display">
          Loading instructor profile…
        </p>
      </div>
    )
  }

  if (!instructor) {
    return (
      <div className="bg-aktibo-navy min-h-screen flex flex-col relative animate-page-fade">
        <main className="flex-1 flex items-center justify-center px-[72px] pb-8">
          <Card variant="surface" padded className="p-8 max-w-md w-full">
            <div className="flex flex-col gap-3 text-center">
              <p className="font-display text-[18px] font-bold text-aktibo-navy-deep whitespace-nowrap whitespace-normal">
                Instructor not found.
              </p>
              <Button
                size="lg"
                fullWidth
                variant="primary"
                onClick={() => navigate('/instructors/list')}
              >
                Back to Instructor List
              </Button>
            </div>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="bg-aktibo-canvas min-h-screen flex flex-col relative size-full animate-page-fade">

      {/* Page introduction — navy hero band */}
      <PageIntro
        breadcrumb="Instructors / Profile"
        title="Instructor profile"
        metadata="Manage your instructor information and account details."
      />

      <main className="flex-1 mx-auto w-full max-w-[1296px] px-[72px] py-6">
        <div className="grid gap-6 grid-cols-[312px_1fr] items-start">
          {/* Left column — profile summary + session actions */}
          <div className="flex flex-col gap-6">
            <Card variant="surface" padded className="p-6">
              <div className="flex flex-col items-center gap-3">
                <div className="bg-aktibo-gold h-[4px] w-[40px] rounded-[2px]" />
                <div className="relative size-[219px]">
                  <img
                    src={profilePicPlaceholder}
                    alt="Avatar"
                    className="absolute block inset-0 max-w-none size-full rounded-full object-cover"
                  />
                </div>
                <p className="font-sans text-[12px] font-bold uppercase tracking-[0.08em] text-aktibo-muted">
                  INSTRUCTOR HOLDER
                </p>
                <p className="font-sans text-[28px] font-bold text-aktibo-navy-deep whitespace-nowrap">
                  {instructor.firstName} {instructor.lastName}
                </p>
                <p className="font-sans text-[14px] text-aktibo-muted">
                  {instructor.email}
                </p>
                <hr className="w-full border-aktibo-border my-4" />
                <Link to="/edit-profile">
                  <Button size="lg" fullWidth variant="primary">
                    Edit basic info
                  </Button>
                </Link>
              </div>
            </Card>

            <div className="flex flex-col gap-3">
              <p className="font-sans text-[16px] font-bold text-aktibo-navy-deep whitespace-nowrap">
                Account access
              </p>
              <p className="font-sans text-[14px] text-aktibo-muted whitespace-nowrap">
                Finished teaching for now?
              </p>
              <Card variant="surface" padded className="p-0">
                <Button
                  size="lg"
                  fullWidth
                  variant="danger"
                  className="justify-start pl-4 text-left text-aktibo-danger-fg font-bold"
                >
                  Log out
                </Button>
              </Card>
            </div>
          </div>

          {/* Right column — Instructor details card */}
          <Card variant="surface" padded className="p-8">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col flex-row items-center gap-6">
                <div className="flex flex-col gap-1">
                  <p className="font-sans text-[26px] font-bold text-aktibo-navy-deep whitespace-nowrap">
                    Instructor Details
                  </p>
                  <p className="font-sans text-[15px] text-aktibo-muted">
                    Your personal and academic information.
                  </p>
                </div>
                <Link to="/edit-profile">
                  <Button size="lg" variant="primary">
                    Edit instructor details
                  </Button>
                </Link>
              </div>

              <div className="mt-6 grid gap-3 grid-cols-2">
                <div className="flex flex-col gap-2 pt-1">
                  <p className="font-sans text-[14px] text-aktibo-muted whitespace-nowrap">
                    Instructor ID
                  </p>
                  <p className="font-sans text-[18px] text-aktibo-navy-deep">
                    {instructor.instructorId}
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <p className="font-sans text-[14px] text-aktibo-muted whitespace-nowrap">
                    First Name
                  </p>
                  <p className="font-sans text-[18px] text-aktibo-navy-deep">
                    {instructor.firstName}
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <p className="font-sans text-[14px] text-aktibo-muted whitespace-nowrap">
                    Last Name
                  </p>
                  <p className="font-sans text-[18px] text-aktibo-navy-deep">
                    {instructor.lastName}
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <p className="font-sans text-[14px] text-aktibo-muted whitespace-nowrap">
                    Email Address
                  </p>
                  <p className="font-sans text-[18px] text-aktibo-navy-deep">
                    {instructor.email}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-3 grid-cols-2">
                <div className="flex flex-col gap-2 pt-1">
                  <p className="font-sans text-[14px] text-aktibo-muted whitespace-nowrap">
                    Description
                  </p>
                  <p className="font-sans text-[18px] text-aktibo-navy-deep whitespace-nowrap">
                    {instructor.description || '—'}
                  </p>
                </div>
                <div className="flex flex-col gap-2 pt-1">
                  <p className="font-sans text-[14px] text-aktibo-muted whitespace-nowrap">
                    Status
                  </p>
                  <p
                    className={`font-sans text-[18px] font-bold whitespace-nowrap ${
                      instructor.isActive
                        ? 'text-aktibo-success-fg'
                        : 'text-aktibo-danger-fg'
                    }`}
                  >
                    {instructor.isActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-4 pt-4">
                <p className="font-sans text-[15px] text-aktibo-muted whitespace-nowrap">
                  Keep your contact information up to date.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>

    </div>
  )
}
