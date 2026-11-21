import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock,
  Coins,
  FileSpreadsheet,
  Lock,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { SeoHead } from '@/components/seo/SeoHead'
import { Button } from '@/components/ui/Button'
import { CATEGORIES } from '@/data/categories'
import { searchCalculators } from '@/data/calculators'
import { organizationSchema, websiteSchema } from '@/lib/seo/schema'

const featuredCalculators = [
  {
    name: 'NPS Calculator',
    path: '/tools/pf-retirement/nps-calculator',
    description: 'Estimate your National Pension System corpus, monthly pension annuity, and 60% tax-free lump sum at retirement.',
    category: 'PF & Retirement',
    icon: Coins,
  },
  {
    name: 'Gratuity Calculator',
    path: '/tools/pf-retirement/gratuity-calculator',
    description: 'Calculate statutory end-of-service retirement gratuity payouts using the standard 15/26 formula and eligibility rules.',
    category: 'PF & Retirement',
    icon: Building2,
  },
  {
    name: 'Salary Increment Calculator',
    path: '/tools/salary/salary-increment-calculator',
    description: 'Calculate salary hike percentage, revised monthly pay, and new annual CTC instantly for appraisals or job switches.',
    category: 'Salary',
    icon: TrendingUp,
  },
  {
    name: 'Leave Balance Calculator',
    path: '/tools/leave/leave-balance-calculator',
    description: 'Track annual leave accruals, calculate pro-rata leave for joiners and leavers, and estimate leave encashment.',
    category: 'Leave',
    icon: Clock,
  },
  {
    name: 'Workforce Cost Calculator',
    path: '/tools/analytics/workforce-cost-calculator',
    description: 'Compute fully loaded employee costs including salary, statutory contributions, benefits, insurance, and overheads.',
    category: 'Analytics',
    icon: FileSpreadsheet,
  },
]

const homeFaqs = [
  {
    question: 'Are PeopleKit HR and payroll calculators completely free?',
    answer:
      'Yes, all calculators and document generators on PeopleKit are 100% free with no registration, no subscription paywalls, and no hidden fees.',
  },
  {
    question: 'Does PeopleKit store employee salaries or confidential HR data?',
    answer:
      'No. Calculations run locally inside your web browser. We do not transmit, collect, or store your salary figures, leave records, or employee details on any remote server.',
  },
  {
    question: 'Do calculators support country-specific statutory rules?',
    answer:
      'Yes. Specific calculators such as the NPS Calculator and Gratuity Calculator are built in strict accordance with Indian statutory rules (PFRDA guidelines and the Payment of Gratuity Act, 1972). Other calculators (like salary increment, leave balance, and workforce cost) provide universal mathematical logic adaptable to any organization globally.',
  },
  {
    question: 'Can I export or download calculation results?',
    answer:
      'Yes, you can copy results to your clipboard, print payslip estimates, and generate PDF versions of HR templates directly from the respective tool pages.',
  },
]

