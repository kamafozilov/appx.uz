import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import describeImg from '@/assets/img/generated-17.webp'
import phoneImg from '@/assets/img/generated-19.webp'
import changeImg from '@/assets/img/generated-18.webp'
import { CapabilityCard, type Capability } from './capabilities/CapabilityCard'
import { ChangeOverlay, DescribeOverlay, PhoneOverlay } from './capabilities/overlays'

const CAPABILITIES: Capability[] = [
  {
    title: 'Describe it',
    description:
      "Write your idea the way you'd tell a friend. AppX turns it into a plan, then a real React Native app.",
    image: describeImg,
    overlay: <DescribeOverlay />,
    overlayClassName: 'inset-0 flex items-center justify-center md:bottom-auto md:top-[27%]',
  },
  {
    title: 'Try it on your phone',
    description:
      'Every screen stays connected: open it in the web preview or on your own phone with Expo Go.',
    image: phoneImg,
    overlay: <PhoneOverlay />,
    overlayClassName: 'inset-0 flex items-center justify-center md:bottom-auto md:top-[23%]',
  },
  {
    title: 'Change anything',
    description:
      'Ask for what should be different. AppX edits only that, and your phone updates in minutes.',
    image: changeImg,
    overlay: <ChangeOverlay />,
    // Mobile: centred like the others. md+: bleeds off the right edge, leaving ~271px visible.
    overlayClassName:
      'inset-0 flex items-center justify-center md:right-auto md:bottom-auto md:top-[34%] md:left-[max(24px,calc(100%_-_271px))] md:block',
    className: 'md:col-span-2 lg:col-span-1',
  },
]

function Header() {
  return (
    // Mobile/tablet order is title → intro → button; the inner column dissolves (`contents`) below lg.
    <Reveal className="flex flex-col items-start gap-4 lg:flex-row lg:justify-between lg:gap-12">
      <div className="flex flex-col items-start gap-7 max-lg:contents">
        <h2 className="font-display text-[42px] leading-none tracking-[-0.8px] text-balance text-ink md:text-[52px] md:tracking-[-0.02em] lg:text-[60px]">
          Everything your
          <br className="md:hidden" /> idea needs
          <br className="hidden md:block" /> to
          <br className="md:hidden" /> become an app.
        </h2>
        <a
          href="#pricing"
          className="group/btn inline-flex items-center gap-2 rounded-[12px] bg-ink px-[22px] py-[14px] text-[15px] font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-ink/90 active:scale-[0.98] max-lg:order-last max-lg:mt-1 lg:py-[13px]"
        >
          Start building
          <ArrowRight className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
        </a>
      </div>
      <p className="max-w-[400px] shrink-0 text-[16px] leading-[26px] text-ink-2 md:text-[17px] md:leading-[1.6] lg:text-[18px] lg:leading-[29px]">
        AppX takes your words, builds a real app, keeps every screen in context, and changes it
        whenever you ask.
      </p>
    </Reveal>
  )
}

export function Capabilities() {
  return (
    <Section className="bg-paper py-[72px] md:py-20 lg:py-32">
      <Header />
      <ul className="mt-9 grid gap-y-9 md:mt-12 md:grid-cols-2 md:gap-x-4 md:gap-y-10 lg:mt-16 lg:grid-cols-3">
        {CAPABILITIES.map(({ className, ...capability }, i) => (
          <li key={capability.title} className={className}>
            <Reveal delay={i * 0.08}>
              <CapabilityCard {...capability} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
