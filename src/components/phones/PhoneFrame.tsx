import type { CSSProperties, ReactNode } from 'react'
import { BatteryFull, Signal, Wifi } from 'lucide-react'
import { cn } from '@/lib/cn'

/** Every phone in the design is the same iPhone mockup at a different size; 236px is the base. */
export const PHONE_BASE_WIDTH = 236

type Tone = 'light' | 'dark'

type PhoneFrameProps = {
  children: ReactNode
  /** Rendered width in px. Scales the whole mockup (content included) via CSS zoom. */
  width?: number
  /** Screen background (Tailwind classes, e.g. "bg-[#0C0C0E]"). */
  screenClassName?: string
  /** Status bar text/icon colour. */
  statusTone?: Tone
  /** Float the status bar over the content (e.g. over a full-bleed photo) instead of stacking it above. */
  statusOverlay?: boolean
  /** Home indicator colour; defaults to `statusTone`. */
  indicatorTone?: Tone
  /** Accessible name for the whole mockup, e.g. "Reps app preview". The screen content is decorative. */
  label?: string
  className?: string
}

const toneClass: Record<Tone, string> = { light: 'text-white', dark: 'text-[#0A0A0A]' }
const indicatorClass: Record<Tone, string> = { light: 'bg-white', dark: 'bg-[#0A0A0A]' }

/**
 * iPhone mockup authored at 236×505.7 (screen 226.8×496.5). Pass `width` for a fixed size, or set
 * `--phone-zoom` from `className` for responsive sizes (e.g. "[--phone-zoom:0.9] lg:[--phone-zoom:1.31]").
 * Screens render only the content below the status bar; absolutely positioned layers sit against the screen.
 */
export function PhoneFrame({
  children,
  width,
  screenClassName = 'bg-[#0C0C0E]',
  statusTone = 'light',
  statusOverlay = false,
  indicatorTone = statusTone,
  label,
  className,
}: PhoneFrameProps) {
  const style = width ? ({ '--phone-zoom': width / PHONE_BASE_WIDTH } as CSSProperties) : undefined

  return (
    <div
      style={style}
      role={label ? 'img' : undefined}
      aria-label={label}
      className={cn(
        'flex h-[505.7px] w-[236px] shrink-0 [zoom:var(--phone-zoom,1)] flex-col rounded-[40.5px] bg-[#111113] p-[4.6px]',
        'shadow-[0_28.7px_59px_#1A140A40,0_3.4px_8.4px_#1A140A2E]',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          'relative flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-[35.8px] font-sans leading-[normal] whitespace-nowrap',
          screenClassName,
        )}
      >
        <div
          className={cn(
            'z-10 flex w-full shrink-0 items-center justify-between pt-[11px] pr-[20.2px] pb-[5.1px] pl-[23.6px]',
            statusOverlay ? 'absolute inset-x-0 top-0' : 'relative',
            toneClass[statusTone],
          )}
        >
          <span className="text-[9.7px] font-semibold">9:41</span>
          <span className="h-[19.4px] w-[65.7px] rounded-[10.1px] bg-black" />
          <span className="flex items-center gap-[3.4px]">
            <Signal className="size-[10.5px]" />
            <Wifi className="size-[10.5px]" />
            <BatteryFull className="size-[10.5px]" />
          </span>
        </div>
        {children}
        <span
          className={cn(
            'absolute bottom-[4.2px] left-1/2 z-30 h-[3.4px] w-[80.9px] -translate-x-1/2 rounded-[1.7px]',
            indicatorClass[indicatorTone],
          )}
        />
      </div>
    </div>
  )
}
