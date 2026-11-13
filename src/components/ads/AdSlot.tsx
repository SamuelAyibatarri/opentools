interface AdSlotProps {
  id: string
  className?: string
}

/**
 * Reserved, fixed-height ad band. The fixed min-height prevents
 * Cumulative Layout Shift when AdSense fills the slot late.
 * Rendered as a quiet demarcated band, never inside the workspace.
 */
export default function AdSlot({ id, className = '' }: AdSlotProps) {
  return (
    <div
      id={id}
      data-ad-slot={id}
      aria-label="Advertisement"
      className={`flex w-full items-center justify-center bg-muted/40 ${className}`}
    >
      <p className="text-xs tracking-wide text-muted-foreground uppercase">Advertisement</p>
    </div>
  )
}
