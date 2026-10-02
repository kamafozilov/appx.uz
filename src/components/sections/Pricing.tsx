import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion, type Variants } from 'motion/react'
import { ArrowRight, Check, Info } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import starterHero from '@/assets/img/generated-11.webp'
import starter1 from '@/assets/img/generated-14.webp'
import starter2 from '@/assets/img/generated-13.webp'
import starter3 from '@/assets/img/generated-12.webp'
import starter4 from '@/assets/img/generated-15.webp'
import basicHero from '@/assets/img/pricing/basic-hero.webp'
import basic1 from '@/assets/img/pricing/basic-1.webp'
import basic2 from '@/assets/img/pricing/basic-2.webp'
import basic3 from '@/assets/img/pricing/basic-3.webp'
import basic4 from '@/assets/img/pricing/basic-4.webp'
import premiumHero from '@/assets/img/pricing/premium-hero.webp'
import premium1 from '@/assets/img/pricing/premium-1.webp'
import premium2 from '@/assets/img/pricing/premium-2.webp'
import premium3 from '@/assets/img/pricing/premium-3.webp'
import premium4 from '@/assets/img/pricing/premium-4.webp'
import proHero from '@/assets/img/pricing/pro-hero.webp'
import pro1 from '@/assets/img/pricing/pro-1.webp'
import pro2 from '@/assets/img/pricing/pro-2.webp'
import pro3 from '@/assets/img/pricing/pro-3.webp'
import pro4 from '@/assets/img/pricing/pro-4.webp'

/* ------------------------------------------------------------------ data */

/** Per-plan colours, applied as CSS variables so they transition smoothly. */
type Theme = {
  surface: string
  title: string
  muted: string
  body: string
  checkBg: string
  checkFg: string
  btnBg: string
  btnHover: string
  btnFg: string
}

type Tile = { title: string; desc: string; img: string }

type Plan = {
  id: 'basic' | 'starter' | 'premium' | 'pro'
  name: string
  price: number
  yearly?: string
  badge?: string
  features: [string, string]
  art: string
  tiles: [Tile, Tile, Tile, Tile]
  theme: Theme
}

const LIGHT_TEXT = { title: '#17150F', muted: '#857E72', body: '#5E5950' }

const EXTRA_CREDITS: Omit<Tile, 'img'> = {
  title: 'Extra credits anytime',
  desc: '$5 = 60 credits, on paid plans.',
}

