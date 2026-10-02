import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { CircleCheck, LoaderCircle } from 'lucide-react'
import { GlassCard } from './GlassCard'

const LOG = [
  { time: '0:00', text: 'Got your idea' },
  { time: '1:52', text: 'You approved the plan' },
  { time: '8:14', text: 'All 12 files written' },
  { time: '9:41', text: 'Ready on your phone' },
] as const

/** Each log line takes two ticks: appear (working) → done (check). One more tick reveals the total. */
const LAST_TICK = LOG.length * 2 + 1
const TICK_MS = 420
const EASE = [0.16, 1, 0.3, 1] as const

/** Replays the build log line by line once `play` turns true. */
export function BuildReplay({ play }: { play: boolean }) {
  const reduceMotion = useReducedMotion()
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!play || reduceMotion) return
    const id = window.setInterval(() => {
      setTick((t) => {
        if (t + 1 >= LAST_TICK) window.clearInterval(id)
        return Math.min(t + 1, LAST_TICK)
      })
    }, TICK_MS)
    return () => window.clearInterval(id)
  }, [play, reduceMotion])

  const step = reduceMotion ? LAST_TICK : tick
  const finished = step >= LAST_TICK

  return (
    <GlassCard
      label="Build replay"
      className="md:max-w-[400px] lg:w-[300px] lg:max-w-none"
      footer={
        <p className="text-center text-[12px] font-medium text-ink-2">
          Pocket Semester · Sep 23, 2026
        </p>
      }
    >
      <ol className="flex flex-col gap-3">
        {LOG.map((line, i) => {
          const visible = step >= i * 2 + 1
          const done = step >= i * 2 + 2
          return (
            <motion.li
              key={line.time}
              initial={false}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 6 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="flex items-center gap-2.5"
            >
              <span className="w-8 shrink-0 font-mono text-[12px] text-ink-3">{line.time}</span>
              <span className="relative size-[15px] shrink-0">
                <AnimatePresence initial={false}>
                  {done ? (
                    <motion.span
                      key="done"
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 520, damping: 22 }}
                      className="absolute inset-0"
                    >
                      <CircleCheck className="size-[15px] text-[#2F7D52]" />
                      <span className="sr-only">done</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="working"
                      exit={{ scale: 0.4, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="absolute inset-0"
                    >
                      <LoaderCircle className="size-[15px] animate-spin text-ink-3" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <span className="text-[13px] whitespace-nowrap text-ink">{line.text}</span>
            </motion.li>
          )
        })}
      </ol>

      <div className="mt-3 flex items-end justify-between border-t border-line pt-3">
        <span className="text-[12px] text-ink-3">Prompt to phone</span>
        <motion.span
          initial={false}
          animate={{ opacity: finished ? 1 : 0.25, y: finished ? 0 : 4 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="font-display text-[26px] leading-[26px] whitespace-nowrap text-ink"
        >
          9 min 41 s
        </motion.span>
      </div>
    </GlassCard>
  )
}
