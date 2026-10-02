import { lazy, Suspense } from 'react'
import { SmoothScroll } from '@/components/SmoothScroll'
import { Hero } from '@/components/sections/Hero'
import { Navbar } from '@/components/sections/Navbar'

// Everything below the hero is split into its own chunk and prefetched right after first paint.
const loadBelowFold = () => import('@/components/sections/BelowFold')
const BelowFold = lazy(loadBelowFold)
const Footer = lazy(() => loadBelowFold().then((m) => ({ default: m.Footer })))

if (typeof window !== 'undefined') {
  const prefetch = () => void loadBelowFold()
  if ('requestIdleCallback' in window) requestIdleCallback(prefetch, { timeout: 1500 })
  else setTimeout(prefetch, 300)
}

export default function App() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main id="top">
        <Hero />
        <Suspense fallback={<div className="min-h-screen bg-ivory" />}>
          <BelowFold />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}