const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 5,
    features: ['100 credits every month', 'Build apps from a prompt'],
    art: basicHero,
    tiles: [
      { title: '100 credits every month', desc: 'About 3 apps the size of Crumbs.', img: basic1 },
      {
        title: 'Build apps from a prompt',
        desc: 'Describe it, AppX writes the code.',
        img: basic2,
      },
      { title: 'Live preview, edit by chat', desc: 'See every change as you type.', img: basic3 },
      { title: 'Download your code', desc: 'The full project as a ZIP.', img: basic4 },
    ],
    theme: {
      surface: '#ECEEE8',
      ...LIGHT_TEXT,
      checkBg: '#1C1B1714',
      checkFg: '#17150F',
      btnBg: '#17150F',
      btnHover: '#2A2720',
      btnFg: '#FFFFFF',
    },
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 20,
    yearly: '$216',
    badge: 'Most popular',
    features: ['300 credits every month', 'AppX Backend, a database for each app'],
    art: starterHero,
    tiles: [
      { title: '300 credits every month', desc: 'Enough for several full apps.', img: starter1 },
      {
        title: 'A database for each app',
        desc: 'AppX Backend, ready without setup.',
        img: starter2,
      },
      { ...EXTRA_CREDITS, img: starter3 },
      {
        title: 'Everything in Basic',
        desc: 'Live preview, chat edits, ZIP download.',
        img: starter4,
      },
    ],
    theme: {
      surface: '#F2EEE7',
      ...LIGHT_TEXT,
      checkBg: '#1C1B1714',
      checkFg: '#17150F',
      btnBg: '#17150F',
      btnHover: '#2A2720',
      btnFg: '#FFFFFF',
    },
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 50,
    yearly: '$540',
    features: ['800 credits every month', 'AppX Backend, a database for each app'],
    art: premiumHero,
    tiles: [
      {
        title: '800 credits every month',
        desc: 'About 27 apps the size of Crumbs.',
        img: premium1,
      },
      {
        title: 'A database for each app',
        desc: 'AppX Backend, ready without setup.',
        img: premium2,
      },
      { ...EXTRA_CREDITS, img: premium3 },
      {
        title: 'Everything in Starter',
        desc: 'Backend, extra credits, all of Basic.',
        img: premium4,
      },
    ],
    theme: {
      surface: '#ECE8F3',
      ...LIGHT_TEXT,
      checkBg: '#2E22571A',
      checkFg: '#2E2257',
      btnBg: '#2E2257',
      btnHover: '#3B2E6B',
      btnFg: '#FFFFFF',
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 100,
    yearly: '$1,080',
    features: ['1,700 credits every month', 'Priority on App Store requests'],
    art: proHero,
    tiles: [
      { title: '1,700 credits every month', desc: 'About 58 apps the size of Crumbs.', img: pro1 },
      {
        title: 'Priority on App Store requests',
        desc: 'Your requests are handled first.',
        img: pro2,
      },
      { ...EXTRA_CREDITS, img: pro3 },
      {
        title: 'Everything in Premium',
        desc: 'Backend, extra credits, all of Starter.',
        img: pro4,
      },
    ],
    theme: {
      surface: '#1A1917',
      title: '#F5F2EB',
      muted: '#9A958B',
      body: '#C9C3B8',
      checkBg: '#F5B54726',
      checkFg: '#F5B547',
      btnBg: '#F5B547',
      btnHover: '#F7C266',
      btnFg: '#1C1406',
    },
  },
]

const DEFAULT_PLAN = 1 // Starter is active in the design

const themeVars = (t: Theme) =>
  ({
    '--plan-surface': t.surface,
    '--plan-title': t.title,
    '--plan-muted': t.muted,
    '--plan-body': t.body,
    '--plan-check-bg': t.checkBg,
    '--plan-check-fg': t.checkFg,
    '--plan-btn-bg': t.btnBg,
    '--plan-btn-hover': t.btnHover,
    '--plan-btn-fg': t.btnFg,
  }) as CSSProperties

const ease = [0.16, 1, 0.3, 1] as const
/** Shared colour transition for everything that follows the plan theme. */
const themed = 'transition-[background-color,color] duration-500 ease-out-expo'

/** Warm the cache so switching plans never shows an empty image. */
function usePreloadPlanImages() {
  useEffect(() => {
    const preload = () =>
      plans.forEach((p) =>
        [p.art, ...p.tiles.map((t) => t.img)].forEach((src) => {
          const img = new Image()
          img.decoding = 'async'
          img.src = src
        }),
      )
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(preload, { timeout: 2000 })
      return () => cancelIdleCallback(id)
    }
    const id = setTimeout(preload, 600)
    return () => clearTimeout(id)
  }, [])
}

/* ------------------------------------------------------------- section */

