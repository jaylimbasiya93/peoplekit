import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, Search } from 'lucide-react'
import { SeoHead } from '@/components/seo/SeoHead'
import { ALL_CALCULATORS, searchCalculators } from '@/data/calculators'
import { CATEGORIES } from '@/data/categories'

export function ToolsPage() {
  const [params] = useSearchParams()
  const initialQ = params.get('q') ?? ''
  const [query, setQuery] = useState(initialQ)
  const [category, setCategory] = useState<string>('all')

  const filtered = useMemo(() => {
    let list = searchCalculators(query)
    if (category !== 'all') list = list.filter((c) => c.category === category)
    return list
  }, [query, category])

  return (
    <>
      <SeoHead
        title="All HR & Salary Calculators"
        description="Browse 68+ free salary, tax, PF, HR, and career calculators for India."
        path="/tools"
      />
      <div className="section-shell py-10">
        <div className="glass p-6 md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">Calculator library</p>
              <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">All tools</h1>
            </div>
            <div className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 dark:border-primary-500/30 dark:bg-primary-500/10 dark:text-primary-300">
              {ALL_CALCULATORS.length} calculators ready
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
            Search by tool name or filter by the category that matches your payroll, HR, leave, hiring, or employee workflow.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search calculators..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-slate-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                aria-label="Search calculators"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              aria-label="Filter by category"
            >
              <option value="all">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <Link
              key={c.slug}
              to={`/tools/${c.category}/${c.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white/80 p-5 transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-100/40 dark:border-slate-700 dark:bg-slate-900/80 dark:hover:border-primary-500/50 dark:hover:shadow-slate-900"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-600">{c.category}</span>
                <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:text-primary-600" />
              </div>
              <h2 className="mt-3 text-lg font-semibold">{c.name}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{c.shortDescription}</p>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-900/60">
            <p className="text-lg font-semibold">No calculators match your search.</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Try a different keyword or switch back to all categories.</p>
          </div>
        )}
      </div>
    </>
  )
}
