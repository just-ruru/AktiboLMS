<<<<<<< HEAD
import { HTMLAttributes, forwardRef, memo } from 'react'
import { clsx } from 'clsx'

/* ============================================================================
   STUDY NOTES — components/ui/Card.tsx  (design-system card)
   ----------------------------------------------------------------------------
   WHAT: Card + CardHeader + CardBody + CardFooter, all forwardRef + memoized.
         The main content container used on dashboards, course pages, and auth
         forms.
   HOW IT WORKS:
     1. Each sub-component forwards a ref and merges className via clsx.
     2. Default: bg-white, rounded-xl, shadow-sm, 1px border gray-100.
     3. CardBody is plain padding; CardHeader/CardFooter add bordered sections.
   WHERE THE API CONTRACT LIVES: none here (pure UI).
   WHAT TO CHANGE FOR THE NEW UI:
     • Restyle surface colors: bg-white → new --bg-surface token (dark theme),
       border-gray-100 → --border, shadow-sm → new shadow scale.
     • Keep all four sub-components memoized (good practice already in place).
     • Add variants if the new design needs them (e.g. 'elevated', 'outlined',
       'accent-border' — see the worktree index.css card system for the token
       naming pattern).
   ============================================================================ */

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'outlined'
  accent?: 'brand' | 'success' | 'warning' | 'error' | 'info'
  interactive?: boolean
}

const CardComponent = forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, variant = 'default', accent, interactive, ...props }, ref) => {
    const variantClasses = {
      default: 'card',
      bordered: 'card card-bordered',
      elevated: 'card card-elevated',
      outlined: 'card card-outlined',
    }

    const accentClasses = {
      brand: 'card-accent-border',
      success: 'card-accent-border-success',
      warning: 'card-accent-border-warning',
      error: 'card-accent-border-error',
      info: 'card-accent-border-info',
    }

    const interactiveClass = interactive ? 'card-interactive' : ''

    return (
      <div
        ref={ref}
        className={clsx(variantClasses[variant], accent && accentClasses[accent], interactiveClass, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

const Card = memo(CardComponent)
Card.displayName = 'Card'

const CardHeaderComponent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx('card-header', className)} {...props}>
        {children}
      </div>
    )
  }
)

const CardHeader = memo(CardHeaderComponent)
CardHeader.displayName = 'CardHeader'

const CardBodyComponent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx('card-body', className)} {...props}>
        {children}
      </div>
    )
  }
)

const CardBody = memo(CardBodyComponent)
CardBody.displayName = 'CardBody'

const CardFooterComponent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx('card-footer', className)} {...props}>
        {children}
      </div>
    )
  }
)

const CardFooter = memo(CardFooterComponent)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardBody, CardFooter }
=======
import type { HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div
      className={[
        'bg-white rounded-[28px] p-8 shadow-xl border border-black/20',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}
>>>>>>> frontend
