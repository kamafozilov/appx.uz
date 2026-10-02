import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, X } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import { AppleLogo, GooglePlayLogo } from './app-store/BrandIcons'
import { StoreStage } from './app-store/StoreStage'

const EASE = [0.16, 1, 0.3, 1] as const

type Price = {
  name: string
  logo: ReactNode
  value: string
  unit?: string
  caption: string
  /** Long text values ("Written price") use a smaller size. */
  small?: boolean
}

const PRICES: Price[] = [
  {
    name: 'Apple Developer account',
    logo: <AppleLogo className="size-5 text-ink" />,
    value: '$99',
    unit: '/ year',
    caption: 'Paid to Apple. Needed to publish on the App Store.',
  },
  {
    name: 'Google Play account',
    logo: <GooglePlayLogo className="size-5" />,
    value: '$25',
    unit: 'once',
    caption: 'Paid to Google. Needed to publish on Google Play.',
  },
  {
    name: 'AppX publishing help',
    logo: (
      <span
        className="flex size-5 items-center justify-center rounded-md bg-ink"
        aria-hidden="true"
      >
        <X className="size-3 text-white" />
      </span>
    ),
    value: 'Written price',
    caption: 'You see it before you pay anything. Pro plans get priority.',
    small: true,
  },
]

const STEPS = [
  {
    numeral: 'I',
    title: 'Ask from your project',
    desc: 'Send a store request and tell us which stores you want.',
  },
  {
    numeral: 'II',
    title: 'Get a written price',
    desc: 'We review your app. You pay only if you say yes.',
  },
  {
    numeral: 'III',
    title: 'We submit it with you',
    desc: 'We sign the app and prepare the store listing together.',
  },
  {
    numeral: 'IV',
    title: 'Apple or Google review it',
    desc: 'They make the final decision, not us.',
  },
]

function PriceCard({ price }: { price: Price }) {
  return (
    <article className="flex h-full flex-col justify-between gap-7 rounded-[20px] bg-white p-[22px] shadow-[0_1px_2px_#1A140A0F] md:min-h-[220px] lg:h-[260px] lg:gap-10 lg:rounded-[22px] lg:p-7">
      <h3 className="flex items-center gap-2.5 text-[15px] font-semibold text-ink">
        {price.logo}
        {price.name}
      </h3>
      <div className="flex flex-col gap-2">
        <p className="flex items-end gap-2">
          <span
            className={cn(
              'font-display tracking-[-1.5px] text-ink',
              price.small
                ? 'text-[46px] leading-[44px] lg:text-[56px] lg:leading-[53px]'
                : 'text-[60px] leading-[57px] lg:text-[80px] lg:leading-[76px]',
            )}
          >
            {price.value}
          </span>
          {price.unit && <span className="pb-2.5 text-[16px] text-ink-3">{price.unit}</span>}
        </p>
        <p className="text-[15px] leading-[23px] text-ink-3">{price.caption}</p>
      </div>
    </article>
  )
}

export function AppStore() {
  return (
    <Section id="app-store" className="bg-ivory py-[72px] md:py-20 lg:py-32">
      <div className="flex flex-col gap-8 md:gap-10 lg:gap-12">
        <SectionHeader
          title={
            // Mobile design: 40/40 with its own line breaks; ≥md the shared header sizes apply.
            <span className="max-md:block max-md:text-[40px] max-md:leading-10">
              Want it in the
              <br className="md:hidden" /> App Store?
              <br className="max-md:hidden" /> We do
              <br className="md:hidden" /> it with you.
            </span>
          }
          intro="A real person helps you publish to the App Store and Google Play. You see a written price before you pay anything."
        />

        <Reveal>
          <StoreStage />
        </Reveal>

        <ul className="grid gap-2.5 md:grid-cols-3 md:gap-3">
          {PRICES.map((price, i) => (
            <motion.li
              key={price.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
            >
              <PriceCard price={price} />
            </motion.li>
          ))}
        </ul>

        <ol className="flex flex-col md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.li
              key={step.numeral}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
              className="flex gap-4 border-t border-line py-[18px] last:border-b md:flex-col md:gap-2.5 md:pt-[22px] md:pb-0 md:last:border-b-0"
            >
              <span
                className="w-8 shrink-0 font-display text-[24px] leading-6 text-gold md:w-auto md:text-[26px] md:leading-[26px]"
                aria-hidden="true"
              >
                {step.numeral}
              </span>
              <div className="flex flex-1 flex-col gap-1 md:gap-2.5">
                <h3 className="text-[17px] font-semibold tracking-[-0.2px] text-ink md:text-[18px]">
                  {step.title}
                </h3>
                <p className="text-[15px] leading-[23px] text-ink-3 md:leading-6">{step.desc}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        <Reveal className="flex flex-col gap-3.5 md:flex-row md:items-center md:justify-between md:gap-8">
          <p className="text-[14px] leading-[21px] text-ink-3">
            Nobody can promise Apple will approve. We help you get it right the first time.
          </p>
          <a
            href="#faq"
            className="group flex w-full shrink-0 items-center justify-between gap-1.5 rounded-xl bg-white px-4 py-3 text-[14px] font-semibold text-ink ring-1 ring-line transition-opacity duration-200 ring-inset hover:opacity-70 active:opacity-60 md:w-auto md:justify-start md:rounded-none md:bg-transparent md:p-0 md:text-[15px] md:ring-0"
          >
            Is my app store-ready? Read the checklist
            <ArrowUpRight
              className="size-[15px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </Reveal>
      </div>
    </Section>
  )
}
