export function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export function workingDaysBetween(start: Date, end: Date, excludeWeekends = true): number {
  let count = 0
  const cur = new Date(start)
  while (cur <= end) {
    const day = cur.getDay()
    if (!excludeWeekends || (day !== 0 && day !== 6)) count++
    cur.setDate(cur.getDate() + 1)
  }
  return count
}

export function noticePeriodEnd(_joinDate: Date, noticeDays: number): Date {
  return addDays(new Date(), noticeDays)
}

export function experienceYears(joinDate: Date, endDate = new Date()): number {
  const ms = endDate.getTime() - joinDate.getTime()
  return ms / (365.25 * 24 * 60 * 60 * 1000)
}

export function attritionRate(left: number, avgHeadcount: number): number {
  if (avgHeadcount <= 0) return 0
  return (left / avgHeadcount) * 100
}

export function turnoverRate(separations: number, avgEmployees: number, periodMonths = 12) {
  const annualized = (separations / avgEmployees) * (12 / periodMonths) * 100
  return annualized
}

export function leaveEncashment(basic: number, accumulatedDays: number, factor = 1) {
  const daily = basic / 26
  return daily * accumulatedDays * factor
}

export function leaveBalance(total: number, used: number, accrued: number) {
  return total - used + accrued
}

export function hiringCost(
  recruiterFee: number,
  advertising: number,
  interviewHours: number,
  hourlyRate: number,
  relocation = 0
) {
  return recruiterFee + advertising + interviewHours * hourlyRate + relocation
}

export function costPerHire(totalCost: number, hires: number) {
  return hires > 0 ? totalCost / hires : 0
}

export function recruitmentROI(revenueFromHires: number, hiringCost: number) {
  return hiringCost > 0 ? ((revenueFromHires - hiringCost) / hiringCost) * 100 : 0
}

export function timeToHire(days: number[]) {
  if (days.length === 0) return 0
  return days.reduce((a, b) => a + b, 0) / days.length
}
