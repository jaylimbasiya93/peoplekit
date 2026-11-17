import { createCalculator, num, rows } from './factory'
import {
  advanceTax,
  calculateTDS,
  professionalTax,
  surcharge,
  taxSavingComparison,
} from '@/lib/calculations/tax'
import { estimateIncomeTax } from '@/lib/calculations/salary'

const faqs = [
  {
    question: 'Are tax slabs updated for latest Finance Act?',
    answer: 'PeopleKit uses commonly cited FY 2025-26 slab structures as a planning estimate. Verify with official CBDT notifications before filing.',
  },
]

export const taxCalculators = [
  createCalculator({
    slug: 'income-tax-calculator',
    category: 'tax',
    name: 'Income Tax Calculator',
    shortDescription: 'Estimate annual income tax for India with regime selection.',
    longDescription: 'Calculate approximate income tax liability under new or old regime with standard deductions.',
    keywords: ['income tax calculator India', 'ITR estimate'],
    fields: [
      { name: 'income', label: 'Annual taxable income (₹)', type: 'currency', defaultValue: 1200000 },
      {
        name: 'regime',
        label: 'Regime',
        type: 'select',
        defaultValue: 'new',
        options: [
          { label: 'New', value: 'new' },
          { label: 'Old', value: 'old' },
        ],
      },
      { name: 'section80C', label: '80C investments (old regime)', type: 'currency', defaultValue: 150000 },
    ],
    formula: 'Tax = Slab-wise taxable amount × rates + cess',
    formulaExplanation: 'Old regime allows 80C up to ₹1.5L within overall limits.',
    steps: [],
    examples: [],
    faqs,
    relatedSlugs: ['new-regime-tax-calculator', 'old-regime-tax-calculator', 'tax-comparison-calculator'],
    relatedBlogSlugs: ['income-tax-guide-india-2025'],
    calculate: (v) => {
      const tax = estimateIncomeTax(
        num(v.income),
        (v.regime as 'new' | 'old') || 'new',
        num(v.section80C)
      )
      return rows({ label: 'Estimated annual tax', value: tax, format: 'currency', highlight: true })
    },
  }),
  createCalculator({
    slug: 'new-regime-tax-calculator',
    category: 'tax',
    name: 'New Regime Tax Calculator',
    shortDescription: 'Tax under Section 115BAC new regime slabs.',
    longDescription: 'Dedicated calculator for the simplified new tax regime with updated rebates.',
    keywords: ['new tax regime', '115BAC'],
    fields: [{ name: 'income', label: 'Annual income (₹)', type: 'currency', defaultValue: 1000000 }],
    formula: 'New regime slab rates apply with ₹75k standard deduction (FY25 est.)',
    formulaExplanation: 'Lower rates but fewer deductions vs old regime.',
    steps: [],
    examples: [],
    faqs,
    relatedSlugs: ['income-tax-calculator', 'tax-comparison-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const tax = estimateIncomeTax(num(v.income), 'new', 0)
      return rows({ label: 'Tax (new regime)', value: tax, format: 'currency', highlight: true })
    },
  }),
  createCalculator({
    slug: 'old-regime-tax-calculator',
    category: 'tax',
    name: 'Old Regime Tax Calculator',
    shortDescription: 'Tax with deductions under legacy regime.',
    longDescription: 'For taxpayers claiming 80C, 80D, HRA, and home loan benefits.',
    keywords: ['old tax regime'],
    fields: [
      { name: 'income', label: 'Annual income (₹)', type: 'currency', defaultValue: 1000000 },
      { name: 'section80C', label: '80C (₹)', type: 'currency', defaultValue: 150000 },
    ],
    formula: 'Taxable = Income − Std deduction − min(80C, 1.5L)',
    formulaExplanation: 'Additional chapter VI-A deductions may apply beyond this estimate.',
    steps: [],
    examples: [],
    faqs,
    relatedSlugs: ['income-tax-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const tax = estimateIncomeTax(num(v.income), 'old', num(v.section80C))
      return rows({ label: 'Tax (old regime)', value: tax, format: 'currency', highlight: true })
    },
  }),
  createCalculator({
    slug: 'tds-calculator',
    category: 'tax',
    name: 'TDS Calculator',
    shortDescription: 'Monthly TDS from estimated annual tax.',
    longDescription: 'Spread annual tax liability into monthly TDS for payroll planning.',
    keywords: ['TDS on salary'],
    fields: [
      { name: 'income', label: 'Annual income (₹)', type: 'currency', defaultValue: 1500000 },
      {
        name: 'regime',
        label: 'Regime',
        type: 'select',
        defaultValue: 'new',
        options: [
          { label: 'New', value: 'new' },
          { label: 'Old', value: 'old' },
        ],
      },
    ],
    formula: 'Monthly TDS = Annual tax / 12',
    formulaExplanation: 'Actual TDS may vary with Form 12B and previous employer credits.',
    steps: [],
    examples: [],
    faqs,
    relatedSlugs: ['income-tax-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const r = calculateTDS(num(v.income), (v.regime as 'new' | 'old') || 'new')
      return rows(
        { label: 'Annual tax', value: r.annualTax, format: 'currency' },
        { label: 'Monthly TDS', value: r.monthlyTds, format: 'currency', highlight: true },
      )
    },
  }),
  createCalculator({
    slug: 'professional-tax-calculator',
    category: 'tax',
    name: 'Professional Tax Calculator',
    shortDescription: 'State-wise professional tax estimate on monthly gross.',
    longDescription: 'Approximate PT for Maharashtra, Karnataka, West Bengal and default slab.',
    keywords: ['professional tax India'],
    fields: [
      { name: 'monthlyGross', label: 'Monthly gross (₹)', type: 'currency', defaultValue: 60000 },
      {
        name: 'state',
        label: 'State',
        type: 'select',
        defaultValue: 'maharashtra',
        options: [
          { label: 'Maharashtra', value: 'maharashtra' },
          { label: 'Karnataka', value: 'karnataka' },
          { label: 'West Bengal', value: 'westbengal' },
          { label: 'Other', value: 'default' },
        ],
      },
    ],
    formula: 'PT = State slab lookup(gross)',
    formulaExplanation: 'Maximum PT caps differ by state; February double deduction in MH.',
    steps: [],
    examples: [],
    faqs,
    relatedSlugs: ['in-hand-salary-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const pt = professionalTax(num(v.monthlyGross), String(v.state))
      return rows({ label: 'Professional tax / month', value: pt, format: 'currency', highlight: true })
    },
  }),
  createCalculator({
    slug: 'advance-tax-calculator',
    category: 'tax',
    name: 'Advance Tax Calculator',
    shortDescription: 'Remaining advance tax after quarterly payments.',
    longDescription: 'Plan Q1–Q4 advance tax installments for self-employed and high earners.',
    keywords: ['advance tax India'],
    fields: [
      { name: 'estimatedTax', label: 'Estimated annual tax (₹)', type: 'currency', defaultValue: 200000 },
      { name: 'paidQ1', label: 'Paid Q1 (₹)', type: 'currency', defaultValue: 0 },
      { name: 'paidQ2', label: 'Paid Q2 (₹)', type: 'currency', defaultValue: 0 },
      { name: 'paidQ3', label: 'Paid Q3 (₹)', type: 'currency', defaultValue: 0 },
      { name: 'paidQ4', label: 'Paid Q4 (₹)', type: 'currency', defaultValue: 0 },
    ],
    formula: 'Remaining = Estimated tax − Sum(quarterly payments)',
    formulaExplanation: 'Due dates: 15 Jun, 15 Sep, 15 Dec, 15 Mar (percent rules apply).',
    steps: [],
    examples: [],
    faqs,
    relatedSlugs: ['income-tax-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const r = advanceTax(num(v.estimatedTax), [
        num(v.paidQ1),
        num(v.paidQ2),
        num(v.paidQ3),
        num(v.paidQ4),
      ])
      return rows(
        { label: 'Total paid', value: r.totalPaid, format: 'currency' },
        { label: 'Remaining tax', value: r.remaining, format: 'currency', highlight: true },
        { label: 'Suggested per remaining quarter', value: r.perQuarter, format: 'currency' },
      )
    },
  }),
  createCalculator({
    slug: 'surcharge-calculator',
    category: 'tax',
    name: 'Surcharge Calculator',
    shortDescription: 'Additional surcharge on high income tax.',
    longDescription: 'Estimate surcharge for income above ₹50 lakh.',
    keywords: ['surcharge income tax'],
    fields: [
      { name: 'baseTax', label: 'Base tax (₹)', type: 'currency', defaultValue: 500000 },
      { name: 'income', label: 'Total income (₹)', type: 'currency', defaultValue: 5500000 },
    ],
    formula: 'Surcharge % applied on base tax per income bracket',
    formulaExplanation: '10% / 15% / 25% surcharge tiers for super high incomes.',
    steps: [],
    examples: [],
    faqs,
    relatedSlugs: ['income-tax-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const s = surcharge(num(v.baseTax), num(v.income))
      return rows(
        { label: 'Surcharge amount', value: s, format: 'currency', highlight: true },
        { label: 'Total tax + surcharge', value: num(v.baseTax) + s, format: 'currency' },
      )
    },
  }),
  createCalculator({
    slug: 'tax-saving-calculator',
    category: 'tax',
    name: 'Tax Saving Calculator',
    shortDescription: 'Tax saved via 80C and old-regime deductions.',
    longDescription: 'Compare tax before and after planned deductions under old regime.',
    keywords: ['tax saving 80C'],
    fields: [
      { name: 'income', label: 'Annual income (₹)', type: 'currency', defaultValue: 1500000 },
      { name: 'investments80C', label: '80C investments (₹)', type: 'currency', defaultValue: 150000 },
    ],
    formula: 'Saved = Tax(without) − Tax(with 80C)',
    formulaExplanation: 'Marginal rate determines actual savings.',
    steps: [],
    examples: [],
    faqs,
    relatedSlugs: ['tax-comparison-calculator'],
    relatedBlogSlugs: ['tax-saving-investments-guide'],
    calculate: (v) => {
      const income = num(v.income)
      const inv = num(v.investments80C)
      const without = estimateIncomeTax(income, 'old', 0)
      const withInv = estimateIncomeTax(income, 'old', inv)
      return rows(
        { label: 'Tax without 80C', value: without, format: 'currency' },
        { label: 'Tax with 80C', value: withInv, format: 'currency' },
        { label: 'Tax saved', value: without - withInv, format: 'currency', highlight: true },
      )
    },
  }),
  createCalculator({
    slug: 'tax-comparison-calculator',
    category: 'tax',
    name: 'Tax Comparison Calculator',
    shortDescription: 'Compare old vs new regime tax liability.',
    longDescription: 'See which regime yields lower tax for your income and deductions.',
    keywords: ['old vs new tax regime'],
    fields: [
      { name: 'income', label: 'Annual income (₹)', type: 'currency', defaultValue: 1800000 },
      { name: 'investments80C', label: '80C (₹)', type: 'currency', defaultValue: 150000 },
      { name: 'hraExemption', label: 'HRA exemption (₹)', type: 'currency', defaultValue: 0 },
    ],
    formula: 'Compare taxOld vs taxNew',
    formulaExplanation: 'Includes HRA and 80C impact on old regime estimate.',
    steps: [],
    examples: [],
    faqs,
    relatedSlugs: ['income-tax-calculator'],
    relatedBlogSlugs: ['old-vs-new-tax-regime'],
    calculate: (v) => {
      const r = taxSavingComparison(
        num(v.income),
        num(v.investments80C),
        num(v.hraExemption)
      )
      return rows(
        { label: 'Old regime tax', value: r.oldRegimeTax, format: 'currency' },
        { label: 'New regime tax', value: r.newRegimeTax, format: 'currency' },
        { label: 'Better regime', value: r.betterRegime.toUpperCase(), format: 'text', highlight: true },
        { label: 'Difference', value: r.savings, format: 'currency' },
      )
    },
  }),
]
