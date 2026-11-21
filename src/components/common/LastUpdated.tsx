import { Calendar } from 'lucide-react'

export interface LastUpdatedProps {
  date?: string
  isoDate?: string
  className?: string
}

export function LastUpdated({
  date = 'November 2026',
  isoDate = '2026-11-21',
  className = '',
}: LastUpdatedProps) {
  return (
    <div className={`mt-8 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 ${className}`}>
      <Calendar className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
      <span>
        Last updated:{' '}
        <time dateTime={isoDate} className="font-medium text-slate-700 dark:text-slate-300">
          {date}
        </time>
      </span>
    </div>
  )
}
