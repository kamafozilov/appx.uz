import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export type RingSegment = {
  /** Start angle in degrees, clockwise from 12 o'clock. */
  from: number
  /** End angle in degrees. */
  to: number
  /** SVG stroke colour. */
  color: string
}

type RingProps = {
  /** Outer diameter in px (at the 236px phone base). */
  size: number
  /** Ring thickness in px. */
  stroke: number
  /** Track colour; omit for no track. */
  track?: string
  segments?: RingSegment[]
  /** Centered content (labels, numbers). */
  children?: ReactNode
  className?: string
  /** Extra classes for the centered content wrapper (e.g. a gap). */
  contentClassName?: string
}

/** Progress ring / donut drawn with stroke-dasharray arcs (butt caps, like the design). */
export function Ring({
  size,
  stroke,
  track,
  segments = [],
  children,
  className,
  contentClassName,
}: RingProps) {
  const r = (size - stroke) / 2
  const c = size / 2

  return (
    <div className={cn('relative shrink-0', className)} style={{ width: size, height: size }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 size-full -rotate-90"
        fill="none"
      >
        {track && <circle cx={c} cy={c} r={r} stroke={track} strokeWidth={stroke} />}
        {segments.map(({ from, to, color }) => (
          <circle
            key={`${from}-${to}`}
            cx={c}
            cy={c}
            r={r}
            stroke={color}
            strokeWidth={stroke}
            pathLength={360}
            strokeDasharray={`${to - from} 360`}
            strokeDashoffset={-from}
          />
        ))}
      </svg>
      {children && (
        <div
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center',
            contentClassName,
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}
