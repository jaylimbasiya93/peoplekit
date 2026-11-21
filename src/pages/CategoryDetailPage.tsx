import { Link, useParams } from 'react-router-dom'
import { SeoHead } from '@/components/seo/SeoHead'
import { getCategoryBySlug } from '@/data/categories'
import { getCalculatorsByCategory } from '@/data/calculators'
import { Breadcrumb } from '@/components/common/Breadcrumb'
import { NotFoundPage } from './NotFoundPage'

export function CategoryDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const cat = slug ? getCategoryBySlug(slug) : undefined
  if (!cat) return <NotFoundPage />

  const tools = getCalculatorsByCategory(cat.id)

  return (
    <>
      <SeoHead
        title={`${cat.name} Calculators | PeopleKit`}
        description={`Free ${cat.name.toLowerCase()} calculators: ${cat.description.slice(0, 100)}. Instant results with no signup.`}
        path={`/categories/${cat.slug}`}
        inLanguage="en"
      />
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <Breadcrumb
          items={[
            { name: 'Categories', path: '/categories' },
            { name: cat.name },
          ]}
        />
        <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{cat.name} Calculators</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">{cat.description}</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 list-none p-0">
          {tools.map((c) => (
            <li key={c.slug}>
              <Link
                to={`/tools/${c.category}/${c.slug}`}
                className="block h-full rounded-2xl glass p-5 transition hover:border-primary-300 dark:hover:border-primary-500/40 hover:-translate-y-0.5 hover:shadow-md"
              >
                <h2 className="font-semibold text-slate-900 dark:text-white">{c.name}</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{c.shortDescription}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
