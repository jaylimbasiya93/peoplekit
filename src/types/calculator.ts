import type { z } from 'zod'

export type CalculatorCategory =
  | 'salary'
  | 'tax'
  | 'pf-retirement'
  | 'hr'
  | 'leave'
  | 'recruitment'
  | 'career'
  | 'analytics'

export interface CalculatorField {
  name: string
  label: string
  type: 'number' | 'select' | 'currency' | 'percent' | 'date' | 'text'
  placeholder?: string
  defaultValue?: string | number
  options?: { label: string; value: string }[]
  min?: number
  max?: number
  step?: number
  helperText?: string
}

export interface CalculatorFAQ {
  question: string
  answer: string
}

export interface CalculatorExample {
  title: string
  inputs: Record<string, number | string>
  outputs: Record<string, number | string>
}

export interface CalculatorStep {
  title: string
  description: string
}

export interface CalculatorResultRow {
  label: string
  value: number | string
  highlight?: boolean
  format?: 'currency' | 'percent' | 'number' | 'text'
}

export interface CalculatorDefinition {
  id: string
  slug: string
  category: CalculatorCategory
  name: string
  shortDescription: string
  longDescription: string
  keywords: string[]
  fields: CalculatorField[]
  formula: string
  formulaExplanation: string
  steps: CalculatorStep[]
  examples: CalculatorExample[]
  faqs: CalculatorFAQ[]
  relatedSlugs: string[]
  relatedBlogSlugs: string[]
  calculate: (values: Record<string, number | string>) => CalculatorResultRow[]
  schema?: z.ZodType
}

export interface CategoryMeta {
  id: CalculatorCategory
  name: string
  description: string
  icon: string
  slug: string
}
