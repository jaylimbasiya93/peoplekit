import { generateBlogPosts, type BlogCategory, type BlogPostMeta } from './generate-posts'

export const BLOG_POSTS: BlogPostMeta[] = generateBlogPosts()

export const BLOG_CATEGORIES: { id: BlogCategory; name: string; slug: string }[] = [
  { id: 'salary', name: 'Salary', slug: 'salary' },
  { id: 'payroll', name: 'Payroll', slug: 'payroll' },
  { id: 'hr', name: 'HR', slug: 'hr' },
  { id: 'tax', name: 'Tax', slug: 'tax' },
  { id: 'career', name: 'Career', slug: 'career' },
  { id: 'recruitment', name: 'Recruitment', slug: 'recruitment' },
  { id: 'employee-benefits', name: 'Employee Benefits', slug: 'employee-benefits' },
  { id: 'pf', name: 'PF', slug: 'pf' },
  { id: 'nps', name: 'NPS', slug: 'nps' },
  { id: 'income-tax', name: 'Income Tax', slug: 'income-tax' },
]

export function getBlogPost(slug: string): BlogPostMeta | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

export function getBlogByCategory(category: BlogCategory): BlogPostMeta[] {
  return BLOG_POSTS.filter((p) => p.category === category)
}

export function getRelatedBlogPosts(slug: string, limit = 4): BlogPostMeta[] {
  const post = getBlogPost(slug)
  if (!post) return BLOG_POSTS.slice(0, limit)
  const same = BLOG_POSTS.filter((p) => p.category === post.category && p.slug !== slug)
  return same.slice(0, limit)
}

export function searchBlog(query: string): BlogPostMeta[] {
  const q = query.toLowerCase()
  if (!q) return BLOG_POSTS
  return BLOG_POSTS.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.keywords.some((k) => k.includes(q))
  )
}
