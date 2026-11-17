import { estimateIncomeTax } from './salary'

export function calculateTDS(annualIncome: number, regime: 'new' | 'old', section80C = 0) {
  const tax = estimateIncomeTax(annualIncome, regime, section80C)
  const monthlyTds = tax / 12
  return { annualTax: tax, monthlyTds }
}

export function professionalTax(monthlyGross: number, state: string): number {
  const slabs: Record<string, (g: number) => number> = {
    maharashtra: (g) => (g <= 7500 ? 0 : g <= 10000 ? 175 : 200),
    karnataka: (g) => (g <= 15000 ? 0 : 200),
    westbengal: (g) => (g <= 10000 ? 0 : g <= 15000 ? 110 : 130),
    default: (g) => (g <= 15000 ? 0 : 200),
  }
  const fn = slabs[state.toLowerCase()] ?? slabs.default
  return fn(monthlyGross)
}

export function advanceTax(estimatedAnnualTax: number, paidQuarters: number[]) {
  const totalPaid = paidQuarters.reduce((a, b) => a + b, 0)
  const remaining = Math.max(0, estimatedAnnualTax - totalPaid)
  return { totalPaid, remaining, perQuarter: remaining / 4 }
}

export function surcharge(tax: number, income: number): number {
  if (income > 5000000 && income <= 10000000) return tax * 0.1
  if (income > 10000000 && income <= 20000000) return tax * 0.15
  if (income > 20000000) return tax * 0.25
  return 0
}

export function taxSavingComparison(
  income: number,
  investments80C: number,
  hraExemption = 0,
  homeLoanInterest = 0
) {
  const oldTax = estimateIncomeTax(
    Math.max(0, income - 50000 - Math.min(investments80C, 150000) - hraExemption - homeLoanInterest),
    'old',
    investments80C
  )
  const newTax = estimateIncomeTax(income, 'new', 0)
  return {
    oldRegimeTax: oldTax,
    newRegimeTax: newTax,
    betterRegime: oldTax < newTax ? ('old' as const) : ('new' as const),
    savings: Math.abs(oldTax - newTax),
  }
}
