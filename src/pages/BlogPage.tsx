import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { SeoHead } from '@/components/seo/SeoHead'
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/data/blog'

export function BlogPage() {
  const [cat, setCat] = useState<string>('all')
  const posts = useMemo(
    () => (cat === 'all' ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === cat)),
    [cat]
  )

  return (
    <>
      <SeoHead
        title="HR & Payroll Blog | PeopleKit"
        description="Expert articles and practical guides on salary structures, payroll calculations, statutory compliance, tax deductions, and career growth."
        path="/blog"
        inLanguage="en"
      />
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <h1 className="font-display text-3xl font-bold">Blog</h1>
        <p className="mt-2 text-slate-600">{BLOG_POSTS.length}+ expert articles</p>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCat('all')}
            className={`rounded-full px-4 py-1.5 text-sm ${cat === 'all' ? 'bg-cyan-600 text-white' : 'glass'}`}
          >
            All
          </button>
          {BLOG_CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(c.id)}
              className={`rounded-full px-4 py-1.5 text-sm ${cat === c.id ? 'bg-cyan-600 text-white' : 'glass'}`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 60).map((p) => (
            <li key={p.slug}>
              <article className="rounded-xl glass p-5 h-full flex flex-col">
                <span className="text-xs uppercase text-violet-600">{p.category}</span>
                <h2 className="mt-2 font-semibold line-clamp-2">
                  <Link to={`/blog/${p.slug}`} className="hover:text-cyan-600">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 flex-1 line-clamp-3">
                  {p.excerpt}
                </p>
                <p className="mt-3 text-xs text-slate-500">
                  {p.readTime} min · {p.publishedAt}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
