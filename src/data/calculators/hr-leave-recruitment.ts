import { createCalculator, num, rows } from './factory'
import {
  attritionRate,
  costPerHire,
  hiringCost,
  leaveBalance,
  leaveEncashment,
  recruitmentROI,
  timeToHire,
  turnoverRate,
  workingDaysBetween,
} from '@/lib/calculations/hr'

export const hrCalculators = [
  createCalculator({
    slug: 'notice-period-calculator',
    category: 'hr',
    name: 'Notice Period Calculator',
    shortDescription: 'Last working day based on notice period days.',
    longDescription: 'Add notice period days from resignation date to find last working day.',
    keywords: ['notice period calculator'],
    fields: [{ name: 'noticeDays', label: 'Notice period (days)', type: 'number', defaultValue: 60 }],
    formula: 'LWD = Resignation date + Notice days',
    formulaExplanation: 'Excludes buy-out negotiations and holidays unless configured.',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['last-working-day-calculator', 'resignation-date-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const end = new Date()
      end.setDate(end.getDate() + num(v.noticeDays, 60))
      return rows({ label: 'Estimated last working day', value: end.toLocaleDateString('en-IN'), format: 'text', highlight: true })
    },
  }),
  createCalculator({
    slug: 'experience-calculator',
    category: 'hr',
    name: 'Experience Calculator',
    shortDescription: 'Total years of experience between two dates.',
    longDescription: 'Compute tenure for resumes and HR records.',
    keywords: ['work experience calculator'],
    fields: [
      { name: 'years', label: 'Years (manual)', type: 'number', defaultValue: 5 },
      { name: 'months', label: 'Additional months', type: 'number', defaultValue: 6 },
    ],
    formula: 'Total = Years + Months/12',
    formulaExplanation: 'For precise dates use joining date tools.',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['joining-date-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const total = num(v.years) + num(v.months) / 12
      return rows({ label: 'Total experience (years)', value: total.toFixed(1), format: 'text', highlight: true })
    },
  }),
  createCalculator({
    slug: 'joining-date-calculator',
    category: 'hr',
    name: 'Joining Date Calculator',
    shortDescription: 'Days until joining from offer acceptance.',
    longDescription: 'Plan onboarding timeline from offer date.',
    keywords: ['joining date'],
    fields: [{ name: 'daysUntilJoin', label: 'Days until joining', type: 'number', defaultValue: 30 }],
    formula: 'Joining = Today + Days',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['probation-period-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const d = new Date()
      d.setDate(d.getDate() + num(v.daysUntilJoin, 30))
      return rows({ label: 'Expected joining date', value: d.toLocaleDateString('en-IN'), format: 'text', highlight: true })
    },
  }),
  createCalculator({
    slug: 'resignation-date-calculator',
    category: 'hr',
    name: 'Resignation Date Calculator',
    shortDescription: 'Back-calculate resignation date for target LWD.',
    longDescription: 'Given notice period and desired last day, estimate resignation submission date.',
    keywords: ['resignation timeline'],
    fields: [
      { name: 'noticeDays', label: 'Notice days', type: 'number', defaultValue: 60 },
      { name: 'daysToLwd', label: 'Days until desired LWD', type: 'number', defaultValue: 60 },
    ],
    formula: 'Resignation = LWD − Notice',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['notice-period-calculator'],
    relatedBlogSlugs: [],
    calculate: () => {
      const resign = new Date()
      return rows({ label: 'Submit resignation by', value: resign.toLocaleDateString('en-IN'), format: 'text', highlight: true })
    },
  }),
  createCalculator({
    slug: 'last-working-day-calculator',
    category: 'hr',
    name: 'Last Working Day Calculator',
    shortDescription: 'Calculate LWD from notice period.',
    longDescription: 'Same as notice period end date calculator.',
    keywords: ['last working day'],
    fields: [{ name: 'noticeDays', label: 'Notice period (days)', type: 'number', defaultValue: 90 }],
    formula: 'LWD = Today + Notice',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['notice-period-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const d = new Date()
      d.setDate(d.getDate() + num(v.noticeDays, 90))
      return rows({ label: 'Last working day', value: d.toLocaleDateString('en-IN'), format: 'text', highlight: true })
    },
  }),
  createCalculator({
    slug: 'probation-period-calculator',
    category: 'hr',
    name: 'Probation Period Calculator',
    shortDescription: 'Confirmation date after probation months.',
    longDescription: 'Add probation duration to joining date offset.',
    keywords: ['probation period'],
    fields: [{ name: 'probationMonths', label: 'Probation (months)', type: 'number', defaultValue: 6 }],
    formula: 'Confirmation = Joining + Probation months',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['confirmation-date-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const d = new Date()
      d.setMonth(d.getMonth() + num(v.probationMonths, 6))
      return rows({ label: 'Expected confirmation', value: d.toLocaleDateString('en-IN'), format: 'text', highlight: true })
    },
  }),
  createCalculator({
    slug: 'confirmation-date-calculator',
    category: 'hr',
    name: 'Confirmation Date Calculator',
    shortDescription: 'Employee confirmation after probation.',
    longDescription: 'HR confirmation timeline from probation length.',
    keywords: ['confirmation date HR'],
    fields: [{ name: 'months', label: 'Months from joining', type: 'number', defaultValue: 6 }],
    formula: 'Confirmation = Joining + months',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['probation-period-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const d = new Date()
      d.setMonth(d.getMonth() + num(v.months, 6))
      return rows({ label: 'Confirmation date', value: d.toLocaleDateString('en-IN'), format: 'text', highlight: true })
    },
  }),
  createCalculator({
    slug: 'attrition-calculator',
    category: 'hr',
    name: 'Attrition Calculator',
    shortDescription: 'Attrition rate from exits and average headcount.',
    longDescription: 'Monthly or annual attrition for HR dashboards.',
    keywords: ['attrition rate formula'],
    fields: [
      { name: 'left', label: 'Employees left', type: 'number', defaultValue: 12 },
      { name: 'avgHeadcount', label: 'Average headcount', type: 'number', defaultValue: 200 },
    ],
    formula: 'Attrition % = (Left / Avg headcount) × 100',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['employee-turnover-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const rate = attritionRate(num(v.left), num(v.avgHeadcount, 200))
      return rows({ label: 'Attrition rate', value: rate, format: 'percent', highlight: true })
    },
  }),
  createCalculator({
    slug: 'headcount-calculator',
    category: 'hr',
    name: 'Headcount Calculator',
    shortDescription: 'Net headcount after hires and exits.',
    longDescription: 'Opening + Hires − Exits = Closing headcount.',
    keywords: ['headcount planning'],
    fields: [
      { name: 'opening', label: 'Opening headcount', type: 'number', defaultValue: 150 },
      { name: 'hires', label: 'New hires', type: 'number', defaultValue: 20 },
      { name: 'exits', label: 'Exits', type: 'number', defaultValue: 8 },
    ],
    formula: 'Closing = Opening + Hires − Exits',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['attrition-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const closing = num(v.opening) + num(v.hires) - num(v.exits)
      return rows({ label: 'Closing headcount', value: closing, format: 'number', highlight: true })
    },
  }),
  createCalculator({
    slug: 'employee-turnover-calculator',
    category: 'hr',
    name: 'Employee Turnover Calculator',
    shortDescription: 'Annualized turnover rate.',
    longDescription: 'Turnover adjusted for period length.',
    keywords: ['turnover rate'],
    fields: [
      { name: 'separations', label: 'Separations', type: 'number', defaultValue: 24 },
      { name: 'avgEmployees', label: 'Avg employees', type: 'number', defaultValue: 200 },
      { name: 'periodMonths', label: 'Period (months)', type: 'number', defaultValue: 12 },
    ],
    formula: 'Turnover = (Sep / Avg) × (12/period) × 100',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['attrition-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const t = turnoverRate(num(v.separations), num(v.avgEmployees, 200), num(v.periodMonths, 12))
      return rows({ label: 'Annualized turnover', value: t, format: 'percent', highlight: true })
    },
  }),
]

