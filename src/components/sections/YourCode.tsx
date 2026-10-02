import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import {
  CodeXml,
  Database,
  Download,
  FolderDown,
  Package,
  SquareTerminal,
  type LucideIcon,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import { CodeEditor } from './your-code/CodeEditor'
import libraryImg from '@/assets/img/generated-9.webp'

const EASE = [0.16, 1, 0.3, 1] as const

const EDITORS = ['VS Code', 'Cursor', 'Zed']

const TERMINAL_LINES = [
  { text: '$ npx expo start', className: 'text-[13px] text-[#ECE7DE]' },
  { text: '› Metro waiting on exp://192.168.0.4', className: 'text-[12px] text-[#A8D8A0]' },
  { text: '› Scan the QR code with Expo Go', className: 'text-[12px] text-[#8A857B]' },
]

type Feature = { icon: LucideIcon; title: string; desc: string }
const FEATURES: Feature[] = [
  {
    icon: Package,
    title: 'Standard Expo project',
    desc: 'Every app is a standard Expo SDK 54 and React Native project.',
  },
  {
    icon: FolderDown,
    title: 'ZIP on every plan',
    desc: 'Download the full project whenever you want, even on Basic.',
  },
  {
    icon: CodeXml,
    title: 'Open it anywhere',
    desc: 'VS Code, Cursor or any editor you like. No lock-in.',
  },
  {
    icon: Database,
    title: 'About AppX Backend',
    desc: 'With it on, your data lives on AppX servers. Move it if you export.',
  },
]

/** Card that drifts into place when the stage scrolls into view. */
function FloatingCard({
  className,
  delay,
  from,
  children,
}: {
  className?: string
  delay: number
  from: { x?: number; y?: number }
  children: ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function TerminalCard() {
  return (
    <div className="flex h-full flex-col gap-2 rounded-[18px] bg-[#141417] p-4 font-mono whitespace-nowrap shadow-[0_1px_2px_#1A140A1A,0_24px_50px_#1A140A40] ring-1 ring-white/10 ring-inset">
      <p className="flex items-center gap-1.5 font-sans text-[12px] text-[#8A857B]">
        <SquareTerminal className="size-[13px]" aria-hidden="true" />
        Terminal
      </p>
      {TERMINAL_LINES.map((line, i) => (
        <motion.p
          key={line.text}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 1.6 + i * 0.45 }}
          className={cn('truncate', line.className)}
        >
          {line.text}
        </motion.p>
      ))}
    </div>
  )
}

function OpenInCard() {
  return (
    <div className="flex h-full flex-col gap-3 rounded-[18px] bg-white p-4 shadow-[0_1px_2px_#1A140A1A,0_24px_50px_#1A140A40]">
      <p className="text-[14px] font-semibold text-ink">Open it in any editor</p>
      <ul className="flex flex-wrap gap-1.5">
        {EDITORS.map((name) => (
          <li
            key={name}
            className="flex items-center gap-[5px] rounded-lg bg-[#F2EEE7] px-2.5 py-1.5 text-[12px] font-medium text-ink-2"
          >
            <CodeXml className="size-3" aria-hidden="true" />
            {name}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ZipCard() {
  return (
    <div className="flex h-full items-center gap-3.5 rounded-[20px] bg-white p-4 shadow-[0_1px_2px_#1A140A14,0_20px_44px_#1A140A26]">
      <span
        className="flex h-12 w-10 shrink-0 items-center justify-center rounded-[6px_14px_6px_6px] bg-[#F3E7D3] text-[11px] font-bold text-gold"
        aria-hidden="true"
      >
        ZIP
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-[15px] font-semibold text-ink">crumbs.zip</p>
        <p className="text-[12px] text-ink-3">Ready to download</p>
      </div>
      <button
        type="button"
        className="flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-3.5 py-[9px] text-[13px] font-semibold text-white transition-[opacity,translate] duration-200 hover:-translate-y-px hover:opacity-90 active:translate-y-0"
      >
        <Download className="size-[14px]" aria-hidden="true" />
        Download
      </button>
    </div>
  )
}

/**
 * Painted library backdrop with the editor window and three floating cards.
 * <lg: one column (mobile design order: editor-picker card, editor, terminal, ZIP),
 *      md adds a 2-col grid for the two small cards.
 * ≥lg: the cards float at the design's absolute positions over the editor.
 * The wrapper only fades (y=0) so it doesn't double-translate with the cards.
 */
function CodeVisual() {
  return (
    <Reveal
      y={0}
      className="relative flex w-full flex-col gap-3 overflow-hidden rounded-[24px] px-3.5 py-5 md:grid md:grid-cols-2 md:gap-4 md:rounded-[28px] md:p-6 lg:block lg:h-[660px] lg:p-0"
    >
      <img
        src={libraryImg}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,#1A140A00_30%,#1A140A4D_100%)]"
        aria-hidden="true"
      />

      <CodeEditor className="relative z-[1] md:col-span-2 lg:absolute lg:inset-x-0 lg:top-[72px] lg:mx-auto lg:w-[860px] lg:max-w-[calc(100%-48px)]" />

      <FloatingCard
        delay={0.5}
        from={{ x: -24, y: 16 }}
        className="relative z-[2] md:col-span-2 lg:absolute lg:top-[452px] lg:left-[84px] lg:w-[330px]"
      >
        <TerminalCard />
      </FloatingCard>
      <FloatingCard
        delay={0.7}
        from={{ x: 24, y: -12 }}
        className="relative z-[3] order-first md:order-none lg:absolute lg:top-10 lg:right-[50px] lg:w-[270px]"
      >
        <OpenInCard />
      </FloatingCard>
      <FloatingCard
        delay={0.9}
        from={{ x: 24, y: 20 }}
        className="relative z-[4] lg:absolute lg:top-[512px] lg:right-[50px] lg:w-[340px]"
      >
        <ZipCard />
      </FloatingCard>
    </Reveal>
  )
}

function Features() {
  return (
    <ul className="flex flex-col md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-4">
      {FEATURES.map(({ icon: Icon, title, desc }, i) => (
        <motion.li
          key={title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
          className="flex gap-3.5 border-t border-line py-[18px] last:border-b md:flex-col md:gap-2.5 md:pt-[22px] md:pb-0 md:last:border-b-0"
        >
          <Icon className="size-[22px] shrink-0 text-gold" aria-hidden="true" />
          <div className="flex flex-1 flex-col gap-1 md:gap-2.5">
            <h3 className="text-[17px] font-semibold tracking-[-0.2px] text-ink md:text-[18px]">
              {title}
            </h3>
            <p className="text-[15px] leading-[23px] text-ink-3 md:leading-6">{desc}</p>
          </div>
        </motion.li>
      ))}
    </ul>
  )
}

export function YourCode() {
  return (
    <Section id="your-code" className="bg-paper py-[72px] md:py-20 lg:py-32">
      <div className="flex flex-col gap-8 md:gap-10 lg:gap-14">
        <SectionHeader
          title={
            <>
              Your code is yours.
              <br />
              On every plan.
            </>
          }
          intro="Every app is a standard Expo and React Native project. Download the full ZIP whenever you want and open it in any editor."
        />
        <CodeVisual />
        <Features />
      </div>
    </Section>
  )
}
