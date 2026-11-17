import { useState, useEffect, type ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { CommandPalette } from '@/features/search/CommandPalette'
import { GlobalSearch } from '@/features/search/GlobalSearch'
import { MobileNav } from './MobileNav'
import { ToastContainer } from '@/components/ui/Toast'
import { initTheme } from '@/store/themeStore'

export function MainLayout({ children }: { children?: ReactNode }) {
  const [commandOpen, setCommandOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileNav, setMobileNav] = useState(false)

  useEffect(() => {
    initTheme()
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        onMenuOpen={() => setMobileNav(true)}
        onSearchOpen={() => setSearchOpen(true)}
        onCommandOpen={() => setCommandOpen(true)}
      />
      <MobileNav open={mobileNav} onClose={() => setMobileNav(false)} />
      <main className="flex-1">{children ?? <Outlet />}</main>
      <Footer />
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      <ToastContainer />
    </div>
  )
}
