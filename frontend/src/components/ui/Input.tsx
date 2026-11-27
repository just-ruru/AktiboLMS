import type { InputHTMLAttributes } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  type?: 'text' | 'email' | 'password'
  inputSize?: 'auth' | 'register' | 'default'
}

export function Input({
  label,
  error,
  type = 'text',
  inputSize = 'default',
  className = '',
  ...props
}: InputProps) {
  const inputClasses = [
    // height by size variant
    inputSize === 'register' ? 'h-[46px]' : inputSize === 'auth' ? 'h-[42px]' : 'h-[48px]',
    'rounded-[8px] border border-border-light border-solid bg-surface-white px-4 text-[14px] font-["Inter"] text-text-primary',
    'focus:outline-none focus:ring-2 focus:ring-border-focus',
    error ? 'border-state-danger focus:ring-state-danger' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={props.id} className="block mb-2 text-[12px] font-semibold font-['Inter'] text-text-secondary uppercase tracking-wide">
          {label}
        </label>
      )}
      <input
        type={type}
        className={inputClasses}
        aria-invalid={error ? 'true' : 'false'}
        placeholder={props.placeholder}
        {...props}
      />
      {error && (
        <p className="mt-1 text-[11px] font-['Inter'] text-state-danger">{error}</p>
      )}
    </div>
  )
}
