import { useForm } from 'react-hook-form'
import { useMemo } from 'react'
import type { CalculatorDefinition, CalculatorResultRow } from '@/types/calculator'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { formatCurrency, formatPercent, formatNumber } from '@/lib/format'
import { useToastStore } from '@/store/toastStore'

interface CalculatorFormProps {
  calculator: CalculatorDefinition
  onResult?: (rows: CalculatorResultRow[]) => void
}

function formatRow(row: CalculatorResultRow): string {
  if (row.format === 'currency' && typeof row.value === 'number') return formatCurrency(row.value)
  if (row.format === 'percent' && typeof row.value === 'number') return formatPercent(row.value)
  if (row.format === 'number' && typeof row.value === 'number') return formatNumber(row.value)
  return String(row.value)
}

export function CalculatorForm({ calculator, onResult }: CalculatorFormProps) {
  const defaultValues = useMemo(() => {
    const v: Record<string, string | number> = {}
    calculator.fields.forEach((f) => {
      v[f.name] = f.defaultValue ?? (f.type === 'select' ? f.options?.[0]?.value ?? '' : '')
    })
    return v
  }, [calculator])

  const { register, handleSubmit, watch } = useForm({ defaultValues })
  const addToast = useToastStore((s) => s.add)

  const onSubmit = (data: Record<string, string | number>) => {
    const rows = calculator.calculate(data)
    onResult?.(rows)
    addToast('Calculation updated', 'success')
  }

  const liveValues = watch()
  const previewRows = useMemo(() => {
    try {
      return calculator.calculate(liveValues as Record<string, string | number>)
    } catch {
      return []
    }
  }, [calculator, liveValues])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {calculator.fields.map((field) => {
          if (field.type === 'select' && field.options) {
            return (
              <Select
                key={field.name}
                label={field.label}
                options={field.options}
                {...register(field.name)}
              />
            )
          }
          return (
            <Input
              key={field.name}
              label={field.label}
              type={field.type === 'text' ? 'text' : 'number'}
              step={field.step ?? (field.type === 'currency' ? '1' : '0.01')}
              helperText={field.helperText}
              {...register(field.name, { valueAsNumber: field.type !== 'text' })}
            />
          )
        })}
      </div>
      <Button type="submit">Calculate</Button>

      <div
        className="mt-6 rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-violet-500/5 p-4"
        aria-live="polite"
        aria-atomic
      >
        <h3 className="mb-3 font-semibold">Results</h3>
        <dl className="space-y-2">
          {previewRows.map((row) => (
            <div
              key={row.label}
              className={`flex justify-between gap-4 text-sm ${row.highlight ? 'text-lg font-bold text-cyan-600 dark:text-cyan-400' : ''}`}
            >
              <dt className="text-slate-600 dark:text-slate-400">{row.label}</dt>
              <dd className="font-mono font-medium">{formatRow(row)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </form>
  )
}
