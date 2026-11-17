export function epfMaturity(
  monthlyBasic: number,
  employeeRate: number,
  employerRate: number,
  years: number,
  annualInterest = 8.25
) {
  const monthlyEmployee = (monthlyBasic * employeeRate) / 100
  const monthlyEmployer = (monthlyBasic * employerRate) / 100
  const monthlyTotal = monthlyEmployee + monthlyEmployer
  const months = years * 12
  const r = annualInterest / 100 / 12
  const fv = monthlyTotal * ((Math.pow(1 + r, months) - 1) / r) * (1 + r)
  return {
    monthlyEmployee,
    monthlyEmployer,
    totalContribution: monthlyTotal * months,
    maturityAmount: fv,
  }
}

export function ppfMaturity(annualDeposit: number, years: number, rate = 7.1) {
  let balance = 0
  for (let y = 0; y < years; y++) {
    balance = (balance + annualDeposit) * (1 + rate / 100)
  }
  return balance
}

export function gratuity(lastDrawnSalary: number, yearsOfService: number, daysPerYear = 15) {
  const eligibleYears = yearsOfService >= 5 ? yearsOfService : 0
  const amount = (lastDrawnSalary * daysPerYear * eligibleYears) / 26
  return { amount, eligible: yearsOfService >= 5 }
}

export function npsCorpus(
  monthlyContribution: number,
  years: number,
  expectedReturn = 10,
  annuityPercent = 40
) {
  const months = years * 12
  const r = expectedReturn / 100 / 12
  const corpus =
    monthlyContribution * ((Math.pow(1 + r, months) - 1) / r) * (1 + r)
  const lumpsum = corpus * ((100 - annuityPercent) / 100)
  const annuity = corpus * (annuityPercent / 100)
  return { corpus, lumpsum, annuity }
}

export function retirementCorpus(
  currentAge: number,
  retirementAge: number,
  monthlyExpense: number,
  inflation: number,
  _preRetirementReturn: number,
  postRetirementReturn: number
) {
  const yearsToRetire = retirementAge - currentAge
  const months = yearsToRetire * 12
  const inflMonthly = inflation / 100 / 12
  const expenseAtRetirement = monthlyExpense * Math.pow(1 + inflMonthly, months)
  const yearsPost = 25
  const postMonths = yearsPost * 12
  const postR = postRetirementReturn / 100 / 12
  const corpusNeeded =
    expenseAtRetirement *
    ((1 - Math.pow(1 + postR, -postMonths)) / postR) *
    (1 + postR)
  return { corpusNeeded, expenseAtRetirement, yearsToRetire }
}
