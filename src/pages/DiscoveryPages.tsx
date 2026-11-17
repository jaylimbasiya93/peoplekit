import { useMemo, useState, type ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BriefcaseBusiness, CalendarCheck2, Copy, Download, FileText, ImagePlus, Sparkles, Users } from 'lucide-react'
import { jsPDF } from 'jspdf'
import { SeoHead } from '@/components/seo/SeoHead'
import { ALL_CALCULATORS } from '@/data/calculators'
import { BLOG_POSTS } from '@/data/blog'

type TemplateKey = 'offer' | 'appointment' | 'experience' | 'relieving'

type TemplateValues = {
  companyName: string
  companyAddress: string
  employeeName: string
  employeeEmail: string
  designation: string
  department: string
  managerName: string
  location: string
  joiningDate: string
  offerDate: string
  salary: string
  salaryWords: string
  summary: string
  note: string
  relievingDate: string
  lastWorkingDay: string
}

const hrHighlights = [
  { title: 'Payroll & salary planning', description: 'From CTC to in-hand projections and tax estimates.', slug: '/tools' },
  { title: 'Workforce metrics', description: 'Notice periods, tenure, and headcount planning tools.', slug: '/categories/hr' },
  { title: 'Compliance-ready templates', description: 'Offer, warning, and policy document generators.', slug: '/templates' },
]

const employeeHighlights = [
  { title: 'Leave and attendance', description: 'Track balances, workdays, and attendance patterns.', slug: '/tools?category=leave' },
  { title: 'Career and productivity', description: 'Experience tracking, progress plan, and productivity helpers.', slug: '/tools' },
  { title: 'Personal planning', description: 'Simple tools for dates, hours, and work schedules.', slug: '/categories/leave' },
]

const resourceTopics = [
  'How to calculate in-hand salary in India',
  'CTC vs gross salary vs net salary',
  'How gratuity is calculated in India',
  'How to calculate employee PF',
  'How to calculate leave balance',
  'How to calculate notice period',
]

const templatePresets: Record<
  TemplateKey,
  { title: string; emphasis: string; intro: string; values: TemplateValues }
