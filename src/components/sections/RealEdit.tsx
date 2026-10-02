import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion, type Transition } from 'motion/react'
import { ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SipDayBeforePhone, SipDayPhone } from '@/components/phones'
import stageImg from '@/assets/img/generated-24.webp'
import { useIsMobile } from './gallery/useIsMobile'

const EASE = [0.16, 1, 0.3, 1] as const

const MESSAGE =
  'Make it feel calmer: an ocean look, a glass that fills up as I drink, a 7-day streak and a much bigger Add button.'

const CHANGES = [
  'Deep ocean gradient and white type',
  'Water glass that fills to 63%',
  '7-day streak under the glass',
  'Add a glass is now a large, full-width button',
]

/** Timeline (seconds after the stage scrolls into view). */
const T = {
  thread: 0,
  before: 0.15,
  firstCheck: 0.55,
  checkStep: 0.28,
  arrow: 0.9,
  after: 0.55 + CHANGES.length * 0.28,
}

/** 268px on mobile (design), 236 × zoom elsewhere. */
const PHONE_ZOOM =
  '[--phone-zoom:1.1356] md:[--phone-zoom:0.95] lg:[--phone-zoom:1] xl:[--phone-zoom:1.1356]'

const glass = 'bg-white/75 ring-1 ring-inset ring-white/95 backdrop-blur-[8px]'

type View = 'before' | 'after'
const VIEWS: { id: View; label: string }[] = [
  { id: 'before', label: 'Before' },
  { id: 'after', label: 'After' },
]

function ThreadCard({ play, instant }: { play: boolean; instant: boolean }) {
  const t = (delay: number, duration = 0.7): Transition =>
    instant ? { duration: 0 } : { duration, delay, ease: EASE }

  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      animate={play ? { opacity: 1, y: 0 } : undefined}
      transition={t(T.thread, 0.8)}
      className="relative flex w-full shrink-0 flex-col gap-2 rounded-[22px] bg-white/75 p-2 shadow-[0_16px_40px_#1A140A1F] ring-1 ring-white/95 backdrop-blur-[15px] ring-inset md:max-w-[310px]"
    >
      <figcaption className="text-center text-[13px] font-medium text-ink-2">
        One message
      </figcaption>

      <p className="rounded-[15px_15px_4px_15px] bg-ink p-3.5 text-[14px] leading-[21px] text-white">
        {MESSAGE}
      </p>

      <div className="flex flex-col gap-[9px] rounded-[15px_15px_15px_4px] bg-white p-3.5">
        <p className="text-[13px] font-semibold text-ink-3">AppX · Home screen updated</p>
        <ul className="flex flex-col gap-[9px]">
          {CHANGES.map((change, i) => {
            const delay = T.firstCheck + i * T.checkStep
            return (
              <motion.li
                key={change}
                initial={{ opacity: 0, x: -6 }}
                animate={play ? { opacity: 1, x: 0 } : undefined}
                transition={t(delay, 0.5)}
                className="flex items-start gap-2.5"
              >
                <motion.span
                  aria-hidden
                  initial={{ scale: 0 }}
                  animate={play ? { scale: 1 } : undefined}
                  transition={
                    instant
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 500, damping: 22, delay: delay + 0.08 }
                  }
                  className="flex shrink-0"
                >
                  <Check className="size-4 text-[#2F7D52]" />
                </motion.span>
                <span className="flex-1 text-[13px] leading-[18px] text-ink">{change}</span>
              </motion.li>
            )
          })}
        </ul>
      </div>

      <p className="text-center font-mono text-[12px] text-ink-3">
        SipDay · Home screen · 3 credits
      </p>
    </motion.figure>
  )
}

/** Mobile-only segmented control that swaps the single cropped phone. */
function ViewToggle({ view, onChange }: { view: View; onChange: (view: View) => void }) {
  const reduce = useReducedMotion()
  return (
    <div
      role="group"
      aria-label="Show the app before or after the edit"
      className="relative flex gap-1 rounded-full bg-white/40 p-1 ring-1 ring-white/70 backdrop-blur-[8px] ring-inset md:hidden"
    >
      {VIEWS.map(({ id, label }) => {
        const active = view === id
        return (
          <button
            key={id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(id)}
            className={cn(
              'relative rounded-full px-[18px] py-2 text-[13px] font-semibold transition-colors duration-200 active:opacity-70',
              active ? 'text-ink' : 'text-ink-2',
            )}
          >
            {active && (
              <motion.span
                aria-hidden
                layoutId="real-edit-toggle"
                transition={reduce ? { duration: 0 } : { duration: 0.45, ease: EASE }}
                className="absolute inset-0 rounded-full bg-white shadow-[0_2px_6px_#1A140A1A]"
              />
            )}
            <span className="relative">{label}</span>
          </button>
        )
      })}
    </div>
  )
}

