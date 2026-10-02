import { motion } from 'motion/react'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'

const STEPS = [
  {
    numeral: 'I',
    title: 'Describe',
    text: "Tell AppX about your app the way you'd tell a friend.",
  },
  {
    numeral: 'II',
    title: 'Try it on your phone',
    text: 'Open it in the web preview or on your phone with Expo Go.',
  },
  {
    numeral: 'III',
    title: 'Keep improving',
    text: 'Ask for changes in chat: new screens, colors or features.',
  },
  {
    numeral: 'IV',
    title: 'Keep your code',
    text: 'Download the full React Native project as a ZIP, any time.',
  },
] as const

/**
 * The four numbered steps under the stage. Mobile: a ruled list (numeral left, text right).
 * md+: a 2-col, then 4-col grid with the numeral stacked above the text.
 */
export function Steps() {
  return (
    <ol className="flex flex-col md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-4">
      {STEPS.map((step, i) => (
        <li key={step.numeral}>
          <Reveal
            delay={i * 0.06}
            y={16}
            className={cn(
              'relative flex gap-4 border-t border-line py-[18px] md:block md:py-0 md:pt-[22px]',
              i === STEPS.length - 1 && 'border-b md:border-b-0',
            )}
          >
            {/* Gold accent drawn over the hairline rule. */}
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -top-px left-0 h-px w-12 origin-left bg-gold"
            />
            <span
              aria-hidden
              className="block w-8 shrink-0 font-display text-[24px] leading-6 text-gold md:w-auto md:text-[26px] md:leading-[26px]"
            >
              {step.numeral}
            </span>
            <div className="flex flex-1 flex-col gap-1 md:block">
              <h3 className="text-[17px] font-semibold tracking-[-0.2px] text-ink md:mt-2.5 md:text-[18px]">
                {step.title}
              </h3>
              <p className="text-[15px] leading-[23px] text-ink-3 md:mt-2.5 md:leading-6">
                {step.text}
              </p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}
