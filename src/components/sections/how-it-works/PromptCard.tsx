import { GlassCard } from './GlassCard'

/** "Your prompt" card: the one sentence Sam typed. */
export function PromptCard() {
  return (
    <GlassCard
      label="Your prompt"
      className="md:max-w-[400px] lg:w-[256px] lg:max-w-none xl:w-[280px]"
    >
      <div className="flex items-center gap-2">
        <span
          aria-hidden
          className="flex size-6 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-white"
        >
          S
        </span>
        <span className="text-[13px] font-semibold text-ink">Sam</span>
      </div>
      <blockquote className="mt-2.5 text-[14px] leading-[21px] text-ink">
        “A simple expense tracker for students. Add expenses with amount, category and date, and a
        monthly budget.”
      </blockquote>
    </GlassCard>
  )
}
