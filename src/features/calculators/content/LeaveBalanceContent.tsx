import { Breadcrumb } from '@/components/common/Breadcrumb'
import { FaqAccordion, type FAQItem } from '@/components/common/FaqAccordion'
import { RelatedTools, type RelatedToolItem } from '@/components/common/RelatedTools'
import { LastUpdated } from '@/components/common/LastUpdated'

export const leaveBalanceFaqs: FAQItem[] = [
  {
    question: 'How do you calculate leave balance for an employee?',
    answer:
      'To calculate an employee&apos;s leave balance, start with their opening leave balance (carried forward from the previous cycle), add the leave accrued during the current period, and subtract the total days of approved leave taken: Closing Balance = Opening Balance + Leave Accrued − Leave Taken.',
  },
  {
    question: 'How is pro-rata leave calculated for mid-year joiners?',
    answer:
      'Pro-rata leave is calculated by dividing annual leave entitlement by 12 (to find the monthly accrual rate) and multiplying by the remaining months of service in the calendar or fiscal year: Pro-rata Leave = (Annual Entitlement / 12) × Completed or Remaining Months. For example, if annual entitlement is 24 days and an employee joins on July 1 with 6 months remaining, they are credited with (24 / 12) × 6 = 12 days.',
  },
  {
    question: 'What is leave encashment and how is it calculated?',
    answer:
      'Leave encashment is financial compensation paid by an employer for an employee&apos;s unused accumulated paid or earned leaves, typically upon resignation, retirement, or at annual policy year-end. It is generally calculated using daily basic wage: Encashment Payout = (Monthly Basic Salary / 26 or 30) × Unused Encashable Leave Days.',
  },
  {
    question: 'What happens to unused leaves at the end of the year?',
    answer:
      'Depending on internal company HR policies and statutory employment standards, unused leaves are either: (1) carried forward to the subsequent year up to a specified maximum cap, (2) encashed as a cash payment in payroll, or (3) forfeited under a "use-it-or-lose-it" rule (commonly applied to casual or sick leave).',
  },
  {
    question: 'Can sick leave and casual leave be carried forward or encashed?',
    answer:
      'In most organizations and under standard labour jurisdictions, Casual Leave (CL) and Sick Leave (SL) are intended for immediate personal emergencies or medical needs and cannot be carried forward or encashed; they lapse at year-end. Only Earned Leave (EL) or Privilege Leave (PL) is typically eligible for carry-forward and encashment.',
  },
  {
    question: 'Do public holidays or weekends count as part of leave balance?',
    answer:
      'Under standard working-day leave policies, weekends (Saturdays and Sundays) and declared public holidays falling within a leave period do not consume leave credits. However, under "sandwich leave" policies (where an employee takes leave immediately preceding and following a weekend or holiday), some employers count intervening non-working days as leaves.',
  },
]

export const leaveBalanceRelatedTools: RelatedToolItem[] = [
  {
    name: 'Gratuity Calculator (India)',
    path: '/tools/pf-retirement/gratuity-calculator',
    description:
      'Calculate end-of-service statutory retirement gratuity payouts alongside leave encashment during employee exits and full-and-final settlements.',
    anchorText: 'Estimate exit gratuity benefits under Indian law',
  },
  {
    name: 'Workforce Cost Calculator',
    path: '/tools/analytics/workforce-cost-calculator',
    description:
      'Evaluate overall employee costs including paid time off provisions, statutory employer liabilities, and loaded compensation.',
    anchorText: 'Calculate total workforce & employee cost',
  },
]

