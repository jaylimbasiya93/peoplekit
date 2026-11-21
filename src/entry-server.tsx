import { renderToString } from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import { HomePage } from '@/pages/HomePage'
import { HrToolsPage } from '@/pages/HrToolsPage'
import { ToolPage } from '@/features/calculators/ToolPage'
import { CategoriesPage } from '@/pages/CategoriesPage'
import { CategoryDetailPage } from '@/pages/CategoryDetailPage'
import { BlogPage } from '@/pages/BlogPage'
import { BlogPostPage } from '@/pages/BlogPostPage'
import { EmployeeToolsPage, TemplatesPage, ResourcesPage } from '@/pages/DiscoveryPages'
import {
  AboutPage,
  ContactPage,
  PrivacyPage,
  TermsPage,
  DisclaimerPage,
  ChangelogPage,
} from '@/pages/StaticPages'
import { NotFoundPage } from '@/pages/NotFoundPage'

import { ALL_CALCULATORS, getCalculatorBySlug } from '@/data/calculators'
import { getCategoryBySlug } from '@/data/categories'
import { getBlogPost } from '@/data/blog'
import { BRAND } from '@/config/brand'
import {
  breadcrumbSchema,
  collectionPageSchema,
  faqSchema,
  organizationSchema,
  webApplicationSchema,
  websiteSchema,
} from '@/lib/seo/schema'
import { npsFaqs } from '@/features/calculators/content/NpsContent'
import { salaryIncrementFaqs } from '@/features/calculators/content/SalaryIncrementContent'
import { leaveBalanceFaqs } from '@/features/calculators/content/LeaveBalanceContent'
import { gratuityFaqs } from '@/features/calculators/content/GratuityContent'
import { workforceCostFaqs } from '@/features/calculators/content/WorkforceCostContent'

export interface PageMetadata {
  title: string
  description: string
  canonicalUrl: string
  inLanguage: 'en' | 'en-IN'
  locale: string
  jsonLd: object[]
}

