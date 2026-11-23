import { HTMLAttributes, forwardRef, memo } from 'react'
import { clsx } from 'clsx'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'gray'
}

const BadgeComponent = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    const variantClasses = {
      primary: 'badge-primary',
      success: 'badge-success',
      warning: 'badge-warning',
      error: 'badge-error',
      info: 'badge-info',
      gray: 'badge-gray',
    }

    return (
      <span
        ref={ref}
        className={clsx('badge', variantClasses[variant], className)}
        {...props}
      >
        {children}
      </span>
    )
  }
)

const Badge = memo(BadgeComponent)
Badge.displayName = 'Badge'

export { Badge }