export function Pricing() {
  const [index, setIndex] = useState(DEFAULT_PLAN)
  // +1 when moving right in the switcher, -1 when moving left (drives the price slide direction).
  const [direction, setDirection] = useState(1)
  const plan = plans[index]
  const panelId = useId()
  usePreloadPlanImages()

  const select = (next: number) => {
    if (next === index) return
    setDirection(next > index ? 1 : -1)
    setIndex(next)
  }

  return (
    // Own shell instead of <Section>: the mobile design uses a 14px gutter (Section's base is 20px).
    <section
      id="pricing"
      className="w-full bg-paper px-3.5 py-14 md:px-8 md:py-24 lg:px-12 lg:py-[112px] xl:px-[120px]"
    >
      <Reveal className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 rounded-[32px] bg-white px-3.5 pt-10 pb-6 shadow-[0_1px_2px_#1A140A0D,0_30px_80px_#1A140A12] md:gap-9 md:rounded-[44px] md:px-8 md:pt-12 md:pb-8 lg:px-12 lg:pt-16 lg:pb-12">
        <header className="flex w-full flex-col items-center gap-2.5 text-center md:gap-3.5">
          <h2 className="font-display text-[52px] leading-[52px] tracking-[-1px] text-ink md:text-[60px] md:leading-none md:tracking-[-1.4px] lg:text-[72px]">
            Pick your plan
          </h2>
          <p className="text-[15px] leading-[23px] text-ink-2 md:text-[17px] md:leading-normal">
            From $5 a month. Every plan includes the full code download.
          </p>
        </header>

        <PlanSwitcher activeIndex={index} panelId={panelId} onSelect={select} />

        <div style={themeVars(plan.theme)} className="flex w-full flex-col gap-6 md:gap-4">
          <PlanPanel id={panelId} plan={plan} direction={direction} />

          <ul className="grid w-full grid-cols-2 gap-2.5 md:gap-4 lg:grid-cols-4">
            {plan.tiles.map((tile, i) => (
              <li key={i}>
                <FeatureTile tile={tile} index={i} planId={plan.id} />
              </li>
            ))}
          </ul>
        </div>

        <p className="flex w-full items-start gap-2.5 px-1.5 text-[13px] leading-5 text-ink-3 md:w-auto md:max-w-full md:items-center md:px-0 md:text-[14px] md:leading-normal">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0 md:mt-0" />
          <span>
            What does a credit buy? A 5-screen recipe app (Crumbs) used 29 credits, a 2-screen water
            tracker (SipDay) used 16.
          </span>
        </p>
      </Reveal>
    </section>
  )
}

/* ------------------------------------------------------------ switcher */

type PlanSwitcherProps = {
  activeIndex: number
  panelId: string
  onSelect: (index: number) => void
}

function PlanSwitcher({ activeIndex, panelId, onSelect }: PlanSwitcherProps) {
  const tabs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = plans.length - 1
    const targets: Record<string, number> = {
      ArrowRight: activeIndex === last ? 0 : activeIndex + 1,
      ArrowLeft: activeIndex === 0 ? last : activeIndex - 1,
      Home: 0,
      End: last,
    }
    const next = targets[e.key]
    if (next === undefined) return
    e.preventDefault()
    onSelect(next)
    tabs.current[next]?.focus()
  }

  return (
    <div
      role="tablist"
      aria-label="Plans"
      onKeyDown={onKeyDown}
      className="grid w-full grid-cols-4 gap-0.5 rounded-full bg-[#F2EEE7] p-1 md:flex md:w-fit"
    >
      {plans.map((plan, i) => {
        const active = i === activeIndex
        return (
          <button
            key={plan.id}
            ref={(el) => {
              tabs.current[i] = el
            }}
            type="button"
            role="tab"
            id={`${panelId}-tab-${plan.id}`}
            aria-selected={active}
            aria-controls={panelId}
            tabIndex={active ? 0 : -1}
            onClick={() => onSelect(i)}
            className="group relative flex min-w-0 cursor-pointer flex-col items-center justify-center gap-px rounded-full px-1 py-2 leading-[normal] transition-transform duration-200 active:scale-[0.97] md:flex-row md:gap-x-1.5 md:px-5 md:py-2.5 md:leading-normal"
          >
            {active && (
              <motion.span
                layoutId="pricing-active-pill"
                aria-hidden
                className="absolute inset-0 rounded-full bg-white shadow-[0_1px_2px_#1A140A1A,0_4px_12px_#1A140A12]"
                transition={{ type: 'spring', stiffness: 420, damping: 36 }}
              />
            )}
            {/* An invisible semibold copy reserves the active width, so tabs never resize
                (and the pill never chases a moving target) when the weight changes. */}
            <span className="relative grid text-[14px] md:text-[15px]">
              <span aria-hidden className="invisible font-semibold [grid-area:1/1]">
                {plan.name}
              </span>
              <span
                className={cn(
                  'text-center transition-colors duration-200 [grid-area:1/1]',
                  active ? 'font-semibold text-ink' : 'font-medium text-ink-2 group-hover:text-ink',
                )}
              >
                {plan.name}
              </span>
            </span>
            <span className="relative text-[12px] text-ink-3 md:text-[13px]">${plan.price}</span>
          </button>
        )
      })}
    </div>
  )
}

