import { Link } from 'react-router-dom'
import { Menu, Moon, Sun, Search, Command } from 'lucide-react'
import { Logo } from './Logo'
import { Button } from '@/components/ui/Button'
import { useThemeStore } from '@/store/themeStore'

interface HeaderProps {
  onMenuOpen: () => void
  onSearchOpen: () => void
  onCommandOpen: () => void
}

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/hr-tools', label: 'Calculators' },
  { to: '/employee-tools', label: 'Employee Tools' },
  { to: '/templates', label: 'Templates' },
  { to: '/resources', label: 'Resources' },
]

export function Header({ onMenuOpen, onSearchOpen, onCommandOpen }: HeaderProps) {
  const { resolved, setTheme } = useThemeStore()

  const toggleTheme = () => {
    setTheme(resolved === 'dark' ? 'light' : 'dark')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-950/75">
      <div className="section-shell flex items-center justify-between gap-4 py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-lg p-2 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
            onClick={onMenuOpen}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Logo />
        </div>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-slate-600 transition hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSearchOpen}
            className="hidden rounded-lg p-2 hover:bg-slate-100 sm:flex dark:hover:bg-slate-800"
            aria-label="Search tools"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={onCommandOpen}
            className="hidden items-center gap-1 rounded-lg border border-slate-200 px-2 py-1.5 text-xs font-medium text-slate-500 md:flex dark:border-slate-700 dark:text-slate-300"
            aria-label="Command palette"
          >
            <Command className="h-3.5 w-3.5" />
            <kbd className="font-mono">Ctrl K</kbd>
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label={resolved === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {resolved === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <Link to="/hr-tools" className="hidden sm:block">
            <Button size="sm">Explore tools</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
