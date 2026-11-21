import { ChevronDown } from 'lucide-react'

export interface FAQItem {
  question: string
  answer: string
}

export interface FaqAccordionProps {
  faqs: FAQItem[]
  title?: string
  description?: string
  className?: string
}

export function FaqAccordion({
  faqs,
  title = 'Frequently Asked Questions',
  description,
  className = '',
}: FaqAccordionProps) {
  if (!faqs || faqs.length === 0) return null

  return (
    <section className={`mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 ${className}`}>
      <h2 className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl dark:text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          {description}
        </p>
      )}

      {/* Answers are rendered as real text within native <details> elements, ensuring full visibility in initial HTML for crawlers */}
      <div className="mt-6 space-y-4">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-xs transition-colors hover:border-primary-300 open:border-primary-300 open:bg-white dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-primary-500/50 dark:open:bg-slate-900"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white focus:outline-hidden">
              <span className="text-base md:text-lg">{faq.question}</span>
              <span className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 transition-transform group-open:rotate-180 dark:bg-slate-800">
                <ChevronDown className="h-4 w-4 text-slate-600 dark:text-slate-300" aria-hidden="true" />
              </span>
            </summary>
            <div className="mt-4 pt-3 border-t border-slate-100 text-sm leading-relaxed text-slate-600 dark:border-slate-800 dark:text-slate-300 md:text-base">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
