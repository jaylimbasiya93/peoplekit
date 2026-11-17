export function employeeCost(
  annualSalary: number,
  benefitsPercent: number,
  overheadPercent: number
) {
  const benefits = (annualSalary * benefitsPercent) / 100
  const overhead = (annualSalary * overheadPercent) / 100
  return annualSalary + benefits + overhead
}

export function teamSalaryTotal(salaries: number[]) {
  return salaries.reduce((a, b) => a + b, 0)
}

export function hrBudget(headcount: number, avgCost: number, trainingPerHead: number, toolsCost: number) {
  return headcount * avgCost + headcount * trainingPerHead + toolsCost
}

export function salaryBenchmark(roleMedian: number, userSalary: number) {
  const diff = userSalary - roleMedian
  const percent = roleMedian > 0 ? (diff / roleMedian) * 100 : 0
  let band: 'below' | 'at' | 'above' = 'at'
  if (percent < -10) band = 'below'
  else if (percent > 10) band = 'above'
  return { diff, percent, band }
}

export function payrollForecast(currentPayroll: number, headcountGrowth: number, avgHike: number) {
  const growthMultiplier = 1 + headcountGrowth / 100
  const hikeMultiplier = 1 + avgHike / 100
  return currentPayroll * growthMultiplier * hikeMultiplier
}