function PhoneColumn({
  label,
  labelClassName,
  hiddenOnMobile,
  children,
}: {
  label: string
  labelClassName: string
  /** Mobile shows one phone at a time (stacked); the other fades out. */
  hiddenOnMobile: boolean
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        'flex shrink-0 flex-col items-center gap-[18px] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        hiddenOnMobile && 'max-md:pointer-events-none max-md:scale-[0.98] max-md:opacity-0',
      )}
    >
      <span
        className={cn(
          'hidden rounded-full px-3.5 py-1.5 text-[13px] font-semibold md:block',
          labelClassName,
        )}
      >
        {label}
      </span>
      {children}
    </div>
  )
}

export function RealEdit() {
  const stageRef = useRef<HTMLDivElement>(null)
  const inView = useInView(stageRef, { once: true, amount: 0.3 })
  const instant = !!useReducedMotion()
  const play = inView || instant
  const isMobile = useIsMobile()

  // Mobile: start on "Before", flip to "After" once the change list has played —
  // unless the visitor already picked a side.
  const [view, setView] = useState<View>(instant ? 'after' : 'before')
  const touched = useRef(false)
  useEffect(() => {
    if (!inView || instant) return
    const id = window.setTimeout(
      () => {
        if (!touched.current) setView('after')
      },
      (T.after + 0.2) * 1000,
    )
    return () => window.clearTimeout(id)
  }, [inView, instant])

  const pickView = (next: View) => {
    touched.current = true
    setView(next)
  }

  const t = (delay: number, duration = 0.8): Transition =>
    instant ? { duration: 0 } : { duration, delay, ease: EASE }

  return (
    <Section className="bg-[#FFFDF8] py-[72px] md:py-20 lg:py-32">
      <SectionHeader
        title={
          <>
            One message.
            <br />A new app.
          </>
        }
        intro="Changing your app is a conversation. Say what you want different, and your phone updates in minutes."
      />

      <div
        ref={stageRef}
        className="relative mt-8 flex flex-col items-center gap-5 overflow-hidden rounded-[24px] px-4 pt-6 md:mt-12 md:gap-10 md:rounded-[32px] md:px-8 md:py-12 lg:mt-14 lg:h-[700px] lg:flex-row lg:justify-center lg:gap-6 lg:p-0 xl:gap-8"
      >
        <img
          src={stageImg}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />

        <ThreadCard play={play} instant={instant} />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={play ? { opacity: 1, y: 0 } : undefined}
          transition={t(T.arrow, 0.6)}
          className="relative md:hidden"
        >
          <ViewToggle view={view} onChange={pickView} />
        </motion.div>

        {/* Mobile: fixed 460px crop with both phones stacked in one grid cell (no layout
            shift when swapping). md+: before → arrow → after in a row. */}
        <div className="relative grid h-[460px] w-full items-start justify-center overflow-hidden md:flex md:h-auto md:w-auto md:flex-row md:items-center md:gap-6 md:overflow-visible xl:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={play ? { opacity: 1, y: 0 } : undefined}
            transition={t(T.before)}
            className="[grid-area:1/1]"
          >
            <PhoneColumn
              label="Before"
              labelClassName={cn(glass, 'text-ink-2')}
              hiddenOnMobile={view !== 'before'}
            >
              <SipDayBeforePhone className={PHONE_ZOOM} />
            </PhoneColumn>
          </motion.div>

          <motion.span
            aria-hidden
            initial={{ opacity: 0, scale: 0.6 }}
            animate={play ? { opacity: 1, scale: 1 } : undefined}
            transition={t(T.arrow, 0.6)}
            className={cn(
              'hidden size-12 shrink-0 items-center justify-center rounded-full md:flex',
              glass,
            )}
          >
            <ArrowRight className="size-5 text-ink" />
          </motion.span>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={play ? { opacity: 1, scale: 1, y: 0 } : undefined}
            // On mobile both stacked phones enter together; the toggle decides which shows.
            transition={isMobile ? t(T.before) : t(T.after, 0.9)}
            className="[grid-area:1/1]"
          >
            <PhoneColumn
              label="After"
              labelClassName="bg-white text-ink"
              hiddenOnMobile={view !== 'after'}
            >
              <SipDayPhone className={PHONE_ZOOM} />
            </PhoneColumn>
          </motion.div>
        </div>
      </div>
    </Section>
  )
}