export function HomePage() {
  const [search, setSearch] = useState('')
  const searchResults = useMemo(() => (search.trim() ? searchCalculators(search).slice(0, 6) : []), [search])

  return (
    <>
      <SeoHead
        title="PeopleKit – Free HR & Payroll Calculators"
        description="Free HR and payroll calculators: NPS, gratuity, salary increment, leave balance and workforce cost. Fast, accurate, no signup."
        path="/"
        inLanguage="en"
        locale="en_US"
        jsonLd={[organizationSchema(), websiteSchema('en')]}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.12),transparent_32%),radial-gradient(circle_at_top_right,_rgba(20,184,166,0.12),transparent_28%)]" />
        <div className="section-shell relative py-14 md:py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-700 dark:border-primary-500/30 dark:bg-primary-500/10 dark:text-primary-300">
              <Sparkles className="h-3.5 w-3.5" />
              100% Free Online HR Toolkit
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-[-0.05em] text-slate-900 md:text-6xl dark:text-white">
              Free HR &amp; Payroll Calculators for Modern Teams
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-slate-600 md:text-xl dark:text-slate-300">
              Fast, accurate, and completely free online calculators for payroll, retirement planning, leave tracking, and workforce cost analysis. Instant results with no signup.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white/75 p-3 shadow-lg shadow-slate-200/60 backdrop-blur dark:border-slate-700 dark:bg-slate-900/75 dark:shadow-none">
              <div className="flex flex-col gap-3 md:flex-row md:items-center">
                <label className="relative block flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search 68+ free HR and payroll calculators..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-3 text-sm outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    aria-label="Search tools"
                  />
                </label>
                <Link to={search.trim() ? `/hr-tools?q=${encodeURIComponent(search.trim())}` : '/hr-tools'}>
                  <Button type="button" size="lg">Search Calculators</Button>
                </Link>
              </div>
              {searchResults.length > 0 && (
                <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
                  {searchResults.map((tool) => (
                    <Link
                      key={tool.slug}
                      to={`/tools/${tool.category}/${tool.slug}`}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm hover:border-primary-300 dark:border-slate-700 dark:bg-slate-800 block"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/hr-tools">
                <Button size="lg">Browse All HR Tools</Button>
              </Link>
              <Link to="/categories">
                <Button variant="outline" size="lg">Explore Categories</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Primary Calculators Section */}
      <section className="section-shell py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-600">Core Tools</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white">
              Featured Calculators
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-2xl">
              Accurate, instantaneous calculators designed specifically for compensation planning, statutory entitlements, and workforce management.
            </p>
          </div>
          <Link to="/hr-tools" className="text-sm font-semibold text-primary-600 hover:underline inline-flex items-center gap-1">
            View all 68+ calculators <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCalculators.map((calc) => (
            <div
              key={calc.path}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-xs transition hover:-translate-y-1 hover:border-primary-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-primary-500/50"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-600 dark:text-primary-400">
                    {calc.category}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-950/60 dark:text-primary-400">
                    <calc.icon className="h-4 w-4" />
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                  <Link to={calc.path} className="hover:text-primary-600 dark:hover:text-primary-400">
                    {calc.name}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {calc.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Link
                  to={calc.path}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 group-hover:text-primary-700 dark:text-primary-400"
                >
                  Open {calc.name} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Use PeopleKit Section */}
      <section className="section-shell py-12">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 md:p-12 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-600">Built For Productivity</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white">
              Why Use PeopleKit
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
              Managing payroll, leave balances, and compensation shouldn&apos;t require bulky, expensive enterprise software for everyday quick decisions.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 dark:border-slate-800 dark:bg-slate-900/90">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                <Coins className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">100% Free, No Signup</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Zero paywalls or required registrations. Use any calculator immediately whenever you need answers.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 dark:border-slate-800 dark:bg-slate-900/90">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-600 dark:bg-teal-950 dark:text-teal-400">
                <Lock className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">Private &amp; Client-Side</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Calculations execute in your browser. Confidential compensation data never touches our servers.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 dark:border-slate-800 dark:bg-slate-900/90">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">Statutory Accuracy</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Region-specific calculators (like NPS and Gratuity) follow official Indian rules (PFRDA &amp; Payment of Gratuity Act).
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-5 dark:border-slate-800 dark:bg-slate-900/90">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                <BriefcaseBusiness className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">Built for HR &amp; Finance</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Designed for founders, HR specialists, and finance leads with clear formulas and worked examples.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About PeopleKit Section */}
      <section className="section-shell py-12">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-600">Our Mission</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-slate-900 dark:text-white">
              About PeopleKit
            </h2>
            <div className="mt-4 space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                PeopleKit is an open, accessible suite of workplace calculators and tools created to empower HR generalists, payroll specialists, managers, and salaried employees.
              </p>
              <p>
                Whether you need to compute take-home pay, calculate a salary hike percentage, project retirement savings in the National Pension System, estimate end-of-service gratuity under Indian law, or model full workforce costs for an executive budget meeting, PeopleKit delivers clear mathematical models without friction.
              </p>
              <p>
                Every calculator provides transparent formulas, step-by-step worked examples, and verified regulatory guidelines so you can make payroll and people decisions with confidence.
              </p>
            </div>
            <div className="mt-6 flex gap-4">
              <Link to="/about">
                <Button variant="outline">Learn More About Us</Button>
              </Link>
              <Link to="/hr-tools">
                <Button>Explore All Tools</Button>
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">Toolbox Highlights</h3>
            <ul className="mt-6 space-y-4">
              {[
                { title: 'Salary & Compensation', desc: 'In-hand salary, CTC breakdowns, percentage hikes, and hourly wage conversions.' },
                { title: 'PF & Retirement Planning', desc: 'NPS projections, gratuity entitlements, EPF compounding, and pension modeling.' },
                { title: 'Leave & Attendance Tracking', desc: 'Annual leave balance accounting, pro-rata calculations, and encashment estimates.' },
                { title: 'Workforce Cost Analytics', desc: 'Loaded employee cost multipliers, headcount planning, and HR budget modeling.' },
              ].map((item) => (
                <li key={item.title} className="flex gap-3 text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white">{item.title}:</strong> {item.desc}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Categories Browse Section */}
      <section className="section-shell py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">Browse By Category</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Find specialized calculators across every domain of people operations.
            </p>
          </div>
          <Link to="/categories" className="hidden text-sm font-semibold text-primary-600 md:inline-flex items-center gap-1">
            All categories <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/categories/${cat.slug}`}
              className="group rounded-2xl glass p-6 transition hover:shadow-md hover:border-primary-300 dark:hover:border-primary-500/40"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                {cat.name}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{cat.description}</p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400">
                View tools <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="section-shell py-12">
        <div className="rounded-3xl border border-slate-200 bg-white/70 p-8 md:p-12 dark:border-slate-800 dark:bg-slate-900/60">
          <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {homeFaqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-800/40"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
