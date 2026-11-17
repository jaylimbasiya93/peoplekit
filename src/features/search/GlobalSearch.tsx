import { CommandPalette } from './CommandPalette'

interface GlobalSearchProps {
  open: boolean
  onClose: () => void
}

/** Reuses command palette UI for global search */
export function GlobalSearch({ open, onClose }: GlobalSearchProps) {
  return <CommandPalette open={open} onClose={onClose} />
}
