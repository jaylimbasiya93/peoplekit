import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Heart, Star } from 'lucide-react'
import { getCalculatorBySlug, getRelatedCalculators } from '@/data/calculators'
import { getCategoryById } from '@/data/categories'
import { getBlogPost } from '@/data/blog'
import { CalculatorForm } from './CalculatorForm'
import { SeoHead } from '@/components/seo/SeoHead'
import { Card } from '@/components/ui/Card'
import { AdSlot } from '@/components/ads/AdSlot'
import { BRAND } from '@/config/brand'
import {
  breadcrumbSchema,
  faqSchema,
  organizationSchema,
  webApplicationSchema,
  websiteSchema,
} from '@/lib/seo/schema'
import { useUserStore } from '@/store/userStore'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { Breadcrumb } from '@/components/common/Breadcrumb'
import { FaqAccordion } from '@/components/common/FaqAccordion'
import { LastUpdated } from '@/components/common/LastUpdated'

// Custom rich content components for primary calculators
import { NpsContent, npsFaqs } from './content/NpsContent'
import { SalaryIncrementContent, salaryIncrementFaqs } from './content/SalaryIncrementContent'
import { LeaveBalanceContent, leaveBalanceFaqs } from './content/LeaveBalanceContent'
import { GratuityContent, gratuityFaqs } from './content/GratuityContent'
import { WorkforceCostContent, workforceCostFaqs } from './content/WorkforceCostContent'

