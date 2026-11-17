export type BlogCategory =
  | 'salary'
  | 'payroll'
  | 'hr'
  | 'tax'
  | 'career'
  | 'recruitment'
  | 'employee-benefits'
  | 'pf'
  | 'nps'
  | 'income-tax'

export interface BlogPostMeta {
  slug: string
  title: string
  excerpt: string
  category: BlogCategory
  readTime: number
  publishedAt: string
  author: string
  keywords: string[]
  relatedCalculatorSlugs: string[]
}

const AUTHORS = ['PeopleKit Editorial', 'Priya Menon', 'Arjun Patel', 'Sneha Iyer']

const templates: Record<BlogCategory, string[]> = {
  salary: [
    'How To Calculate In-Hand Salary From CTC',
    'CTC vs In-Hand Salary: Complete Guide',
    'Salary Structure Components Explained',
    'Understanding Special Allowance in Payslip',
    'HRA Calculation for Metro Cities',
    'Basic Salary Percentage Best Practices',
    'Annual Bonus Tax Implications',
    'Variable Pay in CTC Breakdown',
    'Salary Revision Letter Format',
    'Appraisal Hike Percentage Benchmarks',
    'Negotiating CTC During Job Change',
    'Fixed vs Variable Pay Trade-offs',
  ],
  payroll: [
    'Payroll Processing Guide India',
    'Payroll Calendar for HR Teams',
    'Statutory Deductions in Payroll',
    'Payroll Compliance Checklist 2025',
    'Form 16 and Payslip Reconciliation',
    'Arrears Calculation in Payroll',
    'Full and Final Settlement Steps',
    'Contractor vs Employee Payroll',
    'Multi-state Payroll Challenges',
    'Payroll Outsourcing vs In-house',
    'Error-free Payroll Runbook',
    'Payroll Audit Preparation',
  ],
  hr: [
    'HR Compliance Guide India',
    'POSH Policy Essentials',
    'Employee Handbook Must-haves',
    'Notice Period Buyout Rules',
    'Probation Extension Guidelines',
    'Work From Home Policy Template',
    'Grievance Redressal Framework',
    'HR Metrics Every Manager Needs',
    'Onboarding Checklist 30-60-90',
    'Exit Interview Best Practices',
    'Background Verification Process',
    'HRIS Selection Criteria',
  ],
  tax: [
    'Income Tax Guide India 2025',
    'Old vs New Tax Regime',
    'Section 80C Investment Options',
    'HRA Exemption Rules',
    'Standard Deduction Updates',
    'Form 12BB Declaration Guide',
    'Tax on ESOP and RSU',
    'Capital Gains on Equity LTCG',
    'Section 80D Health Insurance',
    'Home Loan Interest Deduction',
    'TDS on Salary Sections',
    'ITR Filing Checklist Salaried',
  ],
  career: [
    'Salary Negotiation Tips India',
    'Career Switch Compensation Guide',
    'Resume Salary Disclosure Strategy',
    'Promotion Readiness Signals',
    'Managing Counter Offers',
    'Remote Job Salary Benchmarks',
    'Skill-based Pay Premiums',
    'MBA ROI for Indian Professionals',
    'Freelance vs Full-time Income',
    'Building Personal Brand for Hikes',
    'Internal Transfer Salary Rules',
    'Career Break Return Compensation',
  ],
  recruitment: [
    'Cost Per Hire Optimization',
    'Employer Branding on Budget',
    'Structured Interview Scorecards',
    'Campus Hiring Playbook',
    'Diversity Hiring Metrics',
    'Offer Rollout Timeline',
    'Reference Check Red Flags',
    'Recruitment Funnel Analytics',
    'Agency vs Direct Hiring Costs',
    'Employer Value Proposition Examples',
    'Hiring Manager Enablement',
    'Candidate Experience Surveys',
  ],
  'employee-benefits': [
    'Group Health Insurance Guide',
    'Meal Coupons Tax Exemption',
    'Learning Allowance Benefits',
    'Car Lease Policy Taxation',
    'Internet Reimbursement Rules',
    'Leave Travel Allowance LTA',
    'Flexible Benefits Plan Design',
    'Wellness Program ROI',
    'Employee Stock Option Plans',
    'Childcare Support Benefits',
    'Relocation Package Components',
    'Gym and Wellness Allowances',
  ],
  pf: [
    'PF Calculation Guide',
    'EPF Withdrawal Rules',
    'Gratuity Explained India',
    'EPS Pension Calculation',
    'PF Transfer UAN Process',
    'Higher PF Contribution Benefits',
    'PF on International Assignment',
    'Voluntary PF VPF Limits',
    'PF Nomination Update',
    'PF Interest Rate History',
    'Partial PF Withdrawal Cases',
    'Employer PF Compliance',
  ],
  nps: [
    'NPS Tax Benefits Guide',
    'NPS Tier 1 vs Tier 2',
    'NPS Asset Allocation Strategy',
    'NPS Annuity Providers Comparison',
    'Corporate NPS Contributions',
    'NPS Withdrawal at 60',
    'NPS vs PPF for Retirement',
    'NPS Active Choice Funds',
    'NPS Statement Reading',
    'NPS for Government Employees',
  ],
  'income-tax': [
    'New Tax Regime Slabs FY25',
    'Rebate u/s 87A Explained',
    'Advance Tax Due Dates',
    'Interest u/s 234B and 234C',
    'Tax on Freelance Income',
    'Presumptive Taxation 44ADA',
    'Foreign Income Reporting',
    'DTAA Relief for NRIs',
    'Tax Harvesting Strategies',
    'Charitable Donation 80G',
  ],
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function calcRelated(category: BlogCategory): string[] {
  const map: Record<BlogCategory, string[]> = {
    salary: ['in-hand-salary-calculator', 'ctc-calculator'],
    payroll: ['payroll-calculator', 'in-hand-salary-calculator'],
    hr: ['notice-period-calculator', 'attrition-calculator'],
    tax: ['income-tax-calculator', 'tax-comparison-calculator'],
    career: ['salary-negotiation-calculator', 'offer-comparison-calculator'],
    recruitment: ['cost-per-hire-calculator', 'hiring-cost-calculator'],
    'employee-benefits': ['in-hand-salary-calculator'],
    pf: ['epf-calculator', 'gratuity-calculator'],
    nps: ['nps-calculator', 'retirement-calculator'],
    'income-tax': ['income-tax-calculator', 'new-regime-tax-calculator'],
  }
  return map[category]
}

export function generateBlogPosts(): BlogPostMeta[] {
  const posts: BlogPostMeta[] = []
  let dayOffset = 0

  for (const [category, titles] of Object.entries(templates) as [BlogCategory, string[]][]) {
    for (const title of titles) {
      const slug = slugify(title)
      const date = new Date()
      date.setDate(date.getDate() - dayOffset)
      dayOffset += 2
      posts.push({
        slug,
        title,
        excerpt: `${title} — expert insights for Indian professionals and HR teams. Practical steps, examples, and compliance notes.`,
        category,
        readTime: 6 + (slug.length % 5),
        publishedAt: date.toISOString().split('T')[0],
        author: AUTHORS[dayOffset % AUTHORS.length],
        keywords: title.toLowerCase().split(' ').slice(0, 6),
        relatedCalculatorSlugs: calcRelated(category),
      })
    }
  }

  // Additional articles to exceed 100
  const extras = [
    'Minimum Wages Act Overview',
    'Labour Code Impact on Salary',
    'Equal Pay Compliance India',
    'Gender Pay Gap Reporting',
    'Contract Labour vs Permanent Pay',
    'Shop and Establishment Registers',
    'Bonus Act Payment Timeline',
    'Payment of Wages Act Deductions',
    'Maternity Benefit Pay Calculation',
    'Paternity Leave Policy Trends',
    'Shift Allowance Calculation',
    'Night Shift Premium Rules',
    'Deputation Allowance Tax',
    'Per Diem Travel Allowance',
    'Sales Incentive Plan Design',
  ]

  extras.forEach((title, i) => {
    posts.push({
      slug: slugify(title),
      title,
      excerpt: `${title} for HR and finance leaders operating in India.`,
      category: 'hr',
      readTime: 7,
      publishedAt: new Date(Date.now() - (120 + i) * 86400000).toISOString().split('T')[0],
      author: AUTHORS[i % AUTHORS.length],
      keywords: ['HR India', 'compliance'],
      relatedCalculatorSlugs: ['employee-cost-calculator'],
    })
  })

  return posts
}
