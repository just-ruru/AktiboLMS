import { HTMLAttributes, forwardRef, memo } from 'react'
import { clsx } from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const CardComponent = forwardRef<HTMLDivElement, CardProps>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden', className)}
      {...props}
    >
      {children}
    </div>
  )
})

const Card = memo(CardComponent)
Card.displayName = 'Card'

const CardHeaderComponent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('px-6 py-4 border-b border-gray-100', className)}
        {...props}
      >
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
      <div
        ref={ref}
        className={clsx('p-6', className)}
        {...props}
      >
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
      <div
        ref={ref}
        className={clsx('px-6 py-4 border-t border-gray-100 bg-gray-50', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

const CardFooter = memo(CardFooterComponent)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardBody, CardFooter }