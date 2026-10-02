import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type Capability = {
  title: string
  description: string
  image: string
  overlay: ReactNode
  /** Positions the overlay inside the visual (centred below md, percent-based from md). */
  overlayClassName: string
  className?: string
}

/** Painted image with a floating UI overlay, captioned underneath. */
export function CapabilityCard({
  title,
  description,
  image,
  overlay,
  overlayClassName,
  className,
}: Capability) {
  return (
    <figure className={cn('group flex flex-col gap-5', className)}>
      <div className="relative isolate h-[420px] overflow-hidden rounded-[22px] md:h-[520px]">
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 size-full transform-gpu object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] backface-hidden group-hover:scale-[1.03]"
        />
        <div
          aria-hidden
          className={cn(
            'absolute transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5',
            overlayClassName,
          )}
        >
          {overlay}
        </div>
      </div>
      <figcaption className="flex flex-col gap-1.5 px-1 lg:gap-2">
        <h3 className="text-[18px] font-semibold tracking-[-0.2px] text-ink">{title}</h3>
        <p className="text-[15px] leading-6 text-ink-3">{description}</p>
      </figcaption>
    </figure>
  )
}