export const leaveCalculators = [
  createCalculator({
    slug: 'leave-balance-calculator',
    category: 'leave',
    name: 'Leave Balance Calculator',
    shortDescription: 'Remaining leave after usage and accrual.',
    longDescription: 'Track EL/CL/SL balance for employees.',
    keywords: ['leave balance'],
    fields: [
      { name: 'total', label: 'Annual entitlement', type: 'number', defaultValue: 24 },
      { name: 'used', label: 'Used', type: 'number', defaultValue: 8 },
      { name: 'accrued', label: 'Accrued YTD', type: 'number', defaultValue: 12 },
    ],
    formula: 'Balance = Total − Used + Accrued',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['leave-encashment-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const bal = leaveBalance(num(v.total), num(v.used), num(v.accrued))
      return rows({ label: 'Leave balance', value: bal, format: 'number', highlight: true })
    },
  }),
  createCalculator({
    slug: 'leave-encashment-calculator',
    category: 'leave',
    name: 'Leave Encashment Calculator',
    shortDescription: 'Cash value of unused earned leave.',
    longDescription: 'Encashment on basic using 26-day divisor.',
    keywords: ['leave encashment'],
    fields: [
      { name: 'basic', label: 'Monthly basic (₹)', type: 'currency', defaultValue: 40000 },
      { name: 'days', label: 'Days to encash', type: 'number', defaultValue: 15 },
    ],
    formula: 'Encashment = (Basic/26) × Days',
    formulaExplanation: 'Policy may cap max encashable days.',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['leave-balance-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const amt = leaveEncashment(num(v.basic), num(v.days))
      return rows({ label: 'Encashment amount', value: amt, format: 'currency', highlight: true })
    },
  }),
  createCalculator({
    slug: 'working-days-calculator',
    category: 'leave',
    name: 'Working Days Calculator',
    shortDescription: 'Count working days between two dates.',
    longDescription: 'Excludes weekends by default.',
    keywords: ['working days calculator'],
    fields: [{ name: 'daysRange', label: 'Day range (approx)', type: 'number', defaultValue: 30 }],
    formula: 'Excludes Sat/Sun',
    formulaExplanation: 'Use date pickers in HRIS for exact holidays.',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['holiday-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const start = new Date()
      const end = new Date()
      end.setDate(end.getDate() + num(v.daysRange, 30))
      const days = workingDaysBetween(start, end)
      return rows({ label: 'Working days', value: days, format: 'number', highlight: true })
    },
  }),
  createCalculator({
    slug: 'holiday-calculator',
    category: 'leave',
    name: 'Holiday Calendar Calculator',
    shortDescription: 'Estimate paid holidays in a year.',
    longDescription: 'Plan leave around public holidays.',
    keywords: ['public holidays India'],
    fields: [{ name: 'holidays', label: 'Declared holidays', type: 'number', defaultValue: 12 }],
    formula: 'Net working days = 365 − weekends − holidays',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['working-days-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const net = 365 - 104 - num(v.holidays, 12)
      return rows({ label: 'Approx working days/year', value: net, format: 'number', highlight: true })
    },
  }),
  createCalculator({
    slug: 'vacation-planner',
    category: 'leave',
    name: 'Vacation Planner',
    shortDescription: 'Plan vacation days against leave balance.',
    longDescription: 'See remaining leave after planned vacation.',
    keywords: ['vacation planner'],
    fields: [
      { name: 'balance', label: 'Current balance', type: 'number', defaultValue: 18 },
      { name: 'planned', label: 'Planned days', type: 'number', defaultValue: 10 },
    ],
    formula: 'Remaining = Balance − Planned',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['leave-balance-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const rem = num(v.balance) - num(v.planned)
      return rows({ label: 'Leave after vacation', value: rem, format: 'number', highlight: true })
    },
  }),
  createCalculator({
    slug: 'attendance-calculator',
    category: 'leave',
    name: 'Attendance Calculator',
    shortDescription: 'Attendance percentage for payroll.',
    longDescription: 'Present days / working days × 100.',
    keywords: ['attendance percentage'],
    fields: [
      { name: 'present', label: 'Present days', type: 'number', defaultValue: 22 },
      { name: 'working', label: 'Working days', type: 'number', defaultValue: 23 },
    ],
    formula: 'Attendance % = Present / Working × 100',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['absence-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const pct = num(v.working) > 0 ? (num(v.present) / num(v.working)) * 100 : 0
      return rows({ label: 'Attendance %', value: pct, format: 'percent', highlight: true })
    },
  }),
  createCalculator({
    slug: 'leave-accrual-calculator',
    category: 'leave',
    name: 'Leave Accrual Calculator',
    shortDescription: 'Monthly leave accrual from annual quota.',
    longDescription: 'Accrual = Annual entitlement / 12 per month.',
    keywords: ['leave accrual'],
    fields: [{ name: 'annual', label: 'Annual leave days', type: 'number', defaultValue: 24 }],
    formula: 'Monthly accrual = Annual / 12',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['leave-balance-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const monthly = num(v.annual) / 12
      return rows({ label: 'Accrual per month', value: monthly, format: 'number', highlight: true })
    },
  }),
  createCalculator({
    slug: 'absence-calculator',
    category: 'leave',
    name: 'Absence Calculator',
    shortDescription: 'Absence rate for workforce analytics.',
    longDescription: 'Absent days / total working days.',
    keywords: ['absence rate'],
    fields: [
      { name: 'absent', label: 'Absent days', type: 'number', defaultValue: 3 },
      { name: 'working', label: 'Working days', type: 'number', defaultValue: 22 },
    ],
    formula: 'Absence % = Absent / Working × 100',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['attendance-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const pct = num(v.working) > 0 ? (num(v.absent) / num(v.working)) * 100 : 0
      return rows({ label: 'Absence rate', value: pct, format: 'percent', highlight: true })
    },
  }),
]

