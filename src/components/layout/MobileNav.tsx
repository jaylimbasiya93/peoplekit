import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

const links = [
  { to: '/', label: 'Home' },
  { to: '/hr-tools', label: 'Calculators' },
  { to: '/employee-tools', label: 'Employee Tools' },
  { to: '/templates', label: 'Templates' },
  { to: '/resources', label: 'Resources' },
  { to: '/categories', label: 'Categories' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
            onClick={onClose}
            aria-hidden
          />
          <motion.nav
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col glass-strong p-6 lg:hidden"
            aria-label="Mobile navigation"
          >
            <button type="button" onClick={onClose} className="self-end p-2" aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
            <ul className="mt-6 space-y-4">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    onClick={onClose}
                    className="text-lg font-medium hover:text-cyan-600"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