/* --------------------------------------------------------------- panel */

/**
 * Cross-fades its children whenever `swapKey` changes. Old and new content overlap
 * in one grid cell, so the box never collapses mid-transition (no layout jump).
 */
function Swap({
  swapKey,
  children,
  className,
  wrapperClassName,
  reserve,
}: {
  swapKey: string
  children: ReactNode
  className?: string
  wrapperClassName?: string
  /** Every possible variant, rendered invisibly so the box always fits the largest one. */
  reserve?: ReactNode[]
}) {
  return (
    <div className={cn('grid', wrapperClassName)}>
      {reserve?.map((node, i) => (
        <div key={i} aria-hidden className={cn('invisible [grid-area:1/1]', className)}>
          {node}
        </div>
      ))}
      <AnimatePresence initial={false}>
        <motion.div
          key={swapKey}
          className={cn('[grid-area:1/1]', className)}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.08, ease } }}
          exit={{ opacity: 0, y: -6, transition: { duration: 0.18, ease } }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/** Stacked image crossfade: the new image fades in over the old one. */
function FadeImage({
  src,
  swapKey,
  className,
}: {
  src: string
  swapKey: string
  className?: string
}) {
  return (
    <AnimatePresence initial={false}>
      <motion.img
        key={swapKey}
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease }}
        className={cn('absolute inset-0 size-full object-cover', className)}
      />
    </AnimatePresence>
  )
}

const priceVariants: Variants = {
  enter: (dir: number) => ({ y: dir * 40, opacity: 0, filter: 'blur(4px)' }),
  center: { y: 0, opacity: 1, filter: 'blur(0px)' },
  exit: (dir: number) => ({ y: dir * -40, opacity: 0, filter: 'blur(4px)' }),
}

