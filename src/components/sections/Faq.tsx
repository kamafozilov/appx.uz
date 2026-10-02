import { useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'motion/react'
import {
  ArrowUpRight,
  BadgeCheck,
  Check,
  Coins,
  Database,
  Languages,
  LifeBuoy,
  Minus,
  Plus,
  QrCode,
  Smartphone,
  Sparkles,
  Store,
  type LucideIcon,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import flowerImg from '@/assets/img/generated-25.webp'
import creditsImg from '@/assets/img/generated-26.webp'
import founderImg from '@/assets/img/generated-27.webp'

// TODO: replace with the real founder / community links.
const FOUNDER_X_URL = '#'
const COMMUNITY_URL = '#'

/* ------------------------------------------------------------------ data */

type FaqItem = {
  id: string
  icon: LucideIcon
  question: string
  answer: string
  points?: string[]
}

const faqs: FaqItem[] = [
  {
    id: 'expo-go',
    icon: Smartphone,
    question: 'What is Expo Go?',
    answer:
      'A free app from Expo for iPhone and Android. Scan the code AppX shows you, and your app opens on your phone.',
    points: [
      'Free on iPhone and Android',
      'Scan once, then it updates as you chat',
      'No App Store needed while you build',
    ],
  },
  {
    id: 'credit',
    icon: Coins,
    question: 'What is a credit?',
    answer:
      'Credits pay for the work AppX does when it builds or edits your app. A 5-screen recipe app (Crumbs) used 29 credits, a 2-screen water tracker (SipDay) used 16.',
    points: ['Every plan includes monthly credits', 'Extra credits: $5 for 60, on paid plans'],
  },
  {
    id: 'build-fails',
    icon: LifeBuoy,
    question: 'What happens when a build fails?',
    answer:
      'AppX reads the error, fixes it and builds again on its own. If something still looks wrong, describe it in the chat and AppX will take another pass.',
  },
  {
    id: 'stores',
    icon: Store,
    question: 'Can you put my app in the stores?',
    answer:
      'Yes, we help you publish to the App Store and Google Play. You can also download the full code as a ZIP and submit it yourself.',
  },
  {
    id: 'data',
    icon: Database,
    question: "Where does my app's data live?",
    answer:
      'Each app gets its own database on AppX Backend, ready without setup. The code download is yours, so you can move it anywhere later.',
  },
  {
    id: 'languages',
    icon: Languages,
    question: 'Which languages does AppX speak?',
    answer: 'Chat with AppX in the language you are most comfortable with.',
    points: ['English', 'Русский', "O'zbekcha"],
  },
]

type GlassStat = { value: string; label: string; icon: LucideIcon }

const expoStats: GlassStat[] = [
  { value: 'Free', label: 'Expo Go on the App Store and Google Play', icon: BadgeCheck },
  { value: '2', label: 'Platforms: iPhone and Android', icon: Smartphone },
  { value: '0', label: 'Setup steps before you see your app', icon: Sparkles },
]

type CreditRow = { tag: string; value: string; state?: 'done' | 'pending'; featured?: boolean }

const creditRows: CreditRow[] = [
  { tag: 'Crumbs', value: '29 credits', state: 'done' },
  { tag: 'SipDay', value: '16 credits', state: 'done', featured: true },
  { tag: 'Your app', value: 'Building…', state: 'pending' },
  { tag: 'Extra', value: '$5 = 60 credits' },
]

const ease = [0.16, 1, 0.3, 1] as const

/* ------------------------------------------------------------- section */

export function Faq() {
  return (
    <Section id="faq" className="bg-[#111113] py-[72px] md:py-28 lg:py-[136px]">
      <div className="mx-auto flex max-w-[960px] flex-col items-center gap-9 md:gap-14">
        <Reveal>
          <h2 className="text-center font-display text-[44px] leading-[44px] tracking-[-0.8px] text-[#F5F1EA] md:text-[56px] md:leading-none md:tracking-[-1.4px] lg:text-[68px]">
            Short answers,
            <br /> before you build.
          </h2>
        </Reveal>

        <div className="flex w-full flex-col gap-6 md:gap-7">
          <div className="grid gap-3 lg:grid-cols-[470px_1fr]">
            <Reveal delay={0.06}>
              <Accordion items={faqs} />
            </Reveal>
            <Reveal delay={0.12} className="h-[400px] md:h-[523px] lg:h-auto lg:min-h-[523px]">
              <ExpoVisual />
            </Reveal>
          </div>

          <div className="grid gap-8 md:grid-cols-2 md:gap-3">
            <Reveal delay={0.06}>
              <ImageCard
                img={creditsImg}
                title="Credits, explained."
                desc="A 5-screen recipe app used 29 credits. Extra credits are $5 for 60, on paid plans."
              >
                <CreditList />
              </ImageCard>
            </Reveal>
            <Reveal delay={0.12}>
              <ImageCard
                img={founderImg}
                title="Still have a question?"
                desc="Ilyos, the founder, reads every message. Write on X or join the community."
              >
                <FounderCard />
              </ImageCard>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ----------------------------------------------------------- accordion */

/**
 * Reserves the height of its tallest state (all headers + the longest answer),
 * so opening or closing an item never moves the content around it.
 */
function useReservedHeight() {
  const listRef = useRef<HTMLDivElement>(null)
  const [reserved, setReserved] = useState<number>()

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return

    const measure = () => {
      // Closed height of an item = its header + its own bottom padding (mobile only).
      const closedItems = [...list.querySelectorAll<HTMLElement>('[data-acc-item]')].map(
        (item) =>
          (item.querySelector<HTMLElement>('[data-acc-header]')?.offsetHeight ?? 0) +
          (parseFloat(getComputedStyle(item).paddingBottom) || 0),
      )
      const bodies = [...list.querySelectorAll<HTMLElement>('[data-acc-body]')]
      const gap = parseFloat(getComputedStyle(list).rowGap) || 0
      const closed = closedItems.reduce((sum, h) => sum + h, 0) + gap * (closedItems.length - 1)
      const longest = Math.max(0, ...bodies.map((b) => b.offsetHeight))
      setReserved(Math.ceil(closed + longest))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => observer.disconnect()
  }, [])

  return { listRef, reserved }
}

function Accordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)
  const baseId = useId()
  const { listRef, reserved } = useReservedHeight()

  return (
    <div ref={listRef} style={{ minHeight: reserved }} className="flex flex-col gap-1.5">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          baseId={`${baseId}-${item.id}`}
          open={openId === item.id}
          onToggle={() => setOpenId((cur) => (cur === item.id ? null : item.id))}
        />
      ))}
    </div>
  )
}

