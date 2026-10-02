import { useSyncExternalStore } from 'react'

/** Matches the design's mobile layout (below Tailwind's `md`). */
const MOBILE_QUERY = '(max-width: 767.98px)'

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY)
  mql.addEventListener('change', onChange)
  return () => mql.removeEventListener('change', onChange)
}

export function useIsMobile() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  )
}
