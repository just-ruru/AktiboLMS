import type { LabelHTMLAttributes } from 'react'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

export function Label({ children, className = '', ...props }: LabelProps) {
  return (
    <label
      className={[
        'block mb-2 text-[12px] font-semibold font-["Inter"] text-text-secondary uppercase tracking-wide',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </label>
  )
}