> = {
  offer: {
    title: 'Offer Letter',
    emphasis: 'Hiring & onboarding',
    intro: 'Professional offer document for a new hire.',
    values: {
      companyName: 'NorthStar Digital Private Limited',
      companyAddress: 'Plot 18, Sector 24, Electronic City Phase II, Bengaluru, Karnataka 560100',
      employeeName: 'Aarav Mehta',
      employeeEmail: 'aarav.mehta@northstardigital.in',
      designation: 'Senior HR Business Partner',
      department: 'People & Culture',
      managerName: 'Nisha Kapoor',
      location: 'Bengaluru',
      joiningDate: '02 December 2026',
      offerDate: '20 November 2026',
      salary: '₹24,00,000 CTC / annum',
      salaryWords: 'Rupees Twenty-Four Lakh Only',
      summary: 'We are pleased to offer you the position of Senior HR Business Partner with NorthStar Digital Private Limited. This letter confirms your role, compensation structure, and joining arrangements.',
      note: 'Your employment will begin on 02 December 2026, subject to successful background verification, document submission, and completion of the onboarding process.',
      relievingDate: '',
      lastWorkingDay: '',
    },
  },
  appointment: {
    title: 'Appointment Letter',
    emphasis: 'Official joining kit',
    intro: 'Formal confirmation of post, documents, and reporting structure.',
    values: {
      companyName: 'ApexStack Technologies Pvt. Ltd.',
      companyAddress: '5th Floor, Horizon Tower, Koramangala, Bengaluru, Karnataka 560095',
      employeeName: 'Vikram Rao',
      employeeEmail: 'vikram.rao@apexstack.in',
      designation: 'Senior Product Manager - HR Systems',
      department: 'Product Engineering',
      managerName: 'Neha Menon',
      location: 'Bengaluru',
      joiningDate: '08 January 2027',
      offerDate: '17 December 2026',
      salary: '₹28,50,000 CTC / annum',
      salaryWords: 'Rupees Twenty-Eight Lakh Fifty Thousand Only',
      summary: 'This appointment letter confirms your employment with ApexStack Technologies Pvt. Ltd. and records your responsibilities, reporting structure, probation period, and compensation arrangements.',
      note: 'You shall be on probation for a period of six months, during which your performance and conduct will be reviewed in line with company policy.',
      relievingDate: '',
      lastWorkingDay: '',
    },
  },
  experience: {
    title: 'Experience Letter',
    emphasis: 'Verification & career proof',
    intro: 'A professional certificate of employment and role history.',
    values: {
      companyName: 'CrestHorizon Consulting India Pvt. Ltd.',
      companyAddress: '14, IT Park Road, Whitefield, Bengaluru, Karnataka 560066',
      employeeName: 'Ishita Verma',
      employeeEmail: 'ishita.verma@cresthorizon.com',
      designation: 'Senior Recruiter',
      department: 'Talent Acquisition',
      managerName: 'Suresh Kulkarni',
      location: 'Bengaluru',
      joiningDate: '04 January 2024',
      offerDate: '',
      salary: '₹18,20,000 CTC / annum',
      salaryWords: 'Rupees Eighteen Lakh Twenty Thousand Only',
      summary: 'This is to certify that Ishita Verma served as Senior Recruiter in the Talent Acquisition team from 04 January 2024 to 30 September 2026, in a dedicated and responsible capacity.',
      note: 'During her tenure, she contributed to hiring operations, employer branding, and candidate management while maintaining professionalism and compliance with company standards.',
      relievingDate: '30 September 2026',
      lastWorkingDay: '30 September 2026',
    },
  },
  relieving: {
    title: 'Relieving Letter',
    emphasis: 'Exit closure & documents',
    intro: 'Formal acceptance of resignation and exit confirmation.',
    values: {
      companyName: 'BluePeak Ventures India Pvt. Ltd.',
      companyAddress: '3rd Floor, 22 Harbor View, Mumbai, Maharashtra 400001',
      employeeName: 'Karan Sethi',
      employeeEmail: 'karan.sethi@bluepeak.in',
      designation: 'Operations Analyst',
      department: 'Operations',
      managerName: 'Priya Iyer',
      location: 'Mumbai',
      joiningDate: '02 August 2022',
      offerDate: '',
      salary: '₹13,80,000 CTC / annum',
      salaryWords: 'Rupees Thirteen Lakh Eighty Thousand Only',
      summary: 'This letter confirms that Karan Sethi has voluntarily resigned from the position of Operations Analyst and that his resignation has been accepted effective 30 November 2026.',
      note: 'All company assets, documentation, and access credentials have been returned, and the notice period has been duly served as per company policy.',
      relievingDate: '30 November 2026',
      lastWorkingDay: '30 November 2026',
    },
  },
}

function CatalogHeader({ title, subtitle, badge }: { title: string; subtitle: string; badge: string }) {
  return (
    <section className="section-shell py-12 md:py-16">
      <div className="glass p-8 md:p-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary-700 dark:border-primary-500/30 dark:bg-primary-500/10 dark:text-primary-300">
          <Sparkles className="h-3.5 w-3.5" />
          {badge}
        </div>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">{subtitle}</p>
      </div>
    </section>
  )
}

