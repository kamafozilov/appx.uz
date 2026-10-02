import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/cn'

type GlassCardProps = {
  label: string
  footer?: ReactNode
  className?: string
  children: ReactNode
}

/** Frosted card on the stage: small label on top, white content panel inside. */
export function GlassCard({ label, footer, className, children }: GlassCardProps) {
  return (
    <figure
      className={cn(
        'flex w-full flex-col gap-2 rounded-[22px] bg-white/75 p-2 shadow-[0_16px_40px_#1A140A1F] ring-1 ring-white/95 backdrop-blur-[15px] ring-inset',
        className,
      )}
    >
      <figcaption className="text-center text-[13px] font-medium text-ink-2">{label}</figcaption>
      <div className="rounded-[15px] bg-white p-4">{children}</div>
      {footer}
    </figure>
  )
}

/** Small frosted circle linking the stage cards; points down when the stage stacks. */
export function StageArrow() {
  return (
    <span
      aria-hidden
      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/75 ring-1 ring-white/95 backdrop-blur-[8px] ring-inset lg:size-10"
    >
      <ArrowRight className="size-[18px] rotate-90 text-ink lg:rotate-0" />
    </span>
  )
}