export function ToolPage() {
  const { category, slug } = useParams<{ category: string; slug: string }>()
  const calc = slug ? getCalculatorBySlug(slug) : undefined
  const { favorites, toggleFavorite, trackRecent } = useUserStore()

  useEffect(() => {
    if (slug) trackRecent(slug)
  }, [slug, trackRecent])

  if (!calc || calc.category !== category) {
    return <NotFoundPage />
  }

  const cat = getCategoryById(calc.category)
  const path = `/tools/${calc.category}/${calc.slug}`
  const url = `${BRAND.domain}${path}`
  const related = getRelatedCalculators(calc.slug)
  const isFavorite = favorites.includes(calc.slug)

  // Configure custom page metadata and content based on slug
  let pageTitle = calc.name
  let metaDescription = calc.shortDescription
  let inLanguage: 'en' | 'en-IN' = 'en'
  let locale = 'en_US'
  let activeFaqs = calc.faqs
  let isCustomPage = false
  let customContent: React.ReactNode = null

  if (calc.slug === 'nps-calculator') {
    isCustomPage = true
    pageTitle = 'NPS Calculator India: Pension & Lump Sum | PeopleKit'
    metaDescription =
      'Free NPS calculator for India. Estimate your National Pension System corpus, monthly pension and lump sum at retirement. Instant results, no signup.'
    inLanguage = 'en-IN'
    locale = 'en_IN'
    activeFaqs = npsFaqs
    customContent = (
      <NpsContent>
        <Card>
          <CalculatorForm calculator={calc} />
        </Card>
      </NpsContent>
    )
  } else if (calc.slug === 'salary-increment-calculator') {
    isCustomPage = true
    pageTitle = 'Salary Increment & Hike Calculator | PeopleKit'
    metaDescription =
      'Calculate salary hike percentage and your new CTC instantly. Free salary increment calculator with monthly and annual breakdown. No signup.'
    inLanguage = 'en'
    locale = 'en_US'
    activeFaqs = salaryIncrementFaqs
    customContent = (
      <SalaryIncrementContent>
        <Card>
          <CalculatorForm calculator={calc} />
        </Card>
      </SalaryIncrementContent>
    )
  } else if (calc.slug === 'leave-balance-calculator') {
    isCustomPage = true
    pageTitle = 'Leave Balance Calculator – Annual & Pro-Rata | PeopleKit'
    metaDescription =
      'Calculate employee leave balance, annual leave and pro-rata leave for joiners and leavers. Free leave calculator with carry-forward and encashment.'
    inLanguage = 'en'
    locale = 'en_US'
    activeFaqs = leaveBalanceFaqs
    customContent = (
      <LeaveBalanceContent>
        <Card>
          <CalculatorForm calculator={calc} />
        </Card>
      </LeaveBalanceContent>
    )
  } else if (calc.slug === 'gratuity-calculator') {
    isCustomPage = true
    pageTitle = 'Gratuity Calculator India: Private Employees | PeopleKit'
    metaDescription =
      'Free gratuity calculator for private and government employees in India. Calculate gratuity using the 15/26 formula, with eligibility and tax rules.'
    inLanguage = 'en-IN'
    locale = 'en_IN'
    activeFaqs = gratuityFaqs
    customContent = (
      <GratuityContent>
        <Card>
          <CalculatorForm calculator={calc} />
        </Card>
      </GratuityContent>
    )
  } else if (calc.slug === 'workforce-cost-calculator') {
    isCustomPage = true
    pageTitle = 'Workforce Cost Calculator: Total Employee Cost | PeopleKit'
    metaDescription =
      'Calculate total workforce cost including salary, benefits, insurance and overheads. Free workforce management cost calculator for HR and finance.'
    inLanguage = 'en'
    locale = 'en_US'
    activeFaqs = workforceCostFaqs
    customContent = (
      <WorkforceCostContent>
        <Card>
          <CalculatorForm calculator={calc} />
        </Card>
      </WorkforceCostContent>
    )
  }

  const jsonLd = [
    organizationSchema(),
    websiteSchema(inLanguage),
    breadcrumbSchema(
      [
        { name: 'Home', url: BRAND.domain },
        { name: 'HR Tools', url: `${BRAND.domain}/hr-tools` },
        { name: cat?.name ?? 'Category', url: `${BRAND.domain}/categories/${calc.category}` },
        { name: pageTitle.split('|')[0].trim(), url },
      ],
      inLanguage
    ),
    webApplicationSchema({
      name: pageTitle.split('|')[0].trim(),
      description: metaDescription,
      url,
      inLanguage,
      category: 'FinanceApplication',
    }),
    faqSchema(activeFaqs, inLanguage),
  ]

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={metaDescription}
        path={path}
        jsonLd={jsonLd}
        locale={locale}
        inLanguage={inLanguage}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        {isCustomPage ? (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">{customContent}</div>
            <aside className="space-y-6 pt-12 lg:pt-16">
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => toggleFavorite(calc.slug)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm border font-medium transition ${
                    isFavorite
                      ? 'border-rose-500 bg-rose-50 text-rose-600 dark:border-rose-500/40 dark:bg-rose-950/20 dark:text-rose-400'
                      : 'border-slate-300 hover:border-slate-400 dark:border-slate-700'
                  }`}
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Saved in favorites' : 'Add to favorites'}
                </button>
              </div>

              <AdSlot placement="sidebar" />

              <Card glass>
                <h3 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                  <Star className="h-4 w-4 text-amber-500" />
                  Related {cat?.name || 'Calculators'}
                </h3>
                <ul className="mt-3 space-y-2 list-none p-0">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        to={`/tools/${r.category}/${r.slug}`}
                        className="text-sm text-primary-600 hover:underline dark:text-primary-400 block py-1"
                      >
                        {r.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>

              {calc.relatedBlogSlugs.length > 0 && (
                <Card glass>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Related Guides</h3>
                  <ul className="mt-3 space-y-2 list-none p-0">
                    {calc.relatedBlogSlugs.map((bs) => {
                      const post = getBlogPost(bs)
                      if (!post) return null
                      return (
                        <li key={bs}>
                          <Link to={`/blog/${bs}`} className="text-sm hover:text-primary-600 block py-1">
                            {post.title}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </Card>
              )}
            </aside>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <Breadcrumb
                items={[
                  { name: 'HR Tools', path: '/hr-tools' },
                  { name: cat?.name ?? 'Category', path: `/categories/${calc.category}` },
                  { name: calc.name },
                ]}
              />

              <header className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                    {calc.name}
                  </h1>
                  <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">{calc.shortDescription}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleFavorite(calc.slug)}
                  className={`rounded-full p-3 border ${
                    isFavorite ? 'border-rose-500 text-rose-500' : 'border-slate-300'
                  }`}
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </header>

              <Card>
                <CalculatorForm calculator={calc} />
              </Card>

              <AdSlot placement="inContent" />

              <article className="prose prose-slate dark:prose-invert max-w-none">
                <section>
                  <h2 className="font-display text-2xl font-semibold">Introduction</h2>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">{calc.longDescription}</p>
                </section>

                <section className="mt-8">
                  <h2 className="font-display text-2xl font-semibold">Formula</h2>
                  <p className="mt-2 font-mono text-sm rounded-lg bg-slate-100 dark:bg-slate-800 p-4">
                    {calc.formula}
                  </p>
                  <p className="mt-2 text-slate-600 dark:text-slate-400">{calc.formulaExplanation}</p>
                </section>

                {calc.examples.length > 0 && (
                  <section className="mt-8">
                    <h2 className="font-display text-2xl font-semibold">Example</h2>
                    {calc.examples.map((ex) => (
                      <div key={ex.title} className="mt-3 rounded-xl border p-4">
                        <h3 className="font-medium">{ex.title}</h3>
                      </div>
                    ))}
                  </section>
                )}

                {calc.steps.length > 0 && (
                  <section className="mt-8">
                    <h2 className="font-display text-2xl font-semibold">Step-by-step guide</h2>
                    <ol className="mt-3 list-decimal space-y-3 pl-5">
                      {calc.steps.map((s, i) => (
                        <li key={s.title}>
                          <strong>
                            {i + 1}. {s.title}
                          </strong>{' '}
                          — {s.description}
                        </li>
                      ))}
                    </ol>
                  </section>
                )}

                {calc.faqs.length > 0 && <FaqAccordion faqs={calc.faqs} />}
                <LastUpdated date="November 2026" isoDate="2026-11-21" />
              </article>
            </div>

            <aside className="space-y-6">
              <AdSlot placement="sidebar" />
              <Card glass>
                <h3 className="flex items-center gap-2 font-semibold">
                  <Star className="h-4 w-4 text-amber-500" />
                  Related calculators
                </h3>
                <ul className="mt-3 space-y-2 list-none p-0">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        to={`/tools/${r.category}/${r.slug}`}
                        className="text-sm text-primary-600 hover:underline dark:text-primary-400 block py-1"
                      >
                        {r.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
              {calc.relatedBlogSlugs.length > 0 && (
                <Card glass>
                  <h3 className="font-semibold">Related articles</h3>
                  <ul className="mt-3 space-y-2 list-none p-0">
                    {calc.relatedBlogSlugs.map((bs) => {
                      const post = getBlogPost(bs)
                      if (!post) return null
                      return (
                        <li key={bs}>
                          <Link to={`/blog/${bs}`} className="text-sm hover:text-primary-600 block py-1">
                            {post.title}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </Card>
              )}
            </aside>
          </div>
        )}
      </div>
    </>
  )
}
