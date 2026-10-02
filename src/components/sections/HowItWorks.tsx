import { useRef } from 'react'
import { useInView } from 'motion/react'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/ui/Reveal'
import { PocketSemesterPhone } from '@/components/phones'
import stageImg from '@/assets/img/generated-20.webp'
import { PromptCard } from './how-it-works/PromptCard'
import { BuildReplay } from './how-it-works/BuildReplay'
import { StageArrow } from './how-it-works/GlassCard'
import { Steps } from './how-it-works/Steps'

/** Painted stage: prompt → build replay → the finished app on a phone. */
function Stage() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  return (
    <Reveal>
      <div ref={ref} className="relative isolate overflow-hidden rounded-[24px] lg:rounded-[28px]">
        <img
          src={stageImg}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="flex flex-col items-center gap-3 px-5 pt-7 md:gap-5 md:pt-14 lg:h-[660px] lg:flex-row lg:justify-center lg:gap-3 lg:p-0 xl:gap-6">
          <PromptCard />
          <StageArrow />
          <BuildReplay play={inView} />
          <StageArrow />
          {/* Below lg the phone is cropped by a fixed 430px window so it bleeds off the stage. */}
          <div className="flex h-[430px] w-full justify-center overflow-hidden lg:contents">
            {/* 262px in the design; 236px at lg so the row fits the narrower container. */}
            <PocketSemesterPhone className="[--phone-zoom:1.1102] lg:[--phone-zoom:1] xl:[--phone-zoom:1.1102]" />
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-ivory py-[72px] md:py-20 lg:py-32">
      <SectionHeader
        title={
          <>
            From one sentence
            <br />
            to your pocket.
          </>
        }
        intro="No setup, no Xcode, no code to write. You describe it, AppX builds it, and it opens on your phone."
      />
      <div className="mt-8 flex flex-col gap-8 md:mt-12 md:gap-12 lg:mt-14 lg:gap-14">
        <Stage />
        <Steps />
      </div>
    </Section>
  )
}
