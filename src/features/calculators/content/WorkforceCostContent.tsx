import { Breadcrumb } from '@/components/common/Breadcrumb'
import { FaqAccordion, type FAQItem } from '@/components/common/FaqAccordion'
import { RelatedTools, type RelatedToolItem } from '@/components/common/RelatedTools'
import { LastUpdated } from '@/components/common/LastUpdated'

export const workforceCostFaqs: FAQItem[] = [
  {
    question: 'What is the difference between direct payroll cost and total workforce cost?',
    answer:
      'Direct payroll cost covers base wages and salaries paid directly to employees. Total workforce cost—often termed fully loaded labor cost—encompasses base salaries plus statutory employer payroll taxes and social contributions (such as PF, ESI, or FICA), employee health benefits, bonuses, worker insurance, recruitment, onboarding, training, and allocated workspace overheads.',
  },
  {
    question: 'What is a typical workforce cost multiplier over base salary?',
    answer:
      'In most corporate organizations, the fully loaded workforce cost multiplier typically ranges between 1.25× and 1.50× of an employee&apos;s base salary. Lean organizations or remote distributed teams may operate closer to 1.20×, whereas benefits-heavy industries, research laboratories, and enterprise software firms frequently reach 1.40× to 1.60×.',
  },
  {
    question: 'How do employer statutory contributions impact workforce management cost?',
    answer:
      'Statutory mandates represent non-negotiable employer liabilities. In India, for example, employer contributions include 12% toward Employee Provident Fund (EPF), 3.25% for Employee State Insurance (ESI, where applicable), statutory bonus provisions (8.33%), and approximately 4.81% toward long-term gratuity provisioning. Together, statutory compliance can add 15% to 25% on top of cash salary.',
  },
  {
    question: 'Why is workforce cost analysis important for financial planning and hiring?',
    answer:
      'Relying solely on base salaries leads to significant budget deficits. Calculating fully loaded workforce management costs ensures accurate pricing of client projects, realistic burn rate forecasts for startups, sound departmental headcounts, and sustainable financial runway projections before extending job offers.',
  },
  {
    question: 'How can organizations optimize workforce management costs without reducing headcount?',
    answer:
      'Organizations optimize labor expenses by improving employee retention (reducing high recruitment and replacement costs), standardizing automated HR workflows, transitioning to flexible hybrid workspace models to curtail physical real estate overheads, and bundling group insurance plans for corporate economies of scale.',
  },
]

export const workforceCostRelatedTools: RelatedToolItem[] = [
  {
    name: 'Salary Increment Calculator',
    path: '/tools/salary/salary-increment-calculator',
    description:
      'Model the impact of merit appraisal cycles and percentage salary hikes on individual and departmental compensation budgets.',
    anchorText: 'Model salary increment percentage & hike impact',
  },
  {
    name: 'Gratuity Calculator (India)',
    path: '/tools/pf-retirement/gratuity-calculator',
    description:
      'Calculate statutory end-of-service gratuity liabilities to ensure accurate balance sheet provisioning for long-tenure employees.',
    anchorText: 'Calculate statutory gratuity provisioning',
  },
]

