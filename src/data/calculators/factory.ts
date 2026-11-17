import type { CalculatorDefinition, CalculatorResultRow } from '@/types/calculator'
import type { CalculatorCategory } from '@/types/calculator'

type PartialCalc = Omit<CalculatorDefinition, 'id' | 'slug' | 'category'> & {
  slug: string
  category: CalculatorCategory
}

let counter = 0

export function createCalculator(
  partial: PartialCalc & { name: string }
): CalculatorDefinition {
  counter += 1
  const { relatedBlogSlugs = [], relatedSlugs = [], ...rest } = partial
  return {
    id: `calc-${counter}`,
    relatedBlogSlugs,
    relatedSlugs,
    ...rest,
  }
}

export function rows(...items: CalculatorResultRow[]): CalculatorResultRow[] {
  return items
}

export function num(v: unknown, fallback = 0): number {
  const n = typeof v === 'string' ? parseFloat(v) : Number(v)
  return Number.isFinite(n) ? n : fallback
}