export function getPageMetadata(url: string): PageMetadata {
  const cleanPath = url === '/' ? '' : url.replace(/\/$/, '')
  const canonicalUrl = `${BRAND.domain}${cleanPath || '/'}`

  // Default fallback metadata
  let title: string = `${BRAND.name} – ${BRAND.tagline}`
  let description: string = BRAND.description
  let inLanguage: 'en' | 'en-IN' = 'en'
  let locale = 'en_US'
  let jsonLd: object[] = [organizationSchema(), websiteSchema('en')]

  if (url === '/' || url === '') {
    title = 'PeopleKit – Free HR & Payroll Calculators'
    description =
      'Free HR and payroll calculators: NPS, gratuity, salary increment, leave balance and workforce cost. Fast, accurate, no signup.'
    inLanguage = 'en'
    locale = 'en_US'
    jsonLd = [organizationSchema(), websiteSchema('en')]
  } else if (url === '/hr-tools') {
    title = 'Free HR Tools & Calculators | PeopleKit'
    description =
      'Browse free HR and payroll calculators: salary, PF and retirement, leave, and workforce analytics. Fast, accurate, no signup.'
    inLanguage = 'en'
    locale = 'en_US'
    jsonLd = [
      collectionPageSchema({
        name: 'Free HR Tools & Calculators',
        description,
        url: canonicalUrl,
        inLanguage: 'en',
        items: ALL_CALCULATORS.map((tool) => ({
          name: tool.name,
          url: `${BRAND.domain}/tools/${tool.category}/${tool.slug}`,
          description: tool.shortDescription,
        })),
      }),
      breadcrumbSchema(
        [
          { name: 'Home', url: BRAND.domain },
          { name: 'HR Tools', url: canonicalUrl },
        ],
        'en'
      ),
    ]
  } else if (url === '/employee-tools') {
    title = 'Employee Tools: Leave & Work Planning | PeopleKit'
    description =
      'Free employee tools for leave, work hours, dates, and attendance planning. Fast, accurate calculators with no signup.'
    inLanguage = 'en'
    locale = 'en_US'
  } else if (url === '/templates') {
    title = 'Free HR Templates & Letter Generators | PeopleKit'
    description =
      'Create and download professional HR letters: offer letters, appointment letters, experience letters, and relieving letters.'
    inLanguage = 'en'
    locale = 'en_US'
  } else if (url === '/resources') {
    title = 'HR Guides & Workplace Resources | PeopleKit'
    description =
      'Practical workplace guides on payroll calculations, statutory compliance, notice periods, and people operations.'
    inLanguage = 'en'
    locale = 'en_US'
  } else if (url === '/categories') {
    title = 'HR Calculator Categories | PeopleKit'
    description =
      'Browse free HR and payroll calculators by category: salary, tax, retirement, leave, recruitment, and workforce analytics.'
    inLanguage = 'en'
    locale = 'en_US'
  } else if (url.startsWith('/categories/')) {
    const slug = url.replace('/categories/', '')
    const cat = getCategoryBySlug(slug)
    if (cat) {
      title = `${cat.name} Calculators | PeopleKit`
      description = `Free ${cat.name.toLowerCase()} calculators: ${cat.description.slice(0, 100)}. Instant results with no signup.`
    }
    inLanguage = 'en'
    locale = 'en_US'
  } else if (url.startsWith('/tools/')) {
    const parts = url.split('/').filter(Boolean)
    const slug = parts[2] // /tools/:category/:slug
    const calc = slug ? getCalculatorBySlug(slug) : undefined

    if (slug === 'nps-calculator') {
      title = 'NPS Calculator India: Pension & Lump Sum | PeopleKit'
      description =
        'Free NPS calculator for India. Estimate your National Pension System corpus, monthly pension and lump sum at retirement. Instant results, no signup.'
      inLanguage = 'en-IN'
      locale = 'en_IN'
      jsonLd = [
        organizationSchema(),
        websiteSchema('en-IN'),
        breadcrumbSchema(
          [
            { name: 'Home', url: BRAND.domain },
            { name: 'HR Tools', url: `${BRAND.domain}/hr-tools` },
            { name: 'PF & Retirement', url: `${BRAND.domain}/categories/pf-retirement` },
            { name: 'NPS Calculator India', url: canonicalUrl },
          ],
          'en-IN'
        ),
        webApplicationSchema({
          name: 'NPS Calculator (National Pension System, India)',
          description,
          url: canonicalUrl,
          inLanguage: 'en-IN',
          category: 'FinanceApplication',
        }),
        faqSchema(npsFaqs, 'en-IN'),
      ]
    } else if (slug === 'salary-increment-calculator') {
      title = 'Salary Increment & Hike Calculator | PeopleKit'
      description =
        'Calculate salary hike percentage and your new CTC instantly. Free salary increment calculator with monthly and annual breakdown. No signup.'
      inLanguage = 'en'
      locale = 'en_US'
      jsonLd = [
        organizationSchema(),
        websiteSchema('en'),
        breadcrumbSchema(
          [
            { name: 'Home', url: BRAND.domain },
            { name: 'HR Tools', url: `${BRAND.domain}/hr-tools` },
            { name: 'Salary', url: `${BRAND.domain}/categories/salary` },
            { name: 'Salary Increment Calculator', url: canonicalUrl },
          ],
          'en'
        ),
        webApplicationSchema({
          name: 'Salary Increment Calculator (Salary Hike %)',
          description,
          url: canonicalUrl,
          inLanguage: 'en',
          category: 'FinanceApplication',
        }),
        faqSchema(salaryIncrementFaqs, 'en'),
      ]
    } else if (slug === 'leave-balance-calculator') {
      title = 'Leave Balance Calculator – Annual & Pro-Rata | PeopleKit'
      description =
        'Calculate employee leave balance, annual leave and pro-rata leave for joiners and leavers. Free leave calculator with carry-forward and encashment.'
      inLanguage = 'en'
      locale = 'en_US'
      jsonLd = [
        organizationSchema(),
        websiteSchema('en'),
        breadcrumbSchema(
          [
            { name: 'Home', url: BRAND.domain },
            { name: 'HR Tools', url: `${BRAND.domain}/hr-tools` },
            { name: 'Leave', url: `${BRAND.domain}/categories/leave` },
            { name: 'Leave Balance Calculator', url: canonicalUrl },
          ],
          'en'
        ),
        webApplicationSchema({
          name: 'Leave Balance Calculator',
          description,
          url: canonicalUrl,
          inLanguage: 'en',
          category: 'FinanceApplication',
        }),
        faqSchema(leaveBalanceFaqs, 'en'),
      ]
    } else if (slug === 'gratuity-calculator') {
      title = 'Gratuity Calculator India: Private Employees | PeopleKit'
      description =
        'Free gratuity calculator for private and government employees in India. Calculate gratuity using the 15/26 formula, with eligibility and tax rules.'
      inLanguage = 'en-IN'
      locale = 'en_IN'
      jsonLd = [
        organizationSchema(),
        websiteSchema('en-IN'),
        breadcrumbSchema(
          [
            { name: 'Home', url: BRAND.domain },
            { name: 'HR Tools', url: `${BRAND.domain}/hr-tools` },
            { name: 'PF & Retirement', url: `${BRAND.domain}/categories/pf-retirement` },
            { name: 'Gratuity Calculator India', url: canonicalUrl },
          ],
          'en-IN'
        ),
        webApplicationSchema({
          name: 'Gratuity Calculator (India)',
          description,
          url: canonicalUrl,
          inLanguage: 'en-IN',
          category: 'FinanceApplication',
        }),
        faqSchema(gratuityFaqs, 'en-IN'),
      ]
    } else if (slug === 'workforce-cost-calculator') {
      title = 'Workforce Cost Calculator: Total Employee Cost | PeopleKit'
      description =
        'Calculate total workforce cost including salary, benefits, insurance and overheads. Free workforce management cost calculator for HR and finance.'
      inLanguage = 'en'
      locale = 'en_US'
      jsonLd = [
        organizationSchema(),
        websiteSchema('en'),
        breadcrumbSchema(
          [
            { name: 'Home', url: BRAND.domain },
            { name: 'HR Tools', url: `${BRAND.domain}/hr-tools` },
            { name: 'Analytics', url: `${BRAND.domain}/categories/analytics` },
            { name: 'Workforce Cost Calculator', url: canonicalUrl },
          ],
          'en'
        ),
        webApplicationSchema({
          name: 'Workforce Cost Calculator',
          description,
          url: canonicalUrl,
          inLanguage: 'en',
          category: 'FinanceApplication',
        }),
        faqSchema(workforceCostFaqs, 'en'),
      ]
    } else if (calc) {
      title = `${calc.name} | PeopleKit`
      description = calc.shortDescription
      inLanguage = 'en'
      locale = 'en_US'
      jsonLd = [
        organizationSchema(),
        websiteSchema('en'),
        breadcrumbSchema(
          [
            { name: 'Home', url: BRAND.domain },
            { name: 'HR Tools', url: `${BRAND.domain}/hr-tools` },
            { name: calc.category, url: `${BRAND.domain}/categories/${calc.category}` },
            { name: calc.name, url: canonicalUrl },
          ],
          'en'
        ),
        webApplicationSchema({
          name: calc.name,
          description: calc.shortDescription,
          url: canonicalUrl,
          inLanguage: 'en',
        }),
        faqSchema(calc.faqs, 'en'),
      ]
    }
  } else if (url === '/blog') {
    title = 'HR & Payroll Blog | PeopleKit'
    description =
      'Expert articles and practical guides on salary structures, payroll calculations, statutory compliance, tax deductions, and career growth.'
    inLanguage = 'en'
    locale = 'en_US'
  } else if (url.startsWith('/blog/')) {
    const slug = url.replace('/blog/', '')
    const post = getBlogPost(slug)
    if (post) {
      title = `${post.title} | PeopleKit`
      description = post.excerpt
    }
    inLanguage = 'en'
    locale = 'en_US'
  } else if (url === '/about') {
    title = 'About PeopleKit'
    description =
      'Learn about PeopleKit, a privacy-first collection of free HR, payroll, and employee planning calculators.'
    inLanguage = 'en'
    locale = 'en_US'
  } else if (url === '/contact') {
    title = 'Contact PeopleKit'
    description =
      'Get in touch with the PeopleKit team for feedback, questions, or calculator suggestions.'
    inLanguage = 'en'
    locale = 'en_US'
  } else if (url === '/privacy') {
    title = 'Privacy Policy | PeopleKit'
    description =
      'PeopleKit privacy policy: we run calculations locally in your browser with zero data storage.'
    inLanguage = 'en'
    locale = 'en_US'
  } else if (url === '/terms') {
    title = 'Terms of Service | PeopleKit'
    description =
      'PeopleKit terms of service: free informational calculators and templates for workplace use.'
    inLanguage = 'en'
    locale = 'en_US'
  } else if (url === '/disclaimer') {
    title = 'Disclaimer | PeopleKit'
    description =
      'PeopleKit disclaimer: calculations are estimates and do not constitute formal legal or tax advice.'
    inLanguage = 'en'
    locale = 'en_US'
  } else if (url === '/changelog') {
    title = 'Changelog | PeopleKit'
    description = 'See recent updates and new features added to the PeopleKit HR tool suite.'
    inLanguage = 'en'
    locale = 'en_US'
  }

  return {
    title,
    description,
    canonicalUrl,
    inLanguage,
    locale,
    jsonLd,
  }
}

export interface RenderResult {
  html: string
  meta: PageMetadata
}

export function render(url: string): RenderResult {
  const helmetContext = {}

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <MemoryRouter initialEntries={[url]}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="tools" element={<Navigate to="/hr-tools" replace />} />
            <Route path="tools/:category/:slug" element={<ToolPage />} />
            <Route path="hr-tools" element={<HrToolsPage />} />
            <Route path="employee-tools" element={<EmployeeToolsPage />} />
            <Route path="templates" element={<TemplatesPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="categories/:slug" element={<CategoryDetailPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogPostPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="disclaimer" element={<DisclaimerPage />} />
            <Route path="changelog" element={<ChangelogPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  )

  const meta = getPageMetadata(url)

  return {
    html: appHtml,
    meta,
  }
}
