import { Link } from 'react-router-dom'
import { ArrowRight, Calculator } from 'lucide-react'

export interface RelatedToolItem {
  name: string
  path: string
  description: string
  anchorText?: string
}

export interface RelatedToolsProps {
  tools: RelatedToolItem[]
  title?: string
  className?: string
}

export function RelatedTools({
  tools,
  title = 'Related HR & Payroll Calculators',
  className = '',
}: RelatedToolsProps) {
  if (!tools || tools.length === 0) return null

  return (
    <section className={`mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl dark:text-white">
          {title}
        </h2>
        <Link
          to="/hr-tools"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          View all tools
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <div
            key={tool.path}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-xs transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-primary-500/50"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-950/60 dark:text-primary-400">
                  <Calculator className="h-4 w-4" aria-hidden="true" />
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-primary-600 dark:group-hover:text-primary-400" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                {tool.name}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {tool.description}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
              <Link
                to={tool.path}
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-400 inline-flex items-center gap-1"
              >
                {tool.anchorText || `Use ${tool.name}`}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
