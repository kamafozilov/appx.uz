import { useEffect } from 'react'
import Lenis from 'lenis'

/** Inertial smooth scrolling + smooth in-page anchor navigation. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ autoRaf: true, anchors: { offset: -16 }, lerp: 0.1 })
    return () => lenis.destroy()
  }, [])

  return null
}
