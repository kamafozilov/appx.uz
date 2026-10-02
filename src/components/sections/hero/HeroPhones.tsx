import { motion, type MotionValue } from 'motion/react'
import { CrumbsPhone, RepsPhone, SipDayPhone } from '@/components/phones'
import { cn } from '@/lib/cn'

const EASE = [0.16, 1, 0.3, 1] as const

/*
 * Base mockup is 236w, so zoom = width / 236.
 * Mobile (<md): Crumbs 270w + Reps 310w + SipDay 270w, 14px apart, side phones dropped
 * 72px. The row is wider than the screen and stays centred, so the side phones peek in
 * from the edges and the hero (fixed 1050px tall) crops the bottom.
 * Desktop (xl): same widths, 48px apart.
 */
const SIDE_ZOOM =
  '[--phone-zoom:1.1441] md:[--phone-zoom:0.85] lg:[--phone-zoom:1] xl:[--phone-zoom:1.1441]'
const CENTER_ZOOM =
  '[--phone-zoom:1.3136] md:[--phone-zoom:1] lg:[--phone-zoom:1.15] xl:[--phone-zoom:1.3136]'

const PHONES = [
  { key: 'crumbs', Phone: CrumbsPhone, side: true, zoom: SIDE_ZOOM },
  { key: 'reps', Phone: RepsPhone, side: false, zoom: CENTER_ZOOM },
  { key: 'sipday', Phone: SipDayPhone, side: true, zoom: SIDE_ZOOM },
] as const

type HeroPhonesProps = {
  /** Scroll-linked vertical offset (parallax). */
  y: MotionValue<number>
  /** Reduced motion: no parallax, no entrance. */
  reduce?: boolean
}

/** Three phones rising out of the bottom of the hero. */
export function HeroPhones({ y, reduce = false }: HeroPhonesProps) {
  return (
    <motion.div
      style={reduce ? undefined : { y }}
      aria-hidden
      className="relative z-[4] flex justify-center gap-[14px] will-change-transform md:h-[460px] md:gap-8 lg:h-[500px] lg:gap-10 xl:h-auto xl:gap-12"
    >
      {PHONES.map(({ key, Phone, side, zoom }, i) => (
        // Entrance is transform/opacity only, inside a box already sized by the phone,
        // so nothing around it shifts while it plays.
        <motion.div
          key={key}
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 + (side ? 0.1 : 0) + i * 0.04, ease: EASE }}
          className={cn('shrink-0', side && 'pt-[72px] md:pt-12 lg:pt-14 xl:pt-[72px]')}
        >
          <Phone className={zoom} />
        </motion.div>
      ))}
    </motion.div>
  )
}
