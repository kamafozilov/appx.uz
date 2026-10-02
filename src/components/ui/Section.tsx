import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

/**
 * Page section shell. Matches the design's 1440px canvas with 120px gutters
 * (content max width 1200px) and scales the gutters down on smaller screens.
 */
export function Section({ className, children, ...props }: ComponentProps<'section'>) {
  return (
    <section className={cn('w-full px-5 sm:px-8 lg:px-12 xl:px-[120px]', className)} {...props}>
      <div className="mx-auto w-full max-w-[1200px]">{children}</div>
    </section>
  )
}
