import { Breadcrumb } from '@/components/common/Breadcrumb'
import { FaqAccordion, type FAQItem } from '@/components/common/FaqAccordion'
import { RelatedTools, type RelatedToolItem } from '@/components/common/RelatedTools'
import { LastUpdated } from '@/components/common/LastUpdated'

export const gratuityFaqs: FAQItem[] = [
  {
    question: 'Is gratuity paid on resignation or only on retirement?',
    answer:
      'Yes, gratuity is payable on resignation provided the employee has completed at least 5 years of continuous service with the establishment. Under Section 4(1) of the Payment of Gratuity Act, 1972, gratuity is payable on termination of employment after 5 years of continuous service, whether by superannuation, retirement, resignation, death, or disablement.',
  },
  {
    question: 'Which salary component is used to calculate gratuity—Basic, Gross, or CTC?',
    answer:
      'Under Section 2(s) of the Payment of Gratuity Act, "salary" refers strictly to Last Drawn Basic Salary plus Dearness Allowance (DA). Allowances such as House Rent Allowance (HRA), special allowance, conveyance, bonuses, and commissions are expressly excluded from the gratuity calculation formula.',
  },
  {
    question: 'Is gratuity payable before completing 5 years in case of death or disability?',
    answer:
      'Yes. The mandatory condition of 5 continuous years of service is completely waived under the second proviso to Section 4(1) of the Payment of Gratuity Act if termination of employment is caused by death or permanent disablement due to accident or disease. In case of death, the gratuity amount is paid directly to the employee&apos;s nominee or legal heirs.',
  },
  {
    question: 'Can an employer pay more than the statutory gratuity formula or limit?',
    answer:
      'Yes. Section 4(5) of the Act affirms that nothing shall affect the right of an employee to receive better terms of gratuity under any award, agreement, or contract with the employer. However, while an employer may pay a higher amount ex-gratia, any payment exceeding the statutory tax exemption ceiling of ₹20,00,000 is subject to income tax at the employee&apos;s applicable slab rates.',
  },
  {
    question: 'What happens if an employer delays payment of gratuity?',
    answer:
      'Under Section 7(3A) of the Payment of Gratuity Act, the employer must disburse gratuity within 30 days from the date it becomes payable. If the employer fails to pay within 30 days, they are liable to pay simple interest on the overdue amount at the rate notified by the Central Government (currently 10% per annum) from the expiry of the 30-day period until the actual date of payment.',
  },
  {
    question: 'How is gratuity taxed if it exceeds the statutory exemption limit?',
    answer:
      'Under Section 10(10) of the Income Tax Act, gratuity received by private sector employees covered under the Act is exempt up to the least of: (1) Actual gratuity received, (2) Gratuity calculated under the statutory 15/26 formula, or (3) The statutory ceiling of ₹20,00,000. Any excess amount beyond the exempt limit is added to the employee&apos;s taxable salary income for that financial year and taxed according to their applicable slab rate. Relief under Section 89(1) can be claimed through Form 10E.',
  },
]

export const gratuityRelatedTools: RelatedToolItem[] = [
  {
    name: 'NPS Calculator (India)',
    path: '/tools/pf-retirement/nps-calculator',
    description:
      'Project your National Pension System corpus, tax-free lump sum at age 60, and monthly pension alongside your gratuity payout.',
    anchorText: 'Estimate your National Pension System retirement corpus',
  },
  {
    name: 'Salary Increment Calculator',
    path: '/tools/salary/salary-increment-calculator',
    description:
      'See how salary hikes increase your Basic Salary and future statutory gratuity entitlements.',
    anchorText: 'Calculate salary hike & revised basic pay',
  },
  {
    name: 'Leave Balance Calculator',
    path: '/tools/leave/leave-balance-calculator',
    description:
      'Calculate unutilized earned leave balances and project leave encashment payouts for your full and final settlement.',
    anchorText: 'Calculate leave balance & exit encashment',
  },
]

