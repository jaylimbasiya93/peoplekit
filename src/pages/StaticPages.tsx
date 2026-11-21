import type { ReactNode } from 'react'
import { SeoHead } from '@/components/seo/SeoHead'
import { BRAND } from '@/config/brand'

function StaticLayout({
  title,
  description,
  path,
  children,
}: {
  title: string
  description?: string
  path: string
  children: ReactNode
}) {
  const metaDesc = description || `${title} — free HR calculators and workplace resources from ${BRAND.name}.`

  return (
    <>
      <SeoHead
        title={title}
        description={metaDesc}
        path={path}
        inLanguage="en"
      />
      <div className="mx-auto max-w-3xl px-4 py-12 lg:px-6 prose prose-slate dark:prose-invert">
        <h1>{title}</h1>
        {children}
      </div>
    </>
  )
}

export function AboutPage() {
  return (
    <StaticLayout
      title="About PeopleKit"
      description="Learn about PeopleKit, a privacy-first collection of free HR, payroll, and employee planning calculators."
      path="/about"
    >
      <p>
        <strong>PeopleKit</strong> helps HR teams, managers, employees, and job seekers with practical,
        privacy-first tools for salary, leave, hiring, onboarding, and productivity.
      </p>
      <p>
        We created PeopleKit to make everyday workplace tasks easier without turning people into data
        entry clerks or forcing them into paid software just to calculate a notice period, estimate a
        leave balance, or draft a simple offer or confirmation letter.
      </p>
    </StaticLayout>
  )
}

export function ContactPage() {
  return (
    <StaticLayout
      title="Contact PeopleKit"
      description="Get in touch with the PeopleKit team for feedback, questions, or calculator suggestions."
      path="/contact"
    >
      <p>Reach us at <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> for product feedback, partnership ideas, or corrections.</p>
      <p>We welcome updates on calculator assumptions, usability issues, and missing employee or HR use cases.</p>
    </StaticLayout>
  )
}

export function PrivacyPage() {
  return (
    <StaticLayout
      title="Privacy Policy"
      description="PeopleKit privacy policy: we run calculations locally in your browser with zero data storage."
      path="/privacy"
    >
      <p>PeopleKit runs most calculations directly in the browser. We use local browser storage for preferences such as theme, favorites, and recent tools when available.</p>
      <p>We do not intentionally collect or store employee salary data, personal HR records, or document content unless you explicitly choose to save it locally in your browser.</p>
    </StaticLayout>
  )
}

export function TermsPage() {
  return (
    <StaticLayout
      title="Terms of Service"
      description="PeopleKit terms of service: free informational calculators and templates for workplace use."
      path="/terms"
    >
      <p>PeopleKit provides free tools and templates for general informational use. They are not legal, tax, or compliance advice, and should be reviewed by a qualified professional before making final decisions.</p>
    </StaticLayout>
  )
}

export function DisclaimerPage() {
  return (
    <StaticLayout
      title="Disclaimer"
      description="PeopleKit disclaimer: calculations are estimates and do not constitute formal legal or tax advice."
      path="/disclaimer"
    >
      <p>Our calculators use simplified assumptions and may not reflect local law, employer policy, or jurisdiction-specific rules. Always verify final payroll, leave, tax, and legal documents with the relevant authority or advisor.</p>
    </StaticLayout>
  )
}

export function ChangelogPage() {
  return (
    <StaticLayout
      title="Changelog"
      description="See recent updates and new features added to the PeopleKit HR tool suite."
      path="/changelog"
    >
      <h2>v2.0.0 — PeopleKit redesign</h2>
      <ul>
        <li>Fresh PeopleKit brand identity and SaaS-inspired interface</li>
        <li>Expanded tool discovery pages for HR, employee, templates, and resources</li>
        <li>Improved SEO metadata, sitemap, canonical structure, and page architecture</li>
        <li>Additional practical calculators and employee productivity tools</li>
      </ul>
    </StaticLayout>
  )
}