type AccordionItemProps = {
  item: FaqItem
  baseId: string
  open: boolean
  onToggle: () => void
}

function AccordionItem({ item, baseId, open, onToggle }: AccordionItemProps) {
  const { icon: Icon, question, answer, points } = item
  const buttonId = `${baseId}-button`
  const panelId = `${baseId}-panel`

  return (
    <div
      data-acc-item
      className={cn(
        'rounded-2xl pb-[5px] ring-1 ring-white/5 transition-colors duration-300 ring-inset lg:pb-0',
        open ? 'bg-[#212125]' : 'bg-[#1A1A1D] hover:bg-[#1F1F23]',
      )}
    >
      <h3 data-acc-header>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full cursor-pointer items-center gap-3 rounded-2xl px-5 pt-[19px] pb-[14px] text-left lg:pb-[19px]"
        >
          <Icon
            aria-hidden
            className={cn(
              'size-[19px] shrink-0 transition-colors duration-300',
              open ? 'text-[#FF6A2B]' : 'text-[#8E8E96] group-hover:text-[#B8B8BF]',
            )}
          />
          <span
            className={cn(
              'flex-1 text-[16px] transition-colors duration-300 md:text-[16.5px]',
              open ? 'font-semibold text-white' : 'text-[#B8B8BF] group-hover:text-white',
            )}
          >
            {question}
          </span>
          <span aria-hidden className="relative size-[18px] shrink-0">
            <Minus
              className={cn(
                'absolute inset-0 size-[18px] transition-colors duration-300',
                open ? 'text-white' : 'text-[#8E8E96]',
              )}
            />
            <Plus
              className={cn(
                'absolute inset-0 size-[18px] text-[#8E8E96] transition-[transform,opacity] duration-300 ease-out-expo',
                open ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100',
              )}
            />
          </span>
        </button>
      </h3>

      {/* Always mounted (collapsed panels stay measurable for the reserved height). */}
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!open}
        inert={!open}
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease }}
        className="overflow-hidden"
      >
        <div data-acc-body className="flex flex-col gap-3.5 pr-6 pb-4 pl-5 lg:pb-[21px]">
          <p className="text-[15px] leading-[23px] text-[#D4D4D8]">{answer}</p>
          {points && (
            <ul className="flex flex-col gap-[9px]">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-[9px] text-[14px] text-[#A1A1AA]">
                  <Check aria-hidden className="size-3.5 shrink-0 text-[#FF6A2B]" />
                  {point}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  )
}

/* -------------------------------------------------------------- visuals */

function Photo({ src, className }: { src: string; className?: string }) {
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      decoding="async"
      className={cn('absolute inset-0 size-full object-cover', className)}
    />
  )
}

