import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  glass?: boolean
}

export function Card({ children, className = '', glass = true }: CardProps) {
  return (
    <div className={`rounded-2xl p-6 ${glass ? 'glass' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700'} ${className}`}>
      {children}
    </div>
  )
}
