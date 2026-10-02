import { X } from 'lucide-react'
import { cn } from '@/lib/cn'

/** AppX mark: "O O / D X" glyph grid + wordmark. */
export function Logo({ className }: { className?: string }) {
  const ring = 'size-[13px] outline-[2.6px] -outline-offset-[1.3px] outline-current'
  return (
    <a
      href="#top"
      aria-label="AppX home"
      className={cn('flex items-center gap-2.5 text-ink', className)}
    >
      <span aria-hidden className="grid size-[30px] grid-cols-2 gap-[3px]">
        <span className={cn(ring, 'rounded-full outline-solid')} />
        <span className={cn(ring, 'rounded-full outline-solid')} />
        <span className={cn(ring, 'rounded-r-[7px] outline-solid')} />
        <X className="size-[14px]" strokeWidth={2.6} />
      </span>
      <span className="text-[20px] font-semibold tracking-[-0.4px]">AppX</span>
    </a>
  )
}
