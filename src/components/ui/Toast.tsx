import { useToastStore } from '@/store/toastStore'

export function ToastContainer() {
  const { toasts, remove } = useToastStore()

  return (
    <div
      className="fixed bottom-20 right-4 z-50 flex flex-col gap-2 md:bottom-4"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={`rounded-xl px-4 py-3 text-sm font-medium shadow-lg ${
            t.type === 'error'
              ? 'bg-red-600 text-white'
              : t.type === 'success'
                ? 'bg-emerald-600 text-white'
                : 'glass-strong'
          }`}
        >
          <button type="button" className="w-full text-left" onClick={() => remove(t.id)}>
            {t.message}
          </button>
        </div>
      ))}
    </div>
  )
}
