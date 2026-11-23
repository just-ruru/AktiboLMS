import { useId } from 'react'
import type { SelectHTMLAttributes } from 'react'

export type SelectSize = 'sm' | 'md' | 'lg'

interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'onChange'> {
  label?: string
  error?: string
  hint?: string
  inputSize?: SelectSize
  containerClassName?: string
  onChange?: (value: string) => void
}

const SIZES: Record<SelectSize, string> = {
  sm: 'h-9 px-3 text-[13px]',
  md: 'h-11 px-4 text-[14px]',
  lg: 'h-12 px-4 text-[15px]',
}

export function SelectField({
  label,
  error,
  hint,
  inputSize = 'md',
  className = '',
  containerClassName = '',
  id,
  onChange,
  ...props
}: SelectFieldProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const describedBy = error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined

  return (
    <div className={`w-full ${containerClassName}`}>
      {label ? (
        <label
          htmlFor={selectId}
          className="mb-1.5 block font-display text-[12px] font-bold uppercase tracking-[0.08em] text-aktibo-muted"
        >
          {label}
        </label>
      ) : null}
      <select
        id={selectId}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        onChange={(e) => onChange?.(e.target.value)}
        className={[
          'w-full rounded-field border bg-aktibo-surface font-sans text-aktibo-ink',
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
        <p id={`${selectId}-error`} className="mt-1.5 text-[12px] font-medium text-aktibo-danger-fg">
          {error}
        </p>
      ) : hint ? (
        <p id={`${selectId}-hint`} className="mt-1.5 text-[12px] text-aktibo-muted">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