export function LeaveBalanceContent({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Breadcrumb
        items={[
          { name: 'HR Tools', path: '/hr-tools' },
          { name: 'Leave', path: '/categories/leave' },
          { name: 'Leave Balance Calculator' },
        ]}
      />

      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
          Leave Balance Calculator
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          Our free annual leave calculator helps HR professionals, payroll administrators, and managers accurately track employee leave balances. Calculate available paid time off, monthly leave accruals, carry-forward days, and pro-rata entitlements for new joiners and departing team members with complete transparency.
        </p>
      </header>

      {/* Interactive Calculator Form */}
      <div className="mb-12">{children}</div>

      {/* Rich SEO Content Sections */}
      <article className="prose prose-slate dark:prose-invert max-w-none space-y-12">
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            How to calculate leave balance for an employee
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Maintaining an accurate leave balance for employees requires following a standardized four-step accounting process:
          </p>
          <ol className="list-decimal pl-5 space-y-3 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Determine Opening Balance:</strong> Establish the carried-over leave days from the prior year or accrual period, subject to maximum rollover ceilings established by policy or statute.
            </li>
            <li>
              <strong>Calculate Accrued Leave:</strong> Credit the appropriate quota of paid leave earned during the current period (either upfront on January 1 / April 1, or accrued progressively month-by-month at 1.5 to 2 days per month).
            </li>
            <li>
              <strong>Deduct Approved Leave Taken:</strong> Subtract all utilized and authorized leaves recorded during the current cycle across the respective leave category.
            </li>
            <li>
              <strong>Adjust for Encashment or Forfeiture:</strong> Deduct any leave days monetized during mid-year encashments or expired due to lapse thresholds.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Annual leave calculation
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Annual leave calculation models use the following fundamental balance formula:
          </p>
          <div className="my-4 rounded-xl border border-slate-200 bg-slate-100/80 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-200 overflow-x-auto">
            Available Balance = (Opening Balance + Accrued YTD) − Used Leave
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            For example, if an employee carries over 5 days of earned leave, accrues 18 days over the course of the calendar year (1.5 days per month), and has taken 9 days of vacation to date:
          </p>
          <div className="my-4 rounded-xl border border-slate-200 bg-slate-100/80 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-200 overflow-x-auto">
            Closing Leave Balance = (5 + 18) − 9 = 14 Days Remaining
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Pro-rata leave for new joiners and mid-year leavers
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            When employees do not serve a full calendar or financial year, leave entitlements must be prorated proportionally:
          </p>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">New Joiners (Mid-Year)</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                If an employee joins on September 1 in a company with an annual quota of 24 days (Jan–Dec), they serve 4 months. Their entitlement is:
              </p>
              <div className="mt-3 font-mono text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                (24 / 12) × 4 months = 8 Days
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Resigning Employees (Leavers)</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                If an employee resigns with a last working day of May 31 (5 months served), their accrued leave is:
              </p>
              <div className="mt-3 font-mono text-xs bg-slate-100 dark:bg-slate-800 p-2 rounded-lg">
                (24 / 12) × 5 months = 10 Days
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Any leave taken beyond 10 days is recovered in their Full & Final (FnF) settlement.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Leave carry-forward and encashment
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Managing year-end leave balances involves two key administrative mechanisms:
          </p>
          <ul className="list-disc pl-5 space-y-3 text-slate-600 dark:text-slate-300">
            <li>
              <strong>Carry-Forward Limit:</strong> Companies establish a ceiling on the number of unused Earned Leave days an employee can carry forward into the next year (typically 30, 45, or 60 days). Any balance exceeding the statutory or policy cap is either automatically encashed or forfeited.
            </li>
            <li>
              <strong>Leave Encashment:</strong> Converting accumulated leave days into cash. When calculated during employment or at separation, employers generally compute encashment using monthly basic salary divided by 26 or 30 days:
              <div className="my-2 rounded-lg bg-slate-100 dark:bg-slate-800 p-3 font-mono text-xs">
                Encashment Payout = (Basic Salary / 26) × Encashable Days
              </div>
              Under Indian income tax law, leave encashment received upon retirement or separation by non-government employees is exempt up to ₹25,00,000 under Section 10(10AA) (enhanced from ₹3 lakh by Ministry of Finance notifications).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Types of leave
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Leave policies vary widely across jurisdictions, collective bargaining agreements, and local statutes—such as the Factories Act and state-specific Shops and Commercial Establishments Acts in India. Common categories include:
          </p>
          <div className="grid gap-4 md:grid-cols-3 my-4">
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Earned Leave (EL / PL)</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Also known as Privilege Leave or Annual Leave. Accrued based on days worked (usually 1 day for every 20 working days). Eligible for rollover and encashment.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Casual Leave (CL)</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Provided for unanticipated personal matters, short family errands, or emergencies (typically 7 to 12 days per year). Cannot be encashed or carried forward.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Sick Leave (SL / ML)</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Designed for illness, medical appointments, and recuperation. Often requires medical practitioner certification for absences exceeding 2 to 3 consecutive days.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Worked example with a table
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The following table illustrates an employee&apos;s full-year leave accounting ledger across different leave types:
          </p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-left text-sm border-collapse border border-slate-200 dark:border-slate-800">
              <thead className="bg-slate-100 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="border border-slate-200 dark:border-slate-800 p-3">Leave Category</th>
                  <th className="border border-slate-200 dark:border-slate-800 p-3">Opening Balance</th>
                  <th className="border border-slate-200 dark:border-slate-800 p-3">Annual Quota</th>
                  <th className="border border-slate-200 dark:border-slate-800 p-3">Leaves Taken</th>
                  <th className="border border-slate-200 dark:border-slate-800 p-3">Closing Balance</th>
                  <th className="border border-slate-200 dark:border-slate-800 p-3">Year-End Action</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 dark:text-slate-300">
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-semibold text-slate-900 dark:text-white">Earned Leave (EL)</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">6 days</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">18 days</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">10 days</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-bold text-emerald-600 dark:text-emerald-400">14 days</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">Carried forward to next year</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-semibold text-slate-900 dark:text-white">Casual Leave (CL)</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">0 days</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">8 days</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">6 days</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-bold text-slate-600 dark:text-slate-300">2 days</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">Lapses on Dec 31 (No rollover)</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-semibold text-slate-900 dark:text-white">Sick Leave (SL)</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">0 days</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">10 days</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">4 days</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-bold text-slate-600 dark:text-slate-300">6 days</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">Lapses per standard company policy</td>
                </tr>
                <tr className="bg-primary-50/50 dark:bg-primary-950/20 font-bold">
                  <td className="border border-slate-200 dark:border-slate-800 p-3 text-primary-700 dark:text-primary-300">Total Paid Leave</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 text-primary-700 dark:text-primary-300">6 days</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 text-primary-700 dark:text-primary-300">36 days</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 text-primary-700 dark:text-primary-300">20 days</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 text-primary-700 dark:text-primary-300">22 days</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 text-primary-700 dark:text-primary-300">14 EL rolled over; 8 CL/SL lapse</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </article>

      {/* Visible FAQ Accordion */}
      <FaqAccordion faqs={leaveBalanceFaqs} />

      {/* Descriptive Related Tools */}
      <RelatedTools tools={leaveBalanceRelatedTools} />

      {/* Last Updated Line */}
      <LastUpdated date="November 2026" isoDate="2026-11-21" />
    </div>
  )
}
