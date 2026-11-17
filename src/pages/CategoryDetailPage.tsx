import { Link, useParams } from 'react-router-dom'
import { SeoHead } from '@/components/seo/SeoHead'
import { getCategoryBySlug } from '@/data/categories'
import { getCalculatorsByCategory } from '@/data/calculators'
import { NotFoundPage } from './NotFoundPage'

export function CategoryDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const cat = slug ? getCategoryBySlug(slug) : undefined
  if (!cat) return <NotFoundPage />

  const tools = getCalculatorsByCategory(cat.id)

  return (
    <>
      <SeoHead title={cat.name} description={cat.description} path={`/categories/${cat.slug}`} />
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <nav className="text-sm text-slate-500 mb-4">
          <Link to="/categories">Categories</Link> / {cat.name}
        </nav>
        <h1 className="font-display text-3xl font-bold">{cat.name}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">{cat.description}</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((c) => (
            <li key={c.slug}>
              <Link
                to={`/tools/${c.category}/${c.slug}`}
                className="block rounded-xl glass p-5 hover:border-cyan-500/40"
              >
                <h2 className="font-semibold">{c.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{c.shortDescription}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
