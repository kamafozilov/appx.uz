import { useEffect, useRef, useState, type ComponentType, type RefObject } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/cn'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { useIsMobile } from './gallery/useIsMobile'
import {
  CrumbsPhone,
  PocketSemesterPhone,
  RepsPhone,
  SipDayPhone,
  StreaksPhone,
  TomatoPhone,
} from '@/components/phones'

type Exhibit = {
  name: string
  category: string
  /** Niche background (Tailwind class). */
  niche: string
  prompt: string
  screens: number
  credits: number
  href: string
  Phone: ComponentType<{ width?: number; className?: string }>
}

const EXHIBITS: Exhibit[] = [
  {
    name: 'Reps',
    category: 'Workout log',
    niche: 'bg-[#E4E2D6]',
    prompt:
      'Workout log called Reps. Tabs: Today with planned exercises and sets, History, Profile.',
    screens: 5,
    credits: 30,
    href: '#',
    Phone: RepsPhone,
  },
  {
    name: 'Crumbs',
    category: 'Recipe box',
    niche: 'bg-[#F1E2D4]',
    prompt: 'Recipe box app called Crumbs. Tabs: My Recipes with photos, Favorites, Shopping List.',
    screens: 5,
    credits: 29,
    href: '#',
    Phone: CrumbsPhone,
  },
  {
    name: 'SipDay',
    category: 'Water tracker',
    niche: 'bg-[#DCE7EF]',
    prompt: 'Water reminder app: log glasses of water with one tap, a daily goal and reminders.',
    screens: 2,
    credits: 16,
    href: '#',
    Phone: SipDayPhone,
  },
  {
    name: 'Streaks',
    category: 'Habit tracker',
    niche: 'bg-[#E3EADB]',
    prompt: 'Habit tracker called Streaks. Tabs: Today with habit check-ins, Stats, Settings.',
    screens: 5,
    credits: 29,
    href: '#',
    Phone: StreaksPhone,
  },
  {
    name: 'Pocket Semester',
    category: 'Student expenses',
    niche: 'bg-[#E6E3F1]',
    prompt:
      'A simple expense tracker for students. Add expenses with amount, category and date, and a monthly budget.',
    screens: 3,
    credits: 21,
    href: '#',
    Phone: PocketSemesterPhone,
  },
  {
    name: 'Tomato',
    category: 'Focus timer',
    niche: 'bg-[#F3DDD5]',
    prompt:
      "Pomodoro timer called Tomato. One screen: a big 25:00 countdown, start and reset, and today's sessions.",
    screens: 1,
    credits: 11,
    href: '#',
    Phone: TomatoPhone,
  },
]

const EASE = [0.16, 1, 0.3, 1] as const

function ExhibitCard({ exhibit }: { exhibit: Exhibit }) {
  const { name, category, niche, prompt, screens, credits, href, Phone } = exhibit
  return (
    <figure className="group flex h-full flex-col gap-[18px] md:gap-6">
      {/* Coloured niche: phone peeks in from the top and is clipped at the bottom. */}
      <div
        className={cn(
          'flex h-[430px] shrink-0 justify-center overflow-hidden rounded-[22px] pt-14 md:h-[500px] md:rounded-[24px] md:pt-[72px]',
          niche,
        )}
      >
        <div className="transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
          <Phone />
        </div>
      </div>

      <figcaption className="flex h-[168px] flex-col gap-2.5 px-1 md:h-auto md:flex-1 md:px-2">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-[19px] font-semibold tracking-[-0.3px] text-ink">{name}</h3>
          <span className="text-right text-[14px] text-ink-3">{category}</span>
        </div>
        <blockquote className="font-display text-[20px] leading-[26px] text-ink-2 italic">
          “{prompt}”
        </blockquote>
        <div className="mt-auto flex items-center justify-between gap-4 pt-1.5">
          <span className="font-mono text-[12px] text-ink-3">
            {screens} {screens === 1 ? 'screen' : 'screens'} · {credits} credits
          </span>
          <a
            href={href}
            className="group/link flex shrink-0 items-center gap-1.5 text-[14px] font-semibold text-ink transition-opacity duration-200 hover:opacity-70 active:opacity-60"
          >
            Try {name}
            <ArrowUpRight
              aria-hidden
              className="size-[15px] transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
          </a>
        </div>
      </figcaption>
    </figure>
  )
}

/**
 * One list item. On md+ each card reveals as it scrolls into view (staggered per row).
 * In the mobile carousel the strip reveals together, because cards that are
 * horizontally off-screen would otherwise only fade in mid-swipe.
 */