export function HrToolsPage() {
  const tools = ALL_CALCULATORS.filter((tool) => ['salary', 'tax', 'pf-retirement', 'hr', 'leave', 'recruitment', 'analytics'].includes(tool.category))

  return (
    <>
      <SeoHead title="HR tools for payroll, hiring, and workforce planning" description="Explore free PeopleKit HR tools for payroll, leave, recruitment, and employee planning." path="/hr-tools" />
      <CatalogHeader title="HR tools built for real teams." subtitle="From CTC and payroll planning to leave, hiring, and performance support, PeopleKit makes everyday HR decisions simpler." badge="HR tools" />
      <section className="section-shell pb-8">
        <div className="grid gap-4 md:grid-cols-3">
          {hrHighlights.map((item) => (
            <div key={item.title} className="glass p-5">
              <BriefcaseBusiness className="h-9 w-9 text-primary-600" />
              <h2 className="mt-4 text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
              <Link to={item.slug} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600">
                Explore <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className="section-shell pb-16">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-bold">Popular HR tools</h2>
          <Link to="/tools" className="text-sm font-semibold text-primary-600">Browse all calculators</Link>
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {tools.slice(0, 18).map((tool) => (
            <Link key={tool.slug} to={`/tools/${tool.category}/${tool.slug}`} className="glass p-4 hover:border-primary-300">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600">{tool.category}</p>
              <h3 className="mt-2 font-semibold">{tool.name}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{tool.shortDescription}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export function EmployeeToolsPage() {
  const tools = ALL_CALCULATORS.filter((tool) => ['hr', 'leave'].includes(tool.category))

  return (
    <>
      <SeoHead title="Employee tools for leave, attendance, and daily work planning" description="Use free PeopleKit employee tools for leave, work hours, dates, and productivity planning." path="/employee-tools" />
      <CatalogHeader title="Employee tools for everyday work." subtitle="Track time, plan leave, calculate notice periods, and make work days easier to understand for both employees and managers." badge="Employee tools" />
      <section className="section-shell pb-8">
        <div className="grid gap-4 md:grid-cols-3">
          {employeeHighlights.map((item) => (
            <div key={item.title} className="glass p-5">
              <Users className="h-9 w-9 text-teal-600" />
              <h2 className="mt-4 text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
              <Link to={item.slug} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600">
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>
      <section className="section-shell pb-16">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {tools.slice(0, 12).map((tool) => (
            <Link key={tool.slug} to={`/tools/${tool.category}/${tool.slug}`} className="glass p-4 hover:border-teal-300">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-600">{tool.category}</p>
                <CalendarCheck2 className="h-4 w-4 text-teal-600" />
              </div>
              <h3 className="mt-2 font-semibold">{tool.name}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{tool.shortDescription}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

export function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('offer')
  const [form, setForm] = useState<TemplateValues>(templatePresets.offer.values)
  const [logo, setLogo] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const selectedPreset = templatePresets[selectedTemplate]

  const documentText = useMemo(() => {
    const lines = [
      `${form.companyName}`,
      `${form.companyAddress}`,
      '',
      `${selectedPreset.title}`,
      `Date: ${form.offerDate || form.joiningDate || '—'}`,
      '',
      `Dear ${form.employeeName},`,
      '',
      form.summary,
      '',
      `Position: ${form.designation}`,
      `Department: ${form.department}`,
      `Reporting Manager: ${form.managerName}`,
      `Location: ${form.location}`,
      `Joining Date: ${form.joiningDate || '—'}`,
      `Compensation: ${form.salary}`,
      `Compensation in Words: ${form.salaryWords}`,
      '',
      form.note,
      '',
      `Sincerely,`,
      `${form.managerName}`,
      `${form.companyName}`,
    ]

    if (selectedTemplate === 'experience' || selectedTemplate === 'relieving') {
      lines.splice(
        11,
        0,
        `Last Working Day: ${form.lastWorkingDay || '—'}`,
        `Relieving Date: ${form.relievingDate || '—'}`
      )
    }

    return lines.join('\n')
  }, [form, selectedTemplate, selectedPreset.title])

  const updateField = (field: keyof TemplateValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSelectTemplate = (key: TemplateKey) => {
    setSelectedTemplate(key)
    setForm(templatePresets[key].values)
  }

  const handleLogoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setLogo(typeof reader.result === 'string' ? reader.result : null)
    reader.readAsDataURL(file)
  }

  const handleDownload = () => {
    const doc = new jsPDF({ unit: 'pt', format: 'a4' })
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 52
    const maxTextWidth = pageWidth - margin * 2
    let y = 64

    doc.setFillColor(249, 250, 251)
    doc.rect(0, 0, pageWidth, pageHeight, 'F')
    doc.setDrawColor(203, 213, 225)
    doc.roundedRect(margin - 8, 26, pageWidth - margin * 2 + 16, pageHeight - 52, 16, 16, 'S')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(22)
    doc.setTextColor(15, 23, 42)
    doc.text(form.companyName, margin, y)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(71, 85, 105)
    doc.text(form.companyAddress, margin, y + 18)

    y += 54
    doc.setDrawColor(226, 232, 240)
    doc.line(margin, y, pageWidth - margin, y)

    y += 24
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(79, 70, 229)
    doc.setFontSize(14)
    doc.text(selectedPreset.title.toUpperCase(), margin, y)

    doc.setFont('helvetica', 'normal')
    doc.setTextColor(51, 65, 85)
    doc.setFontSize(10)
    doc.text(`Date: ${form.offerDate || form.joiningDate || '—'}`, pageWidth - margin - 118, y)

    y += 28
    const blocks = [
      `Dear ${form.employeeName},`,
      '',
      form.summary,
      '',
      `Position: ${form.designation}`,
      `Department: ${form.department}`,
      `Reporting Manager: ${form.managerName}`,
      `Location: ${form.location}`,
      `Joining Date: ${form.joiningDate || '—'}`,
      `Compensation: ${form.salary}`,
      `Compensation in words: ${form.salaryWords}`,
      '',
      form.note,
      '',
      'Regards,',
      form.managerName,
      form.companyName,
    ]

    for (const block of blocks) {
      if (!block) {
        y += 12
        continue
      }

      const lines = doc.splitTextToSize(block, maxTextWidth)
      if (y + lines.length * 16 > pageHeight - margin) {
        doc.addPage()
        y = margin
      }
      doc.text(lines, margin, y)
      y += lines.length * 16 + 4
    }

    const blob = doc.output('blob')
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${selectedPreset.title.toLowerCase().replace(/\s+/g, '-')}-document.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(documentText)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <>
      <SeoHead title="HR templates and document generators" description="Download practical HR templates, offer letters, checklists, and employee document forms from PeopleKit." path="/templates" />
      <CatalogHeader title="HR templates and document tools." subtitle="Create smarter employee documents, onboarding checklists, offer letters, and policy drafts in a format your team can reuse quickly." badge="Templates" />

      <section className="section-shell pb-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Object.entries(templatePresets).map(([key, preset]) => (
            <button
              key={key}
              type="button"
              onClick={() => handleSelectTemplate(key as TemplateKey)}
              className={`rounded-2xl border p-5 text-left transition ${
                selectedTemplate === key
                  ? 'border-primary-300 bg-primary-50 dark:border-primary-500/40 dark:bg-primary-500/10'
                  : 'glass hover:border-primary-300'
              }`}
            >
              <FileText className="h-8 w-8 text-primary-600" />
              <h2 className="mt-4 text-lg font-semibold">{preset.title}</h2>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">{preset.emphasis}</p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{preset.intro}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="section-shell pb-16">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="glass p-5 md:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="font-display text-2xl font-bold">Edit template</h2>
              <div className="flex gap-2">
                <button type="button" onClick={handleCopy} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium dark:border-slate-700 dark:bg-slate-800">
                  <Copy className="h-4 w-4" />
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button type="button" onClick={handleDownload} className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-3 py-2 text-sm font-medium text-white">
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium">Company name</span>
                <input value={form.companyName} onChange={(e) => updateField('companyName', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Company address</span>
                <input value={form.companyAddress} onChange={(e) => updateField('companyAddress', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Employee name</span>
                <input value={form.employeeName} onChange={(e) => updateField('employeeName', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Employee email</span>
                <input value={form.employeeEmail} onChange={(e) => updateField('employeeEmail', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Designation</span>
                <input value={form.designation} onChange={(e) => updateField('designation', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Department</span>
                <input value={form.department} onChange={(e) => updateField('department', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Manager name</span>
                <input value={form.managerName} onChange={(e) => updateField('managerName', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Location</span>
                <input value={form.location} onChange={(e) => updateField('location', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Joining date</span>
                <input value={form.joiningDate} onChange={(e) => updateField('joiningDate', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Offer date</span>
                <input value={form.offerDate} onChange={(e) => updateField('offerDate', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Compensation</span>
                <input value={form.salary} onChange={(e) => updateField('salary', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Compensation in words</span>
                <input value={form.salaryWords} onChange={(e) => updateField('salaryWords', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800" />
              </label>
              {(selectedTemplate === 'experience' || selectedTemplate === 'relieving') && (
                <>
                  <label className="space-y-2">
                    <span className="text-sm font-medium">Relieving date</span>
                    <input value={form.relievingDate} onChange={(e) => updateField('relievingDate', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800" />
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-medium">Last working day</span>
                    <input value={form.lastWorkingDay} onChange={(e) => updateField('lastWorkingDay', e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800" />
                  </label>
                </>
              )}
            </div>

            <label className="mt-4 block space-y-2">
              <span className="text-sm font-medium">Document summary</span>
              <textarea value={form.summary} onChange={(e) => updateField('summary', e.target.value)} rows={4} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800" />
            </label>

            <label className="mt-4 block space-y-2">
              <span className="text-sm font-medium">Additional note</span>
              <textarea value={form.note} onChange={(e) => updateField('note', e.target.value)} rows={4} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800" />
            </label>
          </div>

          <aside className="glass p-5 md:p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-2xl font-bold">Preview</h3>
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium dark:border-slate-700 dark:bg-slate-800">
                <ImagePlus className="h-4 w-4" />
                Upload logo
                <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              </label>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-700">
                <div>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">{form.companyName}</div>
                  <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{form.companyAddress}</div>
                </div>
                {logo ? (
                  <img src={logo} alt="Company logo" className="h-12 w-12 rounded-xl object-cover shadow-sm" />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-dashed border-slate-300 text-[10px] font-semibold uppercase text-slate-400 dark:border-slate-600 dark:text-slate-300">
                    Logo
                  </div>
                )}
              </div>

              <div className="mt-5 space-y-4 text-sm leading-6 text-slate-700 dark:text-slate-200">
                <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-2 dark:border-slate-700">
                  <div className="font-semibold uppercase tracking-[0.14em] text-primary-600">{selectedPreset.title}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{form.offerDate || form.joiningDate || '—'}</div>
                </div>

                <div className="space-y-2">
                  <div><strong>Employee:</strong> {form.employeeName}</div>
                  <div><strong>Email:</strong> {form.employeeEmail}</div>
                  <div><strong>Designation:</strong> {form.designation}</div>
                  <div><strong>Department:</strong> {form.department}</div>
                  <div><strong>Reporting Manager:</strong> {form.managerName}</div>
                  <div><strong>Location:</strong> {form.location}</div>
                  <div><strong>Joining Date:</strong> {form.joiningDate || '—'}</div>
                  <div><strong>Compensation:</strong> {form.salary}</div>
                  <div><strong>Compensation in words:</strong> {form.salaryWords}</div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/70">
                  <p>{form.summary}</p>
                  <p className="mt-3">{form.note}</p>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="font-semibold text-slate-900 dark:text-white">Regards,</div>
                  <div className="mt-2">{form.managerName}</div>
                  <div className="text-xs uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{form.companyName}</div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

export function ResourcesPage() {
  return (
    <>
      <SeoHead title="HR guides, employee resources, and workplace checklists" description="Read practical PeopleKit HR guides on payroll, leave, notice periods, and workplace planning." path="/resources" />
      <CatalogHeader title="Resources for HR and employee planning." subtitle="Useful workplace guides, policy ideas, and practical decision-making resources designed to support better people operations." badge="Resources" />
      <section className="section-shell pb-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {resourceTopics.map((topic, index) => (
            <Link key={topic} to={`/blog`} className="glass p-5 hover:border-primary-300">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-600">Guide {index + 1}</p>
              <h2 className="mt-3 font-semibold">{topic}</h2>
            </Link>
          ))}
        </div>
      </section>
      <section className="section-shell pb-16">
        <h2 className="font-display text-2xl font-bold">Recent article highlights</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {BLOG_POSTS.slice(0, 6).map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="glass p-5 hover:border-primary-300">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{post.category}</p>
              <h3 className="mt-2 font-semibold">{post.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
