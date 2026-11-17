import { createCalculator, num, rows } from './factory'
import {
  calculateInHandSalary,
  ctcFromInHand,
  hourlyFromAnnual,
  overtimePay,
  payrollBreakdown,
  salaryHike,
} from '@/lib/calculations/salary'
const defaultFaqs = (topic: string) => [
  {
    question: `Is this ${topic} calculator accurate for India?`,
    answer:
      'Estimates use common Indian payroll assumptions (PF wage ceiling, professional tax defaults). Always verify with your employer or CA for final figures.',
  },
  {
    question: 'Does PeopleKit store my salary data?',
    answer: 'No. All calculations run locally in your browser. We do not send salary inputs to any server.',
  },
]

export const salaryCalculators = [
  createCalculator({
    slug: 'in-hand-salary-calculator',
    category: 'salary',
    name: 'In-Hand Salary Calculator',
    shortDescription: 'Estimate monthly take-home from CTC with PF, tax, and deductions.',
    longDescription:
      'Convert your annual CTC into an estimated in-hand salary for India. Adjust basic, HRA, PF, professional tax, and tax regime to match your payslip structure.',
    keywords: ['in hand salary', 'take home salary', 'CTC to in hand', 'salary calculator India'],
    fields: [
      { name: 'ctc', label: 'Annual CTC (₹)', type: 'currency', defaultValue: 1200000 },
      { name: 'basicPercent', label: 'Basic (% of CTC monthly)', type: 'percent', defaultValue: 40 },
      { name: 'hraPercent', label: 'HRA (% of CTC monthly)', type: 'percent', defaultValue: 20 },
      { name: 'pfEmployeePercent', label: 'Employee PF (%)', type: 'percent', defaultValue: 12 },
      { name: 'professionalTax', label: 'Professional Tax / month (₹)', type: 'currency', defaultValue: 200 },
      { name: 'otherDeductions', label: 'Other deductions / month (₹)', type: 'currency', defaultValue: 0 },
      {
        name: 'taxRegime',
        label: 'Tax regime',
        type: 'select',
        defaultValue: 'new',
        options: [
          { label: 'New regime', value: 'new' },
          { label: 'Old regime', value: 'old' },
        ],
      },
    ],
    formula: 'In-hand = Gross − PF − PT − TDS − Other deductions',
    formulaExplanation:
      'Gross is built from Basic + HRA + Special allowance. PF is capped on basic up to ₹15,000 wage ceiling. Tax uses simplified slab estimates.',
    steps: [
      { title: 'Enter CTC', description: 'Input your annual cost-to-company figure.' },
      { title: 'Set salary structure', description: 'Adjust basic and HRA percentages to match your offer letter.' },
      { title: 'Review breakdown', description: 'Compare gross, deductions, and estimated in-hand pay.' },
    ],
    examples: [
      {
        title: '₹12 LPA CTC',
        inputs: { ctc: 1200000 },
        outputs: { net: '~₹75,000–85,000/mo (varies by structure)' },
      },
    ],
    faqs: defaultFaqs('in-hand salary'),
    relatedSlugs: ['ctc-calculator', 'salary-breakdown-calculator', 'income-tax-calculator'],
    relatedBlogSlugs: ['how-to-calculate-in-hand-salary'],
    calculate: (v) => {
      const r = calculateInHandSalary({
        ctc: num(v.ctc),
        basicPercent: num(v.basicPercent, 40),
        hraPercent: num(v.hraPercent, 20),
        pfEmployeePercent: num(v.pfEmployeePercent, 12),
        professionalTax: num(v.professionalTax, 200),
        otherDeductions: num(v.otherDeductions),
        taxRegime: (v.taxRegime as 'new' | 'old') || 'new',
      })
      return rows(
        { label: 'Monthly gross', value: r.gross, format: 'currency' },
        { label: 'Employee PF', value: r.pfEmployee, format: 'currency' },
        { label: 'Estimated tax / month', value: r.monthlyTax, format: 'currency' },
        { label: 'In-hand salary / month', value: r.net, format: 'currency', highlight: true },
        { label: 'Annual in-hand', value: r.annualNet, format: 'currency' },
      )
    },
  }),
  createCalculator({
    slug: 'ctc-calculator',
    category: 'salary',
    name: 'CTC Calculator',
    shortDescription: 'Estimate CTC from desired in-hand or component breakdown.',
    longDescription: 'Reverse-engineer approximate CTC from target monthly in-hand using standard India multiplier assumptions.',
    keywords: ['CTC calculator', 'cost to company', 'salary CTC India'],
    fields: [
      { name: 'inHand', label: 'Target in-hand / month (₹)', type: 'currency', defaultValue: 80000 },
      { name: 'multiplier', label: 'CTC multiplier', type: 'number', defaultValue: 1.35, helperText: 'Typical range 1.3–1.5' },
    ],
    formula: 'CTC ≈ In-hand × 12 × Multiplier',
    formulaExplanation: 'Multiplier accounts for employer PF, gratuity provisions, tax, and benefits.',
    steps: [
      { title: 'Enter target in-hand', description: 'Your desired monthly take-home.' },
      { title: 'Adjust multiplier', description: 'Increase if benefits-heavy; decrease for lean structures.' },
    ],
    examples: [{ title: '₹80k in-hand', inputs: { inHand: 80000 }, outputs: { ctc: '~₹12.96 LPA' } }],
    faqs: defaultFaqs('CTC'),
    relatedSlugs: ['in-hand-salary-calculator', 'cost-to-company-calculator'],
    relatedBlogSlugs: ['ctc-vs-in-hand-salary-explained'],
    calculate: (v) => {
      const ctc = ctcFromInHand(num(v.inHand), num(v.multiplier, 1.35))
      return rows(
        { label: 'Estimated annual CTC', value: ctc, format: 'currency', highlight: true },
        { label: 'Monthly CTC', value: ctc / 12, format: 'currency' },
      )
    },
  }),
  createCalculator({
    slug: 'salary-hike-calculator',
    category: 'salary',
    name: 'Salary Hike Calculator',
    shortDescription: 'Calculate hike amount and percentage between old and new CTC.',
    longDescription: 'Measure your salary increment in rupees and percentage for appraisals and offer comparisons.',
    keywords: ['salary hike', 'increment percentage', 'raise calculator'],
    fields: [
      { name: 'oldCtc', label: 'Old annual CTC (₹)', type: 'currency', defaultValue: 1000000 },
      { name: 'newCtc', label: 'New annual CTC (₹)', type: 'currency', defaultValue: 1200000 },
    ],
    formula: 'Hike % = ((New − Old) / Old) × 100',
    formulaExplanation: 'Absolute hike is New CTC minus Old CTC.',
    steps: [{ title: 'Enter both CTCs', description: 'Use annual figures before and after hike.' }],
    examples: [],
    faqs: defaultFaqs('hike'),
    relatedSlugs: ['salary-increment-calculator', 'offer-comparison-calculator'],
    relatedBlogSlugs: ['salary-negotiation-tips-india'],
    calculate: (v) => {
      const { hikeAmount, hikePercent } = salaryHike(num(v.oldCtc), num(v.newCtc))
      return rows(
        { label: 'Hike amount', value: hikeAmount, format: 'currency', highlight: true },
        { label: 'Hike percentage', value: hikePercent, format: 'percent' },
      )
    },
  }),
  createCalculator({
    slug: 'salary-increment-calculator',
    category: 'salary',
    name: 'Salary Increment Calculator',
    shortDescription: 'Apply a percentage increment to current CTC.',
    longDescription: 'Project new salary after a defined percentage increment—useful for appraisal letters.',
    keywords: ['salary increment', 'appraisal calculator'],
    fields: [
      { name: 'currentCtc', label: 'Current CTC (₹)', type: 'currency', defaultValue: 900000 },
      { name: 'incrementPercent', label: 'Increment (%)', type: 'percent', defaultValue: 15 },
    ],
    formula: 'New CTC = Current × (1 + Increment%/100)',
    formulaExplanation: 'Simple percentage increment on annual CTC.',
    steps: [],
    examples: [],
    faqs: defaultFaqs('increment'),
    relatedSlugs: ['salary-hike-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const current = num(v.currentCtc)
      const pct = num(v.incrementPercent, 15)
      const newCtc = current * (1 + pct / 100)
      return rows(
        { label: 'Increment amount', value: newCtc - current, format: 'currency' },
        { label: 'New CTC', value: newCtc, format: 'currency', highlight: true },
      )
    },
  }),
  createCalculator({
    slug: 'annual-salary-calculator',
    category: 'salary',
    name: 'Annual Salary Calculator',
    shortDescription: 'Convert monthly salary to annual and vice versa.',
    longDescription: 'Quick annual ↔ monthly salary conversion for offers and budgeting.',
    keywords: ['annual salary', 'yearly salary'],
    fields: [
      { name: 'monthly', label: 'Monthly salary (₹)', type: 'currency', defaultValue: 75000 },
    ],
    formula: 'Annual = Monthly × 12',
    formulaExplanation: 'Assumes fixed monthly pay without variable/bonus.',
    steps: [],
    examples: [],
    faqs: defaultFaqs('annual'),
    relatedSlugs: ['monthly-salary-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const monthly = num(v.monthly)
      return rows(
        { label: 'Annual salary', value: monthly * 12, format: 'currency', highlight: true },
        { label: 'Monthly (input)', value: monthly, format: 'currency' },
      )
    },
  }),
  createCalculator({
    slug: 'monthly-salary-calculator',
    category: 'salary',
    name: 'Monthly Salary Calculator',
    shortDescription: 'Divide annual CTC or salary into monthly amount.',
    longDescription: 'Convert annual figures to monthly for budgeting.',
    keywords: ['monthly salary'],
    fields: [{ name: 'annual', label: 'Annual salary (₹)', type: 'currency', defaultValue: 960000 }],
    formula: 'Monthly = Annual / 12',
    formulaExplanation: 'Simple division by 12 months.',
    steps: [],
    examples: [],
    faqs: defaultFaqs('monthly'),
    relatedSlugs: ['annual-salary-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const annual = num(v.annual)
      return rows({ label: 'Monthly salary', value: annual / 12, format: 'currency', highlight: true })
    },
  }),
  createCalculator({
    slug: 'hourly-salary-calculator',
    category: 'salary',
    name: 'Hourly Salary Calculator',
    shortDescription: 'Derive hourly rate from annual salary.',
    longDescription: 'Useful for contractors and overtime—defaults to 48-hour work week in India IT.',
    keywords: ['hourly wage', 'hourly rate calculator'],
    fields: [
      { name: 'annual', label: 'Annual salary (₹)', type: 'currency', defaultValue: 1200000 },
      { name: 'hoursPerWeek', label: 'Hours per week', type: 'number', defaultValue: 48 },
    ],
    formula: 'Hourly = Annual / (Hours per week × 52)',
    formulaExplanation: 'Adjust hours per week for your contract.',
    steps: [],
    examples: [],
    faqs: defaultFaqs('hourly'),
    relatedSlugs: ['overtime-calculator', 'daily-wage-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const rate = hourlyFromAnnual(num(v.annual), num(v.hoursPerWeek, 48))
      return rows({ label: 'Hourly rate', value: rate, format: 'currency', highlight: true })
    },
  }),
  createCalculator({
    slug: 'daily-wage-calculator',
    category: 'salary',
    name: 'Daily Wage Calculator',
    shortDescription: 'Calculate daily wage from monthly salary.',
    longDescription: 'Uses 26-day divisor common in Indian wage calculations.',
    keywords: ['daily wage', 'per day salary'],
    fields: [{ name: 'monthly', label: 'Monthly salary (₹)', type: 'currency', defaultValue: 26000 }],
    formula: 'Daily wage = Monthly / 26',
    formulaExplanation: '26 working-day convention used in many Indian statutes.',
    steps: [],
    examples: [],
    faqs: defaultFaqs('daily wage'),
    relatedSlugs: ['hourly-salary-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const daily = num(v.monthly) / 26
      return rows({ label: 'Daily wage', value: daily, format: 'currency', highlight: true })
    },
  }),
  createCalculator({
    slug: 'overtime-calculator',
    category: 'salary',
    name: 'Overtime Calculator',
    shortDescription: 'Estimate overtime pay with configurable multiplier.',
    longDescription: 'Calculate overtime earnings from hourly rate and extra hours.',
    keywords: ['overtime pay India'],
    fields: [
      { name: 'hourlyRate', label: 'Hourly rate (₹)', type: 'currency', defaultValue: 500 },
      { name: 'hours', label: 'Overtime hours', type: 'number', defaultValue: 10 },
      { name: 'multiplier', label: 'OT multiplier', type: 'number', defaultValue: 2 },
    ],
    formula: 'OT Pay = Hourly rate × Hours × Multiplier',
    formulaExplanation: 'Double-time (2×) is common for factory overtime; verify company policy.',
    steps: [],
    examples: [],
    faqs: defaultFaqs('overtime'),
    relatedSlugs: ['hourly-salary-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const pay = overtimePay(num(v.hourlyRate), num(v.hours), num(v.multiplier, 2))
      return rows({ label: 'Overtime pay', value: pay, format: 'currency', highlight: true })
    },
  }),
  createCalculator({
    slug: 'payroll-calculator',
    category: 'salary',
    name: 'Payroll Calculator',
    shortDescription: 'Net pay from gross and total deductions.',
    longDescription: 'Simple payroll net pay calculation for HR admins.',
    keywords: ['payroll calculator', 'net pay'],
    fields: [
      { name: 'gross', label: 'Gross pay (₹)', type: 'currency', defaultValue: 85000 },
      { name: 'deductions', label: 'Total deductions (₹)', type: 'currency', defaultValue: 15000 },
    ],
    formula: 'Net = Gross − Deductions',
    formulaExplanation: 'Sum all statutory and voluntary deductions before subtracting.',
    steps: [],
    examples: [],
    faqs: defaultFaqs('payroll'),
    relatedSlugs: ['salary-breakdown-calculator'],
    relatedBlogSlugs: ['payroll-processing-guide-india'],
    calculate: (v) => {
      const { net, deductions } = payrollBreakdown(num(v.gross), num(v.deductions))
      return rows(
        { label: 'Deductions', value: deductions, format: 'currency' },
        { label: 'Net pay', value: net, format: 'currency', highlight: true },
      )
    },
  }),
  createCalculator({
    slug: 'salary-breakdown-calculator',
    category: 'salary',
    name: 'Salary Breakdown Calculator',
    shortDescription: 'Split CTC into basic, HRA, and special allowance.',
    longDescription: 'Visualize component-wise monthly salary structure from CTC percentages.',
    keywords: ['salary structure', 'salary components'],
    fields: [
      { name: 'ctc', label: 'Annual CTC (₹)', type: 'currency', defaultValue: 1500000 },
      { name: 'basicPercent', label: 'Basic %', type: 'percent', defaultValue: 40 },
      { name: 'hraPercent', label: 'HRA %', type: 'percent', defaultValue: 20 },
    ],
    formula: 'Special = Monthly CTC − Basic − HRA',
    formulaExplanation: 'Remaining monthly amount allocated to special/other allowances.',
    steps: [],
    examples: [],
    faqs: defaultFaqs('breakdown'),
    relatedSlugs: ['in-hand-salary-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const monthly = num(v.ctc) / 12
      const basic = (monthly * num(v.basicPercent, 40)) / 100
      const hra = (monthly * num(v.hraPercent, 20)) / 100
      const special = monthly - basic - hra
      return rows(
        { label: 'Basic', value: basic, format: 'currency' },
        { label: 'HRA', value: hra, format: 'currency' },
        { label: 'Special allowance', value: special, format: 'currency' },
        { label: 'Monthly total', value: monthly, format: 'currency', highlight: true },
      )
    },
  }),
  createCalculator({
    slug: 'cost-to-company-calculator',
    category: 'salary',
    name: 'Cost To Company Calculator',
    shortDescription: 'Sum employer costs on top of gross salary.',
    longDescription: 'Estimate total employer cost including PF, gratuity provision, and insurance.',
    keywords: ['employer cost', 'CTC components'],
    fields: [
      { name: 'grossAnnual', label: 'Gross annual salary (₹)', type: 'currency', defaultValue: 1000000 },
      { name: 'employerPfPercent', label: 'Employer PF & benefits (%)', type: 'percent', defaultValue: 15 },
    ],
    formula: 'CTC = Gross + (Gross × Employer cost %)',
    formulaExplanation: 'Employer cost % is a bundled assumption for PF, insurance, gratuity accrual.',
    steps: [],
    examples: [],
    faqs: defaultFaqs('CTC'),
    relatedSlugs: ['ctc-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const gross = num(v.grossAnnual)
      const extra = (gross * num(v.employerPfPercent, 15)) / 100
      return rows(
        { label: 'Employer add-ons', value: extra, format: 'currency' },
        { label: 'Total CTC', value: gross + extra, format: 'currency', highlight: true },
      )
    },
  }),
]
