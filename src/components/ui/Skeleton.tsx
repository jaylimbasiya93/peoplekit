interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200 dark:bg-slate-700 ${className}`}
      aria-hidden="true"
    />
  )
}

export function CalculatorSkeleton() {
  return (
    <div className="space-y-4" aria-label="Loading calculator">
      <Skeleton className="h-8 w-2/3" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-10 w-32" />
    </div>
  )
}