/** Tall painted card with a glass "opening in Expo Go" panel. */
function ExpoVisual() {
  return (
    <figure
      aria-label="Opening Crumbs in Expo Go: free, 2 platforms, 0 setup steps"
      className="h-full rounded-[22px] bg-[#1A1A1D] p-1.5 ring-1 ring-white/5 ring-inset md:rounded-[26px]"
    >
      <div className="relative grid h-full place-items-center overflow-hidden rounded-[20px] px-3">
        <Photo src={flowerImg} />
        <div
          aria-hidden
          className="relative flex w-full max-w-[300px] flex-col gap-2.5 rounded-[20px] bg-white/14 p-3 shadow-[0_20px_40px_#00000040] ring-1 ring-white/20 backdrop-blur-[15px] ring-inset md:max-w-[340px]"
        >
          <div className="flex items-center gap-2.5 px-1 pt-1 pb-1.5">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white">
              <QrCode className="size-[13px] text-[#FF6A2B]" />
            </span>
            <span className="text-[14px] font-medium text-white">Opening Crumbs in Expo Go…</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {expoStats.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="flex h-[96px] flex-col justify-between rounded-xl bg-white/12 p-3"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[20px] font-medium text-white">{value}</span>
                  <Icon className="size-3.5 text-white/70" />
                </div>
                <span className="text-[11.5px] leading-4 text-white/70">{label}</span>
              </div>
            ))}
            <div className="grid h-[96px] place-items-center rounded-xl bg-white/8">
              <span className="size-[22px] animate-spin rounded-full border-2 border-white/15 border-t-white/80 [animation-duration:1.2s]" />
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}

type ImageCardProps = {
  img: string
  title: string
  desc: string
  children: ReactNode
}

function ImageCard({ img, title, desc, children }: ImageCardProps) {
  return (
    <figure className="flex flex-col gap-[18px]">
      <div className="relative grid h-[250px] place-items-center overflow-hidden rounded-[20px] px-3 md:h-[270px] md:rounded-[22px]">
        <Photo src={img} />
        <div className="relative w-full max-w-[300px]">{children}</div>
      </div>
      <figcaption className="flex flex-col gap-1 px-1 md:px-3.5">
        <h3 className="text-[15px] font-semibold text-[#F4F4F5]">{title}</h3>
        <p className="text-[14px] leading-[21px] text-[#8E8E96]">{desc}</p>
      </figcaption>
    </figure>
  )
}

function CreditList() {
  return (
    <ul aria-label="Credits used per app" className="flex flex-col items-center gap-2">
      {creditRows.map(({ tag, value, state, featured }) => (
        <li
          key={tag}
          className={cn(
            'flex items-center gap-2 rounded-xl px-2 py-[7px]',
            featured
              ? 'w-full bg-white/90 shadow-[0_8px_20px_#5A1A0A33]'
              : 'w-[83%] bg-white/20 ring-1 ring-white/25 backdrop-blur-[10px] ring-inset',
          )}
        >
          <span
            className={cn(
              'rounded-lg px-2 py-1 text-[12px] font-medium',
              featured ? 'bg-[#F2EEE7] text-[#1C1B17]' : 'bg-white/18 text-white',
            )}
          >
            {tag}
          </span>
          <span
            className={cn(
              'flex-1 text-right text-[12px]',
              featured ? 'text-ink-2' : 'text-white/80',
            )}
          >
            {value}
          </span>
          {state === 'done' && (
            <span
              aria-label="Done"
              className="grid size-5 shrink-0 place-items-center rounded-md bg-[#FF6A2B]"
            >
              <Check aria-hidden className="size-3 text-white" />
            </span>
          )}
          {state === 'pending' && (
            <span aria-hidden className="size-5 shrink-0 animate-pulse rounded-md bg-white/90" />
          )}
        </li>
      ))}
    </ul>
  )
}

function FounderCard() {
  return (
    <div className="flex flex-col gap-3 rounded-[18px] bg-white/90 p-3.5 shadow-[0_16px_36px_#5A1A0A40]">
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="grid size-[30px] shrink-0 place-items-center rounded-full bg-[#1C1B17] text-[11px] font-bold text-white"
        >
          IO
        </span>
        <div className="flex flex-col gap-px">
          <span className="text-[13px] font-semibold text-[#1C1B17]">Ilyos Olimov</span>
          <span className="text-[11px] text-ink-3">Founder · Tashkent</span>
        </div>
      </div>
      <p className="rounded-xl bg-[#F2EEE7] px-3 py-2.5 text-[13px] text-ink-2">
        Hi! How can I help you?
      </p>
      <div className="flex flex-wrap gap-1.5">
        <a
          href={FOUNDER_X_URL}
          className="inline-flex items-center gap-[5px] rounded-[9px] bg-[#1C1B17] px-[11px] py-[7px] text-[12px] font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-[#33312a] active:scale-[0.97]"
        >
          Write on X
          <ArrowUpRight aria-hidden className="size-3" />
        </a>
        <a
          href={COMMUNITY_URL}
          className="inline-flex items-center rounded-[9px] px-[11px] py-[7px] text-[12px] font-semibold text-[#1C1B17] ring-1 ring-[#1C1B17]/15 transition-[background-color,transform] duration-200 ring-inset hover:bg-[#1C1B17]/5 active:scale-[0.97]"
        >
          Join the community
        </a>
      </div>
    </div>
  )
}
