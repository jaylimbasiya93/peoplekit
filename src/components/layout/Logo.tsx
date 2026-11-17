import { Link } from 'react-router-dom'
import { BRAND } from '@/config/brand'

export function Logo() {
  return (
    <Link to="/" className="group inline-flex items-center gap-3" aria-label={`${BRAND.name} home`}>
      <svg className="h-10 w-10 shrink-0" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="peoplekit-mark" x1="10" y1="12" x2="54" y2="52" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4F46E5" />
            <stop offset="0.5" stopColor="#0EA5E9" />
            <stop offset="1" stopColor="#14B8A6" />
          </linearGradient>
        </defs>
        <rect x="8" y="8" width="48" height="48" rx="14" fill="url(#peoplekit-mark)" />
        <circle cx="23" cy="27" r="5" fill="white" opacity="0.96" />
        <circle cx="40" cy="27" r="5" fill="white" opacity="0.96" />
        <circle cx="32" cy="39" r="6" fill="white" opacity="0.96" />
        <path d="M19 46C21.5 41.5 25.5 39 32 39C38.5 39 42.5 41.5 45 46" stroke="white" strokeWidth="4" strokeLinecap="round" />
        <path d="M20 20L32 32L44 20" stroke="#E2E8F0" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] font-bold tracking-[-0.05em] text-slate-900 dark:text-white">
          {BRAND.name}
        </span>
        <span className="mt-1 text-[0.62rem] font-medium uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
          HR & work tools
        </span>
      </div>
    </Link>
  )
}
