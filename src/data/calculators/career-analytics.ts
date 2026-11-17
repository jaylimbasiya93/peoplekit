import { createCalculator, num, rows } from './factory'
import {
  employeeCost,
  hrBudget,
  payrollForecast,
  salaryBenchmark,
  teamSalaryTotal,
} from '@/lib/calculations/analytics'
export const careerCalculators = [
  createCalculator({
    slug: 'experience-letter-generator',
    category: 'career',
    name: 'Experience Letter Generator',
    shortDescription: 'Generate experience certificate draft text.',
    longDescription: 'Create a professional experience letter template for HR—copy and customize.',
    keywords: ['experience letter format'],
    fields: [
      { name: 'employeeName', label: 'Employee name', type: 'text', defaultValue: 'Rahul Sharma' },
      { name: 'designation', label: 'Designation', type: 'text', defaultValue: 'Software Engineer' },
      { name: 'years', label: 'Years worked', type: 'number', defaultValue: 3 },
    ],
    formula: 'N/A — document generator',
    formulaExplanation: 'Outputs formatted letter text.',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['resignation-letter-generator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const text = `This is to certify that ${v.employeeName} worked as ${v.designation} for ${v.years} year(s) with satisfactory conduct.`
      return rows({ label: 'Letter preview', value: text, format: 'text', highlight: true })
    },
  }),
  createCalculator({
    slug: 'resignation-letter-generator',
    category: 'career',
    name: 'Resignation Letter Generator',
    shortDescription: 'Professional resignation letter template.',
    longDescription: 'Draft a formal resignation with notice period mention.',
    keywords: ['resignation letter format'],
    fields: [
      { name: 'name', label: 'Your name', type: 'text', defaultValue: 'Employee Name' },
      { name: 'noticeDays', label: 'Notice period (days)', type: 'number', defaultValue: 60 },
    ],
    formula: 'N/A',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['notice-period-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const text = `Dear Sir/Madam,\n\nI, ${v.name}, hereby resign from my position. I will serve ${v.noticeDays} days notice as per policy.\n\nRegards,\n${v.name}`
      return rows({ label: 'Resignation draft', value: text, format: 'text', highlight: true })
    },
  }),
  createCalculator({
    slug: 'offer-acceptance-letter-generator',
    category: 'career',
    name: 'Offer Acceptance Letter Generator',
    shortDescription: 'Accept job offer formally.',
    longDescription: 'Template to accept offer with joining date.',
    keywords: ['offer acceptance letter'],
    fields: [
      { name: 'name', label: 'Your name', type: 'text', defaultValue: 'Candidate' },
      { name: 'company', label: 'Company', type: 'text', defaultValue: 'Acme Corp' },
    ],
    formula: 'N/A',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['offer-comparison-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const text = `Dear ${v.company},\n\nI am pleased to accept the offer of employment. I look forward to contributing to the team.\n\nSincerely,\n${v.name}`
      return rows({ label: 'Acceptance draft', value: text, format: 'text', highlight: true })
    },
  }),
  createCalculator({
    slug: 'salary-negotiation-letter-generator',
    category: 'career',
    name: 'Salary Negotiation Letter Generator',
    shortDescription: 'Counter-offer email template.',
    longDescription: 'Polite salary negotiation letter with target CTC.',
    keywords: ['salary negotiation email'],
    fields: [
      { name: 'name', label: 'Your name', type: 'text', defaultValue: 'Candidate' },
      { name: 'targetCtc', label: 'Target CTC (₹)', type: 'currency', defaultValue: 2000000 },
    ],
    formula: 'N/A',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['salary-negotiation-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const text = `Based on my experience and market research, I would like to discuss a revised CTC of ₹${num(v.targetCtc).toLocaleString('en-IN')}. Thank you for considering.`
      return rows({ label: 'Negotiation draft', value: text, format: 'text', highlight: true })
    },
  }),
  createCalculator({
    slug: 'career-growth-planner',
    category: 'career',
    name: 'Career Growth Planner',
    shortDescription: 'Target role timeline from current level.',
    longDescription: 'Estimate years to next role based on promotion cycle.',
    keywords: ['career growth plan'],
    fields: [
      { name: 'yearsInRole', label: 'Years in current role', type: 'number', defaultValue: 2 },
      { name: 'avgPromotionCycle', label: 'Avg promotion cycle (years)', type: 'number', defaultValue: 3 },
    ],
    formula: 'Years to promotion = Cycle − Years in role',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['promotion-eligibility-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const remaining = Math.max(0, num(v.avgPromotionCycle, 3) - num(v.yearsInRole))
      return rows({ label: 'Est. years to next promotion', value: remaining, format: 'number', highlight: true })
    },
  }),
  createCalculator({
    slug: 'promotion-eligibility-calculator',
    category: 'career',
    name: 'Promotion Eligibility Calculator',
    shortDescription: 'Check tenure vs policy for promotion.',
    longDescription: 'Compare years of service against minimum promotion tenure.',
    keywords: ['promotion eligibility'],
    fields: [
      { name: 'tenure', label: 'Tenure (years)', type: 'number', defaultValue: 2.5 },
      { name: 'minTenure', label: 'Min tenure required', type: 'number', defaultValue: 2 },
    ],
    formula: 'Eligible if Tenure ≥ Min',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['career-progression-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const eligible = num(v.tenure) >= num(v.minTenure)
      return rows({ label: 'Promotion eligible', value: eligible ? 'Yes' : 'No', format: 'text', highlight: true })
    },
  }),
  createCalculator({
    slug: 'career-progression-calculator',
    category: 'career',
    name: 'Career Progression Calculator',
    shortDescription: 'Salary growth across career levels.',
    longDescription: 'Project CTC after N progression steps with avg hike.',
    keywords: ['career progression salary'],
    fields: [
      { name: 'currentCtc', label: 'Current CTC (₹)', type: 'currency', defaultValue: 1200000 },
      { name: 'steps', label: 'Promotion steps', type: 'number', defaultValue: 3 },
      { name: 'hikePerStep', label: 'Hike per step (%)', type: 'percent', defaultValue: 20 },
    ],
    formula: 'CTCₙ = CTC₀ × (1 + hike%)^n',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['salary-hike-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      let ctc = num(v.currentCtc)
      const steps = num(v.steps, 3)
      const hike = num(v.hikePerStep, 20) / 100
      for (let i = 0; i < steps; i++) ctc *= 1 + hike
      return rows({ label: 'Projected CTC', value: ctc, format: 'currency', highlight: true })
    },
  }),
]

