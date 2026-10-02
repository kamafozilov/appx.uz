import { useEffect, useRef } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react'
import { ArrowRight, Plus, X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import reactNativeImg from '@/assets/img/generated-28.webp'
import chattingImg from '@/assets/img/generated-29.webp'

type StatTile = {
  kind: 'stat'
  value: number
  suffix?: string
  caption: string
  /** Caption above the number instead of below. */
  captionFirst?: boolean
}
type ImageTile = { kind: 'image'; title: [string, string]; image: string }
type Tile = StatTile | ImageTile

/** Desktop column templates match the design (312 / 312 / fill at 1200px). */
const ROWS: { cols: string; tiles: Tile[] }[] = [
  {
    cols: 'lg:grid-cols-[312fr_312fr_552fr]',
    tiles: [
      {
        kind: 'stat',
        value: 100,
        suffix: '%',
        caption: 'Of your code is yours. Download the full project as a ZIP, on every plan.',
      },
      {
        kind: 'stat',
        value: 2,
        caption: 'Platforms your app opens on with Expo Go: iPhone and Android.',
        captionFirst: true,
      },
      { kind: 'image', title: ['A real React', 'Native app'], image: reactNativeImg },
    ],
  },
  {
    cols: 'lg:grid-cols-[552fr_312fr_312fr]',
    tiles: [
      { kind: 'image', title: ['Change anything', 'by chatting'], image: chattingImg },
      {
        kind: 'stat',
        value: 1,
        caption: 'Database for each app with AppX Backend, from the Starter plan.',
      },
      {
        kind: 'stat',
        value: 3,
        caption: "Interface languages: English, Русский and O'zbekcha.",
        captionFirst: true,
      },
    ],
  },
]

const NOT_YET = [
  { title: 'App Store publishing', body: 'Not automatic yet. A person helps you publish instead.' },
  { title: 'Install without the stores', body: "Until it's published, your app opens in Expo Go." },
  { title: 'Self-hosted backend', body: 'With AppX Backend on, your data lives on AppX servers.' },
]

/** Counts from 0 to `value` the first time it scrolls into view. */
function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const final = `${value}${suffix}`
  const count = useMotionValue(reduce ? value : 0)
  const text = useTransform(count, (v) => `${Math.round(v)}${suffix}`)

  useEffect(() => {
    if (reduce) {
      count.set(value)
      return
    }
    if (!inView) return
    const controls = animate(count, value, {
      duration: value > 10 ? 1.6 : 0.9,
      ease: [0.16, 1, 0.3, 1],
    })
    return () => controls.stop()
  }, [inView, reduce, value, count])

  // An invisible copy of the final value reserves the width, so the counting digits
  // (overlaid, left-aligned) never change the box size.
  return (
    <span ref={ref} className="relative inline-block tabular-nums">
      <span aria-hidden className="invisible">
        {final}
      </span>
      <motion.span aria-hidden className="absolute inset-0">
        {text}
      </motion.span>
      <span className="sr-only">{final}</span>
    </span>
  )
}

function Stat({ tile }: { tile: StatTile }) {
  const number = (
    <p className="font-display text-[min(64px,16.5vw)] leading-[61px] tracking-[-1.5px] whitespace-nowrap text-ink md:text-[96px] md:leading-[91px] md:tracking-[-2px]">
      <CountUp value={tile.value} suffix={tile.suffix} />
    </p>
  )
  const caption = (
    <p className="text-[14px] leading-5 text-ink md:text-[17px] md:leading-[26px]">
      {tile.caption}
    </p>
  )
  return (
    <div className="flex h-[250px] flex-col justify-between rounded-[20px] bg-white p-[18px] shadow-[0_1px_2px_#1A140A0F] md:h-[360px] md:rounded-[22px] md:p-7 lg:h-[420px]">
      {tile.captionFirst ? caption : number}
      {tile.captionFirst ? number : caption}
    </div>
  )
}