function PlanPanel({ id, plan, direction }: { id: string; plan: Plan; direction: number }) {
  return (
    <div
      id={id}
      role="tabpanel"
      aria-labelledby={`${id}-tab-${plan.id}`}
      className={cn(
        'relative flex w-full flex-col overflow-hidden rounded-[24px] bg-(--plan-surface) md:rounded-[32px] lg:block lg:h-[380px]',
        themed,
      )}
    >
      {/* Plan art: banner on top for mobile, right side on desktop */}
      <div
        aria-hidden
        className="relative h-[180px] overflow-hidden md:h-[240px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[56.5%]"
      >
        <FadeImage src={plan.art} swapKey={plan.id} />
        <div className="absolute inset-x-0 bottom-0 h-[72px] bg-linear-to-t from-(--plan-surface) to-transparent md:h-1/2 lg:inset-y-0 lg:right-auto lg:h-full lg:w-[260px] lg:bg-linear-to-r" />
      </div>

      <div className="relative z-10 flex flex-col gap-[22px] px-5 pt-2 pb-[22px] md:gap-8 md:px-10 md:pt-1 md:pb-10 lg:h-full lg:w-[520px] lg:justify-between lg:p-10">
        <div className="flex flex-col gap-2.5">
          <Swap swapKey={plan.id} className="flex min-h-[32px] items-center gap-2.5">
            <h3
              className={cn(
                'text-[26px] font-semibold tracking-[-0.5px] text-(--plan-title)',
                themed,
              )}
            >
              {plan.name}
            </h3>
            {plan.badge && (
              <span className="rounded-full bg-ink px-2.5 py-1 text-[12px] font-semibold text-white">
                {plan.badge}
              </span>
            )}
          </Swap>

          <div className="flex items-end gap-1.5">
            <span className="relative block h-[58px] overflow-hidden md:h-[65px]">
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.span
                  key={plan.price}
                  custom={direction}
                  variants={priceVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease }}
                  className="block font-display text-[64px] leading-[58px] tracking-[-1.5px] text-(--plan-title) md:text-[72px] md:leading-[65px]"
                >
                  ${plan.price}
                </motion.span>
              </AnimatePresence>
            </span>
            {/* Glides (transform) to its new spot when the price width changes, instead of snapping. */}
            <motion.span
              layout="position"
              transition={{ layout: { duration: 0.45, ease } }}
              className={cn('pb-2 text-[18px] text-(--plan-muted)', themed)}
            >
              / month
            </motion.span>
          </div>

          {/* Basic has no yearly price: the slot reserves a full text line, so nothing below shifts. */}
          <Swap
            swapKey={plan.id}
            reserve={[
              <p key="line" className="text-[15px]">
                or $1,080 a year
              </p>,
            ]}
          >
            {plan.yearly && (
              <p className={cn('text-[15px] text-(--plan-muted)', themed)}>
                or {plan.yearly} a year
              </p>
            )}
          </Swap>
        </div>

        <div className="flex w-full flex-col items-start gap-5 lg:w-auto">
          <Swap
            swapKey={plan.id}
            wrapperClassName="w-full lg:w-auto"
            reserve={plans.map((p) => (
              <FeatureList key={p.id} features={p.features} />
            ))}
          >
            <FeatureList features={plan.features} />
          </Swap>

          <button
            type="button"
            className={cn(
              'group inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-(--plan-btn-bg) px-6 py-[15px] text-[15px] font-semibold text-(--plan-btn-fg) hover:bg-(--plan-btn-hover) active:scale-[0.98] md:w-auto md:py-3.5',
              'transition-[background-color,color,transform] duration-500 ease-out-expo hover:duration-200',
            )}
          >
            <Swap swapKey={plan.id}>Choose {plan.name}</Swap>
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- tiles */

function FeatureList({ features }: { features: Plan['features'] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {features.map((feature) => (
        <li
          key={feature}
          className={cn(
            'flex items-start gap-2.5 text-[15px] leading-5 text-(--plan-body) md:items-center md:leading-normal',
            themed,
          )}
        >
          <span
            aria-hidden
            className={cn(
              'grid size-5 shrink-0 place-items-center rounded-full bg-(--plan-check-bg)',
              themed,
            )}
          >
            <Check className="size-3 text-(--plan-check-fg)" />
          </span>
          {feature}
        </li>
      ))}
    </ul>
  )
}

function TileCaption({ tile }: { tile: Tile }) {
  return (
    <>
      <h3
        className={cn(
          'text-[14px] leading-[18px] font-semibold text-(--plan-title) md:text-[15px] md:leading-normal',
          themed,
        )}
      >
        {tile.title}
      </h3>
      <p
        className={cn(
          'text-[13px] leading-[19px] text-(--plan-muted) md:text-[14px] md:leading-5',
          themed,
        )}
      >
        {tile.desc}
      </p>
    </>
  )
}

/** `index` is the tile's slot; captions reserve the tallest text of that slot across all plans. */
function FeatureTile({ tile, index, planId }: { tile: Tile; index: number; planId: string }) {
  return (
    <article
      className={cn(
        'flex h-full min-h-[236px] flex-col items-center gap-3 overflow-hidden rounded-[20px] bg-(--plan-surface) pb-3 md:min-h-0 md:gap-0 md:rounded-[28px] md:pb-5 lg:h-[300px] lg:pb-0',
        themed,
      )}
    >
      <div aria-hidden className="relative h-[140px] w-full shrink-0 overflow-hidden md:h-[204px]">
        <FadeImage src={tile.img} swapKey={planId} />
        <div className="absolute inset-0 bg-linear-to-b from-transparent from-50% to-(--plan-surface) to-97%" />
      </div>
      <Swap
        swapKey={planId}
        wrapperClassName="w-full"
        className="flex w-full flex-col items-center gap-1 px-2.5 text-center md:px-5"
        reserve={plans.map((p) => (
          <TileCaption key={p.id} tile={p.tiles[index]} />
        ))}
      >
        <TileCaption tile={tile} />
      </Swap>
    </article>
  )
}