export function WorkforceCostContent({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Breadcrumb
        items={[
          { name: 'HR Tools', path: '/hr-tools' },
          { name: 'Analytics', path: '/categories/analytics' },
          { name: 'Workforce Cost Calculator' },
        ]}
      />

      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
          Workforce Cost Calculator
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          Built for HR managers, founders, and finance teams, our free workforce cost calculator determines the true, fully loaded cost of your team. Move beyond simple payroll figures to measure total workforce management costs—including base compensation, employer statutory contributions, healthcare, recruitment, and facility overheads—for smarter headcount budgeting.
        </p>
      </header>

      {/* Interactive Calculator Form */}
      <div className="mb-12">{children}</div>

      {/* Rich SEO Content Sections */}
      <article className="prose prose-slate dark:prose-invert max-w-none space-y-12">
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            What is workforce cost? (Direct vs Indirect)
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Total workforce cost represents the complete expenditure an organization incurs to employ, equip, and retain its staff. In strategic human resource management, workforce expenditures divide into two principal categories:
          </p>

          <div className="grid gap-4 md:grid-cols-2 my-4">
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Direct Labor Costs</h3>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li>Base salaries and hourly contractual wages</li>
                <li>Performance incentives, commissions, and annual bonuses</li>
                <li>Overtime compensation and shift allowances</li>
                <li>Paid time off, vacation days, and statutory public holiday pay</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Indirect Workforce Costs</h3>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li>Employer statutory social security (PF, ESI, gratuity accruals)</li>
                <li>Group medical, dental, life, and accidental insurance premiums</li>
                <li>Recruitment fees, job portal subscriptions, and candidate screening</li>
                <li>L&amp;D programs, software licensing (SaaS tools), and office overheads</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            What to include in workforce cost calculations
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            To build an accurate workforce management cost model, HR and finance leaders must account for seven key expenditure categories:
          </p>
          <div className="space-y-3 my-4">
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white">1. Gross Compensation &amp; Salaries</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                The core contractual cash compensation agreed upon in employee appointment letters.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white">2. Statutory Employer Contributions</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Mandatory government levies. In India, this includes 12% employer Provident Fund (EPF/EPS), 3.25% Employee State Insurance (ESI), and statutory annual bonus allocations.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white">3. Statutory Gratuity Provisioning</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Accrued liability under the Payment of Gratuity Act (calculated approximately at 4.81% of Basic Salary per year of continuous service).
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white">4. Healthcare &amp; Wellness Benefits</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Employer-sponsored group health insurance, term life policies, parental leaves, wellness allowances, and employee assistance programs.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white">5. Talent Acquisition &amp; Onboarding</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Agency placement fees, LinkedIn Recruiter licenses, background verification checks, and initial equipment provisioning.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white">6. Training, Upskilling &amp; Development</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Professional certification stipends, conferences, learning platforms (Coursera, Udemy for Business), and leadership coaching.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white">7. Infrastructure &amp; Workspace Overheads</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Per-seat commercial rent, utilities, workstations, laptop depreciation, cybersecurity tooling, and enterprise SaaS licenses (Slack, Google Workspace, HRMS).
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Workforce management cost formula
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The aggregate organizational formula for total workforce management cost is:
          </p>
          <div className="my-4 rounded-xl border border-slate-200 bg-slate-100/80 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-200 overflow-x-auto">
            Total Workforce Cost = Gross Payroll + Statutory Contributions + Benefits + Overheads + Hiring &amp; Training
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Alternatively, when forecasting multi-year headcount budgets, finance departments apply a <strong>Loaded Labor Multiplier</strong> to baseline payroll:
          </p>
          <div className="my-4 rounded-xl border border-slate-200 bg-slate-100/80 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-200 overflow-x-auto">
            Total Workforce Cost = Gross Annual Payroll × (1 + Benefit % + Overhead %)
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            How to calculate cost per employee
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            To determine the average cost per employee across your organization or within a specific department:
          </p>
          <div className="my-4 rounded-xl border border-slate-200 bg-slate-100/80 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-200 overflow-x-auto">
            Cost Per Employee = Total Workforce Cost / Average Headcount During Period
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Tracking cost per employee alongside <em>Revenue Per Employee (RPE)</em> provides leadership with clear insight into human capital efficiency, operating leverage, and headcount ROI.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Worked example with a table
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The table below demonstrates a fully loaded cost breakdown for a mid-level software engineer with a ₹15,00,000 base annual salary:
          </p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-left text-sm border-collapse border border-slate-200 dark:border-slate-800">
              <thead className="bg-slate-100 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="border border-slate-200 dark:border-slate-800 p-3">Cost Component</th>
                  <th className="border border-slate-200 dark:border-slate-800 p-3">Annual Amount (₹)</th>
                  <th className="border border-slate-200 dark:border-slate-800 p-3">% of Base Salary</th>
                  <th className="border border-slate-200 dark:border-slate-800 p-3">Description</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 dark:text-slate-300">
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-semibold text-slate-900 dark:text-white">Direct Base Salary</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-semibold text-slate-900 dark:text-white">₹15,00,000</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">100.0%</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">Contractual annual base compensation</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Employer PF &amp; Statutory Dues</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">₹72,000</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">4.8%</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">Employer PF contribution (statutory capping)</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Gratuity Provisioning</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">₹28,846</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">1.9%</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">Annual accrual under 15/26 formula</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Group Health &amp; Term Insurance</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">₹45,000</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">3.0%</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">Family floater coverage (₹5 Lakh policy)</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Training, L&amp;D &amp; Software Licenses</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">₹60,000</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">4.0%</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">IDE, cloud credits, learning budget</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Workspace &amp; Equipment Overhead</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">₹1,20,000</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">8.0%</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">Laptop lease, desk space, utilities</td>
                </tr>
                <tr className="bg-primary-50/50 dark:bg-primary-950/20 font-bold">
                  <td className="border border-slate-200 dark:border-slate-800 p-3 text-primary-700 dark:text-primary-300">Total Fully Loaded Cost</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 text-primary-700 dark:text-primary-300">₹18,25,846</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 text-primary-700 dark:text-primary-300">121.7%</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 text-primary-700 dark:text-primary-300">Effective loaded multiplier of ~1.22×</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </article>

      {/* Visible FAQ Accordion */}
      <FaqAccordion faqs={workforceCostFaqs} />

      {/* Descriptive Related Tools */}
      <RelatedTools tools={workforceCostRelatedTools} />

      {/* Last Updated Line */}
      <LastUpdated date="November 2026" isoDate="2026-11-21" />
    </div>
  )
}
