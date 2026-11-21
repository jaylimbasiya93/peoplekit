import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, Calculator, Search } from 'lucide-react'
import { SeoHead } from '@/components/seo/SeoHead'
import { Breadcrumb } from '@/components/common/Breadcrumb'
import { ALL_CALCULATORS, searchCalculators } from '@/data/calculators'
import { CATEGORIES } from '@/data/categories'
import { BRAND } from '@/config/brand'
import { breadcrumbSchema, collectionPageSchema } from '@/lib/seo/schema'
import type { CalculatorCategory } from '@/types/calculator'

// Primary requested categories in order
const categoryOrder: { id: CalculatorCategory; title: string; desc: string }[] = [
  {
    id: 'salary',
    title: 'Salary Calculators',
    desc: 'Calculate take-home pay, annual CTC conversions, salary hike percentages, and payslip breakdowns.',
  },
  {
    id: 'pf-retirement',
    title: 'PF & Retirement Calculators',
    desc: 'Plan retirement wealth with NPS projections, statutory gratuity, EPF maturity, and pension estimates.',
  },
  {
    id: 'leave',
    title: 'Leave Calculators',
    desc: 'Track employee leave balances, pro-rata entitlements, working days, and leave encashment payouts.',
  },
  {
    id: 'analytics',
    title: 'Workforce Analytics Calculators',
    desc: 'Compute fully loaded workforce costs, cost-per-employee, HR budget planning, and team salary models.',
  },
  {
    id: 'tax',
    title: 'Tax Calculators',
    desc: 'Compare tax regimes, calculate income tax liabilities, TDS deductions, and professional taxes.',
  },
  {
    id: 'hr',
    title: 'HR & Operations Calculators',
    desc: 'Calculate notice periods, last working days, employee attrition rates, and tenure metrics.',
  },
  {
    id: 'recruitment',
    title: 'Recruitment Calculators',
    desc: 'Analyze cost per hire, offer comparison packages, recruitment ROI, and time-to-hire pipelines.',
  },
  {
    id: 'career',
    title: 'Career & Documents Tools',
    desc: 'Generate formal HR letters, negotiation templates, and career progression timelines.',
  },
]

export function HrToolsPage() {
  const [params] = useSearchParams()
  const initialQ = params.get('q') ?? ''
  const [query, setQuery] = useState(initialQ)
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const searchResults = useMemo(() => {
    let list = searchCalculators(query)
    if (activeCategory !== 'all') {
      list = list.filter((c) => c.category === activeCategory)
    }
    return list
  }, [query, activeCategory])

  const canonicalUrl = `${BRAND.domain}/hr-tools`

  // Build JSON-LD CollectionPage with ItemList of all tools
  const jsonLd = [
    collectionPageSchema({
      name: 'Free HR Tools & Calculators',
      description:
        'Browse free HR and payroll calculators: salary, PF and retirement, leave, and workforce analytics. Fast, accurate, no signup.',
      url: canonicalUrl,
      inLanguage: 'en',
      items: ALL_CALCULATORS.map((tool) => ({
        name: tool.name,
        url: `${BRAND.domain}/tools/${tool.category}/${tool.slug}`,
        description: tool.shortDescription,
      })),
    }),
    breadcrumbSchema(
      [
        { name: 'Home', url: BRAND.domain },
        { name: 'HR Tools', url: canonicalUrl },
      ],
      'en'
    ),
  ]

  return (
    <>
      <SeoHead
        title="Free HR Tools & Calculators | PeopleKit"
        description="Browse free HR and payroll calculators: salary, PF and retirement, leave, and workforce analytics. Fast, accurate, no signup."
        path="/hr-tools"
        inLanguage="en"
        locale="en_US"
        jsonLd={jsonLd}
      />

      <div className="section-shell py-8 md:py-12">
        <Breadcrumb items={[{ name: 'HR Tools' }]} />

        {/* Header & Filter Card */}
        <div className="glass p-6 md:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
                Calculator Library
              </span>
              <h1 className="mt-3 font-display text-3xl font-bold text-slate-900 md:text-5xl dark:text-white">
                Free HR Tools &amp; Calculators
              </h1>
              <p className="mt-3 max-w-3xl text-base text-slate-600 md:text-lg dark:text-slate-300">
                Browse free HR and payroll calculators across salary, PF &amp; retirement, leave management, workforce analytics, and compliance. Fast, accurate, and completely free with no signup required.
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-3.5 py-1.5 text-sm font-medium text-primary-700 dark:border-primary-500/30 dark:bg-primary-500/10 dark:text-primary-300">
                <Calculator className="h-4 w-4" />
                {ALL_CALCULATORS.length} calculators ready
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search calculators by name, keyword, or formula..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-900 outline-hidden transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                aria-label="Search calculators"
              />
            </div>
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-hidden transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              aria-label="Filter by category"
            >
              <option value="all">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* If actively searching/filtering, show flat filtered results */}
        {query.trim() || activeCategory !== 'all' ? (
          <div className="mt-10">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              Search Results ({searchResults.length})
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((tool) => (
                <Link
                  key={tool.slug}
                  to={`/tools/${tool.category}/${tool.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/80 p-5 transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/80 dark:hover:border-primary-500/50"
                >
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-600">
                      {tool.category}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                      {tool.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                      {tool.shortDescription}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-medium text-primary-600 dark:text-primary-400">
                    <span>Open calculator</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>

            {searchResults.length === 0 && (
              <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center dark:border-slate-700 dark:bg-slate-900/60">
                <p className="text-lg font-semibold text-slate-900 dark:text-white">No calculators match your search.</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Try adjusting your query or resetting the category filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    setActiveCategory('all')
                  }}
                  className="mt-4 inline-flex items-center rounded-xl bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Default Category-Grouped Layout as requested in PART 8 */
          <div className="mt-12 space-y-16">
            {categoryOrder.map((section) => {
              const tools = ALL_CALCULATORS.filter((c) => c.category === section.id)
              if (tools.length === 0) return null

              return (
                <section key={section.id} id={section.id} className="scroll-mt-20">
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl dark:text-white">
                        {section.title}
                      </h2>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{section.desc}</p>
                    </div>
                    <Link
                      to={`/categories/${section.id}`}
                      className="text-xs font-semibold uppercase tracking-wider text-primary-600 hover:underline dark:text-primary-400 inline-flex items-center gap-1"
                    >
                      View category ({tools.length}) <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {tools.map((tool) => (
                      <div
                        key={tool.slug}
                        className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-xs transition hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-primary-500/50"
                      >
                        <div>
                          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                            <Link
                              to={`/tools/${tool.category}/${tool.slug}`}
                              className="hover:text-primary-600 dark:hover:text-primary-400"
                            >
                              {tool.name}
                            </Link>
                          </h3>
                          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                            {tool.shortDescription}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                          <Link
                            to={`/tools/${tool.category}/${tool.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 group-hover:text-primary-700 dark:text-primary-400"
                          >
                            Calculate now <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
