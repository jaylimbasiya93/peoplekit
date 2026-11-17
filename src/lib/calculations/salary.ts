/** India-focused salary calculation helpers (FY 2025-26 oriented estimates) */

export interface InHandInput {
  ctc: number
  basicPercent: number
  hraPercent: number
  pfEmployeePercent: number
  professionalTax: number
  otherDeductions: number
  taxRegime: 'new' | 'old'
  section80C?: number
}

export function calculateInHandSalary(input: InHandInput) {
  const monthlyCtc = input.ctc / 12
  const basic = (monthlyCtc * input.basicPercent) / 100
  const hra = (monthlyCtc * input.hraPercent) / 100
  const special = Math.max(0, monthlyCtc - basic - hra)
  const pfWage = Math.min(basic, 15000)
  const pfEmployee = (pfWage * input.pfEmployeePercent) / 100
  const gross = basic + hra + special
  const annualTaxable = input.ctc - pfEmployee * 12 * 2 // rough employer+employee PF adjustment
  const annualTax = estimateIncomeTax(annualTaxable, input.taxRegime, input.section80C ?? 0)
  const monthlyTax = annualTax / 12
  const net =
    gross -
    pfEmployee -
    input.professionalTax -
    input.otherDeductions -
    monthlyTax

  return {
    monthlyCtc,
    basic,
    hra,
    special,
    gross,
    pfEmployee,
    professionalTax: input.professionalTax,
    monthlyTax,
    net: Math.max(0, net),
    annualNet: Math.max(0, net) * 12,
  }
}

export function estimateIncomeTax(
  taxableIncome: number,
  regime: 'new' | 'old',
  section80C: number
): number {
  let income = taxableIncome
  if (regime === 'old') {
    income = Math.max(0, income - 50000 - Math.min(section80C, 150000))
  } else {
    income = Math.max(0, income - 75000) // standard deduction new regime FY25
  }

  if (regime === 'new') {
    return taxNewRegime(income)
  }
  return taxOldRegime(income)
}

function taxNewRegime(income: number): number {
  const slabs = [
    { upto: 400000, rate: 0 },
    { upto: 800000, rate: 0.05 },
    { upto: 1200000, rate: 0.1 },
    { upto: 1600000, rate: 0.15 },
    { upto: 2000000, rate: 0.2 },
    { upto: 2400000, rate: 0.25 },
    { upto: Infinity, rate: 0.3 },
  ]
  return slabTax(income, slabs)
}

function taxOldRegime(income: number): number {
  const slabs = [
    { upto: 250000, rate: 0 },
    { upto: 500000, rate: 0.05 },
    { upto: 1000000, rate: 0.2 },
    { upto: Infinity, rate: 0.3 },
  ]
  return slabTax(income, slabs)
}

function slabTax(income: number, slabs: { upto: number; rate: number }[]): number {
  let tax = 0
  let prev = 0
  for (const slab of slabs) {
    const taxable = Math.min(income, slab.upto) - prev
    if (taxable <= 0) break
    tax += taxable * slab.rate
    prev = slab.upto
    if (income <= slab.upto) break
  }
  if (income > 1200000) {
    tax += tax * 0.04 // health & education cess
  } else if (tax > 0) {
    tax += tax * 0.04
  }
  return Math.max(0, tax)
}

export function ctcFromInHand(targetInHand: number, multiplier = 1.35): number {
  return targetInHand * 12 * multiplier
}

export function salaryHike(oldCtc: number, newCtc: number) {
  const hikeAmount = newCtc - oldCtc
  const hikePercent = oldCtc > 0 ? (hikeAmount / oldCtc) * 100 : 0
  return { hikeAmount, hikePercent }
}

export function hourlyFromAnnual(annual: number, hoursPerWeek = 48, weeks = 52) {
  const totalHours = hoursPerWeek * weeks
  return annual / totalHours
}

export function overtimePay(hourlyRate: number, hours: number, multiplier = 2) {
  return hourlyRate * hours * multiplier
}

export function payrollBreakdown(gross: number, deductions: number) {
  return { net: gross - deductions, deductions }
}
