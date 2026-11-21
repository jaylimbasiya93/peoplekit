import { Link, useParams } from 'react-router-dom'
import { SeoHead } from '@/components/seo/SeoHead'
import { getBlogPost, getRelatedBlogPosts } from '@/data/blog'
import { getCalculatorBySlug } from '@/data/calculators'
import { BRAND } from '@/config/brand'
import { articleSchema, breadcrumbSchema, faqSchema } from '@/lib/seo/schema'
import { AdSlot } from '@/components/ads/AdSlot'
import { NotFoundPage } from './NotFoundPage'

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getBlogPost(slug) : undefined
  if (!post) return <NotFoundPage />

  const path = `/blog/${post.slug}`
  const related = getRelatedBlogPosts(post.slug)
  const faqs = [
    {
      question: `Who should read "${post.title}"?`,
      answer: 'HR professionals, finance teams, and salaried employees in India.',
    },
    {
      question: 'Are PeopleKit articles updated for latest rules?',
      answer: 'We refresh content regularly; always verify with official government notifications.',
    },
  ]

  return (
    <>
      <SeoHead
        title={post.title}
        description={post.excerpt}
        path={path}
        type="article"
        inLanguage="en"
        jsonLd={[
          articleSchema(post, `${BRAND.domain}${path}`, 'en'),
          breadcrumbSchema([
            { name: 'Home', url: BRAND.domain },
            { name: 'Blog', url: `${BRAND.domain}/blog` },
            { name: post.title, url: `${BRAND.domain}${path}` },
          ], 'en'),
          faqSchema(faqs, 'en'),
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-10 lg:px-6">
        <nav className="text-sm text-slate-500 mb-4">
          <Link to="/blog">Blog</Link> / {post.category}
        </nav>
        <h1 className="font-display text-3xl font-bold md:text-4xl">{post.title}</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          By {post.author} · {post.publishedAt} · {post.readTime} min read
        </p>

        <AdSlot placement="inContent" />

        <div className="prose prose-slate dark:prose-invert mt-8 max-w-none">
          <p>{post.excerpt}</p>
          <h2>Overview</h2>
          <p>
            This guide covers {post.title.toLowerCase()} with practical examples for Indian
            workplaces. Use our related calculators for instant estimates alongside this article.
          </p>
          <h2>Key takeaways</h2>
          <ul>
            <li>Understand definitions and statutory context in India.</li>
            <li>Apply formulas step-by-step with real numbers.</li>
            <li>Cross-check results with payroll or tax advisors before decisions.</li>
          </ul>
          <h2>How PeopleKit helps</h2>
          <p>
            Pair this article with our free calculators—no signup, no data stored. Search tools with{' '}
            <kbd>Ctrl+K</kbd> from any page.
          </p>
        </div>

        {post.relatedCalculatorSlugs.length > 0 && (
          <section className="mt-10 rounded-xl glass p-6">
            <h2 className="font-semibold">Related calculators</h2>
            <ul className="mt-3 space-y-2">
              {post.relatedCalculatorSlugs.map((s) => {
                const c = getCalculatorBySlug(s)
                if (!c) return null
                return (
                  <li key={s}>
                    <Link to={`/tools/${c.category}/${c.slug}`} className="text-cyan-600 hover:underline">
                      {c.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        )}

        <section className="mt-10">
          <h2 className="font-semibold">Related articles</h2>
          <ul className="mt-3 space-y-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link to={`/blog/${r.slug}`} className="hover:text-cyan-600">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </>
  )
}