function ExhibitItem({
  exhibit,
  index,
  isMobile,
  listInView,
  itemRef,
}: {
  exhibit: Exhibit
  index: number
  isMobile: boolean
  listInView: boolean
  itemRef: (el: HTMLLIElement | null) => void
}) {
  const ref = useRef<HTMLLIElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })
  const reduce = useReducedMotion()
  const shown = reduce || inView || (isMobile && listInView)
  const delay = isMobile ? Math.min(index, 2) * 0.08 : (index % 3) * 0.08

  return (
    <motion.li
      ref={(el) => {
        ref.current = el
        itemRef(el)
      }}
      data-index={index}
      initial={{ opacity: 0, y: 28 }}
      animate={shown ? { opacity: 1, y: 0 } : undefined}
      transition={reduce ? { duration: 0 } : { duration: 0.9, delay, ease: EASE }}
      className="w-[296px] shrink-0 snap-start md:w-auto"
    >
      <ExhibitCard exhibit={exhibit} />
    </motion.li>
  )
}

/** Tracks which carousel card is (mostly) in view, via IntersectionObserver. */
function useActiveCard(
  scrollerRef: RefObject<HTMLUListElement | null>,
  itemsRef: RefObject<(HTMLLIElement | null)[]>,
  enabled: boolean,
) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const root = scrollerRef.current
    if (!enabled || !root) return
    const visible = new Set<number>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const i = Number((entry.target as HTMLElement).dataset.index)
          if (entry.intersectionRatio >= 0.6) visible.add(i)
          else visible.delete(i)
        }
        if (visible.size) setActive(Math.min(...visible))
      },
      { root, threshold: [0, 0.6, 1] },
    )
    for (const el of itemsRef.current) if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [scrollerRef, itemsRef, enabled])

  return active
}

function Pager({ active, onSelect }: { active: number; onSelect: (index: number) => void }) {
  const reduce = useReducedMotion()
  return (
    <div className="mt-8 flex items-center gap-1.5 px-5 md:hidden">
      {EXHIBITS.map((exhibit, i) => (
        <button
          key={exhibit.name}
          type="button"
          aria-label={`Show ${exhibit.name}`}
          aria-current={i === active ? 'true' : undefined}
          onClick={() => onSelect(i)}
          className="-my-2 flex h-[22px] items-center"
        >
          {/* Width change is animated by motion's transform-based layout projection. */}
          <motion.span
            layout
            transition={reduce ? { duration: 0 } : { duration: 0.4, ease: EASE }}
            style={{ borderRadius: 3 }}
            className={cn(
              'block h-1.5 transition-colors duration-300',
              i === active ? 'w-[22px] bg-ink' : 'w-1.5 bg-line',
            )}
          />
        </button>
      ))}
      <span className="flex flex-1 items-center justify-end gap-1.5 text-[13px] font-medium whitespace-nowrap text-ink-3">
        Swipe to see all {EXHIBITS.length}
        <ArrowRight aria-hidden className="size-3.5" />
      </span>
    </div>
  )
}

export function Gallery() {
  const isMobile = useIsMobile()
  const reduce = useReducedMotion()
  const scrollerRef = useRef<HTMLUListElement>(null)
  const itemsRef = useRef<(HTMLLIElement | null)[]>([])
  const listInView = useInView(scrollerRef, { once: true, margin: '0px 0px -12% 0px' })
  const active = useActiveCard(scrollerRef, itemsRef, isMobile)

  const scrollToCard = (index: number) => {
    const scroller = scrollerRef.current
    const first = itemsRef.current[0]
    const card = itemsRef.current[index]
    if (!scroller || !first || !card) return
    scroller.scrollTo({
      left: card.offsetLeft - first.offsetLeft,
      behavior: reduce ? 'auto' : 'smooth',
    })
  }

  return (
    // Own shell instead of <Section>: on mobile the carousel runs edge-to-edge,
    // so the 20px gutter lives on the header / scroller / pager instead.
    <section
      id="examples"
      className="w-full bg-[#F6F1E8] py-[72px] md:px-8 md:py-20 lg:px-12 lg:py-32 xl:px-[120px]"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <SectionHeader
          className="px-5 md:px-0"
          title={
            <>
              Real prompts.
              <br />
              Real apps.
            </>
          }
          intro="Each app was built from the exact prompt beneath it. Open any of them and use the real thing."
        />
        <ul
          ref={scrollerRef}
          aria-label="Example apps"
          className="relative mt-8 no-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-3.5 overflow-x-auto overscroll-x-contain px-5 md:mt-12 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-14 md:overflow-visible md:px-0 lg:mt-14 lg:grid-cols-3"
        >
          {EXHIBITS.map((exhibit, i) => (
            <ExhibitItem
              key={exhibit.name}
              exhibit={exhibit}
              index={i}
              isMobile={isMobile}
              listInView={listInView}
              itemRef={(el) => {
                itemsRef.current[i] = el
              }}
            />
          ))}
        </ul>
        <Pager active={active} onSelect={scrollToCard} />
      </div>
    </section>
  )
}