export function GratuityContent({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Breadcrumb
        items={[
          { name: 'HR Tools', path: '/hr-tools' },
          { name: 'PF & Retirement', path: '/categories/pf-retirement' },
          { name: 'Gratuity Calculator' },
        ]}
      />

      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
          Gratuity Calculator (India)
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          Calculate your statutory retirement gratuity payout accurately under the Payment of Gratuity Act, 1972. Whether you are a private sector employee planning a resignation or retiring after decades of service, this free tool calculates your gratuity amount, eligibility tenure, and tax exemption status in accordance with official Ministry of Labour guidelines.
        </p>
      </header>

      {/* Interactive Calculator Form */}
      <div className="mb-12">{children}</div>

      {/* Rich SEO Content Sections */}
      <article className="prose prose-slate dark:prose-invert max-w-none space-y-12">
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Gratuity calculation formula
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In India, gratuity calculations depend on whether an establishment is covered under the <strong>Payment of Gratuity Act, 1972</strong> (which applies to factories, mines, ports, oilfields, plantations, railway companies, and shops or commercial establishments employing 10 or more persons):
          </p>

          <div className="space-y-6 my-4">
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                1. Employees Covered Under the Act (The 15/26 Formula)
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                For covered employees, gratuity is calculated at the rate of 15 days&apos; last drawn salary for every completed year of service. A month is legally treated as having 26 working days (excluding 4 Sundays):
              </p>
              <div className="my-3 rounded-lg bg-slate-100 dark:bg-slate-800 p-3 font-mono text-sm text-slate-800 dark:text-slate-200 overflow-x-auto">
                Gratuity = (15 × Last Drawn Salary × Completed Years of Service) / 26
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <em>Example:</em> An employee with a last drawn Basic + DA of ₹65,000 who worked for 10 years receives: (15 × 65,000 × 10) / 26 = <strong>₹3,75,000</strong>.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                2. Employees NOT Covered Under the Act (The 15/30 Formula)
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                For organizations not covered under the Act, gratuity is computed based on half a month&apos;s salary (15 days out of a 30-day month) for each completed year of service:
              </p>
              <div className="my-3 rounded-lg bg-slate-100 dark:bg-slate-800 p-3 font-mono text-sm text-slate-800 dark:text-slate-200 overflow-x-auto">
                Gratuity = (15 × Last Drawn Salary × Completed Years of Service) / 30
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <em>Example:</em> An employee with a last drawn Basic + DA of ₹60,000 who worked for 10 years receives: (15 × 60,000 × 10) / 30 = <strong>₹3,00,000</strong>.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Who is eligible for gratuity?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Under Section 4(1) of the Payment of Gratuity Act, an employee becomes eligible for gratuity upon separation from service after rendering at least <strong>5 continuous years of service</strong> with the employer.
          </p>
          <div className="space-y-3 my-4">
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white">Separation Events Qualifying for Gratuity</h3>
              <ul className="mt-2 list-disc pl-5 text-sm space-y-1 text-slate-600 dark:text-slate-300">
                <li>Superannuation (reaching the normal retirement age specified in your employment contract)</li>
                <li>Retirement or voluntary resignation (after 5 continuous years)</li>
                <li>Death or total disablement (the 5-year requirement is fully waived)</li>
                <li>Retrenchment or termination by the employer</li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white">Fixed-Term Employment & Labour Code Reforms</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Under the Code on Social Security, 2020 passed by the Indian Parliament, fixed-term employees (contractual workers hired for a fixed duration) are eligible for gratuity on a <strong>pro-rata basis for each completed year of service (1 year minimum threshold)</strong>, eliminating the traditional 5-year barrier for fixed-term staff.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            How years of service are rounded
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The rounding rule for incomplete service tenure depends on whether the establishment is covered under the Act:
          </p>
          <ul className="list-disc pl-5 space-y-3 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Covered Establishments (The 6-Month Rounding Rule):</strong> Any fractional tenure exceeding 6 months is rounded upwards to the next full year. If you serve 7 years and 7 months, your service is rounded up to <strong>8 years</strong>. If you serve 7 years and 5 months, it is rounded down to <strong>7 years</strong>.
            </li>
            <li>
              <strong>Non-Covered Establishments:</strong> Only fully completed calendar years of continuous service are counted; all fractional months are discarded. An employee with 7 years and 11 months of service is credited with exactly <strong>7 years</strong>.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Gratuity tax exemption limit
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Gratuity taxation in India is governed by Section 10(10) of the Income Tax Act, 1961:
          </p>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Government Employees</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Gratuity received by employees of the Central Government, State Governments, and local authorities is <strong>100% exempt from income tax</strong> without any monetary ceiling.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Private Sector Employees</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                For non-government employees covered under the Act, the tax-exempt amount is the <strong>least</strong> of the following three figures:
              </p>
              <ul className="mt-2 list-disc pl-5 text-xs space-y-1 text-slate-600 dark:text-slate-300">
                <li>Actual gratuity amount received from the employer</li>
                <li>Statutory gratuity calculated under the 15/26 formula</li>
                <li><strong>Statutory maximum ceiling of ₹20,00,000</strong></li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Worked example in ₹
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Here is a realistic worked example for a private company employee retiring or resigning after 12 years and 8 months of service:
          </p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-left text-sm border-collapse border border-slate-200 dark:border-slate-800">
              <thead className="bg-slate-100 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="border border-slate-200 dark:border-slate-800 p-3">Component</th>
                  <th className="border border-slate-200 dark:border-slate-800 p-3">Value</th>
                  <th className="border border-slate-200 dark:border-slate-800 p-3">Notes</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 dark:text-slate-300">
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Last Drawn Basic Salary</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-semibold text-slate-900 dark:text-white">₹70,000</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">Monthly basic salary</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Dearness Allowance (DA)</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-semibold text-slate-900 dark:text-white">₹10,000</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">Included in wage definition</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Total Qualifying Salary (Basic + DA)</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-semibold text-slate-900 dark:text-white">₹80,000 / month</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">Base for 15/26 formula</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Actual Service Duration</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-semibold text-slate-900 dark:text-white">12 years, 8 months</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">Fraction &gt; 6 months</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Recognized Service Tenure</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-semibold text-slate-900 dark:text-white">13 years</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">Rounded up to next full year</td>
                </tr>
                <tr className="bg-primary-50/50 dark:bg-primary-950/20">
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-bold text-primary-700 dark:text-primary-300">Gratuity Payable Amount</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-bold text-primary-700 dark:text-primary-300">₹6,00,000</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">(15 × ₹80,000 × 13) / 26</td>
                </tr>
                <tr className="bg-emerald-50/50 dark:bg-emerald-950/20">
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-bold text-emerald-700 dark:text-emerald-300">Tax Status</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-bold text-emerald-700 dark:text-emerald-300">100% Tax-Free</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Well below ₹20,00,000 ceiling</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Gratuity calculator for private employees
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Private sector employees often question how their gratuity differs from government employees. For private sector personnel:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Employer Obligation:</strong> Under Section 4(7) of the Act, an employer can forfeit gratuity only if an employee has been terminated for riotous or disorderly conduct, acts of violence, or moral turpitude resulting in damage or financial loss to the employer (and only to the extent of the damage). Gratuity cannot be withheld for standard operational disagreements or normal resignation.</li>
            <li><strong>Group Gratuity Schemes:</strong> Most large private corporations purchase group gratuity insurance schemes through LIC, ICICI Prudential, or HDFC Life to fund and protect their accrued gratuity liability.</li>
            <li><strong>Tax Free Settlement:</strong> As long as cumulative lifetime gratuity claims across all employers remain within ₹20,00,000, private employees pay zero tax on this benefit.</li>
          </ul>
        </section>
      </article>

      {/* Visible FAQ Accordion */}
      <FaqAccordion faqs={gratuityFaqs} />

      {/* Descriptive Related Tools */}
      <RelatedTools tools={gratuityRelatedTools} />

      {/* Last Updated Line */}
      <LastUpdated date="November 2026" isoDate="2026-11-21" />
    </div>
  )
}
