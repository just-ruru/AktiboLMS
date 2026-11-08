import { InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

/* ============================================================================
   STUDY NOTES — components/ui/Input.tsx  (design-system input)
   ----------------------------------------------------------------------------
   WHAT: Labeled text input with optional leading icon, inline error message,
         and helper text. Used in Login, Register, and course-builder forms.
   HOW IT WORKS:
     1. forwardRef so parent can focus/validate the underlying <input>.
     2. Generates an id from the label (or explicit id prop) for label/input
        association via htmlFor.
     3. Accessibility: aria-invalid="{error ? 'true' : 'false'}" and
        aria-describedby pointing at the error or helper-text element.
     4. Error styling: red border + focus ring when error is set.
   WHERE THE API CONTRACT LIVES: none here (pure UI).
   WHAT TO CHANGE FOR THE NEW UI:
     • Restyle to new tokens: --input-bg / --input-border / --input-focus-ring
       instead of gray-500 / primary-500 hard-coded classes.
     • Keep aria-invalid / aria-describedby — those are the a11y contract and
       should survive any visual redesign.
   ============================================================================ */

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, icon, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\\s+/g, '-')

    return (
      <div className="input-wrapper">
        {label && (
          <label htmlFor={inputId} className="label">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-fg-tertiary">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={clsx('input', icon && 'pl-10', error && 'input-error', className)}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error
                ? `${inputId}-error`
                : hint
                  ? `${inputId}-hint`
                  : undefined
            }
            {...props}
          />
        </div>
        {error && (
          <p id={`${inputId}-error`} className="input-error-text" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="input-hint">
            {hint}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'