import { Breadcrumb } from '@/components/common/Breadcrumb'
import { FaqAccordion, type FAQItem } from '@/components/common/FaqAccordion'
import { RelatedTools, type RelatedToolItem } from '@/components/common/RelatedTools'
import { LastUpdated } from '@/components/common/LastUpdated'

export const npsFaqs: FAQItem[] = [
  {
    question: 'How is the NPS pension calculated?',
    answer:
      'At retirement (age 60), at least 40% of your accumulated National Pension System corpus is used to purchase an annuity from a PFRDA-registered Annuity Service Provider (ASP). The monthly pension depends directly on the annuity amount and the prevailing annuity rate offered by the insurer (typically between 6% and 7% p.a.). For example, an annuity corpus of ₹60,00,000 at a 6.5% annual annuity rate yields approximately ₹32,500 per month.',
  },
  {
    question: 'What is the minimum annuity required at retirement in NPS?',
    answer:
      'Under PFRDA regulations, upon normal exit at age 60, a subscriber must utilize a minimum of 40% of the total accumulated pension wealth to purchase an annuity. The remaining 60% can be withdrawn as a lump sum. However, if your total accumulated corpus is ₹5,00,000 or less, you have the option to withdraw 100% of the corpus as a lump sum without purchasing any annuity.',
  },
  {
    question: 'Are returns in NPS guaranteed?',
    answer:
      'No. The National Pension System is a defined-contribution, market-linked pension scheme. Your contributions are invested across asset classes—Equities (E), Corporate Bonds (C), Government Securities (G), and Alternative Assets (A)—managed by professional Pension Fund Managers. Returns fluctuate with market conditions and are not guaranteed, unlike fixed-rate instruments such as PPF or EPF.',
  },
  {
    question: 'NPS vs PPF vs EPF: Which is better?',
    answer:
      'Each instrument serves distinct goals. EPF is mandatory for formal sector employees (12% basic contribution) offering guaranteed interest (8.25% for FY 2024-25). PPF offers sovereign-guaranteed, tax-free returns (7.1%) with a 15-year tenure. NPS provides market-linked equity upside (up to 75% equity for non-government subscribers), lower fund management charges (under 0.09%), and an exclusive additional tax deduction of ₹50,000 under Section 80CCD(1B). A balanced retirement portfolio typically utilizes EPF/PPF for debt stability and NPS for equity-driven growth.',
  },
  {
    question: 'Can I withdraw 100% of my NPS corpus as a lump sum?',
    answer:
      'Yes, under two specific conditions. First, at normal superannuation (age 60), if your total accumulated pension wealth is ₹5,00,000 or less, you can withdraw 100% as a lump sum. Second, if you exit prematurely before age 60 and your corpus is ₹2,50,000 or less, full withdrawal is permitted. For corpora exceeding these limits, the mandatory annuity rules (40% at age 60, 80% for premature exit) apply.',
  },
  {
    question: 'How are NPS withdrawals and pension taxed in India?',
    answer:
      'The 60% lump sum withdrawal at age 60 is completely exempt from income tax under Section 10(12A) of the Income Tax Act. The 40% portion utilized to purchase an annuity is also exempt from tax at the time of purchase under Section 80CCD(5). However, regular monthly pension payouts received from the annuity insurer are treated as income and taxed at your applicable personal income tax slab rates.',
  },
]

export const npsRelatedTools: RelatedToolItem[] = [
  {
    name: 'Gratuity Calculator (India)',
    path: '/tools/pf-retirement/gratuity-calculator',
    description:
      'Calculate statutory retirement gratuity entitlement under the Payment of Gratuity Act using the 15/26 formula and official eligibility rules.',
    anchorText: 'Estimate your statutory gratuity payout',
  },
  {
    name: 'Salary Increment Calculator',
    path: '/tools/salary/salary-increment-calculator',
    description:
      'Calculate your salary hike percentage, revised monthly pay, and new annual CTC to adjust your monthly retirement contributions.',
    anchorText: 'Calculate salary increment & new CTC',
  },
]

