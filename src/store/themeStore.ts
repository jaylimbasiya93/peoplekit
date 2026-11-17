import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  resolved: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

function resolveTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return theme
}

function applyTheme(resolved: 'light' | 'dark') {
  document.documentElement.classList.toggle('dark', resolved === 'dark')
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      resolved: 'light',
      setTheme: (theme) => {
        const resolved = resolveTheme(theme)
        applyTheme(resolved)
        set({ theme, resolved })
      },
    }),
    {
      name: 'peoplekit-theme',
      onRehydrateStorage: () => (state) => {
        if (state) {
          const resolved = resolveTheme(state.theme)
          applyTheme(resolved)
          state.resolved = resolved
        }
      },
    }
  )
)

export function initTheme() {
  const { theme, setTheme } = useThemeStore.getState()
  setTheme(theme)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (useThemeStore.getState().theme === 'system') {
      useThemeStore.getState().setTheme('system')
    }
  })
}
