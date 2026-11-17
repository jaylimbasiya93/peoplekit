import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BriefcaseBusiness, Building2, CheckCircle2, Search, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { SeoHead } from '@/components/seo/SeoHead'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { BRAND } from '@/config/brand'
import { CATEGORIES } from '@/data/categories'
import { ALL_CALCULATORS, getCalculatorBySlug, searchCalculators } from '@/data/calculators'
import { useUserStore } from '@/store/userStore'
import { organizationSchema, websiteSchema } from '@/lib/seo/schema'

const popularToolSlugs = [
  'in-hand-salary-calculator',
  'income-tax-calculator',
  'gratuity-calculator',
  'leave-balance-calculator',
  'notice-period-calculator',
  'experience-calculator',
]

const faqs = [
  { question: 'What makes PeopleKit different from a generic calculator site?', answer: 'PeopleKit is designed around real HR workflows, employee needs, and documentation tasks, with a cleaner SaaS-style UX and practical daily tools.' },
  { question: 'Do the calculators store my data?', answer: 'Most calculations run fully in the browser, so salary and leave details stay local unless you intentionally save them in the browser.' },
  { question: 'Are these tools suitable for Indian HR teams?', answer: 'Yes. Many tools are India-aware and clearly labeled with assumptions, while the architecture is also ready for future jurisdiction-specific variants.' },
]

export function HomePage() {
  const { recent, favorites } = useUserStore()
  const [search, setSearch] = useState('')
  const recentCalcs = recent.map((s) => getCalculatorBySlug(s)).filter(Boolean)
  const favCalcs = favorites.map((s) => getCalculatorBySlug(s)).filter(Boolean)
  const searchResults = useMemo(() => (search.trim() ? searchCalculators(search).slice(0, 6) : []), [search])

  return (
    <>
      <SeoHead
        title={`${BRAND.name} — ${BRAND.tagline}`}
        description={BRAND.description}
        path="/"
        jsonLd={[organizationSchema(), websiteSchema()]}
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.12),transparent_32%),radial-gradient(circle_at_top_right,_rgba(20,184,166,0.12),transparent_28%)]" />
        <div className="section-shell relative py-14 md:py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary-700 dark:border-primary-500/30 dark:bg-primary-500/10 dark:text-primary-300">
              <Sparkles className="h-3.5 w-3.5" />
              Free HR & employee toolkit
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-[-0.05em] text-slate-900 md:text-6xl dark:text-white">
              Everything You Need for HR and Work, in One Place.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-600 md:text-xl dark:text-slate-300">
              Free HR calculators, employee productivity tools, document generators, and workplace resources designed to make work easier.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white/75 p-3 shadow-lg shadow-slate-200/60 backdrop-blur dark:border-slate-700 dark:bg-slate-900/75 dark:shadow-none">
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <label className="relative block flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search 100+ free HR and employee tools..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-3 text-sm outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    aria-label="Search tools"
                  />
                </label>
                <Link to={search.trim() ? `/tools?q=${encodeURIComponent(search.trim())}` : '/tools'}>
                  <Button type="button" size="lg">Search</Button>
                </Link>
              </div>
              {searchResults.length > 0 && (
                <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                  {searchResults.map((tool) => (
                    <Link key={tool.slug} to={`/tools/${tool.category}/${tool.slug}`} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm hover:border-primary-300 dark:border-slate-700 dark:bg-slate-800">
                      {tool.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/tools">
                <Button size="lg">Explore calculators</Button>
              </Link>
              <Link to="/categories">
                <Button variant="outline" size="lg">Browse categories</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-shell py-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: BriefcaseBusiness, title: 'HR teams', desc: 'Payroll, leave, hiring, and workforce tools for fast-moving teams.' },
            { icon: Users, title: 'Employees', desc: 'Track attendance, time off, and daily work planning with clarity.' },
            { icon: ShieldCheck, title: 'Privacy-first', desc: 'Most calculations run locally with no unnecessary data collection.' },
          ].map((item) => (
            <Card key={item.title} className="text-left">
              <item.icon className="h-8 w-8 text-primary-600" />
              <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {(recentCalcs.length > 0 || favCalcs.length > 0) && (
        <section className="section-shell py-12">
          {favCalcs.length > 0 && (
            <div className="mb-10">
              <h2 className="font-display text-2xl font-bold">Favorites</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {favCalcs.map((c) => c && (
                  <Link key={c.slug} to={`/tools/${c.category}/${c.slug}`} className="glass p-4 hover:border-primary-300">
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
          {recentCalcs.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-bold">Recently used</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {recentCalcs.map((c) => c && (
                  <Link key={c.slug} to={`/tools/${c.category}/${c.slug}`} className="glass p-4 hover:border-primary-300">
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      <section className="section-shell py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold">Browse by category</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">Practical HR and employee workflows across payroll, compliance, productivity, and templates.</p>
          </div>
          <Link to="/categories" className="hidden text-sm font-semibold text-primary-600 md:inline-flex items-center gap-2">View all categories <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} to={`/categories/${cat.slug}`} className="group glass p-6 transition hover:shadow-glow hover:border-primary-300">
              <h3 className="font-semibold group-hover:text-primary-600">{cat.name}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{cat.description}</p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-primary-600">View tools <ArrowRight className="ml-1 h-4 w-4" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-shell py-12">
        <h2 className="font-display text-3xl font-bold">Popular calculators</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {popularToolSlugs.map((slug) => {
            const tool = getCalculatorBySlug(slug)
            if (!tool) return null
            return (
              <Link key={tool.slug} to={`/tools/${tool.category}/${tool.slug}`} className="glass p-5 hover:border-primary-300">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600">{tool.category}</p>
                  <Building2 className="h-4 w-4 text-slate-400" />
                </div>
                <h3 className="mt-3 font-semibold">{tool.name}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{tool.shortDescription}</p>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="section-shell py-12">
        <h2 className="font-display text-3xl font-bold">Document generators</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {['Offer Letter Generator', 'Appointment Letter Generator', 'Experience Letter Generator', 'HR Policy Document Generator'].map((title) => (
            <Card key={title} className="flex h-full flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600">Templates</p>
                <h3 className="mt-3 text-lg font-semibold">{title}</h3>
              </div>
              <div className="mt-5 flex items-center gap-2 text-sm font-medium text-primary-600">
                <CheckCircle2 className="h-4 w-4" />
                Editable & print-friendly
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="section-shell py-12">
        <h2 className="font-display text-3xl font-bold">Recently added tools</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {ALL_CALCULATORS.slice(0, 8).map((tool) => (
            <Link key={tool.slug} to={`/tools/${tool.category}/${tool.slug}`} className="glass p-4 hover:border-primary-300">
              <h3 className="font-medium">{tool.name}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{tool.shortDescription}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-shell py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="glass p-8">
            <h2 className="font-display text-3xl font-bold">Why PeopleKit</h2>
            <ul className="mt-6 space-y-4">
              {[
                'Designed for HR professionals, employees, and managers who need quick answers without friction.',
                'Built with practical use cases like leave plans, salary estimates, notice periods, and document drafting.',
                'Fast, lightweight, and local-first so work data stays under user control.',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass p-8">
            <h2 className="font-display text-3xl font-bold">Frequently asked questions</h2>
            <div className="mt-6 space-y-4">
              {faqs.map((item) => (
                <div key={item.question} className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60">
                  <h3 className="font-semibold">{item.question}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
