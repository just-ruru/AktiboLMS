import type { LabelHTMLAttributes } from 'react'

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

export function Label({ children, className = '', ...props }: LabelProps) {
  return (
    <label
      className={[
        'mb-1.5 block font-display text-[12px] font-bold uppercase tracking-[0.08em] text-aktibo-muted',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </label>
  )
}
