import { cn } from '@/lib/utils'

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex animate-pulse rounded-2xl bg-back-base-hover',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
