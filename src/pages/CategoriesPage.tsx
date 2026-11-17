import { Link } from 'react-router-dom'
import { SeoHead } from '@/components/seo/SeoHead'
import { CATEGORIES } from '@/data/categories'
import { getCalculatorsByCategory } from '@/data/calculators'

export function CategoriesPage() {
  return (
    <>
      <SeoHead
        title="Calculator Categories"
        description="Explore salary, tax, PF, HR, leave, recruitment, career, and analytics tool categories."
        path="/categories"
      />
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <h1 className="font-display text-3xl font-bold">Categories</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {CATEGORIES.map((cat) => {
            const count = getCalculatorsByCategory(cat.id).length
            return (
              <Link
                key={cat.id}
                to={`/categories/${cat.slug}`}
                className="rounded-2xl glass p-8 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold">{cat.name}</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">{cat.description}</p>
                <p className="mt-4 text-sm text-cyan-600">{count} tools →</p>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
