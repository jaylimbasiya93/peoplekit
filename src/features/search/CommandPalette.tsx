import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Calculator, FileText } from 'lucide-react'
import { searchCalculators } from '@/data/calculators'
import { searchBlog } from '@/data/blog'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  const tools = searchCalculators(query).slice(0, 6)
  const posts = searchBlog(query).slice(0, 4)

  const go = (path: string) => {
    navigate(path)
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="fixed left-1/2 top-[15%] z-[61] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-2xl glass-strong shadow-2xl"
            role="dialog"
            aria-modal
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-700">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools, blog, categories..."
                className="flex-1 bg-transparent text-lg outline-none"
              />
              <kbd className="hidden rounded border px-1.5 text-xs text-slate-400 sm:inline">ESC</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {tools.length > 0 && (
                <p className="px-2 py-1 text-xs font-semibold uppercase text-slate-500">Calculators</p>
              )}
              {tools.map((t) => (
                <button
                  key={t.slug}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
                  onClick={() => go(`/tools/${t.category}/${t.slug}`)}
                >
                  <Calculator className="h-4 w-4 text-cyan-500" />
                  <span>{t.name}</span>
                </button>
              ))}
              {posts.length > 0 && (
                <p className="mt-2 px-2 py-1 text-xs font-semibold uppercase text-slate-500">Blog</p>
              )}
              {posts.map((p) => (
                <button
                  key={p.slug}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-800"
                  onClick={() => go(`/blog/${p.slug}`)}
                >
                  <FileText className="h-4 w-4 text-violet-500" />
                  <span className="line-clamp-1">{p.title}</span>
                </button>
              ))}
              {!query && (
                <p className="p-4 text-center text-sm text-slate-500">Type to search 68+ tools and 100+ articles</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
