import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Heart, ChevronRight, Star } from 'lucide-react'
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
  calculatorSchema,
  faqSchema,
  organizationSchema,
  websiteSchema,
} from '@/lib/seo/schema'
import { useUserStore } from '@/store/userStore'
import { NotFoundPage } from '@/pages/NotFoundPage'

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

  const jsonLd = [
    organizationSchema(),
    websiteSchema(),
    breadcrumbSchema([
      { name: 'Home', url: BRAND.domain },
      { name: 'Tools', url: `${BRAND.domain}/tools` },
      { name: cat?.name ?? 'Category', url: `${BRAND.domain}/categories/${calc.category}` },
      { name: calc.name, url },
    ]),
    calculatorSchema(calc, url),
    faqSchema(calc.faqs),
  ]

  return (
    <>
      <SeoHead
        title={calc.name}
        description={calc.shortDescription}
        path={path}
        jsonLd={jsonLd}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-slate-500">
          <Link to="/" className="hover:text-cyan-600">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to="/tools" className="hover:text-cyan-600">Tools</Link>
          <ChevronRight className="h-4 w-4" />
          <Link to={`/categories/${calc.category}`} className="hover:text-cyan-600">
            {cat?.name}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-slate-900 dark:text-slate-100">{calc.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
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
                className={`rounded-full p-3 border ${isFavorite ? 'border-rose-500 text-rose-500' : 'border-slate-300'}`}
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
                <p className="mt-2 font-mono text-sm rounded-lg bg-slate-100 dark:bg-slate-800 p-4">{calc.formula}</p>
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
                        <strong>{i + 1}. {s.title}</strong> — {s.description}
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              <section className="mt-8">
                <h2 className="font-display text-2xl font-semibold">FAQ</h2>
                <div className="mt-4 space-y-4">
                  {calc.faqs.map((f) => (
                    <details key={f.question} className="rounded-xl border p-4 group">
                      <summary className="cursor-pointer font-medium">{f.question}</summary>
                      <p className="mt-2 text-slate-600 dark:text-slate-400">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            </article>
          </div>

          <aside className="space-y-6">
            <AdSlot placement="sidebar" />
            <Card glass>
              <h2 className="flex items-center gap-2 font-semibold">
                <Star className="h-4 w-4 text-amber-500" />
                Related calculators
              </h2>
              <ul className="mt-3 space-y-2">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link
                      to={`/tools/${r.category}/${r.slug}`}
                      className="text-sm text-cyan-600 hover:underline dark:text-cyan-400"
                    >
                      {r.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
            {calc.relatedBlogSlugs.length > 0 && (
              <Card glass>
                <h2 className="font-semibold">Related articles</h2>
                <ul className="mt-3 space-y-2">
                  {calc.relatedBlogSlugs.map((bs) => {
                    const post = getBlogPost(bs)
                    if (!post) return null
                    return (
                      <li key={bs}>
                        <Link to={`/blog/${bs}`} className="text-sm hover:text-cyan-600">
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
      </div>
    </>
  )
}