export function NpsContent({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Breadcrumb
        items={[
          { name: 'HR Tools', path: '/hr-tools' },
          { name: 'PF & Retirement', path: '/categories/pf-retirement' },
          { name: 'NPS Calculator' },
        ]}
      />

      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl dark:text-white">
          NPS Calculator (National Pension System, India)
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          The National Pension System (NPS) is a government-sponsored, defined-contribution retirement savings scheme regulated by the Pension Fund Regulatory and Development Authority (PFRDA) in India. In workplace financial planning, NPS stands strictly for the National Pension System—not customer Net Promoter Score—giving salaried and self-employed individuals a disciplined route to accumulate retirement wealth and secure a lifelong monthly pension.
        </p>
      </header>

      {/* Interactive Calculator Form (preserved exactly from existing implementation) */}
      <div className="mb-12">{children}</div>

      {/* Rich SEO Content Sections */}
      <article className="prose prose-slate dark:prose-invert max-w-none space-y-12">
        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            What is NPS?
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The National Pension System (NPS) was originally introduced by the Government of India on January 1, 2004 for newly recruited central government employees (except armed forces), and opened to all Indian citizens aged 18 to 70 on May 1, 2009. Regulated by PFRDA, NPS is designed to foster voluntary long-term savings through systematic contributions during your working years.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Every subscriber receives a unique 12-digit <strong>Permanent Retirement Account Number (PRAN)</strong> that stays constant across employers, locations, and career transitions. Contributions are managed by PFRDA-registered Pension Fund Managers (such as SBI Pension Funds, LIC Pension Fund, and HDFC Pension Management) across transparent asset classes with some of the lowest investment management fees globally.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            How this NPS calculator works
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            This NPS calculator uses a compound monthly annuity formula to model systematic monthly contributions (SIP style) compounded monthly over your investment horizon until age 60:
          </p>
          <div className="my-4 rounded-xl border border-slate-200 bg-slate-100/80 p-4 font-mono text-sm text-slate-800 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-200 overflow-x-auto">
            Corpus = P × [ ( (1 + r)^n - 1 ) / r ] × (1 + r)
          </div>
          <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>P</strong> = Monthly contribution amount (₹)</li>
            <li><strong>r</strong> = Monthly expected rate of return (Annual return % / 12 / 100)</li>
            <li><strong>n</strong> = Total number of monthly contributions (Years until retirement × 12)</li>
          </ul>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Once total accumulated pension wealth is computed, the NPS return calculator splits the final maturity amount into:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
            <li><strong>Lump sum withdrawal (60%):</strong> Completely tax-free cash payout delivered directly to your bank account upon superannuation.</li>
            <li><strong>Annuity reinvestment (40%):</strong> The statutory minimum portion allocated to purchase an annuity that pays your lifelong monthly pension.</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Worked example in ₹
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Consider a 35-year-old professional investing monthly in an NPS Tier 1 account with a target retirement age of 60 years:
          </p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-left text-sm border-collapse border border-slate-200 dark:border-slate-800">
              <thead className="bg-slate-100 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="border border-slate-200 dark:border-slate-800 p-3">Parameter</th>
                  <th className="border border-slate-200 dark:border-slate-800 p-3">Value</th>
                  <th className="border border-slate-200 dark:border-slate-800 p-3">Details</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 dark:text-slate-300">
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Monthly Contribution</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-semibold text-slate-900 dark:text-white">₹10,000</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">Invested every month via auto-debit</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Investment Horizon</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-semibold text-slate-900 dark:text-white">25 years</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">From age 35 to 60 (300 months)</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Total Principal Invested</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-semibold text-slate-900 dark:text-white">₹30,00,000</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">₹10,000 × 300 months</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Expected Annual Return</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-semibold text-slate-900 dark:text-white">10.0% p.a.</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">Moderate equity & corporate bond allocation</td>
                </tr>
                <tr className="bg-primary-50/50 dark:bg-primary-950/20">
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-bold text-primary-700 dark:text-primary-300">Total Accumulated Corpus</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-bold text-primary-700 dark:text-primary-300">₹1,33,78,903</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Interest gains of ₹1.03+ Crore</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Tax-Free Lump Sum (60%)</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-semibold text-slate-900 dark:text-white">₹80,27,342</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">Exempt under Section 10(12A)</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Annuity Allocation (40%)</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-semibold text-slate-900 dark:text-white">₹53,51,561</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">Purchases lifelong monthly annuity</td>
                </tr>
                <tr className="bg-emerald-50/50 dark:bg-emerald-950/20">
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-bold text-emerald-700 dark:text-emerald-300">Estimated Monthly Pension</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-bold text-emerald-700 dark:text-emerald-300">~₹28,988 / month</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">Assuming 6.5% p.a. annuity interest rate</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Lump sum vs annuity at retirement
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Understanding the distinction between lump sum withdrawals and annuity purchases is vital when planning retirement through the NPS pension calculator:
          </p>
          <div className="grid gap-4 md:grid-cols-2 my-4">
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">60% Lump Sum Withdrawal</h3>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li>Received as an immediate single cash transfer at age 60.</li>
                <li><strong>100% tax-free</strong> in the hands of the subscriber under Section 10(12A).</li>
                <li>Can be used to pay off lingering liabilities, fund healthcare contingencies, or invest in other assets.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">40% Minimum Annuity Purchase</h3>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <li>Mandatory statutory minimum allocation; subscribers may opt for a higher annuity percentage (up to 100%).</li>
                <li>Transferred directly to a registered Annuity Service Provider (ASP) tax-free.</li>
                <li>Provides guaranteed monthly income for life, with options for spouse coverage and return of purchase price.</li>
              </ul>
            </div>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-900 dark:border-amber-800/60 dark:bg-amber-950/30 dark:text-amber-200">
            <strong>Important PFRDA exception:</strong> If your total accumulated pension wealth at age 60 is ₹5,00,000 or less, you are not forced into an annuity and may withdraw 100% of your corpus tax-free.
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            Tax benefits of NPS (Section 80CCD)
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            The National Pension System offers a unique three-tier tax deduction architecture under the Indian Income Tax Act:
          </p>
          <div className="space-y-4 my-4">
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white">1. Section 80CCD(1) — Employee Self Contribution</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Salaried employees can claim deductions up to 10% of their salary (Basic + DA), while self-employed individuals can claim up to 20% of their gross total income. This deduction falls under the overall ₹1,50,000 ceiling of Section 80CCE (shared with PPF, EPF, ELSS, and Life Insurance).
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white">2. Section 80CCD(1B) — Exclusive Additional ₹50,000 Deduction</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                An exclusive additional deduction of up to <strong>₹50,000</strong> is available for voluntary contributions into an NPS Tier 1 account over and above the ₹1.5 lakh limit of Section 80C. This deduction is available to individuals opting for the Old Tax Regime, allowing total personal tax deductions of up to ₹2,00,000.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white">3. Section 80CCD(2) — Employer Contribution</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Deductions on employer contributions into an employee&apos;s NPS account up to 10% of salary (Basic + DA) for private sector employees, and up to 14% for Central/State Government employees (and under the New Tax Regime per recent Finance Act provisions). Notably, <strong>Section 80CCD(2) is available in both the Old and New Tax Regimes</strong>, making it one of the most effective corporate tax-saving mechanisms in Indian payroll.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
            NPS Tier 1 vs Tier 2
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Every PRAN holder can maintain two distinct sub-accounts under the National Pension System architecture:
          </p>
          <div className="overflow-x-auto my-4">
            <table className="w-full text-left text-sm border-collapse border border-slate-200 dark:border-slate-800">
              <thead className="bg-slate-100 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="border border-slate-200 dark:border-slate-800 p-3">Feature</th>
                  <th className="border border-slate-200 dark:border-slate-800 p-3 font-semibold">Tier 1 (Retirement Account)</th>
                  <th className="border border-slate-200 dark:border-slate-800 p-3 font-semibold">Tier 2 (Investment Account)</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 dark:text-slate-300">
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Account Nature</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">Mandatory primary pension account</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">Optional voluntary savings facility</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Lock-In Period</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">Locked until age 60 (limited partial withdrawals)</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">No lock-in; open-ended liquidity</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Tax Deductions</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">80CCD(1), 80CCD(1B), and 80CCD(2)</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">None for private citizens (80C only for Central Govt with 3-yr lock-in)</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Withdrawal Rules</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">60% lump sum + 40% annuity at 60</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">100% withdrawable anytime at unit NAV</td>
                </tr>
                <tr>
                  <td className="border border-slate-200 dark:border-slate-800 p-3 font-medium">Minimum Initial Deposit</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">₹500</td>
                  <td className="border border-slate-200 dark:border-slate-800 p-3">₹1,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </article>

      {/* Visible FAQ Accordion (matching visible text and FAQPage schema) */}
      <FaqAccordion faqs={npsFaqs} />

      {/* Descriptive Related Tools Block */}
      <RelatedTools tools={npsRelatedTools} />

      {/* Last Updated Line */}
      <LastUpdated date="November 2026" isoDate="2026-11-21" />
    </div>
  )
}
