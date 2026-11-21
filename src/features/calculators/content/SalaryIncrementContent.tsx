import { Breadcrumb } from '@/components/common/Breadcrumb'
import { FaqAccordion, type FAQItem } from '@/components/common/FaqAccordion'
import { RelatedTools, type RelatedToolItem } from '@/components/common/RelatedTools'
import { LastUpdated } from '@/components/common/LastUpdated'

export const salaryIncrementFaqs: FAQItem[] = [
  {
    question: 'What is a good salary hike percentage during an appraisal or job switch?',
    answer:
      'A typical annual merit salary increment ranges from 7% to 12% for meeting expectations, and 12% to 20% for top performers. During external job transitions, average salary hikes typically range between 20% and 35%, depending on specialized skills, current industry demand, and market compensation benchmarks.',
  },
  {
    question: 'How is a salary hike calculated on CTC versus in-hand salary?',
    answer:
      'Employers calculate increments as a percentage of your total Cost to Company (CTC). However, your monthly in-hand take-home pay does not always increase by that exact percentage because statutory deductions (such as provident fund, social security, and higher progressive income tax brackets) increase alongside your gross earnings.',
  },
  {
    question: 'Does a salary increment affect PF and gratuity?',
    answer:
      'Yes. In structured salary breakdowns, employee and employer contributions to retirement funds (like EPF) and statutory gratuity are calculated as fixed percentages of Basic Salary (and Dearness Allowance, if applicable). When an increment increases your Basic Salary, statutory contributions and long-term gratuity entitlements rise proportionally.',
  },
  {
    question: 'How does a salary hike impact income tax?',
    answer:
      'Because income tax systems operate on progressive marginal tax slabs, the incremental salary portion may fall into a higher tax bracket. As taxable income grows, the effective tax rate increases, which means the monthly net cash received will be slightly lower than the gross hike divided by 12.',
  },
  {
    question: 'What is the difference between an increment and a performance bonus?',
    answer:
      'A salary increment is a permanent increase to your base CTC that compounds across future appraisal cycles and boosts retirement benefits. A performance bonus is a variable, one-time incentive paid for past achievements that does not permanently raise your baseline salary structure.',
  },
  {
    question: 'How often are salary increments granted?',
    answer:
      'Most organizations follow an annual appraisal cycle aligned with their fiscal year (typically effective in April, July, or January). Some high-growth startups and tech firms conduct bi-annual reviews, and off-cycle increments may be granted upon significant internal promotions or role changes.',
  },
]

export const salaryIncrementRelatedTools: RelatedToolItem[] = [
  {
    name: 'NPS Calculator (India)',
    path: '/tools/pf-retirement/nps-calculator',
    description:
      'Estimate your retirement corpus, monthly pension, and tax-free lump sum under the National Pension System following a pay raise.',
    anchorText: 'Project retirement wealth with the NPS Calculator',
  },
  {
    name: 'Gratuity Calculator (India)',
    path: '/tools/pf-retirement/gratuity-calculator',
    description:
      'Determine how your revised basic pay increases your statutory gratuity entitlement under the 15/26 formula.',
    anchorText: 'Calculate updated statutory gratuity benefits',
  },
  {
    name: 'Workforce Cost Calculator',
    path: '/tools/analytics/workforce-cost-calculator',
    description:
      'Help HR and finance teams compute the total fully loaded employer cost of salary increments across teams and departments.',
    anchorText: 'Calculate total workforce cost impact',
  },
]

