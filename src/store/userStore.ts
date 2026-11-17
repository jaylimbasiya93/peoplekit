import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  favorites: string[]
  recent: string[]
  addFavorite: (slug: string) => void
  removeFavorite: (slug: string) => void
  toggleFavorite: (slug: string) => void
  trackRecent: (slug: string) => void
}

const MAX_RECENT = 12

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      favorites: [],
      recent: [],
      addFavorite: (slug) =>
        set((s) => ({
          favorites: s.favorites.includes(slug) ? s.favorites : [...s.favorites, slug],
        })),
      removeFavorite: (slug) =>
        set((s) => ({ favorites: s.favorites.filter((f) => f !== slug) })),
      toggleFavorite: (slug) => {
        const { favorites, addFavorite, removeFavorite } = get()
        if (favorites.includes(slug)) removeFavorite(slug)
        else addFavorite(slug)
      },
      trackRecent: (slug) =>
        set((s) => ({
          recent: [slug, ...s.recent.filter((r) => r !== slug)].slice(0, MAX_RECENT),
        })),
    }),
    { name: 'peoplekit-user' }
  )
)
