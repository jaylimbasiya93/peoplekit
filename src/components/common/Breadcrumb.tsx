import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { BRAND } from '@/config/brand'

export interface BreadcrumbItem {
  name: string
  path?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const fullItems: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    ...items,
  ]

  return (
    <nav aria-label="Breadcrumb" className={`mb-6 flex flex-wrap items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 list-none p-0 m-0">
        {fullItems.map((item, index) => {
          const isLast = index === fullItems.length - 1

          return (
            <li key={item.name + index} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-slate-400 shrink-0" aria-hidden="true" />}
              {index === 0 && <Home className="h-3.5 w-3.5 text-slate-400 mr-0.5 shrink-0" aria-hidden="true" />}
              {isLast || !item.path ? (
                <span className="font-medium text-slate-900 dark:text-slate-100" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="transition hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const fullItems = [{ name: 'Home', path: '/' }, ...items]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: fullItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path ? `${BRAND.domain}${item.path === '/' ? '' : item.path}` : `${BRAND.domain}/`,
    })),
  }
}