export const analyticsCalculators = [
  createCalculator({
    slug: 'employee-cost-calculator',
    category: 'analytics',
    name: 'Employee Cost Calculator',
    shortDescription: 'Fully loaded employee cost to employer.',
    longDescription: 'Salary plus benefits and overhead percentages.',
    keywords: ['employee cost'],
    fields: [
      { name: 'salary', label: 'Annual salary (₹)', type: 'currency', defaultValue: 1000000 },
      { name: 'benefits', label: 'Benefits (%)', type: 'percent', defaultValue: 18 },
      { name: 'overhead', label: 'Overhead (%)', type: 'percent', defaultValue: 12 },
    ],
    formula: 'Total = Salary + Benefits + Overhead',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['workforce-cost-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const total = employeeCost(num(v.salary), num(v.benefits, 18), num(v.overhead, 12))
      return rows({ label: 'Fully loaded cost', value: total, format: 'currency', highlight: true })
    },
  }),
  createCalculator({
    slug: 'team-salary-calculator',
    category: 'analytics',
    name: 'Team Salary Calculator',
    shortDescription: 'Sum team member salaries.',
    longDescription: 'Enter up to 5 salaries for team budget.',
    keywords: ['team salary budget'],
    fields: [
      { name: 's1', label: 'Salary 1 (₹)', type: 'currency', defaultValue: 1500000 },
      { name: 's2', label: 'Salary 2 (₹)', type: 'currency', defaultValue: 1200000 },
      { name: 's3', label: 'Salary 3 (₹)', type: 'currency', defaultValue: 900000 },
    ],
    formula: 'Total = Σ salaries',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['hr-budget-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const total = teamSalaryTotal([num(v.s1), num(v.s2), num(v.s3)])
      return rows({ label: 'Team salary total', value: total, format: 'currency', highlight: true })
    },
  }),
  createCalculator({
    slug: 'hr-budget-calculator',
    category: 'analytics',
    name: 'HR Budget Calculator',
    shortDescription: 'Annual HR budget from headcount and costs.',
    longDescription: 'Headcount × avg cost + training + tools.',
    keywords: ['HR budget planning'],
    fields: [
      { name: 'headcount', label: 'Headcount', type: 'number', defaultValue: 50 },
      { name: 'avgCost', label: 'Avg cost/employee (₹)', type: 'currency', defaultValue: 1200000 },
      { name: 'training', label: 'Training/head (₹)', type: 'currency', defaultValue: 25000 },
      { name: 'tools', label: 'HR tools (₹)', type: 'currency', defaultValue: 500000 },
    ],
    formula: 'Budget = HC×Avg + HC×Training + Tools',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['payroll-forecast-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const budget = hrBudget(num(v.headcount), num(v.avgCost), num(v.training), num(v.tools))
      return rows({ label: 'HR budget', value: budget, format: 'currency', highlight: true })
    },
  }),
  createCalculator({
    slug: 'workforce-cost-calculator',
    category: 'analytics',
    name: 'Workforce Cost Calculator',
    shortDescription: 'Total workforce spend.',
    longDescription: 'Payroll × loaded cost multiplier.',
    keywords: ['workforce cost'],
    fields: [
      { name: 'payroll', label: 'Annual payroll (₹)', type: 'currency', defaultValue: 50000000 },
      { name: 'multiplier', label: 'Loaded multiplier', type: 'number', defaultValue: 1.25 },
    ],
    formula: 'Workforce cost = Payroll × Multiplier',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['employee-cost-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const cost = num(v.payroll) * num(v.multiplier, 1.25)
      return rows({ label: 'Workforce cost', value: cost, format: 'currency', highlight: true })
    },
  }),
  createCalculator({
    slug: 'compensation-benchmark-calculator',
    category: 'analytics',
    name: 'Compensation Benchmark Calculator',
    shortDescription: 'Compare pay to role median.',
    longDescription: 'See if you are below, at, or above market median.',
    keywords: ['compensation benchmark'],
    fields: [
      { name: 'median', label: 'Role median CTC (₹)', type: 'currency', defaultValue: 1800000 },
      { name: 'salary', label: 'Your CTC (₹)', type: 'currency', defaultValue: 1600000 },
    ],
    formula: 'Diff % = (Your − Median) / Median × 100',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['salary-benchmark-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const b = salaryBenchmark(num(v.median), num(v.salary))
      return rows(
        { label: 'vs median', value: b.percent, format: 'percent' },
        { label: 'Market band', value: b.band, format: 'text', highlight: true },
      )
    },
  }),
  createCalculator({
    slug: 'salary-benchmark-calculator',
    category: 'analytics',
    name: 'Salary Benchmark Calculator',
    shortDescription: 'Percentile estimate from market data input.',
    longDescription: 'Compare salary against P50 and P75 benchmarks you provide.',
    keywords: ['salary benchmark India'],
    fields: [
      { name: 'p50', label: 'P50 (₹)', type: 'currency', defaultValue: 1500000 },
      { name: 'p75', label: 'P75 (₹)', type: 'currency', defaultValue: 2000000 },
      { name: 'yours', label: 'Your CTC (₹)', type: 'currency', defaultValue: 1750000 },
    ],
    formula: 'Position between P50 and P75',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['compensation-benchmark-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const y = num(v.yours)
      const p50 = num(v.p50)
      const p75 = num(v.p75)
      let label = 'Near P50'
      if (y >= p75) label = 'At/above P75'
      else if (y < p50) label = 'Below P50'
      else label = 'Between P50–P75'
      return rows({ label: 'Benchmark position', value: label, format: 'text', highlight: true })
    },
  }),
  createCalculator({
    slug: 'payroll-forecast-calculator',
    category: 'analytics',
    name: 'Payroll Forecast Calculator',
    shortDescription: 'Next-year payroll from growth and hikes.',
    longDescription: 'Forecast payroll with headcount growth and avg hike.',
    keywords: ['payroll forecast'],
    fields: [
      { name: 'currentPayroll', label: 'Current payroll (₹)', type: 'currency', defaultValue: 100000000 },
      { name: 'hcGrowth', label: 'Headcount growth (%)', type: 'percent', defaultValue: 10 },
      { name: 'avgHike', label: 'Avg hike (%)', type: 'percent', defaultValue: 8 },
    ],
    formula: 'Forecast = Payroll × (1+HC%) × (1+Hike%)',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['hr-budget-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const f = payrollForecast(num(v.currentPayroll), num(v.hcGrowth, 10), num(v.avgHike, 8))
      return rows({ label: 'Forecast payroll', value: f, format: 'currency', highlight: true })
    },
  }),
]
