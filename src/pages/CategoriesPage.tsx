import { Link } from 'react-router-dom'
import { SeoHead } from '@/components/seo/SeoHead'
import { CATEGORIES } from '@/data/categories'
import { getCalculatorsByCategory } from '@/data/calculators'
import { Breadcrumb } from '@/components/common/Breadcrumb'

export function CategoriesPage() {
  return (
    <>
      <SeoHead
        title="HR Calculator Categories | PeopleKit"
        description="Browse free HR and payroll calculators by category: salary, tax, retirement, leave, recruitment, and workforce analytics."
        path="/categories"
        inLanguage="en"
      />
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <Breadcrumb items={[{ name: 'Categories' }]} />
        <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">Calculator Categories</h1>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
          Explore specialized tools designed for payroll calculations, statutory deductions, leave planning, recruitment metrics, and workforce analysis.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {CATEGORIES.map((cat) => {
            const count = getCalculatorsByCategory(cat.id).length
            return (
              <Link
                key={cat.id}
                to={`/categories/${cat.slug}`}
                className="rounded-2xl glass p-8 hover:shadow-lg transition border hover:border-primary-300 dark:hover:border-primary-500/40"
              >
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{cat.name}</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">{cat.description}</p>
                <p className="mt-4 text-sm font-medium text-primary-600 dark:text-primary-400">{count} calculators →</p>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