export function SalaryIncrementContent({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Breadcrumb
        items={[
          { name: 'HR Tools', path: '/hr-tools' },
          { name: 'Salary', path: '/categories/salary' },
          { name: 'Salary Increment Calculator' },
        ]}
      />

      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
          Salary Increment Calculator (Salary Hike %)
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          Determine your revised compensation accurately with our free salary increment calculator. Whether you are preparing for an upcoming annual appraisal, evaluating a job offer, or budgeting compensation changes, this tool lets you calculate your new salary, exact monthly raise, and overall salary hike percentage in seconds without signing up.
        </p>
      </header>

      {/* Interactive Calculator Form */}
      <div className="mb-12">{children}</div>

      {/* Rich SEO Content Sections */}
      <article className="prose prose-slate dark:prose-invert max-w-none space-y-12">
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            How to calculate salary increment percentage
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Calculating a salary increment involves finding the difference between your revised salary and previous salary, expressed as a percentage of the original base compensation:
          </p>
          <div className="my-4 rounded-xl border border-slate-200 bg-slate-100/80 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-200 overflow-x-auto">
            Increment % = [ (New Salary − Old Salary) / Old Salary ] × 100
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Conversely, if your employer awards a fixed percentage raise (for example, a 12% annual merit increase), your new salary is computed by multiplying your current CTC by the increment factor:
          </p>
          <div className="my-4 rounded-xl border border-slate-200 bg-slate-100/80 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-200 overflow-x-auto">
            New Salary = Current CTC × [ 1 + (Increment % / 100) ]
          </div>
          <div className="my-4 rounded-xl border border-slate-200 bg-slate-100/80 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-200 overflow-x-auto">
            Monthly Pay Difference = (New Salary − Current CTC) / 12
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Worked example
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Suppose an employee currently earns an annual compensation of ₹10,00,000 CTC and receives a 15% salary hike during the appraisal cycle:
          </p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-left text-sm border-collapse border border-slate-200 dark:border-slate-800">
              <thead className="bg-slate-100 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="border border-slate-200 dark:border-slate-800 p-3">Metric</th>
                  <th className="border border-slate-200 dark:border-slate-800 p-3">Annual Amount (₹)</th>
                  <th className="border border-slate-200 dark:border-slate-800 p-3">Monthly Equivalent (₹)</th>
                  <th className="border border-slate-200 dark:border-slate-800 p-3">Formula / Explanation</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 dark:text-slate-300">
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Previous Compensation</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-semibold text-slate-900 dark:text-white">₹10,00,000</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-semibold text-slate-900 dark:text-white">₹83,333</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">Base baseline CTC</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Salary Hike Percentage</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-semibold text-slate-900 dark:text-white">15.0%</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">—</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">Agreed appraisal increment</td>
                </tr>
                <tr className="bg-primary-50/50 dark:bg-primary-950/20">
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-bold text-primary-700 dark:text-primary-300">Absolute Increment Amount</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-bold text-primary-700 dark:text-primary-300">₹1,50,000</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-bold text-primary-700 dark:text-primary-300">₹12,500 / month</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">₹10,00,000 × 15%</td>
                </tr>
                <tr className="bg-emerald-50/50 dark:bg-emerald-950/20">
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-bold text-emerald-700 dark:text-emerald-300">New Total Compensation</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-bold text-emerald-700 dark:text-emerald-300">₹11,50,000</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-bold text-emerald-700 dark:text-emerald-300">₹95,833 / month</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">₹10,00,000 + ₹1,50,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Salary hike percentage calculator (reverse calculation)
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            When negotiating job offers or reviewing promotion letters, you are often presented with a flat revised CTC rather than a stated percentage. You can reverse-calculate the exact percentage increase using this step-by-step method:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Step 1:</strong> Identify your existing total annual cost-to-company (e.g., ₹12,00,000).</li>
            <li><strong>Step 2:</strong> Note the newly offered annual compensation (e.g., ₹15,60,000).</li>
            <li><strong>Step 3:</strong> Subtract the current compensation from the new offer to find the absolute hike: ₹15,60,000 − ₹12,00,000 = ₹3,60,000.</li>
            <li><strong>Step 4:</strong> Divide the absolute hike by the old compensation: ₹3,60,000 / ₹12,00,000 = 0.30.</li>
            <li><strong>Step 5:</strong> Multiply by 100 to get your hike percentage: <strong>30.0%</strong>.</li>
          </ol>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Increment vs hike vs appraisal
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Although workplace conversations frequently use these terms interchangeably, they refer to distinct facets of talent management and compensation:
          </p>
          <div className="grid gap-4 md:grid-cols-3 my-4">
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Appraisal</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                The comprehensive annual or semi-annual evaluation process where an employee&apos;s performance, milestones, competencies, and deliverables are reviewed against set organizational objectives.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Salary Increment</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                The formal upward adjustment made to your existing base compensation following an appraisal, promotion, market correction, or cost-of-living adjustment within the same company.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Salary Hike</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                A broader colloquial term denoting any pay increase, most frequently applied to significant external job transitions and counter-offers between distinct employers.
              </p>
            </div>
          </div>
        </section>
      </article>

      {/* Visible FAQ Accordion */}
      <FaqAccordion faqs={salaryIncrementFaqs} />

      {/* Descriptive Related Tools */}
      <RelatedTools tools={salaryIncrementRelatedTools} />

      {/* Last Updated Line */}
      <LastUpdated date="November 2026" isoDate="2026-11-21" />
    </div>
  )
}
