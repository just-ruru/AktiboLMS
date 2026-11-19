import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'

export type InputSize = 'sm' | 'md' | 'lg' | 'auth' | 'register'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  hint?: string
  inputSize?: InputSize
  containerClassName?: string
}

const SIZES: Record<InputSize, string> = {
  sm: 'h-9 px-3 text-[13px]',
  md: 'h-11 px-4 text-[14px]',
  lg: 'h-12 px-4 text-[15px]',
  auth: 'h-12 px-4 text-[16px] rounded-[11px] border-black',
  register: 'h-12 px-4 text-[16px] rounded-[11px] border-black',
}

export function Input({
  label,
  error,
  hint,
  inputSize = 'md',
  className = '',
  containerClassName = '',
  id,
  ...props
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined

  return (
    <div className={`w-full ${containerClassName}`}>
      {label ? (
        <label
          htmlFor={inputId}
          className="mb-1.5 block font-display text-[12px] font-bold uppercase tracking-[0.08em] text-aktibo-muted"
        >
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        className={[
          'w-full rounded-field border bg-aktibo-surface font-sans text-aktibo-ink',
          'placeholder:text-aktibo-muted/70',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-aktibo-gold focus:ring-offset-1',
          error
            ? 'border-aktibo-danger-fg focus:ring-aktibo-danger-fg'
            : 'border-aktibo-border hover:border-aktibo-border-strong focus:border-aktibo-gold',
          SIZES[inputSize],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="mt-1.5 text-[12px] font-medium text-aktibo-danger-fg">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="mt-1.5 text-[12px] text-aktibo-muted">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
