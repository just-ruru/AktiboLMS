import { useEffect, useState } from 'react'
import { Navbar } from '../../components/ui/Navbar'
import { SiteFooter } from '../../components/ui/SiteFooter'
import { FormValidationOverlay } from '../../components/overlays/FormValidationOverlay'
import { ConfirmLogoutDialog } from '../../components/overlays/ConfirmLogoutDialog'
import { SelectOptionOverlay } from '../../components/overlays/SelectOptionOverlay'
import { backend } from '../../lib/backendAdapter'

const WHITE_BUTTON =
  'h-11 rounded-[9px] border border-[#dfe5f0] bg-surface-white px-[10px] py-[10px] font-display text-[11px] font-bold text-aktif-navy flex items-center justify-center'

export function OverlayPreview() {
  const [formOpen, setFormOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [selectOpen, setSelectOpen] = useState(false)
  const [options, setOptions] = useState<string[]>([])

  useEffect(() => {
    let active = true
    backend
      .getCourses()
      .then((courses) => {
        if (active) setOptions(courses.map((course) => course.courseTitle))
      })
      .catch(() => {
        if (active) setOptions([])
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-surface-light animate-page-fade">
      <Navbar activePath="/courses" />

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col items-start gap-6 px-6 pt-8 lg:px-[72px]">
        <section className="flex w-full flex-col gap-2 bg-aktif-navy px-6 pb-5 pt-[22px]">
          <h1 className="font-display text-[36px] leading-[1.2] text-text-inverse">
            Overlay preview
          </h1>
          <p className="font-display text-[13px] text-[#d1d8ee]">
            Open each overlay to review its behavior.
          </p>
        </section>

        <section className="flex w-full flex-col gap-[24px]">
          <div className="flex flex-col gap-4 w-full max-w-[620px]">
            <button
              type="button"
              onClick={() => setFormOpen(true)}
              className={`${WHITE_BUTTON} w-full`}
            >
              Open form validation
            </button>
            <button
              type="button"
              onClick={() => setLogoutOpen(true)}
              className={`${WHITE_BUTTON} w-full`}
            >
              Open confirm logout
            </button>
            <button
              type="button"
              onClick={() => setSelectOpen(true)}
              className={`${WHITE_BUTTON} w-full`}
            >
              Open select an option
            </button>
          </div>
        </section>
      </main>

      <FormValidationOverlay open={formOpen} onClose={() => setFormOpen(false)} />
      <ConfirmLogoutDialog
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onLogout={() => setLogoutOpen(false)}
      />
      <SelectOptionOverlay
        open={selectOpen}
        onClose={() => setSelectOpen(false)}
        onSelect={() => setSelectOpen(false)}
        options={options}
      />

      <div className="pt-8">
        <SiteFooter accountLabel="My account" accountPath="/account-profile" />
      </div>
    </div>
  )
}
