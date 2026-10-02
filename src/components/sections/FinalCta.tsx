import painting from '@/assets/img/generated-8.webp'
import { Reveal } from '@/components/ui/Reveal'
import { PromptComposer } from './shared/PromptComposer'

export function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="relative isolate flex h-[660px] flex-col items-center justify-center gap-6 overflow-hidden bg-[#E9C9A0] px-5 text-center sm:px-8 md:h-auto md:min-h-[640px] md:gap-8 md:py-28 lg:h-[820px] lg:py-0"
    >
      <img
        src={painting}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      {/* Wash: dark band from the section above, warm glow behind the copy, ivory into the footer. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#111113_0%,#11111300_20%,#F6F1E800_84%,#F6F1E8_100%),radial-gradient(ellipse_50%_40%_at_50%_45%,#FFF8EEB3_0%,#FFF8EE00_100%)] bg-no-repeat"
      />

      <Reveal>
        <h2
          id="final-cta-title"
          className="font-display text-[54px] leading-[52px] tracking-[-1px] text-balance text-ink md:text-[72px] md:leading-[0.98] lg:text-[96px] lg:leading-[92px] lg:tracking-[-1.5px]"
        >
          Your app starts <br />
          with one sentence.
        </h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="text-[16px] font-medium text-[#2E2A24] md:text-[18px]">
          Basic is $5 a month with 100 credits. Code download on every plan.
        </p>
      </Reveal>
      <Reveal delay={0.16} className="flex w-full justify-center">
        <PromptComposer placeholder="Describe your app in one sentence…" />
      </Reveal>
    </section>
  )
}
