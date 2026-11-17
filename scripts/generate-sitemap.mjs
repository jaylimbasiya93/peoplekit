import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DOMAIN = 'https://peoplekit.work'

const staticRoutes = [
  '',
  '/tools',
  '/categories',
  '/hr-tools',
  '/employee-tools',
  '/templates',
  '/resources',
  '/blog',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/disclaimer',
  '/changelog',
]

const categories = [
  'salary',
  'tax',
  'pf-retirement',
  'hr',
  'leave',
  'recruitment',
  'career',
  'analytics',
]

// Calculator slugs — keep in sync with src/data/calculators (generated list)
const calculatorSlugs = {
  salary: [
    'in-hand-salary-calculator',
    'ctc-calculator',
    'salary-hike-calculator',
    'salary-increment-calculator',
    'annual-salary-calculator',
    'monthly-salary-calculator',
    'hourly-salary-calculator',
    'daily-wage-calculator',
    'overtime-calculator',
    'payroll-calculator',
    'salary-breakdown-calculator',
    'cost-to-company-calculator',
  ],
  tax: [
    'income-tax-calculator',
    'new-regime-tax-calculator',
    'old-regime-tax-calculator',
    'tds-calculator',
    'professional-tax-calculator',
    'advance-tax-calculator',
    'surcharge-calculator',
    'tax-saving-calculator',
    'tax-comparison-calculator',
  ],
  'pf-retirement': [
    'epf-calculator',
    'pf-calculator',
    'ppf-calculator',
    'gratuity-calculator',
    'pension-calculator',
    'nps-calculator',
    'retirement-calculator',
    'superannuation-calculator',
  ],
  hr: [
    'notice-period-calculator',
    'experience-calculator',
    'joining-date-calculator',
    'resignation-date-calculator',
    'last-working-day-calculator',
    'probation-period-calculator',
    'confirmation-date-calculator',
    'attrition-calculator',
    'headcount-calculator',
    'employee-turnover-calculator',
  ],
  leave: [
    'leave-balance-calculator',
    'leave-encashment-calculator',
    'working-days-calculator',
    'holiday-calculator',
    'vacation-planner',
    'attendance-calculator',
    'leave-accrual-calculator',
    'absence-calculator',
  ],
  recruitment: [
    'offer-comparison-calculator',
    'salary-negotiation-calculator',
    'interview-cost-calculator',
    'hiring-cost-calculator',
    'recruitment-roi-calculator',
    'time-to-hire-calculator',
    'cost-per-hire-calculator',
  ],
  career: [
    'experience-letter-generator',
    'resignation-letter-generator',
    'offer-acceptance-letter-generator',
    'salary-negotiation-letter-generator',
    'career-growth-planner',
    'promotion-eligibility-calculator',
    'career-progression-calculator',
  ],
  analytics: [
    'employee-cost-calculator',
    'team-salary-calculator',
    'hr-budget-calculator',
    'workforce-cost-calculator',
    'compensation-benchmark-calculator',
    'salary-benchmark-calculator',
    'payroll-forecast-calculator',
  ],
}

const urls = [...staticRoutes.map((p) => `${DOMAIN}${p || '/'}`)]

categories.forEach((cat) => {
  urls.push(`${DOMAIN}/categories/${cat}`)
  const slugs = calculatorSlugs[cat] ?? []
  slugs.forEach((slug) => urls.push(`${DOMAIN}/tools/${cat}/${slug}`))
})

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (loc) => `  <url>
    <loc>${loc}</loc>
    <changefreq>weekly</changefreq>
    <priority>${loc === DOMAIN + '/' ? '1.0' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

writeFileSync(join(__dirname, '../public/sitemap.xml'), xml)
console.log(`Sitemap written with ${urls.length} URLs`)
