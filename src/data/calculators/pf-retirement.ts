import { createCalculator, num, rows } from './factory'
import {
  epfMaturity,
  gratuity,
  npsCorpus,
  ppfMaturity,
  retirementCorpus,
} from '@/lib/calculations/pf'

export const pfCalculators = [
  createCalculator({
    slug: 'epf-calculator',
    category: 'pf-retirement',
    name: 'EPF Calculator',
    shortDescription: 'Project EPF maturity with employee and employer contributions.',
    longDescription: 'Estimate Employees Provident Fund corpus at retirement using monthly compounding.',
    keywords: ['EPF calculator', 'PF maturity'],
    fields: [
      { name: 'monthlyBasic', label: 'Monthly basic (₹)', type: 'currency', defaultValue: 30000 },
      { name: 'employeeRate', label: 'Employee PF (%)', type: 'percent', defaultValue: 12 },
      { name: 'employerRate', label: 'Employer PF (%)', type: 'percent', defaultValue: 12 },
      { name: 'years', label: 'Years of service', type: 'number', defaultValue: 20 },
      { name: 'interest', label: 'Interest rate (%)', type: 'percent', defaultValue: 8.25 },
    ],
    formula: 'FV = PMT × ((1+r)^n − 1) / r',
    formulaExplanation: 'Uses annuity formula with monthly compounding.',
    steps: [],
    examples: [],
    faqs: [{ question: 'Is EPS included?', answer: 'This estimates EPF portion; EPS pension is separate.' }],
    relatedSlugs: ['pf-calculator', 'gratuity-calculator'],
    relatedBlogSlugs: ['pf-calculation-guide'],
    calculate: (v) => {
      const r = epfMaturity(
        num(v.monthlyBasic),
        num(v.employeeRate, 12),
        num(v.employerRate, 12),
        num(v.years, 20),
        num(v.interest, 8.25)
      )
      return rows(
        { label: 'Total contributions', value: r.totalContribution, format: 'currency' },
        { label: 'EPF maturity', value: r.maturityAmount, format: 'currency', highlight: true },
      )
    },
  }),
  createCalculator({
    slug: 'pf-calculator',
    category: 'pf-retirement',
    name: 'PF Calculator',
    shortDescription: 'Monthly PF deduction from basic salary.',
    longDescription: 'Calculate employee PF on wages subject to ₹15,000 ceiling (unless opted higher).',
    keywords: ['PF deduction calculator'],
    fields: [
      { name: 'basic', label: 'Monthly basic (₹)', type: 'currency', defaultValue: 25000 },
      { name: 'rate', label: 'PF rate (%)', type: 'percent', defaultValue: 12 },
    ],
    formula: 'PF = min(Basic, 15000) × 12%',
    formulaExplanation: 'Statutory wage ceiling unless full PF opted.',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['epf-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const wage = Math.min(num(v.basic), 15000)
      const pf = (wage * num(v.rate, 12)) / 100
      return rows({ label: 'Monthly PF', value: pf, format: 'currency', highlight: true })
    },
  }),
  createCalculator({
    slug: 'ppf-calculator',
    category: 'pf-retirement',
    name: 'PPF Calculator',
    shortDescription: 'Public Provident Fund maturity projection.',
    longDescription: 'Annual PPF deposit compounding over 15+ years.',
    keywords: ['PPF calculator'],
    fields: [
      { name: 'annualDeposit', label: 'Annual deposit (₹)', type: 'currency', defaultValue: 150000 },
      { name: 'years', label: 'Years', type: 'number', defaultValue: 15 },
      { name: 'rate', label: 'Interest (%)', type: 'percent', defaultValue: 7.1 },
    ],
    formula: 'Year-end balance compounds annually',
    formulaExplanation: 'Government notifies PPF rate quarterly.',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['retirement-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const m = ppfMaturity(num(v.annualDeposit), num(v.years, 15), num(v.rate, 7.1))
      return rows({ label: 'PPF maturity', value: m, format: 'currency', highlight: true })
    },
  }),
  createCalculator({
    slug: 'gratuity-calculator',
    category: 'pf-retirement',
    name: 'Gratuity Calculator',
    shortDescription: 'Payment of Gratuity Act estimate for eligible employees.',
    longDescription: 'Gratuity after 5+ years using last drawn salary × 15/26 formula.',
    keywords: ['gratuity calculator India'],
    fields: [
      { name: 'lastSalary', label: 'Last drawn basic + DA (₹)', type: 'currency', defaultValue: 50000 },
      { name: 'years', label: 'Years of service', type: 'number', defaultValue: 8 },
    ],
    formula: 'Gratuity = (Salary × 15 × Years) / 26',
    formulaExplanation: 'Eligible after 5 continuous years under Act.',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['epf-calculator'],
    relatedBlogSlugs: ['gratuity-explained-india'],
    calculate: (v) => {
      const g = gratuity(num(v.lastSalary), num(v.years, 8))
      return rows(
        { label: 'Eligible', value: g.eligible ? 'Yes' : 'No (min 5 years)', format: 'text' },
        { label: 'Gratuity amount', value: g.amount, format: 'currency', highlight: true },
      )
    },
  }),
  createCalculator({
    slug: 'pension-calculator',
    category: 'pf-retirement',
    name: 'Pension Calculator',
    shortDescription: 'Estimate monthly pension from corpus and annuity rate.',
    longDescription: 'Simple pension = corpus × annuity rate / 12.',
    keywords: ['pension estimate'],
    fields: [
      { name: 'corpus', label: 'Retirement corpus (₹)', type: 'currency', defaultValue: 5000000 },
      { name: 'annuityRate', label: 'Annuity rate (% p.a.)', type: 'percent', defaultValue: 6 },
    ],
    formula: 'Monthly pension = Corpus × Rate / 12',
    formulaExplanation: 'Actual annuity products vary by insurer.',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['nps-calculator', 'retirement-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const pension = (num(v.corpus) * num(v.annuityRate, 6)) / 100 / 12
      return rows({ label: 'Estimated monthly pension', value: pension, format: 'currency', highlight: true })
    },
  }),
  createCalculator({
    slug: 'nps-calculator',
    category: 'pf-retirement',
    name: 'NPS Calculator',
    shortDescription: 'National Pension System corpus and annuity split.',
    longDescription: 'Project NPS wealth with monthly SIP and lumpsum/annuity at 60.',
    keywords: ['NPS calculator'],
    fields: [
      { name: 'monthly', label: 'Monthly contribution (₹)', type: 'currency', defaultValue: 5000 },
      { name: 'years', label: 'Years until 60', type: 'number', defaultValue: 25 },
      { name: 'return', label: 'Expected return (%)', type: 'percent', defaultValue: 10 },
    ],
    formula: 'SIP FV with monthly compounding',
    formulaExplanation: 'Mandatory annuity on 40% of corpus at withdrawal (default).',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['retirement-calculator'],
    relatedBlogSlugs: ['nps-tax-benefits-guide'],
    calculate: (v) => {
      const r = npsCorpus(num(v.monthly), num(v.years, 25), num(v.return, 10))
      return rows(
        { label: 'NPS corpus', value: r.corpus, format: 'currency', highlight: true },
        { label: 'Lumpsum (60%)', value: r.lumpsum, format: 'currency' },
        { label: 'Annuity portion (40%)', value: r.annuity, format: 'currency' },
      )
    },
  }),
  createCalculator({
    slug: 'retirement-calculator',
    category: 'pf-retirement',
    name: 'Retirement Calculator',
    shortDescription: 'Corpus needed for inflation-adjusted retirement expenses.',
    longDescription: 'Plan retirement savings target based on current expenses and inflation.',
    keywords: ['retirement planning India'],
    fields: [
      { name: 'currentAge', label: 'Current age', type: 'number', defaultValue: 30 },
      { name: 'retirementAge', label: 'Retirement age', type: 'number', defaultValue: 60 },
      { name: 'monthlyExpense', label: 'Current monthly expense (₹)', type: 'currency', defaultValue: 50000 },
      { name: 'inflation', label: 'Inflation (%)', type: 'percent', defaultValue: 6 },
    ],
    formula: 'PV of post-retirement expenses inflated to retirement date',
    formulaExplanation: 'Assumes 25-year post-retirement drawdown.',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['nps-calculator', 'ppf-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const r = retirementCorpus(
        num(v.currentAge, 30),
        num(v.retirementAge, 60),
        num(v.monthlyExpense),
        num(v.inflation, 6),
        12,
        7
      )
      return rows(
        { label: 'Years to retire', value: r.yearsToRetire, format: 'number' },
        { label: 'Expense at retirement (monthly)', value: r.expenseAtRetirement, format: 'currency' },
        { label: 'Corpus required', value: r.corpusNeeded, format: 'currency', highlight: true },
      )
    },
  }),
  createCalculator({
    slug: 'superannuation-calculator',
    category: 'pf-retirement',
    name: 'Superannuation Calculator',
    shortDescription: 'Employer superannuation fund maturity estimate.',
    longDescription: 'Similar to PF but for employer-managed superannuation schemes.',
    keywords: ['superannuation fund'],
    fields: [
      { name: 'monthlyContribution', label: 'Employer contribution / month (₹)', type: 'currency', defaultValue: 5000 },
      { name: 'years', label: 'Years', type: 'number', defaultValue: 15 },
      { name: 'rate', label: 'Return (%)', type: 'percent', defaultValue: 8 },
    ],
    formula: 'FV of monthly contributions',
    formulaExplanation: 'Tax treatment differs; consult employer policy.',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['epf-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const months = num(v.years, 15) * 12
      const r = num(v.rate, 8) / 100 / 12
      const pmt = num(v.monthlyContribution)
      const fv = pmt * ((Math.pow(1 + r, months) - 1) / r) * (1 + r)
      return rows({ label: 'Superannuation corpus', value: fv, format: 'currency', highlight: true })
    },
  }),
]
