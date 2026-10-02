import { motion, useReducedMotion, type Variants } from 'motion/react'
import {
  Braces,
  ChevronRight,
  CircleCheck,
  CodeXml,
  Download,
  File,
  FileCode,
  Folder,
  GitBranch,
  Package,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/cn'

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

const C = {
  punct: '#8C887F',
  key: '#9CC4FF',
  str: '#A8D8A0',
} as const

type Token = { text: string; color: string }
type CodeLine = { indent: number; tokens: Token[] }

const p = (text: string): Token => ({ text, color: C.punct })

/** `"key": "value",` */
const kv = (key: string, value: string, indent: number, comma = true): CodeLine => ({
  indent,
  tokens: [
    { text: `"${key}"`, color: C.key },
    p(': '),
    { text: `"${value}"`, color: C.str },
    ...(comma ? [p(',')] : []),
  ],
})

/** `"key": {` */
const open = (key: string, indent: number): CodeLine => ({
  indent,
  tokens: [{ text: `"${key}"`, color: C.key }, p(': {')],
})

const PACKAGE_JSON: CodeLine[] = [
  { indent: 0, tokens: [p('{')] },
  kv('name', 'crumbs', 1),
  kv('version', '1.0.0', 1),
  kv('main', './entry.js', 1),
  open('scripts', 1),
  kv('start', 'expo start', 2),
  kv('android', 'expo start --android', 2),
  kv('ios', 'expo start --ios', 2, false),
  { indent: 1, tokens: [p('},')] },
  open('dependencies', 1),
  kv('expo', '~54.0.0', 2),
  kv('expo-asset', '~12.0.12', 2),
  kv('expo-constants', '~18.0.13', 2),
  kv('expo-router', '~6.0.23', 2, false),
  { indent: 1, tokens: [p('}')] },
  { indent: 0, tokens: [p('}')] },
]

type Tab = { name: string; icon: LucideIcon; active?: boolean }
const TABS: Tab[] = [
  { name: 'package.json', icon: Braces, active: true },
  { name: 'app/(tabs)/index.tsx', icon: FileCode },
  { name: 'app.json', icon: Braces },
]

type TreeItem = { name: string; folder?: boolean; active?: boolean }
const TREE: TreeItem[] = [
  { name: 'app', folder: true },
  { name: 'components', folder: true },
  { name: 'constants', folder: true },
  { name: 'design-system', folder: true },
  { name: 'hooks', folder: true },
  { name: 'app.json' },
  { name: 'entry.js' },
  { name: 'index.ts' },
  { name: 'metro.config.js' },
  { name: 'package.json', active: true },
  { name: 'README.md' },
  { name: 'tsconfig.json' },
]

/** `wide` items only show from md up (the mobile design keeps the first two). */
const STATUS: { label: string; icon: LucideIcon; wide?: boolean }[] = [
  { label: 'main', icon: GitBranch },
  { label: 'Expo SDK 54', icon: Package },
  { label: 'TypeScript', icon: CodeXml, wide: true },
  { label: 'No problems', icon: CircleCheck, wide: true },
]

const LIGHTS = ['bg-[#FF5F57CC]', 'bg-[#FEBC2ECC]', 'bg-[#28C840CC]']

/* ------------------------------------------------------------------ */
/* Motion                                                             */
/* ------------------------------------------------------------------ */

const EASE = [0.16, 1, 0.3, 1] as const

const codeVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.35 } },
}

/** Each line slides in a few px and fades — transform/opacity only; its space is always reserved. */
const lineVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE },
  },
}

/* ------------------------------------------------------------------ */
/* Components                                                         */
/* ------------------------------------------------------------------ */

function TitleBar() {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/6 bg-[#16161A] px-3.5 py-3 md:px-4 md:py-3.5">
      <div className="flex gap-2" aria-hidden="true">
        {LIGHTS.map((bg) => (
          <span key={bg} className={cn('size-3 rounded-full', bg)} />
        ))}
      </div>
      <p className="min-w-0 truncate font-mono text-[13px] text-text-3">crumbs — package.json</p>
      <button
        type="button"
        className="hidden shrink-0 items-center gap-1.5 rounded-lg bg-white/6 px-3 py-1.5 text-[13px] font-medium text-text transition-colors duration-200 hover:bg-white/12 active:bg-white/16 md:flex"
      >
        <Download className="size-[14px]" aria-hidden="true" />
        Download ZIP
      </button>
    </div>
  )
}

