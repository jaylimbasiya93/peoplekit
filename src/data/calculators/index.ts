import type { CalculatorDefinition } from '@/types/calculator'
import { salaryCalculators } from './salary'
import { taxCalculators } from './tax'
import { pfCalculators } from './pf-retirement'
import {
  hrCalculators,
  leaveCalculators,
  recruitmentCalculators,
} from './hr-leave-recruitment'
import { careerCalculators, analyticsCalculators } from './career-analytics'

export const ALL_CALCULATORS: CalculatorDefinition[] = [
  ...salaryCalculators,
  ...taxCalculators,
  ...pfCalculators,
  ...hrCalculators,
  ...leaveCalculators,
  ...recruitmentCalculators,
  ...careerCalculators,
  ...analyticsCalculators,
]

export const CALCULATOR_MAP = new Map(ALL_CALCULATORS.map((c) => [c.slug, c]))

export function getCalculatorBySlug(slug: string): CalculatorDefinition | undefined {
  return CALCULATOR_MAP.get(slug)
}

export function getCalculatorsByCategory(category: string): CalculatorDefinition[] {
  return ALL_CALCULATORS.filter((c) => c.category === category)
}

export function searchCalculators(query: string): CalculatorDefinition[] {
  const q = query.toLowerCase().trim()
  if (!q) return ALL_CALCULATORS
  return ALL_CALCULATORS.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.shortDescription.toLowerCase().includes(q) ||
      c.keywords.some((k) => k.toLowerCase().includes(q)) ||
      c.slug.includes(q)
  )
}

export function getRelatedCalculators(slug: string, limit = 6): CalculatorDefinition[] {
  const calc = getCalculatorBySlug(slug)
  if (!calc) return []
  const related = calc.relatedSlugs
    .map((s) => getCalculatorBySlug(s))
    .filter((c): c is CalculatorDefinition => !!c)
  if (related.length >= limit) return related.slice(0, limit)
  const sameCategory = getCalculatorsByCategory(calc.category).filter((c) => c.slug !== slug)
  return [...related, ...sameCategory].slice(0, limit)
}
