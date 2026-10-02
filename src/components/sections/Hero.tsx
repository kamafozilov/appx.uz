import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from 'motion/react'
import painting from '@/assets/img/generated-2.webp'
import { HeroPhones } from './hero/HeroPhones'
import { PromptComposer } from './shared/PromptComposer'
import { focusComposerAtEnd } from './shared/focusComposer'

const EASE = [0.16, 1, 0.3, 1] as const

const IDEAS = [
  { label: 'Recipe box', prompt: 'A recipe box with photos, favorites and a shopping list' },
  { label: 'Habit streaks', prompt: 'A habit tracker with daily streaks and gentle reminders' },
  { label: 'Bill splitter', prompt: 'A bill splitter for trips that shows who owes whom' },
  { label: 'Workout log', prompt: 'A workout log with sets, reps and weekly progress' },
] as const

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

function IdeaChips({ onPick }: { onPick: (prompt: string) => void }) {
  return (
    <motion.div
      variants={item}
      className="flex flex-wrap items-center justify-center gap-2 text-[14px] font-medium"
    >
      <span className="text-[#4A463F]">Try</span>
      {IDEAS.map(({ label, prompt }) => (
        <button
          key={label}
          type="button"
          onClick={() => onPick(prompt)}
          className="cursor-pointer rounded-full bg-white/60 px-3.5 py-2 whitespace-nowrap text-[#3A3833] backdrop-blur-[6px] transition-[background-color,transform,color] duration-200 hover:-translate-y-px hover:bg-white/85 hover:text-ink active:translate-y-0 active:scale-[0.96]"
        >
          {label}
        </button>
      ))}
    </motion.div>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [prompt, setPrompt] = useState<string>(IDEAS[0].prompt)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const pickIdea = (next: string) => {
    setPrompt(next)
    // Keep the composer active after picking a suggestion (caret after the new text).
    requestAnimationFrame(() => focusComposerAtEnd(inputRef.current))
  }

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const paintingY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160])
  const phonesY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90])

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative isolate h-[1050px] overflow-hidden bg-[#DCE6EE] md:h-auto xl:h-[1060px]"
    >
      <motion.div
        aria-hidden
        style={reduce ? undefined : { y: paintingY }}
        className="absolute inset-0 -z-10 will-change-transform"
      >
        <img
          src={painting}
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
      </motion.div>
      {/* Hero Wash: white haze at the top + glow behind the headline, fading into ivory. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#FFFFFF66_0%,#FFFFFF00_15%,#F6F1E800_74%,#F6F1E8_100%),radial-gradient(ellipse_50%_35%_at_50%_30%,#FFFFFFB8_0%,#FFFFFF00_100%)] bg-no-repeat"
      />

      <motion.div
        variants={container}
        initial={reduce ? false : 'hidden'}
        animate="show"
        className="relative z-[3] flex flex-col items-center gap-5 px-5 pt-[92px] pb-8 text-center sm:px-8 md:gap-6 md:pt-[112px] md:pb-10 lg:pt-[128px]"
      >
        <motion.h1
          id="hero-title"
          variants={item}
          className="font-display text-[56px] leading-[53px] tracking-[-1px] text-balance text-ink md:text-[76px] md:leading-[0.98] lg:text-[96px] xl:text-[108px] xl:leading-[102px] xl:tracking-[-1.5px]"
        >
          Chat your app <br />
          onto your phone.
        </motion.h1>
        <motion.p
          variants={item}
          className="max-w-[330px] text-[15px] leading-[23px] text-[#45423C] md:max-w-[640px] md:text-[17px] md:leading-[1.55] lg:text-[19px] lg:leading-[29px]"
        >
          Describe your idea. AppX writes a real React Native app you can open on your phone with
          Expo Go. The full code is yours, on every plan.
        </motion.p>
        <motion.div variants={item} className="flex w-full justify-center">
          <PromptComposer
            value={prompt}
            onValueChange={setPrompt}
            placeholder="Describe your app in one sentence…"
            inputRef={inputRef}
            autoFocusAfter={1400}
          />
        </motion.div>
        <IdeaChips onPick={pickIdea} />
      </motion.div>

      <HeroPhones y={phonesY} reduce={!!reduce} />
    </section>
  )
}
