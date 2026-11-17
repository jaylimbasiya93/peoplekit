import { Link } from 'react-router-dom'
import { BRAND } from '@/config/brand'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/90 dark:border-slate-800 dark:bg-slate-950/95">
      <div className="section-shell py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-slate-600 dark:text-slate-400">{BRAND.tagline}. Free HR tools, employee calculators, document templates, and workplace resources built to help real people work better.</p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Product</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/tools" className="hover:text-primary-600">All tools</Link></li>
              <li><Link to="/categories" className="hover:text-primary-600">Categories</Link></li>
              <li><Link to="/hr-tools" className="hover:text-primary-600">HR tools</Link></li>
              <li><Link to="/employee-tools" className="hover:text-primary-600">Employee tools</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Resources</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/resources" className="hover:text-primary-600">Guides</Link></li>
              <li><Link to="/blog" className="hover:text-primary-600">Blog</Link></li>
              <li><Link to="/templates" className="hover:text-primary-600">Templates</Link></li>
              <li><Link to="/about" className="hover:text-primary-600">About</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/contact" className="hover:text-primary-600">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-primary-600">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-primary-600">Terms</Link></li>
              <li><Link to="/disclaimer" className="hover:text-primary-600">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} {BRAND.name}. Calculators are estimates and should be reviewed by a qualified professional before legal or financial decisions.
        </p>
      </div>
    </footer>
  )
}
