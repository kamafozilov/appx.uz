import { AppStore } from './AppStore'
import { Capabilities } from './Capabilities'
import { Faq } from './Faq'
import { FinalCta } from './FinalCta'
import { Gallery } from './Gallery'
import { HowItWorks } from './HowItWorks'
import { Included } from './Included'
import { Pricing } from './Pricing'
import { RealEdit } from './RealEdit'
import { YourCode } from './YourCode'

export { Footer } from './Footer'

/** All sections after the hero, loaded as a single lazy chunk. */
export default function BelowFold() {
  return (
    <>
      <HowItWorks />
      <Capabilities />
      <Gallery />
      <RealEdit />
      <Included />
      <YourCode />
      <AppStore />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  )
}
