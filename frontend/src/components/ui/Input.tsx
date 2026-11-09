import type { InputHTMLAttributes } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  type?: 'text' | 'email' | 'password'
  inputSize?: 'auth' | 'register'
}

export function Input({
  label,
  error,
  type = 'text',
  inputSize = 'auth',
  className = '',
  ...props
}: InputProps) {
  const inputClasses = [
    inputSize === 'register'
      ? 'w-full h-[46px]'
      : 'w-full h-[42px]',
    'rounded-[11px] border border-black bg-white px-4 text-[16px] font-["Lexend Exa"]',
    'focus:outline-none focus:ring-2 focus:ring-aktif-gold',
    error ? 'border-red-500 focus:ring-red-500' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={props.id}
          className="block mb-2 text-[24px] font-['Lexend Exa'] text-black"
        >
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
        <p className="mt-1 text-[11px] font-['Lexend Exa'] text-red-500">{error}</p>
      )}
    </div>
  )
}
