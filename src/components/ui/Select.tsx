import type { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: { label: string; value: string }[]
}

export function Select({ label, options, id, className = '', ...props }: SelectProps) {
  const selectId = id ?? props.name
  return (
    <div className="space-y-1.5">
      <label htmlFor={selectId} className="block text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <select
        id={selectId}
        className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-600 dark:bg-slate-800 ${className}`}
        {...props}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}
