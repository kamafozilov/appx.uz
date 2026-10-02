import { cn } from '@/lib/cn'

type IconProps = { className?: string }

const APPLE_PATH =
  'M12.152 6.896c-0.948 0-2.415-1.078-3.96-1.04-2.04 0.027-3.91 1.183-4.961 3.014-2.117 3.675-0.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-0.065 2.09-0.987 3.935-0.987 1.831 0 2.35 0.987 3.96 0.948 1.637-0.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-0.039-0.013-3.182-1.221-3.22-4.857-0.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-0.156-3.675 1.09-4.61 1.09z m3.378-3.066c0.843-1.012 1.4-2.427 1.245-3.83-1.207 0.052-2.662 0.805-3.532 1.818-0.78 0.896-1.454 2.338-1.273 3.714 1.338 0.104 2.715-0.688 3.559-1.701'

/** Apple logo; colour via `text-*` (uses currentColor). */
export function AppleLogo({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0 overflow-visible', className)}
      aria-hidden="true"
    >
      <path d={APPLE_PATH} fill="currentColor" />
    </svg>
  )
}

const PLAY_PARTS = [
  {
    d: 'M1.337 0.924a1.486 1.486 0 0 0-0.112 0.568v21.017c0 0.217 0.045 0.419 0.124 0.6l11.155-11.087-11.167-11.098z',
    fill: '#00A0FF',
  },
  {
    d: 'M13.544 10.989l3.258-3.238-13.352-7.556a1.466 1.466 0 0 0-0.946-0.179l11.04 10.973z',
    fill: '#00D26A',
  },
  {
    d: 'M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594z',
    fill: '#FFC700',
  },
  {
    d: 'M13.544 13.056l-11 10.933c0.298 0.036 0.612-0.016 0.906-0.183l13.324-7.54-3.23-3.21z',
    fill: '#FF3A44',
  },
]

/** Four-colour Google Play triangle. */
export function GooglePlayLogo({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0 overflow-visible', className)}
      aria-hidden="true"
    >
      {PLAY_PARTS.map((part) => (
        <path key={part.fill} d={part.d} fill={part.fill} />
      ))}
    </svg>
  )
}