function MiniLogo() {
  const ring = 'size-2.5 ring-2 ring-inset ring-white'
  return (
    <span className="flex items-center gap-2 text-white">
      <span aria-hidden className="grid size-[22px] grid-cols-2 gap-0.5">
        <span className={cn(ring, 'rounded-full')} />
        <span className={cn(ring, 'rounded-full')} />
        <span className={cn(ring, 'rounded-r-[5px]')} />
        <X className="size-2.5" strokeWidth={2.6} />
      </span>
      <span className="text-[16px] font-semibold">AppX</span>
    </span>
  )
}

function Photo({ tile }: { tile: ImageTile }) {
  return (
    <div className="group relative flex h-[300px] flex-col justify-between overflow-hidden rounded-[22px] p-7 md:h-[360px] lg:h-[420px]">
      <img
        src={tile.image}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,#00000026_0%,#00000000_30%,#00000000_50%,#000000A6_100%)]"
      />
      <div className="relative flex items-center justify-between">
        <MiniLogo />
        <span aria-hidden className="flex size-7 items-center justify-center rounded-full bg-white">
          <Plus className="size-4 text-ink" />
        </span>
      </div>
      <h3 className="relative font-display text-[40px] leading-none tracking-[-0.8px] text-white md:text-[52px]">
        {tile.title[0]}
        <br />
        {tile.title[1]}
      </h3>
    </div>
  )
}

export function Included() {
  return (
    <Section className="bg-[#F6F1E8] py-[72px] md:py-20 lg:py-32">
      <Reveal className="flex flex-col items-start gap-5 pb-8 md:flex-row md:items-end md:justify-between md:gap-8 md:pb-10 lg:pb-11">
        <h2 className="font-display text-[42px] leading-none tracking-[-0.8px] text-balance text-ink md:text-[52px] md:tracking-[-1.2px] lg:text-[64px]">
          What you get, and
          <br /> what you don't (yet).
        </h2>
        <a
          href="#pricing"
          className="group flex shrink-0 items-center gap-2 rounded-xl bg-ink px-[22px] py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-ink/85 active:translate-y-px"
        >
          See pricing
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      </Reveal>

      <div className="flex flex-col gap-2.5 md:gap-3">
        {ROWS.map((row, r) => (
          <div key={r} className={cn('grid grid-cols-2 gap-2.5 md:gap-3', row.cols)}>
            {row.tiles.map((tile, i) => (
              <Reveal
                key={i}
                delay={i * 0.08}
                // Mobile: the image card leads its row, full width; stats pair up below.
                className={cn(
                  tile.kind === 'image' && 'order-first col-span-2 md:order-none lg:col-span-1',
                )}
              >
                {tile.kind === 'stat' ? <Stat tile={tile} /> : <Photo tile={tile} />}
              </Reveal>
            ))}
          </div>
        ))}

        <Reveal className="flex flex-col gap-4 rounded-[22px] bg-white p-[22px] md:gap-6 md:rounded-[28px] md:px-8 md:py-7 lg:flex-row lg:gap-12">
          <div className="flex shrink-0 flex-col gap-1 md:gap-1.5 lg:w-[220px]">
            <h3 className="font-display text-[30px] leading-[30px] text-ink md:text-[34px] md:leading-[34px]">
              Not yet
            </h3>
            <p className="text-[14px] text-ink-3">On the roadmap, honestly labelled.</p>
          </div>
          <ul className="flex flex-1 flex-col gap-4 md:grid md:grid-cols-3 md:gap-8 lg:gap-12">
            {NOT_YET.map((item) => (
              <li
                key={item.title}
                className="flex min-h-[97px] flex-col gap-1 border-t border-line pt-4 md:min-h-0 md:gap-1.5 md:border-t-0 md:pt-0"
              >
                <h4 className="text-[16px] font-semibold text-ink-2">{item.title}</h4>
                <p className="text-[14px] leading-[21px] text-ink-3">{item.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
