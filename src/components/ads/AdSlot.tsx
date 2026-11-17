import { AD_SLOTS } from '@/config/site'

type AdPlacement = keyof typeof AD_SLOTS

interface AdSlotProps {
  placement: AdPlacement
  className?: string
}

const placementStyles: Record<AdPlacement, string> = {
  header: 'min-h-[90px] w-full',
  sidebar: 'min-h-[250px] w-full sticky top-24',
  inContent: 'min-h-[250px] w-full my-8',
  mobileSticky: 'fixed bottom-0 left-0 right-0 z-40 min-h-[50px] md:hidden',
  footer: 'min-h-[90px] w-full mt-8',
}

/** AdSense-ready placeholder — replace data-ad-slot with your publisher ID */
export function AdSlot({ placement, className = '' }: AdSlotProps) {
  const slotId = AD_SLOTS[placement]

  return (
    <aside
      className={`ad-slot flex items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/50 dark:border-slate-600 dark:bg-slate-800/30 ${placementStyles[placement]} ${className}`}
      aria-label={`Advertisement ${placement}`}
      data-ad-placement={placement}
      data-ad-slot={slotId}
    >
      {/* Google AdSense: uncomment and set client/slot
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXX"
        data-ad-slot="XXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      */}
      <span className="text-xs text-slate-400 uppercase tracking-wider">Ad · {placement}</span>
    </aside>
  )
}