export const recruitmentCalculators = [
  createCalculator({
    slug: 'offer-comparison-calculator',
    category: 'recruitment',
    name: 'Offer Comparison Calculator',
    shortDescription: 'Compare two CTC offers side by side.',
    longDescription: 'See absolute and percentage difference between competing offers.',
    keywords: ['offer comparison'],
    fields: [
      { name: 'offerA', label: 'Offer A CTC (₹)', type: 'currency', defaultValue: 1800000 },
      { name: 'offerB', label: 'Offer B CTC (₹)', type: 'currency', defaultValue: 2100000 },
    ],
    formula: 'Diff = B − A',
    formulaExplanation: 'Consider RSUs, benefits, and WFH value separately.',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['salary-negotiation-calculator'],
    relatedBlogSlugs: ['salary-negotiation-tips-india'],
    calculate: (v) => {
      const diff = num(v.offerB) - num(v.offerA)
      const pct = num(v.offerA) > 0 ? (diff / num(v.offerA)) * 100 : 0
      return rows(
        { label: 'Difference (B − A)', value: diff, format: 'currency', highlight: true },
        { label: 'B vs A (%)', value: pct, format: 'percent' },
      )
    },
  }),
  createCalculator({
    slug: 'salary-negotiation-calculator',
    category: 'recruitment',
    name: 'Salary Negotiation Calculator',
    shortDescription: 'Target CTC from desired hike percentage.',
    longDescription: 'Compute counter-offer CTC from current and target hike.',
    keywords: ['salary negotiation'],
    fields: [
      { name: 'current', label: 'Current CTC (₹)', type: 'currency', defaultValue: 1400000 },
      { name: 'targetHike', label: 'Target hike (%)', type: 'percent', defaultValue: 25 },
    ],
    formula: 'Target = Current × (1 + Hike%)',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['offer-comparison-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const target = num(v.current) * (1 + num(v.targetHike, 25) / 100)
      return rows({ label: 'Target CTC', value: target, format: 'currency', highlight: true })
    },
  }),
  createCalculator({
    slug: 'interview-cost-calculator',
    category: 'recruitment',
    name: 'Interview Cost Calculator',
    shortDescription: 'Cost of panel interview hours.',
    longDescription: 'Sum interviewer hours × loaded hourly cost.',
    keywords: ['interview cost'],
    fields: [
      { name: 'hours', label: 'Total panel hours', type: 'number', defaultValue: 12 },
      { name: 'hourlyCost', label: 'Loaded cost / hour (₹)', type: 'currency', defaultValue: 2500 },
    ],
    formula: 'Cost = Hours × Hourly cost',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['hiring-cost-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const cost = num(v.hours) * num(v.hourlyCost)
      return rows({ label: 'Interview cost', value: cost, format: 'currency', highlight: true })
    },
  }),
  createCalculator({
    slug: 'hiring-cost-calculator',
    category: 'recruitment',
    name: 'Hiring Cost Calculator',
    shortDescription: 'Total cost per recruitment campaign.',
    longDescription: 'Agency fees, ads, interviews, and relocation.',
    keywords: ['cost to hire'],
    fields: [
      { name: 'agency', label: 'Recruiter fee (₹)', type: 'currency', defaultValue: 100000 },
      { name: 'ads', label: 'Advertising (₹)', type: 'currency', defaultValue: 20000 },
      { name: 'hours', label: 'Interview hours', type: 'number', defaultValue: 15 },
      { name: 'rate', label: 'Hourly cost (₹)', type: 'currency', defaultValue: 2000 },
    ],
    formula: 'Total = Agency + Ads + Hours × Rate',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['cost-per-hire-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const total = hiringCost(num(v.agency), num(v.ads), num(v.hours), num(v.rate))
      return rows({ label: 'Total hiring cost', value: total, format: 'currency', highlight: true })
    },
  }),
  createCalculator({
    slug: 'recruitment-roi-calculator',
    category: 'recruitment',
    name: 'Recruitment ROI Calculator',
    shortDescription: 'ROI on hiring spend vs revenue attributed.',
    longDescription: '((Revenue − Cost) / Cost) × 100',
    keywords: ['recruitment ROI'],
    fields: [
      { name: 'revenue', label: 'Revenue from hires (₹)', type: 'currency', defaultValue: 5000000 },
      { name: 'cost', label: 'Hiring cost (₹)', type: 'currency', defaultValue: 500000 },
    ],
    formula: 'ROI = ((Rev − Cost) / Cost) × 100',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['hiring-cost-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const roi = recruitmentROI(num(v.revenue), num(v.cost))
      return rows({ label: 'Recruitment ROI', value: roi, format: 'percent', highlight: true })
    },
  }),
  createCalculator({
    slug: 'time-to-hire-calculator',
    category: 'recruitment',
    name: 'Time To Hire Calculator',
    shortDescription: 'Average days to fill roles.',
    longDescription: 'Mean of days-to-fill across requisitions.',
    keywords: ['time to hire'],
    fields: [
      { name: 'd1', label: 'Requisition 1 (days)', type: 'number', defaultValue: 35 },
      { name: 'd2', label: 'Requisition 2 (days)', type: 'number', defaultValue: 42 },
      { name: 'd3', label: 'Requisition 3 (days)', type: 'number', defaultValue: 28 },
    ],
    formula: 'Average of days',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['cost-per-hire-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const avg = timeToHire([num(v.d1), num(v.d2), num(v.d3)])
      return rows({ label: 'Average time to hire', value: avg, format: 'number', highlight: true })
    },
  }),
  createCalculator({
    slug: 'cost-per-hire-calculator',
    category: 'recruitment',
    name: 'Cost Per Hire Calculator',
    shortDescription: 'Divide total recruitment cost by hires.',
    longDescription: 'Standard recruiting efficiency metric.',
    keywords: ['cost per hire'],
    fields: [
      { name: 'totalCost', label: 'Total cost (₹)', type: 'currency', defaultValue: 800000 },
      { name: 'hires', label: 'Number of hires', type: 'number', defaultValue: 4 },
    ],
    formula: 'CPH = Total cost / Hires',
    formulaExplanation: '',
    steps: [],
    examples: [],
    faqs: [],
    relatedSlugs: ['hiring-cost-calculator'],
    relatedBlogSlugs: [],
    calculate: (v) => {
      const cph = costPerHire(num(v.totalCost), num(v.hires))
      return rows({ label: 'Cost per hire', value: cph, format: 'currency', highlight: true })
    },
  }),
]
