import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/cn'

const NAV_LINKS = [
  { id: 'examples', label: 'Examples' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'FAQ' },
] as const

type SectionId = (typeof NAV_LINKS)[number]['id']

const EASE = [0.16, 1, 0.3, 1] as const

/** Tracks which nav section sits in the middle band of the viewport. */
function useActiveSection(initial: SectionId) {
  const [active, setActive] = useState<SectionId>(initial)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting)
        if (hit) setActive(hit.target.id as SectionId)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    // Sections below the hero are lazy-loaded, so keep attaching until all of them exist.
    const pending = new Set<string>(NAV_LINKS.map(({ id }) => id))
    const attach = () => {
      for (const id of pending) {
        const el = document.getElementById(id)
        if (el) {
          observer.observe(el)
          pending.delete(id)
        }
      }
      if (!pending.size) mutations.disconnect()
    }
    const mutations = new MutationObserver(attach)
    mutations.observe(document.body, { childList: true, subtree: true })
    attach()

    return () => {
      observer.disconnect()
      mutations.disconnect()
    }
  }, [])

  return active
}

function GetStarted({ className }: { className?: string }) {
  return (
    <a
      href="#pricing"
      className={cn(
        'group flex items-center gap-1.5 rounded-full bg-ink text-white shadow-[0_4px_12px_#1A140A26] lg:gap-2',
        'font-semibold whitespace-nowrap transition-[background-color,transform] duration-200 hover:bg-[#2A2720] active:scale-[0.97]',
        className,
      )}
    >
      Get started
      <ArrowRight
        aria-hidden
        className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 lg:size-4"
      />
    </a>
  )
}

function DesktopLinks({ active }: { active: SectionId }) {
  return (
    <ul
      className={cn(
        'absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full p-1 lg:flex',
        'border border-white/70 bg-white/32 backdrop-blur-[12px]',
        'shadow-[0_8px_24px_#1A2A3A14,inset_0_1px_0_#FFFFFF80]',
      )}
    >
      {NAV_LINKS.map(({ id, label }) => {
        const isActive = id === active
        return (
          <li key={id} className="relative">
            {isActive && (
              <motion.span
                layoutId="nav-active-pill"
                aria-hidden
                className="absolute inset-0 rounded-full bg-white/90 shadow-[0_1px_2px_#1A140A1A,0_4px_12px_#1A140A12]"
                transition={{ type: 'spring', stiffness: 420, damping: 36 }}
              />
            )}
            <a
              href={`#${id}`}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'relative block rounded-full px-[18px] py-[9px] text-[14px] whitespace-nowrap transition-colors duration-200',
                isActive ? 'font-semibold text-ink' : 'font-medium text-[#3A3833] hover:text-ink',
              )}
            >
              {label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

function MobileMenu({ active, onClose }: { active: SectionId; onClose: () => void }) {
  return (
    <motion.div
      id="mobile-menu"
      // Transform/opacity only; the panel is absolutely positioned, so the page never moves.
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.32, ease: EASE } }}
      exit={{ opacity: 0, y: -6, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }}
      className="absolute inset-x-4 top-[calc(100%+4px)] rounded-[20px] border border-white/70 bg-paper/95 p-2 shadow-[0_24px_64px_#2A3A4A2E] backdrop-blur-xl sm:inset-x-8 lg:hidden"
    >
      <ul className="flex flex-col">
        {NAV_LINKS.map(({ id, label }, i) => (
          <motion.li
            key={id}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.03 + i * 0.04, ease: EASE }}
          >
            <a
              href={`#${id}`}
              onClick={onClose}
              className={cn(
                'flex items-center justify-between rounded-[14px] px-4 py-3.5 text-[16px] transition-colors duration-200 hover:bg-stone/60 active:bg-stone/80',
                id === active ? 'bg-white font-semibold text-ink' : 'font-medium text-[#3A3833]',
              )}
            >
              {label}
              <ArrowRight aria-hidden className="size-4 text-ink-3" />
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

export function Navbar() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection('examples')
  const headerRef = useRef<HTMLElement>(null)

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24))

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    // Tapping anywhere outside the bar/menu closes it (nothing is scroll-locked).
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [open])

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      {/* Static frosted bar that only fades its opacity (never transitions the blur itself). */}
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 border-b border-line/70 bg-ivory/70 backdrop-blur-xl transition-opacity duration-500',
          scrolled || open ? 'opacity-100' : 'opacity-0',
        )}
      />
      <nav
        aria-label="Main"
        className="relative flex h-16 items-center justify-between px-5 sm:px-8 lg:h-20 lg:px-12 xl:px-[120px]"
      >
        <Logo className="[&>span:last-child]:text-[18px] lg:[&>span:last-child]:text-[20px]" />
        <DesktopLinks active={active} />
        <div className="flex items-center gap-2">
          <GetStarted className="px-3.5 py-[9px] text-[14px] lg:px-[18px] lg:py-[11px] lg:text-[15px]" />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative grid size-10 cursor-pointer place-items-center rounded-full border border-white/70 bg-white/55 text-ink backdrop-blur-[8px] transition-[background-color,transform] duration-200 hover:bg-white/80 active:scale-[0.94] lg:hidden"
          >
            {/* Both icons stay mounted and cross-fade/rotate in place: no remounts, no layout. */}
            <Menu
              aria-hidden
              className={cn(
                'col-start-1 row-start-1 size-5 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                open ? 'scale-60 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100',
              )}
            />
            <X
              aria-hidden
              className={cn(
                'col-start-1 row-start-1 size-5 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                open ? 'scale-100 rotate-0 opacity-100' : 'scale-60 -rotate-90 opacity-0',
              )}
            />
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && <MobileMenu active={active} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </header>
  )
}