function Tabs() {
  return (
    <ul className="no-scrollbar flex overflow-x-auto border-b border-white/6 bg-[#131316]">
      {TABS.map(({ name, icon: Icon, active }) => (
        <li
          key={name}
          className={cn(
            'flex shrink-0 items-center gap-2 px-4 py-2.5 font-mono text-[12px] whitespace-nowrap',
            active
              ? '-mb-px border-t-2 border-[#D9B97A] bg-[#0E0E11] text-[#ECE7DE]'
              : 'border-r border-white/6 text-[#8A857B]',
          )}
        >
          <Icon
            className={cn('size-[13px]', active ? 'text-[#D9B97A]' : 'text-[#6F6C66]')}
            aria-hidden="true"
          />
          {name}
        </li>
      ))}
    </ul>
  )
}

function FileTree() {
  return (
    <nav
      aria-label="Project files"
      className="hidden w-[230px] shrink-0 flex-col gap-0.5 border-r border-white/6 px-2.5 py-4 md:flex"
    >
      <p className="font-mono text-[11px] tracking-[1px] text-text-3">CRUMBS</p>
      <ul className="flex flex-col gap-0.5">
        {TREE.map(({ name, folder, active }) => (
          <li
            key={name}
            className={cn(
              'flex items-center gap-2 rounded-md px-2 py-1.5 font-mono text-[13px]',
              active ? 'bg-white/6 text-text' : 'text-text-2',
            )}
          >
            {folder && <ChevronRight className="size-3 text-text-3" aria-hidden="true" />}
            {folder ? (
              <Folder className="size-[14px] text-text-3" aria-hidden="true" />
            ) : (
              <File
                className={cn('size-[14px]', active ? 'text-text' : 'text-text-3')}
                aria-hidden="true"
              />
            )}
            {name}
          </li>
        ))}
      </ul>
    </nav>
  )
}

function Code() {
  const reduce = useReducedMotion()
  return (
    <motion.pre
      variants={codeVariants}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      className="no-scrollbar flex h-[290px] min-w-0 flex-1 flex-col gap-[5px] overflow-hidden p-4 font-mono md:h-auto md:overflow-x-auto md:p-5"
      aria-label="package.json"
    >
      {PACKAGE_JSON.map((line, i) => (
        <motion.code key={i} variants={lineVariants} className="flex items-center">
          <span className="w-8 shrink-0 text-[13px] text-[#4A4844] select-none" aria-hidden="true">
            {i + 1}
          </span>
          <span className="text-[13.5px] whitespace-pre">
            {'  '.repeat(line.indent)}
            {line.tokens.map((t, j) => (
              <span key={j} style={{ color: t.color }}>
                {t.text}
              </span>
            ))}
            {i === PACKAGE_JSON.length - 1 && (
              <span
                className="ml-0.5 inline-block h-[15px] w-[7px] translate-y-[2px] animate-caret bg-[#D9B97A]"
                aria-hidden="true"
              />
            )}
          </span>
        </motion.code>
      ))}
    </motion.pre>
  )
}

function StatusBar() {
  return (
    <ul className="no-scrollbar flex items-center gap-[18px] overflow-x-auto border-t border-white/6 bg-[#16161A] px-3.5 py-[7px]">
      {STATUS.map(({ label, icon: Icon, wide }) => (
        <li
          key={label}
          className={cn(
            'shrink-0 items-center gap-1.5 font-mono text-[11px] whitespace-nowrap text-[#8A857B]',
            wide ? 'hidden md:flex' : 'flex',
          )}
        >
          <Icon className="size-3" aria-hidden="true" />
          {label}
        </li>
      ))}
    </ul>
  )
}

/** Dark code-editor window showing the generated project's package.json. */
export function CodeEditor({ className }: { className?: string }) {
  return (
    <figure
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl bg-[#0E0E11] shadow-[inset_0_0_0_1px_#FFFFFF1F,0_40px_90px_#1A140A80] md:rounded-[20px]',
        className,
      )}
    >
      <TitleBar />
      <Tabs />
      <div className="flex md:h-[450px]">
        <FileTree />
        <Code />
      </div>
      <StatusBar />
    </figure>
  )
}
