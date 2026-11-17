import type { CategoryMeta } from '@/types/calculator'

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'salary',
    name: 'Salary & Payroll',
    description: 'CTC, in-hand salary, hikes, overtime, and payroll breakdown tools.',
    icon: 'Wallet',
    slug: 'salary',
  },
  {
    id: 'tax',
    name: 'Tax & Compliance',
    description: 'Income tax, TDS, professional tax, and regime comparison for India.',
    icon: 'Receipt',
    slug: 'tax',
  },
  {
    id: 'pf-retirement',
    name: 'PF & Retirement',
    description: 'EPF, PPF, NPS, gratuity, and retirement planning calculators.',
    icon: 'PiggyBank',
    slug: 'pf-retirement',
  },
  {
    id: 'hr',
    name: 'HR Tools',
    description: 'Notice period, experience, attrition, and workforce metrics.',
    icon: 'Users',
    slug: 'hr',
  },
  {
    id: 'leave',
    name: 'Leave Management',
    description: 'Leave balance, encashment, working days, and attendance.',
    icon: 'Calendar',
    slug: 'leave',
  },
  {
    id: 'recruitment',
    name: 'Recruitment',
    description: 'Hiring cost, ROI, offer comparison, and time-to-hire analytics.',
    icon: 'UserPlus',
    slug: 'recruitment',
  },
  {
    id: 'career',
    name: 'Career Tools',
    description: 'Letters, negotiation, growth planning, and progression.',
    icon: 'TrendingUp',
    slug: 'career',
  },
  {
    id: 'analytics',
    name: 'HR Analytics',
    description: 'Team salary, budgets, benchmarks, and payroll forecasting.',
    icon: 'BarChart3',
    slug: 'analytics',
  },
]

export function getCategoryBySlug(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug)
}

export function getCategoryById(id: string) {
  return CATEGORIES.find((c) => c.id === id)
}
